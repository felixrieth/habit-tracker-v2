import { get, put } from "@vercel/blob";

export const config = {
  runtime: "nodejs",
  api: {
    bodyParser: {
      sizeLimit: "2mb",
    },
  },
};

function send(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function isValidId(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function syncPath(syncId) {
  return `habit-sync/${syncId}.json`;
}

async function streamToText(stream) {
  if (!stream) {
    return "";
  }

  const response = new Response(stream);
  return response.text();
}

async function readSyncRecord(syncId) {
  try {
    const blob = await get(syncPath(syncId), { access: "private" });
    if (!blob || blob.statusCode !== 200) {
      return null;
    }

    const text = await streamToText(blob.stream);
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function parseBody(req) {
  if (!req.body) {
    return {};
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return req.body;
}

async function writeSyncRecord(syncId, record) {
  return put(syncPath(syncId), JSON.stringify(record), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: "application/json",
  });
}

async function syncHandler(req, res) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return send(res, 503, {
      ok: false,
      error: "Blob storage is not configured yet.",
    });
  }

  if (req.method === "GET") {
    const syncId = req.query.syncId;
    if (!isValidId(syncId)) {
      return send(res, 400, { ok: false, error: "Missing or invalid syncId." });
    }

    const record = await readSyncRecord(syncId);
    return send(res, 200, { ok: true, record });
  }

  if (req.method === "POST") {
    const { syncId, data, updatedAt } = parseBody(req);
    if (!isValidId(syncId)) {
      return send(res, 400, { ok: false, error: "Missing or invalid syncId." });
    }
    if (!data || typeof data !== "object") {
      return send(res, 400, { ok: false, error: "Missing sync data." });
    }

    const existing = await readSyncRecord(syncId);
    const nextUpdatedAt = typeof updatedAt === "number" ? updatedAt : Date.now();

    if (existing && typeof existing.updatedAt === "number" && existing.updatedAt > nextUpdatedAt) {
      return send(res, 409, {
        ok: false,
        error: "Remote data is newer.",
        record: existing,
      });
    }

    const record = {
      updatedAt: nextUpdatedAt,
      data,
    };

    await writeSyncRecord(syncId, record);

    return send(res, 200, { ok: true, record });
  }

  res.setHeader("Allow", "GET, POST");
  return send(res, 405, { ok: false, error: "Method not allowed." });
}

export default async function handler(req, res) {
  try {
    return await syncHandler(req, res);
  } catch (error) {
    console.error("[sync] request failed", error);
    return send(res, 500, {
      ok: false,
      error: "Sync storage request failed.",
      detail: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

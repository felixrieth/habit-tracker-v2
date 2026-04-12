import { head, put } from "@vercel/blob";

export const config = {
  runtime: "nodejs",
};

const jsonHeaders = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

function send(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function isValidId(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

async function readSyncRecord(syncId) {
  try {
    const blob = await head(`habit-sync/${syncId}.json`);
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    return null;
  }
}

export default async function handler(req, res) {
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
    const { syncId, data, updatedAt } = req.body || {};
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

    await put(`habit-sync/${syncId}.json`, JSON.stringify(record), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
      allowOverwrite: true,
    });

    return send(res, 200, { ok: true, record });
  }

  res.setHeader("Allow", "GET, POST");
  return send(res, 405, { ok: false, error: "Method not allowed." });
}

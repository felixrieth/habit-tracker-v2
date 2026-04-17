(function () {
  const PULL_INTERVAL_MS = 30000;
  const EDIT_GRACE_MS = 6000;
  let lastLocalEditAt = 0;

  function getSyncCode() {
    return document.querySelector("#sync-code-input")?.value.trim() || "";
  }

  function getSyncStatus() {
    return document.querySelector("#sync-status")?.textContent || "";
  }

  function markLocalEdit(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.closest(".sync-strip")) {
      return;
    }

    if (target.matches("input, textarea, select")) {
      lastLocalEditAt = Date.now();
    }
  }

  function shouldPullLatest() {
    if (document.hidden || !getSyncCode()) {
      return false;
    }

    if (Date.now() - lastLocalEditAt < EDIT_GRACE_MS) {
      return false;
    }

    return !/syncing/i.test(getSyncStatus());
  }

  function pullLatest() {
    if (!shouldPullLatest()) {
      return;
    }

    document.querySelector("#sync-refresh-button")?.click();
  }

  document.addEventListener("input", markLocalEdit, true);
  document.addEventListener("change", markLocalEdit, true);

  window.setInterval(pullLatest, PULL_INTERVAL_MS);

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      window.setTimeout(pullLatest, 500);
    }
  });

  window.addEventListener("focus", () => {
    window.setTimeout(pullLatest, 500);
  });
})();

      return `${Math.round(value)} goals`;
    }
    if (metric === "goals-met-percentage" || format === "percent") {
      return `${Math.round(value)}%`;
    }
    if (format === "study") {
      return `${Number(value.toFixed(2))}h`;
    }
    if (format === "protein") {
      return `${Math.round(value)}g`;
    }
    if (format === "bedtime") {
      return formatTimeLabel(value);
    }
    return String(Math.round(value));
  }

  function hideGraphTooltip() {
    if (elements.graphTooltip) {
      elements.graphTooltip.hidden = true;
    }
  }

  function getDaysLeftInYear(year) {
    const currentYear = today.getFullYear();

    if (year < currentYear) {
      return 0;
    }

    if (year > currentYear) {
      const startOfYear = new Date(year, 0, 1);
      const startOfNextYear = new Date(year + 1, 0, 1);
      return Math.round((startOfNextYear - startOfYear) / 86400000);
    }

    const startOfToday = new Date(currentYear, today.getMonth(), today.getDate());
    const startOfNextYear = new Date(currentYear + 1, 0, 1);
    return Math.max(Math.round((startOfNextYear - startOfToday) / 86400000) - 1, 0);
  }

  function populateControls() {
    elements.monthSelect.innerHTML = MONTHS.map((month, index) => {
      const selected = index === state.selectedMonth ? " selected" : "";
      return `<option value="${index}"${selected}>${month}</option>`;
    }).join("");

    const years = new Set();
    const currentYear = today.getFullYear();
    for (let year = currentYear - 5; year <= currentYear + 5; year += 1) {
      years.add(year);
    }
    Object.keys(state.data.dates).forEach((dateKey) => years.add(Number(dateKey.slice(0, 4))));
    Object.keys(state.data.monthGoals).forEach((monthKey) => years.add(Number(monthKey.slice(0, 4))));
    years.add(state.selectedYear);
    years.add(state.selectedYearlyYear);
    const sortedYears = Array.from(years).sort((left, right) => left - right);

    elements.yearSelect.innerHTML = sortedYears
      .map((year) => `<option value="${year}"${year === state.selectedYear ? " selected" : ""}>${year}</option>`)
      .join("");

    elements.yearlyYearSelect.innerHTML = sortedYears
      .map((year) => `<option value="${year}"${year === state.selectedYearlyYear ? " selected" : ""}>${year}</option>`)
      .join("");
  }

  function renderMonthlyTable() {
    const stats = getMonthStats(state.selectedYear, state.selectedMonth);
    const monthGoals = getMonthGoals(state.selectedYear, state.selectedMonth);

    elements.daysInMonth.textContent = String(stats.dayCount);
    elements.daysLeftMonth.textContent = String(getDaysLeftInMonth(state.selectedYear, state.selectedMonth));
    elements.monthChecked.textContent = String(stats.totalChecked);
    elements.monthPercentage.textContent = formatPercent(stats.completion);
    elements.passedDaysCompletion.textContent = formatPercent(stats.passedDays === 0 ? 0 : (Object.values(stats.passedTotalsByGoal).reduce((sum, value) => sum + value, 0) / (stats.passedDays * TRACKED_GOALS.length)) * 100);
    elements.studyGoalInput.value = monthGoals.study;
    elements.proteinGoalInput.value = monthGoals.protein;
    elements.bedtimeGoalInput.value = monthGoals.bedtime;
    elements.studyNote.textContent = monthGoals.study
      ? `Study counts when the entered hours meet or exceed ${monthGoals.study} hours.`
      : "Set a monthly Study goal to start counting Study.";
    elements.proteinNote.textContent = monthGoals.protein
      ? `Protein counts when the entered grams meet or exceed ${monthGoals.protein} g.`
      : "Set a monthly Protein goal to start counting Protein.";
    elements.bedtimeNote.textContent = monthGoals.bedtime
      ? `Bedtime counts when the entered time is at or earlier than ${monthGoals.bedtime}.`
      : "Set a monthly bedtime goal to start counting Bedtime.";

    renderTodayCard();
    renderMonthlyCards(stats);

    elements.monthlyHead.innerHTML = `
      <tr>
        <th scope="col">Day</th>
        ${GOALS.map((goal) => `<th scope="col">${goal}</th>`).join("")}
        <th scope="col">Goals met</th>
        <th scope="col">Notes</th>
      </tr>
    `;

    elements.monthlyBody.innerHTML = Array.from({ length: stats.dayCount }, (_, index) => {
      const day = index + 1;
      const dayRecord = getDayRecord(state.selectedYear, state.selectedMonth, day);

      const cells = GOALS.map((goal) => {
        const status = getGoalStatus(state.selectedYear, state.selectedMonth, day, goal);

        if (goal === "Study") {
          const inputTone = status === "success" ? " is-met" : status === "partial" ? " is-partial" : status === "fail" ? " is-missed" : "";
          return `<td class="goal-cell state-${status}"><input class="metric-input${inputTone}" type="number" min="0" step="0.25" inputmode="decimal" data-kind="study" data-day="${day}" value="${dayRecord.studyHours || ""}" aria-label="Study hours on ${MONTHS[state.selectedMonth]} ${day}, ${state.selectedYear}" /></td>`;
        }

        if (goal === "Protein") {
          const inputTone = status === "success" ? " is-met" : status === "partial" ? " is-partial" : status === "fail" ? " is-missed" : "";
          return `<td class="goal-cell state-${status}"><input class="metric-input${inputTone}" type="number" min="0" step="1" inputmode="numeric" data-kind="protein" data-day="${day}" value="${dayRecord.proteinGrams || ""}" aria-label="Protein grams on ${MONTHS[state.selectedMonth]} ${day}, ${state.selectedYear}" /></td>`;
        }

        if (goal === "Bedtime") {
          const inputTone = status === "success" ? " is-met" : status === "partial" ? " is-partial" : status === "fail" ? " is-missed" : "";
          return `<td class="goal-cell state-${status}"><input class="bedtime-input${inputTone}" type="time" data-kind="bedtime" data-day="${day}" value="${dayRecord.bedtime || ""}" aria-label="Bedtime on ${MONTHS[state.selectedMonth]} ${day}, ${state.selectedYear}" /></td>`;
        }

        const checked = isGoalChecked(state.selectedYear, state.selectedMonth, day, goal) ? " checked" : "";
        return `<td class="goal-cell state-${status}"><label class="checkbox-wrap"><input class="habit-checkbox" type="checkbox" data-kind="checkbox" data-goal="${goal}" data-day="${day}" aria-label="${goal} on ${MONTHS[state.selectedMonth]} ${day}, ${state.selectedYear}"${checked} /></label></td>`;
      }).join("");

      const goalsMetCount = getDayGoalCount(state.selectedYear, state.selectedMonth, day);
      const goalsMetStatus = getGoalsMetStatus(state.selectedYear, state.selectedMonth, day);

      return `
        <tr>
          <th scope="row" class="row-label">${day} <span class="weekday-label">${getWeekdayLabel(state.selectedYear, state.selectedMonth, day)}</span></th>
          ${cells}
          <td class="goals-met-cell state-${goalsMetStatus} stat-value">${goalsMetCount}</td>
          <td><textarea class="note-input" data-kind="note" data-day="${day}" aria-label="Notes on ${MONTHS[state.selectedMonth]} ${day}, ${state.selectedYear}">${dayRecord.notes || ""}</textarea></td>
        </tr>
      `;
    }).join("");

    elements.monthlyFoot.innerHTML = `
      <tr>
        <th scope="row">Total met goals</th>
        ${TRACKED_GOALS.map((goal) => `<td class="stat-value">${stats.totalsByGoal[goal]}</td>`).join("")}
        <td class="stat-value">${stats.totalChecked}</td>
        <td class="footer-note">Month notes</td>
      </tr>
      <tr>
        <th scope="row">Percentage</th>
        ${TRACKED_GOALS.map((goal) => `<td class="stat-value">${formatPercent(stats.passedDays === 0 ? 0 : (stats.passedTotalsByGoal[goal] / stats.passedDays) * 100)}</td>`).join("")}
        <td class="stat-value">${formatPercent(stats.passedDays === 0 ? 0 : (Object.values(stats.passedTotalsByGoal).reduce((sum, value) => sum + value, 0) / (stats.passedDays * TRACKED_GOALS.length)) * 100)}</td>
        <td class="footer-note">Passed days</td>
      </tr>
      <tr>
        <th scope="row">Total Percentage</th>
        ${TRACKED_GOALS.map((goal) => `<td class="stat-value">${formatPercent(stats.dayCount === 0 ? 0 : (stats.totalsByGoal[goal] / stats.dayCount) * 100)}</td>`).join("")}
        <td class="stat-value">${formatPercent(stats.dayCount === 0 ? 0 : (stats.totalChecked / (stats.dayCount * TRACKED_GOALS.length)) * 100)}</td>
        <td class="footer-note">Full month</td>
      </tr>
    `;
  }

  function renderYearlyTable() {
    const stats = getYearStats(state.selectedYearlyYear);
    const yearlyPossibleByGoal = stats.months.reduce((sum, month) => sum + month.dayCount, 0);

    elements.trackedMonths.textContent = String(stats.trackedMonths);
    elements.yearlyTotal.textContent = String(stats.totalChecked);
    elements.yearlyPercentage.textContent = formatPercent(stats.completion);
    elements.heroCompletion.textContent = formatPercent(stats.completion);
    elements.heroTotal.textContent = `${stats.totalChecked} of ${stats.totalPossible} goals met`;
    elements.heroDaysLeft.textContent = `${getDaysLeftInYear(state.selectedYearlyYear)} days left in year`;

    elements.yearlyHead.innerHTML = `
      <tr>
        <th scope="col">Month</th>
        ${TRACKED_GOALS.map((goal) => `<th scope="col">${goal}</th>`).join("")}
        <th scope="col">Monthly total</th>
        <th scope="col">Completion</th>
      </tr>
    `;

    renderYearlyCards(stats);

    elements.yearlyBody.innerHTML = `${stats.months.map((month) => `
      <tr>
        <th scope="row"><div class="month-name">${month.name}</div><div class="month-meta">${month.dayCount} days</div></th>
        ${TRACKED_GOALS.map((goal) => `<td><div class="month-name">${month.totalsByGoal[goal]}</div><div class="month-meta">${formatPercent(month.dayCount === 0 ? 0 : (month.totalsByGoal[goal] / month.dayCount) * 100)}</div></td>`).join("")}
        <td class="stat-value">${month.totalChecked}</td>
        <td class="stat-value">${formatPercent(month.completion)}</td>
      </tr>
    `).join("")}
      <tr>
        <th scope="row">Year total</th>
        ${TRACKED_GOALS.map((goal) => `<td><div class="month-name">${stats.totalsByGoal[goal]}</div><div class="month-meta">${formatPercent(yearlyPossibleByGoal === 0 ? 0 : (stats.totalsByGoal[goal] / yearlyPossibleByGoal) * 100)}</div></td>`).join("")}
        <td class="stat-value">${stats.totalChecked}</td>
        <td class="stat-value">${formatPercent(stats.completion)}</td>
      </tr>`;
  }

  function renderSyncStatus(message = "") {
    if (!elements.syncStatus || !elements.syncCodeInput) {
      return;
    }

    elements.syncCodeInput.value = state.syncCode || "";

    if (message) {
      elements.syncStatus.textContent = message;
      return;
    }

    if (!state.syncCode) {
      elements.syncStatus.textContent = "Local-only mode. Add the same sync code on both devices to share data.";
      return;
    }

    if (state.isSyncing) {
      elements.syncStatus.textContent = "Syncing shared data...";
      return;
    }

    if (state.lastSyncError) {
      elements.syncStatus.textContent = state.lastSyncError;
      return;
    }

    if (state.lastSyncedAt) {
      elements.syncStatus.textContent = `Sync active. Last synced ${new Date(state.lastSyncedAt).toLocaleString()}.`;
      return;
    }

    elements.syncStatus.textContent = "Sync code saved. Connect to load shared data.";
  }

  async function hashSyncCode(code) {
    const data = new TextEncoder().encode(code.trim());
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest)).map((value) => value.toString(16).padStart(2, "0")).join("");
  }

  async function fetchSyncRecord() {
    const response = await fetch(`${SYNC_ENDPOINT}?syncId=${state.syncId}`, { cache: "no-store" });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || "Unable to fetch sync data.");
    }
    return payload.record;
  }

  function applyRemoteRecord(record) {
    if (!record || !record.data) {
      return false;
    }

    const remoteData = normalizeData(record.data);
    const remoteUpdatedAt = Number(record.updatedAt || remoteData.meta.lastUpdatedAt || 0);
    const localUpdatedAt = Number(state.data.meta.lastUpdatedAt || 0);

    if (remoteUpdatedAt < localUpdatedAt) {
      return false;
    }

    remoteData.meta.lastUpdatedAt = remoteUpdatedAt;
    state.data = remoteData;
    state.lastSyncedAt = remoteUpdatedAt || Date.now();
    saveData({ skipSync: true });
    refreshAll();
    return true;
  }

  async function postSyncRecord() {
    const response = await fetch(SYNC_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        syncId: state.syncId,
        updatedAt: state.data.meta.lastUpdatedAt || Date.now(),
        data: state.data,
      }),
    });

    const payload = await response.json();
    if (response.status === 409 && payload.record) {
      applyRemoteRecord(payload.record);
      return;
    }

    if (!response.ok) {
      throw new Error(payload.error || "Unable to save sync data.");
    }

    state.lastSyncedAt = Number(payload.record?.updatedAt || Date.now());
    state.lastSyncError = "";
    renderSyncStatus();
  }

  function scheduleSyncPush() {
    if (!state.syncId) {
      return;
    }

    window.clearTimeout(state.syncTimer);
    state.syncTimer = window.setTimeout(() => {
      pushSyncData();
    }, 700);
  }

  async function pushSyncData() {
    if (!state.syncId || state.isSyncing) {
      return;
    }

    state.isSyncing = true;
    renderSyncStatus();
    try {
      await postSyncRecord();
    } catch (error) {
      state.lastSyncError = error.message === "Blob storage is not configured yet."
        ? "Add Vercel Blob to the project to enable shared sync."
        : error.message;
    } finally {
      state.isSyncing = false;
      renderSyncStatus();
    }
  }

  async function pullSyncData(silent = false) {
    if (!state.syncId) {
      return;
    }

    if (!silent) {
      state.isSyncing = true;
      renderSyncStatus();
    }

    try {
      const record = await fetchSyncRecord();
      if (record) {
        applyRemoteRecord(record);
      } else {
        state.lastSyncedAt = Date.now();
        state.lastSyncError = "";
      }
    } catch (error) {
      state.lastSyncError = error.message === "Blob storage is not configured yet."
        ? "Add Vercel Blob to the project to enable shared sync."
        : error.message;
    } finally {
      if (!silent) {
        state.isSyncing = false;
      }
      renderSyncStatus();
    }
  }

  function startSyncPolling() {
    window.clearInterval(state.syncPollTimer);
    if (!state.syncId) {
      return;
    }
    state.syncPollTimer = window.setInterval(() => {
      if (!document.hidden) {
        pullSyncData(true);
      }
    }, 30000);
  }

  async function connectSync(code) {
    state.syncCode = code.trim();
    saveSyncSettings();

    if (!state.syncCode) {
      state.syncId = null;
      state.lastSyncError = "";
      state.lastSyncedAt = null;
      window.clearInterval(state.syncPollTimer);
      renderSyncStatus();
      return;
    }

    state.isSyncing = true;
    renderSyncStatus();

    try {
      state.syncId = await hashSyncCode(state.syncCode);
      const remote = await fetchSyncRecord();
      if (remote && remote.data) {
        const remoteUpdatedAt = Number(remote.updatedAt || remote.data.meta?.lastUpdatedAt || 0);
        const localUpdatedAt = Number(state.data.meta.lastUpdatedAt || 0);
        if (remoteUpdatedAt >= localUpdatedAt) {
          applyRemoteRecord(remote);
        } else {
          await postSyncRecord();
        }
      } else {
        await postSyncRecord();
      }
      state.lastSyncError = "";
      startSyncPolling();
    } catch (error) {
      state.syncId = null;
      state.lastSyncError = error.message === "Blob storage is not configured yet."
        ? "Add Vercel Blob to the project to enable shared sync."
        : error.message;
    } finally {
      state.isSyncing = false;
      renderSyncStatus();
    }
  }

  function switchTab(nextTab) {
    state.activeTab = nextTab;
    elements.tabButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.tab === nextTab));
    elements.panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === nextTab));
    if (elements.mobileTabSelect) {
      elements.mobileTabSelect.value = nextTab;
    }
  }

  function refreshAll() {
    populateControls();
    renderMonthlyTable();
    renderYearlyTable();
    renderGraphPanel();
    renderSyncStatus();
  }

  function bindEvents() {
    elements.monthSelect.addEventListener("change", (event) => {
      state.selectedMonth = Number(event.target.value);
      renderMonthlyTable();
    });

    elements.yearSelect.addEventListener("change", (event) => {
      state.selectedYear = Number(event.target.value);
      renderMonthlyTable();
    });

    elements.yearlyYearSelect.addEventListener("change", (event) => {
      state.selectedYearlyYear = Number(event.target.value);
      renderYearlyTable();
      renderMonthlyTable();
    });

    elements.studyGoalInput.addEventListener("change", (event) => {
      setMonthGoal(state.selectedYear, state.selectedMonth, "studyGoal", event.target.value);
      refreshAll();
    });

    elements.proteinGoalInput.addEventListener("change", (event) => {
      setMonthGoal(state.selectedYear, state.selectedMonth, "proteinGoal", event.target.value);
      refreshAll();
    });

    elements.bedtimeGoalInput.addEventListener("change", (event) => {
      setMonthGoal(state.selectedYear, state.selectedMonth, "bedtimeGoal", event.target.value);
      refreshAll();
    });

    elements.tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        switchTab(button.dataset.tab);
        if (button.dataset.tab === "graphs") {
          renderGraphPanel();
        }
      });
    });

    if (elements.mobileTabSelect) {
      elements.mobileTabSelect.addEventListener("change", (event) => {
        switchTab(event.target.value);
        if (event.target.value === "graphs") {
          renderGraphPanel();
        }
      });
    }

    if (elements.syncConnectButton) {
      elements.syncConnectButton.addEventListener("click", () => {
        connectSync(elements.syncCodeInput.value);
      });
    }

    if (elements.syncRefreshButton) {
      elements.syncRefreshButton.addEventListener("click", () => {
        pullSyncData();
      });
    }

    if (elements.syncCodeInput) {
      elements.syncCodeInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          connectSync(elements.syncCodeInput.value);
        }
      });
    }

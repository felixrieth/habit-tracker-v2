    window.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        pullSyncData(true);
      }
    });

    elements.graphStartInput.addEventListener("change", (event) => {
      state.graphStart = event.target.value;
      renderGraphPanel();
    });

    elements.graphEndInput.addEventListener("change", (event) => {
      state.graphEnd = event.target.value;
      renderGraphPanel();
    });

    elements.graphMetricSelect.addEventListener("change", (event) => {
      state.graphMetric = event.target.value;
      renderGraphPanel();
    });

    const showGraphTooltip = (clientX, clientY) => {
      const rect = elements.graphCanvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const nearest = state.graphPlotPoints.reduce((best, point) => {
        const distance = Math.hypot(point.x - x, point.y - y);
        if (!best || distance < best.distance) {
          return { point, distance };
        }
        return best;
      }, null);

      if (!nearest || nearest.distance > 22) {
        hideGraphTooltip();
        return;
      }

      const { point } = nearest;
      elements.graphTooltip.hidden = false;
      elements.graphTooltip.innerHTML = `<strong>${formatDateLabel(point.date)}</strong><span>${formatGraphValue(point.metric, point.value, point.format)}</span>`;
      elements.graphTooltip.style.left = `${Math.min(rect.width - 140, point.x + 12)}px`;
      elements.graphTooltip.style.top = `${Math.max(12, point.y - 18)}px`;
    };

    elements.graphCanvas.addEventListener("mousemove", (event) => {
      showGraphTooltip(event.clientX, event.clientY);
    });

    elements.graphCanvas.addEventListener("touchstart", (event) => {
      const touch = event.touches[0];
      if (touch) {
        showGraphTooltip(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    elements.graphCanvas.addEventListener("touchmove", (event) => {
      const touch = event.touches[0];
      if (touch) {
        showGraphTooltip(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    elements.graphCanvas.addEventListener("mouseleave", () => {
      hideGraphTooltip();
    });

    elements.graphCanvas.addEventListener("touchend", () => {
      hideGraphTooltip();
    });

    elements.todayStrip.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-today-action]");
      if (!button) {
        return;
      }

      const { year, monthIndex, day } = getTodayParts();
      const dayRecord = getDayRecord(year, monthIndex, day);
      const action = button.dataset.todayAction;
      state.selectedYear = year;
      state.selectedMonth = monthIndex;

      refreshAll();
    });

    elements.todayStrip.addEventListener("change", (event) => {
      const input = event.target;
      const { year, monthIndex, day } = getTodayParts();
      state.selectedYear = year;
      state.selectedMonth = monthIndex;

      if (input.matches('input[data-today-action="toggle"]')) {
        setDayValue(year, monthIndex, day, input.dataset.goal, input.checked);
        refreshAll();
      }

      if (input === elements.todayStudyInput) {
        setDayValue(year, monthIndex, day, "studyHours", input.value);
        refreshAll();
      }

      if (input === elements.todayProteinInput) {
        setDayValue(year, monthIndex, day, "proteinGrams", input.value);
        refreshAll();
      }

      if (input === elements.todayBedtimeInput) {
        setDayValue(year, monthIndex, day, "bedtime", input.value);
        refreshAll();
      }
    });

    const handleDayInputChange = (input) => {
      const day = Number(input.dataset.day);
      const kind = input.dataset.kind;

      if (kind === "checkbox") {
        setDayValue(state.selectedYear, state.selectedMonth, day, input.dataset.goal, input.checked);
      }

      if (kind === "study") {
        setDayValue(state.selectedYear, state.selectedMonth, day, "studyHours", input.value);
      }

      if (kind === "protein") {
        setDayValue(state.selectedYear, state.selectedMonth, day, "proteinGrams", input.value);
      }

      if (kind === "bedtime") {
        setDayValue(state.selectedYear, state.selectedMonth, day, "bedtime", input.value);
      }

      if (kind === "note") {
        setDayValue(state.selectedYear, state.selectedMonth, day, "notes", input.value);
      }

      refreshAll();
    };

    elements.monthlyBody.addEventListener("change", (event) => {
      handleDayInputChange(event.target);
    });

    elements.monthlyCards.addEventListener("change", (event) => {
      handleDayInputChange(event.target);
    });
  }

  async function init() {
    saveData({ skipSync: true });
    populateControls();
    bindEvents();
    switchTab(state.activeTab);
    renderMonthlyTable();
    renderYearlyTable();
    renderGraphPanel();
    renderSyncStatus();

    if (state.syncCode) {
      await connectSync(state.syncCode);
    }

    state.isBooting = false;
  }

  init();
})();

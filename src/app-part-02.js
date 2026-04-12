        return actual >= target * 0.65 ? "partial" : "fail";
      }
      return future ? "empty" : "fail";
    }

    if (goal === "Bedtime") {
      const actual = normalizeBedtimeMinutes(dayRecord.bedtime || "");
      const target = normalizeBedtimeMinutes(monthGoals.bedtime);
      if (actual === null) {
        return future ? "empty" : "empty";
      }
      if (target === null) {
        return "empty";
      }
      if (actual <= target) {
        return "success";
      }
      if (actual - target <= 60) {
        return "partial";
      }
      return "fail";
    }

    if (dayRecord[goal]) {
      return "success";
    }

    return future ? "empty" : "fail";
  }

  function getDayGoalCount(year, monthIndex, day) {
    return TRACKED_GOALS.reduce((sum, goal) => sum + (isGoalChecked(year, monthIndex, day, goal) ? 1 : 0), 0);
  }

  function getGoalsMetStatus(year, monthIndex, day) {
    const count = getDayGoalCount(year, monthIndex, day);
    if (count === TRACKED_GOALS.length) {
      return "success";
    }
    if (count > 0) {
      return "partial";
    }
    return isFutureDate(year, monthIndex, day) ? "empty" : "fail";
  }

  function getTodayParts() {
    return {
      year: today.getFullYear(),
      monthIndex: today.getMonth(),
      day: today.getDate(),
    };
  }

  function formatMetricValue(value, suffix) {
    if (value === "" || value === null || value === undefined) {
      return "-";
    }
    return `${value}${suffix}`;
  }

  function getStreakStats() {
    const dateKeys = Object.keys(state.data.dates).sort();
    if (dateKeys.length === 0) {
      return { current: 0, best: 0 };
    }

    const firstKey = dateKeys[0];
    const start = new Date(Number(firstKey.slice(0, 4)), Number(firstKey.slice(5, 7)) - 1, Number(firstKey.slice(8, 10)));
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let best = 0;
    let running = 0;

    for (let cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
      if (TRACKED_GOALS.every((goal) => isGoalChecked(cursor.getFullYear(), cursor.getMonth(), cursor.getDate(), goal))) {
        running += 1;
        best = Math.max(best, running);
      } else {
        running = 0;
      }
    }

    let current = 0;
    const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (!TRACKED_GOALS.every((goal) => isGoalChecked(cursor.getFullYear(), cursor.getMonth(), cursor.getDate(), goal))) {
      cursor.setDate(cursor.getDate() - 1);
    }
    while (cursor >= start && TRACKED_GOALS.every((goal) => isGoalChecked(cursor.getFullYear(), cursor.getMonth(), cursor.getDate(), goal))) {
      current += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    return { current, best };
  }

  function renderTodayCard() {
    const { year, monthIndex, day } = getTodayParts();
    const dayRecord = getDayRecord(year, monthIndex, day);
    const streaks = getStreakStats();
    const viewingTodayMonth = state.selectedYear === year && state.selectedMonth === monthIndex;
    const defaultBedtime = getDefaultBedtime(year, monthIndex);
    const displayBedtime = dayRecord.bedtime || defaultBedtime;
    const todayGoalCount = getDayGoalCount(year, monthIndex, day);

    elements.todayDate.textContent = `${WEEKDAYS[new Date(year, monthIndex, day).getDay()]}, ${MONTHS[monthIndex]} ${day}, ${year}`;
    elements.todayCompletion.textContent = `${todayGoalCount}/${TRACKED_GOALS.length} goals met`;
    elements.todayContext.textContent = viewingTodayMonth
      ? "Quick updates apply to today instantly."
      : `Quick updates target today and switch the table back to ${MONTHS[monthIndex]} ${year}.`;
    elements.todayStudyInput.value = dayRecord.studyHours || "";
    elements.todayProteinInput.value = dayRecord.proteinGrams || "";
    elements.todayBedtimeInput.value = dayRecord.bedtime || defaultBedtime;

    const toggleConfigs = [
      [elements.todaySportsCard, elements.todaySportsToggle, "Sports"],
      [elements.todaySupplementsCard, elements.todaySupplementsToggle, "Supplements"],
      [elements.todayFriendsCard, elements.todayFriendsToggle, "Friends"],
      [elements.todayXCard, elements.todayXToggle, "X"],
      [elements.todayReadCard, elements.todayReadToggle, "Read"],
    ];

    toggleConfigs.forEach(([card, input, goal]) => {
      const status = getGoalStatus(year, monthIndex, day, goal);
      card.classList.remove("state-success", "state-partial", "state-fail", "state-empty");
      card.classList.add(`state-${status}`);
      input.checked = Boolean(dayRecord[goal]);
    });

    [
      [elements.todayStudyCard, getGoalStatus(year, monthIndex, day, "Study")],
      [elements.todayProteinCard, getGoalStatus(year, monthIndex, day, "Protein")],
      [elements.todayBedtimeCard, getGoalStatus(year, monthIndex, day, "Bedtime")],
    ].forEach(([element, status]) => {
      element.classList.remove("state-success", "state-partial", "state-fail", "state-empty");
      element.classList.add(`state-${status}`);
    });

    elements.currentStreak.textContent = String(streaks.current);
    elements.bestStreak.textContent = String(streaks.best);
    elements.heroCompletion.textContent = formatPercent(getYearStats(state.selectedYearlyYear).completion);
  }

  function getPassedDaysInMonth(year, monthIndex) {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const dayCount = getDaysInMonth(year, monthIndex);

    if (year < currentYear || (year === currentYear && monthIndex < currentMonth)) {
      return dayCount;
    }

    if (year === currentYear && monthIndex === currentMonth) {
      return Math.min(today.getDate(), dayCount);
    }

    return 0;
  }

  function getMonthStats(year, monthIndex) {
    const dayCount = getDaysInMonth(year, monthIndex);
    const passedDays = getPassedDaysInMonth(year, monthIndex);
    const totalsByGoal = {};
    const passedTotalsByGoal = {};
    let totalChecked = 0;

    TRACKED_GOALS.forEach((goal) => {
      totalsByGoal[goal] = 0;
      passedTotalsByGoal[goal] = 0;
    });

    for (let day = 1; day <= dayCount; day += 1) {
      TRACKED_GOALS.forEach((goal) => {
        if (isGoalChecked(year, monthIndex, day, goal)) {
          totalsByGoal[goal] += 1;
          totalChecked += 1;
          if (day <= passedDays) {
            passedTotalsByGoal[goal] += 1;
          }
        }
      });
    }

    const possibleChecks = dayCount * TRACKED_GOALS.length;
    const completion = possibleChecks === 0 ? 0 : (totalChecked / possibleChecks) * 100;

    return {
      dayCount,
      passedDays,
      totalsByGoal,
      passedTotalsByGoal,
      totalChecked,
      completion,
      possibleChecks,
    };
  }

  function getYearStats(year) {
    const months = MONTHS.map((name, monthIndex) => ({
      name,
      monthIndex,
      ...getMonthStats(year, monthIndex),
    }));

    const totalPossible = months.reduce((sum, month) => sum + month.possibleChecks, 0);
    const totalChecked = months.reduce((sum, month) => sum + month.totalChecked, 0);
    const trackedMonths = months.filter((month) => month.totalChecked > 0).length;
    const completion = totalPossible === 0 ? 0 : (totalChecked / totalPossible) * 100;
    const totalsByGoal = TRACKED_GOALS.reduce((accumulator, goal) => {
      accumulator[goal] = months.reduce((sum, month) => sum + month.totalsByGoal[goal], 0);
      return accumulator;
    }, {});

    return {
      months,
      totalPossible,
      totalChecked,
      trackedMonths,
      completion,
      totalsByGoal,
    };
  }

  function formatPercent(value) {
    return `${Math.round(value)}%`;
  }


  function renderMonthlyCards(stats) {
    elements.monthlyCards.innerHTML = Array.from({ length: stats.dayCount }, (_, index) => {
      const day = index + 1;
      const dayRecord = getDayRecord(state.selectedYear, state.selectedMonth, day);
      const cards = GOALS.map((goal) => {
        const status = getGoalStatus(state.selectedYear, state.selectedMonth, day, goal);

        if (goal === "Study") {
          return `<label class="day-card-item state-${status}"><span class="day-card-label">Study</span><input class="metric-input" type="number" min="0" step="0.25" inputmode="decimal" data-kind="study" data-day="${day}" value="${dayRecord.studyHours || ""}" /></label>`;
        }

        if (goal === "Protein") {
          return `<label class="day-card-item state-${status}"><span class="day-card-label">Protein</span><input class="metric-input" type="number" min="0" step="1" inputmode="numeric" data-kind="protein" data-day="${day}" value="${dayRecord.proteinGrams || ""}" /></label>`;
        }

        if (goal === "Bedtime") {
          return `<label class="day-card-item state-${status}"><span class="day-card-label">Bedtime</span><input class="bedtime-input" type="time" data-kind="bedtime" data-day="${day}" value="${dayRecord.bedtime || ""}" /></label>`;
        }

        const checked = isGoalChecked(state.selectedYear, state.selectedMonth, day, goal) ? " checked" : "";
        return `<label class="day-card-item state-${status}"><span class="day-card-label">${goal}</span><span class="checkbox-wrap"><input class="habit-checkbox" type="checkbox" data-kind="checkbox" data-goal="${goal}" data-day="${day}"${checked} /></span></label>`;
      }).join("");

      const goalsMetCount = getDayGoalCount(state.selectedYear, state.selectedMonth, day);
      const goalsMetStatus = getGoalsMetStatus(state.selectedYear, state.selectedMonth, day);

      return `
        <article class="day-card">
          <div class="day-card-header">
            <div class="day-card-title">${day} ${getWeekdayLabel(state.selectedYear, state.selectedMonth, day)}</div>
            <div class="day-card-meta state-${goalsMetStatus}">${goalsMetCount}/${TRACKED_GOALS.length} goals met</div>
          </div>
          <div class="day-card-grid">${cards}</div>
          <div class="day-card-note">
            <label>
              <span class="day-card-label">Notes</span>
              <textarea class="note-input" data-kind="note" data-day="${day}">${dayRecord.notes || ""}</textarea>
            </label>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderYearlyCards(stats) {
    elements.yearlyCards.innerHTML = stats.months.map((month) => {
      const goalLines = TRACKED_GOALS.map((goal) => `
        <div class="year-card-item">
          <span class="day-card-label">${goal}</span>
          <strong>${month.totalsByGoal[goal]}</strong>
        </div>
      `).join("");

      return `
        <article class="day-card year-card">
          <div class="day-card-header">
            <div>
              <div class="day-card-title">${month.name}</div>
              <div class="day-card-meta">${month.dayCount} days</div>
            </div>
            <div class="day-card-meta">${formatPercent(month.completion)}</div>
          </div>
          <div class="year-card-grid">${goalLines}</div>
          <div class="year-card-summary">
            <span class="day-card-label">Monthly total</span>
            <strong>${month.totalChecked}</strong>
          </div>
        </article>
      `;
    }).join("");
  }

  function getDaysLeftInMonth(year, monthIndex) {
    const dayCount = getDaysInMonth(year, monthIndex);
    const passedDays = getPassedDaysInMonth(year, monthIndex);
    return Math.max(dayCount - passedDays, 0);
  }

  function getDateFromInputValue(value) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function formatInputDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function formatDateLabel(date) {
    return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}`;
  }

  function getGoalGraphPoint(metric, year, monthIndex, day) {
    const dayRecord = getDayRecord(year, monthIndex, day);

    if (metric === "goals-met-absolute") {
      return { value: getDayGoalCount(year, monthIndex, day), max: TRACKED_GOALS.length, format: "count" };
    }

    if (metric === "goals-met-percentage") {
      return { value: (getDayGoalCount(year, monthIndex, day) / TRACKED_GOALS.length) * 100, max: 100, format: "percent" };
    }

    if (metric === "Study") {
      const value = parseNumber(dayRecord.studyHours);
      const target = parseNumber(getMonthGoals(year, monthIndex).study);
      return { value, max: Math.max(target || 0, value || 0, 1), format: "study" };
    }

    if (metric === "Protein") {
      const value = parseNumber(dayRecord.proteinGrams);
      const target = parseNumber(getMonthGoals(year, monthIndex).protein);
      return { value, max: Math.max(target || 0, value || 0, 1), format: "protein" };
    }

    if (metric === "Bedtime") {
      const value = normalizeBedtimeMinutes(dayRecord.bedtime || "");
      const target = normalizeBedtimeMinutes(getMonthGoals(year, monthIndex).bedtime);
      return { value, max: Math.max(target || 0, value || 0, 24 * 60), min: 20 * 60, format: "bedtime" };
    }

    return { value: isGoalChecked(year, monthIndex, day, metric) ? 100 : 0, max: 100, format: "percent" };
  }

  function renderGraphPanel() {
    const canvas = elements.graphCanvas;
    if (!canvas) {
      return;
    }

    elements.graphStartInput.value = state.graphStart;
    elements.graphEndInput.value = state.graphEnd;
    elements.graphMetricSelect.value = state.graphMetric;
    elements.graphSelectedCount.textContent = state.graphMetric;

    let startDate = getDateFromInputValue(state.graphStart);
    let endDate = getDateFromInputValue(state.graphEnd);
    if (startDate > endDate) {
      const swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    elements.graphPeriodLabel.textContent = `${formatDateLabel(startDate)} - ${formatDateLabel(endDate)}`;

    const context = canvas.getContext("2d");
    const ratio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth || 1200;
    const height = 420;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#fffdf9";
    context.fillRect(0, 0, width, height);

    const dates = [];
    for (let cursor = new Date(startDate); cursor <= endDate; cursor.setDate(cursor.getDate() + 1)) {
      dates.push(new Date(cursor));
    }

    if (dates.length === 0) {
      return;
    }

    const points = dates.map((date) => getGoalGraphPoint(state.graphMetric, date.getFullYear(), date.getMonth(), date.getDate()));
    state.graphPlotPoints = [];
    const values = points.map((point) => point.value).filter((value) => value !== null && value !== undefined);
    const format = points.find((point) => point.format)?.format || "percent";
    const minValue = format === "bedtime" ? Math.min(...points.map((point) => point.min || point.value || 0)) : 0;
    const maxValue = Math.max(...points.map((point) => point.max || point.value || 0), 1);

    const padding = { top: 26, right: 18, bottom: 46, left: 58 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    context.strokeStyle = "rgba(46, 38, 28, 0.18)";
    context.lineWidth = 1;

    const tickValues = format === "bedtime"
      ? [minValue, (minValue + maxValue) / 2, maxValue]
      : [0, maxValue / 2, maxValue];

    tickValues.forEach((tick) => {
      const ratioY = maxValue === minValue ? 0 : (tick - minValue) / (maxValue - minValue);
      const y = padding.top + plotHeight - plotHeight * ratioY;
      context.beginPath();
      context.moveTo(padding.left, y);
      context.lineTo(width - padding.right, y);
      context.stroke();
      context.fillStyle = "#6e5e4d";
      context.font = '12px "Avenir Next", sans-serif';
      const label = format === "percent"
        ? `${Math.round(tick)}%`
        : format === "study"
          ? `${Number(tick.toFixed(1))}h`
          : format === "protein"
            ? `${Math.round(tick)}g`
            : format === "bedtime"
              ? formatTimeLabel(tick)
              : String(Math.round(tick));
      context.fillText(label, 6, y + 4);
    });

    context.strokeStyle = "#246a5a";
    context.lineWidth = 2.5;
    context.beginPath();
    let started = false;
    points.forEach((point, index) => {
      if (point.value === null || point.value === undefined) {
        started = false;
        return;
      }
      const x = dates.length === 1 ? padding.left + plotWidth / 2 : padding.left + (plotWidth * index) / (dates.length - 1);
      const ratioY = maxValue === minValue ? 0.5 : (point.value - minValue) / (maxValue - minValue);
      const y = padding.top + plotHeight - plotHeight * ratioY;
      if (!started) {
        context.moveTo(x, y);
        started = true;
      } else {
        context.lineTo(x, y);
      }
    });
    context.stroke();

    points.forEach((point, index) => {
      if (point.value === null || point.value === undefined) {
        return;
      }
      const x = dates.length === 1 ? padding.left + plotWidth / 2 : padding.left + (plotWidth * index) / (dates.length - 1);
      const ratioY = maxValue === minValue ? 0.5 : (point.value - minValue) / (maxValue - minValue);
      const y = padding.top + plotHeight - plotHeight * ratioY;
      context.fillStyle = "#246a5a";
      context.beginPath();
      context.arc(x, y, 2.8, 0, Math.PI * 2);
      context.fill();
      state.graphPlotPoints.push({
        x,
        y,
        date: dates[index],
        value: point.value,
        format,
        metric: state.graphMetric,
      });
    });

    const tickEvery = Math.max(1, Math.ceil(dates.length / 6));
    dates.forEach((date, index) => {
      if (index % tickEvery !== 0 && index !== dates.length - 1) {
        return;
      }
      const x = dates.length === 1 ? padding.left + plotWidth / 2 : padding.left + (plotWidth * index) / (dates.length - 1);
      context.strokeStyle = "rgba(46, 38, 28, 0.12)";
      context.beginPath();
      context.moveTo(x, padding.top + plotHeight);
      context.lineTo(x, padding.top + plotHeight + 6);
      context.stroke();
      context.fillStyle = "#6e5e4d";
      context.font = '12px "Avenir Next", sans-serif';
      context.fillText(formatDateLabel(date), x - 18, height - 16);
    });
  }

  function formatTimeLabel(totalMinutes) {
    const normalized = Math.round(totalMinutes) % (24 * 60);
    const safe = normalized < 0 ? normalized + 24 * 60 : normalized;
    const hours = String(Math.floor(safe / 60)).padStart(2, "0");
    const minutes = String(safe % 60).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function formatGraphValue(metric, value, format) {
    if (value === null || value === undefined) {
      return "No entry";
    }
    if (metric === "goals-met-absolute") {

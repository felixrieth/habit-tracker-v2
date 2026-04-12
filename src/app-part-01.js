      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "0.5",
      "proteinGrams": "150",
      "bedtime": "02:55",
      "notes": "SKRR SKRR in Meim Audi"
    },
    "2026-02-14": {
      "Sports": false,
      "Supplements": false,
      "Friends": true,
      "X": true,
      "Read": false,
      "studyHours": "1",
      "proteinGrams": "150",
      "bedtime": "02:30",
      "notes": "YESS SIRRR"
    },
    "2026-02-15": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "23:11",
      "notes": "We are so fucking back"
    },
    "2026-02-16": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "01:41",
      "notes": "Brttt"
    },
    "2026-02-17": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "4",
      "proteinGrams": "150",
      "bedtime": "00:20",
      "notes": "Locked TF in"
    },
    "2026-02-18": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "00:47",
      "notes": "Gyros"
    },
    "2026-02-19": {
      "Sports": false,
      "Supplements": false,
      "Friends": true,
      "X": true,
      "Read": false,
      "studyHours": "0",
      "proteinGrams": "150",
      "bedtime": "01:30",
      "notes": "krank"
    },
    "2026-02-20": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "00:32",
      "notes": "krank"
    },
    "2026-02-21": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "03:10",
      "notes": "I wanna hear, I wanna feel, what i thought was never real"
    },
    "2026-02-22": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": false,
      "studyHours": "2",
      "proteinGrams": "150",
      "bedtime": "01:00",
      "notes": "jjjj"
    },
    "2026-02-23": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": false,
      "studyHours": "0",
      "proteinGrams": "150",
      "bedtime": "01:38",
      "notes": "GR POW"
    },
    "2026-02-24": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "2",
      "proteinGrams": "150",
      "bedtime": "23:58",
      "notes": "Am Ender der Jagd werden die Hasen gezählt diggi"
    },
    "2026-02-25": {
      "Sports": false,
      "Supplements": false,
      "Friends": false,
      "X": false,
      "Read": false,
      "studyHours": "",
      "proteinGrams": "",
      "bedtime": "",
      "notes": ""
    },
    "2026-02-26": {
      "Sports": false,
      "Supplements": false,
      "Friends": false,
      "X": false,
      "Read": false,
      "studyHours": "",
      "proteinGrams": "",
      "bedtime": "",
      "notes": ""
    },
    "2026-02-27": {
      "Sports": false,
      "Supplements": false,
      "Friends": false,
      "X": false,
      "Read": false,
      "studyHours": "",
      "proteinGrams": "",
      "bedtime": "",
      "notes": ""
    },
    "2026-02-28": {
      "Sports": false,
      "Supplements": false,
      "Friends": false,
      "X": false,
      "Read": false,
      "studyHours": "",
      "proteinGrams": "",
      "bedtime": "",
      "notes": ""
    }
  },
  "monthGoals": {
    "2026-01": {
      "studyGoal": "1.5",
      "proteinGoal": "150",
      "bedtimeGoal": "23:59"
    },
    "2026-02": {
      "studyGoal": "1.5",
      "proteinGoal": "150",
      "bedtimeGoal": "23:59"
    }
  }
};
  const today = new Date();

  function loadSyncSettings() {
    try {
      const raw = window.localStorage.getItem(SYNC_SETTINGS_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return { code: typeof parsed.code === "string" ? parsed.code : "" };
    } catch (error) {
      return { code: "" };
    }
  }

  const state = {
    data: loadData(),
    selectedMonth: today.getMonth(),
    selectedYear: today.getFullYear(),
    selectedYearlyYear: today.getFullYear(),
    activeTab: "monthly",
    syncCode: loadSyncSettings().code,
    syncId: null,
    syncTimer: null,
    syncPollTimer: null,
    isBooting: true,
    isSyncing: false,
    lastSyncError: "",
    lastSyncedAt: null,
    graphMetric: "Study",
    graphStart: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(Math.max(today.getDate() - 29, 1)).padStart(2, "0")}`,
    graphEnd: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}` ,
    graphPlotPoints: [],
  };

  const elements = {
    monthSelect: document.querySelector("#month-select"),
    yearSelect: document.querySelector("#year-select"),
    yearlyYearSelect: document.querySelector("#yearly-year-select"),
    studyGoalInput: document.querySelector("#study-goal-input"),
    proteinGoalInput: document.querySelector("#protein-goal-input"),
    bedtimeGoalInput: document.querySelector("#bedtime-goal-input"),
    monthlyHead: document.querySelector("#monthly-head"),
    monthlyBody: document.querySelector("#monthly-body"),
    monthlyFoot: document.querySelector("#monthly-foot"),
    monthlyCards: document.querySelector("#monthly-cards"),
    yearlyHead: document.querySelector("#yearly-head"),
    yearlyBody: document.querySelector("#yearly-body"),
    yearlyCards: document.querySelector("#yearly-cards"),
    mobileTabSelect: document.querySelector("#mobile-tab-select"),
    syncCodeInput: document.querySelector("#sync-code-input"),
    syncConnectButton: document.querySelector("#sync-connect-button"),
    syncRefreshButton: document.querySelector("#sync-refresh-button"),
    syncStatus: document.querySelector("#sync-status"),
    tabButtons: document.querySelectorAll(".tab-button"),
    panels: document.querySelectorAll(".panel"),
    daysInMonth: document.querySelector("#days-in-month"),
    daysLeftMonth: document.querySelector("#days-left-month"),
    monthChecked: document.querySelector("#month-checked"),
    monthPercentage: document.querySelector("#month-percentage"),
    passedDaysCompletion: document.querySelector("#passed-days-completion"),
    trackedMonths: document.querySelector("#tracked-months"),
    yearlyTotal: document.querySelector("#yearly-total"),
    yearlyPercentage: document.querySelector("#yearly-percentage"),
    heroCompletion: document.querySelector("#hero-completion"),
    heroTotal: document.querySelector("#hero-total"),
    heroDaysLeft: document.querySelector("#hero-days-left"),
    studyNote: document.querySelector("#study-note"),
    proteinNote: document.querySelector("#protein-note"),
    bedtimeNote: document.querySelector("#bedtime-note"),
    todayDate: document.querySelector("#today-date"),
    todayCompletion: document.querySelector("#today-completion"),
    todayContext: document.querySelector("#today-context"),
    todayStudyInput: document.querySelector("#today-study-input"),
    todayProteinInput: document.querySelector("#today-protein-input"),
    todaySportsCard: document.querySelector("#today-sports-card"),
    todayStudyCard: document.querySelector("#today-study-card"),
    todaySupplementsCard: document.querySelector("#today-supplements-card"),
    todayProteinCard: document.querySelector("#today-protein-card"),
    todayFriendsCard: document.querySelector("#today-friends-card"),
    todayBedtimeCard: document.querySelector("#today-bedtime-card"),
    todayXCard: document.querySelector("#today-x-card"),
    todayReadCard: document.querySelector("#today-read-card"),
    todaySportsToggle: document.querySelector("#today-sports-toggle"),
    todaySupplementsToggle: document.querySelector("#today-supplements-toggle"),
    todayFriendsToggle: document.querySelector("#today-friends-toggle"),
    todayXToggle: document.querySelector("#today-x-toggle"),
    todayReadToggle: document.querySelector("#today-read-toggle"),
    todayBedtimeInput: document.querySelector("#today-bedtime-input"),
    currentStreak: document.querySelector("#current-streak"),
    bestStreak: document.querySelector("#best-streak"),
    todayStrip: document.querySelector(".today-strip"),
    graphStartInput: document.querySelector("#graph-start-input"),
    graphEndInput: document.querySelector("#graph-end-input"),
    graphMetricSelect: document.querySelector("#graph-metric-select"),
    graphCanvas: document.querySelector("#graph-canvas"),
    graphPeriodLabel: document.querySelector("#graph-period-label"),
    graphSelectedCount: document.querySelector("#graph-selected-count"),
    graphTooltip: document.querySelector("#graph-tooltip"),
  };

  function normalizeData(parsed) {
    const normalized = {
      dates: parsed && parsed.dates ? parsed.dates : {},
      monthGoals: parsed && parsed.monthGoals ? parsed.monthGoals : {},
      meta: parsed && parsed.meta ? parsed.meta : {},
    };

    const imports = new Set(normalized.meta.imports || []);
    if (!imports.has(IMPORT_TAG)) {
      normalized.dates = {
        ...normalized.dates,
        ...IMPORT_SEED.dates,
      };
      normalized.monthGoals = {
        ...normalized.monthGoals,
        ...IMPORT_SEED.monthGoals,
      };
      imports.add(IMPORT_TAG);
      normalized.meta.imports = Array.from(imports);
    }

    normalized.meta.lastUpdatedAt = Number(normalized.meta.lastUpdatedAt || 0);
    return normalized;
  }

  function loadData() {
    let parsed;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      parsed = raw ? JSON.parse(raw) : {};
    } catch (error) {
      parsed = {};
    }

    return normalizeData(parsed);
  }

  function saveSyncSettings() {
    window.localStorage.setItem(SYNC_SETTINGS_KEY, JSON.stringify({ code: state.syncCode || "" }));
  }

  function touchData() {
    state.data.meta.lastUpdatedAt = Date.now();
  }

  function saveData(options = {}) {
    const { skipSync = false } = options;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
    if (!skipSync && !state.isBooting && state.syncId) {
      scheduleSyncPush();
    }
  }

  function getDaysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
  }

  function isFutureDate(year, monthIndex, day) {
    const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return new Date(year, monthIndex, day) > currentDay;
  }

  function getWeekdayLabel(year, monthIndex, day) {
    return WEEKDAYS[new Date(year, monthIndex, day).getDay()];
  }

  function getDateKey(year, monthIndex, day) {
    return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function getMonthKey(year, monthIndex) {
    return `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
  }

  function ensureDay(dateKey) {
    if (!state.data.dates[dateKey]) {
      state.data.dates[dateKey] = {};
    }
    return state.data.dates[dateKey];
  }

  function ensureMonthGoal(monthKey) {
    if (!state.data.monthGoals[monthKey]) {
      state.data.monthGoals[monthKey] = {};
    }
    return state.data.monthGoals[monthKey];
  }

  function parseTimeToMinutes(value) {
    if (!value || !/^\d{2}:\d{2}$/.test(value)) {
      return null;
    }

    const [hours, minutes] = value.split(":").map(Number);
    if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return null;
    }

    return hours * 60 + minutes;
  }

  function normalizeBedtimeMinutes(value) {
    const minutes = parseTimeToMinutes(value);
    if (minutes === null) {
      return null;
    }
    return minutes < 12 * 60 ? minutes + 24 * 60 : minutes;
  }

  function parseNumber(value) {
    if (value === "" || value === null || value === undefined) {
      return null;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function getMonthGoals(year, monthIndex) {
    const monthKey = getMonthKey(year, monthIndex);
    const monthGoals = state.data.monthGoals[monthKey] || {};
    return {
      study: monthGoals.studyGoal || "",
      protein: monthGoals.proteinGoal || "",
      bedtime: monthGoals.bedtimeGoal || "",
    };
  }

  function getDefaultBedtime(year, monthIndex) {
    const monthGoals = getMonthGoals(year, monthIndex);
    return monthGoals.bedtime || "23:30";
  }


  function setMonthGoal(year, monthIndex, key, value) {
    const monthKey = getMonthKey(year, monthIndex);
    const record = ensureMonthGoal(monthKey);
    record[key] = value;
    touchData();
    saveData();
  }

  function getDayRecord(year, monthIndex, day) {
    const dateKey = getDateKey(year, monthIndex, day);
    return state.data.dates[dateKey] || {};
  }

  function setDayValue(year, monthIndex, day, key, value) {
    const dateKey = getDateKey(year, monthIndex, day);
    const record = ensureDay(dateKey);
    record[key] = value;
    touchData();
    saveData();
  }

  function isGoalChecked(year, monthIndex, day, goal) {
    const dayRecord = getDayRecord(year, monthIndex, day);
    const monthGoals = getMonthGoals(year, monthIndex);

    if (goal === "Study") {
      const actual = parseNumber(dayRecord.studyHours);
      const target = parseNumber(monthGoals.study);
      return actual !== null && target !== null && actual >= target;
    }

    if (goal === "Protein") {
      const actual = parseNumber(dayRecord.proteinGrams);
      const target = parseNumber(monthGoals.protein);
      return actual !== null && target !== null && actual >= target;
    }

    if (goal === "Bedtime") {
      const actual = normalizeBedtimeMinutes(dayRecord.bedtime || "");
      const target = normalizeBedtimeMinutes(monthGoals.bedtime);
      return actual !== null && target !== null && actual <= target;
    }

    return Boolean(dayRecord[goal]);
  }

  function getGoalStatus(year, monthIndex, day, goal) {
    const dayRecord = getDayRecord(year, monthIndex, day);
    const monthGoals = getMonthGoals(year, monthIndex);
    const future = isFutureDate(year, monthIndex, day);

    if (goal === "Study") {
      const actual = parseNumber(dayRecord.studyHours);
      const target = parseNumber(monthGoals.study);
      if (actual === null) {
        return future ? "empty" : "empty";
      }
      if (target === null) {
        return actual > 0 ? "partial" : "empty";
      }
      if (actual >= target) {
        return "success";
      }
      if (actual > 0) {
        return actual >= target * 0.6 ? "partial" : "fail";
      }
      return future ? "empty" : "fail";
    }

    if (goal === "Protein") {
      const actual = parseNumber(dayRecord.proteinGrams);
      const target = parseNumber(monthGoals.protein);
      if (actual === null) {
        return future ? "empty" : "empty";
      }
      if (target === null) {
        return actual > 0 ? "partial" : "empty";
      }
      if (actual >= target) {
        return "success";
      }
      if (actual > 0) {

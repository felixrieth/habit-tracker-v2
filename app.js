(function () {
  const GOALS = ["Sports", "Study", "Supplements", "Protein", "Friends", "X", "Read", "Bedtime"];
  const TRACKED_GOALS = ["Sports", "Study", "Supplements", "Protein", "Friends", "X", "Read", "Bedtime"];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const STORAGE_KEY = "habit-tracker-plus-data-v2";
  const IMPORT_TAG = "excel-import-jan-feb-2026-v1";
  const IMPORT_SEED = {
  "dates": {
    "2026-01-01": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "1",
      "proteinGrams": "150",
      "bedtime": "23:30",
      "notes": "No physical journal entry today, but first day using this habit tracker"
    },
    "2026-01-02": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "1",
      "proteinGrams": "150",
      "bedtime": "03:13",
      "notes": "Enttäuscht, weil ich Paula dieses Wochenende nicht sehen kann, aber erster Arbeitstag bei BDO"
    },
    "2026-01-03": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "8.5",
      "proteinGrams": "150",
      "bedtime": "03:12",
      "notes": "Heute war echt produktiv, nur das mit dem ins Bett gehen hat nicht so gut geklappt. Aber ich bin froh, dass ich zu mir gefunden habe. Ich bin glücklich egal was passiert."
    },
    "2026-01-04": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "7",
      "proteinGrams": "150",
      "bedtime": "01:30",
      "notes": "Produktiver Tag, früher ins Bett als die Nächte davor, aber letzten 2,5 Stunden wären besser im Bett gewesen, morgen geht’s früh raus"
    },
    "2026-01-05": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "23:34",
      "notes": ""
    },
    "2026-01-06": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "0.5",
      "proteinGrams": "150",
      "bedtime": "23:42",
      "notes": "Morgen muss ich in der Bahn mehr lernen. Die Zeit ist sonst verschwendet"
    },
    "2026-01-07": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": false,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "01:42",
      "notes": ""
    },
    "2026-01-08": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "3",
      "proteinGrams": "150",
      "bedtime": "01:30",
      "notes": "Ich rufe morgen Paula an, sie wird sich freuen"
    },
    "2026-01-09": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "02:07",
      "notes": "🚀 Einmal die Woche geht fit, der Trend geht nach oben! Paula anrufen!!! "
    },
    "2026-01-10": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "7.5",
      "proteinGrams": "150",
      "bedtime": "05:00",
      "notes": "LETS GO "
    },
    "2026-01-11": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "6.5",
      "proteinGrams": "150",
      "bedtime": "23:20",
      "notes": "Booyeah"
    },
    "2026-01-12": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "23:40",
      "notes": "Bra macht die AK, alle goals gehittet"
    },
    "2026-01-13": {
      "Sports": false,
      "Supplements": true,
      "Friends": false,
      "X": true,
      "Read": true,
      "studyHours": "2",
      "proteinGrams": "150",
      "bedtime": "23:30",
      "notes": "Morgen geht’s nach Kassel Eywaaaa"
    },
    "2026-01-14": {
      "Sports": false,
      "Supplements": false,
      "Friends": true,
      "X": false,
      "Read": false,
      "studyHours": "2",
      "proteinGrams": "150",
      "bedtime": "00:30",
      "notes": ""
    },
    "2026-01-15": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": false,
      "studyHours": "2",
      "proteinGrams": "150",
      "bedtime": "00:30",
      "notes": ""
    },
    "2026-01-16": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "4",
      "proteinGrams": "150",
      "bedtime": "01:03",
      "notes": "yurrr"
    },
    "2026-01-17": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "9",
      "proteinGrams": "150",
      "bedtime": "00:30",
      "notes": "gurrth"
    },
    "2026-01-18": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": false,
      "studyHours": "9",
      "proteinGrams": "150",
      "bedtime": "01:30",
      "notes": "…"
    },
    "2026-01-19": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "2",
      "proteinGrams": "150",
      "bedtime": "23:00",
      "notes": "Im Him"
    },
    "2026-01-20": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "2",
      "proteinGrams": "150",
      "bedtime": "01:20",
      "notes": "Gute Nacht, schlafen geschickt"
    },
    "2026-01-21": {
      "Sports": false,
      "Supplements": true,
      "Friends": false,
      "X": false,
      "Read": true,
      "studyHours": "3.5",
      "proteinGrams": "150",
      "bedtime": "23:23",
      "notes": "Gute Nacht, schlafen geschickt"
    },
    "2026-01-22": {
      "Sports": true,
      "Supplements": true,
      "Friends": false,
      "X": true,
      "Read": true,
      "studyHours": "4",
      "proteinGrams": "150",
      "bedtime": "23:30",
      "notes": "YURRR"
    },
    "2026-01-23": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": false,
      "studyHours": "6",
      "proteinGrams": "150",
      "bedtime": "02:00",
      "notes": "Not so yurr"
    },
    "2026-01-24": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "7",
      "proteinGrams": "150",
      "bedtime": "02:00",
      "notes": "Grr pow"
    },
    "2026-01-25": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "8",
      "proteinGrams": "150",
      "bedtime": "23:58",
      "notes": "Grr powe"
    },
    "2026-01-26": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "2.5",
      "proteinGrams": "150",
      "bedtime": "22:45",
      "notes": "Hey hey hi miss american pie, take the pedal to the metal and i dont know why"
    },
    "2026-01-27": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "5",
      "proteinGrams": "150",
      "bedtime": "00:30",
      "notes": "Brt"
    },
    "2026-01-28": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "4",
      "proteinGrams": "150",
      "bedtime": "00:50",
      "notes": "Im himmmothy timothy jacksonnnn"
    },
    "2026-01-29": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "3",
      "proteinGrams": "150",
      "bedtime": "01:30",
      "notes": "gr pow"
    },
    "2026-01-30": {
      "Sports": true,
      "Supplements": true,
      "Friends": false,
      "X": true,
      "Read": true,
      "studyHours": "5",
      "proteinGrams": "150",
      "bedtime": "01:30",
      "notes": "Schmeggedischmaggedischmogg"
    },
    "2026-01-31": {
      "Sports": false,
      "Supplements": true,
      "Friends": false,
      "X": true,
      "Read": true,
      "studyHours": "9",
      "proteinGrams": "150",
      "bedtime": "01:00",
      "notes": "Ich mache einen 1,5 Bachelor an der Universität Mannheim"
    },
    "2026-02-01": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "12",
      "proteinGrams": "150",
      "bedtime": "00:30",
      "notes": "This is how we do it. Ich mache einen 1,5 Bachelor"
    },
    "2026-02-02": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": false,
      "studyHours": "13",
      "proteinGrams": "150",
      "bedtime": "23:58",
      "notes": "Brttt"
    },
    "2026-02-03": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": false,
      "studyHours": "13",
      "proteinGrams": "150",
      "bedtime": "23:15",
      "notes": "OH JAAAA"
    },
    "2026-02-04": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "12",
      "proteinGrams": "150",
      "bedtime": "02:30",
      "notes": "BRA MACHT DIE AK"
    },
    "2026-02-05": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "3.5",
      "proteinGrams": "150",
      "bedtime": "01:10",
      "notes": "OH JAAAA"
    },
    "2026-02-06": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": false,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "02:00",
      "notes": "BRAAA"
    },
    "2026-02-07": {
      "Sports": true,
      "Supplements": false,
      "Friends": true,
      "X": true,
      "Read": false,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "02:00",
      "notes": "Wir küssen uns am 14.02.2026"
    },
    "2026-02-08": {
      "Sports": false,
      "Supplements": false,
      "Friends": true,
      "X": true,
      "Read": false,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "02:00",
      "notes": "Paula und ich küssen uns am Valentinstag"
    },
    "2026-02-09": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": false,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "23:40",
      "notes": "Ich liebe mich"
    },
    "2026-02-10": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": false,
      "Read": true,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "23:58",
      "notes": "Ich bin der geilste, ich stehe morgen um 8 Uhr auf und fange direkt bis dennis mich anruft an zu lernen"
    },
    "2026-02-11": {
      "Sports": true,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": true,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "01:00",
      "notes": "Wir küssen uns am 14.02.2026"
    },
    "2026-02-12": {
      "Sports": false,
      "Supplements": true,
      "Friends": true,
      "X": true,
      "Read": false,
      "studyHours": "1.5",
      "proteinGrams": "150",
      "bedtime": "01:52",
      "notes": "aef"
    },
    "2026-02-13": {
      "Sports": true,
      "Supplements": true,
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

  const state = {
    data: loadData(),
    selectedMonth: today.getMonth(),
    selectedYear: today.getFullYear(),
    selectedYearlyYear: today.getFullYear(),
    activeTab: "monthly",
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

  function loadData() {
    let parsed;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      parsed = raw ? JSON.parse(raw) : {};
    } catch (error) {
      parsed = {};
    }

    const normalized = {
      dates: parsed.dates || {},
      monthGoals: parsed.monthGoals || {},
      meta: parsed.meta || {},
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

    return normalized;
  }

  function saveData() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
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

  function init() {
    saveData();
    populateControls();
    bindEvents();
    switchTab(state.activeTab);
    renderMonthlyTable();
    renderYearlyTable();
    renderGraphPanel();
  }

  init();
})();

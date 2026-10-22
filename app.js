(() => {
  "use strict";

  const STORAGE_KEY = "shike-fit-state-v1";
  const KEY_SESSION = "shike-fit-api-key-session";
  const KEY_LOCAL = "shike-fit-api-key-local";
  const MEAL_TYPES = [
    { id: "breakfast", label: "早餐", short: "早" },
    { id: "lunch", label: "午餐", short: "午" },
    { id: "dinner", label: "晚餐", short: "晚" },
    { id: "snack", label: "加餐", short: "加" }
  ];

  const PLAN_BANDS = [
    { max: 3, label: "2–3 次 / 周", carbs: 2.2, protein: 1.4, fat: 0.8 },
    { max: 5, label: "4–5 次 / 周", carbs: 2.5, protein: 1.6, fat: 0.9 },
    { max: 7, label: "6–7 次 / 周", carbs: 3, protein: 1.7, fat: 1 },
    { max: 99, label: "8–9 次 / 周", carbs: 3.5, protein: 1.8, fat: 1 }
  ];

  const FOODS = [
    {
      name: "米饭",
      aliases: ["白米饭", "熟米饭", "米饭"],
      per100: { carbs: 28, protein: 2.6, fat: 0.3, kcal: 130 },
      serving: 150,
      note: "默认按熟重"
    },
    {
      name: "生米",
      aliases: ["生米", "大米"],
      per100: { carbs: 77.9, protein: 7.1, fat: 0.7, kcal: 346 },
      serving: 80,
      note: "生重"
    },
    {
      name: "燕麦",
      aliases: ["燕麦片", "即食燕麦", "燕麦", "麦片"],
      per100: { carbs: 66.3, protein: 14, fat: 7.5, kcal: 380 },
      serving: 40,
      note: "默认按干重"
    },
    {
      name: "全麦面包",
      aliases: ["全麦面包", "全麦吐司", "吐司", "面包"],
      per100: { carbs: 43, protein: 13, fat: 4.2, kcal: 250 },
      serving: 35,
      unitGrams: { 片: 35 },
      note: "一片约 35g"
    },
    {
      name: "馒头",
      aliases: ["白馒头", "馒头"],
      per100: { carbs: 47, protein: 7, fat: 1.1, kcal: 230 },
      serving: 80
    },
    {
      name: "熟面条",
      aliases: ["意大利面", "意面", "面条", "挂面"],
      per100: { carbs: 25, protein: 4.5, fat: 1.1, kcal: 130 },
      serving: 200,
      unitGrams: { 碗: 200 },
      note: "默认按熟重"
    },
    {
      name: "米粉",
      aliases: ["河粉", "米粉", "米线"],
      per100: { carbs: 25, protein: 2, fat: 0.2, kcal: 110 },
      serving: 200,
      unitGrams: { 碗: 200 },
      note: "默认按熟重"
    },
    {
      name: "白粥",
      aliases: ["稀饭", "白粥", "米粥"],
      per100: { carbs: 9.3, protein: 1.1, fat: 0.3, kcal: 46 },
      serving: 300,
      unitGrams: { 碗: 300 }
    },
    {
      name: "红薯",
      aliases: ["地瓜", "红薯"],
      per100: { carbs: 20.1, protein: 1.6, fat: 0.1, kcal: 86 },
      serving: 200
    },
    {
      name: "紫薯",
      aliases: ["紫薯"],
      per100: { carbs: 24, protein: 1.6, fat: 0.2, kcal: 106 },
      serving: 200
    },
    {
      name: "土豆",
      aliases: ["马铃薯", "土豆"],
      per100: { carbs: 17.8, protein: 2, fat: 0.1, kcal: 77 },
      serving: 200
    },
    {
      name: "贝贝南瓜",
      aliases: ["贝贝南瓜", "南瓜"],
      per100: { carbs: 6.5, protein: 1, fat: 0.1, kcal: 26 },
      serving: 200
    },
    {
      name: "玉米",
      aliases: ["甜玉米", "玉米"],
      per100: { carbs: 19, protein: 3.4, fat: 1.5, kcal: 96 },
      serving: 180,
      unitGrams: { 根: 180 }
    },
    {
      name: "鸡胸肉",
      aliases: ["鸡胸肉", "鸡胸", "鸡大胸"],
      per100: { carbs: 0, protein: 23.3, fat: 1.9, kcal: 118 },
      serving: 150,
      note: "按生重估算"
    },
    {
      name: "鸡腿肉",
      aliases: ["去皮鸡腿", "鸡腿肉", "鸡腿"],
      per100: { carbs: 0, protein: 20, fat: 8, kcal: 150 },
      serving: 150,
      unitGrams: { 个: 120 }
    },
    {
      name: "牛肉",
      aliases: ["瘦牛肉", "牛里脊", "牛肉"],
      per100: { carbs: 0, protein: 20.2, fat: 6, kcal: 140 },
      serving: 150
    },
    {
      name: "猪里脊",
      aliases: ["猪里脊", "里脊肉", "瘦猪肉", "猪肉"],
      per100: { carbs: 0, protein: 20.9, fat: 6.3, kcal: 143 },
      serving: 150
    },
    {
      name: "三文鱼",
      aliases: ["三文鱼", "鲑鱼"],
      per100: { carbs: 0, protein: 20.4, fat: 13.4, kcal: 208 },
      serving: 150
    },
    {
      name: "虾",
      aliases: ["虾仁", "大虾", "鲜虾", "虾"],
      per100: { carbs: 0.2, protein: 18.6, fat: 0.8, kcal: 85 },
      serving: 120,
      unitGrams: { 只: 12 }
    },
    {
      name: "鸡蛋",
      aliases: ["水煮蛋", "煎蛋", "全蛋", "鸡蛋", "蛋"],
      per100: { carbs: 1.1, protein: 12.6, fat: 10.6, kcal: 144 },
      serving: 50,
      unitGrams: { 个: 50, 只: 50, 枚: 50 }
    },
    {
      name: "鸡蛋白",
      aliases: ["鸡蛋白", "蛋白液", "蛋白"],
      per100: { carbs: 0.7, protein: 11, fat: 0.2, kcal: 52 },
      serving: 35,
      unitGrams: { 个: 35, 只: 35 }
    },
    {
      name: "豆腐",
      aliases: ["老豆腐", "嫩豆腐", "北豆腐", "南豆腐", "豆腐"],
      per100: { carbs: 2, protein: 8.1, fat: 4.2, kcal: 82 },
      serving: 150
    },
    {
      name: "牛奶",
      aliases: ["纯牛奶", "脱脂牛奶", "低脂牛奶", "牛奶", "奶"],
      per100: { carbs: 4.8, protein: 3.2, fat: 3.6, kcal: 64 },
      serving: 250,
      density: 1,
      unitGrams: { 杯: 250, 盒: 250 }
    },
    {
      name: "无糖希腊酸奶",
      aliases: ["无糖希腊酸奶", "希腊酸奶", "无糖酸奶", "酸奶"],
      per100: { carbs: 4.7, protein: 10, fat: 0.4, kcal: 63 },
      serving: 150,
      unitGrams: { 杯: 150, 盒: 150 }
    },
    {
      name: "乳清蛋白粉",
      aliases: ["乳清蛋白粉", "蛋白粉"],
      per100: { carbs: 7, protein: 78, fat: 5, kcal: 390 },
      serving: 30,
      unitGrams: { 勺: 30 }
    },
    {
      name: "西兰花",
      aliases: ["西蓝花", "西兰花"],
      per100: { carbs: 6.6, protein: 2.8, fat: 0.4, kcal: 34 },
      serving: 200
    },
    {
      name: "菠菜",
      aliases: ["菠菜"],
      per100: { carbs: 3.6, protein: 2.9, fat: 0.4, kcal: 23 },
      serving: 200
    },
    {
      name: "生菜",
      aliases: ["生菜"],
      per100: { carbs: 2.9, protein: 1.4, fat: 0.2, kcal: 15 },
      serving: 200
    },
    {
      name: "黄瓜",
      aliases: ["青瓜", "黄瓜"],
      per100: { carbs: 3.6, protein: 0.7, fat: 0.1, kcal: 16 },
      serving: 200
    },
    {
      name: "番茄",
      aliases: ["西红柿", "番茄"],
      per100: { carbs: 3.9, protein: 0.9, fat: 0.2, kcal: 18 },
      serving: 180,
      unitGrams: { 个: 180 }
    },
    {
      name: "混合蔬菜",
      aliases: ["绿叶菜", "混合蔬菜", "蔬菜", "青菜"],
      per100: { carbs: 5, protein: 1.8, fat: 0.3, kcal: 35 },
      serving: 200
    },
    {
      name: "牛油果",
      aliases: ["鳄梨", "牛油果"],
      per100: { carbs: 8.5, protein: 2, fat: 15.3, kcal: 160 },
      serving: 100,
      unitGrams: { 个: 150 }
    },
    {
      name: "香蕉",
      aliases: ["香蕉"],
      per100: { carbs: 22.8, protein: 1.1, fat: 0.3, kcal: 93 },
      serving: 120,
      unitGrams: { 根: 120, 个: 120 }
    },
    {
      name: "苹果",
      aliases: ["苹果"],
      per100: { carbs: 13.8, protein: 0.3, fat: 0.2, kcal: 53 },
      serving: 180,
      unitGrams: { 个: 180 }
    },
    {
      name: "蓝莓",
      aliases: ["蓝莓"],
      per100: { carbs: 14.5, protein: 0.7, fat: 0.3, kcal: 57 },
      serving: 100,
      unitGrams: { 盒: 125 }
    },
    {
      name: "橙子",
      aliases: ["脐橙", "橙子"],
      per100: { carbs: 11.8, protein: 0.9, fat: 0.1, kcal: 47 },
      serving: 180,
      unitGrams: { 个: 180 }
    },
    {
      name: "橄榄油",
      aliases: ["初榨橄榄油", "橄榄油"],
      per100: { carbs: 0, protein: 0, fat: 100, kcal: 884 },
      serving: 10,
      density: 0.91,
      unitGrams: { 勺: 10 },
      note: "烹饪油最容易漏记"
    },
    {
      name: "花生油",
      aliases: ["菜籽油", "食用油", "花生油"],
      per100: { carbs: 0, protein: 0, fat: 100, kcal: 884 },
      serving: 10,
      density: 0.91,
      unitGrams: { 勺: 10 }
    },
    {
      name: "混合坚果",
      aliases: ["混合坚果", "坚果"],
      per100: { carbs: 20, protein: 20, fat: 52, kcal: 600 },
      serving: 10,
      unitGrams: { 把: 15, 包: 25 }
    },
    {
      name: "杏仁",
      aliases: ["巴旦木", "杏仁"],
      per100: { carbs: 22, protein: 21, fat: 50, kcal: 600 },
      serving: 12,
      unitGrams: { 颗: 1.2 }
    },
    {
      name: "花生",
      aliases: ["花生米", "花生"],
      per100: { carbs: 16, protein: 26, fat: 49, kcal: 567 },
      serving: 15,
      unitGrams: { 颗: 0.8 }
    },
    {
      name: "鹰嘴豆",
      aliases: ["鹰嘴豆"],
      per100: { carbs: 27, protein: 9, fat: 2.6, kcal: 164 },
      serving: 150
    },
    {
      name: "饺子",
      aliases: ["水饺", "饺子"],
      per100: { carbs: 28, protein: 8, fat: 7, kcal: 200 },
      serving: 20,
      unitGrams: { 个: 20, 只: 20 }
    },
    {
      name: "包子",
      aliases: ["肉包", "菜包", "包子"],
      per100: { carbs: 45, protein: 8, fat: 5, kcal: 230 },
      serving: 90,
      unitGrams: { 个: 90 }
    },
    {
      name: "燕麦奶",
      aliases: ["燕麦奶"],
      per100: { carbs: 7, protein: 0.6, fat: 1.5, kcal: 45 },
      serving: 250,
      density: 1,
      unitGrams: { 杯: 250, 盒: 250 }
    },
    {
      name: "番茄炒蛋",
      aliases: ["西红柿炒鸡蛋", "西红柿炒蛋", "番茄炒蛋"],
      per100: { carbs: 4.5, protein: 7.2, fat: 8.4, kcal: 122 },
      serving: 180,
      unitGrams: { 份: 180 },
      note: "已包含常见炒制油"
    },
    {
      name: "青椒肉丝",
      aliases: ["尖椒肉丝", "青椒肉丝"],
      per100: { carbs: 5, protein: 12.5, fat: 9, kcal: 151 },
      serving: 160,
      unitGrams: { 份: 160 }
    },
    {
      name: "鱼香肉丝",
      aliases: ["鱼香肉丝"],
      per100: { carbs: 11, protein: 12, fat: 9.5, kcal: 178 },
      serving: 160,
      unitGrams: { 份: 160 },
      note: "含糖醋汁和烹饪油"
    },
    {
      name: "宫保鸡丁",
      aliases: ["宫爆鸡丁", "宫保鸡丁"],
      per100: { carbs: 9, protein: 16, fat: 11, kcal: 200 },
      serving: 160,
      unitGrams: { 份: 160 }
    },
    {
      name: "麻婆豆腐",
      aliases: ["麻婆豆腐"],
      per100: { carbs: 6, protein: 9, fat: 10, kcal: 150 },
      serving: 180,
      unitGrams: { 份: 180 },
      note: "含红油和勾芡"
    },
    {
      name: "红烧肉",
      aliases: ["红烧五花肉", "红烧肉"],
      per100: { carbs: 4, protein: 13, fat: 27, kcal: 311 },
      serving: 140,
      unitGrams: { 份: 140 }
    },
    {
      name: "清炒时蔬",
      aliases: ["清炒青菜", "炒青菜", "炒时蔬", "食堂青菜", "炒蔬菜"],
      per100: { carbs: 5.2, protein: 1.9, fat: 5.8, kcal: 80 },
      serving: 180,
      unitGrams: { 份: 180 },
      note: "按食堂常见少油炒制估算"
    },
    {
      name: "土豆丝",
      aliases: ["酸辣土豆丝", "炒土豆丝", "土豆丝"],
      per100: { carbs: 17, protein: 2.1, fat: 7, kcal: 139 },
      serving: 160,
      unitGrams: { 份: 160 }
    },
    {
      name: "蛋炒饭",
      aliases: ["食堂炒饭", "蛋炒饭", "炒饭"],
      per100: { carbs: 30, protein: 6, fat: 7, kcal: 207 },
      serving: 300,
      unitGrams: { 份: 300, 碗: 250 }
    },
    {
      name: "西红柿蛋汤",
      aliases: ["番茄蛋汤", "西红柿蛋汤", "西红柿鸡蛋汤"],
      per100: { carbs: 3, protein: 2, fat: 2, kcal: 38 },
      serving: 300,
      unitGrams: { 碗: 300, 份: 300 }
    },
    {
      name: "普通肉类",
      aliases: ["瘦肉", "肉片", "肉"],
      per100: { carbs: 0, protein: 18, fat: 8, kcal: 145 },
      serving: 150,
      note: "普通肉类通用估算"
    }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  let memoryStorage = {};
  let state = null;
  let selectedDate = toDateISO(new Date());
  let currentView = "today";
  let draftMeal = null;

  function safeStorageGet(storage, key) {
    try {
      return storage.getItem(key);
    } catch {
      return memoryStorage[key] || null;
    }
  }

  function safeStorageSet(storage, key, value) {
    try {
      storage.setItem(key, value);
    } catch {
      memoryStorage[key] = value;
    }
  }

  function safeStorageRemove(storage, key) {
    try {
      storage.removeItem(key);
    } catch {
      delete memoryStorage[key];
    }
  }

  function createDefaultState() {
    return {
      version: 1,
      profile: {
        name: "",
        height: 170,
        weight: 70,
        goalWeight: 62,
        sessions: 4,
        setupComplete: false,
        targetMode: "auto",
        customTargets: null
      },
      settings: {
        endpoint: "/api/analyze",
        upstream: "https://api.openai.com/v1/chat/completions",
        model: "gpt-4.1-mini",
        rememberKey: false
      },
      meals: [],
      weights: [],
      calibrations: []
    };
  }

  function loadState() {
    const raw = safeStorageGet(localStorage, STORAGE_KEY);
    if (!raw) return createDefaultState();
    try {
      const parsed = JSON.parse(raw);
      const base = createDefaultState();
      return {
        ...base,
        ...parsed,
        profile: { ...base.profile, ...(parsed.profile || {}) },
        settings: { ...base.settings, ...(parsed.settings || {}) },
        meals: Array.isArray(parsed.meals) ? parsed.meals : [],
        weights: Array.isArray(parsed.weights) ? parsed.weights : [],
        calibrations: Array.isArray(parsed.calibrations) ? parsed.calibrations : []
      };
    } catch {
      return createDefaultState();
    }
  }

  function saveState() {
    safeStorageSet(localStorage, STORAGE_KEY, JSON.stringify(state));
  }

  function toDateISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function parseDateISO(iso) {
    return new Date(`${iso}T12:00:00`);
  }

  function shiftDate(iso, amount) {
    const date = parseDateISO(iso);
    date.setDate(date.getDate() + amount);
    return toDateISO(date);
  }

  function clamp(num, min, max) {
    return Math.min(max, Math.max(min, num));
  }

  function round(value, digits = 0) {
    const factor = 10 ** digits;
    return Math.round((Number(value) + Number.EPSILON) * factor) / factor;
  }

  function formatNumber(value, digits = 0) {
    if (!Number.isFinite(Number(value))) return "0";
    return Number(value).toLocaleString("zh-CN", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    });
  }

  function uid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getMealType(id) {
    return MEAL_TYPES.find((type) => type.id === id) || MEAL_TYPES[1];
  }

  function currentMealType() {
    const hour = new Date().getHours();
    if (hour < 10) return "breakfast";
    if (hour < 15) return "lunch";
    if (hour < 20) return "dinner";
    return "snack";
  }

  function getBand(sessions = state.profile.sessions) {
    return PLAN_BANDS.find((band) => sessions <= band.max) || PLAN_BANDS[0];
  }

  function calculateAutoTargets(weight, sessions) {
    const band = getBand(sessions);
    const carbs = Math.round(weight * band.carbs);
    const protein = Math.round(weight * band.protein);
    const fat = Math.round(weight * band.fat);
    return {
      carbs,
      protein,
      fat,
      kcal: Math.round(carbs * 4 + protein * 4 + fat * 9),
      band,
      source: "auto"
    };
  }

  function getTargets() {
    if (state.profile.targetMode === "manual" && state.profile.customTargets) {
      const custom = state.profile.customTargets;
      const carbs = Number(custom.carbs) || 0;
      const protein = Number(custom.protein) || 0;
      const fat = Number(custom.fat) || 0;
      return {
        carbs,
        protein,
        fat,
        kcal: Math.round(carbs * 4 + protein * 4 + fat * 9),
        band: getBand(),
        source: "manual"
      };
    }
    return calculateAutoTargets(state.profile.weight, state.profile.sessions);
  }

  function macrosForGrams(food, grams) {
    const ratio = Math.max(0, Number(grams) || 0) / 100;
    return {
      carbs: round(food.per100.carbs * ratio, 1),
      protein: round(food.per100.protein * ratio, 1),
      fat: round(food.per100.fat * ratio, 1),
      kcal: round(food.per100.kcal * ratio, 1)
    };
  }

  function parseAmount(raw) {
    if (/^\d+(?:\.\d+)?$/.test(raw)) return Number(raw);
    const map = {
      半: 0.5,
      一: 1,
      两: 2,
      二: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6,
      七: 7,
      八: 8,
      九: 9,
      十: 10
    };
    if (map[raw] != null) return map[raw];
    if (raw.startsWith("十")) return 10 + (map[raw.slice(1)] || 0);
    if (raw.includes("十")) {
      const [tens, ones] = raw.split("十");
      return (map[tens] || 1) * 10 + (map[ones] || 0);
    }
    return Number(raw);
  }

  function parseFoodText(text) {
    const source = String(text || "").trim();
    if (!source) return [];

    const candidates = [];
    FOODS.forEach((food) => {
      food.aliases.forEach((alias) => {
        let from = 0;
        while (from < source.length) {
          const index = source.indexOf(alias, from);
          if (index < 0) break;
          candidates.push({
            food,
            alias,
            start: index,
            end: index + alias.length
          });
          from = index + alias.length;
        }
      });
    });

    candidates.sort((a, b) => b.alias.length - a.alias.length || a.start - b.start);
    const selected = [];
    const occupied = [];
    candidates.forEach((candidate) => {
      const overlaps = occupied.some(
        (range) => candidate.start < range.end && candidate.end > range.start
      );
      if (overlaps) return;
      occupied.push({ start: candidate.start, end: candidate.end });
      selected.push(candidate);
    });
    selected.sort((a, b) => a.start - b.start);

    return selected.map((match, index) => {
      const nextStart = selected[index + 1]?.start ?? source.length;
      const after = source.slice(match.end, Math.min(nextStart, match.end + 30));
      const before = source.slice(Math.max(0, match.start - 16), match.start);
      const amountMatch =
        after.match(
          /(半|一|两|二|三|四|五|六|七|八|九|十|十[一二三四五六七八九]|[一二三四五六七八九]十[一二三四五六七八九]?|\d+(?:\.\d+)?)\s*(kg|公斤|g|克|ml|毫升|个|只|枚|颗|片|碗|杯|勺|份|根|张|把|两)/i
        ) ||
        before.match(
          /(半|一|两|二|三|四|五|六|七|八|九|十|十[一二三四五六七八九]|[一二三四五六七八九]十[一二三四五六七八九]?|\d+(?:\.\d+)?)\s*(kg|公斤|g|克|ml|毫升|个|只|枚|颗|片|碗|杯|勺|份|根|张|把|两)/i
        );

      let grams = match.food.serving;
      let quantityText = `${match.food.serving}g`;
      if (amountMatch) {
        const amount = parseAmount(amountMatch[1]);
        const unit = amountMatch[2].toLowerCase();
        if (unit === "kg" || unit === "公斤") {
          grams = amount * 1000;
        } else if (unit === "g" || unit === "克") {
          grams = amount;
        } else if (unit === "ml" || unit === "毫升") {
          grams = amount * (match.food.density || 1);
        } else if (unit === "两") {
          grams = amount * 50;
        } else {
          const unitWeight = match.food.unitGrams?.[unit] || match.food.serving;
          grams = amount * unitWeight;
        }
        quantityText = `${amountMatch[1]}${amountMatch[2]}`;
      }

      grams = Math.max(1, round(grams, 1));
      const macros = macrosForGrams(match.food, grams);
      return {
        id: uid(),
        name: match.food.name,
        grams,
        ...macros,
        quantityText,
        confidence: amountMatch ? 0.95 : 0.7,
        source: "text",
        note: match.food.note || ""
      };
    });
  }

  function totalItems(items) {
    return (items || []).reduce(
      (sum, item) => {
        sum.carbs += Number(item.carbs) || 0;
        sum.protein += Number(item.protein) || 0;
        sum.fat += Number(item.fat) || 0;
        sum.kcal += Number(item.kcal) || 0;
        return sum;
      },
      { carbs: 0, protein: 0, fat: 0, kcal: 0 }
    );
  }

  function normalizeTotals(totals) {
    return {
      carbs: round(totals.carbs, 1),
      protein: round(totals.protein, 1),
      fat: round(totals.fat, 1),
      kcal: round(totals.kcal, 0)
    };
  }

  function mealsForDate(date = selectedDate) {
    return state.meals
      .filter((meal) => meal.date === date)
      .sort((a, b) => {
        const order = { breakfast: 0, lunch: 1, dinner: 2, snack: 3 };
        return (order[a.type] ?? 9) - (order[b.type] ?? 9) || a.createdAt.localeCompare(b.createdAt);
      });
  }

  function dayTotals(date = selectedDate) {
    return normalizeTotals(
      totalItems(mealsForDate(date).flatMap((meal) => meal.items || []))
    );
  }

  function findLatestWeight(onOrBefore = selectedDate) {
    return [...state.weights]
      .filter((entry) => entry.date <= onOrBefore)
      .sort((a, b) => b.date.localeCompare(a.date))[0] || null;
  }

  function toast(message, type = "success") {
    const region = $("#toast-region");
    const item = document.createElement("div");
    item.className = `toast${type === "error" ? " is-error" : ""}`;
    item.textContent = message;
    region.appendChild(item);
    window.setTimeout(() => {
      item.style.opacity = "0";
      item.style.transform = "translateY(6px)";
      window.setTimeout(() => item.remove(), 220);
    }, 3000);
  }

  function switchView(view) {
    currentView = view;
    $$(".view").forEach((section) => {
      section.classList.toggle("is-active", section.id === `view-${view}`);
    });
    $$("[data-view]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.view === view);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (view === "today") renderToday();
    if (view === "trends") renderTrends();
    if (view === "plan") renderPlan();
    if (view === "settings") fillSettings();
  }

  function updateDateUI() {
    const date = parseDateISO(selectedDate);
    $("#date-label").textContent = `${date.getMonth() + 1}月${date.getDate()}日`;
    $("#date-weekday").textContent =
      selectedDate === toDateISO(new Date())
        ? "今天"
        : new Intl.DateTimeFormat("zh-CN", { weekday: "long" }).format(date);
    $("#date-input").value = selectedDate;
    $("#next-day").disabled = selectedDate >= toDateISO(new Date());
    $("#next-day").style.opacity = selectedDate >= toDateISO(new Date()) ? "0.38" : "1";
    const overdue = selectedDate < toDateISO(new Date());
    const target = getTargets();
    $("#today-eyebrow").textContent = overdue ? "补记这一天" : "今天，认真吃饭";
    $("#welcome-title").textContent =
      selectedDate === toDateISO(new Date())
        ? "记录，是身体变化的第一笔。"
        : `把 ${date.getMonth() + 1} 月 ${date.getDate()} 日 吃下的，也认真记下来。`;
    $("#welcome-copy").textContent = overdue
      ? "补记不需要追求绝对精确，尽量还原食物和份量即可。"
      : `今天的计划是 ${target.kcal} 千卡。别只盯着数字，先照顾好每一餐。`;
  }

  function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function renderToday() {
    updateDateUI();
    const targets = getTargets();
    const totals = dayTotals();
    const remaining = targets.kcal - totals.kcal;
    const caloriePercent = targets.kcal ? clamp((totals.kcal / targets.kcal) * 100, 0, 100) : 0;

    $("#calorie-ring").style.setProperty("--progress", `${caloriePercent * 3.6}deg`);
    setValue("remaining-kcal", formatNumber(remaining));
    setValue("target-kcal", `${formatNumber(targets.kcal)} kcal`);
    setValue("consumed-kcal", `${formatNumber(totals.kcal)} kcal`);
    setValue("carb-consumed", formatNumber(totals.carbs, totals.carbs % 1 ? 1 : 0));
    setValue("protein-consumed", formatNumber(totals.protein, totals.protein % 1 ? 1 : 0));
    setValue("fat-consumed", formatNumber(totals.fat, totals.fat % 1 ? 1 : 0));
    setValue("carb-target", formatNumber(targets.carbs));
    setValue("protein-target", formatNumber(targets.protein));
    setValue("fat-target", formatNumber(targets.fat));

    const calorieStatus = $("#calorie-status");
    if (totals.kcal === 0) {
      calorieStatus.textContent = "等待记录";
      calorieStatus.classList.remove("is-over");
      $("#calorie-message").textContent = "先从第一餐开始记录。";
    } else if (remaining < 0) {
      calorieStatus.textContent = `超出 ${formatNumber(Math.abs(remaining))}`;
      calorieStatus.classList.add("is-over");
      $("#calorie-message").textContent = "一次超出不用修正，下一餐回到计划即可。";
    } else if (caloriePercent >= 90) {
      calorieStatus.textContent = "接近目标";
      calorieStatus.classList.remove("is-over");
      $("#calorie-message").textContent = "今天执行得不错，剩余额度留给真正需要时。";
    } else {
      calorieStatus.textContent = `完成 ${Math.round(caloriePercent)}%`;
      calorieStatus.classList.remove("is-over");
      $("#calorie-message").textContent = "按计划继续吃，不需要刻意留下太多余量。";
    }

    $("#carb-bar").style.width = `${targets.carbs ? clamp((totals.carbs / targets.carbs) * 100, 0, 100) : 0}%`;
    $("#protein-bar").style.width = `${targets.protein ? clamp((totals.protein / targets.protein) * 100, 0, 100) : 0}%`;
    $("#fat-bar").style.width = `${targets.fat ? clamp((totals.fat / targets.fat) * 100, 0, 100) : 0}%`;

    setValue("carb-note", macroMessage(totals.carbs, targets.carbs, "主食、水果和训练供能"));
    setValue("protein-note", macroMessage(totals.protein, targets.protein, "优先保证，每餐分配更均匀"));
    setValue("fat-note", macroMessage(totals.fat, targets.fat, "别把烹饪油和坚果漏掉"));

    setValue("side-kcal", formatNumber(targets.kcal));
    $("#side-progress-bar").style.width = `${caloriePercent}%`;
    setValue(
      "side-progress-text",
      totals.kcal ? `已摄入 ${formatNumber(totals.kcal)} 千卡` : "还没有记录"
    );

    renderMeals();
    renderWeightCard();
    renderCoach();
    renderProfileChrome();
  }

  function macroMessage(consumed, target, fallback) {
    if (!consumed) return fallback;
    const ratio = target ? consumed / target : 0;
    if (ratio < 0.65) return `还差 ${formatNumber(Math.max(0, target - consumed))}g，下一餐补上`;
    if (ratio <= 1.08) return "已经接近目标";
    return `超出 ${formatNumber(consumed - target)}g，不用补救`;
  }

  function renderMeals() {
    const container = $("#meal-list");
    const meals = mealsForDate();
    container.innerHTML = MEAL_TYPES.map((type) => {
      const match = meals.filter((meal) => meal.type === type.id);
      if (!match.length) {
        return `
          <div class="meal-section">
            <div class="meal-type"><strong>${type.label}</strong><span>未记录</span></div>
            <button class="empty-meal" type="button" data-open-meal="${type.id}">
              <i>+</i><span>记录${type.label}</span>
            </button>
            <div></div>
          </div>`;
      }
      return match
        .map((meal, index) => {
          const total = normalizeTotals(totalItems(meal.items));
          const names = (meal.items || [])
            .slice(0, 6)
            .map(
              (item) =>
                `<span class="meal-item-name">${escapeHTML(item.name)} <small>${formatNumber(item.grams, item.grams % 1 ? 1 : 0)}g</small></span>`
            )
            .join("");
          return `
            <div class="meal-section">
              <div class="meal-type">
                <strong>${type.label}${match.length > 1 ? ` ${index + 1}` : ""}</strong>
                <span>${escapeHTML(meal.time || "")}</span>
              </div>
              <div class="meal-detail">
                ${meal.photo ? `<img class="meal-photo" src="${meal.photo}" alt="${type.label}照片" data-lightbox="${meal.photo}">` : ""}
                <div class="meal-items">${names || '<span class="meal-item-name">未命名食物</span>'}</div>
                ${meal.note ? `<p class="meal-note">${escapeHTML(meal.note)}</p>` : ""}
              </div>
              <div class="meal-total">
                <strong>${formatNumber(total.kcal)} kcal</strong>
                <span>C ${formatNumber(total.carbs, total.carbs % 1 ? 1 : 0)} · P ${formatNumber(total.protein, total.protein % 1 ? 1 : 0)} · F ${formatNumber(total.fat, total.fat % 1 ? 1 : 0)}</span>
                <div class="meal-actions">
                  <button class="mini-action" type="button" data-edit-meal="${meal.id}">编辑</button>
                  <button class="mini-action" type="button" data-delete-meal="${meal.id}">删除</button>
                </div>
              </div>
            </div>`;
        })
        .join("");
    }).join("");
  }

  function renderProfileChrome() {
    const name = state.profile.name.trim() || "设置我的计划";
    setValue("profile-name", name);
    setValue(
      "profile-subtitle",
      `${formatNumber(state.profile.weight, 1)}kg · 每周 ${state.profile.sessions} 练`
    );
    setValue("profile-avatar", (state.profile.name.trim()[0] || "食").toUpperCase());
    setValue("mobile-profile-avatar", (state.profile.name.trim()[0] || "食").toUpperCase());
  }

  function renderWeightCard() {
    const weights = [...state.weights]
      .filter((entry) => entry.date <= selectedDate)
      .sort((a, b) => a.date.localeCompare(b.date));
    const latest = weights.at(-1);
    setValue("current-weight", latest ? formatNumber(latest.weight, 1) : "--");
    setValue("goal-weight", `${formatNumber(state.profile.goalWeight, 1)} kg`);
    setValue(
      "start-weight",
      weights.length ? `${formatNumber(weights[0].weight, 1)} kg` : "--"
    );
    if (weights.length >= 2) {
      const diff = weights.at(-1).weight - weights[0].weight;
      setValue("weight-change", `${diff < 0 ? "下降" : diff > 0 ? "上升" : "变化"} ${formatNumber(Math.abs(diff), 1)}kg`);
    } else {
      setValue("weight-change", "记录后查看变化");
    }
    $("#weight-sparkline").innerHTML = buildSparkline(weights.slice(-14));
  }

  function buildSparkline(entries) {
    if (entries.length < 2) {
      return '<div class="chart-empty">记录两次体重后，这里会出现趋势线</div>';
    }
    const width = 260;
    const height = 60;
    const pad = 5;
    const values = entries.map((entry) => entry.weight);
    const min = Math.min(...values) - 0.4;
    const max = Math.max(...values) + 0.4;
    const points = entries
      .map((entry, index) => {
        const x = pad + (index / (entries.length - 1)) * (width - pad * 2);
        const y = pad + ((max - entry.weight) / Math.max(0.1, max - min)) * (height - pad * 2);
        return `${round(x, 1)},${round(y, 1)}`;
      })
      .join(" ");
    const area = `${points} ${width - pad},${height - pad} ${pad},${height - pad}`;
    return `
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#61744d" stop-opacity=".22"/>
            <stop offset="100%" stop-color="#61744d" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <polygon points="${area}" fill="url(#sparkGradient)"/>
        <polyline points="${points}" fill="none" stroke="#61744d" stroke-width="2" vector-effect="non-scaling-stroke"/>
      </svg>`;
  }

  function renderCoach() {
    const totals = dayTotals();
    const targets = getTargets();
    let title = "先吃够蛋白质";
    let copy = "没有记录时，我不做过度判断。先从下一餐开始。";
    if (totals.protein >= targets.protein * 0.9) {
      title = "蛋白质完成得不错";
      copy = "接下来检查蔬菜、主食和油脂是否都安排到位。";
    } else if (totals.kcal > 0 && totals.protein < targets.protein * 0.55) {
      title = `距离蛋白质目标还差 ${formatNumber(Math.max(0, targets.protein - totals.protein))}g`;
      copy = "下一餐优先一掌心瘦肉、鱼虾、鸡蛋或豆制品，再决定主食份量。";
    } else if (totals.fat > targets.fat * 1.15) {
      title = "今天油脂偏高";
      copy = "不用刻意挨饿，下一餐减少煎炒油，选清蒸或水煮即可。";
    } else if (totals.carbs > targets.carbs * 1.15) {
      title = "碳水超出计划";
      copy = "一次超出不影响长期趋势，下一次主食回到自己的一拳大小就好。";
    } else if (totals.kcal > 0) {
      title = "继续按节奏吃";
      copy = "今天的关键不是吃得完美，而是把蛋白质、主食和油脂都记录完整。";
    }
    setValue("coach-title", title);
    setValue("coach-copy", copy);
  }

  function lastNDates(endISO, count) {
    return Array.from({ length: count }, (_, index) => shiftDate(endISO, -(count - 1 - index)));
  }

  function calculateWeightTrend() {
    const entries = [...state.weights]
      .filter((entry) => entry.date <= selectedDate)
      .sort((a, b) => a.date.localeCompare(b.date));
    if (entries.length < 2) return { status: "empty", pct: null };

    const recentStart = shiftDate(selectedDate, -6);
    const previousStart = shiftDate(selectedDate, -13);
    const previousEnd = shiftDate(selectedDate, -7);
    const recentEntries = entries.filter((entry) => entry.date >= recentStart);
    const previousEntries = entries.filter(
      (entry) => entry.date >= previousStart && entry.date <= previousEnd
    );

    if (recentEntries.length && previousEntries.length) {
      const recentAvg =
        recentEntries.reduce((sum, entry) => sum + entry.weight, 0) / recentEntries.length;
      const previousAvg =
        previousEntries.reduce((sum, entry) => sum + entry.weight, 0) / previousEntries.length;
      return {
        status: "data",
        pct: ((previousAvg - recentAvg) / previousAvg) * 100,
        change: previousAvg - recentAvg,
        recentAvg,
        previousAvg
      };
    }

    const first = recentEntries[0] || entries[0];
    const last = entries.at(-1);
    const days = Math.max(
      1,
      Math.round((parseDateISO(last.date) - parseDateISO(first.date)) / 86400000)
    );
    const weeklyPct = ((first.weight - last.weight) / first.weight) * 100 * (7 / days);
    return {
      status: "data",
      pct: weeklyPct,
      change: first.weight - last.weight,
      recentAvg: last.weight,
      previousAvg: first.weight
    };
  }

  function weekStats() {
    const dates = lastNDates(selectedDate, 7);
    const target = getTargets();
    const days = dates.map((date) => {
      const totals = dayTotals(date);
      return {
        date,
        totals,
        logged: state.meals.some((meal) => meal.date === date)
      };
    });
    const loggedDays = days.filter((day) => day.logged);
    const avgProtein = loggedDays.length
      ? loggedDays.reduce((sum, day) => sum + day.totals.protein, 0) / loggedDays.length
      : 0;
    const avgKcal = loggedDays.length
      ? loggedDays.reduce((sum, day) => sum + day.totals.kcal, 0) / loggedDays.length
      : 0;
    const proteinRate = target.protein ? avgProtein / target.protein : 0;
    const calorieRate = target.kcal ? avgKcal / target.kcal : 0;
    const loggingRate = loggedDays.length / 7;
    const proteinScore = clamp(proteinRate, 0, 1);
    const calorieScore = loggedDays.length
      ? clamp(1 - Math.abs(calorieRate - 1), 0, 1)
      : 0;
    const score = Math.round((loggingRate * 45 + proteinScore * 30 + calorieScore * 25));
    return {
      dates,
      days,
      loggedDays,
      avgProtein,
      avgKcal,
      proteinRate,
      calorieRate,
      loggingRate,
      score,
      weightTrend: calculateWeightTrend()
    };
  }

  function renderTrends() {
    const stats = weekStats();
    $("#trend-logged-days").innerHTML = `${stats.loggedDays.length} <small>天</small>`;
    setValue(
      "trend-logged-note",
      stats.loggedDays.length >= 5 ? "记录完整度不错，继续保持" : "建议每周至少记录 5 天"
    );
    setValue(
      "trend-protein-rate",
      stats.loggedDays.length ? `${Math.round(stats.proteinRate * 100)}%` : "--"
    );
    if (stats.weightTrend.status === "data") {
      const pct = stats.weightTrend.pct;
      setValue(
        "trend-weight-loss",
        `${pct >= 0 ? "−" : "+"}${formatNumber(Math.abs(stats.weightTrend.change), 1)} kg`
      );
      setValue(
        "trend-weight-note",
        `约 ${formatNumber(Math.abs(pct), 2)}% / 周 · ${pct >= 0 ? "下降" : "上升"}`
      );
    } else {
      setValue("trend-weight-loss", "--");
      setValue("trend-weight-note", "至少需要两次体重记录");
    }
    setValue("trend-score", stats.score ? `${stats.score}` : "--");
    setValue(
      "trend-score-note",
      stats.loggedDays.length
        ? stats.score >= 80
          ? "执行稳定，继续积累数据"
          : "先把记录完整度提上来"
        : "开始记录后生成执行分"
    );

    $("#calorie-chart").innerHTML = buildCalorieChart(stats);
    $("#weight-chart").innerHTML = buildWeightChart();
    renderInsights(stats);
  }

  function buildCalorieChart(stats) {
    const target = getTargets();
    const width = 620;
    const height = 210;
    const left = 34;
    const right = 8;
    const top = 8;
    const bottom = 26;
    const values = stats.days.map((day) => day.totals.kcal);
    const maxValue = Math.max(target.kcal, ...values, 100) * 1.12;
    const bandWidth = (width - left - right) / 7;
    const barWidth = Math.min(34, bandWidth * 0.54);
    const targetY = top + (1 - target.kcal / maxValue) * (height - top - bottom);
    const bars = stats.days
      .map((day, index) => {
        const x = left + index * bandWidth + bandWidth / 2;
        const valueHeight = (day.totals.kcal / maxValue) * (height - top - bottom);
        const y = height - bottom - valueHeight;
        const date = parseDateISO(day.date);
        const label = `${date.getMonth() + 1}/${date.getDate()}`;
        return `
          <rect x="${round(x - barWidth / 2, 1)}" y="${round(y, 1)}" width="${barWidth}" height="${round(Math.max(2, valueHeight), 1)}" rx="7" fill="${day.logged ? "#61744d" : "#e2e6dc"}"/>
          <text x="${round(x, 1)}" y="${height - 8}" text-anchor="middle" class="bar-label">${label}</text>`;
      })
      .join("");
    return `
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="近七天热量柱状图">
        <line x1="${left}" y1="${height - bottom}" x2="${width - right}" y2="${height - bottom}" stroke="#dfe3da" stroke-width="1"/>
        <line x1="${left}" y1="${targetY}" x2="${width - right}" y2="${targetY}" stroke="#7d8579" stroke-width="1" stroke-dasharray="4 5"/>
        <text x="${width - right}" y="${targetY - 5}" text-anchor="end" class="bar-label">目标 ${target.kcal}</text>
        ${bars}
      </svg>`;
  }

  function buildWeightChart() {
    const entries = [...state.weights]
      .filter((entry) => entry.date <= selectedDate && entry.date >= shiftDate(selectedDate, -30))
      .sort((a, b) => a.date.localeCompare(b.date));
    if (entries.length < 2) {
      return '<div class="chart-empty">记录至少两次体重，才能看到变化趋势</div>';
    }
    const width = 620;
    const height = 210;
    const left = 34;
    const right = 16;
    const top = 16;
    const bottom = 28;
    const values = entries.map((entry) => entry.weight);
    const goal = Number(state.profile.goalWeight);
    const min = Math.min(...values, goal) - 0.6;
    const max = Math.max(...values, goal) + 0.6;
    const xFor = (index) =>
      left + (index / Math.max(1, entries.length - 1)) * (width - left - right);
    const yFor = (value) =>
      top + ((max - value) / Math.max(0.1, max - min)) * (height - top - bottom);
    const points = entries
      .map((entry, index) => `${round(xFor(index), 1)},${round(yFor(entry.weight), 1)}`)
      .join(" ");
    const goalY = yFor(goal);
    const labels = entries
      .filter((_, index) => index === 0 || index === entries.length - 1)
      .map((entry, index) => {
        const actualIndex = index === 0 ? 0 : entries.length - 1;
        const date = parseDateISO(entry.date);
        return `<text x="${round(xFor(actualIndex), 1)}" y="${height - 8}" text-anchor="${index === 0 ? "start" : "end"}" class="bar-label">${date.getMonth() + 1}/${date.getDate()}</text>`;
      })
      .join("");
    return `
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" role="img" aria-label="最近体重趋势">
        <line x1="${left}" y1="${goalY}" x2="${width - right}" y2="${goalY}" stroke="#c3ca69" stroke-width="1.5" stroke-dasharray="5 5"/>
        <text x="${width - right}" y="${goalY - 6}" text-anchor="end" class="bar-label">目标 ${formatNumber(goal, 1)}kg</text>
        <polyline points="${points}" fill="none" stroke="#20251f" stroke-width="2.2" vector-effect="non-scaling-stroke"/>
        ${entries
          .map(
            (entry, index) =>
              `<circle cx="${round(xFor(index), 1)}" cy="${round(yFor(entry.weight), 1)}" r="3.2" fill="#d6e88e" stroke="#20251f" stroke-width="1.5"/>`
          )
          .join("")}
        ${labels}
      </svg>`;
  }

  function renderInsights(stats) {
    const target = getTargets();
    const insights = [];
    if (!stats.loggedDays.length) {
      insights.push({
        tone: "",
        icon: "1",
        title: "先补齐三天饮食记录",
        copy: "至少记录三天，才能判断蛋白质和热量是否长期偏离。"
      });
    } else {
      if (stats.proteinRate < 0.85) {
        insights.push({
          tone: "is-warn",
          icon: "P",
          title: `蛋白质平均只达到 ${Math.round(stats.proteinRate * 100)}%`,
          copy: `平均还差约 ${formatNumber(Math.max(0, target.protein - stats.avgProtein))}g。把蛋白质分配进每一餐，比晚餐集中补齐更容易执行。`
        });
      } else {
        insights.push({
          tone: "is-good",
          icon: "P",
          title: "蛋白质执行稳定",
          copy: "本周平均蛋白质达标，减脂期优先保住肌肉和饱腹感。"
        });
      }
      if (stats.calorieRate > 1.1) {
        insights.push({
          tone: "is-warn",
          icon: "C",
          title: "平均热量高于目标",
          copy: "如果其中几天是聚会，不必补偿；先看接下来一周的平均值。"
        });
      } else if (stats.calorieRate < 0.75) {
        insights.push({
          tone: "is-warn",
          icon: "C",
          title: "可能记录不完整或吃得太少",
          copy: "确认烹饪油、饮料和加餐是否漏记。长期吃得太少会影响训练和恢复。"
        });
      } else {
        insights.push({
          tone: "is-good",
          icon: "C",
          title: "热量执行在计划附近",
          copy: "不要为了单日数字临时加练或挨饿，保持下一周稳定更重要。"
        });
      }
    }

    const trend = stats.weightTrend;
    if (trend.status === "data") {
      const pct = trend.pct;
      if (pct > 1.1) {
        insights.push({
          tone: "is-warn",
          icon: "W",
          title: "体重下降偏快",
          copy: "若同时出现乏力、睡眠差或训练表现下降，可先把每日碳水增加 0.2g/kg。"
        });
      } else if (pct < 0.1) {
        insights.push({
          tone: "is-warn",
          icon: "W",
          title: "本周体重变化不明显",
          copy: "先确认记录完整度，再观察一周。连续两周不变时，再把每日碳水减少 0.2g/kg。"
        });
      } else {
        insights.push({
          tone: "is-good",
          icon: "W",
          title: "体重趋势在合理区间",
          copy: "每周约下降 0.3%–1% 是可持续的速度。继续使用周平均值，不追单日波动。"
        });
      }
    } else {
      insights.push({
        tone: "",
        icon: "W",
        title: "体重数据还不够",
        copy: "每周记录 3–7 次，同样时间、同样条件下称重，用平均值判断趋势。"
      });
    }

    insights.push({
      tone: stats.loggedDays.length >= 5 ? "is-good" : "",
      icon: "✓",
      title: `本周记录了 ${stats.loggedDays.length} 天`,
      copy:
        stats.loggedDays.length >= 5
          ? "记录完整度可以支撑一次有意义的周复盘。"
          : "不需要追求每餐零误差，至少把食物种类、份量和高油烹饪记下来。"
    });

    $("#weekly-insights").innerHTML = insights
      .map(
        (insight) => `
          <div class="insight ${insight.tone}">
            <div class="insight-icon">${insight.icon}</div>
            <div><strong>${escapeHTML(insight.title)}</strong><p>${escapeHTML(insight.copy)}</p></div>
          </div>`
      )
      .join("");
  }

  function renderPlan() {
    const band = getBand();
    const target = getTargets();
    const demoCarbs = Math.round(85 * band.carbs);
    const demoProtein = Math.round(85 * band.protein);
    const demoFat = Math.round(85 * band.fat);
    const demoKcal = Math.round(demoCarbs * 4 + demoProtein * 4 + demoFat * 9);
    const demo = $(".plan-demo");
    if (demo) {
      demo.innerHTML = `
        <span>85kg · ${escapeHTML(band.label)}</span>
        <div><strong>${demoCarbs}</strong><small>碳水 g</small></div>
        <div><strong>${demoProtein}</strong><small>蛋白 g</small></div>
        <div><strong>${demoFat}</strong><small>脂肪 g</small></div>
        <em>约 ${formatNumber(demoKcal)} kcal · 你的目标 ${target.kcal} kcal</em>`;
    }
    $$(".target-table tr").forEach((row) => {
      row.classList.toggle("is-current", Number(row.dataset.sessions) === band.max);
    });
  }

  function fillSettings() {
    $("#setting-name").value = state.profile.name || "";
    $("#setting-height").value = state.profile.height || "";
    $("#setting-weight").value = state.profile.weight;
    $("#setting-goal-weight").value = state.profile.goalWeight;
    $("#setting-sessions").value = state.profile.sessions;
    $("#sessions-value").textContent = `${state.profile.sessions} 次`;
    $("#manual-target-toggle").checked = state.profile.targetMode === "manual";
    $("#manual-target-fields").classList.toggle(
      "is-visible",
      state.profile.targetMode === "manual"
    );
    const currentTarget = getTargets();
    $("#manual-carb").value = currentTarget.carbs;
    $("#manual-protein").value = currentTarget.protein;
    $("#manual-fat").value = currentTarget.fat;
    $("#setting-api-endpoint").value = state.settings.endpoint || "";
    $("#setting-api-upstream").value =
      state.settings.upstream || "https://api.openai.com/v1/chat/completions";
    $("#setting-api-model").value = state.settings.model || "";
    $("#remember-key").checked = Boolean(state.settings.rememberKey);
    $("#setting-api-key").value = getApiKey();
    updateSettingsPreview();
  }

  function updateSettingsPreview() {
    const weight = Number($("#setting-weight").value) || state.profile.weight;
    const sessions = Number($("#setting-sessions").value) || 0;
    const manual = $("#manual-target-toggle").checked;
    let target = calculateAutoTargets(weight, sessions);
    if (manual) {
      const carbs = Number($("#manual-carb").value) || 0;
      const protein = Number($("#manual-protein").value) || 0;
      const fat = Number($("#manual-fat").value) || 0;
      target = {
        carbs,
        protein,
        fat,
        kcal: Math.round(carbs * 4 + protein * 4 + fat * 9)
      };
    }
    $("#sessions-value").textContent = `${sessions} 次`;
    setValue("preview-carb", `${Math.round(target.carbs)}g`);
    setValue("preview-protein", `${Math.round(target.protein)}g`);
    setValue("preview-fat", `${Math.round(target.fat)}g`);
    setValue("preview-kcal", `${Math.round(target.kcal)} kcal`);
  }

  function getApiKey() {
    if (state.settings.rememberKey) {
      return safeStorageGet(localStorage, KEY_LOCAL) || "";
    }
    return safeStorageGet(sessionStorage, KEY_SESSION) || safeStorageGet(localStorage, KEY_LOCAL) || "";
  }

  function setApiKey(key) {
    safeStorageRemove(sessionStorage, KEY_SESSION);
    safeStorageRemove(localStorage, KEY_LOCAL);
    if (!key) return;
    if (state.settings.rememberKey) {
      safeStorageSet(localStorage, KEY_LOCAL, key);
    } else {
      safeStorageSet(sessionStorage, KEY_SESSION, key);
    }
  }

  function openModal(html, wide = false) {
    const backdrop = $("#modal-backdrop");
    const modal = $("#modal");
    modal.classList.toggle("is-wide", wide);
    modal.innerHTML = html;
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    const firstInput = modal.querySelector("input:not([type=hidden]), textarea, button");
    window.setTimeout(() => firstInput?.focus({ preventScroll: true }), 50);
  }

  function closeModal() {
    $("#modal-backdrop").hidden = true;
    $("#modal").innerHTML = "";
    document.body.style.overflow = "";
    draftMeal = null;
  }

  function modalHeader(title, subtitle = "") {
    return `
      <div class="modal-header">
        <div>
          <span class="eyebrow">MEAL LOG</span>
          <h2 id="modal-title">${escapeHTML(title)}</h2>
          ${subtitle ? `<p>${escapeHTML(subtitle)}</p>` : ""}
        </div>
        <button class="modal-close" type="button" data-close-modal aria-label="关闭">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
        </button>
      </div>`;
  }

  function renderPhotoSlot(kind, title, hint, required = false) {
    const photo = draftMeal.photos?.[kind];
    return `
      <label class="photo-slot photo-slot-${kind} ${photo ? "is-filled" : ""}" data-photo-slot="${kind}">
        <input class="meal-photo-input" data-photo-kind="${kind}" type="file" accept="image/*" capture="environment" aria-label="${escapeHTML(title)}">
        ${
          photo
            ? `<img class="photo-slot-image" src="${photo}" alt="${escapeHTML(title)}预览">`
            : `<span class="photo-slot-empty">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h3l1.5-2h7L17 7h3v12H4V7Z"/><circle cx="12" cy="13" r="3.5"/></svg>
              </span>`
        }
        <span class="photo-slot-copy">
          <strong>${escapeHTML(title)}${required ? "<i>必选</i>" : ""}</strong>
          <small>${escapeHTML(hint)}</small>
        </span>
        ${photo ? '<em class="photo-retake">重拍</em>' : ""}
      </label>`;
  }

  function openMealModal(type = "lunch", editId = null) {
    const existing = editId ? state.meals.find((meal) => meal.id === editId) : null;
    const existingPhotos = existing?.photos || {};
    draftMeal = {
      editId,
      date: selectedDate,
      type: existing?.type || type,
      note: existing?.note || "",
      rawText: existing?.rawText || "",
      photo: existing?.photo || existingPhotos.tray || null,
      photos: {
        tray: existingPhotos.tray || existing?.photo || null,
        staple: existingPhotos.staple || null,
        protein: existingPhotos.protein || null
      },
      cafeteria: {
        plateSize: existing?.cafeteria?.plateSize || "standard",
        staplePortion: existing?.cafeteria?.staplePortion || "medium",
        oilLevel: existing?.cafeteria?.oilLevel || "normal",
        proteinType: existing?.cafeteria?.proteinType || "mixed",
        dishes: existing?.cafeteria?.dishes || ""
      },
      items: existing?.items ? existing.items.map((item) => ({ ...item })) : [],
      aiMessage: "",
      aiError: false
    };
    openModal(
      `
      ${modalHeader(existing ? "编辑这一餐" : "记录食堂一餐", "拍托盘全景，再补主食和蛋白质近照。照片、菜品名与份量线索越完整，估算越准。")}
      <div class="modal-body">
        <div class="meal-type-tabs">
          ${MEAL_TYPES.map(
            (item) =>
              `<button type="button" data-draft-type="${item.id}" class="${draftMeal.type === item.id ? "is-active" : ""}">${item.label}</button>`
          ).join("")}
        </div>
        <div class="meal-entry-grid cafeteria-entry-grid">
          <div>
            <label class="field">
              <span>菜品名或食物份量（可选）</span>
              <textarea id="meal-text" placeholder="例如：番茄炒蛋、青椒肉丝，米饭一碗，青菜偏油">${escapeHTML(draftMeal.rawText)}</textarea>
            </label>
            <div class="parse-row" style="margin-top:8px">
              <button class="primary-button" id="parse-meal" type="button">按文字计算</button>
              <button class="secondary-button" id="clear-items" type="button">清空结果</button>
            </div>
            <p class="parser-hint">如果知道食堂菜品名，直接写出来会明显提高准确度；没有写克数时会按食堂常见份量估算。</p>
          </div>
          <div class="cafeteria-photo-workbench">
            <div class="photo-workbench-head">
              <span>食堂拍照识别</span>
              <em>建议拍 2–3 张</em>
            </div>
            <div class="cafeteria-photo-grid">
              ${renderPhotoSlot("tray", "托盘全景", "看清所有菜品和餐盘边界", true)}
              ${renderPhotoSlot("staple", "主食近照", "米饭、面条或馒头")}
              ${renderPhotoSlot("protein", "蛋白质近照", "肉、蛋、鱼或豆制品")}
            </div>
          </div>
        </div>

        <section class="cafeteria-calibration">
          <div class="calibration-heading">
            <div>
              <strong>食堂估算校准</strong>
              <span>点选真实情况，AI 会据此校正份量与隐藏油脂</span>
            </div>
            <em>更准</em>
          </div>
          <div class="calibration-grid">
            <label class="field">
              <span>餐盘 / 餐盒</span>
              <select id="cal-plate">
                <option value="standard" ${draftMeal.cafeteria.plateSize === "standard" ? "selected" : ""}>标准食堂餐盘</option>
                <option value="small" ${draftMeal.cafeteria.plateSize === "small" ? "selected" : ""}>小餐盘 / 小碗菜</option>
                <option value="takeaway" ${draftMeal.cafeteria.plateSize === "takeaway" ? "selected" : ""}>长方形打包盒</option>
                <option value="unknown" ${draftMeal.cafeteria.plateSize === "unknown" ? "selected" : ""}>不确定</option>
              </select>
            </label>
            <label class="field">
              <span>主食份量</span>
              <select id="cal-staple">
                <option value="small" ${draftMeal.cafeteria.staplePortion === "small" ? "selected" : ""}>半碗 / 约 100g</option>
                <option value="medium" ${draftMeal.cafeteria.staplePortion === "medium" ? "selected" : ""}>一碗 / 约 150g</option>
                <option value="large" ${draftMeal.cafeteria.staplePortion === "large" ? "selected" : ""}>大碗 / 约 250g</option>
                <option value="double" ${draftMeal.cafeteria.staplePortion === "double" ? "selected" : ""}>两碗 / 约 300g</option>
                <option value="none" ${draftMeal.cafeteria.staplePortion === "none" ? "selected" : ""}>这餐没有主食</option>
              </select>
            </label>
            <label class="field">
              <span>主要蛋白质</span>
              <select id="cal-protein">
                <option value="mixed" ${draftMeal.cafeteria.proteinType === "mixed" ? "selected" : ""}>混合 / 不确定</option>
                <option value="chicken" ${draftMeal.cafeteria.proteinType === "chicken" ? "selected" : ""}>鸡肉</option>
                <option value="pork" ${draftMeal.cafeteria.proteinType === "pork" ? "selected" : ""}>猪肉</option>
                <option value="beef" ${draftMeal.cafeteria.proteinType === "beef" ? "selected" : ""}>牛肉</option>
                <option value="fish" ${draftMeal.cafeteria.proteinType === "fish" ? "selected" : ""}>鱼虾</option>
                <option value="egg" ${draftMeal.cafeteria.proteinType === "egg" ? "selected" : ""}>鸡蛋</option>
                <option value="tofu" ${draftMeal.cafeteria.proteinType === "tofu" ? "selected" : ""}>豆腐 / 豆制品</option>
              </select>
            </label>
            <label class="field">
              <span>油量</span>
              <select id="cal-oil">
                <option value="light" ${draftMeal.cafeteria.oilLevel === "light" ? "selected" : ""}>清爽 / 水煮清蒸</option>
                <option value="normal" ${draftMeal.cafeteria.oilLevel === "normal" ? "selected" : ""}>普通食堂炒菜</option>
                <option value="oily" ${draftMeal.cafeteria.oilLevel === "oily" ? "selected" : ""}>明显偏油 / 盘底有油</option>
                <option value="very" ${draftMeal.cafeteria.oilLevel === "very" ? "selected" : ""}>很多油 / 油炸红烧</option>
              </select>
            </label>
          </div>
          <label class="field calibration-dishes">
            <span>菜品名（可选，但很有帮助）</span>
            <input id="cal-dishes" type="text" value="${escapeHTML(draftMeal.cafeteria.dishes)}" placeholder="如：番茄炒蛋、青椒肉丝、炒青菜">
          </label>
          <div class="quick-dish-wrap">
            <span>食堂常见菜，点一下加入：</span>
            <div class="quick-dish-list">
              ${[
                "米饭",
                "馒头",
                "面条",
                "鸡腿肉",
                "番茄炒蛋",
                "青椒肉丝",
                "清炒时蔬",
                "土豆丝",
                "麻婆豆腐",
                "红烧肉"
              ]
                .map(
                  (name) =>
                    `<button type="button" data-quick-food="${escapeHTML(name)}">${escapeHTML(name)}</button>`
                )
                .join("")}
            </div>
          </div>
          <div class="ai-analyze-row">
            <button class="primary-button ai-analyze-button" id="analyze-photo" type="button">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.2 4.1L17 9l-3.8 1.9L12 15l-1.2-4.1L7 9l3.8-1.9L12 3Zm6 10 .7 2.3L21 16l-2.3.7L18 19l-.7-2.3L15 16l2.3-.7L18 13Z"/></svg>
              AI 分析食堂餐盘
            </button>
            <span>照片只在分析时发送，不会上传到数据服务器</span>
          </div>
          <div id="ai-status"></div>
          <div class="inline-ai-config" id="inline-ai-config" hidden>
            <div>
              <strong>首次使用照片识别</strong>
              <p>填写你自己的视觉模型 API Key。密钥仅用于当前浏览器会话，不会写入饮食记录或导出的数据。</p>
            </div>
            <label class="field">
              <span>API Key</span>
              <input id="inline-api-key" type="password" autocomplete="off" placeholder="sk-...">
            </label>
            <div class="inline-ai-actions">
              <button class="primary-button" id="inline-save-key" type="button">保存并分析</button>
              <button class="secondary-button" id="use-quick-estimate" type="button">先用食堂快速选择</button>
            </div>
            <small>默认通过本页的安全代理调用兼容视觉模型；也可在“参数设置”中更换接口和模型。</small>
          </div>
        </section>

        <div class="result-heading">
          <strong>营养素估算</strong>
          <span>保存前请按食堂实际份量修正</span>
        </div>
        <div id="draft-items" class="parsed-items"></div>
        <div id="entry-total" class="entry-total"></div>
      </div>
      <div class="modal-footer">
        <div class="modal-actions-split">
          <span class="parser-hint">${draftMeal.items.length ? "修改数值后会自动重算" : "尚未添加食物"}</span>
          <div class="button-row" style="margin:0">
            <button class="secondary-button" type="button" data-close-modal>取消</button>
            <button class="primary-button" id="save-meal" type="button">${existing ? "保存修改" : "保存这一餐"}</button>
          </div>
        </div>
      </div>`,
      true
    );
    renderDraftItems();
    bindMealModalEvents();
  }

  function renderDraftItems() {
    if (!draftMeal) return;
    const container = $("#draft-items");
    if (!container) return;
    if (!draftMeal.items.length) {
      container.innerHTML =
        '<div class="parsed-empty">输入食物后点击“按文字计算”，或上传照片进行 AI 估算。<br>所有结果都可以在保存前修改。</div>';
    } else {
      container.innerHTML = draftMeal.items
        .map(
          (item, index) => `
          <div class="parsed-item-card">
            <div class="parsed-row">
              <label><input data-item-index="${index}" data-field="name" value="${escapeHTML(item.name)}" aria-label="食物名称"></label>
              <label><input data-item-index="${index}" data-field="grams" type="number" min="0" step="0.1" value="${item.grams}" aria-label="克数"></label>
              <label><input data-item-index="${index}" data-field="carbs" type="number" min="0" step="0.1" value="${item.carbs}" aria-label="碳水"></label>
              <label><input data-item-index="${index}" data-field="protein" type="number" min="0" step="0.1" value="${item.protein}" aria-label="蛋白质"></label>
              <label><input data-item-index="${index}" data-field="fat" type="number" min="0" step="0.1" value="${item.fat}" aria-label="脂肪"></label>
              <label><input data-item-index="${index}" data-field="kcal" type="number" min="0" step="1" value="${item.kcal}" aria-label="热量"></label>
              <button class="remove-item" type="button" data-remove-item="${index}" aria-label="删除">×</button>
            </div>
            ${
              item.rangeNote || item.confidence != null
                ? `<div class="parsed-range-note">
                    ${item.confidence != null ? `<b>${Math.round(Number(item.confidence) * 100)}%</b>` : ""}
                    <span>${escapeHTML(item.rangeNote || "手动校正后可提高后续估算准确度")}</span>
                  </div>`
                : ""
            }
          </div>`
        )
        .join("");
    }
    renderDraftTotal();
  }

  function renderDraftTotal() {
    if (!draftMeal) return;
    const total = normalizeTotals(totalItems(draftMeal.items));
    const container = $("#entry-total");
    if (container) {
      container.innerHTML = `
        <span>碳水 <strong>${formatNumber(total.carbs, 1)}g</strong></span>
        <span>蛋白质 <strong>${formatNumber(total.protein, 1)}g</strong></span>
        <span>脂肪 <strong>${formatNumber(total.fat, 1)}g</strong></span>
        <span>合计 <strong>${formatNumber(total.kcal)} kcal</strong></span>`;
    }
  }

  function syncDraftText() {
    if (!draftMeal) return;
    draftMeal.rawText = $("#meal-text")?.value || "";
  }

  function bindMealModalEvents() {
    $$("[data-draft-type]").forEach((button) => {
      button.addEventListener("click", () => {
        draftMeal.type = button.dataset.draftType;
        $$("[data-draft-type]").forEach((item) => {
          item.classList.toggle("is-active", item === button);
        });
      });
    });

    $("#parse-meal").addEventListener("click", () => {
      syncDraftText();
      const parsed = parseFoodText(draftMeal.rawText);
      draftMeal.items = parsed;
      renderDraftItems();
      if (!parsed.length) {
        setAiStatus("没有识别到食物。试试写得更具体，例如“鸡胸肉 200g、米饭 150g”。", true);
      } else {
        setAiStatus(`已按文字计算 ${parsed.length} 种食物，请核对份量。`);
      }
    });

    $("#clear-items").addEventListener("click", () => {
      draftMeal.items = [];
      renderDraftItems();
      setAiStatus("");
    });

    $(".cafeteria-photo-grid").addEventListener("change", async (event) => {
      const input = event.target.closest(".meal-photo-input");
      if (!input) return;
      const file = event.target.files?.[0];
      if (!file) return;
      const kind = input.dataset.photoKind;
      try {
        const compressed = await compressImage(file);
        draftMeal.photos[kind] = compressed;
        if (kind === "tray") draftMeal.photo = compressed;
        const meta = {
          tray: ["托盘全景", "看清所有菜品和餐盘边界", true],
          staple: ["主食近照", "米饭、面条或馒头", false],
          protein: ["蛋白质近照", "肉、蛋、鱼或豆制品", false]
        }[kind];
        input.closest(".photo-slot").outerHTML = renderPhotoSlot(kind, ...meta);
        const count = Object.values(draftMeal.photos).filter(Boolean).length;
        setAiStatus(
          count >= 2
            ? "照片已准备好。补充菜品名和油量后，点击“AI 分析食堂餐盘”。"
            : "已加入 1 张照片。再拍一张主食或蛋白质近照会更准确。"
        );
      } catch (error) {
        setAiStatus("图片读取失败，请换一张图片重试。", true);
      }
    });

    const syncCafeteria = () => {
      if (!draftMeal) return;
      draftMeal.cafeteria = {
        plateSize: $("#cal-plate")?.value || "standard",
        staplePortion: $("#cal-staple")?.value || "medium",
        oilLevel: $("#cal-oil")?.value || "normal",
        proteinType: $("#cal-protein")?.value || "mixed",
        dishes: $("#cal-dishes")?.value.trim() || ""
      };
    };
    ["cal-plate", "cal-staple", "cal-oil", "cal-protein", "cal-dishes"].forEach((id) => {
      $(`#${id}`)?.addEventListener("change", syncCafeteria);
      $(`#${id}`)?.addEventListener("input", syncCafeteria);
    });

    $(".quick-dish-list").addEventListener("click", (event) => {
      const button = event.target.closest("[data-quick-food]");
      if (!button) return;
      const food = FOODS.find((item) => item.name === button.dataset.quickFood);
      if (!food) return;
      const grams = food.serving;
      const macros = macrosForGrams(food, grams);
      draftMeal.items.push({
        id: uid(),
        name: food.name,
        grams,
        ...macros,
        originalGrams: grams,
        confidence: 1,
        source: "cafeteria-quick",
        userAdjusted: false,
        note: food.note || ""
      });
      renderDraftItems();
      button.classList.add("is-added");
      window.setTimeout(() => button.classList.remove("is-added"), 700);
      setAiStatus(`已加入 ${food.name}，默认一份 ${grams}g，可在下方修改克数。`);
    });

    $("#analyze-photo").addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const photos = Object.values(draftMeal.photos).filter(Boolean);
      if (!photos.length) {
        setAiStatus("请先拍一张托盘全景。", true);
        return;
      }
      const isLocalProxy = state.settings.endpoint.trim().startsWith("/");
      if (!isLocalProxy && !getApiKey()) {
        $("#inline-ai-config").hidden = false;
        setAiStatus("还差一步：填写一次 API Key 后即可自动分析。", true);
        $("#inline-ai-config").scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (isLocalProxy && location.protocol === "file:") {
        setAiStatus("照片识别需要通过公网链接或本地服务打开。请从分享链接进入本页。", true);
        return;
      }
      const button = $("#analyze-photo");
      const originalButton = button.innerHTML;
      button.disabled = true;
      button.innerHTML = "<span class=\"ai-spinner\"></span> 正在分析托盘、份量和隐藏油脂…";
      setAiStatus("通常会需要 5–20 秒。请不要关闭页面。");
      try {
        syncDraftText();
        syncCafeteria();
        const result = await analyzeMealPhoto(
          photos,
          draftMeal.rawText,
          draftMeal.cafeteria
        );
        draftMeal.items = result.items;
        renderDraftItems();
        setAiStatus(
          result.note
            ? `识别完成（综合置信度 ${Math.round(result.overallConfidence * 100)}%）：${result.note}`
            : "识别完成。照片无法判断的部分，请务必手动校正。"
        );
      } catch (error) {
        setAiStatus(error.message || "AI 识别失败，请检查接口和网络。", true);
        if (/api key|openai_api_key|密钥|配置/i.test(error.message || "")) {
          $("#inline-ai-config").hidden = false;
        }
      } finally {
        button.disabled = false;
        button.innerHTML = originalButton.replace("AI 分析食堂餐盘", "重新分析食堂餐盘");
      }
    });

    $("#inline-save-key").addEventListener("click", () => {
      const key = $("#inline-api-key").value.trim();
      if (!key) {
        toast("请填写 API Key", "error");
        return;
      }
      if (!state.settings.endpoint) state.settings.endpoint = "/api/analyze";
      if (!state.settings.model) state.settings.model = "gpt-4.1-mini";
      state.settings.rememberKey = false;
      setApiKey(key);
      saveState();
      $("#inline-ai-config").hidden = true;
      setAiStatus("密钥已保存到当前会话，正在开始分析…");
      $("#analyze-photo").click();
    });

    $("#use-quick-estimate").addEventListener("click", () => {
      $("#inline-ai-config").hidden = true;
      $(".quick-dish-list").scrollIntoView({ behavior: "smooth", block: "center" });
      setAiStatus("已切换为食堂快速选择：点选菜品后核对克数，不需要 API Key。");
    });

    $("#draft-items").addEventListener("input", (event) => {
      const input = event.target.closest("input[data-item-index]");
      if (!input) return;
      const index = Number(input.dataset.itemIndex);
      const field = input.dataset.field;
      const item = draftMeal.items[index];
      if (!item) return;
      if (field === "name") item.name = input.value;
      else {
        item[field] = Math.max(0, Number(input.value) || 0);
        if (field === "grams") item.userAdjusted = true;
      }
      if (["carbs", "protein", "fat"].includes(field) && !item.kcal) {
        item.kcal = round(item.carbs * 4 + item.protein * 4 + item.fat * 9, 0);
      }
      renderDraftTotal();
    });

    $("#draft-items").addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove-item]");
      if (!button) return;
      draftMeal.items.splice(Number(button.dataset.removeItem), 1);
      renderDraftItems();
    });

    $("#save-meal").addEventListener("click", saveDraftMeal);
  }

  function setAiStatus(message, isError = false) {
    const container = $("#ai-status");
    if (!container) return;
    container.innerHTML = message
      ? `<div class="ai-status${isError ? " is-error" : ""}">${escapeHTML(message)}</div>`
      : "";
  }

  function recordFoodCalibrations(items) {
    if (!Array.isArray(state.calibrations)) state.calibrations = [];
    items.forEach((item) => {
      if (
        !String(item.source || "").includes("photo") ||
        !item.userAdjusted ||
        !item.originalGrams ||
        item.originalGrams <= 0
      ) {
        return;
      }
      state.calibrations.push({
        name: item.name,
        grams: item.grams,
        originalGrams: item.originalGrams,
        factor: round(item.grams / item.originalGrams, 2),
        date: draftMeal.date,
        createdAt: new Date().toISOString()
      });
    });
    state.calibrations = state.calibrations.slice(-80);
  }

  function saveDraftMeal() {
    if (!draftMeal) return;
    syncDraftText();
    if (!draftMeal.items.length) {
      setAiStatus("至少添加一种食物后再保存。", true);
      return;
    }
    const cleanItems = draftMeal.items.map((item) => ({
      id: item.id || uid(),
      name: String(item.name || "未命名食物").trim(),
      grams: round(Number(item.grams) || 0, 1),
      carbs: round(Number(item.carbs) || 0, 1),
      protein: round(Number(item.protein) || 0, 1),
      fat: round(Number(item.fat) || 0, 1),
      kcal: round(Number(item.kcal) || 0, 0),
      confidence: item.confidence ?? null,
      source: item.source || "manual",
      originalGrams: item.originalGrams ?? null,
      userAdjusted: Boolean(item.userAdjusted),
      rangeNote: item.rangeNote || "",
      note: item.note || ""
    }));
    const totals = normalizeTotals(totalItems(cleanItems));
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const payload = {
      id: draftMeal.editId || uid(),
      date: draftMeal.date,
      type: draftMeal.type,
      note: draftMeal.rawText.trim(),
      rawText: draftMeal.rawText.trim(),
      photo: draftMeal.photo || null,
      photos: { ...draftMeal.photos },
      cafeteria: { ...draftMeal.cafeteria },
      items: cleanItems,
      totals,
      time,
      createdAt:
        state.meals.find((meal) => meal.id === draftMeal.editId)?.createdAt ||
        new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    recordFoodCalibrations(cleanItems);
    const wasEdit = Boolean(draftMeal.editId);
    if (wasEdit) {
      const index = state.meals.findIndex((meal) => meal.id === draftMeal.editId);
      if (index >= 0) state.meals[index] = payload;
    } else {
      state.meals.push(payload);
    }
    saveState();
    closeModal();
    renderToday();
    toast(wasEdit ? "这一餐已更新" : "这一餐已记下");
  }

  async function compressImage(file) {
    const dataUrl = await readFileAsDataURL(file);
    const image = await loadImage(dataUrl);
    const maxSide = 1000;
    const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.78);
  }

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  function median(values) {
    if (!values.length) return null;
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2
      ? sorted[middle]
      : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  function getCalibrationFactor(foodName) {
    const normalized = String(foodName || "")
      .replace(/\s+/g, "")
      .replace(/[（）()]/g, "");
    const factors = (state.calibrations || [])
      .filter((entry) => {
        const entryName = String(entry.name || "")
          .replace(/\s+/g, "")
          .replace(/[（）()]/g, "");
        return entryName === normalized || entryName.includes(normalized) || normalized.includes(entryName);
      })
      .slice(-8)
      .map((entry) => Number(entry.factor))
      .filter((factor) => Number.isFinite(factor) && factor > 0);
    return factors.length >= 2 ? clamp(median(factors), 0.65, 1.55) : 1;
  }

  async function analyzeMealPhoto(photoDataUrls, textHint = "", cafeteria = {}) {
    const endpoint = state.settings.endpoint.trim();
    const model = state.settings.model.trim();
    const key = getApiKey().trim();
    const isLocalProxy = endpoint.startsWith("/");
    if (!endpoint || !model) throw new Error("照片识别设置不完整，请先在设置页填写。");
    if (isLocalProxy && location.protocol === "file:") {
      throw new Error("照片识别需要通过本地服务启动。请运行 start-server.ps1 后打开 http://127.0.0.1:4173。");
    }
    if (!isLocalProxy && !key) throw new Error("直连接口需要填写 API Key。");

    const plateLabels = {
      standard: "标准食堂餐盘，常见约 30×40cm",
      small: "小餐盘或小碗菜，份量偏小",
      takeaway: "长方形一次性打包盒",
      unknown: "餐盘尺寸不确定"
    };
    const stapleLabels = {
      small: "半碗，熟主食约 100g",
      medium: "一碗，熟主食约 150g",
      large: "大碗，熟主食约 250g",
      double: "两碗，熟主食约 300g",
      none: "本餐没有主食"
    };
    const oilLabels = {
      light: "清爽、水煮或清蒸，额外油很少",
      normal: "普通食堂炒菜，中等油量",
      oily: "明显偏油，盘底可见油脂",
      very: "很多油、油炸或浓油红烧"
    };
    const proteinLabels = {
      mixed: "混合或不确定",
      chicken: "鸡肉",
      pork: "猪肉",
      beef: "牛肉",
      fish: "鱼虾",
      egg: "鸡蛋",
      tofu: "豆腐或豆制品"
    };
    const calibrationHints = (state.calibrations || [])
      .slice(-12)
      .map(
        (entry) =>
          `${entry.name}: AI 原估 ${entry.originalGrams}g，用户按实际改为 ${entry.grams}g`
      )
      .join("；");

    const prompt = `请分析照片中的中国学校食堂餐食，估算可食重量和三大营养素。照片可能包含：托盘全景、主食近照、蛋白质近照。只返回合法 JSON，不要 Markdown。

输出结构：
{"items":[{"name":"菜品中文名","grams":150,"gramsMin":120,"gramsMax":180,"carbs":42,"protein":3.9,"fat":0.5,"calories":195,"confidence":0.8,"portionBasis":"餐盘格大小或主食碗参考","note":"骨头、汤汁、油脂等说明"}],"overallConfidence":0.75,"note":"最需要用户校正的内容"}

用户提供的校准信息：
- 餐盘：${plateLabels[cafeteria.plateSize] || plateLabels.unknown}
- 主食：${stapleLabels[cafeteria.staplePortion] || stapleLabels.medium}
- 主要蛋白质：${proteinLabels[cafeteria.proteinType] || proteinLabels.mixed}
- 油量：${oilLabels[cafeteria.oilLevel] || oilLabels.normal}
- 菜品名：${cafeteria.dishes || "未填写"}
- 用户补充：${textHint || "无"}
${calibrationHints ? `- 这个用户过去的份量修正：${calibrationHints}` : ""}

估算规则：
1. 把米饭、馒头、面条等主食单独列出，使用用户选择的主食份量作为强参考。
2. 肉类列出不含骨头的可食重量；普通食堂单份肉菜通常约 60–140g，不要因为餐盘大就盲目放大。
3. 分别识别每道菜，不要把它写成一份混合“套餐”。
4. 食堂炒菜必须考虑烹饪油、糖和勾芡。油量选择“偏油/很多油”时，在蔬菜和肉菜中计入额外脂肪。
5. 番茄炒蛋、青椒肉丝、麻婆豆腐、红烧肉、土豆丝、炒青菜等食堂常见菜，优先使用菜品本身的实际配方，不要拆成生食材重复计数。
6. grams 是熟重。carbs、protein、fat 单位都是克，calories 是千卡。
7. 不确定时给 gramsMin/gramsMax 区间并降低 confidence，不能编造精确重量。
8. 最多 12 项；如果照片看不出某种食物，不要凭空添加。`;

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 75000);
    try {
      const imageLabels = ["托盘全景", "主食近照", "蛋白质近照"];
      const imageContent = photoDataUrls.flatMap((dataUrl, index) => [
        { type: "text", text: `照片 ${index + 1}：${imageLabels[index] || "补充照片"}` },
        { type: "image_url", image_url: { url: dataUrl, detail: "high" } }
      ]);
      const response = await fetch(endpoint, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...(isLocalProxy
            ? {
                "X-Shike-Upstream":
                  state.settings.upstream || "https://api.openai.com/v1/chat/completions"
              }
            : {}),
          ...(key ? { Authorization: `Bearer ${key}` } : {})
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content:
                "你是专门估算中国学校食堂餐食的营养师。你只返回合法 JSON，不提供医疗诊断。优先保证重量区间、主食份量、可见油脂和复合菜品估算的准确性。"
            },
            {
              role: "user",
              content: [
                { type: "text", text: prompt },
                ...imageContent
              ]
            }
          ],
          temperature: 0.1,
          max_tokens: 1800
        })
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        const message =
          data?.error?.message || data?.message || `接口返回 ${response.status}`;
        throw new Error(`照片分析失败：${message}`);
      }
      const raw =
        data?.choices?.[0]?.message?.content ||
        data?.output_text ||
        data?.response ||
        "";
      const text = Array.isArray(raw)
        ? raw.map((part) => part.text || part.content || "").join("")
        : String(raw);
      const parsed = parseAIJson(text);
      if (!parsed || !Array.isArray(parsed.items)) {
        throw new Error("模型返回的内容无法解析，请重试或换一个视觉模型。");
      }
      const items = parsed.items
        .slice(0, 12)
        .map((item) => {
          const name = String(item.name || "未识别食物");
          const aiGrams = round(Math.max(0, Number(item.grams) || 0), 1);
          const factor = getCalibrationFactor(name);
          const grams = round(aiGrams * factor, 1);
          const carbs = Math.max(0, Number(item.carbs) || 0) * factor;
          const protein = Math.max(0, Number(item.protein) || 0) * factor;
          const fat = Math.max(0, Number(item.fat) || 0) * factor;
          const rawCalories = Number(item.calories ?? item.kcal);
          const kcal =
            rawCalories > 0
              ? rawCalories * factor
              : carbs * 4 + protein * 4 + fat * 9;
          const min = Number(item.gramsMin);
          const max = Number(item.gramsMax);
          const rangeNote =
            Number.isFinite(min) && Number.isFinite(max)
              ? `照片区间约 ${Math.round(min * factor)}–${Math.round(max * factor)}g`
              : "";
          return {
            id: uid(),
            name,
            grams,
            originalGrams: aiGrams,
            carbs: round(carbs, 1),
            protein: round(protein, 1),
            fat: round(fat, 1),
            kcal: round(kcal, 0),
            confidence: clamp(Number(item.confidence) || 0.5, 0, 1),
            source: factor === 1 ? "photo-ai" : "photo-ai-calibrated",
            userAdjusted: false,
            rangeNote: [
              rangeNote,
              String(item.portionBasis || ""),
              String(item.note || ""),
              factor !== 1 ? "已参考你的历史份量修正" : ""
            ]
              .filter(Boolean)
              .join("；"),
            note: String(item.note || "")
          };
        })
        .filter((item) => item.name && item.grams > 0);
      if (!items.length) throw new Error("没有从照片中识别到有效食物，请补写食物名称。");
      return {
        items,
        overallConfidence: clamp(Number(parsed.overallConfidence) || 0, 0, 1),
        note: String(parsed.note || "照片估算会受隐藏油脂与餐具遮挡影响，请检查份量。")
      };
    } catch (error) {
      if (error.name === "AbortError") throw new Error("照片分析超时，请检查网络后重试。");
      if (error instanceof TypeError) {
        throw new Error("无法连接 AI 接口。请检查 API 地址、CORS 设置或网络。");
      }
      throw error;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function parseAIJson(text) {
    const cleaned = String(text)
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      const start = cleaned.indexOf("{");
      const end = cleaned.lastIndexOf("}");
      if (start >= 0 && end > start) {
        try {
          return JSON.parse(cleaned.slice(start, end + 1));
        } catch {
          return null;
        }
      }
      return null;
    }
  }

  function openWeightModal(date = selectedDate) {
    const latest = findLatestWeight(toDateISO(new Date()));
    const existing = state.weights.find((entry) => entry.date === date);
    openModal(`
      ${modalHeader("记录体重", "固定时间、相近条件称重，比单次数字更有意义。")}
      <div class="modal-body">
        <div class="form-grid two">
          <label class="field">
            <span>日期</span>
            <input id="weight-date" type="date" value="${escapeHTML(date)}" max="${toDateISO(new Date())}">
          </label>
          <label class="field">
            <span>体重（kg）</span>
            <input id="weight-value" type="number" min="35" max="250" step="0.1" value="${existing?.weight ?? latest?.weight ?? state.profile.weight}">
          </label>
        </div>
        <p class="weight-modal-copy">建议起床、如厕后、进食前称重。偶尔一次波动不代表脂肪变化。</p>
      </div>
      <div class="modal-footer">
        <button class="secondary-button" type="button" data-close-modal>取消</button>
        <button class="primary-button" id="save-weight" type="button">保存体重</button>
      </div>
    `);
    $("#save-weight").addEventListener("click", () => {
      const weightDate = $("#weight-date").value;
      const weight = Number($("#weight-value").value);
      if (!weightDate || !Number.isFinite(weight) || weight < 35 || weight > 250) {
        toast("请输入有效体重（35–250kg）", "error");
        return;
      }
      const index = state.weights.findIndex((entry) => entry.date === weightDate);
      const entry = {
        id: existing?.id || uid(),
        date: weightDate,
        weight: round(weight, 1),
        createdAt: new Date().toISOString()
      };
      if (index >= 0) state.weights[index] = entry;
      else state.weights.push(entry);
      state.weights.sort((a, b) => a.date.localeCompare(b.date));
      const newestDate = state.weights.at(-1)?.date;
      if (weightDate === newestDate) state.profile.weight = round(weight, 1);
      saveState();
      closeModal();
      selectedDate = weightDate;
      renderToday();
      renderTrends();
      toast("体重已记录");
    });
  }

  function openSetupModal() {
    openModal(
      `
      <div class="setup-layout">
        <div class="setup-art">
          <span class="brand-mark">
            <svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 20c0-7 5-12 12-12s12 5 12 12-5 12-12 12S8 27 8 20Z"/><path d="M20 12c-1 5-4 8-9 9 5 1 8 4 9 9 1-5 4-8 9-9-5-1-8-4-9-9Z"/></svg>
          </span>
          <span class="eyebrow eyebrow-light">BUILD YOUR PLAN</span>
          <h2>用身体数据和训练量，算出今天该吃多少。</h2>
          <p>目标会按视频方案自动变化。开始之后仍可在“参数设置”里随时修改。</p>
          <div class="setup-orbit"></div>
        </div>
        <form class="setup-form-wrap" id="setup-form">
          <span class="eyebrow">START HERE</span>
          <h2>先建立你的基准</h2>
          <p>填写当前体重与每周训练次数，约一分钟就能开始记录。</p>
          <div class="form-grid two">
            <label class="field"><span>称呼（可选）</span><input id="setup-name" type="text" maxlength="20" placeholder="怎么称呼你"></label>
            <label class="field"><span>当前体重（kg）</span><input id="setup-weight" type="number" min="35" max="250" step="0.1" value="${state.profile.weight}" required></label>
            <label class="field"><span>目标体重（kg）</span><input id="setup-goal-weight" type="number" min="35" max="250" step="0.1" value="${state.profile.goalWeight}" required></label>
            <label class="field range-field">
              <span>每周训练次数 <b id="setup-sessions-value">${state.profile.sessions} 次</b></span>
              <input id="setup-sessions" type="range" min="0" max="9" step="1" value="${state.profile.sessions}">
            </label>
          </div>
          <div class="setup-preview" id="setup-preview"></div>
          <div class="setup-actions">
            <button class="secondary-button" type="button" id="setup-demo">先看示例</button>
            <button class="primary-button" type="submit">建立我的计划</button>
          </div>
        </form>
      </div>`,
      true
    );
    const update = () => {
      const sessions = Number($("#setup-sessions").value);
      const weight = Number($("#setup-weight").value) || 70;
      const target = calculateAutoTargets(weight, sessions);
      $("#setup-sessions-value").textContent = `${sessions} 次`;
      $("#setup-preview").innerHTML = `
        <span><b>${target.carbs}g</b><small>碳水</small></span>
        <span><b>${target.protein}g</b><small>蛋白质</small></span>
        <span><b>${target.fat}g</b><small>脂肪</small></span>
        <span><b>${target.kcal}</b><small>千卡</small></span>`;
    };
    $("#setup-sessions").addEventListener("input", update);
    $("#setup-weight").addEventListener("input", update);
    update();
    $("#setup-demo").addEventListener("click", () => {
      loadDemoData(false);
      closeModal();
      renderAll();
      toast("已载入一组示例记录，可在设置中清空");
    });
    $("#setup-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const weight = Number($("#setup-weight").value);
      const goalWeight = Number($("#setup-goal-weight").value);
      const sessions = Number($("#setup-sessions").value);
      if (!isValidProfile(weight, goalWeight)) return;
      state.profile = {
        ...state.profile,
        name: $("#setup-name").value.trim(),
        weight: round(weight, 1),
        goalWeight: round(goalWeight, 1),
        sessions,
        setupComplete: true,
        targetMode: "auto",
        customTargets: null
      };
      upsertWeightForDate(toDateISO(new Date()), weight);
      saveState();
      closeModal();
      renderAll();
      toast("计划已经建立，从今天开始记录吧");
    });
  }

  function isValidProfile(weight, goalWeight) {
    if (!Number.isFinite(weight) || weight < 35 || weight > 250) {
      toast("当前体重应在 35–250kg 之间", "error");
      return false;
    }
    if (!Number.isFinite(goalWeight) || goalWeight < 35 || goalWeight > 250) {
      toast("目标体重应在 35–250kg 之间", "error");
      return false;
    }
    return true;
  }

  function upsertWeightForDate(date, weight) {
    const entry = { id: uid(), date, weight: round(weight, 1), createdAt: new Date().toISOString() };
    const index = state.weights.findIndex((item) => item.date === date);
    if (index >= 0) state.weights[index] = { ...state.weights[index], ...entry };
    else state.weights.push(entry);
    state.weights.sort((a, b) => a.date.localeCompare(b.date));
  }

  function openAdjustmentModal() {
    const stats = weekStats();
    const target = getTargets();
    const weight = state.profile.weight;
    let delta = 0;
    let title = "目前先保持";
    let reason = "数据还不够形成调整结论。继续记录饮食和体重，观察完整的一周。";
    if (stats.loggedDays.length >= 3 && stats.weightTrend.status === "data") {
      if (stats.weightTrend.pct < 0.1) {
        delta = -0.2;
        title = "建议碳水小幅下调";
        reason = "体重周变化接近停滞。只有在饮食记录完整的前提下，才建议把每日碳水减少 0.2g/kg。";
      } else if (stats.weightTrend.pct > 1.1) {
        delta = 0.2;
        title = "建议碳水小幅上调";
        reason = "体重下降偏快。若训练表现或恢复也在下降，可先把每日碳水增加 0.2g/kg。";
      } else {
        title = "继续保持当前目标";
        reason = "体重变化在可持续范围内，无需为了更快下降进一步压低摄入。";
      }
    }
    const carbDelta = Math.round(weight * delta);
    const suggested = {
      carbs: Math.max(100, target.carbs + carbDelta),
      protein: target.protein,
      fat: target.fat
    };
    const kcal = Math.round(suggested.carbs * 4 + suggested.protein * 4 + suggested.fat * 9);
    openModal(`
      ${modalHeader("本周调整建议", "建议只调整一个变量，并至少观察一周。")}
      <div class="modal-body">
        <h3 style="margin:8px 0;font-family:var(--font-display);font-size:22px">${title}</h3>
        <p class="settings-intro">${reason}</p>
        <div class="target-preview">
          <div><span>当前碳水</span><strong>${target.carbs}g</strong></div>
          <div><span>建议碳水</span><strong>${suggested.carbs}g</strong></div>
          <div><span>蛋白质</span><strong>${suggested.protein}g</strong></div>
          <div><span>新热量</span><strong>${kcal}</strong></div>
        </div>
        <div class="security-note" style="margin-top:16px">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M5 10l7-7 7 7"/></svg>
          <p>如果记录不完整、体重只测了一次，或本周有生病、旅行、聚会等特殊情况，建议先保持原计划再观察一周。</p>
        </div>
      </div>
      <div class="modal-footer">
        <button class="secondary-button" type="button" data-close-modal>先不调整</button>
        <button class="primary-button" id="confirm-adjustment" type="button">设为手动目标</button>
      </div>
    `);
    $("#confirm-adjustment").addEventListener("click", () => {
      state.profile.targetMode = "manual";
      state.profile.customTargets = suggested;
      saveState();
      closeModal();
      renderAll();
      toast("已应用为手动目标，之后可随时恢复自动计算");
    });
  }

  function loadDemoData(confirmFirst = true) {
    if (
      confirmFirst &&
      state.meals.length &&
      !window.confirm("载入示例会覆盖当前记录，继续吗？")
    ) {
      return;
    }
    const today = toDateISO(new Date());
    state.profile = {
      ...state.profile,
      name: state.profile.name || "小林",
      height: 172,
      weight: 70.8,
      goalWeight: 65,
      sessions: 5,
      setupComplete: true,
      targetMode: "auto",
      customTargets: null
    };
    const rawMeals = [
      { offset: 0, type: "breakfast", text: "燕麦 50g，鸡蛋 2个，蓝莓 100g，牛奶 200ml" },
      { offset: 0, type: "lunch", text: "鸡胸肉 180g，米饭 150g，西兰花 200g，橄榄油 8g" },
      { offset: -1, type: "breakfast", text: "全麦面包 2片，鸡蛋 2个，无糖酸奶 150g", time: "08:12" },
      { offset: -1, type: "lunch", text: "牛肉 160g，米饭 180g，混合蔬菜 250g，橄榄油 8g", time: "12:26" },
      { offset: -1, type: "dinner", text: "三文鱼 150g，红薯 200g，西兰花 220g", time: "18:45" },
      { offset: -2, type: "breakfast", text: "燕麦 45g，鸡蛋白 4个，香蕉 100g", time: "07:58" },
      { offset: -2, type: "lunch", text: "鸡腿肉 180g，米饭 160g，蔬菜 250g，橄榄油 7g", time: "12:18" },
      { offset: -2, type: "snack", text: "混合坚果 10g", time: "16:20" },
      { offset: -3, type: "breakfast", text: "全麦面包 2片，鸡蛋 2个，牛奶 250ml", time: "08:04" },
      { offset: -3, type: "lunch", text: "虾 180g，米饭 170g，西兰花 200g", time: "12:40" },
      { offset: -3, type: "dinner", text: "鸡胸肉 150g，土豆 250g，混合蔬菜 300g，橄榄油 6g", time: "19:02" },
      { offset: -4, type: "breakfast", text: "燕麦 50g，鸡蛋 1个，希腊酸奶 150g", time: "08:15" },
      { offset: -4, type: "lunch", text: "牛肉 170g，米粉 200g，青菜 250g", time: "12:31" },
      { offset: -5, type: "breakfast", text: "全麦面包 2片，鸡蛋 2个，蓝莓 100g", time: "08:22" },
      { offset: -5, type: "dinner", text: "三文鱼 160g，紫薯 220g，西兰花 250g", time: "18:52" }
    ];
    state.meals = rawMeals.map((meal, index) => {
      const items = parseFoodText(meal.text);
      return {
        id: `demo-meal-${index}`,
        date: shiftDate(today, meal.offset),
        type: meal.type,
        note: meal.text,
        rawText: meal.text,
        photo: null,
        items,
        totals: normalizeTotals(totalItems(items)),
        time: meal.time || (meal.type === "breakfast" ? "08:10" : meal.type === "lunch" ? "12:20" : "18:35"),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    });
    const baseWeights = [72.2, 72, 71.9, 71.7, 71.8, 71.5, 71.4, 71.3, 71.2, 71, 71.1, 70.9, 70.8];
    state.weights = baseWeights.map((weight, index) => ({
      id: `demo-weight-${index}`,
      date: shiftDate(today, -(baseWeights.length - 1 - index)),
      weight,
      createdAt: new Date().toISOString()
    }));
    selectedDate = today;
    saveState();
  }

  function renderAll() {
    renderToday();
    renderTrends();
    renderPlan();
    fillSettings();
    updateDateUI();
  }

  function exportData() {
    const exportState = { ...state };
    const blob = new Blob([JSON.stringify(exportState, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `食刻-饮食记录-${toDateISO(new Date())}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast("数据已导出");
  }

  async function importData(file) {
    try {
      const text = await file.text();
      const imported = JSON.parse(text);
      if (!imported || !Array.isArray(imported.meals) || !Array.isArray(imported.weights)) {
        throw new Error("不是有效的食刻数据文件");
      }
      if (!window.confirm("导入会覆盖当前计划与记录，继续吗？")) return;
      state = {
        ...createDefaultState(),
        ...imported,
        profile: { ...createDefaultState().profile, ...(imported.profile || {}) },
        settings: { ...createDefaultState().settings, ...(imported.settings || {}) }
      };
      saveState();
      renderAll();
      toast("数据导入成功");
    } catch (error) {
      toast(error.message || "导入失败", "error");
    }
  }

  function bindEvents() {
    $$("[data-view]").forEach((button) => {
      button.addEventListener("click", () => switchView(button.dataset.view));
    });
    $$("[data-view-link]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        switchView(button.dataset.viewLink);
      });
    });

    $("#prev-day").addEventListener("click", () => {
      selectedDate = shiftDate(selectedDate, -1);
      renderToday();
    });
    $("#next-day").addEventListener("click", () => {
      if (selectedDate >= toDateISO(new Date())) return;
      selectedDate = shiftDate(selectedDate, 1);
      renderToday();
    });
    $("#go-today").addEventListener("click", () => {
      selectedDate = toDateISO(new Date());
      renderToday();
    });
    $("#date-button").addEventListener("click", () => {
      const input = $("#date-input");
      if (input.showPicker) input.showPicker();
      else input.click();
    });
    $("#date-input").addEventListener("change", (event) => {
      if (event.target.value) {
        selectedDate = event.target.value > toDateISO(new Date()) ? toDateISO(new Date()) : event.target.value;
        renderToday();
      }
    });

    $$("[data-open-meal]").forEach((button) => {
      button.addEventListener("click", () => openMealModal(button.dataset.openMeal));
    });
    $("#floating-add").addEventListener("click", () => openMealModal("lunch"));
    $("#mobile-add").addEventListener("click", () => openMealModal("lunch"));
    $("#mobile-profile").addEventListener("click", () => switchView("settings"));
    $("#quick-weight").addEventListener("click", () => openWeightModal());
    $("#quick-text").addEventListener("click", () => {
      openMealModal(currentMealType());
      window.setTimeout(() => $("#meal-text")?.focus({ preventScroll: true }), 90);
    });
    $("#quick-photo").addEventListener("click", () => {
      openMealModal(currentMealType());
      $("#meal-photo-input")?.click();
    });
    $("#add-weight").addEventListener("click", () => openWeightModal());
    $("#add-weight-trend").addEventListener("click", () => openWeightModal());
    $("#add-weight-chart").addEventListener("click", () => openWeightModal());
    $("#sidebar-profile").addEventListener("click", () => switchView("settings"));
    $("#insight-shortcut").addEventListener("click", () => switchView("trends"));

    $("#meal-list").addEventListener("click", (event) => {
      const open = event.target.closest("[data-open-meal]");
      if (open) {
        openMealModal(open.dataset.openMeal);
        return;
      }
      const edit = event.target.closest("[data-edit-meal]");
      if (edit) {
        const meal = state.meals.find((item) => item.id === edit.dataset.editMeal);
        openMealModal(meal?.type || "lunch", edit.dataset.editMeal);
        return;
      }
      const remove = event.target.closest("[data-delete-meal]");
      if (remove) {
        if (!window.confirm("删除这一餐？")) return;
        state.meals = state.meals.filter((meal) => meal.id !== remove.dataset.deleteMeal);
        saveState();
        renderToday();
        toast("这一餐已删除");
        return;
      }
      const lightbox = event.target.closest("[data-lightbox]");
      if (lightbox) showLightbox(lightbox.dataset.lightbox);
    });

    $("#modal-backdrop").addEventListener("click", (event) => {
      if (event.target.id === "modal-backdrop" || event.target.closest("[data-close-modal]")) {
        closeModal();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        const lightbox = $(".lightbox");
        if (lightbox) lightbox.remove();
        else if (!$("#modal-backdrop").hidden) closeModal();
      }
    });

    $("#setting-sessions").addEventListener("input", updateSettingsPreview);
    $("#setting-weight").addEventListener("input", updateSettingsPreview);
    $("#manual-target-toggle").addEventListener("change", (event) => {
      $("#manual-target-fields").classList.toggle("is-visible", event.target.checked);
      if (event.target.checked) {
        const target = getTargets();
        $("#manual-carb").value = target.carbs;
        $("#manual-protein").value = target.protein;
        $("#manual-fat").value = target.fat;
      }
      updateSettingsPreview();
    });
    ["manual-carb", "manual-protein", "manual-fat"].forEach((id) => {
      $(`#${id}`).addEventListener("input", updateSettingsPreview);
    });

    $("#profile-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const weight = Number($("#setting-weight").value);
      const goalWeight = Number($("#setting-goal-weight").value);
      if (!isValidProfile(weight, goalWeight)) return;
      const manual = $("#manual-target-toggle").checked;
      state.profile = {
        ...state.profile,
        name: $("#setting-name").value.trim(),
        height: Number($("#setting-height").value) || "",
        weight: round(weight, 1),
        goalWeight: round(goalWeight, 1),
        sessions: Number($("#setting-sessions").value),
        setupComplete: true,
        targetMode: manual ? "manual" : "auto",
        customTargets: manual
          ? {
              carbs: Number($("#manual-carb").value) || 0,
              protein: Number($("#manual-protein").value) || 0,
              fat: Number($("#manual-fat").value) || 0
            }
          : null
      };
      saveState();
      renderAll();
      toast("计划已保存");
    });

    $("#ai-form").addEventListener("submit", (event) => {
      event.preventDefault();
      state.settings.endpoint =
        $("#setting-api-endpoint").value.trim() || "/api/analyze";
      state.settings.upstream =
        $("#setting-api-upstream").value.trim() ||
        "https://api.openai.com/v1/chat/completions";
      state.settings.model = $("#setting-api-model").value.trim() || "gpt-4.1-mini";
      state.settings.rememberKey = $("#remember-key").checked;
      setApiKey($("#setting-api-key").value.trim());
      saveState();
      toast("AI 设置已保存");
    });

    $("#test-ai").addEventListener("click", testAIConnection);
    $("#export-data").addEventListener("click", exportData);
    $("#import-data").addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (file) importData(file);
      event.target.value = "";
    });
    $("#load-demo").addEventListener("click", () => {
      loadDemoData(true);
      renderAll();
      toast("示例已载入");
    });
    $("#reset-data").addEventListener("click", () => {
      if (!window.confirm("确定清空所有饮食、体重与计划数据吗？此操作无法撤销。")) return;
      state = createDefaultState();
      safeStorageRemove(localStorage, KEY_LOCAL);
      safeStorageRemove(sessionStorage, KEY_SESSION);
      saveState();
      renderAll();
      openSetupModal();
      toast("数据已清空");
    });
    $("#apply-adjustment").addEventListener("click", openAdjustmentModal);
  }

  async function testAIConnection() {
    const endpoint = $("#setting-api-endpoint").value.trim();
    const model = $("#setting-api-model").value.trim();
    const key = $("#setting-api-key").value.trim();
    const isLocalProxy = endpoint.startsWith("/");
    if (!endpoint || !model || (!isLocalProxy && !key)) {
      toast("请先填写 API 地址和模型名称；直连接口还需要 Key", "error");
      return;
    }
    if (isLocalProxy && location.protocol === "file:") {
      toast("请运行 start-server.ps1 后通过本地网址打开", "error");
      return;
    }
    const button = $("#test-ai");
    button.disabled = true;
    button.textContent = "连接中…";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(isLocalProxy
            ? {
                "X-Shike-Upstream":
                  $("#setting-api-upstream").value.trim() ||
                  "https://api.openai.com/v1/chat/completions"
              }
            : {}),
          ...(key ? { Authorization: `Bearer ${key}` } : {})
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: "只回复 OK" }],
          max_tokens: 18
        })
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error?.message || `接口返回 ${response.status}`);
      }
      toast("AI 接口连接成功");
    } catch (error) {
      toast(`连接失败：${error.message}`, "error");
    } finally {
      button.disabled = false;
      button.textContent = "测试连接";
    }
  }

  function showLightbox(src) {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `<button type="button" aria-label="关闭">×</button><img src="${src}" alt="餐食照片放大">`;
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox || event.target.tagName === "BUTTON") lightbox.remove();
    });
    document.body.appendChild(lightbox);
  }

  function init() {
    state = loadState();
    bindEvents();
    renderAll();
    updateDateUI();
    renderPlan();
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      navigator.serviceWorker.register("./sw.js").catch(() => {
        // The app remains fully usable when offline support is unavailable.
      });
    }
    if (!state.profile.setupComplete) {
      window.setTimeout(openSetupModal, 80);
    }
    window.__appReady = true;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

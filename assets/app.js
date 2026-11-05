/* =========================================================
   香港教育政策 2023–2026：完成度分析
   零依賴圖表與互動
   ========================================================= */

/* ---------- 1. 政策資料集 ----------
   status: done = 已落實 / part = 部分落實・進行中
           late = 延後・需調整 / wait = 待觀察（新周期）
   theme 見 THEMES
   只納入 2023–2025 年度承諾計分；2026 年為新周期，另列。
------------------------------------------ */
const THEMES = {
  digital:  { name: '數字教育・STEAM', color: '#0f6b6b' },
  hub:      { name: '國際教育樞紐', color: '#1f4e8c' },
  voc:      { name: '職業專才教育', color: '#7a4b9e' },
  values:   { name: '國民教育・價值觀', color: '#b5121b' },
  teacher:  { name: '教師專業', color: '#a86a00' },
  support:  { name: '學生支援', color: '#2f7d4f' },
  planning: { name: '學校規劃・人口', color: '#5b6472' }
};

const STATUS = {
  done: { name: '已落實', cls: 'b-done', color: '#1d7a4c', w: 1 },
  part: { name: '部分落實', cls: 'b-part', color: '#0f8a8a', w: 0.6 },
  late: { name: '延後/調整', cls: 'b-late', color: '#c98a1b', w: 0.25 },
  wait: { name: '待觀察', cls: 'b-wait', color: '#94a0b0', w: 0 }
};

const POLICIES = [
  // ===== 2023 =====
  { y: 2023, theme: 'digital', status: 'done', due: '2025/26學年',
    t: '小學常識科分拆為「科學科」及「人文科」',
    d: '2023年《施政報告》宣布分拆，2024年3月公布課程框架定稿，2025/26學年起由小一及小四推行，2027/28學年擴展至全港小學。',
    e: '教育局：全港小學已於2025/26學年開始推行（小一及小四）' },
  { y: 2023, theme: 'digital', status: 'done', due: '2024年',
    t: '預留2億元供資助小學添置科學科教具及提升設施',
    d: '配合新科開設，一次性撥款改善實驗設備與教學空間。',
    e: '已納入新科開設的配套資源，學校2025/26學年起陸續使用' },
  { y: 2023, theme: 'hub', status: 'done', due: '2024/25學年',
    t: '非本地學生限額提升一倍至本地學額40%',
    d: '資助專上院校非本地生上限由20%提高至40%，同時表明本地資助學額不變。',
    e: '2024/25學年已生效；2025年再放寬至50%' },
  { y: 2023, theme: 'hub', status: 'part', due: '持續',
    t: '發展「北都大學教育城」',
    d: '鼓勵專上院校與中外知名院校合作，共享資源、產業聯動。',
    e: '2025年設「大學城籌劃及建設組」；2026年第四季升格為「大學城建設及發展委員會」，校園發展申請仍在審批階段' },
  { y: 2023, theme: 'hub', status: 'part', due: '逐步',
    t: '教資會資助大學增加約13,500個宿位',
    d: '回應非本地生及本地生住宿需求。',
    e: '2025年推出「城中學舍計劃」加快改裝及重建；宿位仍在分段落成' },
  { y: 2023, theme: 'voc', status: 'done', due: '2024年',
    t: '推動成立「應用科學大學」',
    d: '與評審局訂立應科大條件，優先納入SSSDP資助，鼓勵應用學位課程。',
    e: '香港都會大學2024年3月成為首間應科大；聖方濟各大學2024年11月成為第二間' },
  { y: 2023, theme: 'voc', status: 'done', due: '2024年',
    t: '預留啟動資金成立「應用科學大學聯盟」',
    d: '聯動推廣、加強與各地應用科學院校交流。',
    e: '2024年《施政報告》確認聯盟年內成立，政府撥款1億元作啟動資金' },
  { y: 2023, theme: 'voc', status: 'part', due: '2024年起',
    t: '職訓局成立「香港資訊科技學院」',
    d: '提供職前及在職IT培訓，應付資訊科技人才需求。',
    e: '學院已運作並開辦課程；2024年《施政報告》另撥款興建獨立校舍，工程仍在推展' },
  { y: 2023, theme: 'teacher', status: 'part', due: '持續',
    t: '提升教師專業：普通話測試資助、操守指引、內地研修基地',
    d: '資助現職及準教師考普通話水平測試、落實《教師專業操守指引》、在內地設首個教師研修及交流基地。',
    e: '各項培訓與交流持續推行；2026年進一步以修例方式確立教師執業證書' },
  { y: 2023, theme: 'values', status: 'part', due: '持續',
    t: '每年最少50所學校國民教育重點視學、「心繫家國2.0」',
    d: '透過視學、教師內地考察、國史國情資源強化國民教育。',
    e: '視學及聯校活動持續；2025年《施政報告》進一步提出「心繫家國」恆常化及普及化' },
  { y: 2023, theme: 'support', status: 'part', due: '持續',
    t: '特殊教育及非華語學生支援',
    d: '優化資助特殊學校輔導教師人手、自閉症學生額外支援、加強非華語生中文學習及生涯規劃。',
    e: '措施持續推行；2026年再推出ADHD學生支援計劃（約200校、6,500名學生）' },

  // ===== 2024 =====
  { y: 2024, theme: 'digital', status: 'done', due: '2024年',
    t: '成立「數字教育策略發展督導委員會」',
    d: '統籌數字教育政策，制定發展方向。',
    e: '委員會已運作，並於2026年6月發表《中小學數字教育發展藍圖》' },
  { y: 2024, theme: 'digital', status: 'part', due: '2024年起',
    t: '更新初中科學科課程、支援教師使用AI教學',
    d: '配合STEAM，更新課程內容並提供AI教學支援。',
    e: '初中課程已更新；高中數理課程修訂延至2026/27及2027/28學年公布' },
  { y: 2024, theme: 'teacher', status: 'late', due: '2024年',
    t: '撥款20億元設立「教師專業發展基金」',
    d: '支持教師專業長遠發展，持續優化培訓及交流。',
    e: '因政府檢討種子基金財務安排需時，2025年《施政報告》附件指檢討結果可能對該基金產生連鎖影響，至今未見獨立基金正式運作' },
  { y: 2024, theme: 'support', status: 'part', due: '2024/25學年',
    t: '約4.7億元強化語文學習、SEN支援及書簿津貼',
    d: '強化英語、普通話及其他語言學與教，加強照顧特殊學習需要學童。',
    e: '資源已陸續投放；2026年再增設中國語文自學平台及英語說話活動' },
  { y: 2024, theme: 'hub', status: 'done', due: '2024年起',
    t: '打造「留學香港」品牌',
    d: '爭取舉辦國際教育會議及展覽，在全球推廣，以獎學金吸引境外學生。',
    e: '2025年成立「留學香港專班」並推出「Hong Kong: Your World-class Campus」宣傳計劃，教資會撥款4,000萬元' },
  { y: 2024, theme: 'hub', status: 'done', due: '2024年',
    t: '學生宿舍先導計劃（改裝酒店及商廈）',
    d: '在規劃、地政、建築圖則審批拆牆鬆綁，鼓勵市場改裝。',
    e: '2025年7月擴展為「城中學舍計劃」，並容許重建項目保留過剩地積比' },
  { y: 2024, theme: 'hub', status: 'part', due: '2025/26學年',
    t: '「香港未來人才深造獎學金計劃」每年1,200名',
    d: '資助本地學生修讀指定研究院修課課程。',
    e: '計劃已於2025/26學年推出；每年名額及實際受惠人數未見完整公布' },
  { y: 2024, theme: 'voc', status: 'part', due: '2024年起',
    t: '職訓局香港資訊科技學院校舍及升降機技術中心',
    d: '為新學院興建校舍，並發展升降機及自動梯技術中心。',
    e: '撥款已到位，工程及設施推展中' },

  // ===== 2025 =====
  { y: 2025, theme: 'hub', status: 'done', due: '2026/27學年',
    t: '非本地生自費學額上限由40%增至50%',
    d: '每所資助專上院校上限提升至本地學額的50%；研究院研究課程超額收生上限由100%增至120%。',
    e: '2026/27學年起生效；政府指標為2026/27學年非本地生增加5%至約9萬人' },
  { y: 2025, theme: 'hub', status: 'part', due: '2025/26學年',
    t: '直資學校試點增收非本地學生',
    d: '容許直資學校申請上調班級數目及每班人數，以自資模式錄取持學生簽證的非本地生。',
    e: '試點已開放申請；住宿及監護配套仍是主要瓶頸' },
  { y: 2025, theme: 'hub', status: 'part', due: '2025年起',
    t: '推廣DSE國際認受性、打擊「借殼辦學」',
    d: '透過國際教育展推廣文憑試，同時設舉報機制、突擊巡查、明確自修生報考安排。',
    e: '巡查及舉報機制已運作；《私立學校實務守則》延至2026/27學年才定稿' },
  { y: 2025, theme: 'planning', status: 'late', due: '2025年內',
    t: '制訂《私立學校實務守則》及設立「私立學校名冊」',
    d: '提升私立學校辦學水平及透明度，應對「借殼辦學」問題。',
    e: '原定2025年內完成，2026年《施政報告》改為2026/27學年內把試行版定稿（延後約一年）' },
  { y: 2025, theme: 'digital', status: 'done', due: '2025/26學年',
    t: '優質教育基金預留20億元支援中小學數字教育',
    d: '優化課程、加強教師培訓、提升數字基建。',
    e: '已落實，其中5億元推行「『智』啟學教」計劃，成功申請學校獲一次性50萬元撥款' },
  { y: 2025, theme: 'digital', status: 'done', due: '2026年',
    t: '發表《中小學數字教育發展藍圖》',
    d: '優化中小學銜接的資訊及創科課程、訂定「人工智能素養」學習架構、AI納入核心課程、加強教師AI培訓。',
    e: '2026年6月正式發表，提出四大發展重點及十項推行策略' },
  { y: 2025, theme: 'digital', status: 'part', due: '2025/26–2026/27學年',
    t: '40間中小學AI教育先導計劃，逐步擴展至200間以上',
    d: '以先導學校累積經驗，再全面推展。',
    e: '先導計劃已開展；2026年《施政報告》再提出免費數字教育資源大平台及「AI教學助理」' },
  { y: 2025, theme: 'voc', status: 'part', due: '持續',
    t: '應科大與大灣區頂尖職業技術院校合作',
    d: '研究聯合課程、跨境實習、科研協作，共建大灣區交流平台。',
    e: '應科大聯盟已開展研究；2026年《施政報告》重申深化大灣區協作' },
  { y: 2025, theme: 'voc', status: 'part', due: '持續',
    t: '兩地副學位學歷互認',
    d: '與內地探討互認副學位程度學歷，便利跨境求職升學。',
    e: '仍在探討階段，未見落實時間表' },
  { y: 2025, theme: 'hub', status: 'part', due: '2025年起',
    t: '發展國際學校：兩所空置校舍、北都預留土地',
    d: '鼓勵國際學校增收非本地生，容許自資增建及優化設施（包括宿舍）。',
    e: '兩所空置校舍已分配；北都土地及增建審批仍在推展' },
  { y: 2025, theme: 'support', status: 'part', due: '2025/26學年',
    t: '優質教育基金新階段專項撥款提升申請上限',
    d: '為公帑資助學校及合資格幼稚園提升累計申請額上限，推動價值觀教育、理財教育。',
    e: '撥款計劃已推出；2026年再提「理財教育進校園」計劃' }
];

/* 2026 新周期（未計分） */
const NEW2026 = [
  { t: '免費數字教育學習資源大平台（含AI大語言模型）及「AI教學助理」擴展至更多科目', tag: '數字教育', due: '2026/27學年起' },
  { t: '《小學資訊與創新科技課程》框架，優化中小學資訊及創科課程銜接', tag: '數字教育', due: '2026/27學年' },
  { t: '修訂高中物理、化學、生物課程；2027/28公布高中數學延伸部分修訂', tag: '數字教育', due: '2026/27–2027/28' },
  { t: '幼稚園教育行政數字化：優化數碼設備、AI工具、教職員培訓', tag: '數字教育', due: '2027年公布支援措施' },
  { t: '公帑資助學校「滙流升級計劃」，鼓勵及支援中小學合併', tag: '學校規劃', due: '2026/27學年內' },
  { t: '修訂《教育條例》，把持有執業證書訂為執教必備條件', tag: '教師專業', due: '2026年內提交草案' },
  { t: '優化教師培訓框架，訂立具體培訓要求', tag: '教師專業', due: '2026/27學年' },
  { t: '中國語文教育一站式自學平台、全港英語說話活動、初中其他語言學習', tag: '學生支援', due: '2026/27學年' },
  { t: '「加強支援注意力不足／過度活躍症學生」計劃', tag: '學生支援', due: '2026/27推出，2027/28起試行三年' },
  { t: '北都大學城：設「大學城建設及發展委員會」及專責審批小組', tag: '國際樞紐', due: '2026年第四季' }
];

/* ---------- 2. 統計 ---------- */
const scored = POLICIES; // 2023–2025
const countBy = (arr, key) => arr.reduce((m, x) => (m[x[key]] = (m[x[key]] || 0) + 1, m), {});

function scoreOf(list) {
  if (!list.length) return 0;
  const s = list.reduce((a, x) => a + STATUS[x.status].w, 0);
  return Math.round((s / list.length) * 100);
}

/* ---------- 3. 圖表工具 ---------- */
const NS = 'http://www.w3.org/2000/svg';
const el = (n, attrs = {}) => {
  const e = document.createElementNS(NS, n);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  return e;
};
const svgWrap = (w, h) => {
  const s = el('svg', { viewBox: `0 0 ${w} ${h}`, role: 'img' });
  s.style.width = '100%';
  return s;
};

/* 3.1 年度 × 狀態 堆疊柱 */
function stackedChart(mount) {
  const years = [2023, 2024, 2025, 2026];
  const data = years.map(y => {
    if (y === 2026) return { y, wait: NEW2026.length, done: 0, part: 0, late: 0 };
    return { y, ...countBy(POLICIES.filter(p => p.y === y), 'status') };
  });
  const keys = ['done', 'part', 'late', 'wait'];
  const W = 620, H = 300, pad = { t: 26, r: 12, b: 42, l: 34 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const max = Math.max(...data.map(d => keys.reduce((a, k) => a + (d[k] || 0), 0)));
  const yMax = Math.ceil(max / 4) * 4;
  const svg = svgWrap(W, H);

  // grid
  for (let i = 0; i <= 4; i++) {
    const v = (yMax / 4) * i, y = pad.t + ih - (v / yMax) * ih;
    svg.appendChild(el('line', { x1: pad.l, x2: W - pad.r, y1: y, y2: y, class: 'axis', 'stroke-dasharray': i ? '3 4' : '0' }));
    const t = el('text', { x: pad.l - 8, y: y + 3.5, class: 'tick', 'text-anchor': 'end' });
    t.textContent = v; svg.appendChild(t);
  }
  const bw = 62, gap = (iw - bw * data.length) / (data.length + 1);
  data.forEach((d, i) => {
    const x = pad.l + gap + i * (bw + gap);
    let acc = 0;
    keys.forEach(k => {
      const v = d[k] || 0; if (!v) return;
      const hh = (v / yMax) * ih;
      const y = pad.t + ih - acc - hh;
      const r = el('rect', { x, y, width: bw, height: Math.max(hh, 1), fill: STATUS[k].color, rx: 2 });
      r.appendChild(el('title')).textContent = `${d.y} ${STATUS[k].name}：${v} 項`;
      svg.appendChild(r);
      if (hh > 18) {
        const tx = el('text', { x: x + bw / 2, y: y + hh / 2 + 4, 'text-anchor': 'middle', fill: '#fff', 'font-size': 11.5, 'font-weight': 700 });
        tx.textContent = v; svg.appendChild(tx);
      }
      acc += hh;
    });
    const lab = el('text', { x: x + bw / 2, y: H - 16, 'text-anchor': 'middle', class: 'tick', 'font-weight': 700, fill: '#42474f' });
    lab.textContent = d.y; svg.appendChild(lab);
    const sub = el('text', { x: x + bw / 2, y: H - 3, 'text-anchor': 'middle', class: 'tick' });
    sub.textContent = d.y === 2026 ? '新周期' : '承諾期';
    svg.appendChild(sub);
  });
  mount.appendChild(svg);

  // legend
  const lg = document.createElement('div');
  lg.className = 'legend';
  keys.forEach(k => {
    const s = document.createElement('span');
    s.innerHTML = `<i style="background:${STATUS[k].color}"></i>${STATUS[k].name}`;
    lg.appendChild(s);
  });
  mount.appendChild(lg);
}

/* 3.2 甜甜圈 */
function donutChart(mount) {
  const c = countBy(POLICIES, 'status');
  const total = POLICIES.length;
  const order = ['done', 'part', 'late'];
  const W = 300, H = 300, R = 108, sw = 30, cx = W / 2, cy = H / 2;
  const svg = svgWrap(W, H);
  const C = 2 * Math.PI * R;
  let off = 0;
  order.forEach(k => {
    const v = c[k] || 0; if (!v) return;
    const len = (v / total) * C;
    const circle = el('circle', {
      cx, cy, r: R, fill: 'none', stroke: STATUS[k].color, 'stroke-width': sw,
      'stroke-dasharray': `${len - 2} ${C - len + 2}`,
      'stroke-dashoffset': -off, transform: `rotate(-90 ${cx} ${cy})`, 'stroke-linecap': 'butt'
    });
    circle.appendChild(el('title')).textContent = `${STATUS[k].name}：${v} 項`;
    svg.appendChild(circle);
    off += len;
  });
  const t1 = el('text', { x: cx, y: cy - 4, 'text-anchor': 'middle', 'font-size': 34, 'font-weight': 800, fill: '#16181d' });
  t1.textContent = scoreOf(POLICIES); svg.appendChild(t1);
  const t2 = el('text', { x: cx, y: cy + 20, 'text-anchor': 'middle', class: 'tick', 'font-size': 11.5 });
  t2.textContent = '加權完成度'; svg.appendChild(t2);
  mount.appendChild(svg);

  const lg = document.createElement('div');
  lg.className = 'legend';
  order.forEach(k => {
    const s = document.createElement('span');
    s.innerHTML = `<i style="background:${STATUS[k].color}"></i>${STATUS[k].name} ${c[k] || 0}`;
    lg.appendChild(s);
  });
  mount.appendChild(lg);
}

/* 3.3 主題橫向排名 */
function themeChart(mount) {
  const rows = Object.keys(THEMES).map(k => {
    const list = POLICIES.filter(p => p.theme === k);
    return { k, n: list.length, score: scoreOf(list) };
  }).filter(r => r.n).sort((a, b) => b.score - a.score);

  const W = 640, rowH = 38, H = rows.length * rowH + 22;
  const padL = 132, padR = 46;
  const svg = svgWrap(W, H);
  rows.forEach((r, i) => {
    const y = i * rowH + 12;
    const lab = el('text', { x: padL - 10, y: y + 15, 'text-anchor': 'end', 'font-size': 12.5, fill: '#42474f', 'font-weight': 600 });
    lab.textContent = THEMES[r.k].name; svg.appendChild(lab);

    svg.appendChild(el('rect', { x: padL, y, width: W - padL - padR, height: 18, rx: 9, fill: '#eef1f5' }));
    const w = Math.max(((W - padL - padR) * r.score) / 100, 3);
    svg.appendChild(el('rect', { x: padL, y, width: w, height: 18, rx: 9, fill: THEMES[r.k].color, opacity: .88 }));

    const v = el('text', { x: W - padR + 8, y: y + 14, 'font-size': 12, 'font-weight': 800, fill: THEMES[r.k].color });
    v.textContent = r.score; svg.appendChild(v);

    const n = el('text', { x: padL + 10, y: y + 13.5, 'font-size': 10.5, fill: '#fff', 'font-weight': 700 });
    n.textContent = `${r.n} 項`; svg.appendChild(n);
  });
  mount.appendChild(svg);
}

/* 3.4 小圖：兩支柱比較 */
function pairBars(mount, cfg) {
  const W = 260, H = 130, padB = 30, padT = 18;
  const svg = svgWrap(W, H);
  const max = Math.max(...cfg.data.map(d => d.v)) * 1.18;
  const bw = 58, gap = 34;
  const startX = (W - (cfg.data.length * bw + (cfg.data.length - 1) * gap)) / 2;
  cfg.data.forEach((d, i) => {
    const h = ((H - padB - padT) * d.v) / max;
    const x = startX + i * (bw + gap), y = H - padB - h;
    const r = el('rect', { x, y, width: bw, height: h, rx: 5, fill: d.c, opacity: .9 });
    svg.appendChild(r);
    const v = el('text', { x: x + bw / 2, y: y - 7, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 800, fill: d.c });
    v.textContent = d.label; svg.appendChild(v);
    const t = el('text', { x: x + bw / 2, y: H - 10, 'text-anchor': 'middle', class: 'tick' });
    t.textContent = d.x; svg.appendChild(t);
  });
  mount.appendChild(svg);
}

/* 3.5 階梯折線 */
function stepChart(mount, cfg) {
  const W = 300, H = 150, pad = { t: 24, r: 14, b: 34, l: 30 };
  const svg = svgWrap(W, H);
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const maxY = Math.max(...cfg.data.map(d => d.v)) * 1.25;
  const pts = cfg.data.map((d, i) => ({
    x: pad.l + (iw * i) / (cfg.data.length - 1),
    y: pad.t + ih - (ih * d.v) / maxY, d
  }));
  let path = '';
  pts.forEach((p, i) => {
    if (!i) path += `M${p.x},${p.y}`;
    else path += `H${p.x}V${p.y}`;
  });
  svg.appendChild(el('path', { d: path, fill: 'none', stroke: cfg.color, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }));
  pts.forEach(p => {
    svg.appendChild(el('circle', { cx: p.x, cy: p.y, r: 5, fill: '#fff', stroke: cfg.color, 'stroke-width': 2.5 }));
    const v = el('text', { x: p.x, y: p.y - 11, 'text-anchor': 'middle', 'font-size': 12, 'font-weight': 800, fill: cfg.color });
    v.textContent = p.d.v + (cfg.suffix || ''); svg.appendChild(v);
    const t = el('text', { x: p.x, y: H - 12, 'text-anchor': 'middle', class: 'tick' });
    t.textContent = p.d.x; svg.appendChild(t);
  });
  mount.appendChild(svg);
}

/* ---------- 4. 渲染表格 ---------- */
function renderTable() {
  const tb = document.getElementById('policy-body');
  if (!tb) return;
  const rows = [...POLICIES].sort((a, b) => a.y - b.y || a.theme.localeCompare(b.theme));
  tb.innerHTML = rows.map(p => `
    <tr>
      <td class="mono" style="color:#6b7280;font-size:12.5px">${p.y}</td>
      <td><span class="t">${p.t}</span><div class="small muted" style="margin-top:4px">${p.d}</div></td>
      <td style="white-space:nowrap">${THEMES[p.theme].name}</td>
      <td style="white-space:nowrap;font-size:12.5px">${p.due}</td>
      <td><span class="badge ${STATUS[p.status].cls}">${STATUS[p.status].name}</span></td>
      <td class="small">${p.e}</td>
    </tr>`).join('');

  const nb = document.getElementById('new-body');
  if (nb) nb.innerHTML = NEW2026.map(n => `
    <tr>
      <td><span class="tag" style="font-size:11.5px;font-weight:700;color:#5b6472">${n.tag}</span></td>
      <td class="t" style="font-weight:600;color:#16181d">${n.t}</td>
      <td style="white-space:nowrap;font-size:12.5px;color:#6b7280">${n.due}</td>
    </tr>`).join('');
}

/* ---------- 5. 導覽 ---------- */
function navHighlight() {
  const links = [...document.querySelectorAll('.nav a')];
  const secs = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(s => io.observe(s));
}

/* ---------- 6. 初始化 ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderTable();
  const s1 = document.getElementById('chart-years'); if (s1) stackedChart(s1);
  const s2 = document.getElementById('chart-donut'); if (s2) donutChart(s2);
  const s3 = document.getElementById('chart-themes'); if (s3) themeChart(s3);

  const e1 = document.getElementById('mini-enrol');
  if (e1) pairBars(e1, {
    data: [
      { v: 373228, label: '373,228', x: '2019/20', c: '#94a0b0' },
      { v: 317233, label: '317,233', x: '2025/26', c: '#b5121b' }
    ]
  });

  const e2 = document.getElementById('mini-class');
  if (e2) pairBars(e2, {
    data: [
      { v: 26, label: '26 班', x: '2024/25', c: '#94a0b0' },
      { v: 125, label: '125 班', x: '2026/27', c: '#b5121b' }
    ]
  });

  const e3 = document.getElementById('mini-nonlocal');
  if (e3) stepChart(e3, {
    color: '#1f4e8c', suffix: '%',
    data: [{ x: '2023/24', v: 20 }, { x: '2024/25', v: 40 }, { x: '2026/27', v: 50 }]
  });

  const e4 = document.getElementById('mini-teacher');
  if (e4) stepChart(e4, {
    color: '#a86a00', suffix: '%',
    data: [{ x: '2022/23', v: 9.2 }, { x: '2023/24', v: 8.0 }]
  });

  const d1 = document.getElementById('score-list');
  if (d1) {
    const rows = Object.keys(THEMES).map(k => {
      const list = POLICIES.filter(p => p.theme === k);
      return { k, n: list.length, sc: scoreOf(list) };
    }).filter(r => r.n).sort((a, b) => b.sc - a.sc);
    d1.innerHTML = rows.map(r => `
      <div style="padding:12px 0;border-top:1px dashed #e3e6ea">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px">
          <b style="font-size:14.5px">${THEMES[r.k].name}</b>
          <span class="mono" style="font-size:13px;color:#6b7280">${r.n} 項　<b style="color:${THEMES[r.k].color};font-size:15px">${r.sc}</b></span>
        </div>
        <div class="bar"><span style="width:${r.sc}%;background:${THEMES[r.k].color}"></span></div>
      </div>`).join('');
  }

  navHighlight();
});

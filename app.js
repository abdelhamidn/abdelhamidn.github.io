(() => {
  "use strict";

  // ---- config -------------------------------------------------------------
  const USER = "abdelhamidn";
  const PROMPT = `${USER}@github:~$`;
  const API = `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`;
  const LINKS = {
    portfolio: "https://abdelhamid.noira.net",
    linkedin: "https://linkedin.com/in/abdelhamidn",
    github: `https://github.com/${USER}`,
    email: "mailto:abdelhamid@noira.net",
  };
  const SNAP = window.SNAPSHOT || null; // baked fallbacks, see data.js

  const $term = document.getElementById("term");
  const $in = document.getElementById("cmdInput");
  const $typed = document.getElementById("typed");
  const $form = document.getElementById("line");
  const $tip = document.getElementById("tooltip");
  const $canvas = document.getElementById("matrixCanvas");

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = matchMedia("(hover: none)").matches;

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
  const ext = (href, text) => `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(text)}</a>`;
  const cmd = (c) => `<span class="out-cmd" data-cmd="${c}">${c}</span>`;
  const dim = (s) => `<span class="out-dim">${s}</span>`;

  function line(html = "", cls = "") {
    const d = document.createElement("div");
    d.className = "line" + (cls ? " " + cls : "");
    d.innerHTML = html || "&nbsp;";
    $term.appendChild(d);
    scrollDown();
    return d;
  }
  function lineNode(node) {
    const d = document.createElement("div");
    d.className = "line";
    d.appendChild(node);
    $term.appendChild(d);
    scrollDown();
    return d;
  }
  const blank = () => line();
  const scrollDown = () => { $term.scrollTop = $term.scrollHeight; };

  // ---- content ------------------------------------------------------------
  const HELP = [
    ["whoami", "who I am"],
    ["experience", "work history"],
    ["education", "degrees"],
    ["skills", "tech stack"],
    ["projects", "things I've built"],
    ["contributions", "live GitHub contribution heatmap"],
    ["streak", "current / longest streak"],
    ["contact", "how to reach me"],
    ["photo", "ascii self-portrait"],
    ["matrix", "toggle a little fun"],
    ["clear", "clear the terminal"],
  ];

  const WHOAMI = [
    ["out-white", "Engineer driven by curiosity and innovation, turning complex challenges into AI-powered, scalable solutions through multicloud expertise and a passion for deep learning."],
    ["out-dim", "Currently: DevOps Project Manager @ Be Ys (7-engineer team · French sovereign cloud)"],
    ["out-dim", "Past: DevOps Consultant @ IO Solutions → Rogers · DevOps Engineer @ Tersea → Deskea, Brams → Deeplinq, Sekera → SecDojo"],
    ["out-dim", "Highlights: $100K GCP Startups Program award · 80% productivity gain via helpdesk automation · K8s on AWS migration (−15% costs)"],
    ["out-dim", "Casablanca, Morocco · Arabic (native) · English · French"],
  ];

  const JOBS = [
    ["Nov 2025 – Present", "DevOps Project Manager", "Be Ys, Casablanca", "Leading a 7-engineer team across sprints, CI/CD and incident response. French sovereign cloud for regulated industries."],
    ["Oct 2025", "Energy Solutions Specialist", "Intelcia → ENGIE", "Client billing and commercial products support, 40–50 bilingual calls daily as top performer."],
    ["May 2025 – Oct 2025", "DevOps Consultant", "IO Solutions → Rogers Communications", "Designed a president-approved IT solution."],
    ["Nov 2024 – Apr 2025", "DevOps Engineer (Internship)", "Tersea Groupe → Deskea", "Migrated a 24-container stack to Kubernetes on AWS: −15% costs, +10% performance."],
    ["Feb 2024 – Aug 2024", "DevOps Engineer (Internship)", "Brams Technologies → Deeplinq", "Built a cross-browser AI extension that secured a $100K GCP Startups Program award."],
    ["Feb 2023 – Aug 2023", "DevOps Engineer (Internship)", "Sekera Services → SecDojo", "Engineered an automated cloud deployment platform."],
  ];

  const EDU = [
    ["2021 – 2024", "Computer Science, Engineering Degree", "Université Mundiapolis, Casablanca"],
    ["2019 – 2021", "Software Development, Specialized Technician", "OFPPT, Casablanca"],
    ["2016 – 2019", "Sciences, Baccalaureate", "Lycée Mohamed V, Casablanca"],
  ];

  const SKILLS = [
    ["management", ["Jira", "Confluence", "Notion", "Trello", "Agile", "Scrum", "Kanban", "Sprint Planning", "Team Leadership", "KPI", "SLA", "Backlog", "Incident & Priority Management", "IT Governance"]],
    ["devops", ["Docker", "Kubernetes", "Helm", "Terraform", "Ansible", "IaC", "Bash", "Shell Scripting", "YAML", "Cron Jobs", "GitLab CI", "CI/CD", "Git", "GitHub", "GitLab", "Bitbucket", "Code Review", "Merge Requests", "Branch Management", "Blue-Green", "Canary", "Staging Releases", "Rollback Strategies"]],
    ["cloud", ["Azure", "AWS", "GCP", "OVHcloud", "Oracle Cloud", "Huawei Cloud", "EKS", "AKS", "S3", "Linux", "Sovereign Cloud", "Multi-cloud", "Cloud Architecture", "Capacity Planning"]],
    ["net / security", ["Nginx", "Traefik", "Load Balancing", "VPN", "Firewall", "DNS", "SSL/TLS", "Zero Trust", "OAuth 2.0", "RBAC", "IAM", "Active Directory", "GPO", "Keycloak", "HashiCorp Vault", "Secrets Management"]],
    ["observability", ["Prometheus", "Grafana", "Tempo", "Elasticsearch", "Logstash", "Kibana", "OpenTelemetry", "Splunk", "Zabbix", "Nagios", "Shinken", "Netdata", "SLI/SLO", "Error Tracking", "Health Checks"]],
    ["data / kpi", ["Odoo", "SAP", "GLPI", "PostgreSQL", "MySQL", "MongoDB", "MariaDB", "Supabase", "Firebase", "Redis", "Kafka", "Celery", "ETL Pipelines", "Superset", "Tableau", "Power BI", "Snowflake", "Databricks", "Data Visualization", "Reporting Automation"]],
    ["ai / automation", ["Python", "FastAPI", "Node.js", "TypeScript", "REST API", "GraphQL", "Swagger", "Postman", "Web Scraping", "OpenAI API", "Anthropic API", "Chrome API", "LangChain", "LangGraph", "Hugging Face", "Ollama", "ChromaDB", "RAG", "Fine Tuning", "Prompt Engineering", "Agentic AI", "MLOps", "NLP", "LLMs", "Copilot Studio", "Power Automate", "n8n", "Zapier", "Microsoft 365", "SharePoint", "Teams", "WhatsApp"]],
    ["soft skills", ["Problem Solving", "Critical Thinking", "Decision Making", "Adaptability", "Fast Learning", "Attention to Detail", "Empathy", "Active Listening", "Conflict Resolution", "Emotional Intelligence"]],
  ];

  const PROJECTS = [
    ["Portfolio", "Personal site built with Next.js, available in 6 languages", LINKS.portfolio],
    ["GitHub profile", "Terminal-style profile README, SVG art regenerated every 3h by GitHub Actions + Python", `https://github.com/${USER}/${USER}`],
    ["anom", "Agentic AI universe platform", `https://github.com/${USER}/anom`],
  ];

  // ---- contribution data --------------------------------------------------
  const iso = (t) => new Date(t).toISOString().slice(0, 10);
  const dow = (date) => new Date(date + "T00:00:00Z").getUTCDay(); // 0 = Sunday

  const fromSnapshot = (s) => {
    const t0 = Date.parse(s.start + "T00:00:00Z");
    return s.counts.map((count, i) => ({ date: iso(t0 + i * 864e5), count }));
  };

  // Everything the UI shows (cards, streaks, heatmap levels) is derived from the day list,
  // so live data and the baked snapshot go through exactly the same code.
  function summarize(days, source) {
    let run = null, longest = { length: 0 }, bestDay = days[0];
    for (const d of days) {
      if (d.count > bestDay.count) bestDay = d;
      if (d.count > 0) {
        run = run ? { start: run.start, end: d.date, length: run.length + 1 } : { start: d.date, end: d.date, length: 1 };
        if (run.length > longest.length) longest = run;
      } else {
        run = null;
      }
    }
    let i = days.length - 1;
    if (days[i].count === 0) i--; // today may still be in progress, don't break the streak yet
    const end = i >= 0 ? days[i].date : "";
    let n = 0;
    while (i >= 0 && days[i].count > 0) { n++; i--; }
    const current = n ? { length: n, start: days[i + 1].date, end } : { length: 0 };

    // heatmap levels adapt to the data (quantiles of the active days), so a quiet year still shows contrast
    const active = days.filter((d) => d.count > 0).map((d) => d.count).sort((a, b) => a - b);
    const q = (p) => (active.length ? active[Math.min(active.length - 1, Math.floor(p * active.length))] : 0);
    return {
      source, days, longest, current, bestDay,
      total: days.reduce((a, d) => a + d.count, 0),
      range: { start: days[0].date, end: days[days.length - 1].date },
      cuts: [q(0.2), q(0.4), q(0.6), q(0.8)],
    };
  }

  async function loadLive() {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 6000);
    try {
      const res = await fetch(API, { signal: ctl.signal });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const days = (await res.json()).contributions.map(({ date, count }) => ({ date, count }));
      if (!days.length) throw new Error("empty response");
      return summarize(days, "live");
    } finally {
      clearTimeout(timer);
    }
  }

  let dataDone = false;
  const dataReady = loadLive()
    .catch(() => (SNAP ? summarize(fromSnapshot(SNAP.contributions), "snapshot") : null))
    .then((d) => { dataDone = true; return d; });

  async function getData() {
    if (dataDone) return dataReady;
    const wait = line(dim("fetching contribution data…"));
    const d = await dataReady;
    wait.remove();
    return d;
  }
  const noData = () => line(`<span class="out-red">could not load contribution data right now.</span> See ${ext(LINKS.github, "github.com/" + USER)}`);
  const snapshotNote = (d) => d.source === "snapshot" && line(dim(`live data unavailable, showing the snapshot from ${esc(SNAP.generated)}`));

  // ---- stat cards ---------------------------------------------------------
  function countUp(el, target) {
    if (reduced) { el.textContent = target.toLocaleString(); return; }
    const dur = 900, start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  const STATS = [
    ["contributions", (d) => d.total],
    ["day streak", (d) => d.current.length],
    ["day best streak", (d) => d.longest.length],
    ["in one day", (d) => d.bestDay.count],
  ];

  function statCards() {
    const box = document.createElement("div");
    box.className = "stats";
    box.innerHTML = STATS.map(([label]) => `<div class="stat"><div class="num">–</div><div class="lbl">${label}</div></div>`).join("");
    dataReady.then((d) => {
      if (d) box.querySelectorAll(".num").forEach((el, i) => countUp(el, STATS[i][1](d)));
    });
    return box;
  }

  // ---- heatmap ------------------------------------------------------------
  const PALETTE = ["#1c2128", "#0e4429", "#146c37", "#26a648", "#39d353", "#7cf2a0"];
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const levelFor = (n, c) => (n === 0 ? 0 : n <= c[0] ? 1 : n <= c[1] ? 2 : n <= c[2] ? 3 : n <= c[3] ? 4 : 5);

  function showTip(text, x, y) {
    $tip.textContent = text;
    $tip.style.display = "block";
    $tip.style.left = Math.max(4, Math.min(x + 14, innerWidth - $tip.offsetWidth - 4)) + "px";
    $tip.style.top = Math.max(4, Math.min(y + 14, innerHeight - $tip.offsetHeight - 4)) + "px";
  }
  const hideTip = () => { $tip.style.display = "none"; };

  function buildHeatmap(d) {
    const cells = d.days;
    const lead = dow(cells[0].date);
    const cols = Math.ceil((lead + cells.length) / 7);
    const grid = document.createElement("div");
    grid.className = "heatmap";
    grid.style.gridTemplateColumns = `repeat(${cols}, 10px)`;

    // month labels sit over the first week of each month, skipped when there's no room
    const marks = [];
    let prev = -1;
    for (let c = 0; c < cols; c++) {
      const first = cells[Math.max(0, c * 7 - lead)];
      const m = +first.date.slice(5, 7) - 1;
      if (m !== prev) { marks.push({ c, m }); prev = m; }
    }
    marks.forEach(({ c, m }, i) => {
      const next = marks[i + 1];
      if ((next ? next.c : cols) - c < 3) return;
      const el = document.createElement("span");
      el.className = "mlabel";
      el.textContent = MONTHS[m];
      el.style.gridArea = `1 / ${c + 1} / 2 / span 3`;
      grid.appendChild(el);
    });

    cells.forEach((day, i) => {
      const k = i + lead;
      const el = document.createElement("div");
      el.className = "cell";
      el.style.gridArea = `${(k % 7) + 2} / ${Math.floor(k / 7) + 1}`;
      el.style.background = PALETTE[levelFor(day.count, d.cuts)];
      el.dataset.date = day.date;
      el.dataset.count = day.count;
      grid.appendChild(el);
    });

    const point = (e) => {
      const c = e.target.closest("[data-date]");
      if (!c) return hideTip();
      const n = +c.dataset.count;
      showTip(`${c.dataset.date}: ${plural(n, "contribution")}`, e.clientX, e.clientY);
      if (e.pointerType !== "mouse") setTimeout(hideTip, 2500);
    };
    grid.addEventListener("pointermove", point);
    grid.addEventListener("pointerdown", point);
    grid.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") hideTip(); });
    grid.addEventListener("pointercancel", hideTip);

    const scroller = document.createElement("div");
    scroller.className = "heatmap-wrap";
    scroller.setAttribute("role", "img");
    scroller.setAttribute("aria-label", `${d.total} contributions from ${d.range.start} to ${d.range.end}`);
    scroller.appendChild(grid);

    const legend = document.createElement("div");
    legend.className = "legend";
    legend.innerHTML = "less " + PALETTE.map((c) => `<span class="cell" style="background:${c}"></span>`).join(" ") + " more";

    const box = document.createElement("div");
    box.append(scroller, legend);
    return { box, scroller };
  }

  // ---- ascii sizing -------------------------------------------------------
  const EM = (() => {
    const s = document.createElement("span");
    s.style.cssText = "position:absolute;visibility:hidden;white-space:pre;font-size:100px";
    s.textContent = "0".repeat(20);
    $term.appendChild(s);
    const w = s.getBoundingClientRect().width / 20 / 100; // advance width of the monospace font, in em
    s.remove();
    return w || 0.6;
  })();

  // largest font size (up to `max`) at which a cols x rows block fits the terminal without scrolling sideways or off-screen
  function fitFont(pre, cols, rows, max) {
    const maxH = parseFloat(getComputedStyle($term).maxHeight) || innerHeight * 0.6;
    const byWidth = ($term.clientWidth - 32) / (cols * EM * 1.02); // minus the .term padding
    const byHeight = (maxH - 32 - 24) / (rows * 1.1); // leave room for the prompt line above
    pre.style.fontSize = Math.max(3, Math.min(max, byWidth, byHeight)) + "px";
  }

  // ---- matrix -------------------------------------------------------------
  const GLYPHS = "01عبدالحمي<>/{}[]#*"; // 0 1 + "عبدالحميد"
  let matrix = null;

  function startMatrix() {
    const ctx = $canvas.getContext("2d");
    if (!ctx) return false;
    const size = 14;
    const m = (matrix = { raf: 0, drops: [] });
    m.fit = () => {
      $canvas.width = innerWidth;
      $canvas.height = innerHeight;
      const cols = Math.ceil(innerWidth / size);
      while (m.drops.length < cols) m.drops.push(Math.random() * -40);
      m.drops.length = cols;
      ctx.fillStyle = "#0d1117";
      ctx.fillRect(0, 0, $canvas.width, $canvas.height);
    };
    m.fit();
    addEventListener("resize", m.fit);
    document.body.classList.add("matrix");
    let last = 0;
    const draw = (now) => {
      m.raf = requestAnimationFrame(draw);
      if (now - last < 50) return; // ~20 fps keeps the rain readable
      last = now;
      ctx.fillStyle = "rgba(13,17,23,.12)";
      ctx.fillRect(0, 0, $canvas.width, $canvas.height);
      ctx.fillStyle = "#39d353";
      ctx.font = size + "px monospace";
      m.drops.forEach((y, i) => {
        ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], i * size, y * size);
        m.drops[i] = y * size > $canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    };
    m.raf = requestAnimationFrame(draw);
    return true;
  }

  function stopMatrix() {
    cancelAnimationFrame(matrix.raf);
    removeEventListener("resize", matrix.fit);
    document.body.classList.remove("matrix");
    matrix = null;
  }

  // ---- commands -----------------------------------------------------------
  const COMMANDS = {
    help() {
      line(`<span class="out-white">available commands:</span>`);
      HELP.forEach(([c, d]) => line(`  ${cmd(c)}${" ".repeat(Math.max(1, 15 - c.length))}${dim(esc(d))}`));
    },
    whoami() {
      WHOAMI.forEach(([cls, text]) => line(`<span class="${cls}">${esc(text)}</span>`));
    },
    experience() {
      JOBS.forEach(([when, role, org, what]) => line(
        `<div class="xp"><span class="out-green">${esc(when)}</span><span><span class="out-white">${esc(role)}</span> ${dim("· " + esc(org))}<br>${dim(esc(what))}</span></div>`));
    },
    education() {
      EDU.forEach(([when, degree, school]) => line(
        `<div class="xp"><span class="out-green">${esc(when)}</span><span><span class="out-white">${esc(degree)}</span><br>${dim(esc(school))}</span></div>`));
    },
    skills() {
      // each skill is its own nowrap span, so lists wrap between skills and never inside one
      SKILLS.forEach(([label, items]) => line(
        `<div class="kv"><span class="out-cmd">${esc(label)}</span><span>${items.map((s, i) => `<span class="sk">${esc(s)}${i < items.length - 1 ? "," : ""}</span>`).join(" ")}</span></div>`));
    },
    projects() {
      PROJECTS.forEach(([name, desc, url]) => {
        line(`<span class="out-cmd">&gt; ${esc(name)}</span>`);
        line(`  ${dim(esc(desc))}`);
        line(`  ${ext(url, url)}`);
      });
      line(`${dim("more on")} ${ext(LINKS.github, "github.com/" + USER)}`);
    },
    contact() {
      const row = (k, a) => line(`<span class="out-white">${k.padEnd(11)}</span>${a}`);
      row("portfolio", ext(LINKS.portfolio, "abdelhamid.noira.net"));
      row("linkedin", ext(LINKS.linkedin, "linkedin.com/in/abdelhamidn"));
      row("github", ext(LINKS.github, "github.com/" + USER));
      row("email", `<a href="${LINKS.email}">abdelhamid@noira.net</a>`);
      line(dim("Let's connect and build something impactful."));
    },
    async photo() {
      if (!SNAP || !SNAP.portrait) return line(dim("portrait unavailable"));
      const art = SNAP.portrait;
      const pre = document.createElement("pre");
      pre.className = "ascii";
      pre.setAttribute("role", "img");
      pre.setAttribute("aria-label", "ASCII self-portrait of Abdelhamid");
      fitFont(pre, Math.max(...art.map((r) => r.length)), art.length, 11);
      lineNode(pre);
      for (const row of art) {
        pre.textContent += row + "\n";
        scrollDown();
        if (!reduced) await sleep(26);
      }
    },
    async streak() {
      const d = await getData();
      if (!d) return noData();
      const span = (s) => (s.length ? ` (${s.start} → ${s.end})` : "");
      line(`<span class="out-green">current streak:</span>  ${plural(d.current.length, "day")}${span(d.current)}`);
      line(`<span class="out-green">longest streak:</span>  ${plural(d.longest.length, "day")}${span(d.longest)}`);
      line(`<span class="out-green">best day:</span>       ${plural(d.bestDay.count, "contribution")} on ${d.bestDay.date}`);
      line(`<span class="out-green">total:</span>          ${d.total.toLocaleString()} contributions since ${d.range.start}`);
      snapshotNote(d);
    },
    async contributions() {
      const d = await getData();
      if (!d) return noData();
      line(dim(`${d.total.toLocaleString()} contributions · ${d.range.start} → ${d.range.end}`));
      const { box, scroller } = buildHeatmap(d);
      lineNode(box);
      scroller.scrollLeft = scroller.scrollWidth; // most recent weeks first on narrow screens
      line(dim(`${touch ? "tap" : "hover"} a cell for the exact date and count`));
      snapshotNote(d);
    },
    matrix() {
      if (matrix) {
        stopMatrix();
        line(dim("back to normal"));
      } else if (reduced) {
        line(dim("matrix skipped: reduced motion is on in your system settings"));
      } else if (startMatrix()) {
        line(dim(`matrix mode on -- type '${cmd("matrix")}' again to turn it off`));
      }
    },
    clear() { $term.textContent = ""; },
    banner() {
      const src = [...document.querySelectorAll(".hero .banner")].find((el) => el.offsetParent !== null); // whichever variant is showing
      const pre = document.createElement("pre");
      pre.className = "banner in-term";
      pre.textContent = src.textContent;
      const rows = src.textContent.split("\n");
      fitFont(pre, Math.max(...rows.map((r) => r.length)), rows.length, 12);
      lineNode(pre);
    },
    open([target = ""]) {
      const url = LINKS[target.toLowerCase()];
      if (!url) return line(dim("usage: open [portfolio|linkedin|github|email]"));
      line(dim(`opening ${esc(target)}...`));
      if (url.startsWith("mailto:")) location.href = url;
      else window.open(url, "_blank", "noopener,noreferrer");
    },
    echo(args) { line(esc(args.join(" "))); },
    history() { hist.forEach((h, i) => line(`${dim(String(i + 1).padStart(3))}  ${esc(h)}`)); },
    date() { line(new Date().toString()); },
    sudo() { line(`<span class="out-yellow">[sudo] password for ${USER}:</span> ${dim("nice try. this is a static site.")}`); },
  };
  COMMANDS.about = COMMANDS.hello = COMMANDS.hi = COMMANDS.whoami;
  COMMANDS.ls = COMMANDS.projects;
  COMMANDS.links = COMMANDS.contact;

  // ---- terminal input -----------------------------------------------------
  const hist = [];
  let hIdx = 0;
  let queue = Promise.resolve();

  async function exec(raw, record) {
    const text = raw.trim();
    line(`<span class="prompt-tag">${PROMPT}</span> <span class="out-white">${esc(text)}</span>`, "prompt-line");
    if (!text) return;
    if (record) {
      if (hist[hist.length - 1] !== text) hist.push(text);
      hIdx = hist.length;
    }
    const [name, ...args] = text.split(/\s+/);
    const key = name.toLowerCase();
    if (!Object.hasOwn(COMMANDS, key)) {
      line(`${dim(`command not found: ${esc(name)} — type '`)}${cmd("help")}${dim("'")}`);
      return;
    }
    await COMMANDS[key](args);
  }

  // commands run one at a time, so animated output (photo) never interleaves with the next command
  function run(raw, record = true) {
    queue = queue.then(() => exec(raw, record)).catch((e) => {
      console.error(e);
      line(`<span class="out-red">error: ${esc(e && e.message ? e.message : e)}</span>`);
    });
    return queue;
  }

  // The visible text is a mirror of the hidden <input>, so we can draw a real block cursor
  // that sits on the caret (and blinks) instead of the browser's thin caret.
  function sync() {
    const v = $in.value;
    const pos = Math.min(($in.selectionDirection === "backward" ? $in.selectionStart : $in.selectionEnd) ?? v.length, v.length);
    const before = document.createElement("span");
    const cur = document.createElement("span");
    const after = document.createElement("span");
    before.textContent = v.slice(0, pos);
    cur.className = "cursor";
    cur.textContent = !v[pos] || v[pos] === " " ? " " : v[pos];
    after.textContent = v.slice(pos + 1);
    $typed.replaceChildren(before, cur, after);
  }

  function setInput(v) {
    $in.value = v;
    $in.setSelectionRange(v.length, v.length);
    sync();
  }

  function complete() {
    const text = $in.value.trim().toLowerCase();
    if (!text || /\s/.test(text)) return;
    // documented commands first, so hidden aliases (hello, hi...) don't get in the way of "hel" -> help
    let m = ["help", ...HELP.map(([c]) => c)].filter((c) => c.startsWith(text));
    if (!m.length) m = Object.keys(COMMANDS).filter((c) => c.startsWith(text));
    if (m.length === 1) {
      setInput(m[0] + " ");
    } else if (m.length > 1) {
      line(`<span class="prompt-tag">${PROMPT}</span> <span class="out-white">${esc($in.value)}</span>`, "prompt-line");
      line(dim(m.join("  ")));
    }
  }

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = $in.value;
    setInput("");
    run(v);
  });

  $in.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hIdx > 0) setInput(hist[--hIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      hIdx = Math.min(hIdx + 1, hist.length);
      setInput(hist[hIdx] || "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      complete();
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      COMMANDS.clear();
    }
    requestAnimationFrame(sync); // caret moves after the key is handled
  });
  ["input", "keyup", "click", "mouseup", "select", "focus", "blur"].forEach((ev) => $in.addEventListener(ev, sync));

  document.addEventListener("click", (e) => {
    const c = e.target.closest("[data-cmd]");
    if (c) {
      run(c.dataset.cmd);
      if (!touch) $in.focus({ preventScroll: true }); // don't pop the on-screen keyboard when tapping a command
      return;
    }
    if (e.target.closest("a, .cell") || getSelection().toString()) return;
    if (touch && !e.target.closest(".window")) return;
    $in.focus({ preventScroll: true });
  });

  document.addEventListener("pointerdown", (e) => { if (!e.target.closest(".heatmap")) hideTip(); });

  // typing anywhere on the page goes to the prompt
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
    if (document.activeElement && /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
    $in.focus({ preventScroll: true });
  });

  // ---- boot ---------------------------------------------------------------
  function boot() {
    line(`<span class="out-green">connected to github.com/${USER}</span>`);
    line(dim(`type '${cmd("help")}' to see available commands`));
    blank();
    lineNode(statCards());
    blank();
    run("whoami", false);
    sync();
    $in.focus({ preventScroll: true });
  }
  boot();
})();

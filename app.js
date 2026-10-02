(() => {
  "use strict";
  const USER = "abdelhamidn";
  const $out = document.getElementById("out");
  const $in = document.getElementById("in");
  const $term = document.getElementById("term");
  const $line = document.getElementById("line");

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const link = (href, text) => `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(text || href)}</a>`;
  const cmd = (c) => `<span class="cmd" data-cmd="${c}">${c}</span>`;
  const tag = (t, k = "") => `<span class="tag ${k}">${esc(t)}</span>`;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function print(html = "", cls = "") {
    const d = document.createElement("div");
    if (cls) d.className = cls;
    d.innerHTML = html;
    $out.appendChild(d);
    return d;
  }
  const scroll = () => window.scrollTo({ top: document.body.scrollHeight });

  // ---- banner -------------------------------------------------------------
  const GLYPH = {
    A: [" ███ ", "█   █", "█   █", "█████", "█   █", "█   █"],
    B: ["████ ", "█   █", "████ ", "█   █", "█   █", "████ "],
    D: ["████ ", "█   █", "█   █", "█   █", "█   █", "████ "],
    E: ["█████", "█    ", "████ ", "█    ", "█    ", "█████"],
    L: ["█    ", "█    ", "█    ", "█    ", "█    ", "█████"],
    H: ["█   █", "█   █", "█████", "█   █", "█   █", "█   █"],
    M: ["█   █", "██ ██", "█ █ █", "█   █", "█   █", "█   █"],
    I: ["█████", "  █  ", "  █  ", "  █  ", "  █  ", "█████"],
    N: ["█   █", "██  █", "█ █ █", "█  ██", "█   █", "█   █"],
  };
  const bannerText = () =>
    [0, 1, 2, 3, 4, 5].map((r) => [..."ABDELHAMIDN"].map((ch) => GLYPH[ch][r]).join(" ")).join("\n");

  // ---- content ------------------------------------------------------------
  const FEATURED = [
    { name: "anom", url: `https://github.com/${USER}/anom`, desc: "Agentic AI universe platform" },
    { name: "portfolio", url: "https://abdelhamid.noira.net", desc: "Personal portfolio site, abdelhamid.noira.net" },
  ];

  const SKILLS = {
    "Team & Project Management": ["Jira", "Confluence", "Notion", "Trello", "Agile", "Scrum", "Kanban", "Sprint Planning", "Team Leadership", "KPI", "SLA", "Backlog", "Incident & Priority Management", "IT Governance"],
    "Infrastructure & DevOps": ["Docker", "Kubernetes", "Helm", "Terraform", "Ansible", "IaC", "Bash", "YAML", "Cron Jobs", "GitLab CI", "CI/CD", "Git", "GitHub", "GitLab", "Bitbucket", "Blue-Green", "Canary", "Rollback Strategies"],
    "Cloud & Systems": ["Azure", "AWS", "GCP", "OVHcloud", "Oracle Cloud", "Huawei Cloud", "EKS", "AKS", "S3", "Linux", "Sovereign Cloud", "Multi-cloud", "Capacity Planning"],
    "Networking & Security": ["Nginx", "Traefik", "Load Balancing", "VPN", "Firewall", "DNS", "SSL/TLS", "Zero Trust", "OAuth 2.0", "RBAC", "IAM", "Active Directory", "GPO", "Keycloak", "HashiCorp Vault"],
    "Monitoring & Observability": ["Prometheus", "Grafana", "Tempo", "Elasticsearch", "Logstash", "Kibana", "OpenTelemetry", "Splunk", "Zabbix", "Nagios", "Shinken", "Netdata", "SLI/SLO", "Health Checks"],
    "Data & KPI Reporting": ["Odoo", "SAP", "GLPI", "PostgreSQL", "MySQL", "MongoDB", "MariaDB", "Supabase", "Firebase", "Redis", "Kafka", "Celery", "ETL", "Superset", "Tableau", "Power BI", "Snowflake", "Databricks"],
    "Automation, APIs & AI": ["Python", "FastAPI", "Node.js", "TypeScript", "REST", "GraphQL", "Swagger", "Postman", "OpenAI API", "Anthropic API", "LangChain", "LangGraph", "Hugging Face", "Ollama", "ChromaDB", "RAG", "Fine Tuning", "Prompt Engineering", "Agentic AI", "MLOps", "NLP", "LLMs", "Copilot Studio", "Power Automate", "n8n", "Zapier"],
  };
  const KIND = ["g", "b", "p", "o"];

  const JOBS = [
    ["DevOps Project Manager", "Be Ys, Casablanca", "Nov 2025 – Present", "Leading a 7-engineer team across sprints, CI/CD and incident response. French sovereign cloud for regulated industries."],
    ["Energy Solutions Specialist", "Intelcia → ENGIE", "Oct 2025", "Client billing and commercial products support, 40–50 bilingual calls daily as top performer."],
    ["DevOps Consultant", "IO Solutions → Rogers Communications", "May 2025 – Oct 2025", "Designed a president-approved IT solution."],
    ["DevOps Engineer (Internship)", "Tersea Groupe → Deskea", "Nov 2024 – Apr 2025", "Migrated a 24-container stack to Kubernetes on AWS: −15% costs, +10% performance."],
    ["DevOps Engineer (Internship)", "Brams Technologies → Deeplinq", "Feb 2024 – Aug 2024", "Built a cross-browser AI extension that secured a $100K GCP Startups Program award."],
    ["DevOps Engineer (Internship)", "Sekera Services → SecDojo", "Feb 2023 – Aug 2023", "Engineered an automated cloud deployment platform."],
  ];

  const COMMANDS = {
    help() {
      const rows = [
        ["about", "who I am"], ["experience", "where I've worked"], ["skills", "tools & technologies"],
        ["projects", "things I've built"], ["contributions", "my GitHub activity, last year"], ["education", "degrees"],
        ["links", "portfolio, LinkedIn, GitHub"], ["contact", "get in touch"], ["matrix", "wake up, Neo"],
        ["banner", "show the banner again"], ["history", "commands you've run"], ["clear", "clear the screen"],
      ];
      print(`<span class="dim">Available commands (Tab to autocomplete, ↑/↓ for history):</span>`);
      print(`<div class="grid2">${rows.map(([c, d]) => `<span>${cmd(c)}</span><span class="dim">${d}</span>`).join("")}</div>`);
    },
    about() {
      print(`<span class="b">Abdelhamid NOIRA</span>`);
      print(`<span class="info">Cloud &amp; DevOps Project Manager | R&amp;D AI-Oriented Software Engineer</span>`);
      print("");
      print("Engineer driven by curiosity and innovation, turning complex challenges into AI-powered, scalable solutions through multicloud expertise and a passion for deep learning.");
      print("");
      print(`📍 Casablanca, Morocco   🇲🇦 Arabic (native) · 🇬🇧 English · 🇫🇷 French`);
      print(`<span class="dim">Try</span> ${cmd("experience")}<span class="dim">,</span> ${cmd("skills")} <span class="dim">or</span> ${cmd("projects")}`);
    },
    whoami() { print("abdelhamidn"); },
    experience() {
      JOBS.forEach(([role, org, when, what]) => {
        print(`<span class="ok">▸</span> <span class="b">${esc(role)}</span> <span class="dim">· ${esc(org)} · ${esc(when)}</span>`);
        print(`  ${esc(what)}`);
      });
    },
    education() {
      [["Computer Science, Engineering Degree", "Université Mundiapolis, Casablanca", "2021 – 2024"],
       ["Software Development, Specialized Technician", "OFPPT, Casablanca", "2019 – 2021"],
       ["Sciences, Baccalaureate", "Lycée Mohamed V, Casablanca", "2016 – 2019"]]
        .forEach(([d, s, y]) => print(`<span class="ok">▸</span> <span class="b">${esc(d)}</span> <span class="dim">· ${esc(s)} · ${y}</span>`));
    },
    skills() {
      Object.entries(SKILLS).forEach(([cat, items], i) => {
        print(`<span class="b">${esc(cat)}</span>`);
        print(items.map((s) => tag(s, KIND[i % KIND.length])).join(" "));
        print("");
      });
    },
    async projects() {
      print(`<span class="dim">Featured</span>`);
      FEATURED.forEach((p) => print(`<span class="ok">▸</span> ${link(p.url, p.name)} <span class="dim">— ${esc(p.desc)}</span>`));
      const wait = print(`<span class="dim">fetching public repos…</span>`);
      try {
        const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`);
        if (!res.ok) throw new Error(res.status);
        const repos = (await res.json()).filter((r) => !r.fork && r.name.toLowerCase() !== USER && !r.name.endsWith(".github.io"));
        wait.remove();
        if (repos.length) {
          print(`<span class="dim">Public repositories</span>`);
          repos.forEach((r) => print(`<span class="ok">▸</span> ${link(r.html_url, r.name)} <span class="dim">${r.language ? "[" + esc(r.language) + "] " : ""}${esc(r.description || "")}</span>`));
        }
      } catch {
        wait.remove();
      }
      print(`<span class="dim">More on</span> ${link("https://github.com/" + USER)}`);
    },
    async contributions() {
      const wait = print(`<span class="dim">fetching contributions…</span>`);
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`);
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        wait.remove();
        const days = data.contributions;
        const total = (data.total && (data.total.lastYear ?? Object.values(data.total)[0])) ?? days.reduce((a, d) => a + d.count, 0);
        const heat = document.createElement("div");
        heat.className = "heat";
        heat.setAttribute("role", "img");
        heat.setAttribute("aria-label", `${total} contributions in the last year`);
        const pad = new Date(days[0].date + "T00:00:00Z").getUTCDay();
        for (let i = 0; i < pad; i++) { const e = document.createElement("i"); e.style.visibility = "hidden"; heat.appendChild(e); }
        days.forEach((d, i) => {
          const e = document.createElement("i");
          e.className = "l" + d.level;
          e.title = `${d.count} on ${d.date}`;
          e.style.animationDelay = reduced ? "0s" : `${Math.floor((i + pad) / 7) * 0.04}s, ${2.5 + Math.floor((i + pad) / 7) * 0.06}s`;
          heat.appendChild(e);
        });
        $out.appendChild(heat);
        print(`<span class="b">${Number(total).toLocaleString()} contributions in the last year</span>`);
      } catch {
        wait.remove();
        print(`<span class="err">could not load contributions right now.</span> See ${link("https://github.com/" + USER)}`);
      }
    },
    links() {
      print(`<div class="grid2">
<span class="dim">portfolio</span><span>${link("https://abdelhamid.noira.net")}</span>
<span class="dim">linkedin</span><span>${link("https://linkedin.com/in/abdelhamidn")}</span>
<span class="dim">github</span><span>${link("https://github.com/" + USER)}</span>
<span class="dim">email</span><span>${link("mailto:abdelhamid@noira.net", "abdelhamid@noira.net")}</span></div>`);
    },
    contact() {
      print(`Let's build something impactful. Reach me at ${link("mailto:abdelhamid@noira.net", "abdelhamid@noira.net")}`);
      print(`<span class="dim">or</span> ${cmd("links")}`);
    },
    banner() {
      print(esc(bannerText()), "banner");
      print(`<span class="dim">Cloud &amp; DevOps Project Manager | R&amp;D AI-Oriented Software Engineer</span>`);
    },
    history() { hist.forEach((h, i) => print(`<span class="dim">${String(i + 1).padStart(3)}</span>  ${esc(h)}`)); },
    clear() { $out.textContent = ""; },
    matrix() { toggleMatrix(); },
    sudo() { print(`<span class="err">abdelhamidn is not in the sudoers file. This incident will be reported.</span>`); },
    date() { print(new Date().toString()); },
    ls() { print(["about", "experience", "skills", "projects", "contributions", "links"].join("  ")); },
  };
  COMMANDS.hello = COMMANDS.hi = COMMANDS.about;

  // ---- matrix -------------------------------------------------------------
  const canvas = document.getElementById("matrix");
  let mx = null;
  function toggleMatrix() {
    if (mx) {
      cancelAnimationFrame(mx.raf);
      document.body.classList.remove("matrix");
      mx = null;
      print(`<span class="dim">matrix off.</span>`);
      return;
    }
    document.body.classList.add("matrix");
    const ctx = canvas.getContext("2d");
    const size = 16;
    const fit = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    fit();
    addEventListener("resize", fit);
    const drops = Array.from({ length: Math.ceil(innerWidth / size) }, () => Math.random() * -50);
    const chars = "アイウエオカキクケコサシスセソ0123456789ABCDEFNHLMD";
    const frame = () => {
      ctx.fillStyle = "rgba(34,39,46,.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#39d353";
      ctx.font = size + "px monospace";
      drops.forEach((y, i) => {
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * size, y * size);
        drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
      mx.raf = requestAnimationFrame(frame);
    };
    mx = { raf: 0 };
    frame();
    print(`<span class="ok">matrix on.</span> <span class="dim">type</span> ${cmd("matrix")} <span class="dim">again to stop.</span>`);
  }

  // ---- input handling -----------------------------------------------------
  const hist = [];
  let hIdx = 0;

  async function run(raw) {
    const text = raw.trim();
    print(`<span class="u b">abdelhamidn@github</span> <span class="p b">~</span> <span class="d b">$</span> ${esc(raw)}`);
    if (!text) return;
    hist.push(text);
    hIdx = hist.length;
    const [name, ...args] = text.split(/\s+/);
    if (name === "echo") return print(esc(args.join(" ")));
    const fn = COMMANDS[name.toLowerCase()];
    if (!fn) {
      print(`<span class="err">command not found: ${esc(name)}</span> <span class="dim">— type</span> ${cmd("help")}`);
    } else {
      await fn(args);
    }
    print("");
  }

  $line.addEventListener("submit", async (e) => {
    e.preventDefault();
    const v = $in.value;
    $in.value = "";
    await run(v);
    scroll();
  });

  $in.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hIdx > 0) $in.value = hist[--hIdx];
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      hIdx = Math.min(hIdx + 1, hist.length);
      $in.value = hist[hIdx] || "";
    } else if (e.key === "Tab") {
      e.preventDefault();
      const v = $in.value.trim().toLowerCase();
      if (!v) return;
      const m = Object.keys(COMMANDS).filter((c) => c.startsWith(v));
      if (m.length === 1) $in.value = m[0];
      else if (m.length > 1) print(`<span class="dim">${m.join("  ")}</span>`);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      COMMANDS.clear();
    }
  });

  document.addEventListener("click", (e) => {
    const c = e.target.closest(".cmd");
    if (c) { run(c.dataset.cmd).then(scroll); return; }
    if (!getSelection().toString()) $in.focus();
  });

  // ---- boot ---------------------------------------------------------------
  async function boot() {
    print(esc(bannerText()), "banner");
    print(`<span class="info">Cloud &amp; DevOps Project Manager | R&amp;D AI-Oriented Software Engineer</span>`);
    print(`<span class="dim">Welcome. Type</span> ${cmd("help")} <span class="dim">to see what I can do, or try</span> ${cmd("about")}<span class="dim">.</span>`);
    print("");
    if (!reduced) {
      await sleep(250);
      await run("contributions");
      scroll();
    }
    window.scrollTo(0, 0);
    $in.focus({ preventScroll: true });
  }
  boot();
})();

import { useEffect, useRef, useState } from "react";

const contact = {
  email: "anushauzma@gmail.com",
  github: "https://github.com/uzman2406",
  linkedin: "https://linkedin.com/in/uzma-nayab/",
};

const nav = [
  { id: "about", label: "About" },
  { id: "log", label: "Internship" },
  { id: "work", label: "Projects" },
  { id: "stack", label: "Stack" },
  { id: "signals", label: "Background" },
  { id: "contact", label: "Contact" },
];
// About diagram: what I know, what I work with, what I've built.

const orbit = [
  { items: ["Python", "SQL", "C++", "DSA"], r: 19, kind: "know", start: -90 },
  { items: ["Django REST", "OpenCV", "Pandas", "PostgreSQL", "Docker"], r: 36, kind: "use", start: -60 },
];


// Resume paper content, copied from your PDF. Edit here if your PDF changes.

// The hero visual: one scanned page travelling through the things I work with.
const pipeline = [
  { name: "Scan", note: "5k+ test images" },
  { name: "OpenCV", note: "tilt, quadrants" },
  { name: "Django REST", note: "APIs around it" },
  { name: "PostgreSQL", note: "Storage" },
  { name: "Insight", note: "why a page failed" },
];

const internship = {
  role: "Python Developer Intern",
  place: "Learn Basics, Salem, Tamil Nadu",
  branch: "Lighting Bees Pvt. Ltd.",
  when: "August 2026 to October 2026",
  tech: ["Django REST", "PostgreSQL", "OpenCV", "Vertex AI (Gemini)", "MinIO", "Hetzner Object Storage", "Docker", "Git"],
   work: [
    {
      title: "Engineered fault-tolerant OMR marker detection",
      summary: "Template matching at 16 scales finds the four corner markers on a scanned sheet, and a missing corner is rebuilt from the other 2 or 3. Tested on 5k+ images.",
      uses: [
        ["OpenCV", "Template matching at 16 scales in the four corners, with circle detection as a fallback."],
        ["NumPy", "Rebuilds a missing corner from 2 or 3 markers using the page's aspect ratio."],
        ["Python", "Error codes MRK001 to MRK008 say whether a sheet needs a retry or a manual review."],
      ],
    },
    {
      title: "Built confidence-gated page orientation correction",
summary: "Gemini on Vertex AI picks each answer-sheet page's rotation and retries under 0.8 confidence, with an OpenCV handwriting check beside it.",

      uses: [
        ["Vertex AI", "Returns a rotation and confidence per page. Under 0.8, it retries up to 3 times with another model."],
        ["OpenCV", "A second, non-AI check reads blue handwriting to tell upright from upside down."],
        ["MinIO + Hetzner", "Downloads each page from the storage it lives on and uploads the fixed image back."],
        ["Django REST", "Detect, correct and manual-rotate endpoints."],
      ],
    },
   
    {
      title: "Designed a linked-list missing-page finder with path estimation",
summary: "Compares scanned pages with the expected count, orders them in a doubly linked list, estimates each missing file's path and exports an Excel report.",

      uses: [
        ["PostgreSQL", "Reads the scanned pages and expected page count for each document."],
        ["Python", "A linked list and a set difference find the gaps and each page's neighbours."],
        ["Pandas", "Exports the report to Excel."],
      ],
    },
    {
     title: "Load-balanced Gemini across 4 Vertex AI projects",
summary: "A thread-safe round-robin picker spreads calls over 8 project and model pairs, so parallel jobs don't pile onto one.",

      uses: [
        ["Vertex AI", "Four projects, each with its own service-account credentials."],
        ["itertools.cycle", "Round-robin over 8 project and model pairs."],
        ["threading.Lock", "Keeps the rotation safe when many threads ask at once."],
      ],
    },
   
  ],

};

const projects = [
  {
    name: "PowerGit",
     images: [
    "src/assets/powergit1.png",
    "src/assets/powergit2.png",
    "src/assets/powergit3.png",
   
  ],
    date: "May 2026",
    problem:
      "Understanding how an open-source repo really behaves means digging through thousands of commits, PRs and issues by hand.",
    built: [
      "ETL pipeline that pulls data from 4 GitHub repos through the REST API into PostgreSQL.",
      "15+ interactive KPIs in Power BI: commit trends, average merge time, top contributors and bus factor.",
      "Switch repos by changing 2 environment variables, which cut analyst setup time by 90%.",
    ],
   
    metrics: [
      { value: "40K+", label: "commits", bar: 100 },
      { value: "12K+", label: "issues", bar: 30 },
      { value: "8K+", label: "PRs", bar: 20 },
  
    ],
    link: "https://github.com/uzman2406/PowerGit",
  },
   {
    name: "InternSarthi",
     images: [
      "src/assets/intern4.png",
    "src/assets/intern1.png",
    "src/assets/intern2.png",
    "src/assets/intern3.png",
    
  ],
    date: "December 2025",
    role: "Team project. I built the recommendation system in the backend.",
    problem:
      "Finding a relevant internship takes too long when you scroll through everything.",
    built: [
      "Designed and built the recommendation engine in the Django REST backend: each internship's text becomes a TF-IDF vector, and listings are ranked by cosine similarity using Scikit-learn.",
      "Worked with the team on the React frontend and the Django REST API that serves the recommendations.",
    ],
   
    metrics: [{ value: "82%", label: "recommendation precision" }],
    notes: [
      "The ranking logic lives in the backend, so the React app only asks the API for matches.",
      "Content-based matching is easy to explain: the closer the text, the higher the rank.",
      "Built as a team project, with my part in the backend.",
    ],
    link: "https://github.com/uzman2406/Internsarthi",
  },
  {
    name: "SysPulse",
     images: [
    "src/assets/sys1.png",
    "src/assets/sys2.png",
    "src/assets/sys3.png",
  ],
    date: "October 2025",
    problem: "Lab machines slow down and nobody can see why.",
    built: [
      "Desktop app that tracks CPU, memory, disk and network usage with a 1-second refresh.",
      "Live Matplotlib charts in a dark-themed GUI.",
      "Packaged as a standalone .exe with PyInstaller, so it runs without a Python install.",
    ],
    
    metrics: [{ value: "2 s", label: "refresh rate" }],
        notes: [
      "Live charts for CPU, memory, disk and network usage.",
      "Makes it visible which resource is behind a slowdown.",
      "Packaged as one .exe, so it can be shared without a Python setup.",
    ],
    link: "https://github.com/uzman2406/SysPulse_-System-health-monitor-",
  },
];
// What I built, oldest first (dates come from the projects array above).

// Skills grouped by where I have actually used them.
const stack = [
  {
    area: "Backend",
    used: "Internship APIs, InternSarthi",
    items: "Django, Django REST Framework, Flask, REST APIs, Postman",
  },
  {
    area: "Computer vision",
    used: "OMR detection, page orientation; YOLO talk",
    items: "OpenCV, Gemini / Vertex AI",
  },
  {
    area: "Data and ML",
    used: "PowerGit, InternSarthi",
    items: "Pandas, NumPy, Matplotlib, Scikit-learn, LangChain (basic)",
  },
  {
    area: "Databases",
    used: "PowerGit, backup automation",
    items: "PostgreSQL, MySQL, SQLite",
  },
  {
    area: "Infrastructure",
    used: "Shipping and deploying",
    items: "AWS EC2, Docker, NGINX, Gunicorn, Git, GitHub Actions",
  },
  {
    area: "Languages",
    used: "Day to day",
    items: "Python (advanced), SQL (advanced), C++ (intermediate)",
  },
];

const signals = [
  {
    title: "GATE 2026 qualified",
    text: "All India Rank 7007, in India's national engineering entrance exam.",
  },
  {
    title: "Speaker, FOSS United Kanpur",
    text: "Gave my first technical talk, on YOLO object detection, at the 3rd City Meetup at CSJMU.",
  },
  {
    title: "GSSoC contributor",
    text: "Merged PRs #62 and #89 in SnapPass-AI, an open-source AI passport photo generator.",
  },
  {
    title: "Evaluator, HackToLearn Hackathon '25",
    text: "Screened first-round submissions and shortlisted teams.",
  },
  {
    title: "5-star problem solving on HackerRank",
    text: "In both the Python and SQL tracks.",
  },
];

const education = [
  {
    what: "B.Tech CSE (honours)",
    where: "Kanpur Institute of Technology, AKTU",
    when: "2023 to 2027",
    score: "8.71 / 10",
  },
  {
    what: "Class XII",
    where: "Shri Ram Public School, CBSE",
    when: "2023",
    score: "88.8%",
  },
  {
    what: "Class X",
    where: "Shri Ram Public School, CBSE",
    when: "2021",
    score: "94.6%",
  },
];

const certifications = [
  "Power BI (Simplilearn, May 2026)",
  "SQL Intermediate (HackerRank, May 2026)",
  "Data Analytics Essentials (Cisco Networking Academy, May 2026)",
  "DSA with C++ (RCPL India, KIT Kanpur, Feb 2026)",
  "Python Essentials (Cisco Networking Academy, Aug 2025)",
];

/* ------------------------------------------------------------------
   PAGE
------------------------------------------------------------------- */

// Hero diagram: node positions in the SVG (x, y). Edges join neighbours.
const nodePos = [
  [70, 40],
  [310, 125],
  [140, 210],
  [320, 295],
  [110, 380],
];
const edge = ([x1, y1], [x2, y2]) =>
  `M${x1} ${y1} C${x1} ${(y1 + y2) / 2} ${x2} ${(y1 + y2) / 2} ${x2} ${y2}`;

const facts = [
  { value: "5000+", label: "images tested on the OMR APIs" },
  { value: "40K+", label: "commits ingested in PowerGit" },
  { value: "82%", label: "precision in InternSarthi" },
  { value: "AIR 7007", label: "GATE 2026" },
];

// Each project's flow, drawn as a small animated diagram.
const flows = {
  PowerGit: ["GitHub REST API", "Pandas ETL", "PostgreSQL", "Power BI"],
  InternSarthi: ["Python", "React", "Django REST", "TF-IDF + cosine", "Scikit-Learn"],
  SysPulse: ["psutil", "Matplotlib", "CustomTkinter", "PyInstaller .exe"],
};

// Contact diagram: me on the left, three ways to reach me on the right.

const reach = [
  {
    label: "Email",
    note: contact.email,
    href: `mailto:${contact.email}`,
    pos: [260, 50],
  },
  { label: "GitHub", note: "uzman2406", href: contact.github, pos: [260, 140] },
  {
    label: "LinkedIn",
    note: "uzma-nayab",
    href: contact.linkedin,
    pos: [260, 230],
  },{
    label: "Discord",
    note: "Uzma_n2406",
    href: "https://discord.com/users/1010015931868647504",
    pos: [260, 320],
  }
];


export default function App() {
  const [active, setActive] = useState("top");
const trackRef = useRef(null);
const [slide, setSlide] = useState(0);
const [galleryProject, setGalleryProject] = useState(null);
const [galleryIndex, setGalleryIndex] = useState(0);

const openGallery = (project) => {
  setGalleryProject(project);
  setGalleryIndex(0);
};

const closeGallery = () => {
  setGalleryProject(null);
  setGalleryIndex(0);
};

const nextImage = () => {
  setGalleryIndex((current) =>
    (current + 1) % galleryProject.images.length
  );
};

const previousImage = () => {
  setGalleryIndex((current) =>
    (current - 1 + galleryProject.images.length) %
    galleryProject.images.length
  );
};

const goTo = (i) => {
  const el = trackRef.current;
  if (!el) return;
  const n = Math.max(0, Math.min(projects.length - 1, i));
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollTo({ left: n * el.clientWidth, behavior: calm ? "auto" : "smooth" });
};
  const [showResume, setShowResume] = useState(false);
  const [openWork, setOpenWork] = useState(null);
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
    } catch {
      /* empty */
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });
  
useEffect(() => {
  if (!openWork && !galleryProject) return;

  const onKey = (e) => {
    if (e.key === "Escape") {
      setOpenWork(null);
      closeGallery();
    }

    if (galleryProject && e.key === "ArrowRight") {
      e.preventDefault();
      setGalleryIndex((current) =>
        (current + 1) % galleryProject.images.length
      );
    }

    if (galleryProject && e.key === "ArrowLeft") {
      e.preventDefault();
      setGalleryIndex((current) =>
        (current - 1 + galleryProject.images.length) %
        galleryProject.images.length
      );
    }
  };

  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [openWork, galleryProject]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* empty */
    }
  }, [theme]);
useEffect(() => {
  const track = trackRef.current;

  const card = track && track.children[slide];
  if (!card) return;
  const ro = new ResizeObserver(() => {
    track.style.height = `${card.offsetHeight}px`;
  });
  ro.observe(card);
  return () => ro.disconnect();
}, [slide]);

  useEffect(() => {
    document.documentElement.classList.add("js");

    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            reveal.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));

    const spy = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) spy.observe(el);
    });
    return () => {
      reveal.disconnect();
      spy.disconnect();
    };
  }, []);

  const next = theme === "dark" ? "light" : "dark";

  return (
    <div className="shell">
      <a className="skip" href="#log">
        Skip to content
      </a>

      <header className="rail">
        <a className="mark" href="#top">
          Uzma Nayab
        </a>
        <nav aria-label="Sections">
          <ul>
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "true" : undefined}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="theme"
          onClick={() => setTheme(next)}
          aria-label={`Switch to ${next} theme`}
        >
          <span className="swatch" aria-hidden="true" />
          {next === "light" ? "Light" : "Dark"}
        </button>
      </header>

      <main>
        {/* HERO */}
        <section id="top" className="hero">
          <div className="hero-text">
            <p className="status"><i aria-hidden="true" />Open to backend Opportunities</p>
            <h1>
             I build Python systems for data that doesn't arrive neatly.
            </h1>
            <p className="lede">
            

From detecting missing markers on scanned answer sheets to turning 40K+ GitHub commits into analytics, I work on the problems between raw data and reliable results. I'm a B.Tech CSE student at KIT Kanpur , building APIs, computer vision workflows, and data-driven applications.
            </p>
            <p className="actions">
              <a className="btn primary" href="#work">
                See projects
              </a>
              <a className="btn" href={`mailto:${contact.email}`}>
                Email me
              </a>
              <button
                className="btn primary"
                onClick={() => setShowResume(true)}
              >
                Resume
              </button>
            </p>
          </div>

          {/* The one big visual: a scanned page travelling through the stack */}
          <svg
            className="map"
            viewBox="0 0 460 420"
            role="img"
            aria-label="Diagram: a scanned page flows through OpenCV, Django REST and PostgreSQL to an insight about why it failed"
          >
            {nodePos.slice(1).map((p, i) => (
              <g key={i}>
                <path className="edge" d={edge(nodePos[i], p)} />
                <path className="edge-flow" d={edge(nodePos[i], p)} />
              </g>
            ))}
            {pipeline.map((p, i) => (
              <g
                key={p.name}
                transform={`translate(${nodePos[i][0]} ${nodePos[i][1]})`}
              >
                <circle
                  className="ring"
                  r="8"
                  style={{ animationDelay: `${i * 0.8}s` }}
                />
                <circle className="dot" r="8" />
                <text className="n-name" x="22" y="-2">
                  {p.name}
                </text>
                <text className="n-note" x="22" y="16">
                  {p.note}
                </text>
              </g>
            ))}
          </svg>

          <dl className="facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dd>{f.value}</dd>
                <dt>{f.label}</dt>
              </div>
            ))}
          </dl>
        </section>
{/* ABOUT */}
<section id="about" className="about">
  <div className="about-content">
    <h2 className="reveal">About</h2>
    <p className="about-lead reveal">
    I care about what happens when the happy path breaks.





    </p>
    <p className="reveal">
      During my internship, I worked on real-world backend and computer vision problems, from detecting missing markers on scanned answer sheets to building APIs for page orientation and missing-page detection. I've tested image-processing workflows on 5,000+ images.

      Outside my internship, I built <b>PowerGit</b>, a GitHub analytics pipeline using PostgreSQL and Power BI, and developed the backend recommendation engine for <b>InternSarthi</b> using TF-IDF and cosine similarity.
    </p>
    <p className="reveal">
      Beyond code, I qualified GATE 2026 (AIR 7007), spoke about YOLO at FOSS United Kanpur, and contributed to open source through GSSoC.

And when I'm not debugging something, you'll probably find me playing esports or getting lost in a good work of fiction.
    </p>
  </div>

  <aside className="about-visual reveal" aria-label="What I know, what I work with and what I have built">
   

    <div className="orbit" role="img"
         aria-label="Inner ring: Python, SQL, C++, DSA. Outer ring: Django REST, OpenCV, Pandas, PostgreSQL, Docker.">
      <span className="orb-ring inner" />
      <span className="orb-ring outer" />
      <span className="orb-hub">Uzma</span>
      {orbit.map((ring) =>
        ring.items.map((name, i) => {
          const a = ((ring.start + (360 / ring.items.length) * i) * Math.PI) / 180;
          return (
            <span key={name} className={`orb-node ${ring.kind}`}
                  style={{ left: `${50 + ring.r * Math.cos(a)}%`, top: `${50 + ring.r * Math.sin(a)}%` }}>
              {name}
            </span>
          );
        })
      )}
    </div>

    
  </aside>
</section>
       {/* INTERNSHIP */}
<section id="log" className="block">
  <div className="side">
    <h2 className="reveal">{internship.role}</h2>
    <p className="meta reveal">
      {internship.place}<br />{internship.branch}<br />{internship.when}
    </p>
    <p className="tags reveal">
      {internship.tech.map((t) => <span key={t}>{t}</span>)}
    </p>
  </div>
    <div className="body">
   <ul className="grid2 work">
  {internship.work.map((w) => (
    <li key={w.title} className="tile reveal">
      <h3>{w.title}</h3>
      <p>{w.summary}</p>
      <p className="tags">{w.uses.map(([tech]) => <span key={tech}>{tech}</span>)}</p>
      <button className="more" aria-haspopup="dialog" onClick={() => setOpenWork(w)}>
        How I used them
      </button>
    </li>
  ))}
</ul>
   
  </div>
</section>

       {/* PROJECTS */}
<section id="work" className="block">
  <div className="side">
    <h2 className="reveal">Things I built on my own time</h2>
    <p className="reveal">
      Each one starts with the problem, shows how the pieces connect,
      then the numbers.
    </p>
  </div>

  <div className="body">
    <div className="track reveal" ref={trackRef} tabIndex={0}
         role="group" aria-roledescription="carousel" aria-label="Projects"
         onKeyDown={(e) => {
           const el = e.currentTarget;
           const cur = Math.round(el.scrollLeft / el.clientWidth);
           if (e.key === "ArrowRight") { e.preventDefault(); goTo(cur + 1); }
           if (e.key === "ArrowLeft") { e.preventDefault(); goTo(cur - 1); }
         }}
          onScroll={(e) => setSlide(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
      {projects.map((p, i) => (
        <article key={p.name} className="case slide"
                 aria-label={`Project ${i + 1} of ${projects.length}`}>
                  <div className="card-nav">
            <span className="meta">Project {i + 1} of {projects.length}</span>
            <div className="arrows">
              <button className="arrow" aria-label="Previous project"
                      disabled={i === 0} onClick={() => goTo(i - 1)}>←</button>
              <button className="arrow" aria-label="Next project"
                      disabled={i === projects.length - 1} onClick={() => goTo(i + 1)}>→</button>
            </div>
          </div>
          <div className="case-head">
            <h3>{p.name}</h3>
            <span className="meta">{p.date}</span>
          </div>
          {p.role && <p className="myrole">{p.role}</p>}

          <div className="pse">
            <div>
              <h4>Problem</h4>
              <p>{p.problem}</p>
               {p.images?.length > 0 && (
  <button
    type="button"
    className="project-preview"
    onClick={() => openGallery(p)}
    aria-label={`View screenshots of ${p.name}`}
  >
    <img
      src={p.images[0]}
      alt={`${p.name} project preview`}
      loading="lazy"
    />

    <span className="preview-label">
      <span>View screenshots</span>
      <span aria-hidden="true">↗</span>
    </span>
  </button>
)}
            </div>
            <div>
              <h4>Solution</h4>
              <ul>{p.built.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
            <div>
              <h4>Impact</h4>
              <dl className="metrics">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <dd>{m.value}</dd>
                    <dt>{m.label}</dt>
                    {m.bar && <span className="bar" aria-hidden="true"><i style={{ "--w": `${m.bar}%` }} /></span>}
                  </div>
                ))}
              </dl>
              {p.notes && (
                <ul className="notes">
                  {p.notes.map((n) => <li key={n}>{n}</li>)}
                </ul>
              )}
             
            </div>
          </div>

          <ol className="flow" style={{ "--n": flows[p.name].length }} aria-label={`${p.name} data flow`}>
            {flows[p.name].map((step) => <li key={step}>{step}</li>)}
          </ol>

       
          <p className="actions">
            <a className="btn primary" href={p.link || contact.github} target="_blank" rel="noreferrer">
              {p.link ? "View code" : "GitHub profile"}
            </a>
            {p.demo && <a className="btn" href={p.demo} target="_blank" rel="noreferrer">Live demo</a>}
          </p>

         
        </article>
      ))}
    </div>
  </div>
  
</section>

        {/* STACK */}
        <section id="stack" className="block">
          <div className="side">
            <h2 className="reveal">Tools, and where I used them</h2>
          </div>
          <dl className="body grid2">
            {stack.map((s) => (
              <div key={s.area} className="tile reveal">
                <dt>{s.area}</dt>
                <dd>
                  {s.items}
                  <small>{s.used}</small>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* BACKGROUND */}
        <section id="signals" className="block">
          <div className="side">
            <h2 className="reveal">Background</h2>
          </div>
          <div className="body">
            <ul className="grid2">
              {signals.map((s) => (
                <li key={s.title} className="tile signal reveal">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>

            <h3 className="sub reveal">Education</h3>
            <ul className="edu">
              {education.map((e) => (
                <li key={e.what} className="reveal">
                  <span>
                    <strong>{e.what}</strong>
                    <small>{e.where}</small>
                  </span>
                  <span className="meta">
                    {e.when}, {e.score}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="sub reveal">Certifications</h3>
            <ul className="certs reveal">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

       {/* CONTACT */}
<section id="contact" className="contact">
  <div className="contact-intro">
    <p className="status"><i aria-hidden="true" />Open to backend roles</p>
    <h2 className="reveal">Let's work together</h2>
    <p className="reveal">
      I am looking for a backend role where I can build production systems and keep
      learning. The quickest way to reach me is email.
    </p>
   
  </div>

  <ul className="contact-list reveal">
    {reach.map((r) => (
      <li key={r.label}>
        <a href={r.href} target={r.label === "Email" ? undefined : "_blank"} rel="noreferrer">
          <span className="c-label">{r.label}</span>
          <span className="c-note">{r.note}</span>
          <span className="c-go" aria-hidden="true">↗</span>
        </a>
      </li>
    ))}
  </ul>
</section>
{openWork && (
  <div className="resume-overlay" onClick={() => setOpenWork(null)}>
    <div className="resume-card work-modal" role="dialog" aria-modal="true"
         aria-label={openWork.title} onClick={(e) => e.stopPropagation()}>
      <button className="resume-close" onClick={() => setOpenWork(null)} aria-label="Close">&times;</button>
      <h3>{openWork.title}</h3>
      <p className="meta">Technologies and how I used them</p>
      <dl className="uses">
        {openWork.uses.map(([tech, how]) => (
          <div key={tech}><dt>{tech}</dt><dd>{how}</dd></div>
        ))}
      </dl>
    </div>
  </div>
)}
{galleryProject && (
  <div
    className="resume-overlay gallery-overlay"
    onClick={closeGallery}
  >
    <div
      className="resume-card gallery-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${galleryProject.name} screenshots`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="resume-close"
        onClick={closeGallery}
        aria-label="Close gallery"
      >
        &times;
      </button>

      <div className="gallery-heading">
        <div>
          <p className="meta">PROJECT SHOWCASE</p>
          <h3>{galleryProject.name}</h3>
        </div>

        <span className="gallery-counter">
          {galleryIndex + 1} / {galleryProject.images.length}
        </span>
      </div>

      <div className="gallery-stage">
        <button
          type="button"
          className="gallery-arrow"
          onClick={previousImage}
          aria-label="Previous screenshot"
        >
          ←
        </button>

        <div className="gallery-image-wrap" key={galleryIndex}>
          <img
            src={galleryProject.images[galleryIndex]}
            alt={`${galleryProject.name} screenshot ${
              galleryIndex + 1
            }`}
          />
        </div>

        <button
          type="button"
          className="gallery-arrow"
          onClick={nextImage}
          aria-label="Next screenshot"
        >
          →
        </button>
      </div>

      <div className="gallery-footer">
        <span className="meta">
          Explore the project
        </span>

        <div className="gallery-dots">
          {galleryProject.images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`gallery-dot ${
                index === galleryIndex ? "active" : ""
              }`}
              onClick={() => setGalleryIndex(index)}
              aria-label={`Show screenshot ${index + 1}`}
              aria-current={
                index === galleryIndex ? "true" : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)}
       {showResume && (
          <div className="resume-overlay" onClick={() => setShowResume(false)}>
            <div className="resume-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="resume-close"
                onClick={() => setShowResume(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h3>Resume</h3>
              <iframe
                src="https://drive.google.com/file/d/1YJKqZPORnhArl8p5NgTj9TPRZJXsebO1/preview"
                title="Resume preview"
                className="resume-iframe"
              />
              <a
                className="btn primary"
                href="https://drive.google.com/uc?export=download&id=1YJKqZPORnhArl8p5NgTj9TPRZJXsebO1"
                download
              >
                Download PDF
              </a>
            </div>
          </div>
        )}
        
      </main>
         

      <footer className="foot">
        <p>© 2026 Uzma Nayab</p>
        <p>Backend Developer | Uttar Pradesh | India</p>
        <a href="#top">Back to top</a>
      </footer>

    </div>
  );
}

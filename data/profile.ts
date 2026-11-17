// Single source of truth for all portfolio content (from Usama's 2026 resume).

export const profile = {
  name: "Usama",
  role: "Senior Software Engineer",
  location: "Rawalpindi / Islamabad, PK",
  email: "uk5458622@gmail.com",
  phone: "+92 309 3485497",
  phoneHref: "tel:+923093485497",
  // WhatsApp wants digits only: country code, no + or spaces.
  whatsapp: "https://wa.me/923093485497",
  resume: "https://docs.google.com/document/d/1EMaAutjjJNBaiQskFS4Jm3l627UcES7N/export?format=pdf",
  linkedin: "https://www.linkedin.com/in/usama-khan-703109239/",
  github: "https://github.com/",
  yearsExperience: "4+",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "AI workflow", href: "#ai" },
];

export const hero = {
  headingLines: ["Senior", "full-stack", "engineer."],
  intro:
    "I'm a Full-Stack Software Engineer focused on solving complex problems, designing scalable systems, and building reliable software. I combine engineering fundamentals, architectural thinking, and AI-augmented workflows to deliver meaningful solutions.",
  pills: [
    { text: "4+ years in production", tone: "butter", rotate: -6 },
    { text: "Runs AI as a team", tone: "lilac", rotate: 4 },
  ],
  // Transparent duo clip: VP9 alpha for Chrome/Firefox, HEVC alpha for Safari.
  // Loops end-to-start seamlessly. See components/HeroDuo.tsx.
  video: { webm: "/video/duo.webm", mov: "/video/duo.mov", poster: "/video/duo-poster.webp" },
  // Runs along the curved band at the bottom of the hero.
  marquee: [
    "Full-stack development",
    "API & database design",
    "Deployment & DevOps",
    "AI-assisted workflow",
    "Production support",
  ],
} as const;

export const about = {
  label: "A bit about me",
  text:
    "I like owning a feature from the first conversation to production: the data model, the API, the interface and the deployment. I use AI tools every day, and they make me faster. The decisions and the review stay with me.",
  // Pop in as the scrub passes these points (0–1 of the pinned scroll).
  pills: [
    { text: "Plans before coding", tone: "butter", rotate: 5, at: 0.35 },
    { text: "Reads code before changing it", tone: "lilac", rotate: -4, at: 0.7 },
    { text: "Reviews every AI change", tone: "cobalt", rotate: 3, at: 0.95 },
  ],
} as const;

// Stack list: one row per layer. `extra` is the outlined "anything else" chip.
export const stack = {
  heading: "What I work with",
  intro: "Every layer of the product, one person. New tools get picked up fast, with AI doing the heavy reading.",
  rows: [
    {
      label: "Front end",
      tools: ["React", "Next.js", "React Native", "Electron", "Astro", "JavaScript", "TypeScript"],
      extra: "Any new framework, fast",
    },
    {
      label: "Styling",
      tools: ["CSS", "Tailwind", "Bootstrap", "Radix UI", "shadcn/ui", "Material UI", "Mantine"],
      extra: "Any design system, to the pixel",
    },
    {
      label: "Backend",
      tools: ["Node.js", "Express", "GraphQL", "REST APIs", "Socket.io", "Queues", "Microservices", "Auth & RBAC"],
      extra: "Any backend stack, fast",
    },
    {
      label: "Data",
      tools: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Sequelize", "Mongoose"],
      extra: "Any new database, fast",
    },
    {
      label: "Servers",
      tools: ["Custom VPS", "DigitalOcean", "Vercel", "Netlify", "Hostinger", "Namecheap", "Docker", "Nginx", "Linux", "PM2", "GitHub Actions"],
    },
    {
      label: "AI workflow",
      tools: ["Claude Code", "Cursor", "Windsurf", "ChatGPT", "MCP servers", "Claude skills", "Custom skills", "Sub-agents", "Specs & task docs", "Context management", "AI code review"],
    },
  ],
} as const;

// "Follow one request": stops along the path a request takes, with the
// tools used at each. `icon` is a Simple Icons key (lib/techIcons.ts).
export const journey = {
  heading: "Follow one request",
  intro: "Every product I ship runs along this line. I own every stop on it.",
  stops: [
    {
      title: "Browser",
      text: "Where people meet the product. Fast pages, forms that never lose work, the same app on web, desktop and phone.",
      tools: [
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextdotjs" },
        { name: "React Native", icon: "react" },
        { name: "Electron", icon: "electron" },
        { name: "Astro", icon: "astro" },
        { name: "JavaScript", icon: "javascript" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Any new framework, picked up fast with AI", special: true },
      ],
    },
    {
      title: "Styling",
      text: "Matched to the design and consistent on every screen, whatever UI kit the project uses.",
      tools: [
        { name: "CSS", icon: "css" },
        { name: "Tailwind", icon: "tailwindcss" },
        { name: "Bootstrap", icon: "bootstrap" },
        { name: "Radix UI", icon: "radixui" },
        { name: "shadcn/ui", icon: "shadcnui" },
        { name: "Material UI", icon: "mui" },
        { name: "Mantine", icon: "mantine" },
        { name: "Any design system, matched to the pixel", special: true },
      ],
    },
    {
      title: "API",
      text: "Every request checked and every business rule in one place: auth, roles, validation, background jobs.",
      tools: [
        { name: "Node.js", icon: "nodedotjs" },
        { name: "Express", icon: "express" },
        { name: "GraphQL", icon: "graphql" },
        { name: "REST APIs" },
        { name: "Socket.io", icon: "socketdotio" },
        { name: "Queues & background jobs" },
        { name: "Microservices" },
        { name: "Auth & RBAC" },
        { name: "Any backend stack, picked up fast with AI", special: true },
      ],
    },
    {
      title: "Data",
      text: "I design the schema before the first screen, so features fit later instead of fighting it.",
      tools: [
        { name: "PostgreSQL", icon: "postgresql" },
        { name: "MySQL", icon: "mysql" },
        { name: "MongoDB", icon: "mongodb" },
        { name: "Redis", icon: "redis" },
        { name: "Prisma", icon: "prisma" },
        { name: "Sequelize", icon: "sequelize" },
        { name: "Mongoose", icon: "mongoose" },
        { name: "Any new database, picked up fast with AI", special: true },
      ],
    },
    {
      title: "Servers",
      text: "From one-click deploys to VPS boxes I run myself. Every merge is tested, built and shipped the same way.",
      tools: [
        { name: "Custom VPS management" },
        { name: "DigitalOcean", icon: "digitalocean" },
        { name: "Vercel", icon: "vercel" },
        { name: "Netlify", icon: "netlify" },
        { name: "Hostinger", icon: "hostinger" },
        { name: "Namecheap", icon: "namecheap" },
        { name: "Docker", icon: "docker" },
        { name: "Nginx", icon: "nginx" },
        { name: "Linux", icon: "linux" },
        { name: "PM2", icon: "pm2" },
        { name: "GitHub Actions", icon: "githubactions" },
        { name: "Microservices" },
      ],
    },
    {
      title: "Built with AI",
      text: "Agents write a lot of the code on this path. I give them specs, skills and docs, keep their context and review every diff.",
      tools: [
        { name: "Claude Code", icon: "claude" },
        { name: "Cursor", icon: "cursor" },
        { name: "Windsurf", icon: "windsurf" },
        { name: "ChatGPT" },
        { name: "MCP servers", icon: "modelcontextprotocol" },
        { name: "Claude skills", icon: "claude" },
        { name: "Custom skills" },
        { name: "Sub-agents" },
        { name: "Specs & task docs", icon: "markdown" },
        { name: "Context management" },
        { name: "AI code review" },
      ],
    },
  ],
} as const;

// AI-powered development: six habits, each with a short example file shown
// in a code card. Examples are representative, not copied from client repos.
export const aiFlow = {
  label: "AI in my workflow",
  heading: "How I use AI at work",
  intro: "AI speeds up the routine parts of my work. These six habits keep the result correct and maintainable.",
  steps: [
    {
      title: "Project context & instructions",
      body: "Before an agent writes a line, it reads the same rules a new teammate would. Every repo I work in gets a CLAUDE.md: the stack, folder layout, naming, the commands that must pass, and the parts it must never touch. It stops the agent from inventing its own conventions halfway through a project.",
      file: "CLAUDE.md",
      code: [
        "# Project rules",
        "## Stack",
        "Next.js (app router), Express API, PostgreSQL via Prisma",
        "## Conventions",
        "- One service per domain in /src/services",
        "- Money is stored in cents, as integers",
        "- Never edit /prisma/migrations by hand",
        "## Before you say done",
        "npm run lint && npm test",
      ],
    },
    {
      title: "Architecture & database context",
      body: "Agents guess when they can't see the system, and the guesses look convincing. So I keep the schema, relationships, API contracts and data flows written down where the agent can read them. It joins the tables that exist instead of a column it made up.",
      file: "docs/schema.md",
      code: [
        "## orders",
        "id           uuid   PK",
        "customer_id  uuid   FK -> customers.id",
        "status       enum   pending | paid | refunded",
        "total_cents  int",
        "## Flow: refund",
        "API -> RefundService -> Stripe -> webhook",
        "    -> orders.status = refunded",
      ],
    },
    {
      title: "Agentic development workflows",
      body: "Big tasks get planned and sliced before any code is written, each slice with clear boundaries and a definition of done. Agents take one slice at a time, sub-agents handle searching and tests in parallel, and I check every slice before the next one starts.",
      file: "plans/refund-flow.md",
      code: [
        "## Task: partial refunds",
        "[x] 1. Read RefundService + webhook handler",
        "[x] 2. Migration: refunds table",
        "[~] 3. POST /orders/:id/refund   <- agent",
        "[ ] 4. Webhook marks order refunded",
        "[ ] 5. Tests: partial + duplicate refunds",
        "Out of scope: admin UI, email templates",
      ],
    },
    {
      title: "Custom AI skills",
      body: "If I've explained something to an agent twice, it becomes a skill. How we add an endpoint, how we review code, how we analyse a database, how we write docs: each one is a written playbook the agent loads on its own, so the output stays consistent across weeks and projects.",
      file: "skills/new-endpoint/SKILL.md",
      code: [
        "---",
        "name: new-endpoint",
        "description: Add a REST endpoint the way this repo does",
        "---",
        "1. Route in /routes, thin controller",
        "2. Validate input with zod at the edge",
        "3. Business logic lives in a service",
        "4. Integration test before calling it done",
      ],
    },
    {
      title: "MCP & tool integration",
      body: "Agents are far more useful when they can look things up instead of guessing. Through MCP servers they can query a read-only copy of the database, read project docs and drive a browser to check the UI. Each connection has limits on what it's allowed to change.",
      file: ".mcp.json",
      code: [
        "{",
        '  "mcpServers": {',
        '    "postgres": { "args": ["--read-only"] },',
        '    "docs":     { "args": ["./docs"] },',
        '    "browser":  { "args": ["--headless"] }',
        "  }",
        "}",
      ],
    },
    {
      title: "AI code validation & quality control",
      body: "AI writes fast, but I own what ships. Every diff gets read, run and tested against what already worked. I look for the quiet problems: a query that got slower, an assumption nobody checked, a side effect in a file the task never mentioned.",
      file: "review: partial refunds",
      code: [
        "✓ tests pass, old and new",
        "✓ checkout flow unchanged",
        "✓ migration is reversible",
        "✗ webhook not idempotent -> fixed, retested",
        "✗ N+1 query in refund list -> fixed",
        "✓ merged after manual run-through",
      ],
    },
  ],
} as const;

// Tech stack grid: logo tiles built from `toolbox.tools` (those with an icon).
// Skills without a logo are listed in one line under the grid.
export const techStack = {
  heading: "My tech stack",
  alsoLabel: "Also in the toolkit",
  // Shown once under the grid; same promise as the "all" chip in the pile.
  promise: "New tech on the project? Picked up fast with AI.",
} as const;

// Tools section: a physics pile of pills with category filters. `icon` is a
// Simple Icons key (lib/techIcons.ts); `big` marks the daily drivers; `cats`
// are filter ids from `filters`. Under "All", per-layer special chips are
// skipped and the one tagged "all" shows instead.
export const toolbox = {
  heading: "My tech stack",
  hint: "Filter by layer, or grab one and throw it.",
  filters: [
    { id: "all", label: "All" },
    { id: "front", label: "Front end" },
    { id: "style", label: "Styling" },
    { id: "back", label: "Backend" },
    { id: "data", label: "Databases" },
    { id: "devops", label: "DevOps" },
    { id: "ai", label: "AI workflow" },
  ],
  tools: [
    // Only shown under "All", standing in for the four per-layer chips below.
    { name: "Any new tech, picked up fast with AI", special: true, cats: ["all"], note: "New framework, database or platform? I'm productive in days, not weeks." },
    // Front end
    { name: "Next.js", icon: "nextdotjs", big: true, cats: ["front"], note: "My default for web products: SSR, routing and APIs in one repo." },
    { name: "React", icon: "react", big: true, cats: ["front"], note: "Dashboards, CMSs and SaaS front ends, shipped since 2022." },
    { name: "React Native", icon: "react", cats: ["front"], note: "Mobile apps sharing logic with the web." },
    { name: "Electron", icon: "electron", cats: ["front"], note: "Desktop apps from the same web stack." },
    { name: "Astro", icon: "astro", cats: ["front"], note: "Content sites that ship almost no JavaScript." },
    { name: "JavaScript", icon: "javascript", cats: ["front", "back"], note: "The language under everything I ship." },
    { name: "TypeScript", icon: "typescript", cats: ["front", "back"], note: "Types on both ends so the API and UI never drift apart." },
    { name: "Any new framework, fast with AI", special: true, cats: ["front"], note: "New framework on the project? I'm productive in days, not weeks." },
    // Styling
    { name: "CSS", icon: "css", cats: ["style"], note: "Layouts and motion without reaching for a library first." },
    { name: "Tailwind", icon: "tailwindcss", cats: ["style"], note: "Fast, consistent UI without a pile of CSS files." },
    { name: "Bootstrap", icon: "bootstrap", cats: ["style"], note: "Still running plenty of client dashboards." },
    { name: "Radix UI", icon: "radixui", cats: ["style"], note: "Accessible primitives for custom components." },
    { name: "shadcn/ui", icon: "shadcnui", cats: ["style"], note: "Accessible components I own and can change." },
    { name: "Material UI", icon: "mui", cats: ["style"], note: "Admin panels that need a full kit out of the box." },
    { name: "Mantine", icon: "mantine", cats: ["style"], note: "Rich components and hooks for internal tools." },
    { name: "Any design system, to the pixel", special: true, cats: ["style"], note: "Hand me a Figma file and a kit; it'll match." },
    // Backend
    { name: "Node.js", icon: "nodedotjs", big: true, cats: ["back"], note: "Backends behind APIs serving 25K+ users." },
    { name: "Express", icon: "express", cats: ["back"], note: "Lean REST APIs with auth, validation and RBAC." },
    { name: "GraphQL", icon: "graphql", cats: ["back"], note: "When clients need exactly the fields they ask for." },
    { name: "REST APIs", cats: ["back"], note: "Partner-facing APIs designed to be integrated, not just called." },
    { name: "Socket.io", icon: "socketdotio", cats: ["back"], note: "Real-time chat and live updates." },
    { name: "Queues & jobs", cats: ["back"], note: "Background work off the request path: emails, payouts, syncs." },
    { name: "Microservices", cats: ["back", "devops"], note: "Split services where the load or the team needs it, not before." },
    { name: "Auth & RBAC", cats: ["back"], note: "Logins, roles and permissions, done once and done right." },
    { name: "Stripe", icon: "stripe", cats: ["back"], note: "Payments, subscriptions and webhooks." },
    { name: "Any backend stack, fast with AI", special: true, cats: ["back"], note: "Different language or framework? I'll ramp up fast." },
    // Databases
    { name: "PostgreSQL", icon: "postgresql", big: true, cats: ["data"], note: "Schemas designed before the first screen gets built." },
    { name: "MySQL", icon: "mysql", cats: ["data"], note: "Relational data for legacy and client systems." },
    { name: "MongoDB", icon: "mongodb", cats: ["data"], note: "Loyalty data for 600+ retail outlets." },
    { name: "Redis", icon: "redis", cats: ["data"], note: "Caching and queues for ~10K daily users." },
    { name: "Prisma", icon: "prisma", cats: ["data"], note: "Typed queries and migrations I can review." },
    { name: "Sequelize", icon: "sequelize", cats: ["data"], note: "ORM for older SQL codebases I've inherited." },
    { name: "Mongoose", icon: "mongoose", cats: ["data"], note: "Schemas and validation on top of MongoDB." },
    { name: "Any new database, fast with AI", special: true, cats: ["data"], note: "New data store? I learn its trade-offs before I commit." },
    // DevOps
    { name: "Docker", icon: "docker", big: true, cats: ["devops"], note: "Same build on my laptop, in CI and on the server." },
    { name: "Custom VPS", cats: ["devops"], note: "I set up and run my own servers, not just deploy buttons." },
    { name: "DigitalOcean", icon: "digitalocean", cats: ["devops"], note: "Droplets for apps that need a real server." },
    { name: "Vercel", icon: "vercel", cats: ["devops"], note: "Next.js apps with previews on every pull request." },
    { name: "Netlify", icon: "netlify", cats: ["devops"], note: "Static and Astro sites, deployed on push." },
    { name: "Hostinger", icon: "hostinger", cats: ["devops"], note: "Budget hosting for smaller client sites." },
    { name: "Namecheap", icon: "namecheap", cats: ["devops"], note: "Domains, DNS and email records." },
    { name: "Nginx", icon: "nginx", cats: ["devops"], note: "Reverse proxy, TLS and caching in front of every app." },
    { name: "Linux", icon: "linux", cats: ["devops"], note: "Home turf for every server I run." },
    { name: "PM2", icon: "pm2", cats: ["devops"], note: "Keeps Node processes alive and restarts them cleanly." },
    { name: "GitHub Actions", icon: "githubactions", cats: ["devops"], note: "CI/CD: test, build and deploy on every merge." },
    // AI workflow
    { name: "Claude Code", icon: "claude", big: true, cats: ["ai"], note: "My main agent. I write the spec, it drafts, I review every diff." },
    { name: "Cursor", icon: "cursor", cats: ["ai"], note: "Fast in-editor edits when the change is small." },
    { name: "Windsurf", icon: "windsurf", cats: ["ai"], note: "Another agent in the rotation for big refactors." },
    { name: "ChatGPT", cats: ["ai"], note: "Second opinions and quick research." },
    { name: "MCP servers", icon: "modelcontextprotocol", cats: ["ai"], note: "Plugging agents into real tools: databases, docs, browsers." },
    { name: "Claude skills", icon: "claude", cats: ["ai"], note: "Reusable playbooks so agents do things my way every time." },
    { name: "Custom skills", cats: ["ai"], note: "Project-specific skills I write for repeat tasks." },
    { name: "Sub-agents", cats: ["ai"], note: "Parallel agents for search, review and big refactors." },
    { name: "Specs & task docs", icon: "markdown", cats: ["ai"], note: "Clear specs first, so agent output is right the first time." },
    { name: "Context management", cats: ["ai"], note: "Keeping agents on track across big codebases and long projects." },
    { name: "AI code review", cats: ["ai"], note: "Every AI diff gets read and tested before it merges." },
  ],
} as const;

export const stats = [
  { value: "4+", label: "Years shipping production software" },
  { value: "25K+", label: "Users served by APIs I built" },
  { value: "600+", label: "Retail outlets on a platform I built for" },
  { value: "~10K", label: "Daily active users on loyalty systems" },
];

// Work history, newest first. Periods read like "May 2025 – Jun 2026".
export const experience = {
  label: "Where I've worked",
  heading: "Experience",
  // logo: file in public/companies (optional; a letter tile shows until it exists).
  jobs: [
    {
      company: "OBS Technologia",
      logo: "obs",
      role: "Senior Software Engineer",
      location: "Islamabad",
      period: "May 2025 – Jun 2026",
      summary: "Contributed to identity verification, retail loyalty, workforce and fleet booking products.",
    },
    {
      company: "92Devs",
      logo: "92devs",
      role: "Senior MERN Developer",
      location: "Rawalpindi",
      period: "Jun 2023 – May 2025",
      summary: "Contributed to SaaS platforms, CMS systems, dashboards and React Native apps, and ran their deployments.",
    },
    {
      company: "M TECHUB LLC",
      logo: "mtechub",
      role: "Node.js Developer",
      location: "Rawalpindi",
      period: "Jun 2022 – Jun 2023",
      summary: "Worked on secure REST APIs, payments and real-time messaging.",
    },
  ],
  education: "BS Computer Sciences, PMAS Arid University (2019 – 2023) · IBM DevOps Essentials",
  linkedinCta: "Full history on LinkedIn",
} as const;


// Selected work: four cards. `art` picks the drawn icon on the card
// (components/WorkArt.tsx); `url` adds the arrow link when public.
export const work = {
  label: "Recent projects",
  heading: "Selected work",
  projects: [
    {
      name: "Fastkey",
      category: "Background screening & identity verification",
      metric: "25K+",
      metricLabel: "users",
      tone: "cobalt",
      art: "shield",
      url: "https://fastkey.com",
      points: [
        "Contributed to API-as-a-product infrastructure so outside businesses can add identity verification to their own apps.",
        "Worked on REST APIs for third-party integrations inside partner applications.",
        "Contributed to authentication, verification workflows and request validation.",
        "Helped tune API performance and database queries for high-volume processing.",
      ],
    },
    {
      name: "Rita's Italian Ice",
      category: "Loyalty & rewards for a global retail brand",
      metric: "~10K",
      metricLabel: "daily active users",
      tone: "butter",
      art: "star",
      url: "https://www.ritasice.com/",
      points: [
        "Contributed to backend services for the loyalty and rewards platform across a global franchise.",
        "Worked on points, reward redemption and transaction tracking.",
        "Contributed to the APIs behind the mobile and web apps.",
        "Worked on the logic behind engagement campaigns and reward calculations.",
        "Helped optimise queries and APIs for high daily transaction volume.",
      ],
    },
    {
      name: "OBS Workflow Manager",
      category: "Internal workforce management tool",
      metric: "Payroll",
      metricLabel: "biometric attendance to salary, automated",
      tone: "lilac",
      art: "clock",
      points: [
        "Contributed to the workforce management system.",
        "Worked on biometric attendance device integration for automatic time tracking.",
        "Contributed to project hours, task monitoring and productivity reports.",
        "Worked on automated payroll: overtime, deductions and adjustments.",
        "Contributed to dashboards for employee activity and company project hours.",
      ],
    },
    {
      name: "Vac2Go",
      category: "Fleet reservation & scheduling",
      metric: "Booking",
      metricLabel: "calendar-based truck reservations",
      tone: "ink",
      art: "truck",
      url: "https://vac2go.com/",
      points: [
        "Contributed to the reservation platform with calendar-based truck booking.",
        "Worked on role-based auth and approval-based company onboarding.",
        "Contributed to the APIs for reservations and availability scheduling.",
      ],
    },
  ],
} as const;

// Photo marquee between the AI and FAQ sections. Files live in public/clicks.
// `speed` is two26's 1-5 level: 1 = 1.5px per frame, +30% per level.
export const showcase = {
  heading: "Some clicks along the journey",
  speed: 3,
  photos: [
    "20250517_173323.jpg",
    "IMG_20260320_223554.jpg",
    "FB_IMG_1773958304808.jpg",
    "IMG-20241219-WA0023.jpg",
    "IMG_20260321_021132.jpg",
    "IMG_20260320_223809.jpg",
    "IMG-20241219-WA0055.jpg",
    "IMG_20260321_021202.jpg",
    "FB_IMG_1773958329785.jpg",
    "IMG_20260320_224025.jpg",
    "IMG_20260321_021230.jpg",
    "IMG_20260321_021312.jpg",
  ],
} as const;

// FAQ: accordion, one answer open at a time. Sits before the photo strip and footer.
export const faq = {
  label: "Frequently asked questions",
  heading: "Things you might ask",
  aside: "Didn't find yours?",
  asideCta: "Ask me directly",
  items: [
    {
      q: "So, what kind of engineer are you?",
      a: "I'm a full stack engineer, primarily working with the JavaScript ecosystem. I enjoy working across frontend and backend, and I'm comfortable adapting to new technologies whenever a project requires it.",
    },
    {
      q: "How do you decide which architecture or technology to use?",
      a: "I start with the problem, not the technology. I consider the requirements, complexity, scalability, and maintainability before choosing an approach. I believe good architecture should solve problems, not create unnecessary complexity.",
    },
    {
      q: "How do you make sure your code is ready for production?",
      a: "I look beyond the happy path. I consider edge cases, error handling, data validation, and possible regressions. Testing and debugging are part of my development process, not just the final step.",
    },
    {
      q: "How do you use AI in your everyday development?",
      a: "I use tools like Claude Code and Cursor to explore codebases, break down tasks, debug, and speed up development. I also configure project instructions, documentation, custom skills, and MCP integrations. AI helps me move faster, but reviewing and validating the code remains my responsibility.",
    },
    {
      q: "What kind of work are you looking forward to?",
      a: "I'm interested in building products with real users and meaningful engineering challenges. I enjoy solving complex problems, improving existing systems, and working with people who care about building good software.",
    },
  ],
} as const;

export const skills = [
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "Astro JS", "Electron JS", "React Native", "GraphQL", "Tailwind CSS", "Shadcn/ui", "Radix UI", "Bootstrap", "CSS"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Socket.io", "WebRTC", "Microservices"],
  },
  {
    group: "Databases & ORM",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Sequelize", "Firebase"],
  },
  {
    group: "Architecture",
    items: ["API Design", "Auth & Authorization", "RBAC", "Database Design", "Third-Party Integrations", "Performance Optimization"],
  },
  {
    group: "DevOps & Infra",
    items: ["Linux", "Nginx", "Docker", "CI/CD", "PM2", "cPanel", "VPS Management"],
  },
  {
    group: "AI Engineering",
    items: ["Claude Code", "Cursor", "Windsurf", "Agentic workflows", "MCP tool integration", "Context management", "AI-code validation"],
  },
];


// Footer: closing call to action, contact details and links.
export const footer = {
  heading: "Interested in working together?",
  text: "Open to full-time and remote roles. The quickest way to reach me is email or WhatsApp.",
  emailCta: "Email me",
  whatsappCta: "WhatsApp",
  resumeCta: "Resume",
} as const;

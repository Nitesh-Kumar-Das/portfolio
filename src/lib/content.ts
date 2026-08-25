/**
 * Single source of truth for every word on the site.
 * Sourced from public/resume.pdf and verified GitHub repos — nothing invented.
 */

export const profile = {
  name: "Nitesh Kumar Das",
  location: "Delhi, India",
  role: "Full-stack developer",
  valueProp:
    "Full-stack developer building AI-integrated systems across Next.js, FastAPI, and PyTorch.",
  email: "niteshkumardas2025@gmail.com",
  phone: "+91-8383080967",
  github: "https://github.com/Nitesh-Kumar-Das",
  linkedin: "https://www.linkedin.com/in/nitesh-kumar-das-224434297/",
  resume: "/resume.pdf",   // the file itself
  resumePage: "/resume",   // the page that previews and offers it
  photo: "/nitesh.webp",
  photoWidth: 1110,
  photoHeight: 1417,
} as const;

export const about = [
  "I'm an Associate in LLM Post-Training at Ethara AI, where I own evaluation workflows for large language models: writing PRDs, evaluation rubrics, and technical specifications, then pressure-testing them through workflow analysis and QA.",
  "Before that I built things end to end: containerized ML microservices, OCR pipelines, and full-stack platforms in Next.js and FastAPI. I like the part where a model stops being a notebook and starts being a service somebody can actually use.",
].join(" ");

export type Experience = {
  role: string;
  company: string;
  place: string;
  period: string;
  current: boolean;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Associate, LLM Post-Training",
    company: "Ethara AI",
    place: "Gurugram, Haryana",
    period: "Jul 2026 to Present",
    current: true,
    points: [
      "Promoted from intern to Associate, taking expanded ownership of post-training evaluation workflows for large language models.",
      "Author Product Requirement Documents, evaluation rubrics, technical specifications, and structured guidelines for enterprise software applications.",
      "Collaborate on workflow analysis, testing, and QA to improve AI system performance and output consistency across evaluation pipelines.",
      "Drive documentation, requirement analysis, and operational process optimization in a fast-paced AI development environment.",
    ],
  },
  {
    role: "LLM Post-Training Intern",
    company: "Ethara AI",
    place: "Gurugram, Haryana",
    period: "Feb 2026 to Jun 2026",
    current: false,
    points: [
      "Contributed to post-training workflows for large language models through evaluation, validation, and quality improvement processes.",
      "Authored PRDs, evaluation rubrics, technical specifications, and structured guidelines for enterprise software applications.",
      "Collaborated on workflow analysis, testing, and QA to improve AI system output consistency.",
    ],
  },
];

export type SkillGroup = { label: string; items: string[]; rotate: string };

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
    rotate: "-rotate-2 md:-rotate-2",
  },
  {
    label: "Frontend",
    items: ["Next.js 15", "React.js", "Tailwind CSS"],
    rotate: "rotate-1",
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs"],
    rotate: "-rotate-1",
  },
  {
    label: "AI / ML",
    items: [
      "PyTorch",
      "scikit-learn",
      "XGBoost",
      "OpenAI API",
      "Tesseract.js",
      "NLP",
      "Transfer Learning",
    ],
    rotate: "rotate-2 md:rotate-2",
  },
  {
    label: "Databases",
    items: ["PostgreSQL (Prisma ORM)", "MongoDB", "SQLite"],
    rotate: "-rotate-1",
  },
  {
    label: "DevOps",
    items: ["Docker", "Docker Compose", "Git", "GitHub", "Postman", "AWS Cloud Foundations"],
    rotate: "rotate-1",
  },
];

/** Selects which hand-drawn diagram ProjectArt renders for this entry. */
export type ProjectArt = "agro" | "study" | "money" | "chat" | "game";

export type Project = {
  title: string;
  tagline: string;
  stack: string[];
  points: string[];
  repo: string;
  featured: boolean;
  art: ProjectArt;
};

export const projects: Project[] = [
  {
    title: "AgroAI",
    tagline: "Intelligent Agricultural Platform",
    stack: ["Next.js 15", "FastAPI", "PyTorch", "XGBoost", "PostgreSQL", "Docker"],
    points: [
      "Four independent ML services: crop recommendation (Random Forest, 99.5%), plant disease detection (MobileNetV2 CNN, 98.2% across 15+ classes), fertilizer prediction (Decision Tree, 97.8%), and yield forecasting (XGBoost).",
      "Trained on 154,000+ agricultural data points, supporting predictions across 22 crop types.",
      "Containerized 3-service microservices architecture with Docker Compose and an Nginx reverse proxy; secured with JWT, bcrypt, and rate limiting.",
      "Six-language accessibility support.",
    ],
    repo: "https://github.com/Nitesh-Kumar-Das/agroAI",
    featured: true,
    art: "agro",
  },
  {
    title: "AI StudY Bot",
    tagline: "GPT-Powered Learning Platform",
    stack: ["Next.js 14", "Node.js", "OpenAI API", "TypeScript", "MongoDB"],
    points: [
      "Document analysis over uploaded PDFs with auto-generated quizzes.",
      "JWT-secured APIs with Zustand state management.",
      "Adaptive study scheduler plus an analytics dashboard.",
    ],
    repo: "https://github.com/Nitesh-Kumar-Das/AI_studY_bot",
    featured: false,
    art: "study",
  },
  {
    title: "AI Money Management",
    tagline: "OCR Expense Tracker",
    stack: ["Next.js 15", "Python", "scikit-learn", "Tesseract.js", "MongoDB"],
    points: [
      "Client-side OCR with per-field confidence scoring.",
      "Custom budget-prediction model served from a Python API.",
      "JWT + bcrypt auth with full INR support.",
    ],
    repo: "https://github.com/Nitesh-Kumar-Das/AI_money_management",
    featured: false,
    art: "money",
  },
  {
    title: "Web-Chat",
    tagline: "Real-Time MERN Chat",
    stack: ["React", "Vite", "Express", "MongoDB", "Socket.IO", "Cloudinary"],
    points: [
      "Instant messaging over WebSockets with Socket.IO, plus online-presence indicators and contact filtering by availability.",
      "Image sharing handled through Cloudinary, with a notification sound for incoming messages.",
      "JWT auth middleware covering signup, login, logout, and profile management.",
      "30+ selectable themes via TailwindCSS and DaisyUI, responsive on desktop and mobile.",
    ],
    repo: "https://github.com/Nitesh-Kumar-Das/web-chat",
    featured: false,
    art: "chat",
  },
  {
    title: "Tic Tac Toe Ultimate",
    tagline: "Java Swing Game with Minimax AI",
    stack: ["Java", "Swing", "Minimax", "GitHub Actions"],
    points: [
      "Player-vs-player and player-vs-AI modes, the AI driven by minimax with alpha-beta pruning.",
      "UI, game logic, and AI kept in separate classes (TicTacToeUI, GameLogic, AIBot) with clean state transitions.",
      "Animated board transitions, an AI thinking indicator, and persistent score tracking across rounds.",
      "Cross-platform build scripts and a GitHub Actions workflow producing tagged releases.",
    ],
    repo: "https://github.com/Nitesh-Kumar-Das/TIC-TAC-TOE",
    featured: false,
    art: "game",
  },
];

export const education = {
  degree: "B.Tech, Artificial Intelligence and Data Science",
  school: "Guru Tegh Bahadur Institute of Technology",
  year: "2026",
  cgpa: "8.63 / 10",
};

export const achievements = [
  "Smart India Hackathon Finalist, two consecutive national hackathons",
  "AWS Cloud Foundations Certification",
];

export const nav = [
  // Route-absolute on purpose: a bare "#about" only scrolls when you are
  // already on "/", and would do nothing from /resume.
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Work", href: "/#work" },
  { label: "Résumé", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

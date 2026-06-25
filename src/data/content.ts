export interface Project {
  title: string
  status: 'LIVE' | 'DEV'
  stack: string[]
  bullets: string[]
  metric: string
  github: string
  liveUrl?: string
}

export interface ExperienceEntry {
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
  tags: string[]
}

export interface SkillGroup {
  label: string
  glyph: string
  items: string[]
}

export const NAV_LINKS = ['About', 'Experience', 'Projects', 'Skills', 'Contact'] as const

export const PROJECTS: Project[] = [
  {
    title: 'AgroAI',
    status: 'LIVE',
    stack: ['Next.js 15', 'FastAPI', 'PyTorch', 'XGBoost', 'PostgreSQL', 'Docker'],
    bullets: [
      '4-model ML platform: crop rec (99.5%), disease detection (98.2% / 15 classes), fertilizer prediction (97.8%), yield forecasting via XGBoost',
      'Trained on 154,000+ data points — PlantVillage dataset (54k+ leaf images) + fertilizer records (99k+), covering 22 crop types',
      'Dockerized 3-service microservices (Next.js + Express + FastAPI) with JWT auth, bcrypt, and rate limiting; 6-language regional support',
    ],
    metric: '↗ 154,000+ training samples across 4 independent ML models',
    github: 'https://github.com/Nitesh-Kumar-Das/agroAI',
  },
  {
    title: 'AI StudY Bot',
    status: 'LIVE',
    stack: ['Next.js 14', 'Node.js', 'OpenAI API', 'TypeScript', 'MongoDB'],
    bullets: [
      'GPT-powered platform with auto-quiz generation, PDF document analysis, and on-demand intelligent summaries via OpenAI API',
      'Full-stack architecture: Next.js + Express backend with JWT auth, Multer file uploads, Zustand state — supports concurrent multi-user sessions',
      'AI study scheduler with adaptive goal-tracking and performance analytics dashboard surfacing learning patterns and quiz scores',
    ],
    metric: '↗ OpenAI GPT integrated for real-time quiz + summary generation',
    github: 'https://github.com/Nitesh-Kumar-Das/AI_studY_bot',
  },
  {
    title: 'AI Money Management',
    status: 'LIVE',
    stack: ['Next.js 15', 'Python', 'scikit-learn', 'Tesseract.js', 'MongoDB'],
    bullets: [
      'OCR-powered expense tracker extracting amounts, dates, and merchant names from receipt images with confidence scoring',
      'Custom budget prediction ML model (scikit-learn, .pkl) served via Python API — delivers AI-driven spend forecasts per user',
      '3D analytics dashboards with category breakdowns, monthly trends, Indian currency format (Rs./INR), and JWT-secured accounts',
    ],
    metric: '↗ Client-side OCR + Python ML model pipeline on Indian currency formats',
    github: 'https://github.com/Nitesh-Kumar-Das/AI_money_management',
  },
  {
    title: 'TalkTide',
    status: 'LIVE',
    stack: ['React', 'Node.js', 'Socket.IO', 'MongoDB', 'Cloudinary'],
    bullets: [
      'Real-time full-stack chat app with WebSocket-based messaging, online presence indicators, and notification sounds via Socket.IO',
      'Cloudinary image upload integration, Zustand global state management, 30+ switchable UI themes via DaisyUI',
      'JWT-authenticated sessions with secure signup/login, profile picture updates, and persistent message history in MongoDB',
    ],
    metric: '↗ 30+ UI themes · deployed live on Render',
    github: 'https://github.com/Nitesh-Kumar-Das/web-chat',
    liveUrl: 'https://web-chat-eeit.onrender.com',
  },
  {
    title: 'Tic Tac Toe Ultimate',
    status: 'DEV',
    stack: ['Java', 'Swing', 'Minimax', 'Alpha-Beta Pruning'],
    bullets: [
      'Unbeatable AI opponent using Minimax + alpha-beta pruning across a complete game tree — human cannot win against optimal play',
      'Clean 3-class architecture: TicTacToeUI.java (animations, events), GameLogic.java (state, win detection), AIBot.java (search)',
      '60+ FPS Swing animations with confetti win celebrations, AI thinking indicators, and smooth board transitions',
    ],
    metric: '↗ Minimax + alpha-beta pruning — provably unbeatable AI',
    github: 'https://github.com/Nitesh-Kumar-Das/TIC-TAC-TOE',
  },
]

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Ethara AI',
    role: 'LLM Post-Training Intern',
    period: 'Feb 2026 – Present',
    location: 'Gurugram, Haryana',
    bullets: [
      'Contributing to post-training pipelines for LLMs through evaluation, validation, and quality improvement workflows',
      'Authoring PRDs, evaluation rubrics, and structured technical specifications for enterprise AI applications',
      'Driving workflow analysis, testing, and QA to improve AI system output consistency across evaluation pipelines',
      'Optimising documentation, requirement analysis, and operational processes in a fast-paced AI development environment',
    ],
    tags: ['LLM Evaluation', 'PRD Design', 'AI QA', 'Post-Training', 'Enterprise AI'],
  },
]

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: 'AI / ML',
    glyph: '◈',
    items: ['PyTorch', 'scikit-learn', 'XGBoost', 'OpenAI API', 'Tesseract.js', 'MobileNetV2', 'NLP'],
  },
  {
    label: 'Frontend',
    glyph: '◇',
    items: ['Next.js 15', 'React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Socket.IO Client'],
  },
  {
    label: 'Backend',
    glyph: '◆',
    items: ['FastAPI', 'Node.js', 'Express.js', 'Flask', 'Socket.IO', 'JWT / Auth', 'Java'],
  },
  {
    label: 'DevOps & Data',
    glyph: '◉',
    items: ['Docker Compose', 'PostgreSQL', 'MongoDB', 'Cloudinary', 'Git / GitHub', 'AWS Foundations'],
  },
]

export const STATS = [
  { value: '5', label: 'Projects Shipped' },
  { value: '2×', label: 'SIH Finalist' },
  { value: '8.63', label: 'CGPA' },
]

export const ACHIEVEMENTS = [
  { glyph: '⬡', title: 'Smart India Hackathon Finalist', detail: '2 consecutive national selections' },
  { glyph: '⬡', title: 'AWS Cloud Foundations', detail: 'Verified cloud architecture credential' },
  { glyph: '⬡', title: 'LLM Post-Training Intern', detail: 'Ethara AI — enterprise AI evaluation, 2026' },
]

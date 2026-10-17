import type { Project } from './types'

const gh = (name: string) => `https://github.com/faizankhan789/${name}`

export const projects: Project[] = [
  {
    slug: 'codebase-flow-video',
    title: 'Codebase Flow Video',
    accentWord: 'Flow',
    summary:
      'Claude Code plugin that reads a codebase and renders an animated, code-verified explainer video of how it works end to end.',
    stack: ['Claude Code', 'Node.js', 'HyperFrames'],
    repo: gh('codebase-flow-video'),
    live: 'https://faizankhan789.github.io/codebase-flow-video/',
    image: 'images/projects/codebase-flow-video.jpg',
    tier: 'feature',
  },
  {
    slug: 'resq-ai',
    title: 'ResQ AI',
    accentWord: 'AI',
    summary:
      'Real-time multimodal emergency assistant — voice, live camera and video triage with Gemini, generating paramedic-ready PDF reports.',
    stack: ['Gemini', 'Multimodal', 'Python'],
    repo: gh('ResQ-AI'),
    disclaimer: 'Research prototype — not medical advice.',
    tier: 'feature',
  },
  {
    slug: 'pin-perfect',
    title: 'Pin Perfect',
    accentWord: 'Perfect',
    summary:
      'Region-locked product-photo editing: SAM segmentation, multi-model inpainting (Flux, SDXL, Gemini, GPT-Image) and SSIM checks that prove nothing outside the edit changed.',
    stack: ['SAM', 'Flux', 'SDXL', 'Gemini', 'SSIM'],
    repo: gh('EditingToolUsingGemini'),
    tier: 'feature',
  },
  {
    slug: 'job-matching-pipeline',
    title: 'Job Matching Pipeline',
    accentWord: 'Matching',
    summary:
      'AI pipeline that ranks job listings against a résumé with LLMs, tailors the résumé and cover letter in LaTeX, and tracks everything in a Flask dashboard.',
    stack: ['LLMs', 'LaTeX', 'Flask', 'Python'],
    repo: gh('LinkedIn_autoapply'),
    tier: 'feature',
  },
  {
    slug: 'ai-document-processing',
    title: 'Document Intelligence',
    accentWord: 'Intelligence',
    summary:
      'Fully local system for PDF classification, field extraction, semantic search and grounded Q&A.',
    stack: ['Python', 'Local LLMs', 'Semantic Search'],
    repo: gh('AI-Document-Processing-System'),
    tier: 'feature',
  },
  {
    slug: 'autism-platform',
    title: 'Autism Learning Platform',
    accentWord: 'Learning',
    summary:
      'Bilingual (English/Urdu) learning and therapy-game platform for autistic children, built with React and Django REST.',
    stack: ['React', 'Django REST'],
    repo: gh('Autism'),
    live: 'https://faizankhan789.github.io/Autism/',
    tier: 'feature',
  },
  {
    slug: 'rag-cim-generator',
    title: 'RAG CIM Generator',
    summary:
      'FastAPI ingestion and DOCX chunking pipeline for generating confidential information memorandums.',
    stack: ['FastAPI', 'RAG', 'DOCX'],
    repo: gh('RAG-CIM_generator'),
    badge: 'In progress',
    tier: 'list',
  },
  {
    slug: 'arabic-search',
    title: 'Arabic Conversational Search',
    summary:
      'Hybrid Meilisearch retrieval, reranking and LangGraph answer generation with chat memory for Arabic queries.',
    stack: ['Meilisearch', 'LangGraph', 'Reranking'],
    tier: 'list',
  },
  {
    slug: 'notes-app',
    title: 'Notes App',
    summary: 'Cross-platform React Native notes app with Firebase sync.',
    stack: ['React Native', 'Firebase'],
    repo: gh('notes-app-react-native'),
    tier: 'list',
  },
  {
    slug: 'saudi-plate-detection',
    title: 'Saudi Plate Detection',
    summary:
      'Real-time licence-plate detection, PaddleOCR reading and DeepSORT vehicle tracking with English→Arabic mapping.',
    stack: ['YOLO', 'PaddleOCR', 'DeepSORT'],
    repo: gh('Saudi-Number-plate-detection'),
    tier: 'list',
  },
  {
    slug: 'wiseprice',
    title: 'WisePrice',
    summary: 'Final-year project: web platform for machine-learning car price prediction.',
    stack: ['Machine Learning', 'Web'],
    repo: gh('Wiseprice'),
    tier: 'list',
  },
]

import type { Role } from './types'

export const roles: Role[] = [
  {
    company: 'NexaQuanta',
    title: 'AI Engineer',
    period: 'Jun 2025 — Present',
    summary:
      'Building complete AI pipelines across multiple client engagements, from preprocessing and model orchestration through deployment and evaluation.',
    engagements: [
      {
        client: 'Altia',
        title: 'Document AI, Agentic Systems & Azure RAG',
        summary:
          'Mistral OCR and Azure Document Intelligence extraction, specialized multi-agent workflows, and vector-grounded enterprise retrieval. An enterprise workflow combining OCR, document intelligence, vector retrieval, and specialized agents for accurate, context-aware responses at scale.',
      },
      {
        client: 'CitNow',
        title: 'Vehicle Inspection Highlight Generator',
        summary:
          'Async multi-provider LLM/VLM orchestration with schema repair, cost tracking, confidence weighting, and 30–50% faster runtime. A dynamic-routing pipeline that fuses transcript analysis, video understanding, and object detection into confidence-weighted timestamps and condition insights.',
      },
      {
        client: 'CitNow',
        title: 'Video Quality Scoring',
        summary:
          'Speech, visual, and object-detection scoring over AWS SQS/S3 with caching, retries, webhooks, and automated accuracy tests.',
      },
      {
        client: 'CitNow',
        title: 'Generative Imaging Product',
        summary:
          'SDXL, ControlNet, BiRefNet, IP-Adapter, and LoRA workflows for realistic automotive backgrounds, shadows, reflections, and branding. A modular image-generation workflow for backgrounds, natural shadows, reflections, tinted windows, and adaptive brand placement.',
      },
    ],
  },
  {
    company: 'Edraak Systems',
    title: 'AI & Machine Learning Engineer',
    period: 'Feb 2024 — May 2025',
    summary:
      'Developed and evaluated ML models across computer vision and NLP, with feature engineering, preprocessing, optimization, and robust validation.',
  },
  {
    company: 'HiTech Provider',
    title: 'Machine Learning Engineer',
    period: 'Jan 2023 — Feb 2024',
    summary:
      'Built workflow-automation models by preparing datasets, experimenting with modern architectures, tuning hyperparameters, and evaluating performance.',
  },
  {
    company: 'Chegg',
    title: 'Machine Learning Engineer · Freelance',
    period: '2022 — 2024',
    summary:
      'Delivered RAG, medical classification, and NLP text-classification solutions using LangChain, Pinecone, scikit-learn, and NLTK.',
  },
]

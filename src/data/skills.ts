import type { SkillGroup } from './types'

export const skillGroups: SkillGroup[] = [
  {
    name: 'Language & Agentic AI',
    items: ['LLMs', 'VLMs', 'RAG', 'Prompt Engineering', 'Agentic AI', 'LangChain', 'Fine-tuning / LoRA', 'Vector Search'],
  },
  {
    name: 'Computer Vision',
    items: ['PyTorch', 'TensorFlow', 'OpenCV', 'YOLO v5/v7/v8', 'Deep SORT', 'ByteTrack', 'OCR', 'Transformers'],
  },
  {
    name: 'Generative Media',
    items: ['Stable Diffusion', 'SDXL', 'ControlNet', 'ComfyUI', 'IP-Adapter', 'BiRefNet', 'Kohya SS', 'FFmpeg'],
  },
  {
    name: 'Data & Infrastructure',
    items: ['Python', 'Docker', 'Redis', 'PostgreSQL', 'AWS S3 / SQS', 'Azure AI', 'Kafka', 'FAISS', 'Pinecone', 'ChromaDB'],
  },
  {
    name: 'Engineering Practice',
    items: ['MLOps', 'REST APIs', 'CI/CD', 'Async Python', 'Model Evaluation', 'Cross-validation', 'Cost Tracking', 'Git'],
  },
]

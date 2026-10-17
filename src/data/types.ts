export interface Project {
  slug: string
  title: string
  accentWord?: string
  summary: string
  stack: string[]
  repo?: string
  live?: string
  image?: string
  badge?: 'In progress'
  disclaimer?: string
  tier: 'feature' | 'list'
}

export interface Role {
  company: string
  title: string
  period: string
  summary: string
  engagements?: { client: string; title: string; summary: string }[]
}

export interface SkillGroup {
  name: string
  items: string[]
}

export interface Service {
  title: string
  summary: string
}

export interface Credential {
  kind: 'education' | 'certification'
  title: string
  issuer: string
  detail?: string
  url?: string
}

export interface Site {
  name: string
  role: string
  tagline: string
  about: string
  current: string
  email: string
  phone: string
  github: string
  linkedin: string
  resume: string
}

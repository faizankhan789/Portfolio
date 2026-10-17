import { describe, expect, it } from 'vitest'
import { site } from './site'
import { roles } from './experience'
import { projects } from './projects'
import { skillGroups } from './skills'
import { credentials } from './credentials'

describe('content data', () => {
  it('feature projects', () => {
    expect(projects.filter((p) => p.tier === 'feature').map((p) => p.slug)).toEqual([
      'codebase-flow-video', 'resq-ai', 'pin-perfect', 'job-matching-pipeline', 'ai-document-processing', 'autism-platform',
    ])
  })
  it('list projects', () => {
    expect(projects.filter((p) => p.tier === 'list').map((p) => p.slug)).toEqual([
      'rag-cim-generator', 'arabic-search', 'notes-app', 'saudi-plate-detection', 'wiseprice',
    ])
  })
  it('excludes banned repos', () => {
    const banned = ['Dallah_hospital', 'ai-cybersecurity', 'HiveMed', 'Car-Price-Prediction', 'Jarvis-2025', 'crush-bday']
    for (const p of projects) for (const b of banned) expect(p.repo ?? '').not.toContain(b)
  })
  it('never uses banned phrase', () => {
    for (const p of projects) expect(`${p.title} ${p.summary}`).not.toMatch(/linkedin auto-?apply/i)
  })
  it('repo rules', () => {
    expect(projects.find((p) => p.slug === 'arabic-search')?.repo).toBeUndefined()
    for (const p of projects.filter((p) => p.slug !== 'arabic-search'))
      expect(p.repo?.startsWith('https://github.com/faizankhan789/')).toBe(true)
  })
  it('disclaimer and badge', () => {
    expect(projects.find((p) => p.slug === 'resq-ai')?.disclaimer).toBeTruthy()
    expect(projects.find((p) => p.slug === 'rag-cim-generator')?.badge).toBe('In progress')
  })
  it('site', () => {
    expect(site.name).toBe('Muhammad Faizan Khan')
    expect(site.role).toBe('AI Engineer')
    expect(site.resume).toBe('Resume.pdf')
    expect(site.current).toContain('Currently at NexaQuanta')
  })
  it('roles, skills, credentials', () => {
    expect(roles.map((r) => r.company)).toEqual(['NexaQuanta', 'Edraak Systems', 'HiTech Provider', 'Chegg'])
    expect(skillGroups.length).toBe(5)
    expect(credentials.filter((c) => c.kind === 'certification').length).toBe(5)
  })
})

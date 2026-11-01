// Release dates and cover selections from 原创音乐作品集汇总.md.
// Durations measured from the supplied WAV masters; originals stay in the knowledge base.
const catalog = [
  { id: 'any-day-any-how', title: 'any day any how', publishedAt: '2022-08-20', duration: 239 },
  { id: 'baby-u', title: 'baby u', publishedAt: '2023-11-11', duration: 172 },
  { id: 'dance-in-2am', title: 'dance in 2am', publishedAt: '2023-04-17', duration: 282 },
  { id: 'just-a-kid-but-older', title: 'just a kid but older', publishedAt: '2022-11-20', duration: 187 },
  { id: 'the-fire-is-on-us', title: 'The Fire is On Us', publishedAt: '2025-11-08', duration: 253 },
  { id: 'until-i-met-you', title: 'Until I Met You', publishedAt: '2026-09-18', duration: 182 },
  { id: 'exclusive-secret', title: '独家秘诀', publishedAt: '2024-05-20', duration: 264 },
  { id: 'rose', title: '玫瑰', publishedAt: '2024-06-25', duration: 182 },
  { id: 'white-haired-youth', title: '白头少年', publishedAt: '2025-07-30', duration: 137 },
]

export const musicCatalog = catalog.map(work => ({
  ...work,
  year: work.publishedAt.slice(0, 4),
  project: '原创音乐 · MIKEY',
  projectEn: 'Original music · MIKEY',
  cover: `/works/images/music-${work.id}.jpg`,
  src: `/works/audio/${work.id}.mp3`,
})).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

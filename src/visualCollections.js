import { visualCatalog } from './applicationPortfolio.js'

const groups = [
  ['ima-carousel', 'IMA 为什么选择我们', 'IMA · Why Choose Us', 'IMA', /^visual-ima-carousel-/],
  ['imdc-carousel', 'IMDC 为什么选择我们', 'IMDC · Why Choose Us', 'IMDC', /^visual-imdc-\d/],
  ['momentus-04', '纪录片拍摄技巧', 'Documentary Shooting Tips', 'MOMENTUS 2026', /visual-momentus.*content-04/],
  ['momentus-13', '纪录片情绪与声音', 'Documentary Emotion & Sound', 'MOMENTUS 2026', /visual-momentus.*content-13/],
]
const result = []
const used = new Set()
for (const [id, title, titleEn, project, pattern] of groups) {
  const slides = visualCatalog.filter(w => pattern.test(w.id)).sort((a,b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
  slides.forEach(w => used.add(w.id))
  if (slides.length) result.push({ ...slides[0], id, title, titleEn, project, projectEn: project, slides })
}
for (const w of visualCatalog.filter(w => !used.has(w.id))) {
  const project = w.project === '网站原型设计' ? '网站原型设计' : /imdc|neurofeedback|static-/.test(w.id) ? 'IMDC' : 'IMA'
  result.push({ ...w, project, projectEn: project === '网站原型设计' ? 'Website Prototypes' : project })
}
export const visualCollections = result

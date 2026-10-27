import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { imageWorks, musicArtist, musicWorks, socialLinks, videoWorks } from "./works.js"
import { projectWorks } from "./projects.js"
import { assetUrl } from "./assetUrl.js"

const tx = (language, zh, en) => language === "en" ? en : zh

export function SocialLinks({ language }) {
  return <nav className="social-links" aria-label={tx(language, "社交媒体", "Social media")}>
    {socialLinks.map(item => <a href={item.url} key={item.id} target="_blank" rel="noreferrer">
      <span>{language === "en" ? item.nameEn : item.name}</span><b>{item.handle}</b><i aria-hidden="true">↗</i>
    </a>)}
  </nav>
}

export function ContactDetails({ language }) {
  return <address className="contact-details">
    <a className="contact-email" href="mailto:827206993@qq.com"><span>{tx(language, "邮箱", "Email")}</span><b>827206993@qq.com</b><i aria-hidden="true">↗</i></a>
    <SocialLinks language={language} />
  </address>
}

export function MoreWorks({ language }) {
  return <div className="more-works"><span aria-hidden="true">＋</span><p>{tx(language, "更多作品，持续更新，敬请期待。", "More work is on the way. Stay tuned.")}</p></div>
}

function WorkCover({ work }) {
  const [failed, setFailed] = useState(false)
  if (work.cover && !failed) return <img src={assetUrl(work.cover)} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} />
  return <div className={`work-cover-art art-${work.coverType || "type"}`} aria-hidden="true">
    <span>{work.coverType === "clock" ? "WAKE UP BEFORE" : "CULTURE / 2023"}</span>
    <b>{work.coverType === "clock" ? "23:17" : "NIGHT"}</b><i />
  </div>
}

export function ArchivePage({ archive, language, onBack, openProject, activeVideo, activeImage, activeTrack, currentTrack, playingTrack, audioRef, projectFilter, setProjectFilter, yearFilter, setYearFilter, visibleImages, projects, years }) {
  const copy = language === "en"
  const headings = {
    project: ["项目", "Projects", "精选案例", "SELECTED CASES", projectWorks.length],
    video: ["影像", "Film & Motion", "短片 · 纪录 · 社交内容", "FILM · DOCUMENTARY · SOCIAL", videoWorks.length],
    photography: ["摄影", "Photography", "光影 · 地点 · 瞬间", "LIGHT · PLACES · MOMENTS", imageWorks.filter(w => w.kind === "photography").length],
    visual: ["视觉设计", "Visual Design", "平面 · 品牌 · 视觉实验", "DESIGN · IDENTITY · VISUALS", imageWorks.filter(w => w.kind === "visual").length],
    music: ["音乐", "Music", "原创音乐 · 声音设计", "ORIGINAL MUSIC · SOUND", musicWorks.length],
  }
  const heading = headings[archive]
  const projectLabel = value => copy && value === "IMA 社媒运营" ? "IMA Social Media" : value

  return <main className="archive-page">
    <div className="archive-page-heading">
      <button className="back-link" onClick={onBack}>← {tx(language, "回到首页", "Back to home")}</button>
      <p className="eyebrow">{tx(language, "吴骉震 · 作品档案", "MIKEY WU · WORK ARCHIVE")}</p>
      <div className="archive-heading-row"><div><h1>{heading[copy ? 1 : 0]}</h1><p>{heading[copy ? 3 : 2]}</p></div><span className="archive-count">{String(heading[4]).padStart(2, "0")} <small>{tx(language, "件作品", "WORKS")}</small></span></div>
    </div>

    {archive === "project" && <section className="archive-grid project-archive-grid">
      {projectWorks.map((work, index) => <motion.article className="project-archive-card" key={work.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: index * .09, ease: [0.16, 1, .3, 1] }}>
        <button className="project-cover-button" onClick={() => openProject(work)} aria-label={`${tx(language, "查看项目", "View project")} ${copy ? work.title : work.titleZh}`}><WorkCover work={work} /></button>
        <div><span>{copy ? work.category : work.categoryZh} · {work.year}</span><h2>{copy ? work.title : work.titleZh}</h2><p className="project-role">{copy ? work.role : work.roleZh}</p><p>{copy ? work.description : work.descriptionZh}</p><button className="detail-link" onClick={() => openProject(work)}>{tx(language, "查看项目详情", "Explore the project")} ↗</button></div>
      </motion.article>)}
    </section>}

    {archive === "video" && <section className="archive-grid video-grid">
      {videoWorks.map(work => <article className="video-card" key={work.id}>
        <button className="video-cover" onClick={() => activeVideo(work)} aria-label={`${tx(language, "播放与详情", "Watch and explore")} ${copy ? work.titleEn : work.title}`}><WorkCover work={work} /><span className="play-mark" aria-hidden="true">▶</span>{work.duration && <span className="duration-tag">{work.duration}</span>}</button>
        <div className="work-meta"><div><h2>{copy ? work.titleEn : work.title}</h2><p>{copy ? work.roleEn : work.role}</p></div>{work.year && <span>{work.year}</span>}</div>
        <p className="video-description">{copy ? work.descriptionEn : work.description}</p><button className="detail-link" onClick={() => activeVideo(work)}>{tx(language, "播放与作品详情", "Watch & work details")} ↗</button>
      </article>)}
    </section>}

    {["photography", "visual"].includes(archive) && <>
      <div className="filters"><label>{tx(language, "项目", "Project")}<select value={projectFilter} onChange={event => setProjectFilter(event.target.value)}><option value="all">{tx(language, "全部项目", "All projects")}</option>{projects.map(item => <option key={item} value={item}>{projectLabel(item)}</option>)}</select></label><label>{tx(language, "年份", "Year")}<select value={yearFilter} onChange={event => setYearFilter(event.target.value)}><option value="all">{tx(language, "全部年份", "All years")}</option>{years.map(item => <option key={item}>{item}</option>)}</select></label><span>{visibleImages.length} {tx(language, "件作品", "works")}</span></div>
      <section className="archive-grid image-grid">{visibleImages.map(work => <button className="image-card" key={work.id} onClick={() => activeImage(work)}><img src={assetUrl(work.src)} alt={work.title} loading="lazy" /><span className="image-caption"><b>{work.title}</b><small>{projectLabel(work.project)}{work.year ? ` · ${work.year}` : ""}</small></span></button>)}</section>
      {!visibleImages.length && <p className="archive-note">{tx(language, "暂无符合筛选条件的作品。", "No works match these filters.")}</p>}
    </>}

    {archive === "music" && <section className="music-list">
      <div className="music-artist-link"><span>{tx(language, "网易云音乐", "NetEase Cloud Music")}</span><a href={musicArtist.url} target="_blank" rel="noreferrer">{musicArtist.name} ↗</a></div>
      {musicWorks.map(work => <article className="music-entry" key={work.id}>
        <div className={`music-row ${playingTrack === work.id ? "is-playing" : ""}`}>
          <button className="track-play" disabled={!work.src && !work.videoUrl} onClick={() => {
            if (work.videoUrl) { activeVideo(work); return }
            if (playingTrack === work.id) audioRef.current?.pause()
            else if (currentTrack?.id === work.id) audioRef.current?.play().catch(() => {})
            else if (work.src) activeTrack(work)
          }} aria-label={`${work.videoUrl ? tx(language, "观看", "Watch") : tx(language, "播放", "Play")} ${work.title}`}>{playingTrack === work.id ? "Ⅱ" : "▶"}</button>
          <img className="track-cover" src={assetUrl(work.cover)} alt="" loading="lazy" />
          <div className="track-title"><b>{work.title}</b><span>{work.project}</span>{work.videoUrl && <button className="track-detail-button" onClick={() => activeVideo(work)}>{tx(language, "观看 MV / 作品详情", "Watch MV / work details")} ↗</button>}</div>
          <span className="track-year">{work.year}</span><span className="track-duration">{Number.isFinite(work.duration) ? `${Math.floor(work.duration / 60)}:${String(work.duration % 60).padStart(2, "0")}` : work.videoUrl ? "MV" : "—:—"}</span>
        </div>
        <p className="music-description">{copy ? work.descriptionEn : work.description}</p>
      </article>)}
    </section>}

    <MoreWorks language={language} /><footer className="archive-footer">© 2026 Mikey Wu <span>{tx(language, "作品，让故事以不同形式存在。", "WORKS ARE STORIES IN DIFFERENT FORMS.")}</span></footer>
  </main>
}

function DialogFrame({ title, onClose, language, children, image = false }) {
  const root = useRef(null)
  useEffect(() => {
    const previousFocus = document.activeElement
    const element = root.current
    element.querySelector("button")?.focus({ preventScroll: true })
    const onKey = event => {
      if (event.key !== "Tab") return
      const focusable = [...element.querySelectorAll('button:not(:disabled), a[href], iframe, video[controls], [tabindex="0"]')]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
    }
    element.addEventListener("keydown", onKey)
    return () => {
      element.removeEventListener("keydown", onKey)
      const nextDialog = [...document.querySelectorAll('[role="dialog"]')].find(dialog => dialog !== element)
      if (nextDialog) nextDialog.querySelector("button")?.focus({ preventScroll: true })
      else if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
      else document.querySelector(".archive-page .back-link, .site-nav .wordmark")?.focus({ preventScroll: true })
    }
  }, [])

  return <motion.div ref={root} className={`media-overlay detail-overlay ${image ? "image-overlay" : ""}`} role="dialog" aria-modal="true" aria-label={title} onClick={event => { if (event.target === event.currentTarget) onClose() }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.section className={`detail-panel ${image ? "image-panel" : ""}`} initial={{ y: 40, scale: .96 }} animate={{ y: 0, scale: 1 }} exit={{ opacity: 0, y: 18 }} transition={{ duration: .65, ease: [0.16, 1, .3, 1] }}>
      <button className="modal-close detail-close" onClick={onClose} aria-label={tx(language, "关闭", "Close")}>×</button>{children}
    </motion.section>
  </motion.div>
}

export function ProjectModal({ item, language, onClose, onVideo }) {
  const copy = language === "en"
  const relatedVideo = videoWorks.find(work => work.id === item.relatedVideoId)
  return <DialogFrame title={copy ? item.title : item.titleZh} language={language} onClose={onClose}>
    <header className="detail-heading"><p className="eyebrow">{copy ? item.category : item.categoryZh} · {item.period}</p><h2>{copy ? item.title : item.titleZh}</h2><p className="detail-role">{copy ? item.role : item.roleZh}</p></header>
    <div className="project-detail-art"><WorkCover work={item} /></div>
    <div className="detail-body">
      <section><h3>{tx(language, "项目背景", "Context")}</h3><p>{copy ? item.backgroundEn : item.background}</p></section>
      <section><h3>{tx(language, "我的贡献", "My contribution")}</h3><ul>{item.contributions.map(([zh, en]) => <li key={zh}>{copy ? en : zh}</li>)}</ul></section>
      <section><h3>{tx(language, "项目成果", "Outcomes")}</h3><ul>{item.outcomes.map(([zh, en]) => <li key={zh}>{copy ? en : zh}</li>)}</ul></section>
      {relatedVideo && <button className="detail-action" onClick={() => onVideo(relatedVideo)}>{tx(language, "观看作品与完整演职员表", "Watch the work & view credits")} ↗</button>}
    </div>
  </DialogFrame>
}

function WorkInformation({ item, language }) {
  const copy = language === "en"
  const paragraphs = copy ? item.paragraphsEn || [item.descriptionEn] : item.paragraphs || [item.description]
  return <div className="detail-body work-information">
    <section><h3>{tx(language, "作品介绍", "About the work")}</h3>{paragraphs.filter(Boolean).map(text => <p key={text}>{text}</p>)}</section>
    {item.credits?.length > 0 && <section><h3>{tx(language, "演职员 / 创作署名", "Credits")}</h3><dl className="work-credits">{item.credits.map((credit, index) => <div key={`${credit.role}-${index}`}><dt>{copy ? credit.roleEn : credit.role}</dt><dd>{credit.url ? <a href={credit.url} target="_blank" rel="noreferrer">{copy ? credit.nameEn || credit.name : credit.name} ↗</a> : copy ? credit.nameEn || credit.name : credit.name}</dd></div>)}</dl></section>}
    {item.thanks && <section><h3>{tx(language, "特别鸣谢", "Special thanks")}</h3><p>{copy ? item.thanksEn : item.thanks}</p></section>}
    {item.kind === "music" && <div className="music-artist-link"><span>{tx(language, "网易云音乐", "NetEase Cloud Music")}</span><a href={musicArtist.url} target="_blank" rel="noreferrer">{musicArtist.name} ↗</a></div>}
  </div>
}

function videoSource(url) {
  if (!url) return null
  const bilibili = url.match(/bilibili\.com\/video\/(BV[\w]+)/i)
  if (bilibili) return { kind: "embed", src: `https://player.bilibili.com/player.html?bvid=${bilibili[1]}&page=1&autoplay=1&danmaku=0` }
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/)
  if (youtube) return { kind: "embed", src: `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1` }
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return { kind: "embed", src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` }
  if (/\.(mp4|webm|ogg)(?:\?.*)?$/i.test(url)) return { kind: "file", src: url }
  return { kind: "link", src: url }
}

export function MediaModal({ type, item, onClose, language }) {
  const copy = language === "en"
  const title = copy ? item.titleEn || item.title : item.title
  const sourceUrl = assetUrl(item.videoUrl || item.src)
  const video = type === "video" ? videoSource(sourceUrl) : null
  return <DialogFrame title={title} language={language} onClose={onClose} image={type === "image"}>
    {type === "image" ? <figure><img src={assetUrl(item.src)} alt={item.title} /><figcaption>{item.title}<span>{copy ? item.projectEn || item.project : item.project}{item.year ? ` · ${item.year}` : ""}</span></figcaption></figure> : <>
      <header className="detail-heading"><p className="eyebrow">{item.publishedAt ? `${tx(language, "发布于", "PUBLISHED")} ${item.publishedAt}` : item.year || tx(language, "短片作品", "SHORT FILM")}{typeof item.duration === "string" && item.duration ? ` · ${item.duration}` : ""}</p><h2>{title}</h2><p className="detail-role">{copy ? item.roleEn : item.role}</p></header>
      <div className="video-dialog">
        {video?.kind === "embed" ? <iframe src={video.src} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /> : video?.kind === "file" ? <video src={video.src} controls autoPlay /> : <div className="unavailable-media"><p>{tx(language, "在原平台观看这部作品。", "Watch this work on its original platform.")}</p></div>}
      </div>
      {sourceUrl && <a className="platform-watch-link" href={sourceUrl} target="_blank" rel="noreferrer">{tx(language, "在视频平台打开", "Open on video platform")} ↗</a>}
      <WorkInformation item={item} language={language} />
    </>}
  </DialogFrame>
}

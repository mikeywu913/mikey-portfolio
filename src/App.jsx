import { AnimatePresence, motion } from "motion/react"
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import mikeyCutout from "./assets/mikey-full-portrait.png"
import { imageWorks, musicWorks, videoWorks } from "./works.js"
import { projectWorks } from "./projects.js"
import { ArchivePage, ContactDetails, MediaModal, MoreWorks, ProjectModal } from "./PortfolioContent.jsx"
import { assetUrl } from "./assetUrl.js"

const categories = [
  { id: "project", title: "项目", titleEn: "Projects", label: "SELECTED CASES", labelZh: "精选案例", preview: "/works/images/momentus-2026.jpg.png", total: projectWorks.length },
  { id: "video", title: "影像", titleEn: "Film & Motion", label: "FILM · DOCUMENTARY · SOCIAL", labelZh: "短片 · 纪录 · 社交内容", preview: "/works/images/voice-of-penny-poster.png", total: videoWorks.length },
  { id: "photography", title: "摄影", titleEn: "Photography", label: "LIGHT · PLACES · MOMENTS", labelZh: "光影 · 地点 · 瞬间", preview: "/works/images/chiang-mai.jpg", total: imageWorks.filter(w => w.kind === "photography").length },
  { id: "visual", title: "视觉设计", titleEn: "Visual Design", label: "DESIGN · IDENTITY · VISUALS", labelZh: "平面 · 品牌 · 视觉实验", preview: "/works/images/ima-process-led.png", total: imageWorks.filter(w => w.kind === "visual").length },
  { id: "music", title: "音乐", titleEn: "Music", label: "ORIGINAL MUSIC · SOUND", labelZh: "原创音乐 · 声音设计", preview: "/works/images/the-fire-is-on-us.png", total: musicWorks.length },
]

const skillCards = [
  { number: "01", zh: "内容策划", en: "Content Strategy", zhText: "从选题洞察、受众分析到脚本创作，建立完整的内容策略。", enText: "From audience insight and editorial thinking to clear, compelling scripts." },
  { number: "02", zh: "视频制作", en: "Film Production", zhText: "导演、摄影、剪辑与调色，独立完成从创意到成片的制作流程。", enText: "Directing, cinematography, editing and colour, from first idea to final cut." },
  { number: "03", zh: "社媒运营", en: "Social Media", zhText: "平台内容运营、传播增长、数据复盘与持续优化。", enText: "Platform-native content, audience growth and data-led iteration." },
  { number: "04", zh: "视觉设计", en: "Visual Design", zhText: "从单张海报到整套品牌视觉系统，建立清晰一致的表达。", enText: "Distinctive visual systems, from a single poster to a full campaign." },
]

const tx = (language, zh, en) => language === "en" ? en : zh

function App() {
  const [language, setLanguage] = useState("zh")
  const [archive, setArchive] = useState(null)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)
  const [activeProject, setActiveProject] = useState(null)
  const [activeImage, setActiveImage] = useState(null)
  const [activeTrack, setActiveTrack] = useState(null)
  const [playingTrack, setPlayingTrack] = useState(null)
  const [projectFilter, setProjectFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const audioRef = useRef(null)
  const homePosition = useRef(0)
  const previousArchive = useRef(null)
  useLayoutEffect(() => {
    if (archive) window.scrollTo({top: 0, behavior: "instant"})
    else if (previousArchive.current) window.scrollTo({top: homePosition.current, behavior: "instant"})
    previousArchive.current = archive
  }, [archive])
  const isEnglish = language === "en"
  const dialogOpen = Boolean(activeVideo || activeImage || activeProject)
  useEffect(() => {
    if (!dialogOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = previousOverflow }
  }, [dialogOpen])

  useEffect(() => {
    document.documentElement.lang = isEnglish ? "en" : "zh-CN"
    document.title = isEnglish ? "Mikey Wu — Creative Strategist & Director" : "吴骉震 Mikey Wu — 个人作品集"
  }, [isEnglish])

  useEffect(() => {
    const onKey = (event) => { if (event.key === "Escape") { setActiveVideo(null); setActiveImage(null); setActiveProject(null) } }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (!activeTrack?.src || !audioRef.current) return
    audioRef.current.src = assetUrl(activeTrack.src)
    audioRef.current.play().then(() => setPlayingTrack(activeTrack.id)).catch(() => setPlayingTrack(null))
  }, [activeTrack])

  const visibleImages = useMemo(() => imageWorks.filter((work) =>
    (work.kind === archive) && (projectFilter === "all" || work.project === projectFilter) &&
    (yearFilter === "all" || work.year === yearFilter)), [archive, projectFilter, yearFilter])
  const projects = [...new Set(imageWorks.filter(work => work.kind === archive).map((work) => work.project).filter(Boolean))]
  const years = [...new Set(imageWorks.filter(work => work.kind === archive).map((work) => work.year).filter(Boolean))].sort((a, b) => b.localeCompare(a))

  const openVideo = (work) => { audioRef.current?.pause(); setActiveProject(null); setActiveVideo(work) }
  const openArchive = (id) => { homePosition.current = window.scrollY; setArchive(id); setProjectFilter("all"); setYearFilter("all") }
  const closeArchive = () => { if (archive) setArchive(null); else window.scrollTo({ top: 0, behavior: "smooth" }) }
  const revealTransition = { duration: 1.05, ease: [0.16, 1, 0.3, 1] }

  return (
    <div className={`site-shell ${isEnglish ? "lang-en" : "lang-zh"}`}>
      <header className="site-nav">
        <button className="wordmark" onClick={closeArchive} aria-label={tx(language, "返回首页", "Back to home")}>MIKEY<span>.</span></button>
        <nav className="nav-menu" aria-label={tx(language, "主导航", "Main navigation")}>
          {archive ? <button onClick={closeArchive}>{tx(language, "返回首页", "Home")}</button> : <><a href="#about">{tx(language, "关于", "About")}</a><a href="#projects">{tx(language, "项目", "Works")}</a><a href="#skills">{tx(language, "能力", "Expertise")}</a></>}
        </nav>
        <div className="nav-right"><div className="language-toggle" aria-label="Language"><button className={!isEnglish ? "active" : ""} onClick={() => setLanguage("zh")} aria-pressed={!isEnglish}>中</button><span>/</span><button className={isEnglish ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={isEnglish}>EN</button></div><a className="nav-contact" href="#contact" onClick={(event) => {if (archive) {event.preventDefault(); setArchive(null); requestAnimationFrame(() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}))}}}>{tx(language, "联系我", "Contact")} <span>↗</span></a></div>
      </header>

      {archive && <ArchivePage archive={archive} language={language} onBack={closeArchive} openProject={setActiveProject} activeVideo={openVideo} activeImage={setActiveImage} activeTrack={setActiveTrack} currentTrack={activeTrack} playingTrack={playingTrack} audioRef={audioRef} projectFilter={projectFilter} setProjectFilter={setProjectFilter} yearFilter={yearFilter} setYearFilter={setYearFilter} visibleImages={visibleImages} projects={projects} years={years} />}<div hidden={!!archive} className="home-page">
        <main id="top">
          <section className="hero-section">
            <div className="hero-atmosphere" aria-hidden="true" /><div className="hero-rings" aria-hidden="true" />
            <motion.div className="hero-copy" initial="hidden" whileInView="visible" viewport={{ amount: .15 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: .13, delayChildren: .15 } } }}>
              <motion.p className="hero-kicker" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: revealTransition } }}>{tx(language, "个人作品集", "PORTFOLIO")} <span>2026</span></motion.p>
              <div className="hero-title-mask"><motion.h1 className="hero-title" variants={{ hidden: { opacity: 0, y: "105%", scaleX: .82, filter: "blur(12px)" }, visible: { opacity: 1, y: 0, scaleX: 1, filter: "blur(0px)", transition: { ...revealTransition, duration: 1.35 } } }}>{tx(language, "你好，我是", "HI, I'M")}<br /><em>MIKEY</em><span className="hero-chinese-name">{tx(language, "吴骉震", "WU BIAOZHEN")}</span></motion.h1></div>
              <motion.p className="hero-role" variants={{ hidden: { opacity: 0, x: -25 }, visible: { opacity: 1, x: 0, transition: revealTransition } }}>{tx(language, "创意策划 / 导演 / 摄影 / 剪辑", "Creative Strategist / Director / Photographer / Editor")}</motion.p>
              <motion.a className="hero-cta" href="#projects" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: revealTransition } }}>{tx(language, "浏览我的作品", "Explore my work")} <span>↘</span></motion.a>
            </motion.div>
            <motion.div className="hero-person" viewport={{ amount: .1 }} initial={{ opacity: 0, x: 80, scale: .96 }} whileInView={{ opacity: 1, x: 0, scale: 1, clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.5, delay: .35, ease: [0.16, 1, 0.3, 1] }}><img src={mikeyCutout} alt={tx(language, "吴骉震肖像", "Portrait of Mikey Wu")} /></motion.div>
            <span className="hero-edge-label">{tx(language, "吴骉震 · 创意作品", "WU BIAOZHEN · CREATIVE PRACTICE")}</span><a className="hero-scroll-mark" href="#about"><span>{tx(language, "下滑探索", "SCROLL TO EXPLORE")}</span><svg viewBox="0 0 24 36" fill="none" aria-hidden="true"><path d="M12 2v29M5 24l7 7 7-7" /></svg></a>
          </section>

          <section id="about" className="about-section section-frame">
            <SectionSymbols kind="about" /><SectionLabel number="01" title={tx(language, "关于我", "ABOUT ME")} />
            <div className="about-grid"><motion.div className="about-lead" initial={{ opacity: 0, y: 90, scaleX: .9 }} whileInView={{ opacity: 1, y: 0, scaleX: 1 }} viewport={{ once: false, amount: .3 }} transition={revealTransition}><p className="eyebrow">{tx(language, "吴骉震 / MIKEY WU", "WU BIAOZHEN / MIKEY WU")}</p><h2>{tx(language, "让想法被看见，\n让故事留下来。", "Ideas made visible.\nStories made lasting.")}</h2><p className="about-location">{tx(language, "媒体研究 · 创意制作", "MEDIA RESEARCH · CREATIVE PRODUCTION")}</p></motion.div><motion.div className="about-details" initial={{ opacity: 0, x: 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: .25 }} transition={{ ...revealTransition, delay: .12 }}><p>{tx(language, "媒体研究硕士，专注于叙事影像、社媒内容与品牌视觉。从创意策划到最终交付，用故事驱动每一个项目。", "A media researcher and creative producer focused on narrative film, social content and visual identity. I shape ideas into stories, from first concept to final delivery.")}</p><p>{tx(language, "毕业于马来亚大学媒体研究硕士项目与清迈大学社会科学学士（一级荣誉）。曾在 Infinite Minds Academy、Momentus 毕业展宣传组及 Amor Mundi Lab 担任内容、影像与视觉相关工作。", "I hold an MA in Media Studies from Universiti Malaya and a First-Class Honours BA in Social Sciences from Chiang Mai University. My work spans Infinite Minds Academy, Momentus Graduate Showcase and Amor Mundi Lab.")}</p><div className="about-links"><div className="contact-inline"><span>{tx(language, "联系方式", "CONTACT")}</span><ContactDetails language={language} /></div></div></motion.div></div>
            <div className="about-stats">{[{ n: "100", nEn: "1", s: "万+", sEn: "M+", zh: "单条视频最高播放", en: "Peak views on one video" }, { n: "62.6", s: "%", zh: "广告触达增长", en: "Increase in ad reach" }, { n: "40", s: "%↑", zh: "展览账号曝光增长", en: "Showcase account reach growth" }, { n: "15", s: "K+", zh: "主题短片累计播放", en: "Views on research film" }].map((item, i) => <motion.div key={item.zh} initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ ...revealTransition, delay: i * .1 }}><b>{isEnglish ? (item.nEn || item.n) : item.n}<span>{isEnglish ? (item.sEn || item.s) : item.s}</span></b><small>{tx(language, item.zh, item.en)}</small></motion.div>)}</div>
          </section>

          <section id="projects" className="projects-section"><div className="section-frame"><SectionSymbols kind="works" /><SectionLabel number="02" title={tx(language, "项目与作品档案", "PROJECTS & ARCHIVE")} /><AnimatedSectionTitle>{tx(language, "创作，横跨多种媒介。", "One practice. Many forms.")}</AnimatedSectionTitle><p className="projects-intro">{tx(language, "将鼠标移至分类上，预览代表作品；点击进入完整档案。", "Hover to preview a featured work. Select a category to open its archive.")}</p>
            <div className="work-category-list" onMouseLeave={() => setHoveredCategory(null)}>{categories.map((item, index) => <motion.button className={`work-category ${hoveredCategory === item.id ? "is-active" : ""}`} key={item.id} onMouseEnter={() => setHoveredCategory(item.id)} onFocus={() => setHoveredCategory(item.id)} onClick={() => openArchive(item.id)} initial={{ opacity: 0, x: -55, scaleX: .94 }} whileInView={{ opacity: 1, x: 0, scaleX: 1 }} viewport={{ once: false, amount: .2 }} transition={{ ...revealTransition, delay: index * .1 }}><span className="work-category-index">0{index + 1}</span><span className="work-category-name">{tx(language, item.title, item.titleEn)}<small>{tx(language, item.labelZh, item.label)}</small></span><span className="work-category-count">{String(item.total).padStart(2, "0")} <small>{tx(language, "件作品", "WORKS")}</small></span><motion.img className="work-category-preview" src={assetUrl(item.preview)} alt="" animate={{ opacity: hoveredCategory === item.id ? 1 : .16, scale: hoveredCategory === item.id ? 1 : .84, x: hoveredCategory === item.id ? 0 : 12 }} transition={{ duration: .78, ease: [0.16, 1, 0.3, 1] }} /><span className="work-category-open">{tx(language, "查看档案", "OPEN ARCHIVE")} ↗</span></motion.button>)}</div>
            <MoreWorks language={language} />
          </div></section>

          <section id="skills" className="skills-section"><div className="section-frame"><SectionSymbols kind="skills" /><SectionLabel number="03" title={tx(language, "能力", "EXPERTISE")} /><AnimatedSectionTitle>{tx(language, "从想法，到成片。", "From the first idea to the final frame.")}</AnimatedSectionTitle><div className="strength-grid">{skillCards.map((item, index) => <motion.article key={item.number} initial={{ opacity: 0, y: 60, rotateX: -8 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: false, amount: .2 }} transition={{ ...revealTransition, delay: index * .11 }} whileHover={{ y: -6 }}><div className="strength-card-top"><span>{item.number} / {tx(language, "专长", "EXPERTISE")}</span><b>{["✳", "◉", "↗", "▧"][index]}</b></div><h3>{tx(language, item.zh, item.en)}</h3><p>{tx(language, item.zhText, item.enText)}</p><i /></motion.article>)}</div></div></section>
        </main>

        <footer id="contact" className="contact-section"><div className="contact-backdrop" /><div className="section-frame contact-frame"><SectionSymbols kind="contact" /><SectionLabel number="04" title={tx(language, "保持联系", "GET IN TOUCH")} /><motion.div className="contact-main" initial={{ opacity: 0, y: 100, scale: .9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: false, amount: .35 }} transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}><p className="eyebrow">{tx(language, "有故事想讲吗？", "HAVE A STORY TO TELL?")}</p><h2>{tx(language, "一起创造\n点什么。", "Let's make\nsomething matter.")}</h2><p>{tx(language, "项目合作、工作机会，或只是想聊聊创意，都欢迎联系我。", "For collaborations, opportunities, or just a conversation about ideas.")}</p><a className="contact-button" href="mailto:827206993@qq.com">{tx(language, "发邮件聊聊", "LET’S TALK")} <b>↗</b></a><ContactDetails language={language} /></motion.div><div className="contact-footer"><button className="wordmark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>MIKEY<span>.</span></button><span>© 2026 Mikey Wu</span><span>{tx(language, "个人作品集", "INDEPENDENT CREATIVE PRACTICE")}</span></div></div></footer>
      </div>

      <AnimatePresence>{activeProject && <ProjectModal key={`project-${activeProject.id}`} item={activeProject} language={language} onClose={() => setActiveProject(null)} onVideo={openVideo} />}{activeVideo && <MediaModal key={`video-${activeVideo.id}`} type="video" item={activeVideo} onClose={() => setActiveVideo(null)} language={language} />}{activeImage && <MediaModal key={`image-${activeImage.id}`} type="image" item={activeImage} onClose={() => setActiveImage(null)} language={language} />}</AnimatePresence>
      <audio ref={audioRef} onPlay={() => setPlayingTrack(activeTrack?.id ?? null)} onEnded={() => setPlayingTrack(null)} onPause={() => setPlayingTrack(null)} />
    </div>
  )
}

function SectionSymbols({ kind }) {
  const paths = { about: ["M32 12a10 10 0 1 0 0 20 10 10 0 0 0 0-20M14 54c0-22 36-22 36 0", "M12 16h40v32H12zM22 26h20M22 35h13"], works: ["M10 20h12l4-6h12l4 6h12v32H10zM42 36a10 10 0 1 1-20 0 10 10 0 0 1 20 0", "M18 12v40l32-20z"], skills: ["M12 48l30-30 10 10-30 30-12 2zM36 24l10 10", "M32 8v48M8 32h48M15 15l34 34M49 15L15 49"], contact: ["M32 8v48M8 32h48M15 15l34 34M49 15L15 49", "M14 46c0-24 36-24 36 0M20 18a12 12 0 1 0 24 0", "M8 32c12-24 36-24 48 0-12 24-36 24-48 0M32 25a7 7 0 1 0 0 14 7 7 0 0 0 0-14", "M8 18h48v32H8zM8 18l24 20 24-20", "M10 34L54 10 38 54l-8-20zM30 34l24-24"] };
  return <div className={`section-symbols symbols-${kind}`} aria-hidden="true">{paths[kind].map((d,i) => <svg key={d} viewBox="0 0 64 64" style={{"--drift-duration": `${17+i*7}s`, "--drift-delay": `-${i*9+3}s`}}><path d={d} /></svg>)}</div>
}

function SectionLabel({ number, title }) { return <div className="section-label"><span>{number}</span><i /><b>{title}</b></div> }
function AnimatedSectionTitle({ children }) { return <motion.div className="section-title-mask" initial="hidden" whileInView="visible" viewport={{ once: false, amount: .25 }}><motion.h2 className="section-display-title" variants={{ hidden: { opacity: 0, y: "110%", scaleX: .86, filter: "blur(9px)" }, visible: { opacity: 1, y: 0, scaleX: 1, filter: "blur(0px)" } }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.h2></motion.div> }

export default App

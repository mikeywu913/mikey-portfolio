// Owner-supplied credits; public Bilibili dates and durations verified on 2026-10-26.
const bili = (id) => `https://www.bilibili.com/video/${id}/`
export const musicArtist = { name: "MiKeY不是米奇", url: "https://music.163.com/#/artist?id=36338148" }
export const socialLinks = [
  { id: "netease", name: "网易云音乐", nameEn: "NetEase Cloud Music", handle: "MiKeY不是米奇", url: musicArtist.url },
  { id: "bilibili", name: "Bilibili", nameEn: "Bilibili", handle: "MiKeY_W", url: "https://space.bilibili.com/17481926" },
]
const penny = {
  id: "voice-of-penny", title: "佩妮寻声记 · The Voice of Penny", titleEn: "The Voice of Penny", year: "2026", publishedAt: "2026-08-15",
  role: "导演 · 摄影 · 剪辑 · 原创音乐", roleEn: "Director · Cinematographer · Editor · Original Music",
  description: "一位非语言自闭症少女通过绘画找到自己声音的故事。由无限心智学院（IMA）与马来亚大学学生团队联合制作。",
  descriptionEn: "A nonspeaking autistic girl finds her voice through painting. Co-produced by Infinite Minds Academy and a student team from Universiti Malaya.",
  paragraphs: [
    "《佩妮寻声记》（The Voice of Penny）是一部由无限心智学院（Infinite Minds Academy, IMA）与马来亚大学学生团队联合制作的微电影。影片讲述了一位非语言自闭症少女通过绘画找到自己声音的故事——这段旅程，正是我们每一天在学生们身上看到的真实潜能的写照。",
    "在 IMA，我们坚信每一个心灵都非同凡响。自 2013 年以来，我们一直通过数字技术技能培训，赋能神经多样性青年——包括自闭症、阅读障碍、多动症及其他学习差异人士。我们的使命是帮助他们建立创作自信、实现经济独立，并开创一个被看见、被珍视的未来。",
    "当马来亚大学团队带着他们对《佩妮寻声记》的构想找到我们时，我们看到了将这份使命传递给更广泛受众的机会。这部影片不仅仅是一个故事——它更是我们日常工作的缩影：为神经多样性个体创造表达自我的空间，帮助他们掌握行业所需技能，并被这个世界真正听见。",
    "这部影片献给你们每一个人——献给所有正在寻找自己声音的人，也献给每一个相信“被听见的方式不止一种”的人。",
  ],
  paragraphsEn: [
    "The Voice of Penny is a short film co-produced by Infinite Minds Academy (IMA) and a student team from Universiti Malaya. It follows a nonspeaking autistic girl who finds her voice through painting—a journey reflecting the potential we see in our students every day.",
    "At IMA, we believe every mind is extraordinary. Since 2013, we have empowered neurodivergent young people—including those with autism, dyslexia, ADHD and other learning differences—through digital technology skills training. Our mission is to nurture creative confidence, financial independence and a future in which every individual is seen and valued.",
    "When the Universiti Malaya team approached us with their idea, we saw an opportunity to bring this mission to a wider audience. The film reflects our everyday work: making space for neurodivergent individuals to express themselves, build industry-relevant skills and be heard.",
    "This film is dedicated to everyone finding their voice, and to everyone who believes there is more than one way to be heard.",
  ],
  credits: [
    { role: "制片人 / 指导老师", roleEn: "Producer / Academic Supervisor", name: "Dr. Rosya Izyanie Shamshudeen（马来亚大学）", nameEn: "Dr. Rosya Izyanie Shamshudeen · Universiti Malaya" },
    { role: "导演与剪辑", roleEn: "Director / Editor", name: "吴骉震 Wu Biaozhen", nameEn: "Wu Biaozhen" },
    { role: "摄影", roleEn: "Cinematography", name: "吴骉震 Wu Biaozhen", nameEn: "Wu Biaozhen" },
    { role: "原创音乐", roleEn: "Original Music", name: "吴骉震 Wu Biaozhen", nameEn: "Wu Biaozhen" },
    { role: "编剧 / 灯光 / 分镜", roleEn: "Screenplay / Lighting / Storyboards", name: "Arun Kumar A/L Rajendran（马来亚大学）", nameEn: "Arun Kumar A/L Rajendran · Universiti Malaya" },
    { role: "声音工程 / 场记 / 联合编剧", roleEn: "Sound Engineering / Script Supervisor / Co-writer", name: "任宇航 Ren Yuhang（马来亚大学）", nameEn: "Ren Yuhang · Universiti Malaya" },
    { role: "佩妮 Penny", roleEn: "Penny", name: "Nur Farhani Samantha Woodford Binti Mohd Tajudin" },
    { role: "母亲 The Mother", roleEn: "The Mother", name: "楊韻霓 Yang Yunni", nameEn: "Yang Yunni" },
    { role: "男导师", roleEn: "Male Trainer", name: "Aaron Yap（IMA）", nameEn: "Aaron Yap · IMA" },
    { role: "女导师", roleEn: "Female Trainer", name: "胡慧雯 Hu Huiwen（马来亚大学）", nameEn: "Hu Huiwen · Universiti Malaya" },
    { role: "联合制作", roleEn: "Co-production", name: "Infinite Minds Academy（IMA）——通过数字艺术教育赋能神经多样性青年。", nameEn: "Infinite Minds Academy (IMA) · Empowering neurodivergent young people through digital arts education." },
  ],
  thanks: "Aaron Yap 及 IMA 全体团队；Dr. Rosya Izyanie Shamshudeen，制片人与指导老师；MOMENTUS 2026 委员会。",
  thanksEn: "Aaron Yap and the IMA team; Dr. Rosya Izyanie Shamshudeen, producer and academic supervisor; the MOMENTUS 2026 Committee.",
  duration: "5:06", cover: "/works/images/voice-of-penny-poster.png", src: bili("BV1fPbC68E9C"),
}
const fire = {
  id: "the-fire-is-on-us", title: "The Fire is On Us「我们该何去何从…」", titleEn: "The Fire is On Us", year: "2025", publishedAt: "2025-11-08", kind: "music",
  role: "作词 · 作曲 · 编曲 · 演唱 · 混音 · 剪辑", roleEn: "Lyrics · Composition · Arrangement · Vocals · Mixing · Editing",
  description: "原创音乐作品。作词、作曲、编曲、演唱、混音与剪辑由 MiKeY_W 完成；视频素材由 jefffffffrey 与彭海涛_Peng_Haitao 提供。",
  descriptionEn: "Original music with lyrics, composition, arrangement, vocals, mixing and editing by MiKeY_W. Video footage by jefffffffrey and 彭海涛_Peng_Haitao.",
  credits: [
    { role: "作词 / 作曲 / 编曲 / 演唱 / 混音 / 剪辑", roleEn: "Lyrics / Composition / Arrangement / Vocals / Mixing / Editing", name: "MiKeY_W", url: "https://space.bilibili.com/17481926" },
    { role: "视频素材", roleEn: "Video Footage", name: "jefffffffrey", url: "https://space.bilibili.com/36190989" },
    { role: "视频素材", roleEn: "Video Footage", name: "彭海涛_Peng_Haitao", url: "https://space.bilibili.com/10642576" },
  ],
  duration: "4:28", cover: "/works/images/the-fire-is-on-us.png", src: bili("BV1G82gBiEfw"),
}
export const videoWorks = [
  penny,
  {
    id: "wake-up-before-2317", title: "勿忘醒来 · Wake Up Before 23:17", titleEn: "Wake Up Before 23:17", year: "2026", publishedAt: "2026-07-06",
    role: "制片 · 摄影 · 剪辑", roleEn: "Producer · Cinematographer · Editor",
    description: "一个饱受创伤的女人在狼藉的公寓中醒来，记忆一片空白，手机上响着闹铃，显示：在 23:17 前醒过来……",
    descriptionEn: "A traumatised woman wakes in a disordered apartment with no memory. An alarm rings on her phone, displaying a warning: wake up before 23:17…",
    credits: [{ role: "制片 / 摄影 / 剪辑", roleEn: "Production / Cinematography / Editing", name: "吴骉震 Wu Biaozhen", nameEn: "Wu Biaozhen" }],
    duration: "6:35", cover: "https://i2.hdslb.com/bfs/archive/76051d3d3d34adb9273bb9b0cbce585955982f43.jpg", coverType: "clock", src: bili("BV1RHT16gEko"),
  },
  fire,
]
export const imageWorks = [
  { id: "chiang-mai", kind: "photography", title: "CHIANG MAI", project: "CHIANG MAI", projectEn: "CHIANG MAI", year: "", src: "/works/images/chiang-mai.jpg" },
  { id: "ima-process-led", kind: "visual", title: "Find the Right Next Step for Your Child", year: "2026", project: "IMA 社媒运营", projectEn: "IMA Social Media", src: "/works/images/ima-process-led.png" },
]
export const musicWorks = [
  { ...fire, title: "The Fire is On Us", project: "Amor Mundi Lab", duration: 268, src: "", videoUrl: fire.src },
]

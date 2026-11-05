"""Import only the owner's designated portfolio subtree, preserving source files."""
from pathlib import Path
from PIL import Image, ImageOps
import json, re, shutil

root = Path(__file__).resolve().parents[1]
source = Path(r'D:\Personal Files\实习&工作材料\联合国实习\吴骉震_材料\作品集')
target = root / 'public/works/application-portfolio'
visuals = []
for p in sorted(source.rglob('*.png')):
    if p.stat().st_size >= 500_000_000:
        continue
    slug = re.sub(r'[^a-z0-9]+', '-', p.stem.lower()).strip('-')
    originals = target / 'originals'
    previews = target / 'previews'
    originals.mkdir(parents=True, exist_ok=True)
    previews.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(p, originals / f'{slug}.png')
    im = ImageOps.exif_transpose(Image.open(p)).convert('RGB')
    width, height = im.size
    im.thumbnail((960, 1400), Image.Resampling.LANCZOS)
    im.save(previews / f'{slug}.webp', quality=85, method=6)
    is_ima = 'Infinite Minds' in str(p)
    momentus = 'Momentus' in str(p)
    project = 'IMA 社媒运营' if is_ima else 'MOMENTUS 2026' if momentus else '网站原型设计'
    project_en = 'IMA Social Media' if is_ima else 'MOMENTUS 2026' if momentus else 'Website Prototypes'
    title = p.stem.replace('_', ' · ')
    w = dict(id='visual-'+slug, kind='visual', title=title, titleEn=title,
             project=project, projectEn=project_en, year='2026' if is_ima or momentus else '',
             src=f'/works/application-portfolio/originals/{slug}.png',
             thumbnail=f'/works/application-portfolio/previews/{slug}.webp', width=width, height=height)
    if p.stem == 'IMDC_Neurofeedback program':
        pdf = p.with_suffix('.pdf')
        shutil.copyfile(pdf, originals / f'{slug}.pdf')
        w['attachment'] = f'/works/application-portfolio/originals/{slug}.pdf'
    visuals.append(w)

papers = [
 ('Wu Biaozhen_Independent Study.docx', '中国嘻哈中的社会政治表达', "Rap and Reality: Exploring Socio-Political Themes in China's Hip-Hop Scene", '清迈大学 · 独立研究', 'Chiang Mai University · Independent Study', '2025', '通过访谈、歌词及受众评论分析，讨论中国嘻哈的身份表达、商业化与规制。', 'Interviews, lyric analysis and audience commentary exploring identity, commercialisation and regulation in Chinese hip-hop.'),
 ('Wu Biaozhen_Popular Culture_Term Paper.docx', '中国古装剧与年轻观众', 'Chinese Traditional Costume Dramas and Young Audience', '清迈大学 · 课程论文', 'Chiang Mai University · Term Paper', '2023', '以年轻观众访谈探讨古装剧消费、文化认同及对中国文化元素的理解。', 'An interview-based study of young viewers, costume drama consumption and interpretations of Chinese cultural identity.'),
 ('Wu Biaozhen_Seminar Report.docx', '中国公立与私立学校的教育选择', 'Rational Choices in Educational Systems: Public Schools vs Private Schools in China', '清迈大学 · 研讨报告', 'Chiang Mai University · Seminar Report', '', '结合选择理论与家庭系统理论，分析教育选择，并反思研讨展示的过程。', 'Education choices examined through Choice Theory and Family Systems Theory, alongside reflection on seminar facilitation.'),
 ('AQA7003 Report.pdf', '福岛排水报道中的媒体命名', "Naming Fukushima: A Critical Discourse Analysis of Media Labels for Japan’s Wastewater Discharge", '马来亚大学 · 小组研究报告', 'University of Malaya · Group Research Report', '', '参与小组研究，以批判话语分析比较日本、中国与西方媒体的命名及框架。', 'A collaborative research report comparing terminology and framing across Japanese, Chinese and Western media using critical discourse analysis.'),
 ('WU BIAOZHEN_Final Report.pdf', '从创作构想到银幕：佩妮寻声记', 'From Treatment to Screen: The Making of The Voice of Penny as a Tool for Autism Awareness and Social Inclusion', '马来亚大学 · 创意媒体项目报告', 'University of Malaya · Creative Media Project Report', '2026', '记录《佩妮寻声记》的创作与制作过程，探讨自闭症认知与社会包容。', 'A production and research report documenting The Voice of Penny and its approach to autism awareness and social inclusion.'),
 ('Wu Biaozhen_Research Proposal.pdf', '抵抗与收编：中国嘻哈青年亚文化', 'Negotiating Resistance and Incorporation: Chinese Hip-hop as a Youth Subculture under Regulation and Commercialisation', '马来亚大学 · 研究计划', 'University of Malaya · Research Proposal', '', '围绕规制与商业化背景下的中国嘻哈青年亚文化，提出研究问题与质性研究设计。', 'A proposal outlining research questions and a qualitative design for Chinese hip-hop as a youth subculture under regulation and commercialisation.'),
]
research = []
for i, (filename, title, title_en, project, project_en, year, description, description_en) in enumerate(papers):
    p = next(source.rglob(filename))
    slug = ['rap-and-reality', 'costume-dramas', 'education-choices', 'naming-fukushima', 'penny-production-report', 'hip-hop-proposal'][i]
    folder = target / 'research'
    folder.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(p, folder / (slug+p.suffix))
    research.append(dict(id=slug, title=title, titleEn=title_en, project=project, projectEn=project_en,
                         year=year, description=description, descriptionEn=description_en,
                         format=p.suffix[1:].upper(), src=f'/works/application-portfolio/research/{slug}{p.suffix}'))
(root/'src/applicationPortfolio.js').write_text('// Imported from the owner-designated portfolio folder.\nexport const visualCatalog = '+json.dumps(visuals, ensure_ascii=False, indent=2)+'\n\nexport const researchWorks = '+json.dumps(research, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(f'Imported {len(visuals)} visual designs, {len(research)} research documents and 1 companion PDF.')

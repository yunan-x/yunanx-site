// One-off import of the Webflow static mirror (site/) into Payload.
// Safe to rerun: media is matched by filename, documents by slug, globals are overwritten.
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { JSDOM } from 'jsdom'
import { getPayload, type Payload } from 'payload'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import config from '../../src/payload.config'

const SITE = path.resolve('site')
const ASSET_ROOT = '/assets/6924abf1e391624479f3243c/'

// Webflow hero covers come from CSS, not markup.
const COVERS: Record<string, string> = {
  default: '694fa7d81dfa28e89fc3ea6b_hero_bg.avif',
  tg0: '695006cee6db04c47f521564_Group_117552.avif',
  lolo: '69523217554883f9bb3e7505_logo-header.svg',
  privasea: '69523c1c77a96780907c6888_presentation_teaser.avif',
  sudio: '695e29f2b52d1005c1a36558_3_1.webp',
}
const SLUG_FIX: Record<string, string> = { caplliaryflow: 'capillaryflow' }
const HOME_WEB = ['viking', 'tg0', 'privasea', 'lolo']
const HOME_ART = ['sudio', 'freepower', 'yuhei', 'capillaryflow']

const doc = (rel: string) => new JSDOM(readFileSync(path.join(SITE, rel), 'utf8')).window.document
const text = (el: Element | null | undefined) => el?.textContent?.replace(/\s+/g, ' ').trim() ?? ''
const cls = (el: Element) => Array.from(el.classList)
const has = (el: Element, c: string) => el.classList.contains(c)

let payload: Payload
let editorConfig: Awaited<ReturnType<typeof editorConfigFactory.default>>
const mediaCache = new Map<string, number>()

/** Upload a file from site/ once; later calls return the same media id. */
async function media(src: string | null | undefined, alt = ''): Promise<number | undefined> {
  if (!src || src.startsWith('data:')) return undefined
  const rel = src.replace(/^\//, '').split('?')[0]
  if (mediaCache.has(rel)) return mediaCache.get(rel)!
  const file = path.join(SITE, rel)
  if (!existsSync(file)) { console.warn('missing asset', rel); return undefined }
  // Webflow names are "<id>_<name>"; keep the readable part.
  const filename = path.basename(rel).replace(/^[0-9a-f]{24}_/, '')
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1, pagination: false })
  let id = existing.docs[0]?.id
  if (!id) {
    const created = await payload.create({ collection: 'media', data: { alt }, filePath: file, overwriteExistingFiles: true })
    id = created.id
    console.log('  media', filename)
  }
  mediaCache.set(rel, id)
  return id
}

const imgSrc = (img: Element | null | undefined) => img?.getAttribute('src') ?? null

/** A Webflow background-video element → { mp4, webm, poster }. */
async function video(el: Element | null | undefined) {
  if (!el) return undefined
  const [mp4, webm] = (el.getAttribute('data-video-urls') ?? '').split(',')
  return { mp4: await media(mp4), webm: await media(webm), poster: await media(el.getAttribute('data-poster-url')) }
}

const lexical = (html: string) => convertHTMLToLexical({ editorConfig, html, JSDOM })

async function upsert<T extends 'projects' | 'works'>(collection: T, slug: string, data: Record<string, unknown>) {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, pagination: false })
  if (existing.docs[0]) return payload.update({ collection, id: existing.docs[0].id, data: data as never })
  return payload.create({ collection, data: { slug, ...data } as never })
}

async function seedSettings() {
  const d = doc('index.html')
  const logo = d.querySelector('.brand .logo_default')
  const logoHover = d.querySelector('.brand .logo_hover')
  const social = []
  for (const a of d.querySelectorAll('.footer a.w-inline-block')) {
    const href = a.getAttribute('href') ?? ''
    const label = href.startsWith('mailto:') ? 'Email' : href.includes('instagram') ? 'Instagram' : href.includes('linkedin') ? 'LinkedIn' : href
    social.push({ label, href, icon: await media(imgSrc(a.querySelector('img')), label) })
  }
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      logo: await media(imgSrc(logo), 'Yunan'),
      logoHover: await media(imgSrc(logoHover), 'Yunan'),
      nav: Array.from(d.querySelectorAll('.nav_linkwrap a')).map((a) => ({ label: text(a), href: a.getAttribute('href') ?? '/' })),
      social,
      siteName: 'Yunan',
      favicon: await media(ASSET_ROOT + '6946e7953c57125b13a60fef_U-favicon.jpg'),
      appleTouchIcon: await media(ASSET_ROOT + '6946e7972363a9c2aa1d37ee_U-Webclip.jpg'),
    },
  })
  console.log('site-settings')
}

async function seedHome(projectIds: Record<string, number>) {
  const d = doc('index.html')
  const hero = d.querySelector('.sec_hero .col_65')!
  const cells = d.querySelectorAll('.w-layout-cell.gap_xs')
  const workedWith = Array.from(cells[0].querySelectorAll('.flex_skills p')).map((p) => ({ label: text(p) }))
  // Skills: a bold title row followed by a description paragraph.
  const skills: { title: string; text: string }[] = []
  for (const strong of cells[1].querySelectorAll('strong')) {
    const next: Element | null = strong.closest('.flex_skills')!.nextElementSibling
    const desc = next?.matches('p') ? next : next?.querySelector('p')
    skills.push({ title: text(strong).replace(/:$/, ''), text: text(desc) })
  }
  const videos = d.querySelectorAll('.w-background-video')
  const brands = []
  for (const img of d.querySelectorAll('.img_brands')) brands.push({ logo: await media(imgSrc(img)) })
  await payload.updateGlobal({
    slug: 'home',
    data: {
      eyebrow: text(hero.querySelector(':scope > p')),
      heading: text(hero.querySelector('h1')),
      intro: text(hero.querySelector('.p_large')),
      heroVideo: await video(videos[0]),
      photo: await media(imgSrc(d.querySelector('.img_herophoto')), 'Yunan Xing'),
      workedWith,
      skills,
      featuredVideo: await video(videos[1]),
      featuredText: text(d.querySelector('.flex_work .col_80')),
      selectedWork: Array.from(d.querySelectorAll('.flex_work .col_30 .flex_spac')).map((row) => ({ year: text(row.children[0]), client: text(row.children[1]) })),
      webHeading: text(d.querySelector('.section:not(.dark) .wrap > h3')),
      webProjects: HOME_WEB.map((s) => projectIds[s]),
      webVideoTop: await video(videos[2]),
      webVideoBottom: await video(videos[3]),
      artHeading: text(d.querySelector('.section.dark h3')),
      artProjects: HOME_ART.map((s) => projectIds[s]),
      archiveHeading: text(d.querySelector('.move_wrap h2')),
      brandsHeading: text(d.querySelector('h3.p_100')),
      brands,
    },
  })
  console.log('home')
}

async function seedAbout() {
  const d = doc('about/index.html')
  await payload.updateGlobal({
    slug: 'about',
    data: {
      heading: text(d.querySelector('h1')),
      bio: lexical(`<p>${d.querySelector('.paragraph-3')!.innerHTML.replace(/<br\s*\/?>\s*<br\s*\/?>/g, '</p><p>')}</p>`),
      buttonLabel: text(d.querySelector('a.button')),
      photo: await media(imgSrc(d.querySelector('.img_herophoto')), 'Yunan Xing'),
      timelineHeading: text(d.querySelector('p.subhead')),
      timelineDesktop: await media(imgSrc(d.querySelector('.img_desktop')), 'Timeline of Yunan\'s education and work'),
      timelineMobile: await media(imgSrc(d.querySelector('.img_mobile')), 'Timeline of Yunan\'s education and work'),
      showContactForm: true,
    },
  })
  console.log('about')
}

async function seedContact() {
  const d = doc('contact/index.html')
  const action = d.querySelector('form')?.getAttribute('action') ?? ''
  await payload.updateGlobal({
    slug: 'contact',
    data: {
      heading: text(d.querySelector('.form_wrap h1')),
      subheading: text(d.querySelector('.form_wrap > p')),
      formspreeId: action.split('/').pop() ?? '',
      successMessage: text(d.querySelector('.w-form-done')),
      errorMessage: text(d.querySelector('.w-form-fail')),
    },
  })
  console.log('contact')
}

async function seedWorks() {
  const list = doc('work/index.html')
  const items = Array.from(list.querySelectorAll('.w-dyn-item a.folder'))
  for (const [order, a] of items.entries()) {
    const slug = (a.getAttribute('href') ?? '').split('/').pop()!
    const d = doc(`work/${slug}/index.html`)
    const gallery = []
    for (const img of d.querySelectorAll('.col_65 img:not(.w-dyn-bind-empty)')) gallery.push({ image: await media(imgSrc(img)) })
    await upsert('works', slug, {
      title: text(d.querySelector('h1')),
      order,
      year: text(a.querySelectorAll('.flex_spac p')[1]),
      category: text(d.querySelector('.subhead')),
      heroImage: await media(imgSrc(d.querySelector('.img_hero')), text(d.querySelector('h1'))),
      body: lexical(d.querySelector('.w-richtext')?.innerHTML ?? ''),
      gallery,
      _status: 'published',
    })
    console.log('work', slug)
  }
}

const widthOf = (el: Element) => (cls(el).find((c) => /^img_(40|60|75|100)$/.test(c)) ?? 'img_100').slice(4)

/** Translate one Webflow section's children into content blocks. */
async function contentBlocks(section: Element) {
  const blocks: Record<string, unknown>[] = []
  const consumed = new Set<Element>()
  const walk = async (el: Element) => {
    if (consumed.has(el)) return
    // Intro: heading column + facts column.
    if (has(el, 'grid_2') && el.querySelector('.h_project')) {
      const [left, right] = Array.from(el.children)
      const facts = right?.querySelector(':scope > p')
      const mediaEl = right?.querySelector('img, .w-background-video, [data-animation-type="lottie"]')
      let mediaData: Record<string, unknown> = { kind: 'none' }
      if (mediaEl?.matches('img')) mediaData = { kind: 'image', image: await media(imgSrc(mediaEl)), width: widthOf(mediaEl) }
      else if (mediaEl?.classList.contains('w-background-video')) mediaData = { kind: 'video', video: await video(mediaEl) }
      else if (mediaEl) mediaData = { kind: 'lottie', lottie: await media(mediaEl.getAttribute('data-src')), width: widthOf(mediaEl) }
      blocks.push({
        blockType: 'intro',
        heading: text(left.querySelector('.h_project')),
        subtitle: text(left.querySelector('.subhead')) || undefined,
        lightSubtitle: Boolean(left.querySelector('.subhead.light')),
        facts: facts ? lexical(`<p>${facts.innerHTML}</p>`) : undefined,
        media: mediaData,
      })
      consumed.add(el)
      return
    }
    if (el.matches('.w-layout-grid') && !el.querySelector('p, h1, h2, h3')) {
      const imgs = Array.from(el.querySelectorAll('img'))
      const n = (cls(el).find((c) => /^grid_\d$/.test(c)) ?? 'grid_3').slice(5)
      if (n === '2' && imgs.length === 2) blocks.push({ blockType: 'twoUp', left: await media(imgSrc(imgs[0])), right: await media(imgSrc(imgs[1])), gap: !has(el, 'gap_0') })
      else {
        const images = []
        for (const img of imgs) images.push({ image: await media(imgSrc(img)) })
        blocks.push({ blockType: 'grid', columns: ['3', '4', '8'].includes(n) ? n : '3', images })
      }
      consumed.add(el)
      return
    }
    if (el.matches('img')) {
      blocks.push({ blockType: 'image', image: await media(imgSrc(el)), width: widthOf(el), multiply: has(el, 'img_multiply_blending') })
      return
    }
    if (has(el, 'w-background-video')) {
      blocks.push({ blockType: 'video', video: await video(el), size: has(el, 'video_300') ? '300' : 'full' })
      return
    }
    if (el.getAttribute('data-animation-type') === 'lottie') {
      blocks.push({ blockType: 'lottie', lottie: await media(el.getAttribute('data-src')), loop: el.getAttribute('data-loop') === '1' })
      return
    }
    if (el.matches('h1, h2, h3, p')) {
      const heading = el.matches('h1, h2, h3') ? el : null
      const body = heading ? (heading.nextElementSibling?.matches('p') ? heading.nextElementSibling : null) : el
      if (body) consumed.add(body)
      blocks.push({
        blockType: 'text',
        heading: heading ? text(heading) : undefined,
        headingSize: heading?.matches('h1') ? 'h1' : heading?.matches('h2') ? 'h2' : 'h3',
        body: body ? lexical(`<p>${body.innerHTML}</p>`) : undefined,
      })
      return
    }
    for (const child of Array.from(el.children)) await walk(child)
  }
  await walk(section)
  return blocks
}

async function seedProjects(): Promise<Record<string, number>> {
  const home = doc('index.html')
  const list = doc('work/index.html')
  const ids: Record<string, number> = {}
  const cards = Array.from(list.querySelectorAll('.grid_3 .case_cell a'))
  for (const [order, card] of cards.entries()) {
    const oldSlug = (card.getAttribute('href') ?? '').split('/').pop()!
    const slug = SLUG_FIX[oldSlug] ?? oldSlug
    const d = doc(`projects/${oldSlug}/index.html`)
    const homeCard = home.querySelector(`a[href="/projects/${oldSlug}"]`)
    const homeCell = homeCard?.closest('.case_cell')
    const sections = Array.from(d.querySelectorAll('body > section')).filter((s) => !has(s, 'footer') && !has(s, 'casestudy'))

    // Hero: the first section when it is one of the three Webflow hero patterns.
    let hero: Record<string, unknown> = { kind: 'none' }
    const first = sections[0]
    if (first && has(first, 'sec_project')) {
      const variant = cls(first).find((c) => c in COVERS && c !== 'default') ?? 'default'
      hero = { kind: 'cover', variant, image: await media(ASSET_ROOT + COVERS[variant], text(d.querySelector('.h_project'))) }
      sections.shift()
    } else if (first && has(first, 'sec_hero') && first.querySelector('img.img_75')) {
      hero = { kind: 'image', image: await media(imgSrc(first.querySelector('img.img_75')), text(d.querySelector('.h_project'))) }
      sections.shift()
    } else if (first?.querySelector('.video_fullhero')) {
      hero = { kind: 'video', video: await video(first.querySelector('.video_fullhero')) }
      sections.shift()
    }

    const layout = []
    for (const s of sections) {
      const content = await contentBlocks(s)
      if (!content.length) continue
      const c = cls(s)
      layout.push({
        blockType: 'section',
        padding: c.includes('section_0pad') ? 'section_0pad' : c.includes('sec_hero') ? 'sec_hero' : 'section',
        background: c.includes('lolo_ui') && c.includes('white') ? 'lolo_ui white' : c.find((x) => ['grey', 'dark', 'bg_grid', 'bg_waterdrop', 'bg_chip', 'deepsea', 'lolo_ui'].includes(x)) ?? 'default',
        contained: Boolean(s.querySelector('.contain')),
        content,
      })
    }

    const title = text(homeCell?.querySelector('.flex_spac p') ?? card.parentElement?.querySelector('.flex_spac p'))
    const created = await upsert('projects', slug, {
      title,
      order,
      hero,
      layout,
      subtitle: text(homeCell?.querySelectorAll('.flex_spac p')[1]) || undefined,
      cardImage: await media(imgSrc(homeCard?.querySelector('img') ?? card.querySelector('img')), title),
      listImage: await media(imgSrc(card.querySelector('img')), title),
      greyCard: Boolean(homeCard?.querySelector('.img_case_grey')),
      _status: 'published',
    })
    ids[slug] = created.id
    console.log('project', slug, `${layout.length} sections`)
  }
  return ids
}

async function main() {
  payload = await getPayload({ config })
  editorConfig = await editorConfigFactory.default({ config: await config })
  await seedSettings()
  await seedContact()
  await seedAbout()
  await seedWorks()
  const projectIds = await seedProjects()
  await seedHome(projectIds)
  console.log('done')
  process.exit(0)
}

main().catch((e) => { console.error(e); process.exit(1) })

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { preload } from 'react-dom'
import { Sections } from '@/components/Blocks'
import { CaseStudies } from '@/components/Cards'
import { BgVideo, Img, mediaUrl } from '@/components/Media'
import { findAll, findBySlug } from '@/lib/payload'
import { seoMetadata } from '@/lib/seo'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const projects = await findAll('projects', 0)
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await findBySlug('projects', slug, 0)
  if (!project) return {}
  return seoMetadata(project.meta, project.title, `/projects/${slug}`)
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const [project, all] = await Promise.all([findBySlug('projects', slug, 3), findAll('projects')])
  if (!project) notFound()
  const hero = project.hero
  const variant = hero?.variant && hero.variant !== 'default' ? ` ${hero.variant}` : ''
  // The cover is a CSS background, which the browser's preload scanner cannot see.
  if (hero?.kind === 'cover' && mediaUrl(hero.image)) preload(mediaUrl(hero.image)!, { as: 'image', fetchPriority: 'high' })
  return (
    <>
      {hero?.kind === 'cover' && mediaUrl(hero.image) && <section className={`sec_project${variant}`} style={{ backgroundImage: `url("${mediaUrl(hero.image)}")` }} />}
      {hero?.kind === 'image' && (
        <section className={`sec_hero${variant}`}>
          {hero.variant === 'freepower' ? (
            <Img media={hero.image} className="img_75" sizes="75vw" loading="eager" />
          ) : (
            <div className="w-layout-vflex wrap aligne_center_center">
              <Img media={hero.image} className="img_75" sizes="75vw" loading="eager" />
            </div>
          )}
        </section>
      )}
      {hero?.kind === 'video' && (
        <section>
          <BgVideo video={hero.video} className="video_fullhero" />
        </section>
      )}
      <Sections layout={project.layout} />
      <CaseStudies projects={all} current={slug} />
    </>
  )
}

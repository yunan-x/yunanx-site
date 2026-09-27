import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WorkFolders } from '@/components/Cards'
import { Img } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { findAll, findBySlug } from '@/lib/payload'
import { seoMetadata } from '@/lib/seo'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const works = await findAll('works', 0)
  return works.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const work = await findBySlug('works', slug, 1)
  if (!work) return {}
  return seoMetadata(work.meta, work.title, `/work/${slug}`)
}

export default async function WorkItemPage({ params }: Props) {
  const { slug } = await params
  const [work, all] = await Promise.all([findBySlug('works', slug), findAll('works')])
  if (!work) notFound()
  return (
    <>
      <section className="section_0pad">
        <Img media={work.heroImage} className="img_hero" sizes="100vw" loading="eager" />
      </section>
      <section>
        <div className="w-layout-blockcontainer contain w-container">
          <div className="wrap">
            <div className="w-layout-hflex flex_fill tablet_v">
              <div className="col_30 tablet_v">
                <div className="sticky_wrap">
                  <h1 className="h2">{work.title}</h1>
                  <p className="subhead">{work.category}</p>
                  <RichText data={work.body} className="w-richtext" />
                </div>
              </div>
              <div className="col_65 gap_m tablet_v">
                {(work.gallery ?? []).map((g) => (
                  <Img key={g.id} media={g.image} sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <WorkFolders works={all.filter((w) => w.slug !== slug)} heading="View more projects" small />
    </>
  )
}

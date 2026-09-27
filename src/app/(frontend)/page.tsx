import type { Metadata } from 'next'
import { Fragment } from 'react'
import { asDocs, CaseCard, WorkFolders } from '@/components/Cards'
import { BgVideo, Img } from '@/components/Media'
import { findAll, findGlobal } from '@/lib/payload'
import { seoMetadata } from '@/lib/seo'
import type { Project } from '@/payload-types'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const home = await findGlobal('home')
  return seoMetadata(home.meta, 'Yunan | Senior digital product designer and art director', '/')
}

const dog = '/assets/6924abf1e391624479f3243c/69470cf1a6bca65e5d7d1042_dog.svg'
const flower = '/assets/6924abf1e391624479f3243c/6946e94bd1a011b132339240_flower.avif'

function Divider({ heading, icon }: { heading?: string; icon: string }) {
  return (
    <div className="w-layout-hflex aligne_center_center gap_m">
      {heading && <h2 className="p_100">{heading}</h2>}
      <div className="line" />
      <img src={icon} loading="lazy" alt="" className="img_dog" />
    </div>
  )
}

function CasePair({ projects, grey }: { projects: Project[]; grey?: boolean }) {
  return (
    <div className={grey ? 'col_70' : 'col_80'}>
      <div className="w-layout-layout stack wf-layout-layout">
        {projects.map((p) => (
          <CaseCard key={p.id} project={p} grey={grey} />
        ))}
      </div>
    </div>
  )
}

export default async function HomePage() {
  const [home, works] = await Promise.all([findGlobal('home'), findAll('works')])
  const web = asDocs<Project>(home.webProjects)
  const art = asDocs<Project>(home.artProjects)

  return (
    <>
      <section className="sec_hero">
        <div className="container_hero">
          <div className="wrap hero">
            <div className="w-layout-hflex flex_hero">
              <div className="col_65 gap_s">
                {home.eyebrow && <p>{home.eyebrow}</p>}
                <h1>{home.heading}</h1>
                {home.intro && <p className="p_large">{home.intro}</p>}
                <BgVideo video={home.heroVideo} className="video_hero" />
              </div>
              <div className="col_30">
                <div className="stick">
                  <Img media={home.photo} className="img_herophoto" sizes="(max-width: 991px) 100vw, 30vw" loading="eager" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="contain">
          <div className="wrap">
            <div className="w-layout-layout stack wf-layout-layout">
              <div className="w-layout-cell gap_xs">
                <p className="subhead">WORKED WITH</p>
                {(home.workedWith ?? []).map((w) => (
                  <div key={w.id} className="w-layout-hflex flex_skills">
                    <img src="/assets/6924abf1e391624479f3243c/6946fc1319135a7a851ae8b7_Ellipse_blue.svg" loading="lazy" width={12} alt="" className="icon_circle_blue" />
                    <p className="p_100">{w.label}</p>
                    <div className="line" />
                  </div>
                ))}
              </div>
              <div className="w-layout-cell gap_xs">
                <p className="subhead">SKILLS</p>
                {(home.skills ?? []).map((s) => (
                  <Fragment key={s.id}>
                    <div className="w-layout-hflex flex_skills">
                      <img src="/assets/6924abf1e391624479f3243c/6946fe21e59d9bc4ff5847a0_Ellipse_white.svg" loading="lazy" width={12} alt="" className="icon_circle_blue" />
                      <p className="p_100"><strong>{s.title}</strong></p>
                    </div>
                    <div className="w-layout-hflex flex_skills">
                      <p>{s.text}</p>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="contain">
          <Divider icon={flower} />
          <div className="wrap">
            <div className="w-layout-hflex flex_work">
              <div className="col_65 gap_s">
                <BgVideo video={home.featuredVideo} className="project_video" />
                {home.featuredText && <p className="col_80">{home.featuredText}</p>}
              </div>
              <div className="col_30 gap_xs">
                <p className="subhead">Selected work</p>
                {(home.selectedWork ?? []).map((row) => (
                  <div key={row.id} className="w-layout-hflex flex_spac">
                    <p>{row.year}</p>
                    <p>{row.client}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="contain">
          <div className="wrap">
            <Divider heading="Case study" icon={dog} />
          </div>
          <div className="wrap">
            <h3>{home.webHeading}</h3>
            <div className="w-layout-hflex flex_case">
              <CasePair projects={web.slice(0, 2)} />
              <div className="col_20">
                <div className="w-layout-vflex case_cell">
                  <BgVideo video={home.webVideoTop} className="small_video" />
                </div>
              </div>
            </div>
          </div>
          <div className="wrap">
            <div className="w-layout-hflex flex_case">
              <CasePair projects={web.slice(2, 4)} />
              <div className="case_cell">
                <BgVideo video={home.webVideoBottom} className="small_video" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="contain">
          <div className="wrap">
            <h3>{home.artHeading}</h3>
            <div className="w-layout-hflex flex_case right">
              <CasePair projects={art.slice(0, 2)} grey />
            </div>
          </div>
          <div className="wrap">
            <div className="w-layout-hflex flex_case right">
              <CasePair projects={art.slice(2, 4)} grey />
            </div>
          </div>
        </div>
        <img src={flower} loading="lazy" alt="" className="flower" />
      </section>

      <WorkFolders works={works} heading={home.archiveHeading ?? 'Old & New Archive'} marquee />

      <section className="section">
        <div className="contain">
          <div className="wrap">
            <div className="w-layout-hflex aligne_center_center gap_m">
              <h3 className="p_100">{home.brandsHeading}</h3>
              <div className="line" />
              <img src={dog} loading="lazy" alt="" className="img_dog" />
            </div>
          </div>
          <div className="wrap">
            <div className="w-layout-hflex flex_wrap gap_m">
              {(home.brands ?? []).map((b) => (
                <Img key={b.id} media={b.logo} className="img_brands" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

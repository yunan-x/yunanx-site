import Link from 'next/link'
import type { Project, Work } from '@/payload-types'
import { Img } from './Media'

export const asDocs = <T,>(list: (T | number)[] | null | undefined): T[] =>
  (list ?? []).filter((d): d is T => typeof d === 'object' && d !== null)

/** Home-page case card: image, name, category. */
export function CaseCard({ project, grey, bottomAlign }: { project: Project; grey?: boolean; bottomAlign?: boolean }) {
  return (
    <div className="w-layout-cell case_cell">
      <Link href={`/projects/${project.slug}`} className={`case_wrap${bottomAlign ? ' bottom_align' : ''} w-inline-block`} aria-label={project.title}>
        <Img media={project.cardImage} className={grey ? 'img_case_grey' : 'img_case'} sizes="(max-width: 767px) 100vw, 526px" />
      </Link>
      <div className="w-layout-hflex flex_spac">
        <p className="p_100">{project.title}</p>
        <div className="line" />
        {project.subtitle && <p className="p_100">{project.subtitle}</p>}
      </div>
    </div>
  )
}

/** Work page grid card: image and name only. */
export function ListCard({ project }: { project: Project }) {
  return (
    <div className="w-layout-vflex case_cell">
      <Link href={`/projects/${project.slug}`} className="case_wrap w-inline-block" aria-label={project.title}>
        <Img media={project.listImage ?? project.cardImage} className="img_case" sizes="(max-width: 767px) 100vw, 526px" />
      </Link>
      <div className="w-layout-hflex flex_spac">
        <p className="p_100">{project.title}</p>
        <div className="line" />
      </div>
    </div>
  )
}

// The Webflow "Case studies" footer alternates small and regular cells in a fixed rhythm.
const SMALL_SLOTS = [true, false, true, true, true, false, false, true]

/** "Case studies" grid at the bottom of every project page. */
export function CaseStudies({ projects, current }: { projects: Project[]; current?: string }) {
  return (
    <section className="section casestudy">
      <div className="contain">
        <div className="w-layout-vflex wrap gap_m">
          <div className="w-layout-hflex aligne_center_center gap_s">
            <img src="/assets/6924abf1e391624479f3243c/6946e94bd1a011b132339240_flower.avif" loading="lazy" alt="" className="icon_48" />
            <h2 className="p_100">Case studies</h2>
          </div>
          <div className="w-layout-grid grid_case">
            {projects.map((p, i) => (
              <div key={p.id} className={`w-layout-vflex case_cell${SMALL_SLOTS[i % SMALL_SLOTS.length] ? ' small' : ''}`}>
                <Link href={`/projects/${p.slug}`} className={`case_wrap small w-inline-block${p.slug === current ? ' w--current' : ''}`} aria-current={p.slug === current ? 'page' : undefined} aria-label={p.title}>
                  <Img media={p.listImage ?? p.cardImage} className="img_case" sizes="(max-width: 767px) 100vw, 526px" />
                </Link>
                <div className="w-layout-hflex flex_spac">
                  <p className="p_100">{p.title}</p>
                  <div className="line" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** "Old & New Archive" folder list. */
export function WorkFolders({ works, heading, marquee, small }: { works: Work[]; heading: string; marquee?: boolean; small?: boolean }) {
  return (
    <section className="section">
      <div className="contain">
        <div className="wrap">
          <div className={`w-layout-hflex move_wrap${marquee ? ' marquee' : ''}`}>
            {marquee ? (
              <>
                <h2 className="jubo">{heading}</h2>
                <h2 className="jubo" aria-hidden="true">{heading}</h2>
              </>
            ) : small ? (
              <h3>{heading}</h3>
            ) : (
              <h2>{heading}</h2>
            )}
          </div>
        </div>
        <div className="wrap">
          <div className="w-dyn-list">
            <div role="list" className="project_list w-dyn-items">
              {works.map((w) => (
                <div key={w.id} role="listitem" className="w-dyn-item">
                  <Link href={`/work/${w.slug}`} className="folder w-inline-block">
                    <img src="/assets/6924abf1e391624479f3243c/694bb533d0a9f0ac00ce1816_folder_top.svg" loading="lazy" width={70} alt="" className="folder_head" />
                    <div className="w-layout-vflex folder_wrap">
                      <div className="w-layout-vflex gap_xs padd_m">
                        <div className="w-layout-hflex flex_spac">
                          <p className="p_large">{w.title}</p>
                          <p className="p_large">{w.year}</p>
                        </div>
                        <p>{w.category}</p>
                      </div>
                      <Img media={w.heroImage} className="img_folder" sizes="(max-width: 767px) 100vw, 480px" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

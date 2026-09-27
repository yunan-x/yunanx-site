import type { Metadata } from 'next'
import { ListCard, WorkFolders } from '@/components/Cards'
import { findAll, findGlobal } from '@/lib/payload'

export const revalidate = 60

export const metadata: Metadata = { title: "Yunan's work", alternates: { canonical: '/work' } }

export default async function WorkPage() {
  const [projects, works, home] = await Promise.all([findAll('projects'), findAll('works'), findGlobal('home', 0)])
  return (
    <>
      <section className="section">
        <div className="contain">
          <div className="wrap">
            <h1 className="sr-only">Work</h1>
            <div className="w-layout-grid grid_3">
              {projects.map((p) => (
                <ListCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <WorkFolders works={works} heading={home.archiveHeading ?? 'Old & New Archive'} />
    </>
  )
}

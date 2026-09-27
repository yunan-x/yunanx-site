import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { Img } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { findGlobal } from '@/lib/payload'
import { seoMetadata } from '@/lib/seo'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const about = await findGlobal('about')
  return seoMetadata(about.meta, 'About Yunan', '/about')
}

export default async function AboutPage() {
  const [about, contact] = await Promise.all([findGlobal('about'), findGlobal('contact')])
  return (
    <>
      <section className="section">
        <div className="contain">
          <div className="w-layout-vflex wrap aligne_center_center">
            <div className="w-layout-hflex center_wrap">
              <div className="col_65 gap_s">
                <h1>{about.heading}</h1>
                <RichText data={about.bio} className="paragraph-3" />
                {about.showContactForm && about.buttonLabel && (
                  <div className="w-layout-hflex gap_s">
                    <a href="#contact" className="button w-button">{about.buttonLabel}</a>
                  </div>
                )}
              </div>
              <div className="col_50">
                <div className="stick">
                  <Img media={about.photo} className="img_herophoto" sizes="(max-width: 991px) 100vw, 50vw" loading="eager" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="w-layout-blockcontainer contain w-container">
          <div className="w-layout-vflex wrap aligne_center_center">
            <div className="w-layout-vflex center_wrap">
              {about.timelineHeading && <p className="subhead">{about.timelineHeading}</p>}
              <Img media={about.timelineDesktop} className="img_desktop" />
              <Img media={about.timelineMobile} className="img_mobile" />
            </div>
          </div>
        </div>
      </section>
      {about.showContactForm && <ContactForm contact={contact} headingLevel="h2" />}
    </>
  )
}

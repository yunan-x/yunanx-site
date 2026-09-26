import type { SiteSetting } from '@/payload-types'
import { Img } from './Media'
import { Brand } from './Nav'

export function Footer({ settings }: { settings: SiteSetting }) {
  return (
    <section className="section footer">
      <div className="contain">
        <div className="wrap">
          <div className="w-layout-hflex flex_spac">
            <div className="w-layout-hflex aligned_left_center gap_s">
              <Brand settings={settings} />
              {(settings.social ?? []).map((s) => (
                <a key={s.href} href={s.href} target={s.href.startsWith('mailto:') ? undefined : '_blank'} rel={s.href.startsWith('mailto:') ? undefined : 'noopener'} className="w-inline-block" aria-label={s.label}>
                  <Img media={s.icon} className="img_some" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

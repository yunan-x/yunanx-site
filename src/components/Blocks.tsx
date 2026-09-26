import type { Project } from '@/payload-types'
import { Lottie } from './Lottie'
import { BgVideo, Img, mediaUrl } from './Media'
import { RichText } from './RichText'

type Section = NonNullable<Project['layout']>[number]
type Content = NonNullable<Section['content']>[number]

const widthClass = (w: string | null | undefined) => (w && w !== '100' ? `img_${w}` : undefined)

function ContentBlock({ block }: { block: Content }) {
  switch (block.blockType) {
    case 'image':
      return <Img media={block.image} className={[widthClass(block.width), block.multiply ? 'img_multiply_blending' : ''].filter(Boolean).join(' ') || undefined} />
    case 'twoUp':
      return (
        <div className={`w-layout-grid grid_2${block.gap === false ? ' gap_0' : ''}`}>
          <Img media={block.left} />
          <Img media={block.right} />
        </div>
      )
    case 'grid':
      return (
        <div className={`w-layout-grid grid_${block.columns ?? '3'}`}>
          {(block.images ?? []).map((row) => (
            <Img key={row.id} media={row.image} />
          ))}
        </div>
      )
    case 'text': {
      const Tag = block.headingSize === 'h1' ? 'h1' : block.headingSize === 'h2' ? 'h2' : 'h3'
      return (
        <div className="w-layout-grid grid_2">
          {block.heading && <Tag className={block.headingSize === 'h1' ? 'h_project' : undefined}>{block.heading}</Tag>}
          <RichText data={block.body} />
        </div>
      )
    }
    case 'intro': {
      const media = block.media
      return (
        <div className="w-layout-grid grid_2">
          <div className="w-layout-vflex gap_s">
            <h1 className="h_project">{block.heading}</h1>
            {block.subtitle && <p className={`subhead${block.lightSubtitle ? ' light' : ''}`}>{block.subtitle}</p>}
          </div>
          <div className={`w-layout-vflex gap_s${media?.kind === 'video' ? ' aligne_center_center' : ''}`}>
            <RichText data={block.facts} />
            {media?.kind === 'image' && <Img media={media.image} className={widthClass(media.width)} />}
            {media?.kind === 'video' && <BgVideo video={media.video} className="video_300" />}
            {media?.kind === 'lottie' && mediaUrl(media.lottie) && <Lottie src={mediaUrl(media.lottie)!} className={widthClass(media.width) ?? 'lottie'} />}
          </div>
        </div>
      )
    }
    case 'video':
      return <BgVideo video={block.video} className={block.size === '300' ? 'video_300' : 'video_fullhero'} />
    case 'lottie':
      return mediaUrl(block.lottie) ? <Lottie src={mediaUrl(block.lottie)!} loop={Boolean(block.loop)} className="lottie" /> : null
    default:
      return null
  }
}

export function Sections({ layout }: { layout: Project['layout'] }) {
  return (
    <>
      {(layout ?? []).map((section) => {
        const content = (section.content ?? []).map((b) => <ContentBlock key={b.id} block={b} />)
        const cls = [section.padding ?? 'section', section.background && section.background !== 'default' ? section.background : ''].filter(Boolean).join(' ')
        return (
          <section key={section.id} className={cls}>
            {section.contained === false ? (
              <div className="w-layout-vflex wrap aligne_center_center">{content}</div>
            ) : (
              <div className="contain">
                <div className="w-layout-vflex wrap aligne_center_center gap_m">{content}</div>
              </div>
            )}
          </section>
        )
      })}
    </>
  )
}

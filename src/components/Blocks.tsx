import type { Project } from '@/payload-types'
import { Lottie } from './Lottie'
import { BgVideo, Img, mediaUrl } from './Media'
import { RichText } from './RichText'

type Section = NonNullable<Project['layout']>[number]
type Row = NonNullable<Section['rows']>[number]
type Content = NonNullable<Row['content']>[number]
type Visual = Extract<Content, { blockType: 'twoUp' }>['left']

const widthClass = (w: string | null | undefined) => (w === 'icon' ? 'icon_64' : w && w !== '100' ? `img_${w}` : undefined)

function VisualSlot({ v }: { v: Visual }) {
  if (v?.kind === 'lottie') return mediaUrl(v.lottie) ? <Lottie src={mediaUrl(v.lottie)!} className={widthClass(v.width) ?? 'lottie'} /> : null
  const cls = widthClass(v?.width)
  // Webflow centred sized images inside a flex box; full-width ones sit straight in the grid.
  return cls ? (
    <div className="w-layout-vflex aligne_center_center">
      <Img media={v?.image} className={cls === 'img_100' ? undefined : cls} />
    </div>
  ) : (
    <Img media={v?.image} />
  )
}

function ContentBlock({ block }: { block: Content }) {
  switch (block.blockType) {
    case 'image':
      return <Img media={block.image} className={[widthClass(block.width), block.multiply ? 'img_multiply_blending' : ''].filter(Boolean).join(' ') || undefined} />
    case 'twoUp':
      return (
        <div className={`w-layout-grid grid_2${block.gap === false ? ' gap_0' : ''}`}>
          <VisualSlot v={block.left} />
          <VisualSlot v={block.right} />
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
    case 'text':
      return (
        <div className="w-layout-grid grid_2">
          <div className="grid_right">
            <RichText data={block.body} />
          </div>
        </div>
      )
    case 'columns': {
      const Tag = block.headingSize === 'h2' ? 'h2' : block.headingSize === 'h3' ? 'h3' : 'h1'
      const media = block.media
      return (
        <div className="w-layout-grid grid_2">
          <div className="w-layout-vflex gap_s">
            {block.heading && <Tag className={Tag === 'h1' ? 'h_project' : undefined}>{block.heading}</Tag>}
            {block.subtitle && <p className={`subhead${block.lightSubtitle ? ' light' : ''}`}>{block.subtitle}</p>}
            <Img media={block.leftImage} className={widthClass(block.leftImageWidth)} />
          </div>
          <div className={`w-layout-vflex gap_s${block.centerRight === false ? '' : ' aligne_center_center'}`}>
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
      return mediaUrl(block.lottie) ? <Lottie src={mediaUrl(block.lottie)!} loop={Boolean(block.loop)} className={widthClass(block.width) ?? 'lottie'} /> : null
    default:
      return null
  }
}

const WRAP: Record<string, string | null> = {
  center: 'w-layout-vflex wrap aligne_center_center',
  'center gap': 'w-layout-vflex wrap aligne_center_center gap_m',
  wrap: 'wrap',
  vflex: 'w-layout-vflex wrap',
  none: null,
}

function RowBlock({ row }: { row: Row }) {
  const content = (row.content ?? []).map((b) => <ContentBlock key={b.id} block={b} />)
  const cls = WRAP[row.wrapper ?? 'center']
  const inner = cls ? <div className={cls}>{content}</div> : <>{content}</>
  // `.contain` only sets side margins, so one per row renders the same as Webflow's shared one.
  return row.contained === false ? inner : <div className="contain">{inner}</div>
}

export function Sections({ layout }: { layout: Project['layout'] }) {
  return (
    <>
      {(layout ?? []).map((section) => {
        const cls = [section.padding === 'none' ? '' : section.padding ?? 'section', section.background && section.background !== 'default' ? section.background : '']
          .filter(Boolean)
          .join(' ')
        return (
          <section key={section.id} className={cls || undefined}>
            {(section.rows ?? []).map((r) => (
              <RowBlock key={r.id} row={r} />
            ))}
          </section>
        )
      })}
    </>
  )
}

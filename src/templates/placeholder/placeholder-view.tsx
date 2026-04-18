import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import type { PlaceholderTemplateSettings } from '@/templates/settings-types'
import {
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from '@/lib/thumbnail/constants'

type Tone = 'software' | 'graphics' | 'marketing'

type Props = {
  settings: PlaceholderTemplateSettings
  tone: Tone
}

const toneStyles: Record<
  Tone,
  { from: string; to: string; ink: string; sub: string }
> = {
  software: {
    from: '#0f172a',
    to: '#172554',
    ink: '#f1f5f9',
    sub: '#94a3b8',
  },
  graphics: {
    from: '#4c1d95',
    to: '#db2777',
    ink: '#fdf4ff',
    sub: '#fbcfe8',
  },
  marketing: {
    from: '#fff7ed',
    to: '#fed7aa',
    ink: '#9a3412',
    sub: '#c2410c',
  },
}

export function makePlaceholderThumbnailView(
  tone: Tone,
): ComponentType<{ settings: PlaceholderTemplateSettings }> {
  return function PlaceholderThumbnailView({
    settings,
  }: {
    settings: PlaceholderTemplateSettings
  }) {
    return <PlaceholderView settings={settings} tone={tone} />
  }
}

export function PlaceholderView({ settings, tone }: Props) {
  const { t } = useTranslation()
  const palette = toneStyles[tone]
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 p-12 text-center"
      style={{
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        background: `linear-gradient(145deg, ${palette.from}, ${palette.to})`,
        color: palette.ink,
      }}
    >
      <p
        className="rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80"
        style={{ color: palette.sub }}
      >
        {t('editor.previewBadge')}
      </p>
      <h2
        className="max-w-[85%] text-balance text-5xl font-bold leading-tight"
        style={{ textShadow: '0 4px 30px rgba(0,0,0,0.25)' }}
      >
        {settings.title}
      </h2>
      <p className="max-w-lg text-lg opacity-90" style={{ color: palette.sub }}>
        {t('editor.placeholderCanvas')}
      </p>
    </div>
  )
}

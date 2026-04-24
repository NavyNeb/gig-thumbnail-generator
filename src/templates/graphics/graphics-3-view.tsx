import { Blend, Layers, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from '@/lib/thumbnail/constants'
import {
  paddedSkillIcons,
  skillIconVisibleSlotCount,
} from '@/lib/thumbnail/skill-icon-slots'
import {
  GRAPHICS3_MAX_SKILL_ICONS,
  type Graphics3Settings,
} from '@/templates/settings-types'

type Props = {
  settings: Graphics3Settings
}

/** Flowing wave layer — breaks the “flat square” canvas */
function WaveLayer({
  fill,
  fill2,
}: {
  fill: string
  fill2: string
}) {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 right-0 h-[55%] w-full"
      viewBox="0 0 1280 420"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0 120 C280 40 520 200 780 100 C980 20 1120 80 1280 40 L1280 420 L0 420 Z"
        fill={fill}
        fillOpacity={0.35}
      />
      <path
        d="M0 200 C340 120 600 280 880 160 C1040 100 1180 140 1280 110 L1280 420 L0 420 Z"
        fill={fill2}
        fillOpacity={0.25}
      />
    </svg>
  )
}

const ORGANIC_RADIUS = '58% 42% 62% 38% / 48% 52% 43% 57%'

export function Graphics3View({ settings }: Props) {
  const { t } = useTranslation()
  const g0 = settings.gradientFrom ?? '#1e1b4b'
  const g1 = settings.gradientVia ?? '#5b21b6'
  const g2 = settings.gradientTo ?? '#9d174d'
  const ink = settings.ink ?? '#fafafa'
  const ag = settings.accentGraphic ?? '#f472b6'
  const au = settings.accentUi ?? '#38bdf8'

  const tags = [settings.tag1, settings.tag2, settings.tag3]
    .map((s) => s.trim())
    .filter(Boolean)

  const skillSlots = paddedSkillIcons(
    settings.skillIcons,
    GRAPHICS3_MAX_SKILL_ICONS,
  )
  const visibleSkillSlots = skillIconVisibleSlotCount(
    settings.skillIcons,
    GRAPHICS3_MAX_SKILL_ICONS,
  )

  return (
    <div
      className="relative overflow-hidden font-sans antialiased"
      style={{
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        background: `linear-gradient(128deg, ${g0} 0%, ${g1} 48%, ${g2} 100%)`,
        color: ink,
      }}
    >
      {/* Soft orbits — circles only, no boxes */}
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: ag }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full opacity-20 blur-3xl"
        style={{ background: au }}
        aria-hidden
      />

      <WaveLayer fill={g1} fill2={au} />

      {/* Curved ribbon accent */}
      <svg
        className="pointer-events-none absolute top-[8%] right-[8%] h-40 w-64 opacity-40"
        viewBox="0 0 200 120"
        fill="none"
        aria-hidden
      >
        <path
          d="M10 100 Q80 20 190 40"
          stroke={ag}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative z-10 flex h-full flex-row items-center pb-14">
        <div className="flex min-w-0 max-w-[48%] shrink-0 flex-col justify-center py-8 pl-[72px] pr-4">
          <span
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold tracking-[0.22em] uppercase"
            style={{
              background: `linear-gradient(90deg, ${ag}33, ${au}33)`,
              border: `1px solid ${ink}33`,
              color: ink,
            }}
          >
            <Blend className="size-3.5 shrink-0" style={{ color: ag }} aria-hidden />
            {settings.badgeText}
          </span>

          <h1
            className="text-[50px] font-black leading-[0.98] tracking-tight text-balance"
            style={{ color: ink }}
          >
            {settings.headlineLine1}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${ag}, ${au})`,
              }}
            >
              {settings.headlineLine2}
            </span>
          </h1>

          <p className="mt-5 max-w-[460px] text-[17px] font-medium leading-snug text-balance opacity-90">
            {settings.subline}
          </p>

          {tags.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-2.5">
              {tags.map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="rounded-full px-4 py-2 text-[13px] font-bold tracking-wide"
                  style={{
                    backgroundColor: `${ink}14`,
                    border: `1px solid ${ink}28`,
                    color: ink,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {Array.from({ length: visibleSkillSlots }, (_, i) => {
              const src = skillSlots[i]?.trim()
              if (src) {
                return (
                  <div
                    key={`${i}-${src.slice(0, 24)}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 p-1.5 shadow-lg"
                    style={{
                      borderColor: `${ink}35`,
                      backgroundColor: `${ink}12`,
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                      draggable={false}
                    />
                  </div>
                )
              }
              return (
                <div
                  key={`g3-ph-${i}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-dashed p-1.5 opacity-60"
                  style={{ borderColor: `${ink}40` }}
                  aria-hidden
                >
                  <Layers className="size-5" style={{ color: ink }} strokeWidth={2} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Organic hero + circular UI detail — no rectangles */}
        <div className="relative flex min-w-0 flex-1 items-center justify-center pr-[56px]">
          <div
            className="relative -ml-20"
            style={{ transform: 'rotate(-5deg)' }}
          >
            <div
              className="relative overflow-hidden shadow-2xl"
              style={{
                width: 400,
                height: 460,
                borderRadius: ORGANIC_RADIUS,
                border: `4px solid ${ink}25`,
                boxShadow: `0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px ${au}40`,
              }}
            >
              {settings.primaryImage ? (
                <img
                  src={settings.primaryImage}
                  alt=""
                  className="size-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-4 bg-black/20 p-8">
                  <Sparkles className="size-16 opacity-50" style={{ color: ag }} aria-hidden />
                  <p className="text-center text-[13px] font-bold tracking-widest uppercase opacity-60">
                    {t('editor.graphics3.primaryEmpty')}
                  </p>
                </div>
              )}

              {/* Mini UI echo: floating “chrome” capsule — not a square window */}
              <div
                className="absolute top-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border px-3 py-1.5 shadow-md backdrop-blur-md"
                style={{
                  borderColor: `${ink}35`,
                  backgroundColor: `${ink}18`,
                }}
              >
                <span className="size-2 rounded-full bg-rose-400/90" />
                <span className="size-2 rounded-full bg-amber-300/90" />
                <span className="size-2 rounded-full bg-emerald-400/90" />
                <span
                  className="ml-1 text-[10px] font-bold tracking-wider uppercase opacity-70"
                  style={{ color: ink }}
                >
                  {t('editor.graphics3.chromeMicro')}
                </span>
              </div>
            </div>

            {/* Detail orbit — UI crop or mark */}
            <div
              className="absolute -bottom-2 -left-10 z-20 overflow-hidden rounded-full border-[5px] shadow-2xl"
              style={{
                width: 120,
                height: 120,
                borderColor: `${ink}55`,
                boxShadow: `0 16px 40px rgba(0,0,0,0.35), 0 0 0 4px ${ag}55`,
              }}
            >
              {settings.detailImage ? (
                <img
                  src={settings.detailImage}
                  alt=""
                  className="size-full object-cover"
                  draggable={false}
                />
              ) : (
                <div
                  className="flex size-full items-center justify-center text-[11px] font-bold leading-tight opacity-50"
                  style={{
                    color: ink,
                    background: `conic-gradient(from 180deg, ${au}22, ${ag}18, transparent)`,
                  }}
                >
                  {t('editor.graphics3.detailEmpty')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center py-3.5 text-[12px] font-bold tracking-[0.2em] uppercase opacity-85"
        style={{
          color: ink,
          background: `linear-gradient(90deg, transparent, ${ink}12, transparent)`,
          borderTop: `1px solid ${ink}20`,
        }}
      >
        {settings.footerTag}
      </div>
    </div>
  )
}

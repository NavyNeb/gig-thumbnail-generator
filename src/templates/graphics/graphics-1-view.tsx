import { PenLine, Sparkles } from 'lucide-react'
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
  GRAPHICS1_MAX_SKILL_ICONS,
  type Graphics1Settings,
} from '@/templates/settings-types'

type Props = {
  settings: Graphics1Settings
}

/** Hand-authored SVG decor — vector-poster feel, no external assets */
function VectorBackdrop({
  accent1,
  accent2,
  ink,
}: {
  accent1: string
  accent2: string
  ink: string
}) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1280 769"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M-40 520 C180 380 320 680 520 560 C720 440 900 620 1120 480 C1220 420 1320 520 1380 400 L1380 820 L-40 820 Z"
        fill={accent2}
        fillOpacity={0.22}
      />
      <path
        d="M980 -60 C1120 40 1180 200 1080 320 C980 440 820 380 760 240 C700 100 840 -40 980 -60 Z"
        fill={accent1}
        fillOpacity={0.28}
      />
      <circle cx="180" cy="140" r="120" stroke={ink} strokeWidth="3" fill="none" opacity={0.12} />
      <circle cx="1180" cy="620" r="90" stroke={accent1} strokeWidth="4" fill="none" opacity={0.35} />
      <path
        d="M90 200 L130 220 L110 260 L70 240 Z"
        fill={accent1}
        fillOpacity={0.35}
      />
      <path
        d="M1120 180 L1160 200 L1140 250 L1080 230 Z"
        fill={accent2}
        fillOpacity={0.4}
      />
      <path
        d="M640 40 Q720 100 680 180 Q640 260 560 200 Q480 140 520 60 Q560 -20 640 40 Z"
        fill={accent1}
        fillOpacity={0.15}
      />
      <path
        d="M200 600 Q260 520 360 560 Q460 600 420 680 Q380 760 280 720 Q180 680 200 600 Z"
        stroke={ink}
        strokeWidth="2.5"
        fill="none"
        opacity={0.14}
      />
      {/* Squiggle stroke */}
      <path
        d="M40 360 Q200 300 360 380 T680 340 T1000 400"
        stroke={accent2}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity={0.45}
      />
    </svg>
  )
}

export function Graphics1View({ settings }: Props) {
  const { t } = useTranslation()
  const bg = settings.bgBase ?? '#f4f0e8'
  const ink = settings.ink ?? '#1a1a2e'
  const a1 = settings.accent1 ?? '#e11d48'
  const a2 = settings.accent2 ?? '#0d9488'

  const features = [
    settings.featureLine1,
    settings.featureLine2,
    settings.featureLine3,
  ].map((s) => s.trim()).filter(Boolean)

  const skillSlots = paddedSkillIcons(
    settings.skillIcons,
    GRAPHICS1_MAX_SKILL_ICONS,
  )
  const visibleSkillSlots = skillIconVisibleSlotCount(
    settings.skillIcons,
    GRAPHICS1_MAX_SKILL_ICONS,
  )

  return (
    <div
      className="relative overflow-hidden font-sans antialiased"
      style={{
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        backgroundColor: bg,
        color: ink,
      }}
    >
      <VectorBackdrop accent1={a1} accent2={a2} ink={ink} />

      <div className="relative z-10 flex h-full flex-row pb-14">
        {/* Copy column */}
        <div className="flex min-w-0 max-w-[52%] flex-1 flex-col justify-center py-10 pl-[72px] pr-6">
          <span
            className="mb-4 inline-flex w-fit rounded-full border-2 px-4 py-1.5 text-[12px] font-bold tracking-[0.2em] uppercase"
            style={{ borderColor: ink, color: ink, opacity: 0.85 }}
          >
            {settings.badgeText}
          </span>

          <h1
            className="text-[54px] font-black leading-[0.98] tracking-tight text-balance"
            style={{ color: ink }}
          >
            {settings.headlineLine1}
            <br />
            <span style={{ color: a1 }}>{settings.headlineLine2}</span>
          </h1>

          <p className="mt-5 max-w-[480px] text-[18px] font-medium leading-snug text-balance opacity-90">
            {settings.subline}
          </p>

          {features.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-2.5">
              {features.map((line, i) => (
                <span
                  key={`${line}-${i}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 bg-white/75 px-4 py-2 text-[14px] font-semibold shadow-sm backdrop-blur-sm"
                  style={{ borderColor: ink, color: ink }}
                >
                  <Sparkles className="size-4 shrink-0" style={{ color: a2 }} aria-hidden />
                  {line}
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
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black/10 bg-white/90 p-1.5 shadow-md"
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
                  key={`g1-ph-${i}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-black/20 bg-white/40 p-1.5"
                  aria-hidden
                >
                  <PenLine className="size-5 text-black/35" strokeWidth={2} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Showcase — tilted “artboard” */}
        <div className="relative flex min-w-0 flex-1 items-center justify-center pr-[72px] pl-2">
          <div
            className="relative"
            style={{ transform: 'rotate(-5deg)' }}
          >
            <div
              className="overflow-hidden rounded-[32px] shadow-[12px_18px_0_0_rgba(0,0,0,0.12)]"
              style={{
                width: 400,
                aspectRatio: '4 / 5',
                border: `5px solid ${ink}`,
                backgroundColor: '#fff',
              }}
            >
              {settings.showcaseImage ? (
                <img
                  src={settings.showcaseImage}
                  alt=""
                  className="size-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-4 bg-linear-to-br from-white to-neutral-100 p-8">
                  <div
                    className="grid size-full max-h-[85%] max-w-[85%] place-items-center rounded-2xl border-2 border-dashed opacity-40"
                    style={{ borderColor: ink }}
                  >
                    <PenLine className="size-20" strokeWidth={1.25} style={{ color: ink }} />
                  </div>
                  <p
                    className="text-center text-[12px] font-bold tracking-widest uppercase opacity-50"
                    style={{ color: ink }}
                  >
                    {t('editor.graphics1.showcaseEmpty')}
                  </p>
                </div>
              )}
            </div>
            {/* Vector corner ticks */}
            <div
              className="pointer-events-none absolute -left-3 -top-3 size-8 border-l-4 border-t-4"
              style={{ borderColor: a1 }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-3 -bottom-3 size-8 border-b-4 border-r-4"
              style={{ borderColor: a2 }}
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center border-t-2 py-3.5 text-[13px] font-bold tracking-wide uppercase opacity-80"
        style={{ borderColor: ink, color: ink, backgroundColor: `${bg}ee` }}
      >
        {settings.footerTag}
      </div>
    </div>
  )
}

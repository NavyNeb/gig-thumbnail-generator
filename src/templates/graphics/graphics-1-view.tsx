import { PenLine, Sparkles, Star } from 'lucide-react'
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

type Props = { settings: Graphics1Settings }

const SERIF_STACK =
  'Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif'

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
        d="M-40 560 C200 420 380 700 580 580 C780 460 940 640 1160 500 C1240 460 1320 540 1380 440 L1380 820 L-40 820 Z"
        fill={accent2}
        fillOpacity={0.18}
      />
      <path
        d="M960 -80 C1140 40 1220 220 1100 360 C980 500 800 420 720 260 C640 100 800 -40 960 -80 Z"
        fill={accent1}
        fillOpacity={0.22}
      />
      <circle cx="160" cy="120" r="100" stroke={ink} strokeWidth="2.5" fill="none" opacity={0.1} />
      <circle cx="1180" cy="640" r="80" stroke={accent1} strokeWidth="3" fill="none" opacity={0.32} />
      <path d="M90 220 L130 240 L110 280 L70 260 Z" fill={accent1} fillOpacity={0.35} />
      <path d="M1130 200 L1170 220 L1150 270 L1090 250 Z" fill={accent2} fillOpacity={0.4} />
      <path
        d="M40 380 Q200 320 360 400 T680 360 T1000 420"
        stroke={accent2}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity={0.45}
      />
      {/* Crosshatch ornament */}
      <g stroke={ink} strokeWidth="1.2" opacity={0.12}>
        <line x1="60" y1="660" x2="200" y2="660" />
        <line x1="60" y1="670" x2="200" y2="670" />
        <line x1="60" y1="680" x2="200" y2="680" />
      </g>
    </svg>
  )
}

export function Graphics1View({ settings }: Props) {
  const { t } = useTranslation()
  const bg = settings.bgBase
  const ink = settings.ink
  const a1 = settings.accent1
  const a2 = settings.accent2

  const features = [
    settings.featureLine1,
    settings.featureLine2,
    settings.featureLine3,
  ]
    .map((s) => s.trim())
    .filter(Boolean)

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

      {/* Magazine masthead */}
      <div
        className="relative z-10 flex items-center justify-between border-b-2 px-[64px] py-3 font-mono text-[10px] tracking-[0.32em] uppercase"
        style={{ borderColor: ink, color: ink }}
      >
        <div className="flex items-center gap-3">
          <Star className="size-3" style={{ color: a1 }} fill={a1} />
          <span>No 04 / Vector Studio</span>
        </div>
        <div className="opacity-70">EST. MMXXVI · ISSN 04-26</div>
      </div>

      <div className="relative z-10 grid h-[calc(100%-7rem)] grid-cols-12 gap-8 px-[64px] py-9">
        {/* COPY — left column */}
        <div className="col-span-7 flex min-w-0 flex-col">
          <span
            className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border-2 px-3.5 py-1 text-[11px] font-bold tracking-[0.22em] uppercase"
            style={{ borderColor: ink, color: ink }}
          >
            <Sparkles className="size-3" style={{ color: a1 }} />
            {settings.badgeText}
          </span>

          <h1
            className="text-[64px] leading-[0.94] tracking-tight text-balance"
            style={{
              fontFamily: SERIF_STACK,
              fontWeight: 500,
              color: ink,
            }}
          >
            {settings.headlineLine1}
            <br />
            <span
              style={{
                color: a1,
                fontStyle: 'italic',
              }}
            >
              {settings.headlineLine2}
            </span>
          </h1>

          <p
            className="mt-5 max-w-[480px] text-[17px] font-medium leading-snug text-balance"
            style={{ color: ink, opacity: 0.85 }}
          >
            {settings.subline}
          </p>

          {features.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {features.map((line, i) => (
                <span
                  key={`${line}-${i}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 bg-white/85 px-3.5 py-1.5 text-[13px] font-semibold shadow-[3px_3px_0_rgba(0,0,0,0.08)] backdrop-blur-sm"
                  style={{ borderColor: ink, color: ink }}
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: i === 0 ? a1 : i === 1 ? a2 : ink }}
                  />
                  {line}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-auto flex flex-wrap items-center gap-2.5">
            {Array.from({ length: visibleSkillSlots }, (_, i) => {
              const src = skillSlots[i]?.trim()
              if (src) {
                return (
                  <div
                    key={`${i}-${src.slice(0, 24)}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 bg-white p-1.5 shadow-[2px_2px_0_rgba(0,0,0,0.12)]"
                    style={{ borderColor: ink }}
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
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed bg-white/40 p-1.5"
                  style={{ borderColor: `${ink}40` }}
                  aria-hidden
                >
                  <PenLine
                    className="size-4"
                    style={{ color: `${ink}66` }}
                    strokeWidth={2}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* SHOWCASE — hung gallery frame */}
        <div className="relative col-span-5 flex min-w-0 items-center justify-center">
          {/* Wall hook string */}
          <div
            className="pointer-events-none absolute left-1/2 top-[8%] h-[8%] w-px -translate-x-1/2"
            style={{ background: `${ink}40` }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-[6%] size-2 -translate-x-1/2 rounded-full"
            style={{ background: ink }}
            aria-hidden
          />
          <div className="relative" style={{ transform: 'rotate(-3deg)' }}>
            {/* Mat board behind */}
            <div
              className="absolute inset-0 rounded-[24px]"
              style={{
                background: `${a2}22`,
                transform: 'translate(10px, 12px)',
              }}
              aria-hidden
            />
            <div
              className="relative overflow-hidden rounded-[20px] shadow-[10px_14px_0_rgba(0,0,0,0.15)]"
              style={{
                width: 360,
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
                <div
                  className="flex size-full flex-col items-center justify-center gap-4 p-8"
                  style={{
                    background: `linear-gradient(160deg, #fff 0%, ${a2}11 60%, ${a1}15 100%)`,
                  }}
                >
                  <div
                    className="flex size-full max-h-[80%] max-w-[80%] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed"
                    style={{ borderColor: ink, opacity: 0.4 }}
                  >
                    <PenLine
                      className="size-16"
                      strokeWidth={1.25}
                      style={{ color: ink }}
                    />
                    <p
                      className="text-center text-[12px] font-bold tracking-widest uppercase"
                      style={{ color: ink, opacity: 0.7 }}
                    >
                      {t('editor.graphics1.showcaseEmpty')}
                    </p>
                  </div>
                </div>
              )}
            </div>
            {/* Corner ticks */}
            <div
              className="pointer-events-none absolute -left-3 -top-3 size-7 border-l-4 border-t-4"
              style={{ borderColor: a1 }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-3 -bottom-3 size-7 border-b-4 border-r-4"
              style={{ borderColor: a2 }}
              aria-hidden
            />
            {/* Plate */}
            <div
              className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-md border-2 bg-white px-3 py-1 text-[10px] font-bold tracking-[0.24em] uppercase shadow-md"
              style={{ borderColor: ink, color: ink }}
            >
              Plate I
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t-2 px-[64px] py-3 text-[11px] font-bold tracking-[0.22em] uppercase"
        style={{ borderColor: ink, color: ink, backgroundColor: `${bg}ee` }}
      >
        <span>{settings.footerTag}</span>
        <span className="flex items-center gap-2 opacity-70">
          <Star className="size-3" fill="currentColor" />
          <Star className="size-3" fill="currentColor" />
          <Star className="size-3" fill="currentColor" />
          <Star className="size-3" fill="currentColor" />
          <Star className="size-3" fill="currentColor" />
        </span>
      </div>
    </div>
  )
}

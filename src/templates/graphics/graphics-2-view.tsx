import type { CSSProperties } from 'react'
import {
  LayoutTemplate,
  Layers,
  MousePointer2,
  PenTool,
  Smartphone,
  Users,
} from 'lucide-react'
import {
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from '@/lib/thumbnail/constants'
import {
  paddedSkillIcons,
  skillIconVisibleSlotCount,
} from '@/lib/thumbnail/skill-icon-slots'
import {
  GRAPHICS2_MAX_SKILL_ICONS,
  type Graphics2Settings,
} from '@/templates/settings-types'

type Props = {
  settings: Graphics2Settings
}

const featureIcons = [Users, LayoutTemplate, PenTool] as const

export function Graphics2View({ settings }: Props) {
  const bg = settings.bgBase ?? '#f1f5f9'
  const grid = settings.gridColor ?? '#cbd5e1'
  const ink = settings.ink ?? '#0f172a'
  const accent = settings.accent ?? '#4f46e5'
  const surface = settings.surface ?? '#ffffff'

  const features = [
    settings.featureLine1,
    settings.featureLine2,
    settings.featureLine3,
  ]
    .map((s) => s.trim())
    .filter(Boolean)

  const skillSlots = paddedSkillIcons(
    settings.skillIcons,
    GRAPHICS2_MAX_SKILL_ICONS,
  )
  const visibleSkillSlots = skillIconVisibleSlotCount(
    settings.skillIcons,
    GRAPHICS2_MAX_SKILL_ICONS,
  )

  const gridBg: CSSProperties = {
    backgroundColor: bg,
    backgroundImage: `
      linear-gradient(to right, ${grid} 1px, transparent 1px),
      linear-gradient(to bottom, ${grid} 1px, transparent 1px)
    `,
    backgroundSize: '32px 32px',
  }

  return (
    <div
      className="relative overflow-hidden font-sans antialiased"
      style={{
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        ...gridBg,
        color: ink,
      }}
    >
      {/* Soft vignette + accent wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 100% 40%, ${accent}18 0%, transparent 55%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-row pb-14">
        <div className="flex min-w-0 max-w-[54%] flex-1 flex-col justify-center py-10 pl-[72px] pr-6">
          <span
            className="mb-4 inline-flex w-fit rounded-md px-3 py-1.5 text-[11px] font-bold tracking-[0.18em] text-white uppercase shadow-sm"
            style={{ backgroundColor: accent }}
          >
            {settings.badgeText}
          </span>

          <h1
            className="text-[52px] font-black leading-[1.02] tracking-tight text-balance"
            style={{ color: ink }}
          >
            {settings.headlineLine1}
            <br />
            <span style={{ color: accent }}>{settings.headlineLine2}</span>
          </h1>

          <p className="mt-5 max-w-[500px] text-[17px] font-medium leading-snug text-balance opacity-90">
            {settings.subline}
          </p>

          {features.length > 0 ? (
            <div className="mt-8 flex flex-col gap-3">
              {features.map((line, i) => {
                const Icon = featureIcons[i % featureIcons.length]
                return (
                  <div
                    key={`${line}-${i}`}
                    className="flex max-w-[440px] items-center gap-3 rounded-xl border-2 border-dashed px-4 py-3 shadow-sm"
                    style={{
                      borderColor: `${ink}33`,
                      backgroundColor: `${surface}f2`,
                    }}
                  >
                    <span
                      className="flex size-10 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${accent}18`, color: accent }}
                    >
                      <Icon className="size-5" strokeWidth={2} aria-hidden />
                    </span>
                    <span className="text-[15px] font-semibold leading-snug">
                      {line}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {Array.from({ length: visibleSkillSlots }, (_, i) => {
              const src = skillSlots[i]?.trim()
              if (src) {
                return (
                  <div
                    key={`${i}-${src.slice(0, 24)}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm"
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
                  key={`g2-ph-${i}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white/60 p-1.5"
                  aria-hidden
                >
                  <Layers className="size-5 text-slate-400" strokeWidth={2} />
                </div>
              )
            })}
          </div>
        </div>

        {/* Device mockup + UX chrome */}
        <div className="relative flex min-w-0 flex-1 items-center justify-center pr-[72px] pl-4">
          {/* Floating wireframe cards */}
          <div
            className="pointer-events-none absolute top-[14%] right-[28%] z-0 h-24 w-36 rounded-lg border-2 border-dashed opacity-50"
            style={{ borderColor: ink, transform: 'rotate(-8deg)' }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[22%] right-[12%] z-0 h-20 w-28 rounded-lg border-2 border-dashed opacity-40"
            style={{ borderColor: accent, transform: 'rotate(6deg)' }}
            aria-hidden
          />

          <div
            className="relative z-10 flex flex-col items-center"
            style={{ transform: 'rotate(2deg)' }}
          >
            <div
              className="mb-3 flex items-center gap-2 rounded-full border bg-white/90 px-3 py-1.5 text-[12px] font-semibold shadow-md backdrop-blur-sm"
              style={{ borderColor: `${ink}22`, color: ink }}
            >
              <MousePointer2 className="size-3.5 shrink-0" style={{ color: accent }} aria-hidden />
              <span className="opacity-80">{settings.chromeLabel}</span>
            </div>

            <div
              className="relative rounded-[3rem] p-[11px] shadow-2xl"
              style={{
                background: `linear-gradient(145deg, ${ink} 0%, #334155 100%)`,
              }}
            >
              <div
                className="absolute top-3 left-1/2 z-20 h-7 w-24 -translate-x-1/2 rounded-full"
                style={{ backgroundColor: ink }}
                aria-hidden
              />
              <div
                className="relative overflow-hidden rounded-[2.25rem] bg-white"
                style={{
                  width: 300,
                  aspectRatio: '9 / 19.2',
                }}
              >
                {settings.deviceImage ? (
                  <img
                    src={settings.deviceImage}
                    alt=""
                    className="size-full object-cover object-top"
                    draggable={false}
                  />
                ) : (
                  <div className="flex size-full flex-col bg-slate-50 p-5">
                    <div className="mb-4 flex gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-400/80" />
                      <span className="h-2 w-2 rounded-full bg-amber-300/90" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                    </div>
                    <div
                      className="mb-3 h-3 w-2/3 rounded"
                      style={{ backgroundColor: `${accent}35` }}
                    />
                    <div className="mb-2 h-2 w-full rounded bg-slate-200" />
                    <div className="mb-2 h-2 w-[90%] rounded bg-slate-200" />
                    <div className="mb-6 h-2 w-[70%] rounded bg-slate-200" />
                    <div className="grid flex-1 grid-cols-2 gap-3">
                      <div
                        className="rounded-xl border-2 border-dashed border-slate-300 bg-white"
                        style={{ minHeight: 120 }}
                      />
                      <div
                        className="rounded-xl border-2 border-dashed border-slate-300 bg-white"
                        style={{ minHeight: 120 }}
                      />
                    </div>
                    <div className="mt-auto flex justify-center pt-4">
                      <Smartphone className="size-10 text-slate-300" strokeWidth={1.25} aria-hidden />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center border-t py-3.5 text-[12px] font-bold tracking-[0.15em] uppercase"
        style={{
          borderColor: `${ink}18`,
          color: ink,
          backgroundColor: `${surface}ee`,
          backdropFilter: 'blur(8px)',
        }}
      >
        {settings.footerTag}
      </div>
    </div>
  )
}

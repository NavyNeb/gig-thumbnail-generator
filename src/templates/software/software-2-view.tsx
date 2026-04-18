import { Check, Globe, Layers, Phone, Play } from 'lucide-react'

import {
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from '@/lib/thumbnail/constants'
import {
  paddedSkillIcons,
  skillIconVisibleSlotCount,
} from '@/lib/thumbnail/skill-icon-slots'
import {
  SOFTWARE2_MAX_SERVICES,
  SOFTWARE2_MAX_SKILL_ICONS,
  type Software2Settings,
} from '@/templates/settings-types'

type Props = {
  settings: Software2Settings
}

function padServices(items: string[] | undefined): string[] {
  const base = [...(items ?? [])]
  while (base.length < SOFTWARE2_MAX_SERVICES) base.push('')
  return base.slice(0, SOFTWARE2_MAX_SERVICES)
}

/** Hex + alpha for overlays */
function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  if (h.length !== 6) return hex
  const r = Number.parseInt(h.slice(0, 2), 16)
  const g = Number.parseInt(h.slice(2, 4), 16)
  const b = Number.parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export function Software2View({ settings }: Props) {
  const base = settings.navy ?? '#0a0e17'
  const panel = settings.pink ?? '#121a2e'
  const accent = settings.lavender ?? '#3b82f6'
  const services = padServices(settings.serviceItems).map((s) => s.trim())
  const skillSlots = paddedSkillIcons(
    settings.skillIcons,
    SOFTWARE2_MAX_SKILL_ICONS,
  )
  const visibleSkillSlots = skillIconVisibleSlotCount(
    settings.skillIcons,
    SOFTWARE2_MAX_SKILL_ICONS,
  )

  const accentSoft = withAlpha(accent, 0.12)
  const accentLine = withAlpha(accent, 0.35)
  const panelBorder = withAlpha('#ffffff', 0.08)

  return (
    <div
      className="relative overflow-hidden font-sans antialiased"
      style={{
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        backgroundColor: base,
        color: '#f1f5f9',
      }}
    >
      {/* Structural grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${withAlpha('#ffffff', 0.035)} 1px, transparent 1px),
            linear-gradient(to bottom, ${withAlpha('#ffffff', 0.035)} 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
        aria-hidden
      />

      {/* Diagonal vector bands */}
      <div
        className="pointer-events-none absolute -right-[20%] top-[-30%] h-[140%] w-[55%] origin-center rotate-[12deg] opacity-[0.55]"
        style={{
          background: `linear-gradient(105deg, transparent 0%, ${accentSoft} 45%, transparent 70%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[10%] bottom-[-40%] h-[90%] w-[45%] origin-center -rotate-[8deg] opacity-40"
        style={{
          background: `linear-gradient(195deg, transparent 20%, ${withAlpha(accent, 0.06)} 50%, transparent 80%)`,
        }}
        aria-hidden
      />

      {/* Accent frame lines — minimal “blueprint” corners */}
      <svg
        className="pointer-events-none absolute top-10 left-10 z-10 h-24 w-24 opacity-50"
        viewBox="0 0 96 96"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 32V4h28"
          stroke={accentLine}
          strokeWidth="1.5"
          strokeLinecap="square"
        />
        <path
          d="M64 4h28v28"
          stroke={accentLine}
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>

      <div className="relative z-10 flex h-full flex-col px-12 pb-7 pt-10">
        {/* items-start: avoid stretch-tall column breaking aspect-ratio / image clipping */}
        <div className="flex min-h-0 flex-1 flex-row items-start gap-10">
        {/* Copy + services */}
        <div className="flex min-w-0 flex-1 flex-col pr-2">
          <div className="max-w-[560px] space-y-2">
            <h1
              className="text-[52px] font-semibold leading-[1.02] tracking-tight text-balance text-white"
              style={{ textShadow: '0 2px 40px rgba(0,0,0,0.45)' }}
            >
              {settings.headlineLine1}
            </h1>
            <h1
              className="text-[52px] font-semibold leading-[1.02] tracking-tight text-balance"
              style={{
                color: '#e2e8f0',
                textShadow: '0 2px 32px rgba(0,0,0,0.35)',
              }}
            >
              {settings.headlineLine2}
            </h1>
            <div className="pt-2">
              <span
                className="inline-flex items-center rounded-md border px-4 py-2 text-[15px] font-semibold tracking-wide"
                style={{
                  borderColor: withAlpha(accent, 0.55),
                  color: accent,
                  backgroundColor: withAlpha(accent, 0.08),
                }}
              >
                {settings.headlinePill}
              </span>
            </div>
          </div>

          {/* Services panel */}
          <div
            className="relative z-10 mt-9 max-w-[560px] rounded-2xl border p-7 shadow-2xl"
            style={{
              backgroundColor: panel,
              borderColor: panelBorder,
              boxShadow: `0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px ${withAlpha(accent, 0.12)} inset`,
            }}
          >
            <div
              className="absolute top-0 left-10 h-[3px] w-24 rounded-b-md"
              style={{ backgroundColor: accent }}
              aria-hidden
            />
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 pt-1">
              <span
                className="text-[13px] font-semibold tracking-wide text-slate-300 uppercase"
                style={{ letterSpacing: '0.12em' }}
              >
                {settings.servicesSectionTitle}
              </span>
              <div
                className="h-px flex-1 min-w-[40px] opacity-40"
                style={{
                  background: `linear-gradient(90deg, ${accentLine}, transparent)`,
                }}
                aria-hidden
              />
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3.5">
              {services.map((label, i) =>
                label ? (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md"
                      style={{
                        backgroundColor: withAlpha(accent, 0.18),
                        color: accent,
                      }}
                    >
                      <Check className="size-3.5 stroke-[2.5]" aria-hidden />
                    </span>
                    <span className="text-[16px] font-medium leading-snug text-slate-200">
                      {label}
                    </span>
                  </div>
                ) : null,
              )}
            </div>
          </div>

          <div className="mt-6 flex max-w-[560px] flex-wrap items-center gap-3">
            {Array.from({ length: visibleSkillSlots }, (_, i) => {
              const src = skillSlots[i]?.trim()
              if (src) {
                return (
                  <div
                    key={`${i}-${src.slice(0, 24)}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border p-1.5 shadow-inner sm:h-14 sm:w-14"
                    style={{
                      borderColor: withAlpha(accent, 0.35),
                      backgroundColor: withAlpha(accent, 0.08),
                      boxShadow: `0 0 0 1px ${withAlpha('#fff', 0.04)} inset`,
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
                  key={`skill-ph-${i}`}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-dashed p-1.5 shadow-inner sm:h-14 sm:w-14"
                  style={{
                    borderColor: withAlpha(accent, 0.32),
                    backgroundColor: withAlpha(accent, 0.04),
                    boxShadow: `0 0 0 1px ${withAlpha('#fff', 0.03)} inset`,
                  }}
                  aria-hidden
                >
                  <Layers
                    className="size-5 sm:size-6"
                    strokeWidth={1.5}
                    style={{ color: withAlpha(accent, 0.45) }}
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-auto pt-8">
            <div
              className="flex flex-wrap items-center gap-x-10 gap-y-3 rounded-xl border px-5 py-3.5"
              style={{
                borderColor: panelBorder,
                backgroundColor: withAlpha('#000000', 0.35),
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex size-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: withAlpha(accent, 0.2),
                    color: accent,
                  }}
                >
                  <Play className="size-4 fill-current" aria-hidden />
                </span>
                <span className="text-[13px] font-bold tracking-[0.2em] text-white uppercase">
                  {settings.ctaLabel}
                </span>
              </div>
              <div className="hidden h-8 w-px bg-white/10 sm:block" aria-hidden />
              <div className="flex flex-wrap items-center gap-8 text-[14px]">
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="size-4 shrink-0 text-slate-500" />
                  <span>
                    <span className="text-slate-500">
                      {settings.phonePrefix}
                    </span>{' '}
                    <span className="font-medium text-slate-200">
                      {settings.phoneValue}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Globe className="size-4 shrink-0 text-slate-500" />
                  <span>
                    <span className="text-slate-500">
                      {settings.websitePrefix}
                    </span>{' '}
                    <span className="font-medium text-slate-200">
                      {settings.websiteValue}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: brand above hero; hero uses absolute fill so image cannot escape frame */}
        <div className="relative z-20 flex w-[400px] shrink-0 flex-col items-stretch">
          <div className="mb-8 flex w-full flex-col items-end gap-2 text-right">
            {settings.brandLogo ? (
              <img
                src={settings.brandLogo}
                alt=""
                className="block h-12 w-auto max-w-[280px] object-contain object-right"
                draggable={false}
              />
            ) : null}
            {settings.brandName?.trim() ? (
              <div
                className={`max-w-[280px] text-[15px] font-medium leading-snug text-slate-300 ${settings.brandLogo ? 'opacity-95' : 'text-[17px] font-semibold text-slate-100'}`}
                style={
                  settings.brandLogo
                    ? undefined
                    : { textShadow: '0 1px 24px rgba(0,0,0,0.5)' }
                }
              >
                {settings.brandName}
              </div>
            ) : !settings.brandLogo ? (
              <div className="min-h-[1.25rem] w-full" aria-hidden />
            ) : null}
          </div>

          <div className="relative w-full max-w-[400px] shrink-0 self-end">
            <div
              className="pointer-events-none absolute left-1/2 top-[45%] z-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[88px]"
              style={{ background: withAlpha(accent, 0.14) }}
              aria-hidden
            />
            <div
              className="relative z-10 overflow-hidden rounded-[28px] shadow-2xl"
              style={{
                width: '100%',
                maxWidth: 400,
                aspectRatio: '3 / 4',
                border: `2px solid ${withAlpha(accent, 0.55)}`,
                boxShadow: `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px ${withAlpha('#fff', 0.06)} inset`,
              }}
            >
              {settings.heroImage ? (
                <img
                  src={settings.heroImage}
                  alt=""
                  className="absolute inset-0 z-[1] h-full w-full object-cover"
                  draggable={false}
                />
              ) : (
                <div
                  className="absolute inset-0 z-[1] bg-gradient-to-b from-slate-800 to-slate-950"
                  aria-hidden
                />
              )}
              <div
                className="pointer-events-none absolute inset-0 z-[2]"
                style={{
                  background: `linear-gradient(180deg, transparent 55%, ${withAlpha(base, 0.55)} 100%)`,
                }}
                aria-hidden
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

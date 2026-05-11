import { ArrowUpRight, Check, Globe, Layers, Phone } from 'lucide-react'

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

type Props = { settings: Software2Settings }

const SERIF_STACK =
  'Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif'

function padServices(items: string[] | undefined): string[] {
  const base = [...(items ?? [])]
  while (base.length < SOFTWARE2_MAX_SERVICES) base.push('')
  return base.slice(0, SOFTWARE2_MAX_SERVICES)
}

function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  if (h.length !== 6) return hex
  const r = Number.parseInt(h.slice(0, 2), 16)
  const g = Number.parseInt(h.slice(2, 4), 16)
  const b = Number.parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export function Software2View({ settings }: Props) {
  const base = settings.navy
  const panel = settings.pink
  const accent = settings.lavender

  const services = padServices(settings.serviceItems).map((s) => s.trim())
  const skillSlots = paddedSkillIcons(
    settings.skillIcons,
    SOFTWARE2_MAX_SKILL_ICONS,
  )
  const visibleSkillSlots = skillIconVisibleSlotCount(
    settings.skillIcons,
    SOFTWARE2_MAX_SKILL_ICONS,
  )

  return (
    <div
      className="relative overflow-hidden font-sans antialiased text-white"
      style={{
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        backgroundColor: base,
      }}
    >
      {/* Ambient gradient mesh */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(80% 60% at 100% 0%, ${withAlpha(accent, 0.32)} 0%, transparent 55%), radial-gradient(60% 50% at 0% 100%, ${withAlpha(accent, 0.16)} 0%, transparent 50%)`,
        }}
        aria-hidden
      />
      {/* fine isometric grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
        aria-hidden
      />
      {/* large accent ring */}
      <div
        className="pointer-events-none absolute -right-[300px] top-[40%] h-[720px] w-[720px] -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: accent }}
        aria-hidden
      />

      {/* Top meta strip */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 px-14 py-4">
        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.32em] uppercase text-slate-400">
          <span className="size-1.5 rounded-full" style={{ background: accent }} />
          <span>Issue 04</span>
          <span className="opacity-40">·</span>
          <span>Web Development Quarterly</span>
        </div>
        <div className="flex items-center gap-3 text-right">
          {settings.brandLogo ? (
            <img
              src={settings.brandLogo}
              alt=""
              className="h-7 w-auto object-contain"
              draggable={false}
            />
          ) : null}
          {settings.brandName?.trim() ? (
            <div className="text-[13px] font-semibold leading-tight text-white">
              {settings.brandName}
            </div>
          ) : null}
        </div>
      </div>

      <div className="relative z-10 grid h-[calc(100%-7rem)] grid-cols-12 gap-8 px-14 pt-8 pb-4">
        {/* LEFT */}
        <div className="col-span-7 flex min-w-0 flex-col">
          <div className="space-y-1">
            <h1
              className="text-[58px] font-medium leading-[0.98] tracking-tight text-balance text-white"
              style={{ fontFamily: SERIF_STACK }}
            >
              {settings.headlineLine1}
            </h1>
            <h1
              className="text-[58px] leading-[0.98] tracking-tight text-balance"
              style={{
                fontFamily: SERIF_STACK,
                fontStyle: 'italic',
                fontWeight: 500,
                color: accent,
              }}
            >
              {settings.headlineLine2}
            </h1>
          </div>

          <div className="mt-5">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-bold tracking-[0.22em] uppercase"
              style={{
                borderColor: withAlpha(accent, 0.55),
                color: accent,
                backgroundColor: withAlpha(accent, 0.1),
              }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: accent }}
              />
              {settings.headlinePill}
            </span>
          </div>

          {/* Capabilities card */}
          <div
            className="mt-7 max-w-[580px] overflow-hidden rounded-2xl border"
            style={{
              borderColor: '#ffffff15',
              backgroundColor: panel,
              boxShadow: `0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 #ffffff10`,
            }}
          >
            <div
              className="flex items-center justify-between border-b px-6 py-3"
              style={{ borderColor: '#ffffff10' }}
            >
              <span
                className="font-mono text-[11px] font-bold tracking-[0.28em] uppercase text-slate-300"
              >
                {settings.servicesSectionTitle}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="size-1 rounded-full bg-rose-400/70" />
                <span className="size-1 rounded-full bg-amber-300/80" />
                <span
                  className="size-1 rounded-full"
                  style={{ background: accent }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-6 py-5">
              {services.map((label, i) =>
                label ? (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-md"
                      style={{
                        backgroundColor: withAlpha(accent, 0.18),
                        color: accent,
                      }}
                    >
                      <Check className="size-3 stroke-[3]" aria-hidden />
                    </span>
                    <span className="text-[15px] font-medium leading-snug text-slate-100">
                      {label}
                    </span>
                  </div>
                ) : null,
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            {Array.from({ length: visibleSkillSlots }, (_, i) => {
              const src = skillSlots[i]?.trim()
              if (src) {
                return (
                  <div
                    key={`${i}-${src.slice(0, 24)}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border bg-white/[0.05] p-1.5"
                    style={{ borderColor: withAlpha(accent, 0.3) }}
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
                  key={`s2-ph-${i}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-dashed"
                  style={{ borderColor: withAlpha(accent, 0.3) }}
                  aria-hidden
                >
                  <Layers
                    className="size-4 text-white/40"
                    strokeWidth={1.75}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT — hero portrait */}
        <div className="col-span-5 flex min-w-0 items-center justify-end">
          <div className="relative w-full max-w-[360px]">
            {/* Accent block behind */}
            <div
              className="absolute -right-3 -top-3 h-full w-full rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${accent}, transparent 60%)`,
                opacity: 0.35,
              }}
              aria-hidden
            />
            <div
              className="relative overflow-hidden rounded-3xl border-2 shadow-2xl"
              style={{
                aspectRatio: '3 / 4',
                borderColor: withAlpha(accent, 0.6),
                boxShadow: `0 40px 90px rgba(0,0,0,0.55), 0 0 0 1px #ffffff10 inset`,
              }}
            >
              {settings.heroImage ? (
                <img
                  src={settings.heroImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(160deg, ${panel} 0%, ${base} 100%)`,
                  }}
                  aria-hidden
                />
              )}
              {/* Bottom film fade */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, transparent 55%, ${withAlpha(base, 0.85)} 100%)`,
                }}
                aria-hidden
              />
              {/* Caption pill at bottom */}
              <div
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border px-3.5 py-2 backdrop-blur-md"
                style={{
                  borderColor: '#ffffff22',
                  background: withAlpha('#000000', 0.45),
                }}
              >
                <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-slate-300">
                  Featured Build
                </span>
                <ArrowUpRight className="size-3.5" style={{ color: accent }} />
              </div>
            </div>
            {/* Corner ticks */}
            <div
              className="pointer-events-none absolute -left-2 -top-2 h-4 w-4 border-l-2 border-t-2"
              style={{ borderColor: accent }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-2 -bottom-2 h-4 w-4 border-r-2 border-b-2"
              style={{ borderColor: accent }}
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* Footer CTA bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between gap-6 border-t border-white/10 px-14 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div
            className="flex size-9 items-center justify-center rounded-lg"
            style={{ background: accent, color: base }}
          >
            <ArrowUpRight className="size-4" strokeWidth={3} />
          </div>
          <span className="text-[12px] font-bold tracking-[0.22em] uppercase text-white">
            {settings.ctaLabel}
          </span>
        </div>
        <div className="flex items-center gap-6 text-[13px]">
          <div className="flex items-center gap-2 text-slate-300">
            <Phone className="size-3.5 text-slate-400" />
            <span className="text-slate-400">{settings.phonePrefix}</span>
            <span className="font-medium text-white">{settings.phoneValue}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Globe className="size-3.5 text-slate-400" />
            <span className="text-slate-400">{settings.websitePrefix}</span>
            <span className="font-medium text-white">
              {settings.websiteValue}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

import { ArrowUpRight, Check, Globe, Layers, Sparkles, User } from 'lucide-react'

import computerCodeImg from '@/assets/computer-code.png'
import {
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from '@/lib/thumbnail/constants'
import {
  paddedSkillIcons,
  skillIconVisibleSlotCount,
} from '@/lib/thumbnail/skill-icon-slots'
import {
  SOFTWARE3_MAX_SERVICES,
  SOFTWARE3_MAX_SKILL_ICONS,
  type Software3Settings,
} from '@/templates/settings-types'

type Props = { settings: Software3Settings }

const SERIF_STACK =
  'Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif'

function padServices(items: string[] | undefined): string[] {
  const base = [...(items ?? [])]
  while (base.length < SOFTWARE3_MAX_SERVICES) base.push('')
  return base.slice(0, SOFTWARE3_MAX_SERVICES)
}

export function Software3View({ settings }: Props) {
  const white = settings.whitePanel
  const purple = settings.purplePanel
  const orange = settings.orangeAccent
  const pillBg = settings.servicePillBg

  const services = padServices(settings.serviceItems).map((s) => s.trim())
  const skillSlots = paddedSkillIcons(
    settings.skillIcons,
    SOFTWARE3_MAX_SKILL_ICONS,
  )
  const visibleSkillSlots = skillIconVisibleSlotCount(
    settings.skillIcons,
    SOFTWARE3_MAX_SKILL_ICONS,
  )

  return (
    <div
      className="relative overflow-hidden font-sans antialiased"
      style={{
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        backgroundColor: white,
        color: '#0f172a',
      }}
    >
      {/* Diagonal split — purple panel cut at an angle */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[55%]"
        style={{
          backgroundColor: purple,
          clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 6% 100%)',
        }}
        aria-hidden
      />
      {/* Subtle dot pattern on purple side */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[55%] opacity-40"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)`,
          backgroundSize: '14px 14px',
          clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 6% 100%)',
        }}
        aria-hidden
      />
      {/* Subtle warm grain on white side */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-50"
        style={{
          backgroundImage: `radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)`,
          backgroundSize: '14px 14px',
          clipPath: 'polygon(0 0, 22% 0, 10% 100%, 0 100%)',
        }}
        aria-hidden
      />
      {/* Orange accent band — slim diagonal across the cut */}
      <div
        className="pointer-events-none absolute z-[3]"
        style={{
          background: orange,
          width: 8,
          height: '140%',
          top: '-20%',
          left: 'calc(50% - 4px)',
          transform: 'rotate(8deg)',
          opacity: 0.85,
        }}
        aria-hidden
      />

      {/* Top-right brand zone (over purple) */}
      <div className="absolute right-12 top-9 z-30 flex items-center gap-3 text-right">
        <div className="space-y-0.5">
          <p className="text-[16px] font-bold leading-tight text-white">
            {settings.brandName}
          </p>
          <p
            className="text-[11px] font-mono uppercase tracking-[0.24em]"
            style={{ color: '#ffffffaa' }}
          >
            {settings.brandTagline}
          </p>
        </div>
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2"
          style={{
            background: 'rgba(255,255,255,0.1)',
            borderColor: orange,
          }}
        >
          {settings.brandLogo ? (
            <img
              src={settings.brandLogo}
              alt=""
              className="size-full object-contain p-1"
              draggable={false}
            />
          ) : (
            <Sparkles className="size-5" style={{ color: orange }} />
          )}
        </div>
      </div>

      {/* Top-left meta */}
      <div className="absolute left-12 top-9 z-30 flex items-center gap-2 font-mono text-[10px] tracking-[0.32em] uppercase text-slate-500">
        <span className="size-1.5 rounded-full" style={{ background: orange }} />
        <span>Studio · Build</span>
      </div>

      <div className="relative z-10 grid h-full grid-cols-12 gap-6 px-12 pt-24 pb-8">
        {/* LEFT — copy column */}
        <div className="col-span-7 flex min-w-0 flex-col">
          <div>
            <h1
              className="text-[68px] leading-[0.96] tracking-tight"
              style={{
                fontFamily: SERIF_STACK,
                fontWeight: 500,
                color: purple,
              }}
            >
              {settings.headlineLine1}
            </h1>
            <div className="-mt-1 flex flex-wrap items-baseline gap-3">
              <h1
                className="text-[68px] leading-[0.96] tracking-tight"
                style={{
                  fontFamily: SERIF_STACK,
                  fontWeight: 500,
                  fontStyle: 'italic',
                  color: purple,
                }}
              >
                {settings.headlineLine2}
              </h1>
              <span
                className="inline-flex translate-y-[-6px] items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-bold tracking-[0.18em] uppercase text-white shadow-md"
                style={{ background: orange }}
              >
                <Sparkles className="size-3" strokeWidth={2.5} />
                {settings.badgeText}
              </span>
            </div>
          </div>

          <p
            className="mt-4 max-w-[480px] text-[16px] italic leading-snug"
            style={{ color: '#475569' }}
          >
            {settings.tagline}
          </p>

          {/* Service cards 2x2 — premium card with arrow */}
          <div className="mt-6 grid max-w-[520px] grid-cols-2 gap-2.5">
            {services.map((label, i) =>
              label ? (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-xl border bg-white p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                  style={{ borderColor: '#e7e5e4' }}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md"
                      style={{
                        background: `${pillBg}1a`,
                        color: pillBg,
                      }}
                    >
                      <Check className="size-3.5 stroke-[3]" />
                    </span>
                    <span
                      className="min-w-0 text-[13.5px] font-semibold leading-snug"
                      style={{ color: '#0f172a' }}
                    >
                      {label}
                    </span>
                  </div>
                  <ArrowUpRight
                    className="absolute right-2 top-2 size-3.5"
                    style={{ color: orange, opacity: 0.5 }}
                  />
                </div>
              ) : null,
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {Array.from({ length: visibleSkillSlots }, (_, i) => {
              const src = skillSlots[i]?.trim()
              if (src) {
                return (
                  <div
                    key={`${i}-${src.slice(0, 24)}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-white p-1.5 shadow-sm"
                    style={{ borderColor: '#e7e5e4' }}
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
                  key={`s3-ph-${i}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-dashed bg-white/60"
                  style={{ borderColor: `${purple}33` }}
                  aria-hidden
                >
                  <Layers
                    className="size-4"
                    style={{ color: `${purple}80` }}
                    strokeWidth={1.75}
                  />
                </div>
              )
            })}
          </div>

          {/* Author card at bottom */}
          <div
            className="mt-auto flex max-w-[420px] items-center gap-3.5 rounded-2xl border bg-white p-3 shadow-md"
            style={{ borderColor: '#e7e5e4' }}
          >
            <div
              className="relative flex size-[60px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] bg-slate-100"
              style={{ borderColor: orange }}
            >
              {settings.avatarImage ? (
                <img
                  src={settings.avatarImage}
                  alt=""
                  className="size-full object-cover"
                  draggable={false}
                />
              ) : (
                <User
                  className="size-7"
                  strokeWidth={1.5}
                  style={{ color: `${purple}aa` }}
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="truncate text-[15px] font-bold"
                style={{ color: purple }}
              >
                {settings.avatarName}
              </p>
              <p className="truncate text-[12.5px] text-slate-500">
                {settings.avatarRole}
              </p>
            </div>
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-lg"
              style={{ background: `${orange}1a`, color: orange }}
            >
              <ArrowUpRight className="size-4" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* RIGHT — laptop hero floating into purple side */}
        <div className="relative col-span-5 flex min-w-0 flex-col items-end justify-center">
          <div className="pointer-events-none absolute right-[-40px] top-[42%] z-20 w-[520px] -translate-y-1/2">
            <img
              src={computerCodeImg}
              alt=""
              className="h-auto w-full max-w-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
              draggable={false}
            />
          </div>

          {/* Footer info on purple side */}
          <div className="absolute bottom-8 right-12 z-20 max-w-[260px] text-right">
            <p
              className="text-[12px] font-mono uppercase tracking-[0.32em]"
              style={{ color: orange }}
            >
              ↘ {settings.footerHeading}
            </p>
            <div className="mt-2 flex items-center justify-end gap-2 text-[14px] text-white">
              <span className="font-semibold">{settings.websiteUrl}</span>
              <Globe className="size-4 shrink-0 text-white/80" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

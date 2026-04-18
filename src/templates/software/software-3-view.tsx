import type { CSSProperties } from 'react'
import { Check, Globe, Layers, User } from 'lucide-react'

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

type Props = {
  settings: Software3Settings
}

function padServices(items: string[] | undefined): string[] {
  const base = [...(items ?? [])]
  while (base.length < SOFTWARE3_MAX_SERVICES) base.push('')
  return base.slice(0, SOFTWARE3_MAX_SERVICES)
}

function halftoneStyle(light: boolean): CSSProperties {
  return {
    backgroundImage: `radial-gradient(circle, ${
      light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.12)'
    } 1px, transparent 1px)`,
    backgroundSize: '14px 14px',
  }
}

export function Software3View({ settings }: Props) {
  const white = settings.whitePanel ?? '#ffffff'
  const purple = settings.purplePanel ?? '#5b21b6'
  const orange = settings.orangeAccent ?? '#ea580c'
  const pillBg = settings.servicePillBg ?? '#6d28d9'

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
      {/* Right purple column */}
      <div
        className="pointer-events-none absolute top-0 right-0 bottom-0 z-0 w-[41.67%]"
        style={{ backgroundColor: purple }}
      />

      {/* Halftone corners */}
      <div
        className="pointer-events-none absolute top-0 left-0 z-1 h-52 w-64 opacity-90"
        style={halftoneStyle(true)}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 z-1 h-48 w-72 opacity-80"
        style={halftoneStyle(false)}
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-h-0">
        {/* Left — white content */}
        <div
          className="flex w-[58.33%] shrink-0 flex-col px-11 pb-8 pt-11"
          style={{ backgroundColor: white }}
        >
          <div className="max-w-[560px] space-y-1">
            <h1
              className="text-[52px] font-bold leading-[1.05] tracking-tight"
              style={{ color: purple }}
            >
              {settings.headlineLine1}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <h1
                className="text-[52px] font-bold leading-[1.05] tracking-tight"
                style={{ color: purple }}
              >
                {settings.headlineLine2}
              </h1>
              <span
                className="inline-flex items-center rounded-lg px-4 py-2.5 text-[15px] font-bold tracking-wide text-white shadow-md"
                style={{ backgroundColor: orange }}
              >
                {settings.badgeText}
              </span>
            </div>
          </div>

          <p className="mt-4 max-w-[520px] text-[17px] italic leading-snug text-slate-800">
            {settings.tagline}
          </p>

          <div className="mt-7 grid max-w-[540px] grid-cols-2 gap-x-4 gap-y-3">
            {services.map((label, i) =>
              label ? (
                <div
                  key={i}
                  className="flex min-w-0 items-center gap-2.5 rounded-full px-4 py-2.5 text-[14px] font-semibold text-white shadow-sm"
                  style={{ backgroundColor: pillBg }}
                >
                  <span
                    className="flex size-6 shrink-0 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: orange }}
                  >
                    <Check className="size-3.5 stroke-[3]" aria-hidden />
                  </span>
                  <span className="min-w-0 leading-snug">{label}</span>
                </div>
              ) : null,
            )}
          </div>

          <div className="mt-6 flex max-w-[560px] flex-wrap items-center gap-3">
            {Array.from({ length: visibleSkillSlots }, (_, i) => {
              const src = skillSlots[i]?.trim()
              if (src) {
                return (
                  <div
                    key={`${i}-${src.slice(0, 24)}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-200 bg-violet-50/80 p-1.5 shadow-inner sm:h-14 sm:w-14"
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
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-dashed border-violet-300/80 bg-violet-50/50 p-1.5 sm:h-14 sm:w-14"
                  aria-hidden
                >
                  <Layers
                    className="size-5 text-violet-400 sm:size-6"
                    strokeWidth={1.5}
                  />
                </div>
              )
            })}
          </div>

          <div className="mt-auto flex min-w-0 items-center gap-4 pt-8">
            <div
              className="relative flex size-[72px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] bg-slate-100 shadow-md"
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
                  className="size-9 text-violet-300"
                  strokeWidth={1.25}
                  aria-hidden
                />
              )}
            </div>
            <div className="min-w-0">
              <p
                className="truncate text-[17px] font-bold"
                style={{ color: purple }}
              >
                {settings.avatarName}
              </p>
              <p className="truncate text-[14px] text-slate-600">
                {settings.avatarRole}
              </p>
            </div>
          </div>
        </div>

        {/* Right — purple column content */}
        <div
          className="relative flex min-w-0 flex-1 flex-col px-8 pb-8 pt-10"
          style={{ backgroundColor: 'transparent' }}
        >
          {/* Laptop hero — anchored to purple panel, overlaps white split */}
          <div
            className="pointer-events-none absolute top-[40%] left-0 z-30 w-[min(520px,92%)] -translate-x-[20%] -translate-y-1/2"
            aria-hidden
          >
            <img
              src={computerCodeImg}
              alt=""
              className="h-auto w-full max-w-none drop-shadow-[0_28px_60px_rgba(0,0,0,0.38)]"
              draggable={false}
            />
          </div>

          <div className="relative z-20 ml-auto flex max-w-[280px] items-start gap-3 text-right">
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="text-[17px] font-bold leading-tight text-white">
                {settings.brandName}
              </p>
              <p className="text-[13px] font-medium text-white/80">
                {settings.brandTagline}
              </p>
            </div>
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white/10">
              {settings.brandLogo ? (
                <img
                  src={settings.brandLogo}
                  alt=""
                  className="size-full object-contain p-1"
                  draggable={false}
                />
              ) : (
                <div
                  className="flex size-full items-center justify-center gap-0.5 p-2"
                  aria-hidden
                >
                  <span
                    className="h-9 w-5 rounded-lg"
                    style={{ backgroundColor: orange }}
                  />
                  <span className="h-9 w-5 rounded-lg bg-white/90" />
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 flex-1" aria-hidden />

          <div className="relative z-20 mt-auto space-y-2 text-right">
            <p className="text-[15px] font-bold text-white">
              {settings.footerHeading}
            </p>
            <div className="flex items-center justify-end gap-2 text-[14px] text-white/95">
              <span className="font-medium">{settings.websiteUrl}</span>
              <Globe className="size-5 shrink-0 text-white/90" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

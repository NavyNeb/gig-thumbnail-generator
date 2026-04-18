import { Layers } from 'lucide-react'

import {
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from '@/lib/thumbnail/constants'
import {
  paddedSkillIcons,
  skillIconVisibleSlotCount,
} from '@/lib/thumbnail/skill-icon-slots'
import {
  type Software1Settings,
  SOFTWARE1_MAX_HERO_IMAGES,
  SOFTWARE1_MAX_SKILL_ICONS,
  SOFTWARE1_MAX_STACK_LABELS,
} from '@/templates/settings-types'

type Props = {
  settings: Software1Settings
}

function stackLine(settings: Software1Settings): string[] {
  return (settings.stackLabels ?? [])
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, SOFTWARE1_MAX_STACK_LABELS)
}

export function Software1View({ settings }: Props) {
  const {
    title,
    subtitle,
    codeLine,
    gradientFrom,
    gradientTo,
    accent,
  } = settings

  const heroImages = (settings.heroImages ?? [])
    .filter(Boolean)
    .slice(0, SOFTWARE1_MAX_HERO_IMAGES)
  const skillSlots = paddedSkillIcons(
    settings.skillIcons,
    SOFTWARE1_MAX_SKILL_ICONS,
  )
  const visibleSkillSlots = skillIconVisibleSlotCount(
    settings.skillIcons,
    SOFTWARE1_MAX_SKILL_ICONS,
  )
  const footerStacks = stackLine(settings)

  return (
    <div
      className="relative overflow-hidden text-left font-sans antialiased"
      style={{
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 55%, #020617 100%)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl" />

      <div className="relative flex h-full flex-col justify-between px-14 pb-10 pt-14">
        <header className="flex shrink-0 items-start justify-between gap-6">
          <div
            className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-sm"
            style={{ borderColor: `${accent}55`, color: accent }}
          >
            <span aria-hidden className="text-base opacity-90">
              {'</>'}
            </span>
            <span className="tracking-wide uppercase opacity-90">
              Software
            </span>
          </div>
          <div
            className="max-w-[58%] font-mono text-sm leading-relaxed opacity-80"
            style={{ color: accent }}
          >
            {codeLine}
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-12 items-center gap-10 py-6">
          <div className="col-span-12 flex min-w-0 flex-col justify-center space-y-5 lg:col-span-7">
            <h1
              className="text-[52px] font-semibold leading-[1.05] tracking-tight text-balance md:text-[56px]"
              style={{
                color: '#f8fafc',
                textShadow: '0 2px 40px rgba(0,0,0,0.45)',
              }}
            >
              {title}
            </h1>
            <p
              className="text-xl font-medium leading-snug text-balance opacity-95 md:text-2xl"
              style={{ color: accent }}
            >
              {subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {Array.from({ length: visibleSkillSlots }, (_, i) => {
                const src = skillSlots[i]?.trim()
                if (src) {
                  return (
                    <div
                      key={`${i}-${src.slice(0, 24)}`}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 p-1.5 shadow-inner backdrop-blur-sm md:h-16 md:w-16"
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
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed border-white/25 bg-white/4 p-1.5 shadow-inner backdrop-blur-sm md:h-16 md:w-16"
                    aria-hidden
                  >
                    <Layers className="size-6 text-white/35" strokeWidth={1.5} />
                  </div>
                )
              })}
            </div>
          </div>

          <div className="col-span-12 flex min-h-[180px] items-center justify-end lg:col-span-5">
            {heroImages.length > 0 ? (
              <div className="relative flex w-full max-w-[400px] flex-col items-end justify-center pr-1">
                {heroImages.map((src, idx) => {
                  const rotations = ['-rotate-6', 'rotate-3']
                  const rot = rotations[idx % rotations.length]
                  const widths = ['w-[90%]', 'w-[82%]']
                  return (
                    <div
                      key={`${idx}-${src.slice(0, 20)}`}
                      className={`relative ${widths[idx] ?? 'w-[80%]'} ${rot}`}
                      style={{ marginTop: idx > 0 ? -24 : 0 }}
                    >
                      <div
                        className="overflow-hidden rounded-3xl shadow-2xl ring-2 ring-white/15"
                        style={{
                          aspectRatio: '4 / 3',
                          boxShadow: `0 20px 50px rgba(0,0,0,0.45), 0 0 0 1px ${accent}33`,
                        }}
                      >
                        <img
                          src={src}
                          alt=""
                          className="size-full object-cover"
                          draggable={false}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>

        <footer className="flex shrink-0 flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-6">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 md:text-xs">
            {footerStacks.length > 0 ? (
              footerStacks.map((label, i) => (
                <span key={`${label}-${i}`} className="flex items-center gap-3">
                  {i > 0 ? (
                    <span className="text-slate-600 select-none" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <span className="text-slate-300">{label}</span>
                </span>
              ))
            ) : (
              <span className="text-slate-600">—</span>
            )}
          </div>
          <div
            className="h-2 w-40 shrink-0 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            }}
          />
        </footer>
      </div>
    </div>
  )
}

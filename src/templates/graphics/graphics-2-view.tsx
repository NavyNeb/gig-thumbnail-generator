import type { CSSProperties } from 'react'
import {
  Component,
  Layers,
  LayoutTemplate,
  MousePointer2,
  PenTool,
  Smartphone,
  Type,
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

type Props = { settings: Graphics2Settings }

const SERIF_STACK =
  'Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif'

const featureIcons = [Users, LayoutTemplate, PenTool] as const

export function Graphics2View({ settings }: Props) {
  const bg = settings.bgBase
  const grid = settings.gridColor
  const ink = settings.ink
  const accent = settings.accent
  const surface = settings.surface

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
    backgroundImage: `linear-gradient(to right, ${grid}99 1px, transparent 1px), linear-gradient(to bottom, ${grid}99 1px, transparent 1px)`,
    backgroundSize: '32px 32px',
  }

  // Stable palette swatches derived from accent+ink
  const swatches = [
    { name: '500', hex: accent },
    { name: '700', hex: ink },
    { name: '50', hex: surface },
  ]

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
      {/* Soft accent wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(70% 60% at 100% 35%, ${accent}1f 0%, transparent 55%), radial-gradient(50% 50% at 0% 100%, ${accent}14 0%, transparent 60%)`,
        }}
        aria-hidden
      />

      {/* Top meta */}
      <div
        className="relative z-10 flex items-center justify-between border-b px-[72px] py-3 font-mono text-[10px] tracking-[0.32em] uppercase"
        style={{ borderColor: `${ink}1f`, color: ink }}
      >
        <div className="flex items-center gap-2 opacity-80">
          <Component className="size-3" style={{ color: accent }} />
          <span>UX · Product Design Studio</span>
        </div>
        <div className="opacity-60">{settings.chromeLabel}</div>
      </div>

      <div className="relative z-10 flex h-[calc(100%-7rem)] flex-row pb-2">
        {/* LEFT — copy + deliverables */}
        <div className="flex min-w-0 max-w-[55%] flex-1 flex-col justify-center py-7 pl-[72px] pr-6">
          <span
            className="mb-3 inline-flex w-fit items-center gap-2 rounded-md px-3 py-1 text-[10px] font-bold tracking-[0.22em] uppercase shadow-sm"
            style={{ backgroundColor: accent, color: surface }}
          >
            <MousePointer2 className="size-3" strokeWidth={2.5} />
            {settings.badgeText}
          </span>

          <h1
            className="text-[58px] leading-[0.96] tracking-tight text-balance"
            style={{
              fontFamily: SERIF_STACK,
              fontWeight: 500,
              color: ink,
            }}
          >
            {settings.headlineLine1}
            <br />
            <span style={{ color: accent, fontStyle: 'italic' }}>
              {settings.headlineLine2}
            </span>
          </h1>

          <p
            className="mt-4 max-w-[480px] text-[16px] font-medium leading-snug text-balance"
            style={{ color: ink, opacity: 0.85 }}
          >
            {settings.subline}
          </p>

          {features.length > 0 ? (
            <div className="mt-6 flex flex-col gap-2">
              {features.map((line, i) => {
                const Icon = featureIcons[i % featureIcons.length]
                return (
                  <div
                    key={`${line}-${i}`}
                    className="flex max-w-[440px] items-center gap-3 rounded-xl border px-4 py-2.5 shadow-sm"
                    style={{
                      borderColor: `${ink}1f`,
                      backgroundColor: surface,
                    }}
                  >
                    <span
                      className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${accent}1a`,
                        color: accent,
                      }}
                    >
                      <Icon className="size-4" strokeWidth={2} aria-hidden />
                    </span>
                    <span
                      className="flex-1 text-[14px] font-semibold leading-snug"
                      style={{ color: ink }}
                    >
                      {line}
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-wider uppercase opacity-60"
                      style={{ color: ink }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : null}

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {Array.from({ length: visibleSkillSlots }, (_, i) => {
              const src = skillSlots[i]?.trim()
              if (src) {
                return (
                  <div
                    key={`${i}-${src.slice(0, 24)}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-white p-1.5 shadow-sm"
                    style={{ borderColor: `${ink}1f` }}
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
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-dashed bg-white/60"
                  style={{ borderColor: `${ink}33` }}
                  aria-hidden
                >
                  <Layers
                    className="size-4"
                    style={{ color: `${ink}66` }}
                    strokeWidth={2}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT — phone + design system mini card */}
        <div className="relative flex min-w-0 flex-1 items-center justify-center pr-[60px]">
          {/* Wireframe accents */}
          <div
            className="pointer-events-none absolute top-[10%] right-[26%] z-0 h-24 w-36 rounded-lg border-2 border-dashed opacity-40"
            style={{ borderColor: ink, transform: 'rotate(-8deg)' }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[18%] right-[6%] z-0 h-20 w-28 rounded-lg border-2 border-dashed opacity-30"
            style={{ borderColor: accent, transform: 'rotate(6deg)' }}
            aria-hidden
          />

          {/* Mini design-system card on the left of the phone */}
          <div
            className="absolute left-2 top-[20%] z-20 w-[180px] rounded-2xl border bg-white p-3 shadow-xl"
            style={{
              borderColor: `${ink}1f`,
              transform: 'rotate(-3deg)',
            }}
          >
            <div className="flex items-center gap-1.5 border-b pb-2 font-mono text-[9px] tracking-[0.22em] uppercase opacity-70">
              <Type className="size-3" style={{ color: accent }} />
              <span>Design Tokens</span>
            </div>
            <div className="mt-2 space-y-2">
              <div>
                <div className="mb-1 font-mono text-[9px] uppercase tracking-wider opacity-50">
                  Color
                </div>
                <div className="flex gap-1.5">
                  {swatches.map((sw) => (
                    <div
                      key={sw.name}
                      className="flex flex-col items-center gap-0.5"
                    >
                      <div
                        className="size-7 rounded-md border"
                        style={{
                          background: sw.hex,
                          borderColor: `${ink}1f`,
                        }}
                      />
                      <span className="font-mono text-[8px] opacity-60">
                        {sw.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[9px] uppercase tracking-wider opacity-50">
                  Type
                </div>
                <div
                  className="text-[18px] leading-tight"
                  style={{ fontFamily: SERIF_STACK, color: ink }}
                >
                  Aa
                </div>
                <div className="font-mono text-[8px] opacity-60">
                  16 / 24 / 32 / 48
                </div>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div
            className="relative z-10 flex flex-col items-center"
            style={{ transform: 'rotate(2deg)' }}
          >
            <div
              className="mb-2 flex items-center gap-1.5 rounded-full border bg-white/95 px-2.5 py-1 text-[10px] font-mono tracking-wider uppercase shadow-md backdrop-blur-sm"
              style={{ borderColor: `${ink}22`, color: ink }}
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: accent }}
              />
              <span>{settings.chromeLabel}</span>
            </div>

            <div
              className="relative rounded-[2.6rem] p-[10px] shadow-2xl"
              style={{
                background: `linear-gradient(145deg, ${ink} 0%, #334155 100%)`,
              }}
            >
              <div
                className="absolute top-2.5 left-1/2 z-20 h-6 w-20 -translate-x-1/2 rounded-full"
                style={{ backgroundColor: ink }}
                aria-hidden
              />
              <div
                className="relative overflow-hidden rounded-[2rem] bg-white"
                style={{ width: 270, aspectRatio: '9 / 19' }}
              >
                {settings.deviceImage ? (
                  <img
                    src={settings.deviceImage}
                    alt=""
                    className="size-full object-cover object-top"
                    draggable={false}
                  />
                ) : (
                  <div className="flex size-full flex-col bg-slate-50 p-4">
                    <div className="mb-3 flex gap-1.5">
                      <span className="size-1.5 rounded-full bg-rose-400/80" />
                      <span className="size-1.5 rounded-full bg-amber-300/90" />
                      <span className="size-1.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <div
                      className="mb-2.5 h-2.5 w-2/3 rounded"
                      style={{ backgroundColor: `${accent}40` }}
                    />
                    <div className="mb-1.5 h-1.5 w-full rounded bg-slate-200" />
                    <div className="mb-1.5 h-1.5 w-[88%] rounded bg-slate-200" />
                    <div className="mb-4 h-1.5 w-[64%] rounded bg-slate-200" />
                    <div className="grid grid-cols-2 gap-2.5">
                      <div
                        className="rounded-lg border-2 border-dashed border-slate-300 bg-white"
                        style={{ minHeight: 64 }}
                      />
                      <div
                        className="rounded-lg border-2 border-dashed border-slate-300 bg-white"
                        style={{ minHeight: 64 }}
                      />
                    </div>
                    <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                      <div
                        className="rounded-lg"
                        style={{ background: `${accent}25`, minHeight: 32 }}
                      />
                      <div
                        className="rounded-lg border border-slate-200"
                        style={{ minHeight: 32 }}
                      />
                    </div>
                    <div className="mt-auto flex justify-center pt-3">
                      <Smartphone
                        className="size-7 text-slate-300"
                        strokeWidth={1.25}
                        aria-hidden
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cursor mark */}
          <MousePointer2
            className="absolute right-[10%] top-[58%] z-30 size-7 drop-shadow-md"
            style={{ color: accent }}
            fill={accent}
            strokeWidth={2}
            aria-hidden
          />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t px-[72px] py-3 text-[11px] font-bold tracking-[0.18em] uppercase backdrop-blur-md"
        style={{
          borderColor: `${ink}1f`,
          color: ink,
          backgroundColor: `${surface}ee`,
        }}
      >
        <span>{settings.footerTag}</span>
        <span className="font-mono opacity-60">v2 · spec ready</span>
      </div>
    </div>
  )
}

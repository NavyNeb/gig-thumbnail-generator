import { ArrowDownRight, Globe, Hash, Search, Trophy } from 'lucide-react'

import {
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from '@/lib/thumbnail/constants'
import {
  paddedSkillIcons,
  skillIconVisibleSlotCount,
} from '@/lib/thumbnail/skill-icon-slots'
import {
  MARKETING3_MAX_SKILL_ICONS,
  type Marketing3Settings,
} from '@/templates/settings-types'

type Props = { settings: Marketing3Settings }

const DISPLAY_STACK =
  '"Helvetica Neue", "Inter", "Arial Narrow", sans-serif'

export function Marketing3View({ settings }: Props) {
  const bg = settings.bgColor
  const ink = settings.ink
  const accent = settings.accent
  const mute = settings.mute
  const paper = settings.paper

  const ranks = [
    {
      n: 1,
      term: settings.rank1Term,
      url: settings.rank1Url,
      delta: settings.rank1Delta,
    },
    {
      n: 2,
      term: settings.rank2Term,
      url: settings.rank2Url,
      delta: settings.rank2Delta,
    },
    {
      n: 3,
      term: settings.rank3Term,
      url: settings.rank3Url,
      delta: settings.rank3Delta,
    },
  ]

  const keywords = [
    settings.keyword1,
    settings.keyword2,
    settings.keyword3,
    settings.keyword4,
    settings.keyword5,
  ]
    .map((s) => s.trim())
    .filter(Boolean)

  const skillSlots = paddedSkillIcons(
    settings.skillIcons,
    MARKETING3_MAX_SKILL_ICONS,
  )
  const visibleSkillSlots = skillIconVisibleSlotCount(
    settings.skillIcons,
    MARKETING3_MAX_SKILL_ICONS,
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
      {/* engineering grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${ink}0c 1px, transparent 1px), linear-gradient(90deg, ${ink}0c 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
        aria-hidden
      />
      {/* accent radial */}
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl"
        style={{ background: accent }}
        aria-hidden
      />

      {/* Top meta strip */}
      <div
        className="relative z-10 grid grid-cols-3 items-center border-b px-[64px] py-3 font-mono text-[10px] tracking-[0.32em] uppercase"
        style={{ borderColor: `${ink}1f`, color: mute }}
      >
        <div className="flex items-center gap-2">
          <Hash className="size-3" style={{ color: accent }} />
          <span style={{ color: ink }}>{settings.metaIndex}</span>
        </div>
        <div className="text-center" style={{ color: ink }}>
          {settings.metaCategory}
        </div>
        <div className="text-right">{settings.metaDate}</div>
      </div>

      <div className="relative z-10 grid h-[calc(100%-7rem)] grid-cols-12 gap-8 px-[64px] pt-9">
        {/* LEFT: brutalist headline + keywords */}
        <div className="col-span-7 flex min-w-0 flex-col">
          <div
            className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] font-bold tracking-[0.28em] uppercase"
            style={{ borderColor: `${ink}33`, color: ink }}
          >
            <Search className="size-3" style={{ color: accent }} />
            {settings.metaCategory}
          </div>

          <div
            className="mt-5 flex flex-col leading-[0.88]"
            style={{
              fontFamily: DISPLAY_STACK,
              fontWeight: 900,
              letterSpacing: '-0.045em',
            }}
          >
            <span className="text-[88px]" style={{ color: ink }}>
              {settings.headlineLine1}
            </span>
            <span
              className="text-[88px]"
              style={{
                color: 'transparent',
                WebkitTextStroke: `2.5px ${accent}`,
              }}
            >
              {settings.headlineLine2}
            </span>
            <span className="text-[88px] inline-flex items-end gap-3" style={{ color: ink }}>
              {settings.headlineLine3}
              <ArrowDownRight
                className="mb-2 size-12 shrink-0"
                strokeWidth={3}
                style={{ color: accent }}
              />
            </span>
          </div>

          <p
            className="mt-5 max-w-[480px] font-mono text-[12px] tracking-wider leading-relaxed uppercase"
            style={{ color: mute }}
          >
            {settings.subline}
          </p>

          {keywords.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {keywords.map((k, i) => (
                <span
                  key={`${k}-${i}`}
                  className="inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 font-mono text-[10px] tracking-wide lowercase"
                  style={{
                    borderColor: `${ink}33`,
                    color: ink,
                  }}
                >
                  <span style={{ color: accent }}>+</span>
                  {k}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-auto flex flex-wrap items-center gap-2 pb-3">
            {Array.from({ length: visibleSkillSlots }, (_, i) => {
              const src = skillSlots[i]?.trim()
              if (src) {
                return (
                  <div
                    key={`${i}-${src.slice(0, 24)}`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border p-1.5"
                    style={{
                      borderColor: `${ink}33`,
                      background: `${ink}10`,
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
                  key={`m3-ph-${i}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-dashed"
                  style={{ borderColor: `${ink}30` }}
                  aria-hidden
                >
                  <Globe className="size-4" style={{ color: mute }} />
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT: SERP funnel cards */}
        <div className="col-span-5 flex min-w-0 flex-col items-stretch justify-center">
          <div
            className="mb-3 flex items-center justify-between font-mono text-[10px] tracking-[0.28em] uppercase"
            style={{ color: mute }}
          >
            <span className="flex items-center gap-1.5">
              <Trophy className="size-3" style={{ color: accent }} />
              <span style={{ color: ink }}>SERP / Top 3</span>
            </span>
            <span style={{ color: accent }}>↑ Rising</span>
          </div>

          <div className="relative flex flex-col items-end gap-3">
            {ranks.map((r, i) => {
              const widths = ['100%', '92%', '84%']
              const isFirst = i === 0
              return (
                <div
                  key={`rank-${r.n}`}
                  className="relative rounded-xl border-2 shadow-[6px_6px_0_rgba(0,0,0,0.45)]"
                  style={{
                    width: widths[i] ?? '100%',
                    background: paper,
                    color: '#0a0a0a',
                    borderColor: isFirst ? accent : '#0a0a0a',
                  }}
                >
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg font-mono text-[22px] font-black"
                      style={{
                        background: isFirst ? accent : '#0a0a0a',
                        color: isFirst ? '#0a0a0a' : paper,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      #{r.n}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase opacity-70">
                        <Globe className="size-3" />
                        <span className="truncate">{r.url}</span>
                      </div>
                      <div className="mt-0.5 truncate text-[15px] font-bold leading-tight">
                        {r.term}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div
                        className="inline-flex items-center gap-0.5 rounded-md px-2 py-0.5 font-mono text-[12px] font-black"
                        style={{
                          background: isFirst ? '#0a0a0a' : '#0c8a5a',
                          color: isFirst ? accent : '#fff',
                        }}
                      >
                        ↑ {r.delta}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t px-[64px] py-3.5 font-mono text-[10px] tracking-[0.32em] uppercase"
        style={{ borderColor: `${ink}1f`, color: mute }}
      >
        <span className="flex items-center gap-2">
          <span
            className="size-1.5 rounded-full"
            style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
          />
          {settings.footerTag}
        </span>
        <span style={{ color: ink }}>// SEO · GROWTH · INDEX</span>
      </div>
    </div>
  )
}

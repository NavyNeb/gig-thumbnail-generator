import { Activity, ArrowUpRight, TrendingUp } from 'lucide-react'

import {
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from '@/lib/thumbnail/constants'
import {
  paddedSkillIcons,
  skillIconVisibleSlotCount,
} from '@/lib/thumbnail/skill-icon-slots'
import {
  MARKETING1_MAX_SKILL_ICONS,
  type Marketing1Settings,
} from '@/templates/settings-types'

type Props = { settings: Marketing1Settings }

const SERIF_STACK =
  'Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif'

function Sparkline({
  accent,
  accentSoft,
  ink,
}: {
  accent: string
  accentSoft: string
  ink: string
}) {
  return (
    <svg
      viewBox="0 0 540 200"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="m1-spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="m1-spark-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accentSoft} />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
      </defs>
      {[40, 80, 120, 160].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="540"
          y2={y}
          stroke={ink}
          strokeOpacity="0.07"
          strokeDasharray="2 6"
        />
      ))}
      <path
        d="M0 150 C40 130 80 145 120 110 C160 80 200 95 240 70 C280 45 320 80 360 55 C400 35 440 65 480 30 C500 15 520 20 540 8 L540 200 L0 200 Z"
        fill="url(#m1-spark-fill)"
      />
      <path
        d="M0 150 C40 130 80 145 120 110 C160 80 200 95 240 70 C280 45 320 80 360 55 C400 35 440 65 480 30 C500 15 520 20 540 8"
        stroke="url(#m1-spark-line)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {[
        { x: 120, y: 110 },
        { x: 240, y: 70 },
        { x: 360, y: 55 },
        { x: 480, y: 30 },
      ].map((p) => (
        <circle
          key={`${p.x}-${p.y}`}
          cx={p.x}
          cy={p.y}
          r="3.5"
          fill={ink}
          stroke={accent}
          strokeWidth="2"
        />
      ))}
      <circle
        cx="540"
        cy="8"
        r="7"
        fill={accent}
        stroke={accentSoft}
        strokeOpacity="0.6"
        strokeWidth="3"
      />
      <text
        x="6"
        y="195"
        fill={ink}
        fillOpacity="0.4"
        fontSize="10"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        letterSpacing="2"
      >
        D-30
      </text>
      <text
        x="500"
        y="195"
        fill={ink}
        fillOpacity="0.4"
        fontSize="10"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        letterSpacing="2"
      >
        D-0
      </text>
    </svg>
  )
}

export function Marketing1View({ settings }: Props) {
  const bg = settings.canvasBg
  const ink = settings.ink
  const mute = settings.mute
  const accent = settings.accent
  const accentSoft = settings.accentSoft

  const channels = [settings.channel1, settings.channel2, settings.channel3]
    .map((s) => s.trim())
    .filter(Boolean)

  const kpis = [
    {
      label: settings.kpi1Label,
      value: settings.kpi1Value,
      delta: settings.kpi1Delta,
    },
    {
      label: settings.kpi2Label,
      value: settings.kpi2Value,
      delta: settings.kpi2Delta,
    },
    {
      label: settings.kpi3Label,
      value: settings.kpi3Value,
      delta: settings.kpi3Delta,
    },
  ]

  const skillSlots = paddedSkillIcons(
    settings.skillIcons,
    MARKETING1_MAX_SKILL_ICONS,
  )
  const visibleSkillSlots = skillIconVisibleSlotCount(
    settings.skillIcons,
    MARKETING1_MAX_SKILL_ICONS,
  )

  const cardInk = '#0e2a26'
  const cardSurface = '#f4ecd8'

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
      {/* horizontal hairline ribs */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${ink}10 1px, transparent 1px)`,
          backgroundSize: '100% 38px',
        }}
        aria-hidden
      />
      {/* glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60% 50% at 100% 0%, ${accent}28, transparent 60%), radial-gradient(50% 40% at 0% 100%, ${accentSoft}1c, transparent 60%)`,
        }}
        aria-hidden
      />
      {/* corner index marks */}
      <div
        className="pointer-events-none absolute left-[44px] top-[44px] h-3 w-3"
        style={{ borderTop: `1.5px solid ${ink}66`, borderLeft: `1.5px solid ${ink}66` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[44px] top-[44px] h-3 w-3"
        style={{ borderTop: `1.5px solid ${ink}66`, borderRight: `1.5px solid ${ink}66` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-[44px] bottom-[44px] h-3 w-3"
        style={{ borderBottom: `1.5px solid ${ink}66`, borderLeft: `1.5px solid ${ink}66` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-[44px] bottom-[44px] h-3 w-3"
        style={{ borderBottom: `1.5px solid ${ink}66`, borderRight: `1.5px solid ${ink}66` }}
        aria-hidden
      />

      <div className="relative z-10 flex items-center justify-between px-[64px] pt-9">
        <div
          className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.32em] uppercase"
          style={{ color: mute }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
          />
          <span>{settings.badgeText}</span>
        </div>
        <div
          className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.28em] uppercase"
          style={{ color: mute }}
        >
          {settings.brandLogo ? (
            <img
              src={settings.brandLogo}
              alt=""
              className="h-5 w-auto"
              draggable={false}
            />
          ) : null}
          <span style={{ color: ink }}>{settings.brandName}</span>
        </div>
      </div>

      <div className="relative z-10 grid h-[calc(100%-7.5rem)] grid-cols-12 items-center gap-10 px-[64px] pb-4 pt-6">
        <div className="col-span-7 flex min-w-0 flex-col">
          <h1
            className="text-balance text-[64px] leading-[1.02] tracking-tight"
            style={{ fontFamily: SERIF_STACK, color: ink, fontWeight: 500 }}
          >
            {settings.headlineLine1}
            <br />
            <span
              style={{
                color: accent,
                fontStyle: 'italic',
                fontWeight: 500,
                textShadow: `0 0 24px ${accent}55`,
              }}
            >
              {settings.headlineLine2}
            </span>
          </h1>
          <p
            className="mt-5 max-w-[460px] text-[17px] leading-snug"
            style={{ color: mute }}
          >
            {settings.subline}
          </p>

          {channels.length > 0 ? (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {channels.map((c, i) => (
                <span
                  key={`${c}-${i}`}
                  className="inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase"
                  style={{ borderColor: `${ink}33`, color: ink }}
                >
                  <span
                    className="size-1 rounded-full"
                    style={{ background: accent }}
                  />
                  {c}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            {Array.from({ length: visibleSkillSlots }, (_, i) => {
              const src = skillSlots[i]?.trim()
              if (src) {
                return (
                  <div
                    key={`${i}-${src.slice(0, 24)}`}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border p-1.5"
                    style={{
                      borderColor: `${ink}22`,
                      background: `${ink}08`,
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
                  key={`m1-ph-${i}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-dashed"
                  style={{ borderColor: `${ink}25` }}
                  aria-hidden
                >
                  <Activity className="size-4" style={{ color: mute }} />
                </div>
              )
            })}
          </div>
        </div>

        <div className="col-span-5 flex min-w-0 items-center justify-end">
          <div
            className="relative w-[460px] rounded-2xl border"
            style={{
              backgroundColor: cardSurface,
              borderColor: `${cardInk}22`,
              color: cardInk,
              boxShadow: `0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px ${accent}22, inset 0 1px 0 #ffffffaa`,
            }}
          >
            <div
              className="flex items-center justify-between border-b px-5 pt-4 pb-3"
              style={{ borderColor: `${cardInk}1f` }}
            >
              <div>
                <div className="font-mono text-[10px] tracking-[0.24em] uppercase opacity-60">
                  {settings.chartCaption}
                </div>
                <div className="mt-0.5 text-[12px] font-medium opacity-80">
                  {settings.chartTrendLabel}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: '#ef4444' }}
                />
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: '#f59e0b' }}
                />
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: accent }}
                />
              </div>
            </div>

            <div className="relative h-[180px] w-full overflow-hidden">
              <Sparkline accent={accent} accentSoft={accentSoft} ink={cardInk} />
              <span
                className="absolute right-4 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider"
                style={{ background: accent, color: cardInk }}
              >
                <ArrowUpRight className="size-3.5" />
                {settings.chartBadge}
              </span>
            </div>

            <div
              className="grid grid-cols-3 border-t"
              style={{ borderColor: `${cardInk}1f` }}
            >
              {kpis.map((k, i) => (
                <div
                  key={`kpi-${i}`}
                  className="px-4 pt-3 pb-3"
                  style={{
                    borderRight:
                      i < kpis.length - 1
                        ? `1px solid ${cardInk}1f`
                        : 'none',
                  }}
                >
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-60">
                    {k.label}
                  </div>
                  <div
                    className="mt-0.5 font-mono text-[22px] font-bold leading-tight"
                    style={{ fontVariantNumeric: 'tabular-nums' }}
                  >
                    {k.value}
                  </div>
                  <div
                    className="mt-0.5 inline-flex items-center gap-0.5 text-[11px] font-bold"
                    style={{ color: '#0c8a5a' }}
                  >
                    <ArrowUpRight className="size-3" />
                    {k.delta}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="overflow-hidden rounded-b-2xl border-t px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase"
              style={{
                borderColor: `${cardInk}1f`,
                background: `${cardInk}0c`,
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center gap-1 rounded-sm px-1.5 py-0.5 font-bold"
                  style={{ background: cardInk, color: cardSurface }}
                >
                  <TrendingUp className="size-3" />
                  LIVE
                </span>
                <span className="truncate opacity-80">
                  {settings.tickerLine}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t px-[64px] py-3.5 font-mono text-[10px] tracking-[0.32em] uppercase"
        style={{ borderColor: `${ink}1a`, color: mute }}
      >
        <span>{settings.footerTag}</span>
        <span className="flex items-center gap-2">
          <span
            className="size-1.5 rounded-full"
            style={{ background: accent }}
          />
          <span style={{ color: ink }}>{settings.metaTag}</span>
        </span>
      </div>
    </div>
  )
}

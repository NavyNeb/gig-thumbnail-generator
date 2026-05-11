import { Activity, Code2, Terminal } from 'lucide-react'

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

type Props = { settings: Software1Settings }

const KEYWORD_RE =
  /\b(const|let|var|function|return|import|from|export|new|class|async|await|if|else|true|false|null|undefined|=>|interface|type)\b/g
const STRING_RE = /(["'`])((?:\\.|(?!\1).)*)\1/g

function tokenize(line: string, accent: string) {
  if (!line) return null
  const segments: { text: string; kind: 'plain' | 'keyword' | 'string' }[] = []
  let cursor = 0
  const stringMatches: { start: number; end: number; text: string }[] = []
  let m: RegExpExecArray | null
  STRING_RE.lastIndex = 0
  while ((m = STRING_RE.exec(line)) !== null) {
    stringMatches.push({ start: m.index, end: m.index + m[0].length, text: m[0] })
  }
  for (const s of stringMatches) {
    if (s.start > cursor) {
      const slice = line.slice(cursor, s.start)
      let kCursor = 0
      KEYWORD_RE.lastIndex = 0
      let km: RegExpExecArray | null
      while ((km = KEYWORD_RE.exec(slice)) !== null) {
        if (km.index > kCursor) {
          segments.push({ text: slice.slice(kCursor, km.index), kind: 'plain' })
        }
        segments.push({ text: km[0], kind: 'keyword' })
        kCursor = km.index + km[0].length
      }
      if (kCursor < slice.length) {
        segments.push({ text: slice.slice(kCursor), kind: 'plain' })
      }
    }
    segments.push({ text: s.text, kind: 'string' })
    cursor = s.end
  }
  if (cursor < line.length) {
    const slice = line.slice(cursor)
    let kCursor = 0
    KEYWORD_RE.lastIndex = 0
    let km: RegExpExecArray | null
    while ((km = KEYWORD_RE.exec(slice)) !== null) {
      if (km.index > kCursor) {
        segments.push({ text: slice.slice(kCursor, km.index), kind: 'plain' })
      }
      segments.push({ text: km[0], kind: 'keyword' })
      kCursor = km.index + km[0].length
    }
    if (kCursor < slice.length) {
      segments.push({ text: slice.slice(kCursor), kind: 'plain' })
    }
  }
  return segments.map((seg, i) => {
    if (seg.kind === 'keyword') {
      return (
        <span key={i} style={{ color: accent, fontWeight: 700 }}>
          {seg.text}
        </span>
      )
    }
    if (seg.kind === 'string') {
      return (
        <span key={i} style={{ color: '#fbbf24' }}>
          {seg.text}
        </span>
      )
    }
    return (
      <span key={i} style={{ color: '#cbd5e1' }}>
        {seg.text}
      </span>
    )
  })
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
  const stack = (settings.stackLabels ?? [])
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, SOFTWARE1_MAX_STACK_LABELS)

  return (
    <div
      className="relative overflow-hidden font-sans antialiased text-white"
      style={{
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        background: `radial-gradient(120% 90% at 100% 0%, ${gradientTo} 0%, transparent 60%), radial-gradient(100% 80% at 0% 100%, ${accent}33 0%, transparent 55%), linear-gradient(160deg, ${gradientFrom} 0%, #020617 100%)`,
      }}
    >
      {/* fine grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
      {/* aurora glow */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: `${accent}25` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-[-180px] h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: `${gradientTo}50` }}
        aria-hidden
      />

      {/* Top brand strip */}
      <div className="relative z-10 flex items-center justify-between px-14 pt-12">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-[0.28em] uppercase backdrop-blur-md"
          style={{
            borderColor: `${accent}55`,
            color: accent,
            background: `${accent}0c`,
          }}
        >
          <Code2 className="size-3.5" strokeWidth={2.5} />
          <span>Engineering</span>
          <span className="opacity-50">/</span>
          <span style={{ color: '#cbd5e1' }}>v2026</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.32em] uppercase text-slate-400">
          <span
            className="inline-block size-1.5 rounded-full"
            style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
          />
          <span>Available · Booking Q1</span>
        </div>
      </div>

      <div className="relative z-10 grid h-[calc(100%-7.5rem)] grid-cols-12 gap-10 px-14 pt-8 pb-2">
        {/* LEFT */}
        <div className="col-span-7 flex min-w-0 flex-col">
          <h1
            className="text-[60px] font-bold leading-[1.0] tracking-[-0.025em] text-balance text-white"
            style={{ textShadow: '0 4px 60px rgba(0,0,0,0.5)' }}
          >
            {title}
          </h1>
          <p
            className="mt-5 max-w-[540px] text-[19px] leading-snug text-balance"
            style={{ color: accent }}
          >
            {subtitle}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            {Array.from({ length: visibleSkillSlots }, (_, i) => {
              const src = skillSlots[i]?.trim()
              if (src) {
                return (
                  <div
                    key={`${i}-${src.slice(0, 24)}`}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border p-1.5 backdrop-blur-md"
                    style={{
                      borderColor: `${accent}33`,
                      background: '#ffffff0a',
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
                  key={`s1-ph-${i}`}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-dashed"
                  style={{
                    borderColor: `${accent}40`,
                    background: '#ffffff05',
                  }}
                  aria-hidden
                >
                  <Activity className="size-5 text-white/35" strokeWidth={1.5} />
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT — code editor + optional hero stack */}
        <div className="col-span-5 flex min-w-0 flex-col items-end justify-center gap-4">
          <div
            className="relative w-full max-w-[460px] overflow-hidden rounded-2xl border shadow-2xl"
            style={{
              background: '#0b1220',
              borderColor: '#ffffff14',
              boxShadow: `0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px ${accent}22, inset 0 1px 0 #ffffff14`,
            }}
          >
            {/* macOS-style chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-rose-400" />
              <span className="size-2.5 rounded-full bg-amber-300" />
              <span className="size-2.5 rounded-full bg-emerald-400" />
              <div className="ml-2 flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-slate-400">
                <Terminal className="size-3" />
                <span>fiverr-gig.ts</span>
              </div>
              <div className="ml-auto font-mono text-[10px] tracking-wider text-slate-500">
                ⌘ · run
              </div>
            </div>
            {/* Code body */}
            <div className="flex font-mono text-[13.5px] leading-7">
              <div
                className="select-none border-r border-white/[0.06] px-3 py-4 text-right text-slate-600"
                style={{ minWidth: 36 }}
              >
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
              </div>
              <div className="flex-1 space-y-0 px-4 py-4">
                <div className="text-slate-500">// build · ship · scale</div>
                <div className="truncate">{tokenize(codeLine, accent)}</div>
                <div className="text-emerald-400/80">
                  <span className="text-slate-500">→ </span>
                  delivered
                  <span className="text-slate-500"> · </span>
                  <span style={{ color: accent }}>200 OK</span>
                </div>
                <div className="text-slate-600">
                  {stack[0] ? `// stack: ${stack.join(' · ')}` : '// build clean.'}
                </div>
              </div>
            </div>
          </div>

          {heroImages.length > 0 ? (
            <div className="flex w-full max-w-[460px] items-end justify-end gap-2">
              {heroImages.map((src, idx) => (
                <div
                  key={`hero-${idx}`}
                  className="relative overflow-hidden rounded-xl border shadow-xl"
                  style={{
                    width: 130,
                    aspectRatio: '4 / 3',
                    borderColor: '#ffffff1f',
                    transform: idx === 0 ? 'rotate(-3deg)' : 'rotate(2deg)',
                    boxShadow: `0 18px 40px rgba(0,0,0,0.45), 0 0 0 1px ${accent}33`,
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    className="size-full object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between border-t border-white/10 px-14 py-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.18em] uppercase text-slate-400">
          {stack.length > 0 ? (
            stack.map((label, i) => (
              <span key={`${label}-${i}`} className="flex items-center gap-3">
                {i > 0 ? (
                  <span className="text-slate-700 select-none" aria-hidden>
                    ·
                  </span>
                ) : null}
                <span className="text-slate-200">{label}</span>
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
      </div>
    </div>
  )
}

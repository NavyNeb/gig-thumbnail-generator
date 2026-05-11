import { Blend, Layers, Sparkles, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from '@/lib/thumbnail/constants'
import {
  paddedSkillIcons,
  skillIconVisibleSlotCount,
} from '@/lib/thumbnail/skill-icon-slots'
import {
  GRAPHICS3_MAX_SKILL_ICONS,
  type Graphics3Settings,
} from '@/templates/settings-types'

type Props = { settings: Graphics3Settings }

const SERIF_STACK =
  'Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif'

const ORGANIC_RADIUS = '58% 42% 62% 38% / 48% 52% 43% 57%'

function GrainNoise() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18] mix-blend-overlay"
      aria-hidden
    >
      <filter id="grain-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  )
}

function WaveLayer({ fill, fill2 }: { fill: string; fill2: string }) {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 right-0 h-[60%] w-full"
      viewBox="0 0 1280 460"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 140 C300 40 540 220 800 100 C1000 20 1140 80 1280 40 L1280 460 L0 460 Z"
        fill={fill}
        fillOpacity={0.3}
      />
      <path
        d="M0 220 C320 120 580 280 880 160 C1040 100 1180 140 1280 110 L1280 460 L0 460 Z"
        fill={fill2}
        fillOpacity={0.22}
      />
    </svg>
  )
}

export function Graphics3View({ settings }: Props) {
  const { t } = useTranslation()
  const g0 = settings.gradientFrom
  const g1 = settings.gradientVia
  const g2 = settings.gradientTo
  const ink = settings.ink
  const ag = settings.accentGraphic
  const au = settings.accentUi

  const tags = [settings.tag1, settings.tag2, settings.tag3]
    .map((s) => s.trim())
    .filter(Boolean)

  const skillSlots = paddedSkillIcons(
    settings.skillIcons,
    GRAPHICS3_MAX_SKILL_ICONS,
  )
  const visibleSkillSlots = skillIconVisibleSlotCount(
    settings.skillIcons,
    GRAPHICS3_MAX_SKILL_ICONS,
  )

  return (
    <div
      className="relative overflow-hidden font-sans antialiased"
      style={{
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        background: `linear-gradient(128deg, ${g0} 0%, ${g1} 48%, ${g2} 100%)`,
        color: ink,
      }}
    >
      <div
        className="pointer-events-none absolute -right-32 top-1/4 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: ag }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[380px] w-[380px] rounded-full opacity-25 blur-3xl"
        style={{ background: au }}
        aria-hidden
      />

      <WaveLayer fill={g1} fill2={au} />
      <GrainNoise />

      {/* Curved ribbon */}
      <svg
        className="pointer-events-none absolute top-[8%] right-[8%] h-40 w-64 opacity-50"
        viewBox="0 0 200 120"
        fill="none"
        aria-hidden
      >
        <path
          d="M10 100 Q80 20 190 40"
          stroke={ag}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M30 110 Q90 50 180 70"
          stroke={au}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 6"
        />
      </svg>

      {/* Top meta */}
      <div
        className="relative z-10 flex items-center justify-between px-[64px] pt-7 font-mono text-[10px] tracking-[0.32em] uppercase"
        style={{ color: `${ink}cc` }}
      >
        <div className="flex items-center gap-2">
          <Star className="size-3" style={{ color: ag }} fill={ag} />
          <span>Studio Hybrid · Graphics × UX</span>
        </div>
        <div className="opacity-70">{t('editor.graphics3.chromeMicro')} · 2026</div>
      </div>

      <div className="relative z-10 flex h-[calc(100%-7rem)] flex-row items-center pb-2">
        <div className="flex min-w-0 max-w-[50%] shrink-0 flex-col justify-center py-6 pl-[64px] pr-4">
          <span
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.22em] uppercase"
            style={{
              background: `linear-gradient(90deg, ${ag}33, ${au}33)`,
              border: `1px solid ${ink}33`,
              color: ink,
            }}
          >
            <Blend className="size-3" style={{ color: ag }} aria-hidden />
            {settings.badgeText}
          </span>

          <h1
            className="text-[58px] leading-[0.98] tracking-tight text-balance"
            style={{
              fontFamily: SERIF_STACK,
              fontWeight: 500,
              color: ink,
            }}
          >
            {settings.headlineLine1}
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${ag}, ${au})`,
                fontStyle: 'italic',
              }}
            >
              {settings.headlineLine2}
            </span>
          </h1>

          <p
            className="mt-5 max-w-[440px] text-[16px] font-medium leading-snug text-balance"
            style={{ color: ink, opacity: 0.92 }}
          >
            {settings.subline}
          </p>

          {tags.length > 0 ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="rounded-full px-3.5 py-1.5 text-[12px] font-bold tracking-wide"
                  style={{
                    backgroundColor: `${ink}14`,
                    border: `1px solid ${ink}30`,
                    color: ink,
                  }}
                >
                  {tag}
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
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 p-1.5 shadow-lg"
                    style={{
                      borderColor: `${ink}38`,
                      backgroundColor: `${ink}14`,
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
                  key={`g3-ph-${i}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-dashed p-1.5 opacity-60"
                  style={{ borderColor: `${ink}40` }}
                  aria-hidden
                >
                  <Layers className="size-4" style={{ color: ink }} strokeWidth={2} />
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT — organic hero + orbit */}
        <div className="relative flex min-w-0 flex-1 items-center justify-center pr-[48px]">
          <div className="relative -ml-12" style={{ transform: 'rotate(-5deg)' }}>
            {/* Backdrop accent blob */}
            <div
              className="absolute"
              style={{
                width: 420,
                height: 480,
                borderRadius: ORGANIC_RADIUS,
                background: `linear-gradient(135deg, ${ag}66, ${au}33)`,
                transform: 'translate(20px, 24px) rotate(8deg)',
                filter: 'blur(2px)',
                opacity: 0.6,
              }}
              aria-hidden
            />
            <div
              className="relative overflow-hidden shadow-2xl"
              style={{
                width: 400,
                height: 460,
                borderRadius: ORGANIC_RADIUS,
                border: `4px solid ${ink}30`,
                boxShadow: `0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px ${au}40`,
              }}
            >
              {settings.primaryImage ? (
                <img
                  src={settings.primaryImage}
                  alt=""
                  className="size-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-4 bg-black/25 p-8">
                  <Sparkles
                    className="size-16 opacity-60"
                    style={{ color: ag }}
                    aria-hidden
                  />
                  <p className="text-center text-[13px] font-bold tracking-widest uppercase opacity-70">
                    {t('editor.graphics3.primaryEmpty')}
                  </p>
                </div>
              )}
              {/* Floating chrome capsule */}
              <div
                className="absolute top-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border px-3 py-1.5 shadow-md backdrop-blur-md"
                style={{
                  borderColor: `${ink}35`,
                  backgroundColor: `${ink}1f`,
                }}
              >
                <span className="size-2 rounded-full bg-rose-400/90" />
                <span className="size-2 rounded-full bg-amber-300/90" />
                <span className="size-2 rounded-full bg-emerald-400/90" />
                <span
                  className="ml-1 text-[10px] font-bold tracking-wider uppercase opacity-80"
                  style={{ color: ink }}
                >
                  {t('editor.graphics3.chromeMicro')}
                </span>
              </div>
            </div>

            {/* Orbit detail */}
            <div
              className="absolute -bottom-2 -left-10 z-20 overflow-hidden rounded-full border-[5px] shadow-2xl"
              style={{
                width: 130,
                height: 130,
                borderColor: `${ink}55`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 0 4px ${ag}55`,
              }}
            >
              {settings.detailImage ? (
                <img
                  src={settings.detailImage}
                  alt=""
                  className="size-full object-cover"
                  draggable={false}
                />
              ) : (
                <div
                  className="flex size-full items-center justify-center text-[11px] font-bold leading-tight opacity-50"
                  style={{
                    color: ink,
                    background: `conic-gradient(from 180deg, ${au}28, ${ag}1c, transparent)`,
                  }}
                >
                  {t('editor.graphics3.detailEmpty')}
                </div>
              )}
            </div>

            {/* Tiny kinetic ornament — orbit dots */}
            <div
              className="pointer-events-none absolute -right-8 top-[32%] flex flex-col gap-2"
              aria-hidden
            >
              <span className="size-2 rounded-full" style={{ background: ag }} />
              <span
                className="size-1.5 rounded-full opacity-70"
                style={{ background: au }}
              />
              <span
                className="size-1 rounded-full opacity-50"
                style={{ background: ink }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-[64px] py-3.5 font-mono text-[11px] tracking-[0.22em] uppercase"
        style={{
          color: ink,
          background: `linear-gradient(90deg, transparent, ${ink}14, transparent)`,
          borderTop: `1px solid ${ink}24`,
        }}
      >
        <span className="opacity-90">{settings.footerTag}</span>
        <span className="flex items-center gap-2 opacity-70">
          <span className="size-1.5 rounded-full" style={{ background: ag }} />
          <span>Hybrid · 2026</span>
        </span>
      </div>
    </div>
  )
}

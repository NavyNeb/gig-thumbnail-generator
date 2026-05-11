import { Flame, Heart, Megaphone, MoveRight, User } from 'lucide-react'

import {
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from '@/lib/thumbnail/constants'
import {
  paddedSkillIcons,
  skillIconVisibleSlotCount,
} from '@/lib/thumbnail/skill-icon-slots'
import {
  MARKETING2_MAX_SKILL_ICONS,
  type Marketing2Settings,
} from '@/templates/settings-types'

type Props = { settings: Marketing2Settings }

const CONDENSED_DISPLAY = {
  fontFamily:
    '"Helvetica Neue", "Inter", "Arial Narrow", sans-serif',
  fontWeight: 900,
  letterSpacing: '-0.04em',
  fontStretch: 'condensed',
}

const CHIP_ICONS = [Heart, Flame, Megaphone] as const

function HalftoneCircle({
  color,
  size = 360,
}: {
  color: string
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="absolute"
      aria-hidden
    >
      <defs>
        <radialGradient id="m2-half" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <pattern
          id="m2-dots"
          x="0"
          y="0"
          width="3"
          height="3"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.5" cy="1.5" r="0.85" fill="url(#m2-half)" />
        </pattern>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#m2-dots)" />
    </svg>
  )
}

function AvatarRing({
  text,
  ink,
  accent,
}: {
  text: string
  ink: string
  accent: string
}) {
  const repeated = `${text}  •  ${text}  •  ${text}  •  `
  return (
    <svg
      viewBox="0 0 200 200"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <path
          id="m2-ring"
          d="M 100,100 m -88,0 a 88,88 0 1,0 176,0 a 88,88 0 1,0 -176,0"
        />
      </defs>
      <circle
        cx="100"
        cy="100"
        r="92"
        fill="none"
        stroke={ink}
        strokeWidth="1.5"
        strokeOpacity="0.35"
      />
      <circle
        cx="100"
        cy="100"
        r="84"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeDasharray="2 5"
      />
      <text
        fontSize="9"
        fontWeight="700"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        letterSpacing="2"
        fill={ink}
      >
        <textPath href="#m2-ring">{repeated}</textPath>
      </text>
    </svg>
  )
}

export function Marketing2View({ settings }: Props) {
  const bg = settings.bgColor
  const paper = settings.paperColor
  const ink = settings.inkColor
  const hot = settings.hotAccent
  const second = settings.secondAccent

  const chips = [
    { label: settings.chip1Label, value: settings.chip1Value },
    { label: settings.chip2Label, value: settings.chip2Value },
    { label: settings.chip3Label, value: settings.chip3Value },
  ]
  const chipRotations = ['-rotate-3', 'rotate-2', '-rotate-1']
  const chipPositions = [
    { top: '36%', left: '46%' },
    { top: '20%', left: '60%' },
    { top: '54%', left: '58%' },
  ]

  const skillSlots = paddedSkillIcons(
    settings.skillIcons,
    MARKETING2_MAX_SKILL_ICONS,
  )
  const visibleSkillSlots = skillIconVisibleSlotCount(
    settings.skillIcons,
    MARKETING2_MAX_SKILL_ICONS,
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
      {/* halftone radial backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${ink}26 1px, transparent 1.4px)`,
          backgroundSize: '14px 14px',
          opacity: 0.55,
        }}
        aria-hidden
      />
      {/* paper shape */}
      <div
        className="pointer-events-none absolute inset-x-10 inset-y-8 rounded-[28px]"
        style={{
          background: paper,
          boxShadow: `0 30px 70px ${ink}33, inset 0 0 0 2px ${ink}`,
        }}
        aria-hidden
      />

      {/* halftone color blob top-right */}
      <div
        className="pointer-events-none absolute"
        style={{ top: -80, right: -80 }}
      >
        <HalftoneCircle color={hot} size={520} />
      </div>
      {/* secondary halftone blob bottom-left */}
      <div
        className="pointer-events-none absolute"
        style={{ bottom: -120, left: -100 }}
      >
        <HalftoneCircle color={second} size={420} />
      </div>

      {/* Tape strip — top-left */}
      <div
        className="absolute z-20 inline-flex items-center gap-2 px-5 py-1.5 font-mono text-[12px] font-bold tracking-[0.32em] uppercase"
        style={{
          top: 56,
          left: 64,
          background: hot,
          color: paper,
          transform: 'rotate(-3deg)',
          boxShadow: `4px 4px 0 ${ink}`,
        }}
      >
        <Flame className="size-3.5" />
        {settings.tapeText}
      </div>

      {/* Big outline number — top-right */}
      <div
        className="absolute z-10 select-none text-right leading-none"
        style={{ top: 60, right: 70 }}
      >
        <div
          className="text-[200px]"
          style={{
            ...CONDENSED_DISPLAY,
            WebkitTextStroke: `3px ${ink}`,
            color: 'transparent',
            lineHeight: 0.85,
          }}
        >
          {settings.bigNumber}
        </div>
        <div
          className="-mt-1 inline-block rounded-sm px-2 py-0.5 font-mono text-[11px] font-bold tracking-[0.22em] uppercase"
          style={{ background: ink, color: paper }}
        >
          {settings.bigNumberLabel}
        </div>
      </div>

      <div className="relative z-20 flex h-full flex-col px-[88px] pt-[148px] pb-[110px]">
        {/* Top badge */}
        <div
          className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border-2 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.28em] uppercase"
          style={{ borderColor: ink, color: ink }}
        >
          <span
            className="size-2 rounded-full"
            style={{ background: hot }}
          />
          {settings.badgeText}
        </div>

        {/* Massive condensed headline stack */}
        <div className="relative flex flex-col" style={CONDENSED_DISPLAY}>
          <span
            className="text-[120px] leading-[0.86]"
            style={{ color: ink }}
          >
            {settings.headlineWord1}
          </span>
          <span
            className="text-[120px] leading-[0.86]"
            style={{
              color: 'transparent',
              WebkitTextStroke: `2.5px ${ink}`,
            }}
          >
            {settings.headlineWord2}
          </span>
          <span
            className="text-[120px] leading-[0.86]"
            style={{
              color: hot,
              textShadow: `4px 4px 0 ${ink}`,
            }}
          >
            {settings.headlineWord3}
          </span>
        </div>

        <p
          className="mt-6 max-w-[440px] text-[15px] font-semibold leading-snug"
          style={{ color: ink }}
        >
          {settings.subline}
        </p>

        {/* Bottom row: avatar + handle + skill icons */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-end gap-4">
            <div className="relative h-[148px] w-[148px]">
              <AvatarRing
                text={settings.avatarRingText}
                ink={ink}
                accent={hot}
              />
              <div
                className="absolute inset-[14px] overflow-hidden rounded-full"
                style={{ border: `3px solid ${ink}` }}
              >
                {settings.avatarImage ? (
                  <img
                    src={settings.avatarImage}
                    alt=""
                    className="size-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div
                    className="flex size-full items-center justify-center"
                    style={{ background: second }}
                  >
                    <User
                      className="size-12"
                      style={{ color: ink }}
                      strokeWidth={2}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mb-1 flex flex-col">
              <div
                className="rounded-md px-2 py-1 font-mono text-[12px] font-bold tracking-wider"
                style={{ background: ink, color: paper }}
              >
                {settings.avatarHandle}
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                {Array.from({ length: visibleSkillSlots }, (_, i) => {
                  const src = skillSlots[i]?.trim()
                  if (src) {
                    return (
                      <div
                        key={`${i}-${src.slice(0, 24)}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md p-1"
                        style={{
                          background: paper,
                          border: `2px solid ${ink}`,
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
                      key={`m2-ph-${i}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
                      style={{
                        background: `${ink}10`,
                        border: `2px dashed ${ink}55`,
                      }}
                      aria-hidden
                    >
                      <Heart className="size-4" style={{ color: ink }} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating tilted chip stickers */}
      {chips.map((c, i) => {
        if (!c.label?.trim() && !c.value?.trim()) return null
        const Icon = CHIP_ICONS[i % CHIP_ICONS.length]
        const pos = chipPositions[i] ?? chipPositions[0]
        return (
          <div
            key={`m2-chip-${i}`}
            className={`absolute z-30 ${chipRotations[i]} flex items-center gap-3 rounded-[18px] px-4 py-2.5`}
            style={{
              ...pos,
              background: i === 0 ? second : i === 1 ? paper : hot,
              color: i === 2 ? paper : ink,
              border: `2.5px solid ${ink}`,
              boxShadow: `5px 5px 0 ${ink}`,
            }}
          >
            <Icon className="size-5 shrink-0" strokeWidth={2.5} />
            <div>
              <div className="font-mono text-[10px] font-bold tracking-[0.18em] uppercase opacity-80">
                {c.label}
              </div>
              <div
                className="text-[22px] font-black leading-none"
                style={{ letterSpacing: '-0.02em' }}
              >
                {c.value}
              </div>
            </div>
          </div>
        )
      })}

      {/* Footer ribbon */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between border-t-2 px-[88px] py-3 font-mono text-[11px] font-bold tracking-[0.28em] uppercase"
        style={{ borderColor: ink, background: ink, color: paper }}
      >
        <span className="flex items-center gap-2">
          <MoveRight className="size-4" />
          {settings.footerTag}
        </span>
        <span style={{ color: hot }}>★ ★ ★ ★ ★</span>
      </div>
    </div>
  )
}

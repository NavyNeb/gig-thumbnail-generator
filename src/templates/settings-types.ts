import type { TemplateId } from '@/templates/template-ids'

/** Max counts for software-1 template media & footer */
export const SOFTWARE1_MAX_HERO_IMAGES = 2
export const SOFTWARE1_MAX_SKILL_ICONS = 6
export const SOFTWARE1_MAX_STACK_LABELS = 5

/** First Software Development template — code / terminal aesthetic */
export type Software1Settings = {
  title: string
  subtitle: string
  /** Decorative line (e.g. fake snippet) */
  codeLine: string
  gradientFrom: string
  gradientTo: string
  accent: string
  /** Right column — user images (data URLs), max 2 */
  heroImages: string[]
  /** Row under subtitle — small icons (data URLs), max 6 */
  skillIcons: string[]
  /** Footer stack labels, max 5 non-empty shown */
  stackLabels: string[]
}

/** Second Software Development template — “Website Development Services” style */
export const SOFTWARE2_MAX_SERVICES = 4
export const SOFTWARE2_MAX_SKILL_ICONS = 6

export type Software2Settings = {
  /** Base canvas */
  navy: string
  /** Card / panel surface */
  pink: string
  /** Accent (lines, CTAs, hero border) */
  lavender: string
  headlineLine1: string
  headlineLine2: string
  headlinePill: string
  servicesSectionTitle: string
  /** Exactly four service lines (UI may leave some empty) */
  serviceItems: string[]
  /** Below services panel — small icons (data URLs), max 6 */
  skillIcons: string[]
  /** Shown when no logo image */
  brandName: string
  brandLogo: string
  heroImage: string
  ctaLabel: string
  phonePrefix: string
  phoneValue: string
  websitePrefix: string
  websiteValue: string
}

/** Third Software Development template — split canvas, laptop hero, avatar */
export const SOFTWARE3_MAX_SERVICES = 4
export const SOFTWARE3_MAX_SKILL_ICONS = 6

export type Software3Settings = {
  /** Left panel background */
  whitePanel: string
  /** Right panel background */
  purplePanel: string
  /** Orange badge & accents */
  orangeAccent: string
  /** Service pill fill on white area */
  servicePillBg: string
  headlineLine1: string
  headlineLine2: string
  badgeText: string
  tagline: string
  serviceItems: string[]
  skillIcons: string[]
  brandName: string
  brandTagline: string
  brandLogo: string
  /** Bottom-left profile photo (data URL) */
  avatarImage: string
  avatarName: string
  avatarRole: string
  footerHeading: string
  websiteUrl: string
}

/** First Graphics & Design template — vector-poster, showcase frame */
export const GRAPHICS1_MAX_SKILL_ICONS = 6

export type Graphics1Settings = {
  bgBase: string
  ink: string
  accent1: string
  accent2: string
  headlineLine1: string
  headlineLine2: string
  badgeText: string
  subline: string
  featureLine1: string
  featureLine2: string
  featureLine3: string
  /** Hero mockup / sample work (data URL) */
  showcaseImage: string
  skillIcons: string[]
  footerTag: string
}

/** Second Graphics & Design template — UI/UX designer, device mockup */
export const GRAPHICS2_MAX_SKILL_ICONS = 6

export type Graphics2Settings = {
  bgBase: string
  gridColor: string
  ink: string
  accent: string
  surface: string
  headlineLine1: string
  headlineLine2: string
  badgeText: string
  subline: string
  featureLine1: string
  featureLine2: string
  featureLine3: string
  /** Screen content inside phone mockup (data URL) */
  deviceImage: string
  /** Small label above device (e.g. prototype name) */
  chromeLabel: string
  skillIcons: string[]
  footerTag: string
}

/** Third Graphics & Design — hybrid graphic + UI/UX, organic shapes (no square panels) */
export const GRAPHICS3_MAX_SKILL_ICONS = 6

export type Graphics3Settings = {
  gradientFrom: string
  gradientVia: string
  gradientTo: string
  ink: string
  accentGraphic: string
  accentUi: string
  headlineLine1: string
  headlineLine2: string
  badgeText: string
  subline: string
  tag1: string
  tag2: string
  tag3: string
  /** Main work — poster, brand, or full UI (organic frame) */
  primaryImage: string
  /** Optional UI detail / logo mark (circular) */
  detailImage: string
  skillIcons: string[]
  footerTag: string
}

/** Minimal shared shape until a template gets a full editor */
export type PlaceholderTemplateSettings = {
  title: string
}

/** First Digital Marketing template — editorial analytics “Pulse Dashboard” */
export const MARKETING1_MAX_SKILL_ICONS = 6
export const MARKETING1_KPI_COUNT = 3
export const MARKETING1_CHANNEL_COUNT = 3

export type Marketing1Settings = {
  /** Dark editorial canvas */
  canvasBg: string
  /** Bone / cream text */
  ink: string
  /** Muted secondary text */
  mute: string
  /** Electric accent (chart, badges) */
  accent: string
  /** Softer accent halo */
  accentSoft: string
  badgeText: string
  headlineLine1: string
  /** Italic accent-colored line of the serif headline */
  headlineLine2: string
  subline: string
  channel1: string
  channel2: string
  channel3: string
  chartCaption: string
  chartTrendLabel: string
  /** Pill on top of chart (e.g. “+47%”) */
  chartBadge: string
  kpi1Label: string
  kpi1Value: string
  kpi1Delta: string
  kpi2Label: string
  kpi2Value: string
  kpi2Delta: string
  kpi3Label: string
  kpi3Value: string
  kpi3Delta: string
  tickerLine: string
  brandName: string
  brandLogo: string
  skillIcons: string[]
  footerTag: string
  metaTag: string
}

/** Second Digital Marketing template — bold conversion poster */
export const MARKETING2_MAX_SKILL_ICONS = 6
export const MARKETING2_CHIP_COUNT = 3

export type Marketing2Settings = {
  /** Paper canvas */
  bgColor: string
  /** Card / surface tone */
  paperColor: string
  inkColor: string
  /** Hot accent (headline word, big number) */
  hotAccent: string
  /** Secondary sticker accent */
  secondAccent: string
  badgeText: string
  /** Oversized number callout, e.g. “+412%” */
  bigNumber: string
  bigNumberLabel: string
  headlineWord1: string
  headlineWord2: string
  headlineWord3: string
  subline: string
  avatarImage: string
  /** Mono text repeated around the avatar ring */
  avatarRingText: string
  avatarHandle: string
  chip1Label: string
  chip1Value: string
  chip2Label: string
  chip2Value: string
  chip3Label: string
  chip3Value: string
  skillIcons: string[]
  footerTag: string
  tapeText: string
}

/** Third Digital Marketing template — brutalist SEO funnel */
export const MARKETING3_MAX_SKILL_ICONS = 6
export const MARKETING3_RANK_COUNT = 3
export const MARKETING3_KEYWORD_COUNT = 5

export type Marketing3Settings = {
  /** Near-black canvas */
  bgColor: string
  /** Warm white text */
  ink: string
  /** Acid accent (rank #1 highlight, arrow) */
  accent: string
  mute: string
  /** Off-white card surface */
  paper: string
  metaIndex: string
  metaCategory: string
  metaDate: string
  headlineLine1: string
  /** Outline-stroke middle line */
  headlineLine2: string
  headlineLine3: string
  subline: string
  rank1Term: string
  rank1Url: string
  rank1Delta: string
  rank2Term: string
  rank2Url: string
  rank2Delta: string
  rank3Term: string
  rank3Url: string
  rank3Delta: string
  keyword1: string
  keyword2: string
  keyword3: string
  keyword4: string
  keyword5: string
  skillIcons: string[]
  footerTag: string
}

export type TemplateSettingsMap = {
  'software-1': Software1Settings
  'software-2': Software2Settings
  'software-3': Software3Settings
  'graphics-1': Graphics1Settings
  'graphics-2': Graphics2Settings
  'graphics-3': Graphics3Settings
  'marketing-1': Marketing1Settings
  'marketing-2': Marketing2Settings
  'marketing-3': Marketing3Settings
}

export type TemplateSettingsFor<T extends TemplateId> = TemplateSettingsMap[T]

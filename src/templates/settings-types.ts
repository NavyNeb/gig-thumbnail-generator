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

export type TemplateSettingsMap = {
  'software-1': Software1Settings
  'software-2': Software2Settings
  'software-3': Software3Settings
  'graphics-1': Graphics1Settings
  'graphics-2': Graphics2Settings
  'graphics-3': Graphics3Settings
  'marketing-1': PlaceholderTemplateSettings
  'marketing-2': PlaceholderTemplateSettings
  'marketing-3': PlaceholderTemplateSettings
}

export type TemplateSettingsFor<T extends TemplateId> = TemplateSettingsMap[T]

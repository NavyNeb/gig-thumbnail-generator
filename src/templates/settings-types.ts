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

/** Minimal shared shape until a template gets a full editor */
export type PlaceholderTemplateSettings = {
  title: string
}

export type TemplateSettingsMap = {
  'software-1': Software1Settings
  'software-2': Software2Settings
  'software-3': Software3Settings
  'graphics-1': PlaceholderTemplateSettings
  'graphics-2': PlaceholderTemplateSettings
  'graphics-3': PlaceholderTemplateSettings
  'marketing-1': PlaceholderTemplateSettings
  'marketing-2': PlaceholderTemplateSettings
  'marketing-3': PlaceholderTemplateSettings
}

export type TemplateSettingsFor<T extends TemplateId> = TemplateSettingsMap[T]

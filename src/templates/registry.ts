import type { ComponentType } from 'react'

import type { CategoryId, TemplateId } from '@/templates/template-ids'
import type { TemplateSettingsMap } from '@/templates/settings-types'
import { Software1View } from '@/templates/software/software-1-view'
import { Software1Controls } from '@/templates/software/software-1-controls'
import { Software2View } from '@/templates/software/software-2-view'
import { Software2Controls } from '@/templates/software/software-2-controls'
import { Software3View } from '@/templates/software/software-3-view'
import { Software3Controls } from '@/templates/software/software-3-controls'
import { Graphics1View } from '@/templates/graphics/graphics-1-view'
import { Graphics1Controls } from '@/templates/graphics/graphics-1-controls'
import { Graphics2View } from '@/templates/graphics/graphics-2-view'
import { Graphics2Controls } from '@/templates/graphics/graphics-2-controls'
import { Graphics3View } from '@/templates/graphics/graphics-3-view'
import { Graphics3Controls } from '@/templates/graphics/graphics-3-controls'
import { Marketing1View } from '@/templates/marketing/marketing-1-view'
import { Marketing1Controls } from '@/templates/marketing/marketing-1-controls'
import { Marketing2View } from '@/templates/marketing/marketing-2-view'
import { Marketing2Controls } from '@/templates/marketing/marketing-2-controls'
import { Marketing3View } from '@/templates/marketing/marketing-3-view'
import { Marketing3Controls } from '@/templates/marketing/marketing-3-controls'

export type TemplateStatus = 'ready' | 'placeholder'

export type TemplateRegistryEntry<T extends TemplateId = TemplateId> = {
  categoryId: CategoryId
  status: TemplateStatus
  defaultSettings: TemplateSettingsMap[T]
  View: ComponentType<{ settings: TemplateSettingsMap[T] }>
  Controls: ComponentType
}

export const TEMPLATE_REGISTRY: {
  [K in TemplateId]: TemplateRegistryEntry<K>
} = {
  'software-1': {
    categoryId: 'software',
    status: 'ready',
    defaultSettings: {
      title: 'Full‑stack web apps with React & Node',
      subtitle:
        'Clean architecture · Fast delivery · Production‑ready code',
      codeLine: 'const gig = await deliver({ quality: "exceptional" })',
      gradientFrom: '#0f172a',
      gradientTo: '#1e3a8a',
      accent: '#38bdf8',
      heroImages: [],
      skillIcons: [],
      stackLabels: ['React', 'TypeScript', 'Node'],
    },
    View: Software1View,
    Controls: Software1Controls,
  },
  'software-2': {
    categoryId: 'software',
    status: 'ready',
    defaultSettings: {
      navy: '#0a0e17',
      pink: '#121a2e',
      lavender: '#3b82f6',
      headlineLine1: 'Website',
      headlineLine2: 'Development',
      headlinePill: 'Services',
      servicesSectionTitle: 'Our Services:',
      serviceItems: [
        'Web Design',
        'Professional Website',
        'Web Development',
        'Search Engine Optimization',
      ],
      skillIcons: [],
      brandName: 'Aldenaire & Partners',
      brandLogo: '',
      heroImage: '',
      ctaLabel: 'BOOK NOW',
      phonePrefix: 'Phone Number:',
      phoneValue: '+123-456-7890',
      websitePrefix: 'Website:',
      websiteValue: 'reallygreatsite.com',
    },
    View: Software2View,
    Controls: Software2Controls,
  },
  'software-3': {
    categoryId: 'software',
    status: 'ready',
    defaultSettings: {
      whitePanel: '#ffffff',
      purplePanel: '#5b21b6',
      orangeAccent: '#ea580c',
      servicePillBg: '#6d28d9',
      headlineLine1: 'Software',
      headlineLine2: 'Built',
      badgeText: 'For Your Business',
      tagline:
        'Custom solutions tailored to your workflow and goals',
      serviceItems: [
        'Custom Web App Development',
        'Mobile App Development',
        'Software Integration Services',
        'Maintenance & Support',
      ],
      skillIcons: [],
      brandName: 'Paucek and Lage',
      brandTagline: 'Company',
      brandLogo: '',
      avatarImage: '',
      avatarName: 'Your Name',
      avatarRole: 'Lead Developer',
      footerHeading: 'Further Information',
      websiteUrl: 'www.reallygreatsite.com',
    },
    View: Software3View,
    Controls: Software3Controls,
  },
  'graphics-1': {
    categoryId: 'graphics',
    status: 'ready',
    defaultSettings: {
      bgBase: '#f4f0e8',
      ink: '#1a1a2e',
      accent1: '#e11d48',
      accent2: '#0d9488',
      headlineLine1: 'Bold brands',
      headlineLine2: '& vector systems',
      badgeText: 'Graphic design',
      subline:
        'Logos, icons, and social kits — crisp, scalable, on-brand.',
      featureLine1: 'Vector-first style',
      featureLine2: 'Print & digital',
      featureLine3: 'Source files included',
      showcaseImage: '',
      skillIcons: [],
      footerTag: 'Fiverr · Same-day reply',
    },
    View: Graphics1View,
    Controls: Graphics1Controls,
  },
  'graphics-2': {
    categoryId: 'graphics',
    status: 'ready',
    defaultSettings: {
      bgBase: '#f1f5f9',
      gridColor: '#cbd5e1',
      ink: '#0f172a',
      accent: '#4f46e5',
      surface: '#ffffff',
      headlineLine1: 'Product flows',
      headlineLine2: 'pixel-perfect UI',
      badgeText: 'UI / UX design',
      subline:
        'User research, wireframes, hi-fi screens, and dev-ready handoff.',
      featureLine1: 'Research & journey mapping',
      featureLine2: 'Wireframes & prototypes',
      featureLine3: 'UI systems & components',
      deviceImage: '',
      chromeLabel: 'Prototype v2',
      skillIcons: [],
      footerTag: 'Figma · Web & mobile · Design systems',
    },
    View: Graphics2View,
    Controls: Graphics2Controls,
  },
  'graphics-3': {
    categoryId: 'graphics',
    status: 'ready',
    defaultSettings: {
      gradientFrom: '#1e1b4b',
      gradientVia: '#5b21b6',
      gradientTo: '#9d174d',
      ink: '#fafafa',
      accentGraphic: '#f472b6',
      accentUi: '#38bdf8',
      headlineLine1: 'Visual stories',
      headlineLine2: 'that ship as UI',
      badgeText: 'Design × Product',
      subline:
        'Brand systems, interfaces, and motion — one craft, two outputs.',
      tag1: 'Brand & illustration',
      tag2: 'Product UI',
      tag3: 'Design systems',
      primaryImage: '',
      detailImage: '',
      skillIcons: [],
      footerTag: 'Graphics · UX · Let’s build',
    },
    View: Graphics3View,
    Controls: Graphics3Controls,
  },
  'marketing-1': {
    categoryId: 'marketing',
    status: 'ready',
    defaultSettings: {
      canvasBg: '#0a1f1c',
      ink: '#f0e6cf',
      mute: '#92a59c',
      accent: '#34d399',
      accentSoft: '#86efb6',
      badgeText: 'Pulse · Performance Marketing',
      headlineLine1: 'Numbers that',
      headlineLine2: 'compound monthly.',
      subline:
        'Paid media, SEO, and lifecycle — built into one growth engine. Track every dollar.',
      channel1: 'META',
      channel2: 'GOOGLE',
      channel3: 'TIKTOK',
      chartCaption: 'ROAS · Last 30 days',
      chartTrendLabel: 'Compounding · Cohort 04',
      chartBadge: '+47%',
      kpi1Label: 'ROAS',
      kpi1Value: '7.4×',
      kpi1Delta: '+1.8×',
      kpi2Label: 'CAC',
      kpi2Value: '$18.20',
      kpi2Delta: '−32%',
      kpi3Label: 'CTR',
      kpi3Value: '4.8%',
      kpi3Delta: '+1.4 pt',
      tickerLine:
        'CTR ↑ 4.8% · CPC ↓ $0.42 · ROAS 7.4× · Convs +312 · LTV $184',
      brandName: 'NORTHWIND CO.',
      brandLogo: '',
      skillIcons: [],
      footerTag: 'Issue 04 · Growth Quarterly',
      metaTag: 'Est. MMXXVI',
    },
    View: Marketing1View,
    Controls: Marketing1Controls,
  },
  'marketing-2': {
    categoryId: 'marketing',
    status: 'ready',
    defaultSettings: {
      bgColor: '#f7eddf',
      paperColor: '#fffbf2',
      inkColor: '#0a0a0a',
      hotAccent: '#ff2e5a',
      secondAccent: '#ffd60a',
      badgeText: 'Creator Growth · 30d Sprint',
      bigNumber: '+412%',
      bigNumberLabel: 'Followers / 30d',
      headlineWord1: 'Stop',
      headlineWord2: 'guessing.',
      headlineWord3: 'Go viral.',
      subline:
        'Content systems, hook frameworks, and paid amplification for creators who refuse to plateau.',
      avatarImage: '',
      avatarRingText: '+1.2M FOLLOWERS · ENGAGEMENT 8.6%',
      avatarHandle: '@yourhandle',
      chip1Label: 'Engagement',
      chip1Value: '8.6%',
      chip2Label: 'Reach',
      chip2Value: '4.1M',
      chip3Label: 'Saves',
      chip3Value: '+92K',
      skillIcons: [],
      footerTag: 'Book a strategy call',
      tapeText: 'Viral · 2026',
    },
    View: Marketing2View,
    Controls: Marketing2Controls,
  },
  'marketing-3': {
    categoryId: 'marketing',
    status: 'ready',
    defaultSettings: {
      bgColor: '#0e0e10',
      ink: '#f5f1e6',
      mute: '#7a7d75',
      accent: '#7CFFB2',
      paper: '#f4f1e8',
      metaIndex: 'No 03',
      metaCategory: 'SEO / Growth Funnel',
      metaDate: 'EST. MMXXVI',
      headlineLine1: 'Rank',
      headlineLine2: 'Convert',
      headlineLine3: 'Compound',
      subline:
        'Topical maps, programmatic SEO, and conversion-led briefs that move you to position one — and keep you there.',
      rank1Term: 'best CRM for agencies',
      rank1Url: 'yourstudio.com/crm',
      rank1Delta: '14',
      rank2Term: 'agency pricing guide',
      rank2Url: 'yourstudio.com/pricing',
      rank2Delta: '8',
      rank3Term: 'how to retain clients',
      rank3Url: 'yourstudio.com/retain',
      rank3Delta: '5',
      keyword1: 'topical authority',
      keyword2: 'programmatic seo',
      keyword3: 'cluster strategy',
      keyword4: 'link velocity',
      keyword5: 'commercial intent',
      skillIcons: [],
      footerTag: 'Indexed · 2026 · Top 3 in 90 days',
    },
    View: Marketing3View,
    Controls: Marketing3Controls,
  },
}

export const ALL_TEMPLATE_IDS = Object.keys(TEMPLATE_REGISTRY) as TemplateId[]

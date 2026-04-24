import { createElement, type ComponentType } from 'react'

import type { CategoryId, TemplateId } from '@/templates/template-ids'
import type { TemplateSettingsMap } from '@/templates/settings-types'
import { makePlaceholderThumbnailView } from '@/templates/placeholder/placeholder-view'
import { PlaceholderControls } from '@/templates/placeholder/placeholder-controls'
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

export type TemplateStatus = 'ready' | 'placeholder'

export type TemplateRegistryEntry<T extends TemplateId = TemplateId> = {
  categoryId: CategoryId
  status: TemplateStatus
  defaultSettings: TemplateSettingsMap[T]
  View: ComponentType<{ settings: TemplateSettingsMap[T] }>
  Controls: ComponentType
}

function ph<K extends TemplateId>(
  id: K,
  categoryId: CategoryId,
  tone: 'software' | 'graphics' | 'marketing',
  title: string,
): TemplateRegistryEntry<K> {
  return {
    categoryId,
    status: 'placeholder',
    defaultSettings: { title },
    View: makePlaceholderThumbnailView(tone),
    Controls: function PlaceholderControlsBound() {
      return createElement(PlaceholderControls, { templateId: id })
    },
  } as unknown as TemplateRegistryEntry<K>
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
  'marketing-1': ph(
    'marketing-1',
    'marketing',
    'marketing',
    'Marketing template 1',
  ),
  'marketing-2': ph(
    'marketing-2',
    'marketing',
    'marketing',
    'Marketing template 2',
  ),
  'marketing-3': ph(
    'marketing-3',
    'marketing',
    'marketing',
    'Marketing template 3',
  ),
}

export const ALL_TEMPLATE_IDS = Object.keys(TEMPLATE_REGISTRY) as TemplateId[]

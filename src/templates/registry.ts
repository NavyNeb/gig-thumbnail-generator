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
  'graphics-1': ph(
    'graphics-1',
    'graphics',
    'graphics',
    'Graphics template 1',
  ),
  'graphics-2': ph(
    'graphics-2',
    'graphics',
    'graphics',
    'Graphics template 2',
  ),
  'graphics-3': ph(
    'graphics-3',
    'graphics',
    'graphics',
    'Graphics template 3',
  ),
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

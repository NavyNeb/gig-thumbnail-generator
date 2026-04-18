import { create } from 'zustand'

import type { CategoryId, TemplateId } from '@/templates/template-ids'
import {
  CATEGORY_TEMPLATE_IDS,
  templateCategory,
} from '@/templates/template-ids'
import type { TemplateSettingsMap } from '@/templates/settings-types'
import { TEMPLATE_REGISTRY } from '@/templates/registry'

function buildDefaultSettings(): TemplateSettingsMap {
  const entries = Object.entries(TEMPLATE_REGISTRY) as [
    keyof TemplateSettingsMap,
    (typeof TEMPLATE_REGISTRY)[TemplateId],
  ][]
  return Object.fromEntries(
    entries.map(([id, def]) => [id, structuredClone(def.defaultSettings)]),
  ) as TemplateSettingsMap
}

type EditorState = {
  activeCategoryId: CategoryId
  activeTemplateId: TemplateId
  settingsByTemplateId: TemplateSettingsMap
  setActiveCategory: (id: CategoryId) => void
  setActiveTemplate: (id: TemplateId) => void
  updateTemplateSettings: <T extends TemplateId>(
    id: T,
    patch: Partial<TemplateSettingsMap[T]>,
  ) => void
}

export const useEditorStore = create<EditorState>()((set, get) => ({
    activeCategoryId: 'software',
    activeTemplateId: 'software-1',
    settingsByTemplateId: buildDefaultSettings(),

    setActiveCategory: (id) => {
      const current = get().activeTemplateId
      const alreadyInCategory = templateCategory(current) === id
      const nextTemplate = alreadyInCategory
        ? current
        : CATEGORY_TEMPLATE_IDS[id][0]
      set({
        activeCategoryId: id,
        activeTemplateId: nextTemplate,
      })
    },

    setActiveTemplate: (id) => {
      set({
        activeTemplateId: id,
        activeCategoryId: templateCategory(id),
      })
    },

    updateTemplateSettings: (id, patch) =>
      set((state) => ({
        settingsByTemplateId: {
          ...state.settingsByTemplateId,
          [id]: {
            ...state.settingsByTemplateId[id],
            ...patch,
          },
        },
      })),
}))

export type CategoryId = 'software' | 'graphics' | 'marketing'

export type TemplateId =
  | 'software-1'
  | 'software-2'
  | 'software-3'
  | 'graphics-1'
  | 'graphics-2'
  | 'graphics-3'
  | 'marketing-1'
  | 'marketing-2'
  | 'marketing-3'

export const CATEGORY_TEMPLATE_IDS: Record<CategoryId, readonly TemplateId[]> = {
  software: ['software-1', 'software-2', 'software-3'],
  graphics: ['graphics-1', 'graphics-2', 'graphics-3'],
  marketing: ['marketing-1', 'marketing-2', 'marketing-3'],
}

export function templateCategory(id: TemplateId): CategoryId {
  if (id.startsWith('software-')) return 'software'
  if (id.startsWith('graphics-')) return 'graphics'
  return 'marketing'
}

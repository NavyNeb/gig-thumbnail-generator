/** Minimum icon cells shown in template previews so empty slots hint at uploads */
export const MIN_VISIBLE_SKILL_ICON_SLOTS = 3

/**
 * How many icon cells to render: at least {@link MIN_VISIBLE_SKILL_ICON_SLOTS},
 * expanding through the last non-empty slot (up to maxSlots).
 */
export function skillIconVisibleSlotCount(
  skillIcons: string[] | undefined,
  maxSlots: number,
): number {
  const raw = [...(skillIcons ?? [])]
  while (raw.length < maxSlots) raw.push('')
  const slice = raw.slice(0, maxSlots)
  let last = -1
  for (let i = 0; i < slice.length; i++) {
    if (slice[i]?.trim()) last = i
  }
  return Math.min(
    maxSlots,
    Math.max(MIN_VISIBLE_SKILL_ICON_SLOTS, last + 1),
  )
}

export function paddedSkillIcons(
  skillIcons: string[] | undefined,
  maxSlots: number,
): string[] {
  const raw = [...(skillIcons ?? [])]
  while (raw.length < maxSlots) raw.push('')
  return raw.slice(0, maxSlots)
}

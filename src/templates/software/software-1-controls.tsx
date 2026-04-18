import { useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ImagePlus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  readFileAsDataUrl,
  validateImageFile,
} from '@/lib/files/image-data-url'
import { useEditorStore } from '@/stores/editor-store'
import type { Software1Settings } from '@/templates/settings-types'
import {
  SOFTWARE1_MAX_HERO_IMAGES,
  SOFTWARE1_MAX_SKILL_ICONS,
  SOFTWARE1_MAX_STACK_LABELS,
} from '@/templates/settings-types'

function padEnd<T>(arr: T[] | undefined, len: number, fill: T): T[] {
  const a = [...(arr ?? [])]
  while (a.length < len) a.push(fill)
  return a.slice(0, len)
}

export function Software1Controls() {
  const { t } = useTranslation()
  const baseId = useId()
  const settings = useEditorStore((s) => s.settingsByTemplateId['software-1'])
  const update = useEditorStore((s) => s.updateTemplateSettings)

  const heroRef0 = useRef<HTMLInputElement>(null)
  const heroRef1 = useRef<HTMLInputElement>(null)
  const heroRefs = [heroRef0, heroRef1]

  const skillRef0 = useRef<HTMLInputElement>(null)
  const skillRef1 = useRef<HTMLInputElement>(null)
  const skillRef2 = useRef<HTMLInputElement>(null)
  const skillRef3 = useRef<HTMLInputElement>(null)
  const skillRef4 = useRef<HTMLInputElement>(null)
  const skillRef5 = useRef<HTMLInputElement>(null)
  const skillRefs = [
    skillRef0,
    skillRef1,
    skillRef2,
    skillRef3,
    skillRef4,
    skillRef5,
  ]

  const patch = (partial: Partial<Software1Settings>) => {
    update('software-1', partial)
  }

  const heroSlots = padEnd(
    (settings.heroImages ?? []).slice(0, SOFTWARE1_MAX_HERO_IMAGES),
    SOFTWARE1_MAX_HERO_IMAGES,
    '',
  )
  const skillSlots = padEnd(settings.skillIcons, SOFTWARE1_MAX_SKILL_ICONS, '')
  const stackSlots = padEnd(
    settings.stackLabels,
    SOFTWARE1_MAX_STACK_LABELS,
    '',
  )

  const setHeroSlot = async (index: number, file: File | null) => {
    if (!file) return
    const err = validateImageFile(file)
    if (err === 'invalid-type') {
      toast.error(t('editor.software1.toastInvalidType'))
      return
    }
    if (err === 'too-large') {
      toast.error(t('editor.software1.toastTooLarge'))
      return
    }
    try {
      const dataUrl = await readFileAsDataUrl(file)
      const next = padEnd(
        (settings.heroImages ?? []).slice(0, SOFTWARE1_MAX_HERO_IMAGES),
        SOFTWARE1_MAX_HERO_IMAGES,
        '',
      )
      next[index] = dataUrl
      patch({ heroImages: next })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const clearHeroSlot = (index: number) => {
    const next = padEnd(
      (settings.heroImages ?? []).slice(0, SOFTWARE1_MAX_HERO_IMAGES),
      SOFTWARE1_MAX_HERO_IMAGES,
      '',
    )
    next[index] = ''
    patch({ heroImages: next })
  }

  const setSkillSlot = async (index: number, file: File | null) => {
    if (!file) return
    const err = validateImageFile(file)
    if (err === 'invalid-type') {
      toast.error(t('editor.software1.toastInvalidType'))
      return
    }
    if (err === 'too-large') {
      toast.error(t('editor.software1.toastTooLarge'))
      return
    }
    try {
      const dataUrl = await readFileAsDataUrl(file)
      const next = padEnd(settings.skillIcons, SOFTWARE1_MAX_SKILL_ICONS, '')
      next[index] = dataUrl
      patch({ skillIcons: next })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const clearSkillSlot = (index: number) => {
    const next = padEnd(settings.skillIcons, SOFTWARE1_MAX_SKILL_ICONS, '')
    next[index] = ''
    patch({ skillIcons: next })
  }

  const setStackLine = (index: number, value: string) => {
    const next = padEnd(settings.stackLabels, SOFTWARE1_MAX_STACK_LABELS, '')
    next[index] = value
    patch({ stackLabels: next })
  }

  const acceptAttr =
    'image/png,image/jpeg,image/jpg,image/svg+xml,.svg'

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor={`${baseId}-title`}>{t('editor.fields.title')}</Label>
        <Textarea
          id={`${baseId}-title`}
          value={settings.title}
          onChange={(e) => patch({ title: e.target.value })}
          rows={3}
          className="min-h-[80px] resize-y"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${baseId}-subtitle`}>{t('editor.fields.subtitle')}</Label>
        <Textarea
          id={`${baseId}-subtitle`}
          value={settings.subtitle}
          onChange={(e) => patch({ subtitle: e.target.value })}
          rows={2}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${baseId}-code`}>{t('editor.fields.codeLine')}</Label>
        <Input
          id={`${baseId}-code`}
          value={settings.codeLine}
          onChange={(e) => patch({ codeLine: e.target.value })}
          className="font-mono text-sm"
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <div>
          <Label className="text-base">{t('editor.software1.heroImages')}</Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.software1.heroHint')}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {heroSlots.map((src, i) => (
            <div
              key={`hero-${i}`}
              className="bg-muted/30 flex flex-col gap-2 rounded-lg border p-2"
            >
              <div className="bg-background relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md border">
                {src ? (
                  <img
                    src={src}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <ImagePlus className="text-muted-foreground size-8 opacity-40" />
                )}
              </div>
              <input
                ref={heroRefs[i]}
                type="file"
                accept={acceptAttr}
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null
                  void setHeroSlot(i, f)
                  e.target.value = ''
                }}
              />
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => heroRefs[i].current?.click()}
                >
                  {src ? t('editor.software1.replace') : t('editor.software1.upload')}
                </Button>
                {src ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="shrink-0 px-2"
                    onClick={() => clearHeroSlot(i)}
                    aria-label={t('editor.software1.remove')}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div>
          <Label className="text-base">{t('editor.software1.skillIcons')}</Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.software1.skillHint')}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {skillSlots.map((src, i) => (
            <div
              key={`skill-${i}`}
              className="bg-muted/30 flex flex-col gap-1.5 rounded-lg border p-1.5"
            >
              <div className="bg-background flex aspect-square items-center justify-center overflow-hidden rounded-md border">
                {src ? (
                  <img
                    src={src}
                    alt=""
                    className="max-h-full max-w-full object-contain p-1"
                  />
                ) : (
                  <span className="text-muted-foreground text-[10px]">
                    {i + 1}
                  </span>
                )}
              </div>
              <input
                ref={skillRefs[i]}
                type="file"
                accept={acceptAttr}
                className="sr-only"
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null
                  void setSkillSlot(i, f)
                  e.target.value = ''
                }}
              />
              <div className="flex gap-0.5">
                <Button
                  type="button"
                  variant="secondary"
                  size="xs"
                  className="h-7 flex-1 px-1 text-[10px]"
                  onClick={() => skillRefs[i].current?.click()}
                >
                  {src ? '↻' : '+'}
                </Button>
                {src ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    className="h-7 shrink-0 px-1"
                    onClick={() => clearSkillSlot(i)}
                    aria-label={t('editor.software1.remove')}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div>
          <Label className="text-base">{t('editor.software1.stackLabels')}</Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.software1.stackHint')}
          </p>
        </div>
        <div className="space-y-2">
          {stackSlots.map((val, i) => (
            <div key={`stack-${i}`} className="space-y-1">
              <Label
                htmlFor={`${baseId}-stack-${i}`}
                className="text-muted-foreground text-xs font-normal"
              >
                {t('editor.software1.stackLine', { n: i + 1 })}
              </Label>
              <Input
                id={`${baseId}-stack-${i}`}
                value={val}
                onChange={(e) => setStackLine(i, e.target.value)}
                placeholder={t('editor.software1.stackPlaceholder')}
                className="font-mono text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor={`${baseId}-g1`}>{t('editor.fields.gradientFrom')}</Label>
          <Input
            id={`${baseId}-g1`}
            type="color"
            className="h-10 cursor-pointer p-1"
            value={settings.gradientFrom}
            onChange={(e) => patch({ gradientFrom: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${baseId}-g2`}>{t('editor.fields.gradientTo')}</Label>
          <Input
            id={`${baseId}-g2`}
            type="color"
            className="h-10 cursor-pointer p-1"
            value={settings.gradientTo}
            onChange={(e) => patch({ gradientTo: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${baseId}-accent`}>{t('editor.fields.accent')}</Label>
        <Input
          id={`${baseId}-accent`}
          type="color"
          className="h-10 w-full max-w-[120px] cursor-pointer p-1"
          value={settings.accent}
          onChange={(e) => patch({ accent: e.target.value })}
        />
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() =>
          patch({
            gradientFrom: '#0f172a',
            gradientTo: '#1d4ed8',
            accent: '#38bdf8',
          })
        }
      >
        {t('editor.actions.resetTheme')}
      </Button>
    </div>
  )
}

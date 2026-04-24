import { useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ImagePlus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { ColorField } from '@/components/color-field'
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
import type { Graphics1Settings } from '@/templates/settings-types'
import { GRAPHICS1_MAX_SKILL_ICONS } from '@/templates/settings-types'

function padEnd<T>(arr: T[] | undefined, len: number, fill: T): T[] {
  const a = [...(arr ?? [])]
  while (a.length < len) a.push(fill)
  return a.slice(0, len)
}

export function Graphics1Controls() {
  const { t } = useTranslation()
  const id = useId()
  const settings = useEditorStore((s) => s.settingsByTemplateId['graphics-1'])
  const update = useEditorStore((s) => s.updateTemplateSettings)

  const showcaseRef = useRef<HTMLInputElement>(null)
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

  const patch = (partial: Partial<Graphics1Settings>) => {
    update('graphics-1', partial)
  }

  const skillSlots = padEnd(settings.skillIcons, GRAPHICS1_MAX_SKILL_ICONS, '')

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
      const next = padEnd(settings.skillIcons, GRAPHICS1_MAX_SKILL_ICONS, '')
      next[index] = dataUrl
      patch({ skillIcons: next })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const clearSkillSlot = (index: number) => {
    const next = padEnd(settings.skillIcons, GRAPHICS1_MAX_SKILL_ICONS, '')
    next[index] = ''
    patch({ skillIcons: next })
  }

  const pickShowcase = async (file: File | null) => {
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
      patch({ showcaseImage: dataUrl })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const acceptAttr =
    'image/png,image/jpeg,image/jpg,image/svg+xml,.svg'

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-base">{t('editor.graphics1.sectionColors')}</Label>
        <div className="mt-3 grid items-end grid-cols-2 gap-4 sm:grid-cols-4">
          <ColorField
            id={`${id}-bg`}
            label={t('editor.graphics1.bgBase')}
            value={settings.bgBase}
            onChange={(v) => patch({ bgBase: v })}
          />
          <ColorField
            id={`${id}-ink`}
            label={t('editor.graphics1.ink')}
            value={settings.ink}
            onChange={(v) => patch({ ink: v })}
          />
          <ColorField
            id={`${id}-a1`}
            label={t('editor.graphics1.accent1')}
            value={settings.accent1}
            onChange={(v) => patch({ accent1: v })}
          />
          <ColorField
            id={`${id}-a2`}
            label={t('editor.graphics1.accent2')}
            value={settings.accent2}
            onChange={(v) => patch({ accent2: v })}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={() =>
            patch({
              bgBase: '#f4f0e8',
              ink: '#1a1a2e',
              accent1: '#e11d48',
              accent2: '#0d9488',
            })
          }
        >
          {t('editor.graphics1.resetPalette')}
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">{t('editor.graphics1.sectionHeadlines')}</Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-h1`}>{t('editor.graphics1.line1')}</Label>
          <Input
            id={`${id}-h1`}
            value={settings.headlineLine1}
            onChange={(e) => patch({ headlineLine1: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-h2`}>{t('editor.graphics1.line2')}</Label>
          <Input
            id={`${id}-h2`}
            value={settings.headlineLine2}
            onChange={(e) => patch({ headlineLine2: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-badge`}>{t('editor.graphics1.badge')}</Label>
          <Input
            id={`${id}-badge`}
            value={settings.badgeText}
            onChange={(e) => patch({ badgeText: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-sub`}>{t('editor.graphics1.subline')}</Label>
          <Textarea
            id={`${id}-sub`}
            value={settings.subline}
            onChange={(e) => patch({ subline: e.target.value })}
            rows={2}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">{t('editor.graphics1.sectionFeatures')}</Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-f1`}>{t('editor.graphics1.feature1')}</Label>
          <Input
            id={`${id}-f1`}
            value={settings.featureLine1}
            onChange={(e) => patch({ featureLine1: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-f2`}>{t('editor.graphics1.feature2')}</Label>
          <Input
            id={`${id}-f2`}
            value={settings.featureLine2}
            onChange={(e) => patch({ featureLine2: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-f3`}>{t('editor.graphics1.feature3')}</Label>
          <Input
            id={`${id}-f3`}
            value={settings.featureLine3}
            onChange={(e) => patch({ featureLine3: e.target.value })}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div>
          <Label className="text-base">{t('editor.graphics1.sectionShowcase')}</Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.graphics1.showcaseHint')}
          </p>
        </div>
        <div className="bg-muted/30 flex flex-col gap-2 rounded-lg border p-2">
          <div className="bg-background relative mx-auto flex aspect-[4/5] w-full max-w-[200px] items-center justify-center overflow-hidden rounded-2xl border">
            {settings.showcaseImage ? (
              <img
                src={settings.showcaseImage}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              <ImagePlus className="text-muted-foreground size-10 opacity-40" />
            )}
          </div>
          <input
            ref={showcaseRef}
            type="file"
            accept={acceptAttr}
            className="sr-only"
            onChange={(e) => {
              void pickShowcase(e.target.files?.[0] ?? null)
              e.target.value = ''
            }}
          />
          <div className="flex gap-1">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => showcaseRef.current?.click()}
            >
              {settings.showcaseImage
                ? t('editor.software1.replace')
                : t('editor.software1.upload')}
            </Button>
            {settings.showcaseImage ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="px-2"
                onClick={() => patch({ showcaseImage: '' })}
                aria-label={t('editor.software1.remove')}
              >
                <Trash2 className="size-4" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div>
          <Label className="text-base">{t('editor.graphics1.skillIcons')}</Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.graphics1.skillHint')}
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

      <div className="space-y-2">
        <Label htmlFor={`${id}-foot`}>{t('editor.graphics1.footerTag')}</Label>
        <Input
          id={`${id}-foot`}
          value={settings.footerTag}
          onChange={(e) => patch({ footerTag: e.target.value })}
        />
      </div>
    </div>
  )
}

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
import type { Graphics2Settings } from '@/templates/settings-types'
import { GRAPHICS2_MAX_SKILL_ICONS } from '@/templates/settings-types'

function padEnd<T>(arr: T[] | undefined, len: number, fill: T): T[] {
  const a = [...(arr ?? [])]
  while (a.length < len) a.push(fill)
  return a.slice(0, len)
}

export function Graphics2Controls() {
  const { t } = useTranslation()
  const id = useId()
  const settings = useEditorStore((s) => s.settingsByTemplateId['graphics-2'])
  const update = useEditorStore((s) => s.updateTemplateSettings)

  const deviceRef = useRef<HTMLInputElement>(null)
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

  const patch = (partial: Partial<Graphics2Settings>) => {
    update('graphics-2', partial)
  }

  const skillSlots = padEnd(settings.skillIcons, GRAPHICS2_MAX_SKILL_ICONS, '')

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
      const next = padEnd(settings.skillIcons, GRAPHICS2_MAX_SKILL_ICONS, '')
      next[index] = dataUrl
      patch({ skillIcons: next })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const clearSkillSlot = (index: number) => {
    const next = padEnd(settings.skillIcons, GRAPHICS2_MAX_SKILL_ICONS, '')
    next[index] = ''
    patch({ skillIcons: next })
  }

  const pickDevice = async (file: File | null) => {
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
      patch({ deviceImage: dataUrl })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const acceptAttr =
    'image/png,image/jpeg,image/jpg,image/svg+xml,.svg'

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-base">{t('editor.graphics2.sectionColors')}</Label>
        <div className="mt-3 grid items-end grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          <ColorField
            id={`${id}-bg`}
            label={t('editor.graphics2.bgBase')}
            value={settings.bgBase}
            onChange={(v) => patch({ bgBase: v })}
          />
          <ColorField
            id={`${id}-grid`}
            label={t('editor.graphics2.gridColor')}
            value={settings.gridColor}
            onChange={(v) => patch({ gridColor: v })}
          />
          <ColorField
            id={`${id}-ink`}
            label={t('editor.graphics2.ink')}
            value={settings.ink}
            onChange={(v) => patch({ ink: v })}
          />
          <ColorField
            id={`${id}-acc`}
            label={t('editor.graphics2.accent')}
            value={settings.accent}
            onChange={(v) => patch({ accent: v })}
          />
          <ColorField
            id={`${id}-surf`}
            label={t('editor.graphics2.surface')}
            value={settings.surface}
            onChange={(v) => patch({ surface: v })}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={() =>
            patch({
              bgBase: '#f1f5f9',
              gridColor: '#cbd5e1',
              ink: '#0f172a',
              accent: '#4f46e5',
              surface: '#ffffff',
            })
          }
        >
          {t('editor.graphics2.resetPalette')}
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">{t('editor.graphics2.sectionHeadlines')}</Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-h1`}>{t('editor.graphics2.line1')}</Label>
          <Input
            id={`${id}-h1`}
            value={settings.headlineLine1}
            onChange={(e) => patch({ headlineLine1: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-h2`}>{t('editor.graphics2.line2')}</Label>
          <Input
            id={`${id}-h2`}
            value={settings.headlineLine2}
            onChange={(e) => patch({ headlineLine2: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-badge`}>{t('editor.graphics2.badge')}</Label>
          <Input
            id={`${id}-badge`}
            value={settings.badgeText}
            onChange={(e) => patch({ badgeText: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-sub`}>{t('editor.graphics2.subline')}</Label>
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
        <Label className="text-base">{t('editor.graphics2.sectionFeatures')}</Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-f1`}>{t('editor.graphics2.feature1')}</Label>
          <Input
            id={`${id}-f1`}
            value={settings.featureLine1}
            onChange={(e) => patch({ featureLine1: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-f2`}>{t('editor.graphics2.feature2')}</Label>
          <Input
            id={`${id}-f2`}
            value={settings.featureLine2}
            onChange={(e) => patch({ featureLine2: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-f3`}>{t('editor.graphics2.feature3')}</Label>
          <Input
            id={`${id}-f3`}
            value={settings.featureLine3}
            onChange={(e) => patch({ featureLine3: e.target.value })}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor={`${id}-chrome`}>{t('editor.graphics2.chromeLabelField')}</Label>
        <Input
          id={`${id}-chrome`}
          value={settings.chromeLabel}
          onChange={(e) => patch({ chromeLabel: e.target.value })}
          placeholder={t('editor.graphics2.chromeLabelPlaceholder')}
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <div>
          <Label className="text-base">{t('editor.graphics2.sectionDevice')}</Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.graphics2.deviceHint')}
          </p>
        </div>
        <div className="bg-muted/30 flex flex-col gap-2 rounded-lg border p-2">
          <div className="bg-background relative mx-auto flex aspect-[9/16] w-full max-w-[180px] items-center justify-center overflow-hidden rounded-3xl border-[8px] border-slate-800">
            {settings.deviceImage ? (
              <img
                src={settings.deviceImage}
                alt=""
                className="size-full object-cover object-top"
              />
            ) : (
              <ImagePlus className="text-muted-foreground size-10 opacity-40" />
            )}
          </div>
          <input
            ref={deviceRef}
            type="file"
            accept={acceptAttr}
            className="sr-only"
            onChange={(e) => {
              void pickDevice(e.target.files?.[0] ?? null)
              e.target.value = ''
            }}
          />
          <div className="flex gap-1">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => deviceRef.current?.click()}
            >
              {settings.deviceImage
                ? t('editor.software1.replace')
                : t('editor.software1.upload')}
            </Button>
            {settings.deviceImage ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="px-2"
                onClick={() => patch({ deviceImage: '' })}
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
          <Label className="text-base">{t('editor.graphics2.skillIcons')}</Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.graphics2.skillHint')}
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
        <Label htmlFor={`${id}-foot`}>{t('editor.graphics2.footerTag')}</Label>
        <Input
          id={`${id}-foot`}
          value={settings.footerTag}
          onChange={(e) => patch({ footerTag: e.target.value })}
        />
      </div>
    </div>
  )
}

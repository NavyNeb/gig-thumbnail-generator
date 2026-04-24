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
import type { Graphics3Settings } from '@/templates/settings-types'
import { GRAPHICS3_MAX_SKILL_ICONS } from '@/templates/settings-types'

function padEnd<T>(arr: T[] | undefined, len: number, fill: T): T[] {
  const a = [...(arr ?? [])]
  while (a.length < len) a.push(fill)
  return a.slice(0, len)
}

export function Graphics3Controls() {
  const { t } = useTranslation()
  const id = useId()
  const settings = useEditorStore((s) => s.settingsByTemplateId['graphics-3'])
  const update = useEditorStore((s) => s.updateTemplateSettings)

  const primaryRef = useRef<HTMLInputElement>(null)
  const detailRef = useRef<HTMLInputElement>(null)
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

  const patch = (partial: Partial<Graphics3Settings>) => {
    update('graphics-3', partial)
  }

  const skillSlots = padEnd(settings.skillIcons, GRAPHICS3_MAX_SKILL_ICONS, '')

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
      const next = padEnd(settings.skillIcons, GRAPHICS3_MAX_SKILL_ICONS, '')
      next[index] = dataUrl
      patch({ skillIcons: next })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const clearSkillSlot = (index: number) => {
    const next = padEnd(settings.skillIcons, GRAPHICS3_MAX_SKILL_ICONS, '')
    next[index] = ''
    patch({ skillIcons: next })
  }

  const pickImage = async (
    file: File | null,
    key: 'primaryImage' | 'detailImage',
  ) => {
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
      patch({ [key]: dataUrl })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const acceptAttr =
    'image/png,image/jpeg,image/jpg,image/svg+xml,.svg'

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-base">{t('editor.graphics3.sectionGradient')}</Label>
        <p className="text-muted-foreground text-xs">
          {t('editor.graphics3.gradientRowHint')}
        </p>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ColorField
            id={`${id}-g0`}
            label={t('editor.graphics3.gradientFrom')}
            value={settings.gradientFrom}
            onChange={(v) => patch({ gradientFrom: v })}
          />
          <ColorField
            id={`${id}-g1`}
            label={t('editor.graphics3.gradientVia')}
            value={settings.gradientVia}
            onChange={(v) => patch({ gradientVia: v })}
          />
          <ColorField
            id={`${id}-g2`}
            label={t('editor.graphics3.gradientTo')}
            value={settings.gradientTo}
            onChange={(v) => patch({ gradientTo: v })}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ColorField
            id={`${id}-ink`}
            label={t('editor.graphics3.ink')}
            value={settings.ink}
            onChange={(v) => patch({ ink: v })}
          />
          <ColorField
            id={`${id}-ag`}
            label={t('editor.graphics3.accentGraphic')}
            value={settings.accentGraphic}
            onChange={(v) => patch({ accentGraphic: v })}
          />
          <ColorField
            id={`${id}-au`}
            label={t('editor.graphics3.accentUi')}
            value={settings.accentUi}
            onChange={(v) => patch({ accentUi: v })}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={() =>
            patch({
              gradientFrom: '#1e1b4b',
              gradientVia: '#5b21b6',
              gradientTo: '#9d174d',
              ink: '#fafafa',
              accentGraphic: '#f472b6',
              accentUi: '#38bdf8',
            })
          }
        >
          {t('editor.graphics3.resetPalette')}
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">{t('editor.graphics3.sectionHeadlines')}</Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-h1`}>{t('editor.graphics3.line1')}</Label>
          <Input
            id={`${id}-h1`}
            value={settings.headlineLine1}
            onChange={(e) => patch({ headlineLine1: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-h2`}>{t('editor.graphics3.line2')}</Label>
          <Input
            id={`${id}-h2`}
            value={settings.headlineLine2}
            onChange={(e) => patch({ headlineLine2: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-badge`}>{t('editor.graphics3.badge')}</Label>
          <Input
            id={`${id}-badge`}
            value={settings.badgeText}
            onChange={(e) => patch({ badgeText: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-sub`}>{t('editor.graphics3.subline')}</Label>
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
        <Label className="text-base">{t('editor.graphics3.sectionTags')}</Label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="space-y-1">
            <Label htmlFor={`${id}-t1`}>{t('editor.graphics3.tag1')}</Label>
            <Input
              id={`${id}-t1`}
              value={settings.tag1}
              onChange={(e) => patch({ tag1: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`${id}-t2`}>{t('editor.graphics3.tag2')}</Label>
            <Input
              id={`${id}-t2`}
              value={settings.tag2}
              onChange={(e) => patch({ tag2: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`${id}-t3`}>{t('editor.graphics3.tag3')}</Label>
            <Input
              id={`${id}-t3`}
              value={settings.tag3}
              onChange={(e) => patch({ tag3: e.target.value })}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-base">{t('editor.graphics3.sectionPrimary')}</Label>
          <p className="text-muted-foreground text-xs">
            {t('editor.graphics3.primaryHint')}
          </p>
          <div className="bg-muted/30 flex flex-col gap-2 rounded-2xl border p-2">
            <div className="bg-background relative mx-auto aspect-[20/23] w-full max-w-[200px] overflow-hidden shadow-md"
              style={{ borderRadius: '58% 42% 55% 45% / 45% 55% 45% 55%' }}
            >
              {settings.primaryImage ? (
                <img
                  src={settings.primaryImage}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center p-4">
                  <ImagePlus className="text-muted-foreground size-10 opacity-40" />
                </div>
              )}
            </div>
            <input
              ref={primaryRef}
              type="file"
              accept={acceptAttr}
              className="sr-only"
              onChange={(e) => {
                void pickImage(e.target.files?.[0] ?? null, 'primaryImage')
                e.target.value = ''
              }}
            />
            <div className="flex gap-1">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => primaryRef.current?.click()}
              >
                {settings.primaryImage
                  ? t('editor.software1.replace')
                  : t('editor.software1.upload')}
              </Button>
              {settings.primaryImage ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="px-2"
                  onClick={() => patch({ primaryImage: '' })}
                  aria-label={t('editor.software1.remove')}
                >
                  <Trash2 className="size-4" />
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-base">{t('editor.graphics3.sectionDetail')}</Label>
          <p className="text-muted-foreground text-xs">
            {t('editor.graphics3.detailHint')}
          </p>
          <div className="bg-muted/30 flex flex-col gap-2 rounded-2xl border p-2">
            <div className="bg-background relative mx-auto flex aspect-square w-full max-w-[140px] items-center justify-center overflow-hidden rounded-full border-4 border-dashed">
              {settings.detailImage ? (
                <img
                  src={settings.detailImage}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <ImagePlus className="text-muted-foreground size-8 opacity-40" />
              )}
            </div>
            <input
              ref={detailRef}
              type="file"
              accept={acceptAttr}
              className="sr-only"
              onChange={(e) => {
                void pickImage(e.target.files?.[0] ?? null, 'detailImage')
                e.target.value = ''
              }}
            />
            <div className="flex gap-1">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => detailRef.current?.click()}
              >
                {settings.detailImage
                  ? t('editor.software1.replace')
                  : t('editor.software1.upload')}
              </Button>
              {settings.detailImage ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="px-2"
                  onClick={() => patch({ detailImage: '' })}
                  aria-label={t('editor.software1.remove')}
                >
                  <Trash2 className="size-4" />
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div>
          <Label className="text-base">{t('editor.graphics3.skillIcons')}</Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.graphics3.skillHint')}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {skillSlots.map((src, i) => (
            <div
              key={`skill-${i}`}
              className="bg-muted/30 flex flex-col gap-1.5 rounded-full border p-1.5"
            >
              <div className="bg-background flex aspect-square items-center justify-center overflow-hidden rounded-full border">
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
                  className="h-7 flex-1 rounded-full px-1 text-[10px]"
                  onClick={() => skillRefs[i].current?.click()}
                >
                  {src ? '↻' : '+'}
                </Button>
                {src ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    className="h-7 shrink-0 rounded-full px-1"
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
        <Label htmlFor={`${id}-foot`}>{t('editor.graphics3.footerTag')}</Label>
        <Input
          id={`${id}-foot`}
          value={settings.footerTag}
          onChange={(e) => patch({ footerTag: e.target.value })}
        />
      </div>
    </div>
  )
}

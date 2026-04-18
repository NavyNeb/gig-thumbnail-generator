import { useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ImagePlus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  readFileAsDataUrl,
  validateImageFile,
} from '@/lib/files/image-data-url'
import { useEditorStore } from '@/stores/editor-store'
import type { Software2Settings } from '@/templates/settings-types'
import {
  SOFTWARE2_MAX_SERVICES,
  SOFTWARE2_MAX_SKILL_ICONS,
} from '@/templates/settings-types'

function padEnd<T>(arr: T[] | undefined, len: number, fill: T): T[] {
  const a = [...(arr ?? [])]
  while (a.length < len) a.push(fill)
  return a.slice(0, len)
}

function padServices(items: string[] | undefined): string[] {
  const a = [...(items ?? [])]
  while (a.length < SOFTWARE2_MAX_SERVICES) a.push('')
  return a.slice(0, SOFTWARE2_MAX_SERVICES)
}

export function Software2Controls() {
  const { t } = useTranslation()
  const id = useId()
  const settings = useEditorStore((s) => s.settingsByTemplateId['software-2'])
  const update = useEditorStore((s) => s.updateTemplateSettings)

  const logoRef = useRef<HTMLInputElement>(null)
  const heroRef = useRef<HTMLInputElement>(null)

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

  const patch = (partial: Partial<Software2Settings>) => {
    update('software-2', partial)
  }

  const serviceLines = padServices(settings.serviceItems)
  const skillSlots = padEnd(settings.skillIcons, SOFTWARE2_MAX_SKILL_ICONS, '')

  const setServiceLine = (index: number, value: string) => {
    const next = padServices(settings.serviceItems)
    next[index] = value
    patch({ serviceItems: next })
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
      const next = padEnd(settings.skillIcons, SOFTWARE2_MAX_SKILL_ICONS, '')
      next[index] = dataUrl
      patch({ skillIcons: next })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const clearSkillSlot = (index: number) => {
    const next = padEnd(settings.skillIcons, SOFTWARE2_MAX_SKILL_ICONS, '')
    next[index] = ''
    patch({ skillIcons: next })
  }

  const pickImage = async (
    file: File | null,
    key: 'brandLogo' | 'heroImage',
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
        <Label className="text-base">{t('editor.software2.sectionColors')}</Label>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs" htmlFor={`${id}-navy`}>
              {t('editor.software2.navy')}
            </Label>
            <Input
              id={`${id}-navy`}
              type="color"
              className="h-10 cursor-pointer p-1"
              value={settings.navy}
              onChange={(e) => patch({ navy: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs" htmlFor={`${id}-pink`}>
              {t('editor.software2.pink')}
            </Label>
            <Input
              id={`${id}-pink`}
              type="color"
              className="h-10 cursor-pointer p-1"
              value={settings.pink}
              onChange={(e) => patch({ pink: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs" htmlFor={`${id}-lav`}>
              {t('editor.software2.lavender')}
            </Label>
            <Input
              id={`${id}-lav`}
              type="color"
              className="h-10 cursor-pointer p-1"
              value={settings.lavender}
              onChange={(e) => patch({ lavender: e.target.value })}
            />
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={() =>
            patch({
              navy: '#0a0e17',
              pink: '#121a2e',
              lavender: '#3b82f6',
            })
          }
        >
          {t('editor.software2.resetPalette')}
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">{t('editor.software2.sectionHeadlines')}</Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-l1`}>{t('editor.software2.line1')}</Label>
          <Input
            id={`${id}-l1`}
            value={settings.headlineLine1}
            onChange={(e) => patch({ headlineLine1: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-l2`}>{t('editor.software2.line2')}</Label>
          <Input
            id={`${id}-l2`}
            value={settings.headlineLine2}
            onChange={(e) => patch({ headlineLine2: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-pill`}>{t('editor.software2.pill')}</Label>
          <Input
            id={`${id}-pill`}
            value={settings.headlinePill}
            onChange={(e) => patch({ headlinePill: e.target.value })}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">{t('editor.software2.sectionBrand')}</Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-brand`}>{t('editor.software2.brandName')}</Label>
          <Input
            id={`${id}-brand`}
            value={settings.brandName}
            onChange={(e) => patch({ brandName: e.target.value })}
            placeholder={t('editor.software2.brandNamePlaceholder')}
          />
        </div>
        <div className="bg-muted/30 flex flex-col gap-2 rounded-lg border p-2">
          <div className="bg-background relative flex h-16 items-center justify-center overflow-hidden rounded-md border">
            {settings.brandLogo ? (
              <img
                src={settings.brandLogo}
                alt=""
                className="max-h-full max-w-full object-contain p-1"
              />
            ) : (
              <ImagePlus className="text-muted-foreground size-7 opacity-40" />
            )}
          </div>
          <input
            ref={logoRef}
            type="file"
            accept={acceptAttr}
            className="sr-only"
            onChange={(e) => {
              void pickImage(e.target.files?.[0] ?? null, 'brandLogo')
              e.target.value = ''
            }}
          />
          <div className="flex gap-1">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => logoRef.current?.click()}
            >
              {settings.brandLogo
                ? t('editor.software1.replace')
                : t('editor.software1.upload')}
            </Button>
            {settings.brandLogo ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="px-2"
                onClick={() => patch({ brandLogo: '' })}
                aria-label={t('editor.software1.remove')}
              >
                <Trash2 className="size-4" />
              </Button>
            ) : null}
          </div>
          <p className="text-muted-foreground text-xs">
            {t('editor.software2.brandLogoHint')}
          </p>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">{t('editor.software2.sectionServices')}</Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-svc-title`}>
            {t('editor.software2.servicesTitle')}
          </Label>
          <Input
            id={`${id}-svc-title`}
            value={settings.servicesSectionTitle}
            onChange={(e) => patch({ servicesSectionTitle: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {serviceLines.map((val, i) => (
            <div key={i} className="space-y-1">
              <Label
                htmlFor={`${id}-svc-${i}`}
                className="text-muted-foreground text-xs"
              >
                {t('editor.software2.serviceN', { n: i + 1 })}
              </Label>
              <Input
                id={`${id}-svc-${i}`}
                value={val}
                onChange={(e) => setServiceLine(i, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div>
          <Label className="text-base">{t('editor.software2.skillIcons')}</Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.software2.skillHint')}
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
        <Label className="text-base">{t('editor.software2.sectionHero')}</Label>
        <p className="text-muted-foreground text-xs">
          {t('editor.software2.heroHint')}
        </p>
        <div className="bg-muted/30 flex flex-col gap-2 rounded-lg border p-2">
          <div className="bg-background relative aspect-square max-h-40 overflow-hidden rounded-full border">
            {settings.heroImage ? (
              <img
                src={settings.heroImage}
                alt=""
                className="size-full object-cover"
              />
            ) : (
              <div className="text-muted-foreground flex size-full items-center justify-center text-xs">
                {t('editor.software2.heroEmpty')}
              </div>
            )}
          </div>
          <input
            ref={heroRef}
            type="file"
            accept={acceptAttr}
            className="sr-only"
            onChange={(e) => {
              void pickImage(e.target.files?.[0] ?? null, 'heroImage')
              e.target.value = ''
            }}
          />
          <div className="flex gap-1">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => heroRef.current?.click()}
            >
              {settings.heroImage
                ? t('editor.software1.replace')
                : t('editor.software1.upload')}
            </Button>
            {settings.heroImage ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="px-2"
                onClick={() => patch({ heroImage: '' })}
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
        <Label className="text-base">{t('editor.software2.sectionFooter')}</Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-cta`}>{t('editor.software2.cta')}</Label>
          <Input
            id={`${id}-cta`}
            value={settings.ctaLabel}
            onChange={(e) => patch({ ctaLabel: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor={`${id}-ph-p`}>{t('editor.software2.phonePrefix')}</Label>
            <Input
              id={`${id}-ph-p`}
              value={settings.phonePrefix}
              onChange={(e) => patch({ phonePrefix: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`${id}-ph-v`}>{t('editor.software2.phoneValue')}</Label>
            <Input
              id={`${id}-ph-v`}
              value={settings.phoneValue}
              onChange={(e) => patch({ phoneValue: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor={`${id}-web-p`}>
              {t('editor.software2.websitePrefix')}
            </Label>
            <Input
              id={`${id}-web-p`}
              value={settings.websitePrefix}
              onChange={(e) => patch({ websitePrefix: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`${id}-web-v`}>
              {t('editor.software2.websiteValue')}
            </Label>
            <Input
              id={`${id}-web-v`}
              value={settings.websiteValue}
              onChange={(e) => patch({ websiteValue: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

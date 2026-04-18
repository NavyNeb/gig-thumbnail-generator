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
import type { Software3Settings } from '@/templates/settings-types'
import {
  SOFTWARE3_MAX_SERVICES,
  SOFTWARE3_MAX_SKILL_ICONS,
} from '@/templates/settings-types'

function padEnd<T>(arr: T[] | undefined, len: number, fill: T): T[] {
  const a = [...(arr ?? [])]
  while (a.length < len) a.push(fill)
  return a.slice(0, len)
}

function padServices(items: string[] | undefined): string[] {
  const a = [...(items ?? [])]
  while (a.length < SOFTWARE3_MAX_SERVICES) a.push('')
  return a.slice(0, SOFTWARE3_MAX_SERVICES)
}

export function Software3Controls() {
  const { t } = useTranslation()
  const id = useId()
  const settings = useEditorStore((s) => s.settingsByTemplateId['software-3'])
  const update = useEditorStore((s) => s.updateTemplateSettings)

  const logoRef = useRef<HTMLInputElement>(null)
  const avatarRef = useRef<HTMLInputElement>(null)

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

  const patch = (partial: Partial<Software3Settings>) => {
    update('software-3', partial)
  }

  const serviceLines = padServices(settings.serviceItems)
  const skillSlots = padEnd(settings.skillIcons, SOFTWARE3_MAX_SKILL_ICONS, '')

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
      const next = padEnd(settings.skillIcons, SOFTWARE3_MAX_SKILL_ICONS, '')
      next[index] = dataUrl
      patch({ skillIcons: next })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const clearSkillSlot = (index: number) => {
    const next = padEnd(settings.skillIcons, SOFTWARE3_MAX_SKILL_ICONS, '')
    next[index] = ''
    patch({ skillIcons: next })
  }

  const pickImage = async (
    file: File | null,
    key: 'brandLogo' | 'avatarImage',
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
        <Label className="text-base">{t('editor.software3.sectionColors')}</Label>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="space-y-1.5">
            <Label className="text-xs" htmlFor={`${id}-white`}>
              {t('editor.software3.whitePanel')}
            </Label>
            <Input
              id={`${id}-white`}
              type="color"
              className="h-10 cursor-pointer p-1"
              value={settings.whitePanel}
              onChange={(e) => patch({ whitePanel: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs" htmlFor={`${id}-purple`}>
              {t('editor.software3.purplePanel')}
            </Label>
            <Input
              id={`${id}-purple`}
              type="color"
              className="h-10 cursor-pointer p-1"
              value={settings.purplePanel}
              onChange={(e) => patch({ purplePanel: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs" htmlFor={`${id}-orange`}>
              {t('editor.software3.orangeAccent')}
            </Label>
            <Input
              id={`${id}-orange`}
              type="color"
              className="h-10 cursor-pointer p-1"
              value={settings.orangeAccent}
              onChange={(e) => patch({ orangeAccent: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs" htmlFor={`${id}-pill`}>
              {t('editor.software3.servicePillBg')}
            </Label>
            <Input
              id={`${id}-pill`}
              type="color"
              className="h-10 cursor-pointer p-1"
              value={settings.servicePillBg}
              onChange={(e) => patch({ servicePillBg: e.target.value })}
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
              whitePanel: '#ffffff',
              purplePanel: '#5b21b6',
              orangeAccent: '#ea580c',
              servicePillBg: '#6d28d9',
            })
          }
        >
          {t('editor.software3.resetPalette')}
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">{t('editor.software3.sectionHeadlines')}</Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-h1`}>{t('editor.software3.line1')}</Label>
          <Input
            id={`${id}-h1`}
            value={settings.headlineLine1}
            onChange={(e) => patch({ headlineLine1: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-h2`}>{t('editor.software3.line2')}</Label>
          <Input
            id={`${id}-h2`}
            value={settings.headlineLine2}
            onChange={(e) => patch({ headlineLine2: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-badge`}>{t('editor.software3.badge')}</Label>
          <Input
            id={`${id}-badge`}
            value={settings.badgeText}
            onChange={(e) => patch({ badgeText: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-tag`}>{t('editor.software3.tagline')}</Label>
          <Textarea
            id={`${id}-tag`}
            value={settings.tagline}
            onChange={(e) => patch({ tagline: e.target.value })}
            rows={2}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">{t('editor.software3.sectionServices')}</Label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {serviceLines.map((val, i) => (
            <div key={i} className="space-y-1">
              <Label
                htmlFor={`${id}-svc-${i}`}
                className="text-muted-foreground text-xs"
              >
                {t('editor.software3.serviceN', { n: i + 1 })}
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
          <Label className="text-base">{t('editor.software3.skillIcons')}</Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.software3.skillHint')}
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
        <Label className="text-base">{t('editor.software3.sectionBrand')}</Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-bn`}>{t('editor.software3.brandName')}</Label>
          <Input
            id={`${id}-bn`}
            value={settings.brandName}
            onChange={(e) => patch({ brandName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-bt`}>{t('editor.software3.brandTagline')}</Label>
          <Input
            id={`${id}-bt`}
            value={settings.brandTagline}
            onChange={(e) => patch({ brandTagline: e.target.value })}
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
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">{t('editor.software3.sectionAvatar')}</Label>
        <p className="text-muted-foreground text-xs">
          {t('editor.software3.avatarHint')}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="bg-muted/30 flex w-full max-w-[140px] flex-col gap-2 rounded-lg border p-2 sm:shrink-0">
            <div className="bg-background relative mx-auto flex aspect-square w-full max-w-[120px] items-center justify-center overflow-hidden rounded-full border">
              {settings.avatarImage ? (
                <img
                  src={settings.avatarImage}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                <ImagePlus className="text-muted-foreground size-8 opacity-40" />
              )}
            </div>
            <input
              ref={avatarRef}
              type="file"
              accept={acceptAttr}
              className="sr-only"
              onChange={(e) => {
                void pickImage(e.target.files?.[0] ?? null, 'avatarImage')
                e.target.value = ''
              }}
            />
            <div className="flex gap-1">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => avatarRef.current?.click()}
              >
                {settings.avatarImage
                  ? t('editor.software1.replace')
                  : t('editor.software1.upload')}
              </Button>
              {settings.avatarImage ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="px-2"
                  onClick={() => patch({ avatarImage: '' })}
                  aria-label={t('editor.software1.remove')}
                >
                  <Trash2 className="size-4" />
                </Button>
              ) : null}
            </div>
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="space-y-1">
              <Label htmlFor={`${id}-an`}>{t('editor.software3.avatarName')}</Label>
              <Input
                id={`${id}-an`}
                value={settings.avatarName}
                onChange={(e) => patch({ avatarName: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`${id}-ar`}>{t('editor.software3.avatarRole')}</Label>
              <Input
                id={`${id}-ar`}
                value={settings.avatarRole}
                onChange={(e) => patch({ avatarRole: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">{t('editor.software3.sectionFooter')}</Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-fh`}>{t('editor.software3.footerHeading')}</Label>
          <Input
            id={`${id}-fh`}
            value={settings.footerHeading}
            onChange={(e) => patch({ footerHeading: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-url`}>{t('editor.software3.websiteUrl')}</Label>
          <Input
            id={`${id}-url`}
            value={settings.websiteUrl}
            onChange={(e) => patch({ websiteUrl: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

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
import type { Marketing2Settings } from '@/templates/settings-types'
import { MARKETING2_MAX_SKILL_ICONS } from '@/templates/settings-types'

function padEnd<T>(arr: T[] | undefined, len: number, fill: T): T[] {
  const a = [...(arr ?? [])]
  while (a.length < len) a.push(fill)
  return a.slice(0, len)
}

const ACCEPT = 'image/png,image/jpeg,image/jpg,image/svg+xml,.svg'

export function Marketing2Controls() {
  const { t } = useTranslation()
  const id = useId()
  const settings = useEditorStore(
    (s) => s.settingsByTemplateId['marketing-2'],
  )
  const update = useEditorStore((s) => s.updateTemplateSettings)

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

  const patch = (partial: Partial<Marketing2Settings>) => {
    update('marketing-2', partial)
  }

  const skillSlots = padEnd(settings.skillIcons, MARKETING2_MAX_SKILL_ICONS, '')

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
      const next = padEnd(settings.skillIcons, MARKETING2_MAX_SKILL_ICONS, '')
      next[index] = dataUrl
      patch({ skillIcons: next })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const clearSkillSlot = (index: number) => {
    const next = padEnd(settings.skillIcons, MARKETING2_MAX_SKILL_ICONS, '')
    next[index] = ''
    patch({ skillIcons: next })
  }

  const pickAvatar = async (file: File | null) => {
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
      patch({ avatarImage: dataUrl })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-base">
          {t('editor.marketing2.sectionPalette')}
        </Label>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ColorField
            id={`${id}-bg`}
            label={t('editor.marketing2.bgColor')}
            value={settings.bgColor}
            onChange={(v) => patch({ bgColor: v })}
          />
          <ColorField
            id={`${id}-paper`}
            label={t('editor.marketing2.paperColor')}
            value={settings.paperColor}
            onChange={(v) => patch({ paperColor: v })}
          />
          <ColorField
            id={`${id}-ink`}
            label={t('editor.marketing2.inkColor')}
            value={settings.inkColor}
            onChange={(v) => patch({ inkColor: v })}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ColorField
            id={`${id}-hot`}
            label={t('editor.marketing2.hotAccent')}
            value={settings.hotAccent}
            onChange={(v) => patch({ hotAccent: v })}
          />
          <ColorField
            id={`${id}-second`}
            label={t('editor.marketing2.secondAccent')}
            value={settings.secondAccent}
            onChange={(v) => patch({ secondAccent: v })}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={() =>
            patch({
              bgColor: '#f7eddf',
              paperColor: '#fffbf2',
              inkColor: '#0a0a0a',
              hotAccent: '#ff2e5a',
              secondAccent: '#ffd60a',
            })
          }
        >
          {t('editor.marketing2.resetPalette')}
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing2.sectionHeadlines')}
        </Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-badge`}>
            {t('editor.marketing2.badge')}
          </Label>
          <Input
            id={`${id}-badge`}
            value={settings.badgeText}
            onChange={(e) => patch({ badgeText: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(['headlineWord1', 'headlineWord2', 'headlineWord3'] as const).map(
            (key, i) => (
              <div className="space-y-1" key={key}>
                <Label
                  htmlFor={`${id}-${key}`}
                  className="text-muted-foreground text-xs font-normal"
                >
                  {t('editor.marketing2.word', { n: i + 1 })}
                </Label>
                <Input
                  id={`${id}-${key}`}
                  value={settings[key]}
                  onChange={(e) => patch({ [key]: e.target.value })}
                  className="font-bold uppercase"
                />
              </div>
            ),
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-sub`}>
            {t('editor.marketing2.subline')}
          </Label>
          <Textarea
            id={`${id}-sub`}
            rows={2}
            value={settings.subline}
            onChange={(e) => patch({ subline: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="space-y-1">
            <Label
              htmlFor={`${id}-tape`}
              className="text-muted-foreground text-xs font-normal"
            >
              {t('editor.marketing2.tapeText')}
            </Label>
            <Input
              id={`${id}-tape`}
              value={settings.tapeText}
              onChange={(e) => patch({ tapeText: e.target.value })}
              className="font-mono uppercase"
            />
          </div>
          <div className="space-y-1">
            <Label
              htmlFor={`${id}-foot`}
              className="text-muted-foreground text-xs font-normal"
            >
              {t('editor.marketing2.footerTag')}
            </Label>
            <Input
              id={`${id}-foot`}
              value={settings.footerTag}
              onChange={(e) => patch({ footerTag: e.target.value })}
              className="font-mono uppercase"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing2.sectionBigNumber')}
        </Label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="space-y-1">
            <Label
              htmlFor={`${id}-bignum`}
              className="text-muted-foreground text-xs font-normal"
            >
              {t('editor.marketing2.bigNumber')}
            </Label>
            <Input
              id={`${id}-bignum`}
              value={settings.bigNumber}
              onChange={(e) => patch({ bigNumber: e.target.value })}
              className="font-bold"
            />
          </div>
          <div className="space-y-1">
            <Label
              htmlFor={`${id}-biglabel`}
              className="text-muted-foreground text-xs font-normal"
            >
              {t('editor.marketing2.bigNumberLabel')}
            </Label>
            <Input
              id={`${id}-biglabel`}
              value={settings.bigNumberLabel}
              onChange={(e) => patch({ bigNumberLabel: e.target.value })}
              className="font-mono uppercase"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing2.sectionChips')}
        </Label>
        {[1, 2, 3].map((n) => {
          const labelKey = `chip${n}Label` as keyof Marketing2Settings
          const valueKey = `chip${n}Value` as keyof Marketing2Settings
          return (
            <div
              key={`chip-${n}`}
              className="grid grid-cols-1 gap-2 rounded-lg border bg-muted/20 p-3 sm:grid-cols-2"
            >
              <div className="space-y-1">
                <Label
                  htmlFor={`${id}-cl${n}`}
                  className="text-muted-foreground text-xs font-normal"
                >
                  {t('editor.marketing2.chipLabel', { n })}
                </Label>
                <Input
                  id={`${id}-cl${n}`}
                  value={settings[labelKey] as string}
                  onChange={(e) => patch({ [labelKey]: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor={`${id}-cv${n}`}
                  className="text-muted-foreground text-xs font-normal"
                >
                  {t('editor.marketing2.chipValue', { n })}
                </Label>
                <Input
                  id={`${id}-cv${n}`}
                  value={settings[valueKey] as string}
                  onChange={(e) => patch({ [valueKey]: e.target.value })}
                  className="font-bold"
                />
              </div>
            </div>
          )
        })}
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing2.sectionAvatar')}
        </Label>
        <p className="text-muted-foreground text-xs">
          {t('editor.marketing2.avatarHint')}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[140px_1fr]">
          <div className="bg-muted/30 flex flex-col gap-2 rounded-2xl border p-2">
            <div className="bg-background relative mx-auto flex aspect-square w-full max-w-[120px] items-center justify-center overflow-hidden rounded-full border-4 border-dashed">
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
              accept={ACCEPT}
              className="sr-only"
              onChange={(e) => {
                void pickAvatar(e.target.files?.[0] ?? null)
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
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor={`${id}-handle`}>
                {t('editor.marketing2.avatarHandle')}
              </Label>
              <Input
                id={`${id}-handle`}
                value={settings.avatarHandle}
                onChange={(e) => patch({ avatarHandle: e.target.value })}
                className="font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor={`${id}-ring`}>
                {t('editor.marketing2.avatarRingText')}
              </Label>
              <Input
                id={`${id}-ring`}
                value={settings.avatarRingText}
                onChange={(e) => patch({ avatarRingText: e.target.value })}
                className="font-mono uppercase"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div>
          <Label className="text-base">
            {t('editor.marketing2.skillIcons')}
          </Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.marketing2.skillHint')}
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
                accept={ACCEPT}
                className="sr-only"
                onChange={(e) => {
                  void setSkillSlot(i, e.target.files?.[0] ?? null)
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
    </div>
  )
}

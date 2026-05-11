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
import type { Marketing1Settings } from '@/templates/settings-types'
import { MARKETING1_MAX_SKILL_ICONS } from '@/templates/settings-types'

function padEnd<T>(arr: T[] | undefined, len: number, fill: T): T[] {
  const a = [...(arr ?? [])]
  while (a.length < len) a.push(fill)
  return a.slice(0, len)
}

const ACCEPT = 'image/png,image/jpeg,image/jpg,image/svg+xml,.svg'

export function Marketing1Controls() {
  const { t } = useTranslation()
  const id = useId()
  const settings = useEditorStore(
    (s) => s.settingsByTemplateId['marketing-1'],
  )
  const update = useEditorStore((s) => s.updateTemplateSettings)

  const logoRef = useRef<HTMLInputElement>(null)
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

  const patch = (partial: Partial<Marketing1Settings>) => {
    update('marketing-1', partial)
  }

  const skillSlots = padEnd(settings.skillIcons, MARKETING1_MAX_SKILL_ICONS, '')

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
      const next = padEnd(settings.skillIcons, MARKETING1_MAX_SKILL_ICONS, '')
      next[index] = dataUrl
      patch({ skillIcons: next })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const clearSkillSlot = (index: number) => {
    const next = padEnd(settings.skillIcons, MARKETING1_MAX_SKILL_ICONS, '')
    next[index] = ''
    patch({ skillIcons: next })
  }

  const pickLogo = async (file: File | null) => {
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
      patch({ brandLogo: dataUrl })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-base">
          {t('editor.marketing1.sectionPalette')}
        </Label>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ColorField
            id={`${id}-bg`}
            label={t('editor.marketing1.canvasBg')}
            value={settings.canvasBg}
            onChange={(v) => patch({ canvasBg: v })}
          />
          <ColorField
            id={`${id}-ink`}
            label={t('editor.marketing1.ink')}
            value={settings.ink}
            onChange={(v) => patch({ ink: v })}
          />
          <ColorField
            id={`${id}-mute`}
            label={t('editor.marketing1.mute')}
            value={settings.mute}
            onChange={(v) => patch({ mute: v })}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ColorField
            id={`${id}-acc`}
            label={t('editor.marketing1.accent')}
            value={settings.accent}
            onChange={(v) => patch({ accent: v })}
          />
          <ColorField
            id={`${id}-accs`}
            label={t('editor.marketing1.accentSoft')}
            value={settings.accentSoft}
            onChange={(v) => patch({ accentSoft: v })}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={() =>
            patch({
              canvasBg: '#0a1f1c',
              ink: '#f0e6cf',
              mute: '#92a59c',
              accent: '#34d399',
              accentSoft: '#86efb6',
            })
          }
        >
          {t('editor.marketing1.resetPalette')}
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing1.sectionHeadlines')}
        </Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-badge`}>{t('editor.marketing1.badge')}</Label>
          <Input
            id={`${id}-badge`}
            value={settings.badgeText}
            onChange={(e) => patch({ badgeText: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-h1`}>{t('editor.marketing1.line1')}</Label>
          <Input
            id={`${id}-h1`}
            value={settings.headlineLine1}
            onChange={(e) => patch({ headlineLine1: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-h2`}>{t('editor.marketing1.line2')}</Label>
          <Input
            id={`${id}-h2`}
            value={settings.headlineLine2}
            onChange={(e) => patch({ headlineLine2: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-sub`}>{t('editor.marketing1.subline')}</Label>
          <Textarea
            id={`${id}-sub`}
            rows={2}
            value={settings.subline}
            onChange={(e) => patch({ subline: e.target.value })}
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing1.sectionChannels')}
        </Label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(['channel1', 'channel2', 'channel3'] as const).map((key, i) => (
            <div className="space-y-1" key={key}>
              <Label
                htmlFor={`${id}-${key}`}
                className="text-muted-foreground text-xs font-normal"
              >
                {t('editor.marketing1.channel', { n: i + 1 })}
              </Label>
              <Input
                id={`${id}-${key}`}
                value={settings[key]}
                onChange={(e) => patch({ [key]: e.target.value })}
                className="font-mono uppercase"
              />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing1.sectionChart')}
        </Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="space-y-1">
            <Label
              htmlFor={`${id}-cap`}
              className="text-muted-foreground text-xs font-normal"
            >
              {t('editor.marketing1.chartCaption')}
            </Label>
            <Input
              id={`${id}-cap`}
              value={settings.chartCaption}
              onChange={(e) => patch({ chartCaption: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label
              htmlFor={`${id}-trend`}
              className="text-muted-foreground text-xs font-normal"
            >
              {t('editor.marketing1.chartTrendLabel')}
            </Label>
            <Input
              id={`${id}-trend`}
              value={settings.chartTrendLabel}
              onChange={(e) => patch({ chartTrendLabel: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label
              htmlFor={`${id}-cbadge`}
              className="text-muted-foreground text-xs font-normal"
            >
              {t('editor.marketing1.chartBadge')}
            </Label>
            <Input
              id={`${id}-cbadge`}
              value={settings.chartBadge}
              onChange={(e) => patch({ chartBadge: e.target.value })}
              className="font-mono"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing1.sectionKpis')}
        </Label>
        {[1, 2, 3].map((n) => {
          const labelKey = `kpi${n}Label` as keyof Marketing1Settings
          const valueKey = `kpi${n}Value` as keyof Marketing1Settings
          const deltaKey = `kpi${n}Delta` as keyof Marketing1Settings
          return (
            <div
              key={`kpi-${n}`}
              className="grid grid-cols-1 gap-2 rounded-lg border bg-muted/20 p-3 sm:grid-cols-3"
            >
              <div className="space-y-1">
                <Label
                  htmlFor={`${id}-kl${n}`}
                  className="text-muted-foreground text-xs font-normal"
                >
                  {t('editor.marketing1.kpiLabel', { n })}
                </Label>
                <Input
                  id={`${id}-kl${n}`}
                  value={settings[labelKey] as string}
                  onChange={(e) => patch({ [labelKey]: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor={`${id}-kv${n}`}
                  className="text-muted-foreground text-xs font-normal"
                >
                  {t('editor.marketing1.kpiValue', { n })}
                </Label>
                <Input
                  id={`${id}-kv${n}`}
                  value={settings[valueKey] as string}
                  onChange={(e) => patch({ [valueKey]: e.target.value })}
                  className="font-mono"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor={`${id}-kd${n}`}
                  className="text-muted-foreground text-xs font-normal"
                >
                  {t('editor.marketing1.kpiDelta', { n })}
                </Label>
                <Input
                  id={`${id}-kd${n}`}
                  value={settings[deltaKey] as string}
                  onChange={(e) => patch({ [deltaKey]: e.target.value })}
                  className="font-mono"
                />
              </div>
            </div>
          )
        })}
      </div>

      <Separator />

      <div className="space-y-2">
        <Label htmlFor={`${id}-ticker`} className="text-base">
          {t('editor.marketing1.tickerLine')}
        </Label>
        <Textarea
          id={`${id}-ticker`}
          rows={2}
          value={settings.tickerLine}
          onChange={(e) => patch({ tickerLine: e.target.value })}
          className="font-mono text-xs uppercase tracking-wide"
        />
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing1.sectionBrand')}
        </Label>
        <div className="space-y-2">
          <Label htmlFor={`${id}-brand`}>
            {t('editor.marketing1.brandName')}
          </Label>
          <Input
            id={`${id}-brand`}
            value={settings.brandName}
            onChange={(e) => patch({ brandName: e.target.value })}
          />
        </div>
        <div className="bg-muted/30 flex flex-col gap-2 rounded-lg border p-2">
          <div className="bg-background relative mx-auto flex aspect-[3/1] w-full max-w-[180px] items-center justify-center overflow-hidden rounded-md border">
            {settings.brandLogo ? (
              <img
                src={settings.brandLogo}
                alt=""
                className="max-h-full max-w-full object-contain p-2"
              />
            ) : (
              <ImagePlus className="text-muted-foreground size-7 opacity-40" />
            )}
          </div>
          <input
            ref={logoRef}
            type="file"
            accept={ACCEPT}
            className="sr-only"
            onChange={(e) => {
              void pickLogo(e.target.files?.[0] ?? null)
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
        <div>
          <Label className="text-base">
            {t('editor.marketing1.skillIcons')}
          </Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.marketing1.skillHint')}
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

      <Separator />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${id}-footer`}>
            {t('editor.marketing1.footerTag')}
          </Label>
          <Input
            id={`${id}-footer`}
            value={settings.footerTag}
            onChange={(e) => patch({ footerTag: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${id}-meta`}>
            {t('editor.marketing1.metaTag')}
          </Label>
          <Input
            id={`${id}-meta`}
            value={settings.metaTag}
            onChange={(e) => patch({ metaTag: e.target.value })}
            className="font-mono"
          />
        </div>
      </div>
    </div>
  )
}

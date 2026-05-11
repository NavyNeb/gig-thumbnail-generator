import { useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Trash2 } from 'lucide-react'
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
import type { Marketing3Settings } from '@/templates/settings-types'
import { MARKETING3_MAX_SKILL_ICONS } from '@/templates/settings-types'

function padEnd<T>(arr: T[] | undefined, len: number, fill: T): T[] {
  const a = [...(arr ?? [])]
  while (a.length < len) a.push(fill)
  return a.slice(0, len)
}

const ACCEPT = 'image/png,image/jpeg,image/jpg,image/svg+xml,.svg'

export function Marketing3Controls() {
  const { t } = useTranslation()
  const id = useId()
  const settings = useEditorStore(
    (s) => s.settingsByTemplateId['marketing-3'],
  )
  const update = useEditorStore((s) => s.updateTemplateSettings)

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

  const patch = (partial: Partial<Marketing3Settings>) => {
    update('marketing-3', partial)
  }

  const skillSlots = padEnd(settings.skillIcons, MARKETING3_MAX_SKILL_ICONS, '')

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
      const next = padEnd(settings.skillIcons, MARKETING3_MAX_SKILL_ICONS, '')
      next[index] = dataUrl
      patch({ skillIcons: next })
    } catch {
      toast.error(t('editor.software1.fileReadError'))
    }
  }

  const clearSkillSlot = (index: number) => {
    const next = padEnd(settings.skillIcons, MARKETING3_MAX_SKILL_ICONS, '')
    next[index] = ''
    patch({ skillIcons: next })
  }

  return (
    <div className="space-y-5">
      <div>
        <Label className="text-base">
          {t('editor.marketing3.sectionPalette')}
        </Label>
        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ColorField
            id={`${id}-bg`}
            label={t('editor.marketing3.bgColor')}
            value={settings.bgColor}
            onChange={(v) => patch({ bgColor: v })}
          />
          <ColorField
            id={`${id}-ink`}
            label={t('editor.marketing3.ink')}
            value={settings.ink}
            onChange={(v) => patch({ ink: v })}
          />
          <ColorField
            id={`${id}-mute`}
            label={t('editor.marketing3.mute')}
            value={settings.mute}
            onChange={(v) => patch({ mute: v })}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ColorField
            id={`${id}-acc`}
            label={t('editor.marketing3.accent')}
            value={settings.accent}
            onChange={(v) => patch({ accent: v })}
          />
          <ColorField
            id={`${id}-paper`}
            label={t('editor.marketing3.paper')}
            value={settings.paper}
            onChange={(v) => patch({ paper: v })}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={() =>
            patch({
              bgColor: '#0e0e10',
              ink: '#f5f1e6',
              mute: '#7a7d75',
              accent: '#7CFFB2',
              paper: '#f4f1e8',
            })
          }
        >
          {t('editor.marketing3.resetPalette')}
        </Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing3.sectionMeta')}
        </Label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="space-y-1">
            <Label
              htmlFor={`${id}-mi`}
              className="text-muted-foreground text-xs font-normal"
            >
              {t('editor.marketing3.metaIndex')}
            </Label>
            <Input
              id={`${id}-mi`}
              value={settings.metaIndex}
              onChange={(e) => patch({ metaIndex: e.target.value })}
              className="font-mono uppercase"
            />
          </div>
          <div className="space-y-1">
            <Label
              htmlFor={`${id}-mc`}
              className="text-muted-foreground text-xs font-normal"
            >
              {t('editor.marketing3.metaCategory')}
            </Label>
            <Input
              id={`${id}-mc`}
              value={settings.metaCategory}
              onChange={(e) => patch({ metaCategory: e.target.value })}
              className="font-mono uppercase"
            />
          </div>
          <div className="space-y-1">
            <Label
              htmlFor={`${id}-md`}
              className="text-muted-foreground text-xs font-normal"
            >
              {t('editor.marketing3.metaDate')}
            </Label>
            <Input
              id={`${id}-md`}
              value={settings.metaDate}
              onChange={(e) => patch({ metaDate: e.target.value })}
              className="font-mono uppercase"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing3.sectionHeadlines')}
        </Label>
        {(['headlineLine1', 'headlineLine2', 'headlineLine3'] as const).map(
          (key, i) => (
            <div className="space-y-1" key={key}>
              <Label htmlFor={`${id}-${key}`}>
                {t('editor.marketing3.line', { n: i + 1 })}
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
        <div className="space-y-2">
          <Label htmlFor={`${id}-sub`}>
            {t('editor.marketing3.subline')}
          </Label>
          <Textarea
            id={`${id}-sub`}
            rows={2}
            value={settings.subline}
            onChange={(e) => patch({ subline: e.target.value })}
            className="font-mono text-xs uppercase"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing3.sectionRanks')}
        </Label>
        {[1, 2, 3].map((n) => {
          const termKey = `rank${n}Term` as keyof Marketing3Settings
          const urlKey = `rank${n}Url` as keyof Marketing3Settings
          const deltaKey = `rank${n}Delta` as keyof Marketing3Settings
          return (
            <div
              key={`rank-${n}`}
              className="rounded-lg border bg-muted/20 p-3 space-y-2"
            >
              <div className="text-muted-foreground text-xs font-mono uppercase tracking-wider">
                {t('editor.marketing3.rank', { n })}
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div className="space-y-1 sm:col-span-2">
                  <Label
                    htmlFor={`${id}-rt${n}`}
                    className="text-muted-foreground text-xs font-normal"
                  >
                    {t('editor.marketing3.rankTerm')}
                  </Label>
                  <Input
                    id={`${id}-rt${n}`}
                    value={settings[termKey] as string}
                    onChange={(e) => patch({ [termKey]: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor={`${id}-rd${n}`}
                    className="text-muted-foreground text-xs font-normal"
                  >
                    {t('editor.marketing3.rankDelta')}
                  </Label>
                  <Input
                    id={`${id}-rd${n}`}
                    value={settings[deltaKey] as string}
                    onChange={(e) => patch({ [deltaKey]: e.target.value })}
                    className="font-mono"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor={`${id}-ru${n}`}
                  className="text-muted-foreground text-xs font-normal"
                >
                  {t('editor.marketing3.rankUrl')}
                </Label>
                <Input
                  id={`${id}-ru${n}`}
                  value={settings[urlKey] as string}
                  onChange={(e) => patch({ [urlKey]: e.target.value })}
                  className="font-mono text-xs"
                />
              </div>
            </div>
          )
        })}
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-base">
          {t('editor.marketing3.sectionKeywords')}
        </Label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {(
            [
              'keyword1',
              'keyword2',
              'keyword3',
              'keyword4',
              'keyword5',
            ] as const
          ).map((key, i) => (
            <div className="space-y-1" key={key}>
              <Label
                htmlFor={`${id}-${key}`}
                className="text-muted-foreground text-xs font-normal"
              >
                {t('editor.marketing3.keyword', { n: i + 1 })}
              </Label>
              <Input
                id={`${id}-${key}`}
                value={settings[key]}
                onChange={(e) => patch({ [key]: e.target.value })}
                className="font-mono lowercase"
              />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div>
          <Label className="text-base">
            {t('editor.marketing3.skillIcons')}
          </Label>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('editor.marketing3.skillHint')}
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

      <div className="space-y-2">
        <Label htmlFor={`${id}-foot`}>
          {t('editor.marketing3.footerTag')}
        </Label>
        <Input
          id={`${id}-foot`}
          value={settings.footerTag}
          onChange={(e) => patch({ footerTag: e.target.value })}
          className="font-mono uppercase"
        />
      </div>
    </div>
  )
}

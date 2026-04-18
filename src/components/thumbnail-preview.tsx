import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toPng } from 'html-to-image'
import { Download } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  THUMBNAIL_HEIGHT,
  THUMBNAIL_WIDTH,
} from '@/lib/thumbnail/constants'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/stores/editor-store'
import { TEMPLATE_REGISTRY } from '@/templates/registry'

const ZOOM_OPTIONS = [0.35, 0.5, 0.65, 0.8] as const

export function ThumbnailPreview({ className }: { className?: string }) {
  const { t } = useTranslation()
  const activeTemplateId = useEditorStore((s) => s.activeTemplateId)
  const settings = useEditorStore((s) => s.settingsByTemplateId[activeTemplateId])

  const [zoom, setZoom] = useState<(typeof ZOOM_OPTIONS)[number]>(0.5)
  const [downloading, setDownloading] = useState(false)
  const captureRef = useRef<HTMLDivElement>(null)

  const def = TEMPLATE_REGISTRY[activeTemplateId]
  const View = def.View

  const scaled = useMemo(
    () => ({
      width: THUMBNAIL_WIDTH * zoom,
      height: THUMBNAIL_HEIGHT * zoom,
    }),
    [zoom],
  )

  const handleDownloadPng = async () => {
    const node = captureRef.current
    if (!node) return

    setDownloading(true)
    const prevTransform = node.style.transform
    const parent = node.parentElement
    const prevParentOverflow = parent?.style.overflow

    try {
      await document.fonts.ready
      node.style.transform = 'none'
      if (parent) parent.style.overflow = 'visible'

      const dataUrl = await toPng(node, {
        width: THUMBNAIL_WIDTH,
        height: THUMBNAIL_HEIGHT,
        pixelRatio: 1,
        cacheBust: true,
      })

      const link = document.createElement('a')
      link.download = `fiverr-gig-thumbnail-${activeTemplateId}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Thumbnail export failed:', err)
    } finally {
      node.style.transform = prevTransform
      if (parent) {
        parent.style.overflow = prevParentOverflow ?? ''
      }
      setDownloading(false)
    }
  }

  return (
    <div
      className={cn(
        'bg-muted/30 flex min-h-0 min-w-0 flex-1 flex-col rounded-xl border',
        className,
      )}
    >
      <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3 text-sm">
        <span className="font-medium text-foreground">{t('editor.preview')}</span>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">
            {t('editor.dimensions', {
              width: THUMBNAIL_WIDTH,
              height: THUMBNAIL_HEIGHT,
            })}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs">{t('editor.zoom')}</span>
            <Select
              value={String(zoom)}
              onValueChange={(v) =>
                setZoom(Number(v) as (typeof ZOOM_OPTIONS)[number])
              }
            >
              <SelectTrigger size="sm" className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                position="popper"
                side="bottom"
                align="end"
                sideOffset={4}
                className="z-[100]"
              >
                {ZOOM_OPTIONS.map((z) => (
                  <SelectItem key={z} value={String(z)}>
                    {Math.round(z * 100)}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-auto p-4 md:p-6">
        <div className="flex min-h-full min-w-min justify-center pb-2">
          <div
            className="shadow-lg overflow-hidden rounded-sm"
            style={{
              width: scaled.width,
              height: scaled.height,
            }}
          >
            <div
              ref={captureRef}
              className="origin-top-left"
              style={{
                width: THUMBNAIL_WIDTH,
                height: THUMBNAIL_HEIGHT,
                transform: `scale(${zoom})`,
              }}
            >
              <View settings={settings as never} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 justify-end border-t px-4 py-3">
        <Button
          type="button"
          size="default"
          className="gap-2"
          disabled={downloading}
          onClick={() => void handleDownloadPng()}
        >
          <Download className="size-4" aria-hidden />
          {downloading ? t('editor.actions.downloading') : t('editor.actions.downloadPng')}
        </Button>
      </div>
    </div>
  )
}

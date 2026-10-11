import { useLayoutEffect, useRef, useState } from 'react'
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

const ZOOM_OPTIONS = [0.35, 0.5, 0.65, 0.8, 1] as const
type ZoomMode = 'fit' | (typeof ZOOM_OPTIONS)[number]

/** Side-by-side editor layout starts here (matches Tailwind `lg`). */
const DESKTOP_QUERY = '(min-width: 1024px)'

export function ThumbnailPreview({ className }: { className?: string }) {
  const { t } = useTranslation()
  const activeTemplateId = useEditorStore((s) => s.activeTemplateId)
  const settings = useEditorStore((s) => s.settingsByTemplateId[activeTemplateId])

  const [zoomMode, setZoomMode] = useState<ZoomMode>('fit')
  const [fitZoom, setFitZoom] = useState(0.35)
  const [downloading, setDownloading] = useState(false)
  const captureRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)

  // "Fit" scales the thumbnail to the space actually available, so the whole
  // preview is visible on any screen (width-only when the layout is stacked).
  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const measure = () => {
      const cs = getComputedStyle(el)
      const availW =
        el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
      const availH =
        el.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
      const byWidth = availW / THUMBNAIL_WIDTH
      const byHeight = window.matchMedia(DESKTOP_QUERY).matches
        ? availH / THUMBNAIL_HEIGHT
        : Infinity
      const next = Math.min(1, byWidth, byHeight)
      if (next > 0 && Number.isFinite(next)) setFitZoom(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const zoom = zoomMode === 'fit' ? fitZoom : zoomMode

  const def = TEMPLATE_REGISTRY[activeTemplateId]
  const View = def.View

  const scaled = {
    width: THUMBNAIL_WIDTH * zoom,
    height: THUMBNAIL_HEIGHT * zoom,
  }

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
        'bg-muted/30 flex min-w-0 flex-col rounded-xl border lg:min-h-0 lg:flex-1',
        className,
      )}
    >
      <div className="text-muted-foreground flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b px-3 py-3 text-sm sm:px-4">
        <span className="font-medium text-foreground">{t('editor.preview')}</span>
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
          <span className="hidden whitespace-nowrap sm:inline">
            {t('editor.dimensions', {
              width: THUMBNAIL_WIDTH,
              height: THUMBNAIL_HEIGHT,
            })}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs">{t('editor.zoom')}</span>
            <Select
              value={String(zoomMode)}
              onValueChange={(v) =>
                setZoomMode(v === 'fit' ? 'fit' : (Number(v) as ZoomMode))
              }
            >
              <SelectTrigger size="sm" className="w-[104px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                position="popper"
                side="bottom"
                align="end"
                sideOffset={4}
                className="z-[100]"
              >
                <SelectItem value="fit">{t('editor.zoomFit')}</SelectItem>
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

      <div
        ref={viewportRef}
        className="relative min-h-0 min-w-0 flex-1 overflow-auto p-3 sm:p-4 lg:p-6"
      >
        <div className="flex min-h-full w-max min-w-full items-center justify-center">
          <div
            className="shrink-0 overflow-hidden rounded-sm shadow-lg"
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

      <div className="flex shrink-0 justify-end border-t px-3 py-3 sm:px-4">
        <Button
          type="button"
          size="default"
          className="w-full gap-2 sm:w-auto"
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

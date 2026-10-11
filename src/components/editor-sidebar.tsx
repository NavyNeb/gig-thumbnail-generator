import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { useEditorStore } from '@/stores/editor-store'
import {
  CATEGORY_TEMPLATE_IDS,
  type CategoryId,
} from '@/templates/template-ids'
import { TEMPLATE_REGISTRY } from '@/templates/registry'

const CATEGORY_IDS: CategoryId[] = ['software', 'graphics', 'marketing']

export function EditorSidebar({ className }: { className?: string }) {
  const { t } = useTranslation()
  const activeCategoryId = useEditorStore((s) => s.activeCategoryId)
  const activeTemplateId = useEditorStore((s) => s.activeTemplateId)
  const setActiveCategory = useEditorStore((s) => s.setActiveCategory)
  const setActiveTemplate = useEditorStore((s) => s.setActiveTemplate)

  const activeDef = TEMPLATE_REGISTRY[activeTemplateId]
  const Controls = activeDef.Controls

  const tabsScrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollArrows = useCallback(() => {
    const el = tabsScrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 2)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2)
  }, [])

  useLayoutEffect(() => {
    updateScrollArrows()
    const el = tabsScrollRef.current
    if (!el) return
    const ro = new ResizeObserver(updateScrollArrows)
    ro.observe(el)
    el.addEventListener('scroll', updateScrollArrows, { passive: true })
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', updateScrollArrows)
    }
  }, [updateScrollArrows, activeCategoryId])

  const scrollTabs = (delta: number) => {
    tabsScrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col lg:min-h-0 lg:w-[24rem] lg:shrink-0 xl:w-[28rem]',
        className,
      )}
    >
      <Card className="flex min-w-0 flex-col py-0 lg:min-h-0 lg:flex-1 lg:overflow-hidden">
        <CardHeader className="shrink-0 space-y-1 px-4 pt-5 pb-3">
          <CardTitle className="text-base">{t('editor.selectCategory')}</CardTitle>
        </CardHeader>
        <CardContent className="flex min-w-0 flex-col gap-0 px-0 pb-0 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain [scrollbar-width:thin]">
          <Tabs
            value={activeCategoryId}
            onValueChange={(v) => setActiveCategory(v as CategoryId)}
            className="flex shrink-0 flex-col gap-0"
          >
            <div className="flex shrink-0 items-stretch gap-1 px-4 pb-3">
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="h-9 w-8 shrink-0 self-center"
                disabled={!canScrollLeft}
                onClick={() => scrollTabs(-180)}
                aria-label={t('editor.scrollTabsLeft')}
              >
                <ChevronLeft className="size-4" aria-hidden />
              </Button>
              <div
                ref={tabsScrollRef}
                className={cn(
                  'min-w-0 flex-1 overflow-x-auto overflow-y-hidden scroll-smooth',
                  '[scrollbar-width:thin]',
                  '[&::-webkit-scrollbar]:h-1.5',
                  '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30',
                )}
              >
                <TabsList
                  variant="line"
                  className="inline-flex h-auto w-max min-w-full justify-start gap-0 bg-transparent p-0"
                >
                  {CATEGORY_IDS.map((id) => (
                    <TabsTrigger
                      key={id}
                      value={id}
                      className="shrink-0 rounded-none border-b-2 border-transparent px-3 py-2 whitespace-nowrap data-active:border-primary"
                    >
                      {t(`categories.${id}`)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                className="h-9 w-8 shrink-0 self-center"
                disabled={!canScrollRight}
                onClick={() => scrollTabs(180)}
                aria-label={t('editor.scrollTabsRight')}
              >
                <ChevronRight className="size-4" aria-hidden />
              </Button>
            </div>

            {CATEGORY_IDS.map((cat) => (
              <TabsContent
                key={cat}
                value={cat}
                className="mt-0 px-0 outline-none data-[state=inactive]:hidden"
              >
                <div className="px-4 pb-1">
                  <p className="text-muted-foreground mb-3 text-xs font-medium uppercase tracking-wide">
                    {t('editor.selectTemplate')}
                  </p>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                    {CATEGORY_TEMPLATE_IDS[cat].map((id) => {
                      const def = TEMPLATE_REGISTRY[id]
                      const selected = activeTemplateId === id
                      return (
                        <li key={id}>
                          <button
                            type="button"
                            onClick={() => setActiveTemplate(id)}
                            className={cn(
                              'w-full rounded-lg border px-3 py-2.5 text-left transition-colors',
                              selected
                                ? 'border-primary bg-primary/5 ring-2 ring-ring'
                                : 'border-border hover:bg-muted/40',
                            )}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-medium leading-tight">
                                {t(`templates.${id}.name`)}
                              </span>
                              <Badge
                                variant={
                                  def.status === 'ready' ? 'default' : 'secondary'
                                }
                                className="shrink-0 text-[10px]"
                              >
                                {def.status === 'ready'
                                  ? t('editor.statusReady')
                                  : t('editor.statusSoon')}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mt-1 text-xs leading-snug">
                              {t(`templates.${id}.description`)}
                            </p>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <Separator className="my-1 shrink-0" />

          <div className="flex min-w-0 flex-col px-4 pb-4 pt-1">
            <p className="text-muted-foreground mb-2 shrink-0 text-xs font-medium uppercase tracking-wide">
              {t('editor.customize')}
            </p>
            <div className="min-w-0">
              <div className="min-w-0 space-y-5 pb-4 pt-1">
                <Controls />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

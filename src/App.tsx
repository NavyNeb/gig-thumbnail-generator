import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AppHeader } from '@/components/app-header'
import { EditorSidebar } from '@/components/editor-sidebar'
import { ThumbnailPreview } from '@/components/thumbnail-preview'

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const lng = i18n.language.startsWith('fr') ? 'fr' : 'en'
    document.documentElement.lang = lng
  }, [i18n.language])

  return (
    <div className="bg-background text-foreground flex min-h-svh flex-col lg:h-svh lg:overflow-hidden">
      <AppHeader />
      <main className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:gap-4 sm:p-4 lg:min-h-0 lg:flex-row lg:gap-6 lg:p-6">
        <EditorSidebar className="order-2 lg:order-1" />
        <ThumbnailPreview className="order-1 lg:order-2" />
      </main>
    </div>
  )
}

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
    <div className="bg-background text-foreground flex min-h-svh flex-col">
      <AppHeader />
      <main className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden p-4 md:flex-row md:gap-6 md:p-6">
        <EditorSidebar />
        <ThumbnailPreview className="min-h-[min(60vh,560px)] min-w-0 md:min-h-0" />
      </main>
    </div>
  )
}

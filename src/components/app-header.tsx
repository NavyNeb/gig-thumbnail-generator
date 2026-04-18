import { useTranslation } from 'react-i18next'
import { Languages, Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const languages = [
  { code: 'en' as const, label: 'English' },
  { code: 'fr' as const, label: 'Français' },
]

const themes = [
  { value: 'light' as const, icon: Sun, labelKey: 'common.themeLight' },
  { value: 'dark' as const, icon: Moon, labelKey: 'common.themeDark' },
  { value: 'system' as const, icon: Monitor, labelKey: 'common.themeSystem' },
]

export function AppHeader() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 backdrop-blur md:px-6">
      <div className="min-w-0">
        <h1 className="truncate text-lg font-semibold tracking-tight md:text-xl">
          {t('app.title')}
        </h1>
        <p className="text-muted-foreground hidden text-sm sm:block">
          {t('app.tagline')}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5">
          <Languages className="text-muted-foreground size-4 shrink-0" aria-hidden />
          <span className="text-muted-foreground sr-only">
            {t('common.language')}
          </span>
          <Select
            value={i18n.language.startsWith('fr') ? 'fr' : 'en'}
            onValueChange={(lng) => void i18n.changeLanguage(lng)}
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              position="popper"
              side="bottom"
              align="end"
              sideOffset={6}
              className="z-[100]"
            >
              {languages.map((l) => (
                <SelectItem key={l.code} value={l.code}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground sr-only">
            {t('common.theme')}
          </span>
          <div className="bg-muted inline-flex rounded-lg p-0.5">
            {themes.map(({ value, icon: Icon, labelKey }) => (
              <Button
                key={value}
                type="button"
                variant={theme === value ? 'default' : 'ghost'}
                size="icon-sm"
                className="size-8 rounded-md"
                onClick={() => setTheme(value)}
                title={t(labelKey)}
              >
                <Icon className="size-4" />
                <span className="sr-only">{t(labelKey)}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

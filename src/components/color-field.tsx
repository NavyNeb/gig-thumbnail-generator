import type { ReactNode } from 'react'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type ColorFieldProps = {
  id: string
  label: ReactNode
  value: string
  onChange: (value: string) => void
  className?: string
}

/**
 * Native color input sized so the swatch fills the control (not a tiny strip
 * inside the default shadcn Input shell).
 */
export function ColorField({
  id,
  label,
  value,
  onChange,
  className,
}: ColorFieldProps) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-2', className)}>
      <Label
        className="text-muted-foreground line-clamp-2 text-xs font-medium leading-snug"
        htmlFor={id}
      >
        {label}
      </Label>
      <div className="rounded-xl border border-border/90 bg-muted/50 p-1.5 shadow-inner dark:bg-muted/30">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'box-border block h-12 w-full min-w-0 cursor-pointer rounded-lg border-0 bg-transparent p-0',
            '[&::-webkit-color-swatch-wrapper]:box-border [&::-webkit-color-swatch-wrapper]:h-12 [&::-webkit-color-swatch-wrapper]:min-h-12 [&::-webkit-color-swatch-wrapper]:w-full [&::-webkit-color-swatch-wrapper]:p-0',
            '[&::-webkit-color-swatch]:box-border [&::-webkit-color-swatch]:h-full [&::-webkit-color-swatch]:min-h-12 [&::-webkit-color-swatch]:w-full [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0',
            '[&::-moz-color-swatch]:h-full [&::-moz-color-swatch]:min-h-12 [&::-moz-color-swatch]:w-full [&::-moz-color-swatch]:rounded-md [&::-moz-color-swatch]:border-0',
          )}
        />
      </div>
    </div>
  )
}

import { useTranslation } from 'react-i18next'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useEditorStore } from '@/stores/editor-store'
import type { PlaceholderTemplateSettings } from '@/templates/settings-types'
import type { TemplateId } from '@/templates/template-ids'

type Props = {
  templateId: TemplateId
}

export function PlaceholderControls({ templateId }: Props) {
  const { t } = useTranslation()
  const settings = useEditorStore(
    (s) => s.settingsByTemplateId[templateId],
  ) as PlaceholderTemplateSettings
  const update = useEditorStore((s) => s.updateTemplateSettings)

  return (
    <div className="space-y-2">
      <Label htmlFor={`ph-${templateId}-title`}>{t('editor.fields.title')}</Label>
      <Textarea
        id={`ph-${templateId}-title`}
        value={settings.title}
        onChange={(e) =>
          update(templateId, { title: e.target.value })
        }
        rows={3}
        className="resize-y"
      />
      <p className="text-muted-foreground text-xs leading-relaxed">
        {t('editor.placeholderHint')}
      </p>
    </div>
  )
}

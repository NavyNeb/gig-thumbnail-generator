const ACCEPT = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'] as const

export const IMAGE_MAX_BYTES = 2_500_000

export type ImageFileValidationError = 'invalid-type' | 'too-large'

export function validateImageFile(file: File): ImageFileValidationError | null {
  const isSvgExt = file.name.toLowerCase().endsWith('.svg')
  const ok =
    ACCEPT.some((t) => file.type === t) ||
    (isSvgExt && (file.type === '' || file.type === 'image/svg+xml'))
  if (!ok) return 'invalid-type'
  if (file.size > IMAGE_MAX_BYTES) return 'too-large'
  return null
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('Invalid read result'))
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

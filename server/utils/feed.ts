export const SITE_URL = 'https://ctrlaltdelrue.be'

export function absolute(path: string) {
  return new URL(path, SITE_URL).href
}

export function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

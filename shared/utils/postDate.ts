// Nuxt Content stores datetimes as 'YYYY-MM-DD HH:MM:SS' in UTC, without a zone
export function parsePostDate(date: string | Date) {
  return typeof date === 'string' && date.includes(' ')
    ? new Date(`${date.replace(' ', 'T')}Z`)
    : new Date(date)
}

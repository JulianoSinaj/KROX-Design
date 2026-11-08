// Ndihmës për linket e kontaktit (telefon, email, hartë).
// Të gjitha komponentet i përdorin këto, që sjellja të jetë e njëjtë kudo.

/** "+355 69 958 3595" → "tel:+355699583595" (hap dritaren e thirrjes në celular). */
export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`

/**
 * Link mailto me subjekt dhe tekst të parambushur.
 * Përdoret encodeURIComponent (jo URLSearchParams) që hapësirat të mos dalin si "+"
 * në disa klientë email-i (Outlook, Apple Mail).
 */
export function mailtoHref(email, { subject, body } = {}) {
  const params = []
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`)
  if (body) params.push(`body=${encodeURIComponent(body)}`)
  return `mailto:${email}${params.length ? `?${params.join('&')}` : ''}`
}

/** Subjekti dhe teksti standard kur vizitori klikon mbi email-in e kompanisë. */
export const defaultMail = {
  subject: 'Kërkesë informacioni — KROX Design',
  body: 'Përshëndetje KROX Design,\n\nDëshiroj të marr më shumë informacion mbi…\n\nFaleminderit,\n',
}

// URL-të universale të Google Maps: në celular hapin aplikacionin Google Maps
// (nëse është i instaluar), në desktop hapin maps.google.com.
export const mapsOpenUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
export const mapsDirectionsUrl = (query) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`
export const mapsEmbedUrl = (query) => `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`

/** Atributet për linket që hapen në një skedë të re. */
export const external = { target: '_blank', rel: 'noopener noreferrer' }

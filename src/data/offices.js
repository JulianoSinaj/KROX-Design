import { company } from './site'

/**
 * Zyrat e KROX Design.
 * Për të shtuar një zyrë të re, kopjoni një objekt dhe ndryshoni fushat —
 * seksioni "Zyrat" (karta, harta, statusi, numëruesi) përditësohet automatikisht.
 *
 * hours: orari javor, indeksi 0 = E Diel … 6 = E Shtunë.
 *        ['08:00', '18:00'] = hapur; null = mbyllur.
 */
export const offices = [
  {
    id: 'vlore-qendrore',
    label: 'Zyra qendrore',
    name: 'KROX Design — Vlorë',
    address: 'Vlorë, Shqipëri',
    city: 'Vlorë',
    country: 'Shqipëri',
    phone: company.phone,
    email: company.email,
    mapQuery: 'Vlorë, Shqipëri', // TODO: vendosni adresën e saktë të zyrës (rruga, nr.)
    coords: { lat: 40.4661, lng: 19.4914 }, // TODO: koordinatat e sakta të zyrës
    hours: [
      null, // E Diel
      ['08:00', '18:00'], // E Hënë
      ['08:00', '18:00'], // E Martë
      ['08:00', '18:00'], // E Mërkurë
      ['08:00', '18:00'], // E Enjte
      ['08:00', '18:00'], // E Premte
      ['08:00', '18:00'], // E Shtunë
    ],
  },
  // Shembull për një zyrë të re në të ardhmen:
  // {
  //   id: 'tirane',
  //   label: 'Zyrë rajonale',
  //   name: 'KROX Design — Tiranë',
  //   address: 'Rruga …, Tiranë',
  //   city: 'Tiranë',
  //   country: 'Shqipëri',
  //   phone: '+355 …',
  //   email: company.email,
  //   mapQuery: 'Rruga …, Tiranë',
  //   coords: { lat: 41.3275, lng: 19.8187 },
  //   hours: [null, ['08:00', '17:00'], …],
  // },
]

const TZ = 'Europe/Tirane'
const dayNames = ['E Diel', 'E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtunë']
const weekdayIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/** Statusi aktual i zyrës sipas orës së Shqipërisë (pavarësisht ku ndodhet vizitori). */
export function officeStatus(office, date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  )
  const day = weekdayIndex[parts.weekday]
  const now = Number(parts.hour) * 60 + Number(parts.minute)
  const today = office.hours[day]
  const open = Boolean(today) && now >= toMinutes(today[0]) && now < toMinutes(today[1])

  return { open, dayName: dayNames[day], today: today ? `${today[0]} – ${today[1]}` : 'Mbyllur' }
}

/** 40.4661, 19.4914 → "40°28'N · 19°29'E" */
export function formatCoords({ lat, lng }) {
  const dm = (v, pos, neg) => {
    const abs = Math.abs(v)
    let d = Math.floor(abs)
    let m = Math.round((abs - d) * 60)
    if (m === 60) {
      d += 1
      m = 0
    }
    return `${d}°${String(m).padStart(2, '0')}'${v >= 0 ? pos : neg}`
  }
  return `${dm(lat, 'N', 'S')} · ${dm(lng, 'E', 'W')}`
}

export const mapsEmbedUrl = (o) => `https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery)}&output=embed`
export const mapsOpenUrl = (o) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.mapQuery)}`
export const mapsDirectionsUrl = (o) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(o.mapQuery)}`
export const telHref = (phone) => `tel:${phone.replace(/\s/g, '')}`

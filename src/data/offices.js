import { company } from './site'
import {
  mapsDirectionsUrl as mapsDirections,
  mapsEmbedUrl as mapsEmbed,
  mapsOpenUrl as mapsOpen,
  telHref,
} from './contact'

/**
 * Zyrat e KROX.
 * Për të shtuar një zyrë të re, kopjoni një objekt dhe ndryshoni fushat —
 * seksioni "Zyrat" (karta, harta, statusi, numëruesi) përditësohet automatikisht.
 * Etiketa mbi emër ("Zyra qendrore"…): locales/*.js → locations.offices[id].label
 *
 * street: opsionale, rruga dhe numri — adresa shfaqet "rruga, qyteti, shteti" (shteti në gjuhën aktive).
 * hours: orari javor, indeksi 0 = E Diel … 6 = E Shtunë.
 *        ['09:00', '17:00'] = hapur; null = mbyllur.
 */
export const offices = [
  {
    id: 'vlore-qendrore',
    name: 'KROX — Vlorë',
    city: 'Vlorë',
    phone: company.phone,
    email: company.email,
    mapQuery: 'Vlorë, Shqipëri', // TODO: vendosni adresën e saktë të zyrës (rruga, nr.)
    coords: { lat: 40.4661, lng: 19.4914 }, // TODO: koordinatat e sakta të zyrës
    hours: [
      null, // E Diel
      ['09:00', '17:00'], // E Hënë
      ['09:00', '17:00'], // E Martë
      ['09:00', '17:00'], // E Mërkurë
      ['09:00', '17:00'], // E Enjte
      ['09:00', '17:00'], // E Premte
      ['09:00', '17:00'], // E Shtunë
    ],
  },
  // Shembull për një zyrë të re në të ardhmen:
  // {
  //   id: 'tirane',             // + locations.offices.tirane.label në çdo gjuhë (p.sh. 'Zyrë rajonale')
  //   name: 'KROX — Tiranë',
  //   street: 'Rruga …',
  //   city: 'Tiranë',
  //   phone: '+355 …',
  //   email: company.email,
  //   mapQuery: 'Rruga …, Tiranë',
  //   coords: { lat: 41.3275, lng: 19.8187 },
  //   hours: [null, ['08:00', '17:00'], …],
  // },
]

const TZ = 'Europe/Tirane'
const weekdayIndex = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
const toMinutes = (t) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/**
 * Statusi aktual i zyrës sipas orës së Shqipërisë (pavarësisht ku ndodhet vizitori).
 * day: 0–6 (emri i ditës: locales → common.days[day]) · hours: "09:00 – 17:00" ose null kur është mbyllur sot.
 */
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

  return { open, day, hours: today ? `${today[0]} – ${today[1]}` : null }
}

/** "Rruga …, Vlorë, Albania" — shteti vjen nga gjuha aktive (t.common.country). */
export const officeAddress = (office, country) => [office.street, office.city, country].filter(Boolean).join(', ')

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

export const mapsEmbedUrl = (o) => mapsEmbed(o.mapQuery)
export const mapsOpenUrl = (o) => mapsOpen(o.mapQuery)
export const mapsDirectionsUrl = (o) => mapsDirections(o.mapQuery)
export { telHref }

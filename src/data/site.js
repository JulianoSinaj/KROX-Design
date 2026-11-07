// Të dhënat e përgjithshme të kompanisë — ndryshoni këtu informacionin real.

/** Foto shembull (placeholder). Zëvendësojini me foto reale te /public/images. */
export const placeholder = (seed, w = 1400, h = 1000) =>
  `https://picsum.photos/seed/krox-${seed}/${w}/${h}`

export const company = {
  name: 'KROX Design',
  founded: 2010,
  phone: '+355 69 000 0000',
  email: 'info@kroxdesign.al',
  address: 'Rruga e Kavajës, Nr. 00, Tiranë, Shqipëri',
  hours: 'E Hënë – E Shtunë · 08:00 – 18:00',
  mapQuery: 'Rruga e Kavajës, Tiranë',
  socials: [
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
}

export const navLinks = [
  { label: 'Rreth nesh', href: '#rreth-nesh' },
  { label: 'Shërbimet', href: '#sherbimet' },
  { label: 'Projektet', href: '#projektet' },
  { label: 'Kontakt', href: '#kontakt' },
]

export const yearsActive = new Date().getFullYear() - company.founded

export const stats = [
  { value: 90, suffix: '+', label: 'Klientë të kënaqur' },
  { value: 120, suffix: '+', label: 'Projekte të përfunduara' },
  { value: 60, suffix: '+', label: 'Inxhinierë & specialistë' },
  { value: 100, suffix: '%', label: 'Standarde sigurie' },
]

export const values = [
  {
    icon: 'Award',
    title: 'Cilësi pa kompromis',
    text: 'Materiale të certifikuara dhe kontroll teknik në çdo fazë të punimeve.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Siguria në kantier',
    text: 'Protokolle strikte sigurie dhe trajnime të vazhdueshme për çdo punonjës.',
  },
  {
    icon: 'Clock',
    title: 'Afate të respektuara',
    text: 'Planifikim i detajuar dhe raportim javor mbi ecurinë e projektit.',
  },
  {
    icon: 'Eye',
    title: 'Transparencë e plotë',
    text: 'Preventiva të qarta, pa kosto të fshehura dhe komunikim i hapur.',
  },
]

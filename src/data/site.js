// Të dhënat e përgjithshme të kompanisë.
// Burimi: Ekstrakti i Regjistrit Tregtar (QKB), datë 28/07/2026.

/** Foto shembull (placeholder). Zëvendësojini me foto reale te /public/images. */
export const placeholder = (seed, w = 1400, h = 1000) =>
  `https://picsum.photos/seed/krox-${seed}/${w}/${h}`

export const company = {
  name: 'KROX',          // emri tregtar
  legalName: 'KROX Shpk',       // emri ligjor
  founded: 2022,                // data e themelimit: 03/02/2022
  administrator: 'Kristi Sako',
  phone: '+355 69 958 3595',
  email: 'valeronshpk@gmail.com',
  city: 'Vlorë',
  address: 'Vlorë, Shqipëri',
  hours: 'E Hënë – E Shtunë · 08:00 – 18:00', // TODO: konfirmoni orarin real
  mapQuery: 'Vlorë, Shqipëri',
  socials: [
    // TODO: vendosni linket reale të rrjeteve sociale
    { label: 'Facebook', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
}

export const navLinks = [
  { label: 'Rreth nesh', href: '#rreth-nesh' },
  { label: 'Shërbimet', href: '#sherbimet' },
  { label: 'Projektet', href: '#projektet' },
  { label: 'Zyrat', href: '#zyrat' },
  { label: 'Kontakt', href: '#kontakt' },
]

export const yearsActive = new Date().getFullYear() - company.founded

// Vetëm shifra që mbështeten nga të dhënat zyrtare ose nga shërbimet që ofrohen.
// Kur të keni numrin real të projekteve, mund ta shtoni këtu, p.sh.:
// { value: 25, suffix: '+', label: 'Projekte të përfunduara' }
export const stats = [
  { value: 6, suffix: '', label: 'Fusha shërbimi' },
  { value: 100, suffix: '%', label: 'Standarde sigurie' },
  { value: 360, suffix: '°', label: 'Nga projekti te kolaudimi' },
]

export const values = [
  {
    icon: 'Award',
    title: 'Cilësi pa kompromis',
    text: 'Materiale të certifikuara dhe kontroll teknik në çdo fazë, nga projekti te kolaudimi.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Siguria në kantier',
    text: 'Protokolle strikte sigurie dhe mbikëqyrje e vazhdueshme e punimeve.',
  },
  {
    icon: 'Clock',
    title: 'Afate të respektuara',
    text: 'Planifikim i detajuar dhe raportim i rregullt mbi ecurinë e projektit.',
  },
  {
    icon: 'Eye',
    title: 'Transparencë e plotë',
    text: 'Preventiva të qarta, pa kosto të fshehura dhe komunikim i hapur.',
  },
]

// Të dhënat e përgjithshme të kompanisë — të njëjta në çdo gjuhë, nuk përkthehen.
// Burimi: Ekstrakti i Regjistrit Tregtar (QKB), datë 28/07/2026.
// Tekstet e faqes (etiketat, përshkrimet, orari, adresa me emrin e shtetit) janë te src/locales/.

export const company = {
  name: 'KROX',          // emri tregtar
  legalName: 'KROX Shpk',       // emri ligjor
  founded: 2022,                // data e themelimit: 03/02/2022
  administrator: 'Kristi Sako',
  phone: '+355 68 390 0044',
  email: 'kroxshpk@gmail.com',
  city: 'Vlorë',
  mapQuery: 'Vlorë, Shqipëri',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/kroxshpk/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kristi-sako-89a063197/' },
  ],
}

// href me "#" = seksion në faqen kryesore · href me "/" = faqe më vete (p.sh. /karriera).
// desktop: false → lidhja shfaqet vetëm në menunë mobile dhe në footer, jo në shiritin e sipërm.
// Emri i lidhjes: locales/*.js → nav.links[id]
export const navLinks = [
  { id: 'about', href: '#rreth-nesh' },
  { id: 'services', href: '#sherbimet' },
  { id: 'projects', href: '#projektet' },
  { id: 'offices', href: '#zyrat' },
  { id: 'contact', href: '#kontakt', desktop: false },
  { id: 'faq', href: '#pyetje', desktop: false },
  { id: 'careers', href: '/karriera' },
]

export const yearsActive = new Date().getFullYear() - company.founded

// Vetëm shifra që mbështeten nga të dhënat zyrtare ose nga shërbimet që ofrohen.
// Etiketa: locales/*.js → about.stats[id]. Kur të keni numrin real të projekteve, mund ta shtoni këtu, p.sh.:
// { id: 'completed', value: 25, suffix: '+' }  +  about.stats.completed: 'Projekte të përfunduara'
export const stats = [
  { id: 'fields', value: 6, suffix: '' },
  { id: 'safety', value: 100, suffix: '%' },
  { id: 'cycle', value: 360, suffix: '°' },
]

// Titulli dhe teksti: locales/*.js → about.values[id]
export const values = [
  { id: 'quality', icon: 'Award' },
  { id: 'safety', icon: 'ShieldCheck' },
  { id: 'deadlines', icon: 'Clock' },
  { id: 'transparency', icon: 'Eye' },
]

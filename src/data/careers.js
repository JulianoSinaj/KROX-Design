import { company } from './site'
import { mailtoHref } from './contact'

// Përmbajtja e faqes /karriera.
// Ikonat janë emra nga lucide-react (https://lucide.dev/icons).

/** Pse të punosh me KROX */
export const benefits = [
  {
    icon: 'ShieldCheck',
    title: 'Siguria para së gjithash',
    text: 'Pajisje mbrojtëse personale, protokolle sigurie dhe mbikëqyrje e vazhdueshme në çdo kantier.',
  },
  {
    icon: 'Handshake',
    title: 'Kontratë & pagë e rregullt',
    text: 'Marrëdhënie pune sipas Kodit të Punës, me sigurime shoqërore dhe pagesë në kohë.',
  },
  {
    icon: 'GraduationCap',
    title: 'Rritje profesionale',
    text: 'Mësoni nga inxhinierë me përvojë dhe merrni përgjegjësi gjithnjë e më të mëdha.',
  },
  {
    icon: 'Building2',
    title: 'Projekte të larmishme',
    text: 'Objekte rezidenciale, komerciale dhe industriale — nga projektimi deri te kolaudimi.',
  },
]

/**
 * Profilet që kërkojmë.
 * team: 'Zyrë' | 'Kantier' — etiketa e vogël mbi titull.
 * Për të shtuar një pozicion, kopjoni një objekt; butoni "Apliko" krijon automatikisht email-in.
 */
export const roles = [
  {
    id: 'inxhinier-ndertimi',
    team: 'Zyrë & kantier',
    title: 'Inxhinier ndërtimi / strukturist',
    text: 'Projektim strukturor, llogaritje, ndjekje e punimeve dhe kontroll cilësie në kantier.',
  },
  {
    id: 'arkitekt',
    team: 'Zyrë',
    title: 'Arkitekt / projektues',
    text: 'Projektim arkitektonik, interieri dhe peizazhi; përgatitje e dokumentacionit teknik.',
  },
  {
    id: 'pergjegjes-kantieri',
    team: 'Kantier',
    title: 'Përgjegjës kantieri / kryepunëtor',
    text: 'Organizim i skuadrave, planifikim ditor i punimeve dhe zbatim i rregullave të sigurisë.',
  },
  {
    id: 'topograf',
    team: 'Terren',
    title: 'Topograf',
    text: 'Matje topografike, piketime dhe dixhitalizim i të dhënave për projektim dhe zbatim.',
  },
  {
    id: 'punetor-kualifikuar',
    team: 'Kantier',
    title: 'Punëtorë të kualifikuar',
    text: 'Muratorë, hekurkthyes, karpentierë, suvatues, elektricistë dhe hidraulikë me përvojë.',
  },
  {
    id: 'operator-makinerish',
    team: 'Kantier',
    title: 'Operator makinerish / shofer',
    text: 'Drejtim i eskavatorëve, fadromave, vinçave dhe mjeteve të rënda (me patentë përkatëse).',
  },
]

/** Procesi i përzgjedhjes */
export const steps = [
  { title: 'Dërgoni CV-në', text: `Në ${company.email}, ose na telefononi për të na treguar për përvojën tuaj.` },
  { title: 'Shqyrtimi', text: 'Ekipi ynë e lexon çdo aplikim dhe ju kontakton nëse profili përputhet.' },
  { title: 'Takimi', text: 'Bisedë në zyrën tonë në Vlorë ose në kantier, sipas pozicionit.' },
  { title: 'Fillimi', text: 'Prezantim me ekipin, trajnim sigurie dhe nisja e punës.' },
]

export const spontaneous = 'Aplikim spontan'

/** Email aplikimi i parambushur për një pozicion (ose aplikim spontan). */
export function applyHref(position = spontaneous) {
  return mailtoHref(company.email, {
    subject: `Aplikim pune — ${position}`,
    body: `Përshëndetje KROX,\n\nDëshiroj të aplikoj për pozicionin: ${position}.\n\nEmri dhe mbiemri:\nTelefoni:\nVitet e përvojës:\n\nBashkëngjit CV-në time.\n\nFaleminderit,\n`,
  })
}

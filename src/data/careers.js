import { company } from './site'
import { mailtoHref } from './contact'

// Struktura e faqes /karriera. Të gjitha tekstet janë te locales/*.js → careers.
// Ikonat janë emra nga lucide-react (https://lucide.dev/icons).

/** Pse të punosh me KROX — tekstet: careers.benefits.items[id] */
export const benefits = [
  { id: 'safety', icon: 'ShieldCheck' },
  { id: 'contract', icon: 'Handshake' },
  { id: 'growth', icon: 'GraduationCap' },
  { id: 'projects', icon: 'Building2' },
]

/**
 * Profilet që kërkojmë — tekstet: careers.roles.items[id] ({ team, title, text }).
 * Për të shtuar një pozicion, shtoni id-në këtu dhe tekstet në çdo gjuhë;
 * butoni "Apliko" krijon automatikisht email-in.
 */
export const roles = [
  { id: 'inxhinier-ndertimi' },
  { id: 'arkitekt' },
  { id: 'pergjegjes-kantieri' },
  { id: 'topograf' },
  { id: 'punetor-kualifikuar' },
  { id: 'operator-makinerish' },
]

/** Email aplikimi i parambushur, në gjuhën aktive, për një pozicion (ose aplikim spontan). */
export function applyHref(t, position = t.careers.spontaneous.label) {
  const { subject, body } = t.careers.applyMail
  return mailtoHref(company.email, { subject: subject(position), body: body(position) })
}

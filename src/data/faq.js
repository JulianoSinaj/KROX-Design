import { company } from './site'

/**
 * Pyetjet e shpeshta (seksioni "Pyetje të shpeshta" në fund të faqes kryesore).
 * link (opsional): { label, href } — shfaqet si lidhje poshtë përgjigjes.
 */
export const faqs = [
  {
    q: 'Çfarë shërbimesh ofron KROX?',
    a: 'Mbulojmë gjithë ciklin e një vepre: studime gjeologo-inxhinierike dhe urbanistike, projektim arkitektonik, strukturor dhe interieri, zbatim punimesh ndërtimi dhe rikonstruksione, si dhe mbikëqyrje e kolaudim punimesh. Klienti ka një partner të vetëm nga ideja deri te dorëzimi.',
    link: { label: 'Shiko shërbimet', href: '#sherbimet' },
  },
  {
    q: 'Në cilat zona të Shqipërisë punoni?',
    a: `Zyra jonë qendrore ndodhet në ${company.city}, por marrim përsipër projekte në të gjithë Shqipërinë: rezidenciale, komerciale dhe industriale. Për çdo projekt jashtë qytetit organizojmë vizitë në terren përpara ofertës.`,
  },
  {
    q: 'Si mund të marr një preventiv për projektin tim?',
    a: `Na telefononi në ${company.phone}, na shkruani në ${company.email} ose plotësoni formularin e kontaktit. Pas një takimi njohës dhe, kur nevojitet, një vizite në objekt, ju dërgojmë një preventiv të detajuar, me zëra të qartë dhe pa kosto të fshehura.`,
    link: { label: 'Shko te formulari i kontaktit', href: '#kontakt' },
  },
  {
    q: 'Sa zgjat realizimi i një projekti?',
    a: 'Afati varet nga lloji, madhësia dhe faza e projektit. Përpara fillimit hartojmë një grafik pune me afate të qarta për çdo fazë dhe gjatë punimeve ju informojmë rregullisht mbi ecurinë, që të dini gjithmonë ku ndodhet projekti juaj.',
  },
  {
    q: 'Si mund të aplikoj për të punuar me KROX?',
    a: `Kërkojmë vazhdimisht inxhinierë, arkitektë, specialistë kantieri dhe punëtorë të kualifikuar. Dërgoni CV-në tuaj në ${company.email} ose na telefononi në ${company.phone} (${company.hours}).`,
    link: { label: 'Faqja e karrierës', href: '/karriera' },
  },
]

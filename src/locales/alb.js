import { company } from '../data/site'

/**
 * SHQIP — gjuha bazë e faqes.
 *
 * Çdo çelës këtu duhet të ekzistojë edhe te eng.js dhe ita.js. Nëse mungon atje,
 * faqja shfaq automatikisht tekstin shqip (shih locales/index.js).
 * Të dhënat zyrtare (emri, administratori, telefoni, email-i) vijnë nga data/site.js
 * dhe nuk përkthehen. Funksionet, p.sh. count: (n) => …, marrin vlera që njihen vetëm në ekran.
 */

const country = 'Shqipëri'
const hours = 'E Hënë – E Shtunë · 09:00 – 17:00'

export default {
  meta: {
    titles: {
      home: 'KROX — Ndërtim & Zbatim Projektesh',
      careers: 'Karriera — Punoni me KROX',
    },
    description: `${company.name} (${company.legalName}), ${company.city} — zbatim punimesh ndërtimi, rikonstruksione, projektim arkitektonik, studime urbanistike e gjeologo-inxhinierike, mbikëqyrje dhe kolaudim punimesh.`,
  },

  common: {
    country,
    address: `${company.city}, ${country}`,
    hours,
    // Indeksi 0 = E Diel … 6 = E Shtunë (si te data/offices.js)
    days: ['E Diel', 'E Hënë', 'E Martë', 'E Mërkurë', 'E Enjte', 'E Premte', 'E Shtunë'],
    copy: 'Kopjo',
    copied: 'U kopjua',
    copyLabel: (label) => `Kopjo ${label.toLowerCase()}`,
    copiedLabel: (label) => `${label} u kopjua`,
  },

  nav: {
    links: {
      about: 'Rreth nesh',
      services: 'Shërbimet',
      projects: 'Projektet',
      offices: 'Zyrat',
      contact: 'Kontakt',
      faq: 'Pyetje të shpeshta',
      careers: 'Karriera',
    },
    home: `${company.name} — kreu`,
    cta: 'Na kontaktoni',
    sendCv: 'Dërgo CV-në',
    openMenu: 'Hap menunë',
    closeMenu: 'Mbyll menunë',
    menu: 'Menuja',
    contact: 'Kontakt',
    language: 'Gjuha',
  },

  intro: {
    skip: 'Skip Intro',
  },

  hero: {
    eyebrow: 'Projektim · Zbatim · Mbikëqyrje',
    // Rreshti i fundit shfaqet me gradient gold
    title: ['Nga ideja te zbatimi', 'me standardet', 'më të larta'],
    lead: 'KROX projekton, zbaton dhe mbikëqyr punime ndërtimi me cilësi, saktësi dhe siguri maksimale në kantier, nga studimi i parë deri te kolaudimi.',
  },

  about: {
    label: 'Rreth nesh',
    title: 'Nga projekti te kolaudimi, me përgjegjësi dhe saktësi',
    // Paragrafi i parë nis me emrin "KROX" (i theksuar në komponent)
    intro: `(${company.legalName}) është shoqëri e themeluar në ${company.founded} me qendër në ${company.city}. Ne mbulojmë gjithë ciklin e një vepre: studimet gjeologo-inxhinierike dhe urbanistike, projektimin arkitektonik dhe strukturor, zbatimin e punimeve dhe rikonstruksionet.`,
    body: 'Mbikëqyrja dhe kolaudimi i punimeve janë pjesë e shërbimit tonë, ndaj cilësia dhe siguria në kantier kontrollohen në çdo fazë. Klienti ka një partner të vetëm dhe përgjegjës nga ideja deri te dorëzimi.',
    founded: 'Themeluar',
    imageAlt: 'Punëtorë në kantier mbi një soletë betonarmeje, mes armaturës së hekurit',
    stats: {
      fields: 'Fusha shërbimi',
      safety: 'Standarde sigurie',
      cycle: 'Nga projekti te kolaudimi',
    },
    values: {
      quality: {
        title: 'Cilësi pa kompromis',
        text: 'Materiale të certifikuara dhe kontroll teknik në çdo fazë, nga projekti te kolaudimi.',
      },
      safety: {
        title: 'Siguria në kantier',
        text: 'Protokolle strikte sigurie dhe mbikëqyrje e vazhdueshme e punimeve.',
      },
      deadlines: {
        title: 'Afate të respektuara',
        text: 'Planifikim i detajuar dhe raportim i rregullt mbi ecurinë e projektit.',
      },
      transparency: {
        title: 'Transparencë e plotë',
        text: 'Preventiva të qarta, pa kosto të fshehura dhe komunikim i hapur.',
      },
    },
  },

  services: {
    label: 'Shërbimet',
    title: 'Një partner për gjithë ciklin e veprës',
    intro: 'Nga studimet gjeologjike dhe projektimi, te zbatimi, mbikëqyrja dhe kolaudimi i punimeve, me një ekip të vetëm dhe përgjegjës.',
    cta: 'Kërko ofertë',
    prev: 'Shërbimi i mëparshëm',
    next: 'Shërbimi tjetër',
    // Sipas objektit të aktivitetit në Ekstraktin e QKB-së
    items: {
      zbatim: {
        title: 'Zbatim & rikonstruksion',
        text: 'Zbatim punimesh ndërtimi dhe rikonstruksione ndërtimore të tipologjive të ndryshme, nga themelet deri te përfundimet.',
        points: ['Zbatim punimesh ndërtimi', 'Rikonstruksione ndërtimore', 'Tipologji të ndryshme objektesh'],
      },
      arkitekture: {
        title: 'Projektim arkitektonik & urbanistikë',
        text: 'Projektim arkitektonik, studime urbanistike dhe plane të detajuara vendore për zhvillime të qëndrueshme.',
        points: ['Projektim arkitektonik', 'Studime urbanistike', 'Plane të detajuara vendore'],
      },
      objekte: {
        title: 'Projektim objektesh, interieri & peizazhi',
        text: 'Projektim i të gjitha kategorive të objekteve, përfshirë strukturat me shkallë të lartë vështirësie, interierin dhe peizazhin.',
        points: ['Struktura b/a, tullë, gur betoni, çelik', 'Projektim interieri', 'Peizazh & sistemim gjelbërimi'],
      },
      konsulence: {
        title: 'Konsulencë & vlerësime',
        text: 'Konsulencë preventive, vlerësim pasurish të paluajtshme, punime topografike dhe dixhitalizimi.',
        points: ['Konsulencë preventive', 'Vlerësim pasurish të paluajtshme', 'Topografi & dixhitalizim'],
      },
      gjeologji: {
        title: 'Studime gjeologo-inxhinierike',
        text: 'Studime dhe projektime gjeologo-inxhinierike dhe hidrogjeologjike, baza e çdo ndërtimi të sigurt.',
        points: ['Studime gjeologo-inxhinierike', 'Studime hidrogjeologjike', 'Vlerësime mjedisore'],
      },
      mbikeqyrje: {
        title: 'Mbikëqyrje & kolaudim',
        text: 'Mbikëqyrje e punimeve në kantier dhe kolaudim sipas standardeve teknike dhe legjislacionit në fuqi.',
        points: ['Mbikëqyrje punimesh', 'Kolaudim punimesh', 'Kontroll cilësie'],
      },
    },
  },

  projects: {
    label: 'Portofoli',
    title: 'Projekte që flasin vetë',
    filter: 'Filtro',
    filterLabel: 'Filtro projektet',
    categoriesLabel: 'Kategoritë',
    categories: {
      all: 'Të gjitha',
      rezidenciale: 'Rezidenciale',
      komerciale: 'Komerciale',
      industriale: 'Industriale',
    },
    cta: 'Diskutoni projektin tuaj',
    prev: 'Projekti i mëparshëm',
    next: 'Projekti tjetër',
    carouselLabel: 'Projektet — përdorni shigjetat ← → ose tërhiqni',
    drag: 'Tërhiq',
    viewDetails: (title) => `Shiko detajet: ${title}`,
    location: 'Vendndodhja',
    year: 'Viti',
    similar: 'Projekt i ngjashëm? Na shkruani',
    close: 'Mbyll',
    // type: nëntitulli mbi emrin e projektit · description: teksti i modalit
    items: {
      'beyond-boutique-hotel': {
        type: 'Hotel boutique luksoz',
        description:
          'Hotel boutique luksoz 4-katësh përballë detit në Dhërmi, me fasadë guri natyral, xhame panoramike nga dyshemeja deri në tavan, pishina infinity në çdo krah dhe ambiente beach-bar me terraca guri në nivelin e plazhit.',
      },
      'santorini-residence': {
        type: 'Kompleks rezidencial',
        description:
          'Kompleks rezidencial në stilin kikladik me disa blloqe 3–4 katëshe, fasada të bardha me harqe, dritare e kanata në ngjyra blu dhe të verdha, tarraca me pamje nga deti dhe pishinë të përbashkët në oborrin qendror.',
      },
      'finca-alevra-residence': {
        type: 'Rezidencë mesdhetare',
        description:
          'Rezidencë në stilin mesdhetar me bazament guri natyral dhe harqe në katin përdhe, fasada të suvatuara në tone të ngrohta, grila druri, ballkone me parmakë metalikë dhe tarraca të gjelbëruara me shkallë që ndjekin terrenin.',
      },
      'green-terrace-residence': {
        type: 'Kompleks me tarraca',
        description:
          'Kompleks rezidencial me kate të shkallëzuara që ndjekin pjerrësinë e kodrës, tarraca të gjera me fasha të gjelbra, parmakë xhami, fasadë guri natyral dhe hyrje me shesh qarkullimi mes pishave e ullinjve.',
      },
      'green-coast': {
        type: 'Resort rezidencial',
        description:
          'Resort rezidencial i integruar në pyllin e kodrës mbi Palasë, me vila e blloqe të shkallëzuara me çati të gjelbra, pishina private, pishinë qendrore të përbashkët dhe rrugë të brendshme që ndjekin konturet e terrenit.',
      },
      'galeria-by-teg': {
        type: 'Qendër tregtare',
        description:
          'Qendër tregtare me supermarket dhe dyqane në katin përdhe pas vitrinave xhami, çati të gjelbër të shfrytëzueshme dhe volume në tone guri në katin e sipërm me restorante e tarraca me pamje nga malet e Himarës.',
      },
      'hotel-platinium': {
        type: 'Hotel me plazh privat',
        description:
          'Hotel buzë detit në Dhërmi me ballkone të bardha me perde, plazh privat me shezlongë e çadra, kabina pergolash prej druri dhe mure mbajtëse guri që lidhin hotelin me bregun.',
      },
      'residence-potam': {
        type: 'Pallat banimi',
        description:
          'Pallat banimi 5-katësh me ballkone të dala me parmakë xhami, tenda dielli, grila rrotulluese të errëta dhe parkim nëntokësor me rampë hyrëse, i rrethuar nga hapësira të gjelbra.',
      },
      'south-waves-residence': {
        type: 'Kullë banimi',
        description:
          'Kompleks banimi 10-katësh me fasadë të valëzuar nga ballkonet e bardha në formë dallge, veshje druri në tavane, krah të dytë me ballkone në kënd dhe hapësira të gjelbra me pemë mështekne rreth hyrjes.',
      },
      'azora-beach-hotel': {
        type: 'Hotel buzë detit',
        description:
          'Hotel 6-katësh buzë detit me ballkone të vazhdueshme me parmakë xhami, kulla cilindrike në fasadë, bazament guri natyral në katin përdhe dhe plazh privat me shezlongë e çadra përpara hyrjes.',
      },
    },
  },

  locations: {
    label: 'Zyrat',
    title: 'Ku të na gjeni',
    intro: 'Ju mirëpresim në zyrë për të diskutuar projektin tuaj. Për çdo pyetje, na shkruani në email.',
    directions: 'Udhëzime',
    call: 'Telefono',
    openInMaps: 'Hap në Google Maps',
    mapTitle: (name) => `Harta — ${name}`,
    open: 'Hapur',
    closed: 'Mbyllur',
    today: (day) => `Sot (${day}):`,
    count: (n) => (n === 1 ? '1 zyrë' : `${n} zyra`),
    standard: 'një standard cilësie',
    // Etiketa mbi emrin e çdo zyre, sipas id-së te data/offices.js
    offices: {
      'vlore-qendrore': { label: 'Zyra qendrore' },
    },
  },

  contact: {
    label: 'Kontakt',
    title: 'Le të ndërtojmë diçka së bashku',
    items: {
      phone: 'Telefon',
      email: 'Email',
      office: 'Zyra qendrore',
      hours: 'Orari',
    },
    openInMaps: (place) => `${place} — hap në Google Maps`,
    companyDetails: 'Të dhënat e shoqërisë',
    legal: {
      legalName: 'Emri ligjor',
      tradeName: 'Emri tregtar',
      administrator: 'Administrator',
    },
    viewMap: 'Shiko zyrat në hartë',
    form: {
      name: 'Emri dhe mbiemri *',
      namePlaceholder: 'p.sh. Arben Hoxha',
      email: 'Email *',
      emailPlaceholder: 'emri@kompania.al',
      phone: 'Telefoni',
      phonePlaceholder: '+355 6X XXX XXXX',
      service: 'Shërbimi',
      servicePlaceholder: 'Zgjidhni shërbimin',
      message: 'Mesazhi *',
      messagePlaceholder: 'Na tregoni shkurt për projektin tuaj: lloji, vendndodhja, afati…',
      consent: "Duke dërguar formularin, pranoni që t'ju kontaktojmë në lidhje me kërkesën tuaj.",
      submit: 'Dërgo mesazhin',
      sending: 'Duke dërguar…',
    },
    errors: {
      name: 'Ju lutem shkruani emrin.',
      email: 'Email-i nuk është i vlefshëm.',
      phone: 'Numri i telefonit nuk është i vlefshëm.',
      message: 'Mesazhi duhet të ketë të paktën 10 karaktere.',
    },
    status: {
      sentTitle: 'Faleminderit!',
      sentText: "Mesazhi juaj u dërgua me sukses. Një nga inxhinierët tanë do t'ju kontaktojë brenda 24 orëve.",
      mailTitle: 'Mesazhi është gati.',
      mailText: 'U hap aplikacioni juaj i email-it me mesazhin të plotësuar. Shtypni "Dërgo" për ta nisur.',
      errorTitle: 'Mesazhi nuk u dërgua.',
      errorText: 'Ndodhi një problem me lidhjen. Mund ta dërgoni të njëjtin mesazh nga aplikacioni juaj i email-it.',
      // "… [email] ose na telefononi në [telefoni]."
      mailFallback: 'Nuk u hap asgjë? Na shkruani direkt në ',
      errorFallback: 'Ose na shkruani direkt në ',
      orCall: 'ose na telefononi në',
      sendByEmail: 'Dërgo me email',
      backToForm: 'Kthehu te formulari',
      sendAnother: 'Dërgo një mesazh tjetër',
    },
  },

  // Email-et e parambushura (mailto:) që hapen te aplikacioni i vizitorit
  mail: {
    default: {
      subject: 'Kërkesë informacioni — KROX',
      body: 'Përshëndetje KROX,\n\nDëshiroj të marr më shumë informacion mbi…\n\nFaleminderit,\n',
    },
    request: {
      subject: (name, service) => `Kërkesë nga faqja${service ? ` — ${service}` : ''} · ${name}`,
      name: 'Emri',
      email: 'Email',
      phone: 'Telefoni',
      service: 'Shërbimi',
    },
  },

  faq: {
    label: 'Pyetje të shpeshta',
    title: 'Përgjigje të qarta, përpara se të nisim',
    intro: 'Për pyetje të tjera, na kontaktoni.',
    call: 'Telefononi',
    write: 'Na shkruani',
    // Sipas id-së te data/faq.js; `link` = teksti i lidhjes poshtë përgjigjes
    items: {
      services: {
        q: 'Çfarë shërbimesh ofron KROX?',
        a: 'Mbulojmë gjithë ciklin e një vepre: studime gjeologo-inxhinierike dhe urbanistike, projektim arkitektonik, strukturor dhe interieri, zbatim punimesh ndërtimi dhe rikonstruksione, si dhe mbikëqyrje e kolaudim punimesh. Klienti ka një partner të vetëm nga ideja deri te dorëzimi.',
        link: 'Shiko shërbimet',
      },
      areas: {
        q: 'Në cilat zona të Shqipërisë punoni?',
        a: `Zyra jonë qendrore ndodhet në ${company.city}, por marrim përsipër projekte në të gjithë Shqipërinë: rezidenciale, komerciale dhe industriale. Për çdo projekt jashtë qytetit organizojmë vizitë në terren përpara ofertës.`,
      },
      quote: {
        q: 'Si mund të marr një preventiv për projektin tim?',
        a: `Na telefononi në ${company.phone}, na shkruani në ${company.email} ose plotësoni formularin e kontaktit. Pas një takimi njohës dhe, kur nevojitet, një vizite në objekt, ju dërgojmë një preventiv të detajuar, me zëra të qartë dhe pa kosto të fshehura.`,
        link: 'Shko te formulari i kontaktit',
      },
      duration: {
        q: 'Sa zgjat realizimi i një projekti?',
        a: 'Afati varet nga lloji, madhësia dhe faza e projektit. Përpara fillimit hartojmë një grafik pune me afate të qarta për çdo fazë dhe gjatë punimeve ju informojmë rregullisht mbi ecurinë, që të dini gjithmonë ku ndodhet projekti juaj.',
      },
      careers: {
        q: 'Si mund të aplikoj për të punuar me KROX?',
        a: `Kërkojmë vazhdimisht inxhinierë, arkitektë, specialistë kantieri dhe punëtorë të kualifikuar. Dërgoni CV-në tuaj në ${company.email} ose na telefononi në ${company.phone} (${hours}).`,
        link: 'Faqja e karrierës',
      },
    },
  },

  footer: {
    description: `Projektim, zbatim punimesh ndërtimi, rikonstruksione, mbikëqyrje dhe kolaudim punimesh. Me qendër në ${company.city}, që nga ${company.founded}.`,
    navigation: 'Navigimi',
    services: 'Shërbimet',
    follow: 'Na ndiqni',
    rights: 'Të gjitha të drejtat e rezervuara.',
    administrator: 'Administrator',
    backToTop: 'Kthehu lart',
  },

  careers: {
    eyebrow: 'Karriera',
    // Rreshti i fundit shfaqet me gradient gold
    title: ['Ndërtoni të ardhmen', 'tuaj me', 'ekipin KROX'],
    lead: 'Kërkojmë inxhinierë, arkitektë, specialistë kantieri dhe punëtorë të kualifikuar që e duan punën e mirë. Na telefononi ose na dërgoni CV-në — çdo aplikim lexohet nga ekipi ynë.',
    quick: {
      phone: 'Telefon',
      email: 'Email për CV',
      hours: 'Orari',
    },
    imageAlt: 'Ekipi i KROX në kantier, mbi armaturën e një solete betonarmeje',
    openLabel: 'Aplikime të hapura',
    openText: 'Gjatë gjithë vitit, për zyrë dhe kantier.',
    benefits: {
      label: 'Pse KROX',
      title: 'Një vend pune ku siguria dhe cilësia vijnë të parat',
      intro: 'Çdo vepër që ndërtojmë mban emrin e njerëzve që e realizojnë. Prandaj investojmë tek ata.',
      items: {
        safety: {
          title: 'Siguria para së gjithash',
          text: 'Pajisje mbrojtëse personale, protokolle sigurie dhe mbikëqyrje e vazhdueshme në çdo kantier.',
        },
        contract: {
          title: 'Kontratë & pagë e rregullt',
          text: 'Marrëdhënie pune sipas Kodit të Punës, me sigurime shoqërore dhe pagesë në kohë.',
        },
        growth: {
          title: 'Rritje profesionale',
          text: 'Mësoni nga inxhinierë me përvojë dhe merrni përgjegjësi gjithnjë e më të mëdha.',
        },
        projects: {
          title: 'Projekte të larmishme',
          text: 'Objekte rezidenciale, komerciale dhe industriale — nga projektimi deri te kolaudimi.',
        },
      },
    },
    roles: {
      label: 'Profilet',
      title: 'Kë kërkojmë',
      intro: 'Zgjidhni profilin që ju përshtatet — butoni "Apliko" hap email-in me subjektin të plotësuar.',
      apply: 'Apliko',
      // team: etiketa e vogël mbi titull
      items: {
        'inxhinier-ndertimi': {
          team: 'Zyrë & kantier',
          title: 'Inxhinier ndërtimi / strukturist',
          text: 'Projektim strukturor, llogaritje, ndjekje e punimeve dhe kontroll cilësie në kantier.',
        },
        arkitekt: {
          team: 'Zyrë',
          title: 'Arkitekt / projektues',
          text: 'Projektim arkitektonik, interieri dhe peizazhi; përgatitje e dokumentacionit teknik.',
        },
        'pergjegjes-kantieri': {
          team: 'Kantier',
          title: 'Përgjegjës kantieri / kryepunëtor',
          text: 'Organizim i skuadrave, planifikim ditor i punimeve dhe zbatim i rregullave të sigurisë.',
        },
        topograf: {
          team: 'Terren',
          title: 'Topograf',
          text: 'Matje topografike, piketime dhe dixhitalizim i të dhënave për projektim dhe zbatim.',
        },
        'punetor-kualifikuar': {
          team: 'Kantier',
          title: 'Punëtorë të kualifikuar',
          text: 'Muratorë, hekurkthyes, karpentierë, suvatues, elektricistë dhe hidraulikë me përvojë.',
        },
        'operator-makinerish': {
          team: 'Kantier',
          title: 'Operator makinerish / shofer',
          text: 'Drejtim i eskavatorëve, fadromave, vinçave dhe mjeteve të rënda (me patentë përkatëse).',
        },
      },
    },
    spontaneous: {
      label: 'Aplikim spontan',
      text: 'Nuk e gjeni profilin tuaj? Na dërgoni CV-në — e mbajmë për pozicionet e ardhshme.',
      cta: 'Dërgo CV-në',
    },
    process: {
      label: 'Procesi',
      title: 'Nga aplikimi te kantieri, në katër hapa',
      steps: [
        { title: 'Dërgoni CV-në', text: `Në ${company.email}, ose na telefononi për të na treguar për përvojën tuaj.` },
        { title: 'Shqyrtimi', text: 'Ekipi ynë e lexon çdo aplikim dhe ju kontakton nëse profili përputhet.' },
        { title: 'Takimi', text: `Bisedë në zyrën tonë në ${company.city} ose në kantier, sipas pozicionit.` },
        { title: 'Fillimi', text: 'Prezantim me ekipin, trajnim sigurie dhe nisja e punës.' },
      ],
    },
    // Email-i i aplikimit për një pozicion (ose aplikim spontan)
    applyMail: {
      subject: (position) => `Aplikim pune — ${position}`,
      body: (position) =>
        `Përshëndetje KROX,\n\nDëshiroj të aplikoj për pozicionin: ${position}.\n\nEmri dhe mbiemri:\nTelefoni:\nVitet e përvojës:\n\nBashkëngjit CV-në time.\n\nFaleminderit,\n`,
    },
  },
}

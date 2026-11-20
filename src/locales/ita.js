import { company } from '../data/site'

/**
 * ITALISHT (regjistër formal me "voi", si "ju" në shqip; butonat në formën standarde të ueb-it: "Invia", "Candidati").
 * Të njëjtët çelësa si alb.js — çdo çelës që mungon këtu shfaqet automatikisht në shqip.
 * Të dhënat zyrtare (emri, administratori, telefoni, email-i) vijnë nga data/site.js dhe nuk përkthehen.
 */

const country = 'Albania'
const hours = 'Lunedì – Sabato · 09:00 – 17:00'

export default {
  meta: {
    titles: {
      home: 'KROX — Costruzioni e Realizzazione di Progetti',
      careers: 'Carriere — Lavora con KROX',
    },
    description: `${company.name} (${company.legalName}), ${company.city} — esecuzione di lavori edili, ristrutturazioni, progettazione architettonica, studi urbanistici e geologico-geotecnici, direzione lavori e collaudo.`,
  },

  common: {
    country,
    address: `${company.city}, ${country}`,
    hours,
    days: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
    copy: 'Copia',
    copied: 'Copiato',
    copyLabel: (label) => `Copia ${label.toLowerCase()}`,
    copiedLabel: (label) => `${label}: copiato negli appunti`,
  },

  nav: {
    links: {
      about: 'Chi siamo',
      services: 'Servizi',
      projects: 'Progetti',
      offices: 'Sedi',
      contact: 'Contatti',
      faq: 'Domande frequenti',
      careers: 'Carriere',
    },
    home: `${company.name} — pagina iniziale`,
    cta: 'Contattateci',
    sendCv: 'Invia il CV',
    openMenu: 'Apri il menu',
    closeMenu: 'Chiudi il menu',
    menu: 'Menu',
    contact: 'Contatti',
    language: 'Lingua',
  },

  intro: {
    skip: 'Salta intro',
  },

  hero: {
    eyebrow: 'Progettazione · Esecuzione · Direzione lavori',
    // Rreshti i parë ≤ ~20 shkronja (si origjinali shqip), që titulli të mbetet në 3 rreshta
    title: ['Dall’idea all’opera', 'con gli standard', 'più elevati'],
    lead: 'KROX progetta, realizza e dirige lavori edili con la massima qualità, precisione e sicurezza in cantiere, dal primo studio fino al collaudo.',
  },

  about: {
    label: 'Chi siamo',
    title: 'Dal progetto al collaudo, con responsabilità e precisione',
    intro: `(${company.legalName}) è una società fondata nel ${company.founded} con sede a ${company.city}. Seguiamo l’intero ciclo di vita di un’opera: studi geologico-geotecnici e urbanistici, progettazione architettonica e strutturale, esecuzione dei lavori e ristrutturazioni.`,
    body: 'La direzione lavori e il collaudo fanno parte del nostro servizio: qualità e sicurezza in cantiere vengono verificate in ogni fase. Il cliente ha un unico partner responsabile, dall’idea alla consegna.',
    founded: 'Fondata',
    imageAlt: 'Operai in cantiere su un solaio in cemento armato, tra le armature in acciaio',
    stats: {
      fields: 'Aree di servizio',
      safety: 'Standard di sicurezza',
      cycle: 'Dal progetto al collaudo',
    },
    values: {
      quality: {
        title: 'Qualità senza compromessi',
        text: 'Materiali certificati e controllo tecnico in ogni fase, dal progetto al collaudo.',
      },
      safety: {
        title: 'Sicurezza in cantiere',
        text: 'Rigorosi protocolli di sicurezza e supervisione costante dei lavori.',
      },
      deadlines: {
        title: 'Tempi rispettati',
        text: 'Pianificazione dettagliata e aggiornamenti periodici sull’avanzamento del progetto.',
      },
      transparency: {
        title: 'Trasparenza totale',
        text: 'Preventivi chiari, nessun costo nascosto e comunicazione aperta.',
      },
    },
  },

  services: {
    label: 'Servizi',
    title: 'Un unico partner per l’intero ciclo dell’opera',
    intro: 'Dagli studi geologici e dalla progettazione fino all’esecuzione, alla direzione lavori e al collaudo, con un unico team responsabile.',
    cta: 'Richiedi un preventivo',
    prev: 'Servizio precedente',
    next: 'Servizio successivo',
    items: {
      zbatim: {
        title: 'Costruzione e ristrutturazione',
        text: 'Esecuzione di lavori edili e ristrutturazioni di edifici di diverse tipologie, dalle fondazioni alle finiture.',
        points: ['Esecuzione di lavori edili', 'Ristrutturazioni edilizie', 'Diverse tipologie di edifici'],
      },
      arkitekture: {
        title: 'Progettazione architettonica e urbanistica',
        text: 'Progettazione architettonica, studi urbanistici e piani particolareggiati per uno sviluppo sostenibile.',
        points: ['Progettazione architettonica', 'Studi urbanistici', 'Piani particolareggiati'],
      },
      objekte: {
        title: 'Progettazione di edifici, interni e paesaggio',
        text: 'Progettazione di edifici di ogni categoria, comprese strutture ad alta complessità, interni e paesaggio.',
        points: ['Strutture in c.a., laterizio, blocchi e acciaio', 'Progettazione d’interni', 'Paesaggio e sistemazione del verde'],
      },
      konsulence: {
        title: 'Consulenza e stime',
        text: 'Consulenza su preventivi e computi metrici, stime immobiliari, rilievi topografici e digitalizzazione.',
        points: ['Preventivi e computi metrici', 'Stime immobiliari', 'Rilievi topografici e digitalizzazione'],
      },
      gjeologji: {
        title: 'Studi geologico-geotecnici',
        text: 'Studi e progettazione geologico-geotecnica e idrogeologica, base di ogni costruzione sicura.',
        points: ['Studi geologico-geotecnici', 'Studi idrogeologici', 'Valutazioni ambientali'],
      },
      mbikeqyrje: {
        title: 'Direzione lavori e collaudo',
        text: 'Direzione dei lavori in cantiere e collaudo secondo le norme tecniche e la legislazione vigente.',
        points: ['Direzione lavori', 'Collaudo delle opere', 'Controllo qualità'],
      },
    },
  },

  projects: {
    label: 'Portfolio',
    title: 'Progetti che parlano da sé',
    filter: 'Filtra',
    filterLabel: 'Filtra i progetti',
    categoriesLabel: 'Categorie',
    categories: {
      all: 'Tutti',
      rezidenciale: 'Residenziale',
      komerciale: 'Commerciale',
      industriale: 'Industriale',
    },
    cta: 'Parliamo del vostro progetto',
    prev: 'Progetto precedente',
    next: 'Progetto successivo',
    carouselLabel: 'Progetti — usate le frecce ← → o trascinate',
    drag: 'Trascina',
    viewDetails: (title) => `Vedi i dettagli: ${title}`,
    location: 'Località',
    year: 'Anno',
    similar: 'Progetto simile? Scriveteci',
    close: 'Chiudi',
    items: {
      'beyond-boutique-hotel': {
        type: 'Boutique hotel di lusso',
        description:
          'Boutique hotel di lusso di quattro piani fronte mare a Dhërmi, con facciata in pietra naturale, vetrate panoramiche a tutta altezza, piscine a sfioro su ogni ala e aree beach bar con terrazze in pietra a livello della spiaggia.',
      },
      'santorini-residence': {
        type: 'Complesso residenziale',
        description:
          'Complesso residenziale in stile cicladico composto da diversi blocchi di 3–4 piani, con facciate bianche ad archi, finestre e persiane blu e gialle, terrazze vista mare e una piscina comune nella corte centrale.',
      },
      'finca-alevra-residence': {
        type: 'Residenza mediterranea',
        description:
          'Residenza in stile mediterraneo con basamento in pietra naturale e archi al piano terra, facciate intonacate in tonalità calde, frangisole in legno, balconi con ringhiere metalliche e terrazze verdi con scalinate che seguono il terreno.',
      },
      'green-terrace-residence': {
        type: 'Complesso a terrazze',
        description:
          'Complesso residenziale con piani a gradoni che seguono il pendio della collina, ampie terrazze con fasce verdi, parapetti in vetro, facciata in pietra naturale e ingresso con piazzale di manovra tra pini e ulivi.',
      },
      'green-coast': {
        type: 'Resort residenziale',
        description:
          'Resort residenziale immerso nel bosco della collina sopra Palasë, con ville e blocchi a gradoni con tetti verdi, piscine private, una piscina centrale comune e strade interne che seguono le curve di livello del terreno.',
      },
      'galeria-by-teg': {
        type: 'Centro commerciale',
        description:
          'Centro commerciale con supermercato e negozi al piano terra dietro ampie vetrine, tetto verde praticabile e volumi in tonalità pietra al piano superiore con ristoranti e terrazze affacciate sulle montagne di Himarë.',
      },
      'hotel-platinium': {
        type: 'Hotel con spiaggia privata',
        description:
          'Hotel fronte mare a Dhërmi con balconi bianchi con tende, spiaggia privata con lettini e ombrelloni, cabine-pergolato in legno e muri di contenimento in pietra che collegano l’hotel alla riva.',
      },
      'residence-potam': {
        type: 'Edificio residenziale',
        description:
          'Edificio residenziale di cinque piani con balconi aggettanti e parapetti in vetro, tende da sole, tapparelle scure e parcheggio interrato con rampa d’accesso, circondato da aree verdi.',
      },
      'south-waves-residence': {
        type: 'Torre residenziale',
        description:
          'Complesso residenziale di dieci piani con facciata ondulata data dai balconi bianchi a forma d’onda, intradossi rivestiti in legno, una seconda ala con balconi angolari e aree verdi con betulle intorno all’ingresso.',
      },
      'azora-beach-hotel': {
        type: 'Hotel fronte mare',
        description:
          'Hotel fronte mare di sei piani con balconi continui e parapetti in vetro, torri cilindriche in facciata, basamento in pietra naturale al piano terra e spiaggia privata con lettini e ombrelloni davanti all’ingresso.',
      },
    },
  },

  locations: {
    label: 'Sedi',
    title: 'Dove trovarci',
    intro: 'Vi accogliamo nella nostra sede per parlare del vostro progetto. Per qualsiasi domanda, scriveteci via email.',
    directions: 'Indicazioni',
    call: 'Chiama',
    openInMaps: 'Apri in Google Maps',
    mapTitle: (name) => `Mappa — ${name}`,
    open: 'Aperto',
    closed: 'Chiuso',
    today: (day) => `Oggi (${day}):`,
    count: (n) => (n === 1 ? '1 sede' : `${n} sedi`),
    standard: 'un unico standard di qualità',
    offices: {
      'vlore-qendrore': { label: 'Sede centrale' },
    },
  },

  contact: {
    label: 'Contatti',
    title: 'Costruiamo qualcosa insieme',
    items: {
      phone: 'Telefono',
      email: 'Email',
      office: 'Sede centrale',
      hours: 'Orari',
    },
    openInMaps: (place) => `${place} — apri in Google Maps`,
    companyDetails: 'Dati societari',
    legal: {
      legalName: 'Ragione sociale',
      tradeName: 'Nome commerciale',
      administrator: 'Amministratore',
    },
    viewMap: 'Vedi le sedi sulla mappa',
    form: {
      name: 'Nome e cognome *',
      namePlaceholder: 'es. Mario Rossi',
      email: 'Email *',
      emailPlaceholder: 'nome@azienda.it',
      phone: 'Telefono',
      phonePlaceholder: '+39 3XX XXX XXXX',
      service: 'Servizio',
      servicePlaceholder: 'Selezionate un servizio',
      message: 'Messaggio *',
      messagePlaceholder: 'Descriveteci brevemente il vostro progetto: tipologia, località, tempistiche…',
      consent: 'Inviando il modulo, acconsentite a essere ricontattati in merito alla vostra richiesta.',
      submit: 'Invia messaggio',
      sending: 'Invio in corso…',
    },
    errors: {
      name: 'Inserite il vostro nome.',
      email: 'Indirizzo email non valido.',
      phone: 'Numero di telefono non valido.',
      message: 'Il messaggio deve contenere almeno 10 caratteri.',
    },
    status: {
      sentTitle: 'Grazie!',
      sentText: 'Il vostro messaggio è stato inviato con successo. Uno dei nostri ingegneri vi contatterà entro 24 ore.',
      mailTitle: 'Il messaggio è pronto.',
      mailText: 'Si è aperta la vostra app di posta con il messaggio già compilato. Premete «Invia» per spedirlo.',
      errorTitle: 'Il messaggio non è stato inviato.',
      errorText: 'Si è verificato un problema di connessione. Potete inviare lo stesso messaggio dalla vostra app di posta.',
      mailFallback: 'Non si è aperto nulla? Scriveteci direttamente a ',
      errorFallback: 'Oppure scriveteci direttamente a ',
      orCall: 'oppure chiamateci al',
      sendByEmail: 'Invia via email',
      backToForm: 'Torna al modulo',
      sendAnother: 'Invia un altro messaggio',
    },
  },

  mail: {
    default: {
      subject: 'Richiesta di informazioni — KROX',
      body: 'Buongiorno KROX,\n\ndesidero ricevere maggiori informazioni su…\n\nCordiali saluti,\n',
    },
    request: {
      subject: (name, service) => `Richiesta dal sito${service ? ` — ${service}` : ''} · ${name}`,
      name: 'Nome',
      email: 'Email',
      phone: 'Telefono',
      service: 'Servizio',
    },
  },

  faq: {
    label: 'Domande frequenti',
    title: 'Risposte chiare, prima di iniziare',
    intro: 'Per altre domande, contattateci.',
    call: 'Chiamateci',
    write: 'Scriveteci',
    items: {
      services: {
        q: 'Quali servizi offre KROX?',
        a: 'Seguiamo l’intero ciclo di vita di un’opera: studi geologico-geotecnici e urbanistici, progettazione architettonica, strutturale e d’interni, esecuzione di lavori edili e ristrutturazioni, oltre alla direzione lavori e al collaudo. Il cliente ha un unico partner dall’idea alla consegna.',
        link: 'Scopri i servizi',
      },
      areas: {
        q: 'In quali zone dell’Albania operate?',
        a: `La nostra sede centrale si trova a ${company.city}, ma realizziamo progetti residenziali, commerciali e industriali in tutta l’Albania. Per ogni progetto fuori città organizziamo un sopralluogo prima di formulare l’offerta.`,
      },
      quote: {
        q: 'Come posso ottenere un preventivo per il mio progetto?',
        a: `Chiamateci al ${company.phone}, scriveteci a ${company.email} oppure compilate il modulo di contatto. Dopo un primo incontro conoscitivo e, se necessario, un sopralluogo, vi invieremo un preventivo dettagliato, con voci chiare e senza costi nascosti.`,
        link: 'Vai al modulo di contatto',
      },
      duration: {
        q: 'Quanto tempo richiede la realizzazione di un progetto?',
        a: 'I tempi dipendono dalla tipologia, dalle dimensioni e dalla fase del progetto. Prima dell’avvio redigiamo un cronoprogramma con scadenze chiare per ogni fase e, durante i lavori, vi aggiorniamo regolarmente sull’avanzamento, così saprete sempre a che punto è il vostro progetto.',
      },
      careers: {
        q: 'Come posso candidarmi per lavorare con KROX?',
        a: `Cerchiamo costantemente ingegneri, architetti, tecnici di cantiere e operai qualificati. Inviate il vostro CV a ${company.email} oppure chiamateci al ${company.phone} (${hours}).`,
        link: 'Pagina carriere',
      },
    },
  },

  footer: {
    description: `Progettazione, esecuzione di lavori edili, ristrutturazioni, direzione lavori e collaudo. Con sede a ${company.city} dal ${company.founded}.`,
    navigation: 'Navigazione',
    services: 'Servizi',
    follow: 'Seguiteci',
    rights: 'Tutti i diritti riservati.',
    administrator: 'Amministratore',
    backToTop: 'Torna su',
  },

  careers: {
    eyebrow: 'Carriere',
    title: ['Costruite il vostro futuro', 'con il', 'team KROX'],
    lead: 'Cerchiamo ingegneri, architetti, tecnici di cantiere e operai qualificati che amano il lavoro ben fatto. Chiamateci o inviateci il vostro CV: ogni candidatura viene letta dal nostro team.',
    quick: {
      phone: 'Telefono',
      email: 'Email per i CV',
      hours: 'Orari',
    },
    imageAlt: 'Il team KROX in cantiere, sull’armatura di un solaio in cemento armato',
    openLabel: 'Candidature aperte',
    openText: 'Tutto l’anno, per ufficio e cantiere.',
    benefits: {
      label: 'Perché KROX',
      title: 'Un luogo di lavoro dove sicurezza e qualità vengono prima di tutto',
      intro: 'Ogni opera che costruiamo porta il nome delle persone che la realizzano. Per questo investiamo su di loro.',
      items: {
        safety: {
          title: 'La sicurezza prima di tutto',
          text: 'Dispositivi di protezione individuale, protocolli di sicurezza e supervisione costante in ogni cantiere.',
        },
        contract: {
          title: 'Contratto e retribuzione regolare',
          text: 'Rapporto di lavoro secondo il Codice del Lavoro albanese, con contributi previdenziali e stipendio puntuale.',
        },
        growth: {
          title: 'Crescita professionale',
          text: 'Imparate da ingegneri esperti e assumete responsabilità sempre maggiori.',
        },
        projects: {
          title: 'Progetti diversificati',
          text: 'Edifici residenziali, commerciali e industriali, dalla progettazione al collaudo.',
        },
      },
    },
    roles: {
      label: 'Profili',
      title: 'Chi cerchiamo',
      intro: 'Scegliete il profilo più adatto a voi: il pulsante «Candidati» apre un’email con l’oggetto già compilato.',
      apply: 'Candidati',
      items: {
        'inxhinier-ndertimi': {
          team: 'Ufficio e cantiere',
          title: 'Ingegnere civile / strutturista',
          text: 'Progettazione strutturale, calcoli, monitoraggio dei lavori e controllo qualità in cantiere.',
        },
        arkitekt: {
          team: 'Ufficio',
          title: 'Architetto / progettista',
          text: 'Progettazione architettonica, d’interni e del paesaggio; redazione della documentazione tecnica.',
        },
        'pergjegjes-kantieri': {
          team: 'Cantiere',
          title: 'Capocantiere / caposquadra',
          text: 'Organizzazione delle squadre, pianificazione giornaliera dei lavori e applicazione delle norme di sicurezza.',
        },
        topograf: {
          team: 'Campo',
          title: 'Topografo',
          text: 'Rilievi topografici, tracciamenti e digitalizzazione dei dati per la progettazione e l’esecuzione.',
        },
        'punetor-kualifikuar': {
          team: 'Cantiere',
          title: 'Operai qualificati',
          text: 'Muratori, ferraioli, carpentieri, intonacatori, elettricisti e idraulici con esperienza.',
        },
        'operator-makinerish': {
          team: 'Cantiere',
          title: 'Operatore macchine / autista',
          text: 'Conduzione di escavatori, pale gommate, gru e mezzi pesanti (con relativa patente).',
        },
      },
    },
    spontaneous: {
      label: 'Candidatura spontanea',
      text: 'Non trovate il vostro profilo? Inviateci il CV: lo terremo in considerazione per le posizioni future.',
      cta: 'Invia il CV',
    },
    process: {
      label: 'Il processo',
      title: 'Dalla candidatura al cantiere, in quattro passi',
      steps: [
        { title: 'Inviate il CV', text: `A ${company.email}, oppure chiamateci per raccontarci la vostra esperienza.` },
        { title: 'Valutazione', text: 'Il nostro team legge ogni candidatura e vi contatta se il profilo è in linea.' },
        { title: 'Colloquio', text: `Un incontro presso la nostra sede di ${company.city} o in cantiere, a seconda della posizione.` },
        { title: 'Inizio', text: 'Presentazione al team, formazione sulla sicurezza e avvio dell’attività.' },
      ],
    },
    applyMail: {
      subject: (position) => `Candidatura — ${position}`,
      body: (position) =>
        `Buongiorno KROX,\n\ndesidero candidarmi per la posizione: ${position}.\n\nNome e cognome:\nTelefono:\nAnni di esperienza:\n\nIn allegato il mio CV.\n\nCordiali saluti,\n`,
    },
  },
}

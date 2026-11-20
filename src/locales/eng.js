import { company } from '../data/site'

/**
 * ANGLISHT (drejtshkrim britanik: storey, centre, licence…).
 * Të njëjtët çelësa si alb.js — çdo çelës që mungon këtu shfaqet automatikisht në shqip.
 * Të dhënat zyrtare (emri, administratori, telefoni, email-i) vijnë nga data/site.js dhe nuk përkthehen.
 */

const country = 'Albania'
const hours = 'Monday – Saturday · 09:00 – 17:00'

export default {
  meta: {
    titles: {
      home: 'KROX — Construction & Project Delivery',
      careers: 'Careers — Work with KROX',
    },
    description: `${company.name} (${company.legalName}), ${company.city} — construction works, renovations, architectural design, urban planning and geotechnical studies, works supervision and final acceptance.`,
  },

  common: {
    country,
    address: `${company.city}, ${country}`,
    hours,
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    copy: 'Copy',
    copied: 'Copied',
    copyLabel: (label) => `Copy ${label.toLowerCase()}`,
    copiedLabel: (label) => `${label} copied to clipboard`,
  },

  nav: {
    links: {
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      offices: 'Offices',
      contact: 'Contact',
      faq: 'FAQ',
      careers: 'Careers',
    },
    home: `${company.name} — home`,
    cta: 'Contact us',
    sendCv: 'Send your CV',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menu: 'Menu',
    contact: 'Contact',
    language: 'Language',
  },

  intro: {
    skip: 'Skip intro',
  },

  hero: {
    eyebrow: 'Design · Construction · Supervision',
    // Rreshti i parë ≤ ~20 shkronja (si origjinali shqip), që titulli të mbetet në 3 rreshta
    title: ['From design to build', 'held to the', 'highest standards'],
    lead: 'KROX designs, builds and supervises construction works with uncompromising quality, precision and on-site safety — from the very first study to final acceptance.',
  },

  about: {
    label: 'About us',
    title: 'From design to final acceptance, with accountability and precision',
    intro: `(${company.legalName}) is a company founded in ${company.founded} and based in ${company.city}. We cover the entire life cycle of a project: engineering-geological and urban planning studies, architectural and structural design, construction works and renovations.`,
    body: 'Works supervision and final acceptance are part of our service, so quality and site safety are checked at every stage. Clients have a single, accountable partner from the initial idea to handover.',
    founded: 'Founded',
    imageAlt: 'Construction workers on a reinforced concrete slab, among the steel reinforcement',
    stats: {
      fields: 'Service areas',
      safety: 'Safety standards',
      cycle: 'From design to final acceptance',
    },
    values: {
      quality: {
        title: 'Uncompromising quality',
        text: 'Certified materials and technical inspection at every stage, from design to final acceptance.',
      },
      safety: {
        title: 'Site safety',
        text: 'Strict safety protocols and continuous supervision of the works.',
      },
      deadlines: {
        title: 'Deadlines met',
        text: 'Detailed scheduling and regular reporting on project progress.',
      },
      transparency: {
        title: 'Full transparency',
        text: 'Clear quotes, no hidden costs and open communication.',
      },
    },
  },

  services: {
    label: 'Services',
    title: 'One partner for the entire project life cycle',
    intro: 'From geological studies and design to construction, supervision and final acceptance of the works — with a single, accountable team.',
    cta: 'Request a quote',
    prev: 'Previous service',
    next: 'Next service',
    items: {
      zbatim: {
        title: 'Construction & renovation',
        text: 'Execution of construction works and building renovations across a wide range of typologies, from foundations to finishes.',
        points: ['Construction works', 'Building renovations', 'Wide range of building types'],
      },
      arkitekture: {
        title: 'Architectural design & urban planning',
        text: 'Architectural design, urban planning studies and detailed local plans for sustainable development.',
        points: ['Architectural design', 'Urban planning studies', 'Detailed local plans'],
      },
      objekte: {
        title: 'Building, interior & landscape design',
        text: 'Design of buildings in every category, including highly complex structures, interiors and landscapes.',
        points: ['RC, brick, concrete block & steel structures', 'Interior design', 'Landscaping & green spaces'],
      },
      konsulence: {
        title: 'Consulting & valuations',
        text: 'Cost estimating consultancy, real estate valuation, topographic surveying and digitisation.',
        points: ['Cost estimating consultancy', 'Real estate valuation', 'Surveying & digitisation'],
      },
      gjeologji: {
        title: 'Geotechnical studies',
        text: 'Engineering-geological and hydrogeological studies and design — the foundation of every safe building.',
        points: ['Engineering-geological studies', 'Hydrogeological studies', 'Environmental assessments'],
      },
      mbikeqyrje: {
        title: 'Supervision & final acceptance',
        text: 'On-site supervision of works and final acceptance testing in line with technical standards and current legislation.',
        points: ['Works supervision', 'Final acceptance testing', 'Quality control'],
      },
    },
  },

  projects: {
    label: 'Portfolio',
    title: 'Projects that speak for themselves',
    filter: 'Filter',
    filterLabel: 'Filter projects',
    categoriesLabel: 'Categories',
    categories: {
      all: 'All',
      rezidenciale: 'Residential',
      komerciale: 'Commercial',
      industriale: 'Industrial',
    },
    cta: 'Discuss your project',
    prev: 'Previous project',
    next: 'Next project',
    carouselLabel: 'Projects — use the ← → arrow keys or drag',
    drag: 'Drag',
    viewDetails: (title) => `View details: ${title}`,
    location: 'Location',
    year: 'Year',
    similar: 'Similar project? Get in touch',
    close: 'Close',
    items: {
      'beyond-boutique-hotel': {
        type: 'Luxury boutique hotel',
        description:
          'A four-storey luxury boutique hotel facing the sea in Dhërmi, with a natural stone façade, floor-to-ceiling panoramic glazing, infinity pools on every wing and beach-bar areas with stone terraces at beach level.',
      },
      'santorini-residence': {
        type: 'Residential complex',
        description:
          'A Cycladic-style residential complex of several three- to four-storey blocks, with white arched façades, blue and yellow windows and shutters, sea-view terraces and a shared pool in the central courtyard.',
      },
      'finca-alevra-residence': {
        type: 'Mediterranean residence',
        description:
          'A Mediterranean-style residence with a natural stone base and arches on the ground floor, warm-toned rendered façades, timber louvres, balconies with metal railings and landscaped terraces with steps that follow the terrain.',
      },
      'green-terrace-residence': {
        type: 'Terraced complex',
        description:
          'A residential complex with stepped floors following the slope of the hill, wide terraces with planted strips, glass balustrades, a natural stone façade and an entrance with a turning circle among pines and olive trees.',
      },
      'green-coast': {
        type: 'Residential resort',
        description:
          'A residential resort set into the hillside forest above Palasë, with villas and stepped blocks under green roofs, private pools, a shared central pool and internal roads that follow the contours of the land.',
      },
      'galeria-by-teg': {
        type: 'Shopping centre',
        description:
          'A shopping centre with a supermarket and shops behind glass shopfronts on the ground floor, an accessible green roof and stone-toned volumes on the upper floor housing restaurants and terraces overlooking the Himarë mountains.',
      },
      'hotel-platinium': {
        type: 'Hotel with private beach',
        description:
          'A seafront hotel in Dhërmi with white curtained balconies, a private beach with sunbeds and umbrellas, timber pergola cabanas and stone retaining walls connecting the hotel to the shore.',
      },
      'residence-potam': {
        type: 'Apartment building',
        description:
          'A five-storey apartment building with projecting balconies and glass balustrades, sun awnings, dark roller shutters and underground parking with an access ramp, surrounded by green spaces.',
      },
      'south-waves-residence': {
        type: 'Residential tower',
        description:
          'A ten-storey residential complex with an undulating façade formed by white wave-shaped balconies, timber-clad soffits, a second wing with angled balconies and green spaces with birch trees around the entrance.',
      },
      'azora-beach-hotel': {
        type: 'Seafront hotel',
        description:
          'A six-storey seafront hotel with continuous balconies and glass balustrades, cylindrical towers on the façade, a natural stone base on the ground floor and a private beach with sunbeds and umbrellas in front of the entrance.',
      },
    },
  },

  locations: {
    label: 'Offices',
    title: 'Where to find us',
    intro: 'We welcome you to our office to discuss your project. For any questions, send us an email.',
    directions: 'Directions',
    call: 'Call',
    openInMaps: 'Open in Google Maps',
    mapTitle: (name) => `Map — ${name}`,
    open: 'Open',
    closed: 'Closed',
    today: (day) => `Today (${day}):`,
    count: (n) => (n === 1 ? '1 office' : `${n} offices`),
    standard: 'one standard of quality',
    offices: {
      'vlore-qendrore': { label: 'Head office' },
    },
  },

  contact: {
    label: 'Contact',
    title: 'Let’s build something together',
    items: {
      phone: 'Phone',
      email: 'Email',
      office: 'Head office',
      hours: 'Opening hours',
    },
    openInMaps: (place) => `${place} — open in Google Maps`,
    companyDetails: 'Company details',
    legal: {
      legalName: 'Legal name',
      tradeName: 'Trade name',
      administrator: 'Administrator',
    },
    viewMap: 'View our offices on the map',
    form: {
      name: 'Full name *',
      namePlaceholder: 'e.g. John Smith',
      email: 'Email *',
      emailPlaceholder: 'name@company.com',
      phone: 'Phone',
      phonePlaceholder: '+355 6X XXX XXXX',
      service: 'Service',
      servicePlaceholder: 'Select a service',
      message: 'Message *',
      messagePlaceholder: 'Tell us briefly about your project: type, location, timeline…',
      consent: 'By submitting this form, you agree to be contacted regarding your enquiry.',
      submit: 'Send message',
      sending: 'Sending…',
    },
    errors: {
      name: 'Please enter your name.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.',
      message: 'Your message must be at least 10 characters long.',
    },
    status: {
      sentTitle: 'Thank you!',
      sentText: 'Your message has been sent successfully. One of our engineers will contact you within 24 hours.',
      mailTitle: 'Your message is ready.',
      mailText: 'Your email app has opened with the message pre-filled. Press “Send” to deliver it.',
      errorTitle: 'Your message was not sent.',
      errorText: 'There was a connection problem. You can send the same message from your email app.',
      mailFallback: 'Nothing opened? Write to us directly at ',
      errorFallback: 'Or write to us directly at ',
      orCall: 'or call us on',
      sendByEmail: 'Send by email',
      backToForm: 'Back to the form',
      sendAnother: 'Send another message',
    },
  },

  mail: {
    default: {
      subject: 'Information request — KROX',
      body: 'Hello KROX,\n\nI would like to receive more information about…\n\nKind regards,\n',
    },
    request: {
      subject: (name, service) => `Website enquiry${service ? ` — ${service}` : ''} · ${name}`,
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      service: 'Service',
    },
  },

  faq: {
    label: 'Frequently asked questions',
    title: 'Clear answers before we begin',
    intro: 'For any other questions, get in touch.',
    call: 'Call us',
    write: 'Email us',
    items: {
      services: {
        q: 'What services does KROX offer?',
        a: 'We cover the entire life cycle of a project: engineering-geological and urban planning studies; architectural, structural and interior design; construction works and renovations; as well as works supervision and final acceptance. Clients have a single partner from the initial idea to handover.',
        link: 'View services',
      },
      areas: {
        q: 'Which areas of Albania do you work in?',
        a: `Our head office is in ${company.city}, but we take on residential, commercial and industrial projects throughout Albania. For any project outside the city, we arrange a site visit before submitting our quote.`,
      },
      quote: {
        q: 'How can I get a quote for my project?',
        a: `Call us on ${company.phone}, email us at ${company.email} or fill in the contact form. After an initial meeting and, where needed, a site visit, we will send you a detailed quote with clearly itemised costs and no hidden fees.`,
        link: 'Go to the contact form',
      },
      duration: {
        q: 'How long does a project take?',
        a: 'The timeline depends on the type, size and stage of the project. Before work begins, we draw up a programme with clear deadlines for each phase, and during construction we keep you regularly updated on progress, so you always know where your project stands.',
      },
      careers: {
        q: 'How can I apply to work with KROX?',
        a: `We are always looking for engineers, architects, site specialists and skilled workers. Send your CV to ${company.email} or call us on ${company.phone} (${hours}).`,
        link: 'Careers page',
      },
    },
  },

  footer: {
    description: `Design, construction works, renovations, works supervision and final acceptance. Based in ${company.city} since ${company.founded}.`,
    navigation: 'Navigation',
    services: 'Services',
    follow: 'Follow us',
    rights: 'All rights reserved.',
    administrator: 'Administrator',
    backToTop: 'Back to top',
  },

  careers: {
    eyebrow: 'Careers',
    title: ['Build your future', 'with the', 'KROX team'],
    lead: 'We are looking for engineers, architects, site specialists and skilled workers who take pride in quality work. Call us or send us your CV — every application is read by our team.',
    quick: {
      phone: 'Phone',
      email: 'Email for CVs',
      hours: 'Opening hours',
    },
    imageAlt: 'The KROX team on site, standing on the reinforcement of a reinforced concrete slab',
    openLabel: 'Applications open',
    openText: 'All year round, for office and site roles.',
    benefits: {
      label: 'Why KROX',
      title: 'A workplace where safety and quality come first',
      intro: 'Every project we build carries the name of the people who deliver it. That’s why we invest in them.',
      items: {
        safety: {
          title: 'Safety first',
          text: 'Personal protective equipment, safety protocols and continuous supervision on every site.',
        },
        contract: {
          title: 'Contract & regular pay',
          text: 'Employment under the Albanian Labour Code, with social security contributions and on-time pay.',
        },
        growth: {
          title: 'Professional growth',
          text: 'Learn from experienced engineers and take on ever-greater responsibility.',
        },
        projects: {
          title: 'Diverse projects',
          text: 'Residential, commercial and industrial buildings — from design to final acceptance.',
        },
      },
    },
    roles: {
      label: 'Positions',
      title: 'Who we’re looking for',
      intro: 'Choose the role that suits you — the “Apply” button opens an email with the subject already filled in.',
      apply: 'Apply',
      items: {
        'inxhinier-ndertimi': {
          team: 'Office & site',
          title: 'Civil / structural engineer',
          text: 'Structural design, calculations, monitoring of works and on-site quality control.',
        },
        arkitekt: {
          team: 'Office',
          title: 'Architect / designer',
          text: 'Architectural, interior and landscape design; preparation of technical documentation.',
        },
        'pergjegjes-kantieri': {
          team: 'Site',
          title: 'Site manager / foreman',
          text: 'Organising crews, daily planning of works and enforcing safety rules.',
        },
        topograf: {
          team: 'Field',
          title: 'Land surveyor',
          text: 'Topographic surveys, setting out and data digitisation for design and construction.',
        },
        'punetor-kualifikuar': {
          team: 'Site',
          title: 'Skilled tradespeople',
          text: 'Experienced masons, steel fixers, formwork carpenters, plasterers, electricians and plumbers.',
        },
        'operator-makinerish': {
          team: 'Site',
          title: 'Plant operator / driver',
          text: 'Operating excavators, wheel loaders, cranes and heavy vehicles (with the relevant licence).',
        },
      },
    },
    spontaneous: {
      label: 'Open application',
      text: 'Can’t find your role? Send us your CV — we’ll keep it on file for future openings.',
      cta: 'Send your CV',
    },
    process: {
      label: 'Process',
      title: 'From application to site, in four steps',
      steps: [
        { title: 'Send your CV', text: `To ${company.email}, or call us to tell us about your experience.` },
        { title: 'Review', text: 'Our team reads every application and contacts you if your profile is a match.' },
        { title: 'Interview', text: `A meeting at our office in ${company.city} or on site, depending on the role.` },
        { title: 'Onboarding', text: 'An introduction to the team, safety training and your first day on the job.' },
      ],
    },
    applyMail: {
      subject: (position) => `Job application — ${position}`,
      body: (position) =>
        `Hello KROX,\n\nI would like to apply for the position: ${position}.\n\nFull name:\nPhone:\nYears of experience:\n\nPlease find my CV attached.\n\nKind regards,\n`,
    },
  },
}

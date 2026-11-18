export const categories = [
  { id: 'all', label: 'Të gjitha' },
  { id: 'rezidenciale', label: 'Rezidenciale' },
  { id: 'komerciale', label: 'Komerciale' },
  { id: 'industriale', label: 'Industriale' },
]

export const categoryLabel = (id) => categories.find((c) => c.id === id)?.label ?? id

/**
 * category: 'rezidenciale' | 'komerciale' (përdoret nga filtrat)
 * type:     nëntitulli i shkurtër që shfaqet mbi emrin e projektit
 * image:    foto vertikale 4:5 (.webp) te /public/projektet — përputhet me formatin e kartës
 * full:     foto e plotë pa prerje (deri 2400px) për modalin; width/height ruajnë formatin pa layout shift
 */
export const projects = [
  {
    id: 'beyond-boutique-hotel',
    title: 'Beyond',
    category: 'komerciale',
    type: 'Hotel boutique luksoz',
    location: 'Dhërmi, Himarë',
    year: 2024,
    image: '/projektet/beyond.webp',
    full: { src: '/projektet/full/beyond.webp', width: 1280, height: 1600 },
    description:
      'Hotel boutique luksoz 4-katësh përballë detit në Dhërmi, me fasadë guri natyral, xhame panoramike nga dyshemeja deri në tavan, pishina infinity në çdo krah dhe ambiente beach-bar me terraca guri në nivelin e plazhit.',
  },
  {
    id: 'santorini-residence',
    title: 'Santorini Residence',
    category: 'rezidenciale',
    type: 'Kompleks rezidencial',
    location: 'Drymadhes, Himarë',
    year: '2023–2024',
    image: '/projektet/santorini.webp',
    full: { src: '/projektet/full/santorini.webp', width: 2390, height: 1792 },
    description:
      'Kompleks rezidencial në stilin kikladik me disa blloqe 3–4 katëshe, fasada të bardha me harqe, dritare e kanata në ngjyra blu dhe të verdha, tarraca me pamje nga deti dhe pishinë të përbashkët në oborrin qendror.',
  },
  {
    id: 'finca-alevra-residence',
    title: 'Finca Alevra Residence',
    category: 'rezidenciale',
    type: 'Rezidencë mesdhetare',
    location: 'Dhërmi, Himarë',
    year: 2026,
    image: '/projektet/finca-alevra.webp',
    full: { src: '/projektet/full/finca-alevra.webp', width: 2400, height: 1792 },
    description:
      'Rezidencë në stilin mesdhetar me bazament guri natyral dhe harqe në katin përdhe, fasada të suvatuara në tone të ngrohta, grila druri, ballkone me parmakë metalikë dhe tarraca të gjelbëruara me shkallë që ndjekin terrenin.',
  },
  {
    id: 'green-terrace-residence',
    title: 'Green Terrace Residence',
    category: 'rezidenciale',
    type: 'Kompleks me tarraca',
    location: 'Dhërmi, Himarë',
    year: 2026,
    image: '/projektet/green-terrace.webp',
    full: { src: '/projektet/full/green-terrace.webp', width: 2400, height: 1792 },
    description:
      'Kompleks rezidencial me kate të shkallëzuara që ndjekin pjerrësinë e kodrës, tarraca të gjera me fasha të gjelbra, parmakë xhami, fasadë guri natyral dhe hyrje me shesh qarkullimi mes pishave e ullinjve.',
  },
  {
    id: 'green-coast',
    title: 'Green Coast',
    category: 'rezidenciale',
    type: 'Resort rezidencial',
    location: 'Palasë, Himarë',
    year: 2026,
    image: '/projektet/green-coast.webp',
    full: { src: '/projektet/full/green-coast.webp', width: 2400, height: 1397 },
    description:
      'Resort rezidencial i integruar në pyllin e kodrës mbi Palasë, me vila e blloqe të shkallëzuara me çati të gjelbra, pishina private, pishinë qendrore të përbashkët dhe rrugë të brendshme që ndjekin konturet e terrenit.',
  },
  {
    id: 'galeria-by-teg',
    title: 'Galeria by TEG',
    category: 'komerciale',
    type: 'Qendër tregtare',
    location: 'Palasë, Himarë',
    year: '2023–2024',
    image: '/projektet/galeria-teg.webp',
    full: { src: '/projektet/full/galeria-teg.webp', width: 1670, height: 941 },
    description:
      'Qendër tregtare me supermarket dhe dyqane në katin përdhe pas vitrinave xhami, çati të gjelbër të shfrytëzueshme dhe volume në tone guri në katin e sipërm me restorante e tarraca me pamje nga malet e Himarës.',
  },
  {
    id: 'hotel-platinium',
    title: 'Hotel Platinium',
    category: 'komerciale',
    type: 'Hotel me plazh privat',
    location: 'Dhërmi, Himarë',
    year: 2024,
    image: '/projektet/platinium.webp',
    full: { src: '/projektet/full/platinium.webp', width: 1463, height: 1075 },
    description:
      'Hotel buzë detit në Dhërmi me ballkone të bardha me perde, plazh privat me shezlongë e çadra, kabina pergolash prej druri dhe mure mbajtëse guri që lidhin hotelin me bregun.',
  },
  {
    id: 'residence-potam',
    title: 'Residence Potam',
    category: 'rezidenciale',
    type: 'Pallat banimi',
    location: 'Himarë',
    year: 2023,
    image: '/projektet/potam.webp',
    full: { src: '/projektet/full/potam.webp', width: 1086, height: 1448 },
    description:
      'Pallat banimi 5-katësh me ballkone të dala me parmakë xhami, tenda dielli, grila rrotulluese të errëta dhe parkim nëntokësor me rampë hyrëse, i rrethuar nga hapësira të gjelbra.',
  },
  {
    id: 'south-waves-residence',
    title: 'South Waves Residence',
    category: 'rezidenciale',
    type: 'Kullë banimi',
    location: 'Vlorë',
    year: '2025–2026',
    image: '/projektet/south-waves.webp',
    full: { src: '/projektet/full/south-waves.webp', width: 2400, height: 1357 },
    description:
      'Kompleks banimi 10-katësh me fasadë të valëzuar nga ballkonet e bardha në formë dallge, veshje druri në tavane, krah të dytë me ballkone në kënd dhe hapësira të gjelbra me pemë mështekne rreth hyrjes.',
  },
  {
    id: 'azora-beach-hotel',
    title: 'Azora Beach Hotel',
    category: 'komerciale',
    type: 'Hotel buzë detit',
    location: 'Radhimë, Vlorë',
    year: 2025,
    image: '/projektet/azora.webp',
    full: { src: '/projektet/full/azora.webp', width: 1722, height: 913 },
    description:
      'Hotel 6-katësh buzë detit me ballkone të vazhdueshme me parmakë xhami, kulla cilindrike në fasadë, bazament guri natyral në katin përdhe dhe plazh privat me shezlongë e çadra përpara hyrjes.',
  },
  {
    id: 'rezidenca-liqeni', title: 'Rezidenca Liqeni', category: 'rezidenciale', type: 'Kompleks banimi', location: 'Tiranë', year: 2024, area: '12,400 m²', image: '/images/projects/rezidenca-liqeni.webp', description: 'Kompleks banimi me 3 kulla 9-katëshe, parkim nëntokësor dhe ambiente të gjelbra.',
  },
  {
    id: 'qendra-biznesi-adriatik', title: 'Qendra e Biznesit Adriatik', category: 'komerciale', type: 'Godinë zyrash', location: 'Durrës', year: 2023, area: '8,200 m²', image: '/images/projects/qendra-biznesi-adriatik.webp', description: 'Godinë zyrash me fasadë xhami strukturale dhe kate tregtare në nivelin përdhes.',
  },
  {
    id: 'hale-logjistike-vore', title: 'Hale Logjistike Vorë', category: 'industriale', type: 'Magazinë logjistike', location: 'Vorë', year: 2024, area: '15,000 m²', image: '/images/projects/hale-logjistike-vore.webp', description: 'Magazinë logjistike me strukturë metalike, rampa ngarkimi dhe sistem kundër zjarrit.',
  },
  {
    id: 'vila-dajti', title: 'Vila Dajti', category: 'rezidenciale', type: 'Vilë private', location: 'Tiranë', year: 2022, area: '640 m²', image: '/images/projects/vila-dajti.webp', description: 'Vilë private me strukturë b/a, xham panoramik dhe pishinë infinity.',
  },
  {
    id: 'qendra-tregtare-jug', title: 'Qendra Tregtare Jug', category: 'komerciale', type: 'Qendër tregtare', location: 'Vlorë', year: 2023, area: '21,000 m²', image: '/images/projects/qendra-tregtare-jug.webp', description: 'Qendër tregtare me 2 kate, food court dhe parkim për 400 automjete.',
  },
  {
    id: 'fabrika-elbasan', title: 'Fabrika e Përpunimit Elbasan', category: 'industriale', type: 'Objekt prodhimi', location: 'Elbasan', year: 2021, area: '9,600 m²', image: '/images/projects/fabrika-elbasan.webp', description: 'Objekt prodhimi me dysheme industriale, urë vinçi dhe zyra administrative.',
  },
  {
    id: 'kompleksi-park', title: 'Kompleksi Park', category: 'rezidenciale', type: 'Pallate banimi', location: 'Shkodër', year: 2021, area: '7,800 m²', image: '/images/projects/kompleksi-park.webp', description: 'Pallate banimi 6-katëshe me ambiente tregtare në katin përdhe.',
  },
  {
    id: 'hotel-bregdeti', title: 'Hotel Bregdeti', category: 'komerciale', type: 'Hotel 4-yjësh', location: 'Sarandë', year: 2022, area: '5,400 m²', image: '/images/projects/hotel-bregdeti.webp', description: 'Hotel 4-yjësh me 80 dhoma, restorant dhe spa pranë detit.',
  },
  {
    id: 'depo-frigoriferike-fier', title: 'Depo Frigoriferike Fier', category: 'industriale', type: 'Depo frigoriferike', location: 'Fier', year: 2023, area: '4,200 m²', image: '/images/projects/depo-frigoriferike-fier.webp', description: 'Depo frigoriferike me panele sandwich izoluese dhe zona me temperaturë të kontrolluar.',
  },
]

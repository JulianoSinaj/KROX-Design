import { placeholder } from './site'

export const categories = [
  { id: 'all', label: 'Të gjitha' },
  { id: 'rezidenciale', label: 'Rezidenciale' },
  { id: 'komerciale', label: 'Komerciale' },
  { id: 'industriale', label: 'Industriale' },
]

export const categoryLabel = (id) => categories.find((c) => c.id === id)?.label ?? id

// Foto vertikale 4:5 — përputhet me formatin e kartës në carousel
const img = (seed) => placeholder(seed, 1000, 1250)

/**
 * category: 'rezidenciale' | 'komerciale' | 'industriale' (përdoret nga filtrat)
 * type:     nëntitulli i shkurtër që shfaqet mbi emrin e projektit
 */
export const projects = [
  {
    id: 'rezidenca-liqeni',
    title: 'Rezidenca Liqeni',
    category: 'rezidenciale',
    type: 'Kompleks banimi',
    location: 'Tiranë',
    year: 2024,
    area: '12,400 m²',
    image: img('p1'),
    description: 'Kompleks banimi me 3 kulla 9-katëshe, parkim nëntokësor dhe ambiente të gjelbra.',
  },
  {
    id: 'qendra-biznesi-adriatik',
    title: 'Qendra e Biznesit Adriatik',
    category: 'komerciale',
    type: 'Godinë zyrash',
    location: 'Durrës',
    year: 2023,
    area: '8,200 m²',
    image: img('p2'),
    description: 'Godinë zyrash me fasadë xhami strukturale dhe kate tregtare në nivelin përdhes.',
  },
  {
    id: 'hale-logjistike-vore',
    title: 'Hale Logjistike Vorë',
    category: 'industriale',
    type: 'Magazinë logjistike',
    location: 'Vorë',
    year: 2024,
    area: '15,000 m²',
    image: img('p3'),
    description: 'Magazinë logjistike me strukturë metalike, rampa ngarkimi dhe sistem kundër zjarrit.',
  },
  {
    id: 'vila-dajti',
    title: 'Vila Dajti',
    category: 'rezidenciale',
    type: 'Vilë private',
    location: 'Tiranë',
    year: 2022,
    area: '640 m²',
    image: img('p4'),
    description: 'Vilë private me strukturë b/a, xham panoramik dhe pishinë infinity.',
  },
  {
    id: 'qendra-tregtare-jug',
    title: 'Qendra Tregtare Jug',
    category: 'komerciale',
    type: 'Qendër tregtare',
    location: 'Vlorë',
    year: 2023,
    area: '21,000 m²',
    image: img('p5'),
    description: 'Qendër tregtare me 2 kate, food court dhe parkim për 400 automjete.',
  },
  {
    id: 'fabrika-elbasan',
    title: 'Fabrika e Përpunimit Elbasan',
    category: 'industriale',
    type: 'Objekt prodhimi',
    location: 'Elbasan',
    year: 2021,
    area: '9,600 m²',
    image: img('p6'),
    description: 'Objekt prodhimi me dysheme industriale, urë vinçi dhe zyra administrative.',
  },
  {
    id: 'kompleksi-park',
    title: 'Kompleksi Park',
    category: 'rezidenciale',
    type: 'Pallate banimi',
    location: 'Shkodër',
    year: 2021,
    area: '7,800 m²',
    image: img('p7'),
    description: 'Pallate banimi 6-katëshe me ambiente tregtare në katin përdhe.',
  },
  {
    id: 'hotel-bregdeti',
    title: 'Hotel Bregdeti',
    category: 'komerciale',
    type: 'Hotel 4-yjësh',
    location: 'Sarandë',
    year: 2022,
    area: '5,400 m²',
    image: img('p8'),
    description: 'Hotel 4-yjësh me 80 dhoma, restorant dhe spa pranë detit.',
  },
  {
    id: 'depo-frigoriferike-fier',
    title: 'Depo Frigoriferike Fier',
    category: 'industriale',
    type: 'Depo frigoriferike',
    location: 'Fier',
    year: 2023,
    area: '4,200 m²',
    image: img('p9'),
    description: 'Depo frigoriferike me panele sandwich izoluese dhe zona me temperaturë të kontrolluar.',
  },
]

// Filtrat e portofolit, në rendin e shfaqjes. Emrat: locales/*.js → projects.categories[id]
export const categories = ['all', 'rezidenciale', 'komerciale', 'industriale']

/**
 * category: 'rezidenciale' | 'komerciale' (përdoret nga filtrat)
 * title / location: emra të përveçëm — të njëjtë në çdo gjuhë
 * image:    foto vertikale 4:5 (.webp) te /public/projektet — përputhet me formatin e kartës
 * full:     foto e plotë pa prerje (deri 2400px) për modalin; width/height ruajnë formatin pa layout shift
 * Nëntitulli (type) dhe përshkrimi: locales/*.js → projects.items[id]
 */
export const projects = [
  {
    id: 'beyond-boutique-hotel',
    title: 'Beyond',
    category: 'komerciale',
    location: 'Dhërmi, Himarë',
    year: 2024,
    image: '/projektet/beyond.webp',
    full: { src: '/projektet/full/beyond.webp', width: 1280, height: 1600 },
  },
  {
    id: 'santorini-residence',
    title: 'Santorini Residence',
    category: 'rezidenciale',
    location: 'Drymadhes, Himarë',
    year: '2023–2024',
    image: '/projektet/santorini.webp',
    full: { src: '/projektet/full/santorini.webp', width: 2390, height: 1792 },
  },
  {
    id: 'finca-alevra-residence',
    title: 'Finca Alevra Residence',
    category: 'rezidenciale',
    location: 'Dhërmi, Himarë',
    year: 2026,
    image: '/projektet/finca-alevra.webp',
    full: { src: '/projektet/full/finca-alevra.webp', width: 2400, height: 1792 },
  },
  {
    id: 'green-terrace-residence',
    title: 'Green Terrace Residence',
    category: 'rezidenciale',
    location: 'Dhërmi, Himarë',
    year: 2026,
    image: '/projektet/green-terrace.webp',
    full: { src: '/projektet/full/green-terrace.webp', width: 2400, height: 1792 },
  },
  {
    id: 'green-coast',
    title: 'Green Coast',
    category: 'rezidenciale',
    location: 'Palasë, Himarë',
    year: 2026,
    image: '/projektet/green-coast.webp',
    full: { src: '/projektet/full/green-coast.webp', width: 2400, height: 1397 },
  },
  {
    id: 'galeria-by-teg',
    title: 'Galeria by TEG',
    category: 'komerciale',
    location: 'Palasë, Himarë',
    year: '2023–2024',
    image: '/projektet/galeria-teg.webp',
    full: { src: '/projektet/full/galeria-teg.webp', width: 1670, height: 941 },
  },
  {
    id: 'hotel-platinium',
    title: 'Hotel Platinium',
    category: 'komerciale',
    location: 'Dhërmi, Himarë',
    year: 2024,
    image: '/projektet/platinium.webp',
    full: { src: '/projektet/full/platinium.webp', width: 1463, height: 1075 },
  },
  {
    id: 'residence-potam',
    title: 'Residence Potam',
    category: 'rezidenciale',
    location: 'Himarë',
    year: 2023,
    image: '/projektet/potam.webp',
    full: { src: '/projektet/full/potam.webp', width: 1086, height: 1448 },
  },
  {
    id: 'south-waves-residence',
    title: 'South Waves Residence',
    category: 'rezidenciale',
    location: 'Vlorë',
    year: '2025–2026',
    image: '/projektet/south-waves.webp',
    full: { src: '/projektet/full/south-waves.webp', width: 2400, height: 1357 },
  },
  {
    id: 'azora-beach-hotel',
    title: 'Azora Beach Hotel',
    category: 'komerciale',
    location: 'Radhimë, Vlorë',
    year: 2025,
    image: '/projektet/azora.webp',
    full: { src: '/projektet/full/azora.webp', width: 1722, height: 913 },
  },
]

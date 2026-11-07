/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E0F11',        // sfondi kryesor — e zezë grafit (alternativë: #141517)
        graphite: '#1C1E22',   // karta / sfonde seksionesh
        steel: '#26292E',      // sipërfaqe e ngritur
        bone: '#F5F5F2',       // teksti kryesor (off-white)
        mist: '#9A9DA3',       // teksti dytësor
        // Champagne — për shkrime, ikona, vija dhe detaje
        accent: {
          DEFAULT: '#C5B39E',
          light: '#D4C5B9',
        },
        // Gold — vetëm për elementët theksues të rëndësishëm (CTA, logo, filtri aktiv)
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#B8962E',
        },
        danger: '#E08A7E',     // mesazhet e gabimit në formular
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        site: '1320px',
      },
    },
  },
  plugins: [],
}

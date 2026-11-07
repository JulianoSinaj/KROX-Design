/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E0F11',        // sfondi kryesor — e zezë grafit (jo #000)
        onyx: '#141517',       // sfondi i kartave të portofolit
        graphite: '#1C1E22',   // karta dhe sipërfaqe — pak më e çelur se sfondi
        steel: '#26292E',      // sipërfaqe e ngritur / hover i kartave
        bone: '#F5F5F2',       // teksti kryesor (off-white)
        mist: '#9A9DA3',       // teksti dytësor
        // Champagne — shkrime të vogla, ikona, vija ndarëse dhe korniza (me opacity të ulët)
        accent: {
          DEFAULT: '#C5B39E',
          light: '#D4C5B9',
        },
        // Gold — vetëm aty ku duhet tërhequr vëmendja (CTA, logo, filtri aktiv)
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
      letterSpacing: {
        eyebrow: '0.32em',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(212,175,55,0.45), 0 18px 50px -18px rgba(212,175,55,0.45)',
        card: '0 30px 80px -40px rgba(0,0,0,0.8)',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.22, 1, 0.36, 1)',
        silk: 'cubic-bezier(0.45, 0, 0.15, 1)',
      },
      transitionDuration: {
        900: '900ms',
        1200: '1200ms',
        1600: '1600ms',
      },
      maxWidth: {
        site: '1400px',
      },
    },
  },
  plugins: [],
}

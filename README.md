<div align="center">

<img src="public/favicon.svg" alt="KROX logo" width="84" height="84" />

# KROX Design

**Projektim arkitektonik, inxhinierik dhe zbatim punimesh ndërtimi, me qendër në Vlorë, Shqipëri.**

Faqja zyrtare e **KROX Shpk**: një website premium me temë luxury dark, animacione 3D dhe scroll të butë inercial.

<br />

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-D4C5B9?style=for-the-badge&labelColor=0E0F11)](https://lenis.darkroom.engineering/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://krox-shpk.vercel.app/)

<br />

### [🌐 Live Demo](https://krox-shpk.vercel.app/) &nbsp;·&nbsp; [📦 Repository](https://github.com/JulianoSinaj/KROX-Design) &nbsp;·&nbsp; [🐛 Raporto një problem](https://github.com/JulianoSinaj/KROX-Design/issues)

</div>

<!--
  📸 Pamja paraprake: shtoni një screenshot te docs/preview.png dhe hiqni komentin më poshtë.
  ![KROX Design: pamje paraprake](docs/preview.png)
-->

---

## 📑 Përmbajtja

- [Rreth projektit](#-rreth-projektit)
- [Veçoritë kryesore](#-veçoritë-kryesore)
- [Teknologjitë](#-teknologjitë)
- [Sistemi vizual](#-sistemi-vizual)
- [Struktura e projektit](#-struktura-e-projektit)
- [Instalimi lokal](#-instalimi-lokal)
- [Variablat e mjedisit](#-variablat-e-mjedisit)
- [Përditësimi i përmbajtjes](#-përditësimi-i-përmbajtjes)
- [Deploy në Vercel](#-deploy-në-vercel)
- [Autori](#-autori)
- [Licenca](#-licenca)

---

## 🏢 Rreth projektit

**KROX Shpk** është kompani projektimi dhe ndërtimi me qendër në Vlorë. Ofron shërbime nga ideja e parë deri te kolaudimi i objektit. Ky website prezanton kompaninë, shërbimet dhe portofolin e saj me një estetikë minimaliste dhe arkitektonike: sfond grafit i errët, theksa në ngjyrë shampanjë dhe lëvizje të qeta e të peshuara.

**Shërbimet e prezantuara:**

| | Shërbimi |
|:-:|:--|
| 🏗️ | Zbatim & rikonstruksion |
| 📐 | Projektim arkitektonik & urbanistikë |
| 🛋️ | Projektim objektesh, interieri & peizazhi |
| 📊 | Konsulencë & vlerësime |
| 🪨 | Studime gjeologo-inxhinierike |
| ✅ | Mbikëqyrje & kolaudim |

---

## ✨ Veçoritë kryesore

### 📱 Dizajn 100% responsive
- Paraqitje e dedikuar për **mobile**, jo thjesht desktopi i ngushtuar.
- **Karusel horizontal** për *Shërbimet* dhe *Portofolin*, me swipe/drag me inerci, "snap" te karta më e afërt dhe butona navigimi.
- **Filtër me dropdown** për kategoritë e portofolit në mobile; në desktop shfaqet si tabs.
- Efektet hover aktivizohen vetëm në pajisje me mi/trackpad (`hoverOnlyWhenSupported`), kështu që në iOS nuk mbeten "të ngjitura" pas prekjes.

### 🖼️ Portofol interaktiv
- Filtrim sipas kategorive: **Të gjitha · Rezidenciale · Komerciale · Industriale**.
- Imazhet kalojnë **nga bardh e zi në ngjyrë të plotë** me zoom të lehtë kur kalon kursori sipër.
- **Modal me detaje** për çdo projekt (vendndodhja, viti, sipërfaqja), me scroll-in e faqes të bllokuar ndërkohë që modali është i hapur.

### 🎬 Animacione & mikro-ndërveprime
- **Lenis** për scroll të butë inercial në të gjithë faqen.
- **Framer Motion** për efekte reveal, tranzicione hover dhe hapësira 3D (`perspective`, `preserve-3d`).
- **Butona magnetikë** që ndjekin kursorin, **karta me tilt 3D** dhe **numërues të animuar** për statistikat.
- Respekton preferencën `prefers-reduced-motion` të përdoruesit (`MotionConfig reducedMotion="user"`).

### 📍 Zyrat & vendndodhja
- Hartë **Google Maps** e integruar, me stil të errët që përputhet me temën.
- Status **Hapur / Mbyllur** në kohë reale, i llogaritur nga orari i zyrës dhe i rifreskuar çdo minutë.
- Linke të drejtpërdrejta për **udhëzime** dhe hapje në aplikacionin Maps.

### ✉️ Kontakt & footer
- **Formular kontakti funksional** me validim: dërgon te një endpoint (p.sh. Formspree) ose, si alternativë, hap email-in e vizitorit me mesazhin të parambushur.
- Butona **telefoni / email** (`tel:` & `mailto:`) dhe kopjim në clipboard me një klik.
- **Footer modern** me watermark-un "KROX" në sfond, me efekt 3D të një flete vizatimi.

---

## 🧰 Teknologjitë

| Kategoria | Teknologjia | Përdorimi |
|:--|:--|:--|
| **Framework** | [React 18](https://react.dev/) | Ndërfaqja me komponentë |
| **Build tool** | [Vite 5](https://vitejs.dev/) | Dev server i shpejtë & build i optimizuar |
| **Stilimi** | [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS | Utility-first CSS, tema e personalizuar |
| **Animacionet** | [Framer Motion 11](https://www.framer.com/motion/) | Animacione 3D, reveal, hover, spring physics |
| **Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Scroll i butë inercial |
| **Ikonat** | [Lucide React](https://lucide.dev/) | Ikona SVG të lehta |
| **Hosting** | [Vercel](https://vercel.com/) | Deploy automatik nga GitHub |

---

## 🎨 Sistemi vizual

| Ngjyra | Hex | Roli |
|:-:|:--|:--|
| ![](https://placehold.co/18x18/0E0F11/0E0F11.png) | `#0E0F11` | **Ink**: sfondi kryesor (e zezë grafit) |
| ![](https://placehold.co/18x18/1C1E22/1C1E22.png) | `#1C1E22` | **Graphite**: karta dhe sipërfaqe |
| ![](https://placehold.co/18x18/D4C5B9/D4C5B9.png) | `#D4C5B9` | **Champagne**: shkrime të vogla, ikona, vija ndarëse |
| ![](https://placehold.co/18x18/D4AF37/D4AF37.png) | `#D4AF37` | **Gold**: CTA, logo, filtri aktiv |
| ![](https://placehold.co/18x18/F5F5F2/F5F5F2.png) | `#F5F5F2` | **Bone**: teksti kryesor |

**Tipografia:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) për titujt · [Inter](https://fonts.google.com/specimen/Inter) për tekstin.

---

## 📂 Struktura e projektit

```text
KROX-Design/
├── public/
│   ├── favicon.svg
│   └── images/                  # Imazhet e optimizuara (.webp)
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx       # Navigimi kryesor
│   │   │   └── Footer.jsx       # Footer-i me watermark
│   │   ├── projects/
│   │   │   ├── ProjectCard.jsx      # Karta: bardh e zi → ngjyrë
│   │   │   ├── ProjectCarousel.jsx  # Karuseli me swipe (mobile)
│   │   │   ├── ProjectGrid.jsx      # Grid-i (desktop)
│   │   │   └── ProjectModal.jsx     # Detajet e projektit
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Projects.jsx     # Portofoli + filtrat
│   │   │   ├── Locations.jsx    # Zyrat, harta, statusi Hapur/Mbyllur
│   │   │   └── Contact.jsx      # Formulari i kontaktit
│   │   └── ui/
│   │       ├── MagneticButton.jsx
│   │       ├── TiltCard.jsx
│   │       ├── Counter.jsx
│   │       ├── FadeImage.jsx
│   │       ├── SectionTitle.jsx
│   │       └── Logo.jsx
│   ├── data/                    # Përmbajtja e faqes (pa prekur komponentët)
│   │   ├── site.js              # Të dhënat e kompanisë, navigimi, statistikat
│   │   ├── services.js
│   │   ├── projects.js
│   │   ├── offices.js
│   │   └── contact.js           # Ndihmës për tel:, mailto:, Google Maps
│   ├── hooks/
│   │   ├── useLenis.js          # Smooth scroll global
│   │   └── useMediaQuery.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Instalimi lokal

### Parakushtet
- [Node.js](https://nodejs.org/) **v18** ose më i ri
- npm (vjen bashkë me Node.js)

### Hapat

```bash
# 1. Klononi repository-n
git clone https://github.com/JulianoSinaj/KROX-Design.git

# 2. Hyni në dosjen e projektit
cd KROX-Design

# 3. Instaloni varësitë
npm install

# 4. (Opsionale) Krijoni skedarin e mjedisit
cp .env.example .env

# 5. Nisni serverin e zhvillimit
npm run dev
```

Faqja hapet te **http://localhost:5173**.

### Skriptet

| Komanda | Përshkrimi |
|:--|:--|
| `npm run dev` | Nis serverin e zhvillimit me hot reload |
| `npm run build` | Krijon versionin e optimizuar në `dist/` |
| `npm run preview` | Shfaq lokalisht versionin e build-uar |

---

## 🔐 Variablat e mjedisit

| Variabla | E detyrueshme | Përshkrimi |
|:--|:-:|:--|
| `VITE_CONTACT_ENDPOINT` | ❌ | Endpoint që pranon `POST` JSON për formularin e kontaktit (p.sh. `https://formspree.io/f/xxxxxxxx`). |

> [!TIP]
> Pa këtë variabël, formulari vazhdon të funksionojë: hap aplikacionin e email-it të vizitorit me mesazhin të parambushur drejt adresës së kompanisë.

---

## 📝 Përditësimi i përmbajtjes

E gjithë përmbajtja ndodhet te `src/data/`, kështu që teksti, projektet dhe zyrat ndryshohen pa prekur komponentët:

| Çfarë doni të ndryshoni | Skedari |
|:--|:--|
| Emri, telefoni, email-i, rrjetet sociale, statistikat | `src/data/site.js` |
| Shërbimet | `src/data/services.js` |
| Projektet e portofolit dhe kategoritë | `src/data/projects.js` |
| Zyrat, adresat, koordinatat, orari | `src/data/offices.js` |

> [!NOTE]
> Disa imazhe të projekteve janë ende placeholder (`picsum.photos`). Për t'i zëvendësuar, vendosni fotot reale te `public/images/` dhe përditësoni `src/data/projects.js`.

---

## ▲ Deploy në Vercel

1. Importoni repository-n në [Vercel](https://vercel.com/new).
2. Vercel e njeh automatikisht si projekt **Vite**:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. (Opsionale) Shtoni `VITE_CONTACT_ENDPOINT` te **Settings → Environment Variables**.
4. Çdo `push` në degën `main` bën deploy automatik.

---

## 👨‍💻 Autori

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/JulianoSinaj">
        <img src="https://github.com/JulianoSinaj.png" width="96" alt="Juliano Sinaj" /><br />
        <b>Juliano Sinaj</b>
      </a>
      <br />
      <sub>Front-End Developer · Dizajn & Zhvillim</sub>
    </td>
  </tr>
</table>

[![GitHub](https://img.shields.io/badge/GitHub-JulianoSinaj-181717?style=flat-square&logo=github)](https://github.com/JulianoSinaj)

**Klienti:** [KROX Shpk](https://krox-shpk.vercel.app/), Vlorë, Shqipëri · [Instagram](https://www.instagram.com/kroxshpk/)

---

## 📄 Licenca

Kodi burimor shpërndahet nën licencën **MIT**. Shihni skedarin [`LICENSE`](LICENSE) për detajet.

> [!IMPORTANT]
> Emri **KROX**, logoja, fotografitë dhe përmbajtja e kompanisë janë pronë e **KROX Shpk** dhe **nuk** mbulohen nga licenca MIT. Ato nuk mund të ripërdoren pa leje.

---

<div align="center">

Ndërtuar me ❤️ nga **[Juliano Sinaj](https://github.com/JulianoSinaj)** në Shqipëri 🇦🇱

<sub>⭐ Nëse ju pëlqeu projekti, jepini një yll në GitHub!</sub>

</div>

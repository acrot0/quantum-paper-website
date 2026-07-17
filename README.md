# Quantum ML Paper Website

An interactive web platform for the paper **"RF Spectrogram Anomaly Detection with Quantum Kitchen Sinks"**.

## 🚀 Features

- Full paper content with MathJax/KaTeX support
- Responsive reading experience (desktop/tablet/mobile)
- Figure lightbox and code syntax highlighting
- Reading progress tracking
- Dark mode support

## 🛠️ Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v6
- KaTeX (math rendering)
- Prism.js (syntax highlighting)
- Playwright (E2E testing)
- Vitest (unit testing)

## 📦 Development

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## 🧪 Testing

```bash
npm run test
npm run test:ui
npm run test:coverage
```

## 📦 Build

```bash
npm run build
npm run preview
```

## 🚢 Deployment

### GitHub Pages (Recommended)

Push to `main` branch — GitHub Actions will build and deploy automatically.

After enabling GitHub Pages in repo settings (Source: GitHub Actions), the site will be available at:

```
https://<username>.github.io/quantum-paper-website/
```

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Manual build

```bash
npm run build
npm run preview
```

The `dist/` folder contains the static site ready for any static host.

## 📝 Content

Content files in `public/data/sections/*.md` and figures in `public/data/figures/`.

## 📜 License

© 2026 Quantum Machine Learning Research

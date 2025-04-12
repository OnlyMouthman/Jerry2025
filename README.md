<h1 align="center">🌍 Jerry2025</h1>
<p align="center">
  Vue 3 + Vite + TailwindCSS + Firebase project with login, layout, i18n and modular UI.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg">
  <img src="https://img.shields.io/badge/tailwind-v4-blue.svg">
  <img src="https://img.shields.io/badge/firebase-auth-orange.svg">
  <img src="https://img.shields.io/badge/pinia-store-yellow.svg">
</p>

---

## ✨ Features

- 🔐 Google Sign-in via Firebase Authentication
- 🌐 Language switcher with i18n (Traditional Chinese / English)
- ⚡️ Vite + Vue 3 + Composition API
- 🧩 Pinia-based user login state management
- 🎨 TailwindCSS v4 utility-first design
- 🧱 Reusable BaseLayout (Header + Sidebar + LanguageModal)
- 🧭 Three-column layout design in HomePage
- 💾 Persistent login via Firebase auth listener

---

## 📁 Project Structure

```
src/
├── components/          # Common UI components (Header, Sidebar, etc.)
├── layouts/             # BaseLayout.vue for page layout wrapper
├── views/               # Page views (HomePage, ManagePage)
├── stores/              # Pinia store (user state)
├── composables/         # Reusable logic (e.g. useFirebaseAuth)
├── locales/             # Language JSON files for i18n
├── firebase.js          # Firebase config
└── style.css            # TailwindCSS entry point
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
```

> 💡 Make sure your Firebase project config is set in `src/firebase.js`

---

## 🖼️ Layout Usage

Wrap pages with `BaseLayout.vue` to use shared layout and UI:

```vue
<template>
  <BaseLayout>
    <main class="flex">
      <!-- Your content here -->
    </main>
  </BaseLayout>
</template>
```

---

## 🌍 i18n Language Switcher

- Available languages: 中文 / English
- Change language via dropdown in header/sidebar

---

## 🧪 Build & Preview

```bash
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 📸 Screenshots

> (You can add screenshots of your layout and login interface here for demo)

---

## 📜 License

MIT License © 2025-present

---

Made with ❤️ by Jerry2025 Team
# StyleRecord Lite

A web application for beauty professionals to register clients, log services, and share visual histories via temporary links.

## 🚀 Live Demo

[GitHub Pages](https://aaronbarra040998.github.io/StyleRecordLite/)

## 📋 Features

- Client registration with phone validation (Numverify API)
- Full CRUD for clients (create, read, update, delete)
- Service logging (cut, color, treatment, etc.) with placeholder images (Lorem Picsum)
- Chronological service history per client
- Client‑side view (phone‑based access, read‑only)
- Temporary share links (24 h) for client profiles
- Real‑time client search with autocomplete
- Responsive design (mobile‑first)
- Progressive Web App ready (service worker via Workbox)
- Internationalization (English & Spanish)
- End‑to‑end testing with Cypress
- Unit testing with Vitest

## 🔑 External APIs

| API | Usage | Returned attributes |
|-----|-------|---------------------|
| [Numverify](https://numverify.com) | Phone number validation | `valid`, `country_code`, `country_name`, `location`, `carrier`, `line_type` |
| [Lorem Picsum](https://picsum.photos) | Before/after placeholder images | Random image URLs |

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+ modules)
- **Bundler:** Vite
- **Persistence:** IndexedDB (via `idb`) + localStorage
- **Testing:** Vitest (unit) & Cypress (e2e)
- **Code Quality:** ESLint + Prettier
- **Deployment:** GitHub Pages (via `docs/` folder)

## 📁 Project Structure

```
.
├── .eslintrc.json
├── .prettierrc
├── cypress.config.js
├── vite.config.js
├── vitest.config.js
├── package.json
├── README.md
├── cypress
│   ├── e2e
│   │   └── stylerecord.cy.js
├── public/
│   ├── images/
│   │   ├── imgHome.png
│   │   └── logit.ico
│   └── partials/
│       ├── footer.html
│       └── header.html
├── src/
│   ├── index.html
│   ├── .env.example
│   ├── css/
│   │   ├── style.css
│   │   └── variables.css
│   └── js/
│       ├── tests/
│       │   ├── storage.test.js
│       │   └── validators.test.js
│       ├── controllers/
│       │   ├── clientController.mjs
│       │   ├── homeController.mjs
│       │   ├── loginController.mjs
│       │   ├── professionalController.mjs
│       │   ├── registerController.mjs
│       │   ├── roleController.mjs
│       │   └── sharedController.mjs
│       ├── app.js
│       ├── auth.mjs
│       ├── countries.mjs
│       ├── db.mjs
│       ├── formBuilder.mjs
│       ├── i18n.mjs
│       ├── lightbox.mjs
│       ├── loremPicsum.mjs
│       ├── numverifyService.mjs
│       ├── router.mjs
│       ├── serviceManager.mjs
│       ├── shareProfile.mjs
│       ├── state.mjs
│       ├── storage.mjs
│       ├── toast.mjs
│       ├── ui.mjs
│       ├── utils.mjs
│       └── validators.mjs
└── docs/                # Production build output
```

## ⚙️ Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aaronbarra040998/StyleRecordLite.git
   cd StyleRecordLite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

1. Copy the example environment file:
   ```bash
   cp src/.env.example src/.env
   ```

2. Obtain a free API key from [Numverify](https://numverify.com).

3. Replace the placeholder in `src/.env`:
   ```
   VITE_NUMVERIFY_KEY=your_api_key_here
   ```

### Run Development Server

```bash
npm run start
```

Open http://localhost:5173 in your browser.

## 📦 Production Build

The build output is placed in the `docs/` folder, ready for GitHub Pages deployment.

```bash
npm run build
```

## 🧪 Testing

Unit tests (Vitest):
```bash
npm run test
```

## 🔒 Known Limitations

- **Local storage only** – No backend; data is not synced across devices.
- **Numverify API key exposed** – The key resides in the frontend bundle (acceptable for MVP).
- **Numverify free tier** – 100 requests/month. Manual validation is offered as fallback.
- **Temporary links** – Depend on the browser's localStorage where the token was generated. Not shareable across different devices unless the same browser data is available.

## 📝 License

Academic project – WDD 330.

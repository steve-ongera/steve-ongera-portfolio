# Steve Ongera — Portfolio Frontend (React + Vite)

## Setup

```bash
npm install
cp .env.example .env      # point VITE_API_BASE_URL at your Django backend
npm run dev
```

Runs at **http://localhost:5173**. Requires the Django backend running at
`http://127.0.0.1:8000` (see `../backend/README.md`).

## Structure

```
src/
  components/   Navbar, Hero, ProjectCard, PostCard, FeaturedPanel, Sidebar, Footer, SEO
  pages/        Home, About, Projects, ProjectDetail, Blog, BlogDetail, Contact, NotFound
  services/
    api.js      Axios client + all calls to the Django REST Framework backend
  styles/
    main.css    Global theme: Poppins font, emerald-green accent, pill buttons, cards
```

## SEO

- Per-page `<title>`, meta description, canonical URL, Open Graph & Twitter cards via
  `src/components/SEO.jsx` (react-helmet-async), populated from each page's own data.
- `index.html` ships a base title/description, Open Graph tags, and a `Person` JSON-LD
  block for Steve Ongera.
- `public/robots.txt` points crawlers at the Django-generated `sitemap.xml`
  (served at `/sitemap.xml` by the backend).
- Semantic HTML (`<header>`, `<main>`, `<article>`, `<aside>`, `<footer>`) throughout.

## Images

Every image is a placeholder Unsplash URL stored on the Django models — update them
in `/admin/` (or directly in the database) once real photos/screenshots are ready.

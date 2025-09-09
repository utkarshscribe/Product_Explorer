# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Setup Instructions

- Clone the repository:
```bash
git clone <your-repo-url>
cd product-explorer
```
- Install dependencies:
```bash
npm install
```

- Run the development server:
```bash
npm run dev
Open http://localhost:5173 in your browser.
```

- Build for production:
```bash
npm run build
```

- Preview the production build (optional):
```bash
npm run preview
```

## Tech Stack
- Framework: React (with Vite for rapid modern development)

- Language: JavaScript (ES6+)

- Styling: Tailwind CSS for utility-first, responsive design

- Animation: Framer Motion for React-based UI animation

- API: DummyJSON Products API

- Build Tools: PostCSS, Autoprefixer, Vite

## Features
- Fetch & Display:
    Loads products from the DummyJSON API and shows them as responsive, visually consistent product cards.

- Product Detail View:
    Clicking a product card opens a modal with detailed information and multiple images.

- Filtering:
    Filter products by category with a dropdown menu. Category slugs and UI text are cleanly mapped for precise API requests.

- Sorting:
    Sort products client-side by price (asc/desc) or title (A-Z/Z-A). Default sort is by title.

- Pagination:
    Easily page through products using simple, intuitive navigation.

- Loading & Error States:
    Loading is indicated with a center-aligned animated message and skeleton loaders. User-friendly error messages are shown on failure.

- Animations:
    Product cards animate in with staggered fade/slide-in, modals open smoothly, and cards provide subtle interaction feedback on hover—all powered by Framer Motion.

- Responsiveness:
    Grid and modals elegantly adapt to all device sizes from mobile to desktop.

## Design Decisions
- Component Structure:
    Each UI function (listing, card, detail modal, filtering, pagination) is a focused, reusable component, improving code readability and scalability.

- Styling:
    Tailwind CSS is used for clean, maintainable, and fully responsive layouts. Its utility classes accelerate styling and prevent CSS bloat.

- Animation:
    Framer Motion is chosen for rich, accessible React animations, making UI lively but never distracting.

- Data Fetching:
    Native fetch API is used for simplicity. All API endpoints are constructed with care (slug encoding, parameterizing limit/skip) to ensure accuracy and performance.

- Sorting Control:
    By default, all products are initially sorted by title for a user-friendly, stable order—realigning to user’s explicit sort preference if set.

- UX:
    Error and loading states are given visual prominence for transparency. Product card and modal design are inspired by modern e-commerce layouts, focusing on readability, whitespace, and accessibility.

## Third-party Libraries
- React: Core UI framework

- Vite: Fast, modern build tool

- Tailwind CSS: Responsive, utility-first styling

- Framer Motion: Declarative React animation

- PostCSS & Autoprefixer: For Tailwind and modern CSS compatibility

- DummyJSON API: Fake data for demonstration


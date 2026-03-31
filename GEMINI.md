# Gemini Project Context: Minimalist Portfolio Website

This project is a multi-page minimalist portfolio website, originally based on a Frontend Mentor premium challenge. It serves as a personal portfolio for Langhe Bogdan Leonard, a Frontend Developer.

## Project Overview

- **Type:** Static Multi-page Website
- **Tech Stack:** HTML5, CSS3, Vanilla JavaScript
- **Tools:** Prettier (formatting)
- **Architecture:**
  - Individual HTML files for each page (`index.html`, `portfolio.html`, `contact.html`, etc.).
  - Shared styles in `css/style.css`.
  - Shared interactivity in `js/main.js`.
  - Responsive design using CSS Media Queries and `<picture>` elements for art direction.

## Core Features

- **Responsive Layout:** Optimized for mobile, tablet, and desktop.
- **Navigation:** Mobile menu implemented using a CSS-only checkbox hack in `index.html`.
- **Smooth Scrolling:** Implemented via JavaScript for the "About Me" call-to-action.
- **Form Validation:** Client-side validation for the contact form in `js/main.js`.
- **SEO & Social:** Comprehensive meta tags for SEO, Open Graph, and Twitter Cards.

## Key Directories and Files

- `index.html`: Homepage with Hero, About, and Skills sections.
- `portfolio.html`: Overview of portfolio projects.
- `contact.html`: Contact form page.
- `css/style.css`: Main stylesheet containing all layout and component styles.
- `js/main.js`: Main JavaScript file handling smooth scroll and form validation.
- `images/`: Contains all visual assets, organized by page and device type.
  - `homepage/`, `portfolio/`, `detail/`: Page-specific images.
  - `icons/`: SVG icons for social links and navigation.

## Building and Running

### Development

This is a static site. You can run it by opening `index.html` in any web browser or using a local development server like `Live Server` in VS Code.

### Build Command

The project includes a simple build script to prepare a distribution folder:

```bash
npm run build
```

This script removes the existing `dist` folder, recreates it, and copies all CSS, JS, images, and HTML files into it.

### Formatting

The project uses Prettier for code formatting:

```bash
npx prettier --write .
```

## Development Conventions

- **HTML:** Use semantic tags (`<header>`, `<main>`, `<section>`, `<footer>`). Use the `<picture>` element for responsive images.
- **CSS:** Follow the existing BEM-like naming convention (e.g., `.btn-primary`, `.hero-content`). The stylesheet is organized by components and media queries.
- **JS:** Keep JavaScript lightweight and centered around DOM manipulation and validation. Use `DOMContentLoaded` for initialization.
- **Images:** Always provide `alt` text and use `loading="lazy"` for non-critical images. Use `@2x` versions for high-density displays where available.

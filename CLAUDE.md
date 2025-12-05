# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a minimalist portfolio website built with vanilla HTML, CSS, and JavaScript. It's a Frontend Mentor challenge showcasing a developer portfolio with responsive design and interactive elements.

## Tech Stack

- **HTML5**: Semantic markup with `<picture>` elements for responsive images
- **CSS3**: Custom properties (CSS variables), Grid, Flexbox, mobile-first responsive design
- **JavaScript**: Vanilla ES6+ for navigation and form validation
- **No build tools**: Static site, no bundler or compilation needed

## Development

### Running the Site

Open any HTML file directly in a browser:

```bash
# Using a simple server (recommended for testing)
python -m http.server 8000
# Or
npx serve .
```

Then navigate to `http://localhost:8000/index.html`

### File Structure

```
.
├── index.html           # Homepage with hero and about sections
├── portfolio.html       # Portfolio index showing all projects
├── contact.html         # Contact form
├── manage.html          # Project detail page (Manage)
├── bookmark.html        # Project detail page (Bookmark)
├── insure.html          # Project detail page (Insure)
├── fylo.html            # Project detail page (Fylo)
├── css/
│   └── style.css        # All styles in one file
├── js/
│   └── main.js          # Mobile navigation and form validation
└── images/
    ├── homepage/        # Hero and profile images (mobile/tablet/desktop)
    ├── portfolio/       # Portfolio thumbnails (mobile/tablet/desktop)
    ├── detail/          # Project detail images (mobile/tablet/desktop)
    └── icons/           # SVG icons
```

## Architecture Patterns

### Page Templates

The site uses three main page templates:

1. **Homepage** (`index.html`): Hero section + about section + CTA
2. **Portfolio Index** (`portfolio.html`): Grid of project cards with alternating layouts (`.project-card` and `.project-card.reverse`)
3. **Project Detail** (e.g., `manage.html`): Hero image + project intro + background + navigation between projects

All pages share:

- Common header/nav with hamburger menu
- Common footer with social links
- `.contact-cta` section before footer

### Responsive Images

All images use the `<picture>` element pattern with three breakpoints:

```html
<picture>
  <source media="(min-width: 1024px)" srcset="./images/.../desktop/...jpg" />
  <source media="(min-width: 768px)" srcset="./images/.../tablet/...jpg" />
  <img src="./images/.../mobile/...jpg" alt="..." />
</picture>
```

### CSS Architecture

CSS uses custom properties defined in `:root` for:

- Colors: `--cyan`, `--dark-blue`, `--grayish-dark-blue`, `--very-light-gray`, `--light-gray`, `--bright-red`
- Fonts: `--font-heading` (Ibarra Real Nova), `--font-body` (Public Sans)
- Spacing: `--spacing-sm` through `--spacing-xxl`
- Container: `--container-width`, `--container-padding`

All styles are in a single file (`css/style.css`) with no CSS preprocessor.

### JavaScript Functionality

Two main features in `js/main.js`:

1. **Mobile Navigation Toggle** (lines 1-17):
   - Toggles `.nav-links.open` class
   - Swaps hamburger/close icon
   - Updates `aria-expanded` attribute

2. **Contact Form Validation** (lines 19-86):
   - Client-side validation for name, email, message fields
   - Dynamic error messages (email shows "Please use a valid email address" for invalid format)
   - Clears errors on input
   - Uses `.error` class on `.form-group` parent element

## Common Tasks

### Adding a New Project

1. Create project detail page (e.g., `newproject.html`) by copying `manage.html`
2. Update hero image, title, description, and preview images
3. Add project card to `portfolio.html` with proper thumbnail images
4. Update navigation links in adjacent project pages (`.project-navigation`)
5. Ensure alternating layout: odd projects use `.project-card`, even use `.project-card.reverse`

### Modifying Styles

- Edit `css/style.css`
- Use existing CSS custom properties for consistency
- Mobile-first: base styles are mobile, use `@media (min-width: ...)` for tablet/desktop
- Breakpoints: 768px (tablet), 1024px (desktop)

### Form Behavior

The contact form (`contact.html`) currently shows an alert on successful validation. To implement actual submission:

- Modify the `if (isValid)` block in `js/main.js` (lines 66-70)
- Add fetch/XMLHttpRequest to submit data to backend
- The form has `novalidate` attribute to use custom validation

## Notes

- The footer logo uses an inline style filter to invert colors for white logo on dark background
- Social links (GitHub, Twitter, LinkedIn) point to `#` placeholder URLs
- Project "Visit Website" buttons also point to `#` placeholders
- All JavaScript is event-driven; no global state management needed

# Stackly — Investment Banking Website

A premium, production-quality static website for **Stackly Investment Banking**, built with pure HTML5, CSS3, and Vanilla JavaScript, enhanced with GSAP (scroll choreography) and AOS. No frameworks, no build step.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Landing page — cinematic hero, overlapping stat cards, trusted strip, services, about, insights, CTA |
| `about.html` | Vision, mission, values, and approach |
| `service.html` | Four detailed service presentations (M&A, Capital Advisory, Strategic Investments, Wealth Management) |
| `blog.html` | Insights landing with featured article, live search, and category filtering |
| `contact.html` | Contact form with client-side validation and success/error states |
| `login.html` | Investor Portal sign-in with role selection (client / admin / partner) and password toggle |
| `register.html` | Account creation with password strength meter and confirmation |
| `404.html` | Custom error page with history back-navigation |
| `dashboard.html` | Client dashboard — portfolio, activity, documents, notifications, settings |
| `admin-dashboard.html` | Administration interface — users, content, reports, settings |
| `seller-dashboard.html` | Partner dashboard — leads/referrals, activity, messages, settings |

## Structure

```text
├── *.html                  # 11 pages
├── css/
│   ├── style.css           # Design system + homepage + shared components
│   ├── animations.css      # Keyframes, reveal states
│   ├── responsive.css      # Breakpoints (1180 / 960 / 720 / 480)
│   ├── pages.css           # Inner pages, forms, auth, 404
│   └── dashboard.css       # All three dashboards
├── js/
│   ├── main.js             # AOS init, magnetic buttons, blog search/filter
│   ├── animations.js       # Preloader, GSAP hero timeline, ScrollTrigger reveals, counters
│   ├── navigation.js       # Header scroll state, mobile menu, active links
│   ├── forms.js            # Validation, password toggle/strength, demo redirects
│   └── dashboard.js        # Sidebar, panel switching, charts, notifications
├── img/                    # WebP assets (hero in 3 responsive sizes) + logo + favicon
├── svg/                    # Icon sprite + decorative graphics
└── README.md
```

## Running Locally

The site uses CDN links for GSAP/AOS and Google Fonts, so an internet connection is required for full animation fidelity.

```bash
# Recommended: serve over HTTP (SVG/fetch features require it)
cd stackly-investment-banking
python3 -m http.server 8080
# open http://localhost:8080
```

## Design System

- **Palette:** Midnight Forest `#101A18`, Deep Evergreen `#182723`, Muted Champagne `#C6B78B`, Soft Lime `#DFFF9B`, Warm Ivory `#F4F2EC`, Stone Grey `#9A9E98`
- **Typography:** Fraunces (editorial serif) + Inter (sans) via Google Fonts
- **Motion:** GSAP + ScrollTrigger reveals, counters, parallax; AOS as secondary system; full `prefers-reduced-motion` support

## Imagery & Content Notes

- All photography is **AI-generated original imagery** created for this project (no third-party licensing required), optimized to WebP (most assets < 100 KB).
- The official Stackly logo (`img/stackly-logo.webp`) is recolored to the brand lime `#DFFF9B` (matching the Investor Portal button) on a fully transparent background, with original proportions and alpha-channel edges preserved.
- All financial figures, brand names in the trusted strip, articles, and dashboard data are **clearly labeled illustrative placeholders**.
- Forms validate on the client only. Authentication, role authorization, email delivery, and dashboards are **not** connected to a backend — wire these up before production.

## Accessibility & Quality

- Semantic HTML5, skip links, ARIA labels, keyboard-operable menus and toggles
- Responsive at desktop, laptop, tablet, and mobile widths; no horizontal overflow
- Lazy-loaded below-the-fold imagery, preloaded hero, meaningful alt text

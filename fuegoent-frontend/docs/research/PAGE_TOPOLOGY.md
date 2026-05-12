# Page Topology — thisisfuegoent.com Clone

## Site Overview
Shopify-based nightclub/entertainment events site for FUEGO ENTERTAINMENT (Sacramento, CA).
Cloned as Next.js 16 + shadcn/ui + Tailwind v4 app.

## Global Layout
- Fixed header (z-50), transparent → black on scroll
- Dark mode only: black background (#000), white text
- Font: Bebas Neue (display/headings, var(--font-display)) + Inter (body, var(--font-body))
- Accent: orange (#ff4500 / orange-400)

## Pages & Sections

### / (Home)
1. Header (fixed overlay)
2. Hero Slideshow — full screen, 4 images, auto-play 5s
3. 21+ Weekly Events — 3-column grid of EventCards
4. 18+ Monthly Events — EventCards (Banda Nights + Upcoming Bailes placeholder)
5. Artist Events — full-width banner with image background + CTA
6. This Weekend's Lineup — 2-column ProductCard grid
7. Newsletter signup
8. Footer

### /collections (Event Lineup)
1. Header
2. Page heading "Event Lineup"
3. 3-column large EventCard grid (Archive, Deseo, Traviesa)
4. Get Tickets section with ProductCards
5. Newsletter + Footer

### /collections/archive-fridays
1. Header
2. Slideshow (5 images, wide aspect)
3. Event details: title, venue, location/time badges, Instagram link, Buy Tickets CTA
4. Upcoming Events ProductCards
5. Newsletter + Footer

### /collections/deseo-sundays
Same structure as archive-fridays. Venue: Mix Downtown, 1525 L St. Guestlist: https://sevn.ly/xopYAhg6

### /collections/traviesa-saturdays
Same structure. Venue: Mangos Nightclub, 1930 K St. Guestlist: https://sevn.ly/xPUfy15B

### /pages/booth-inquiry
1. Header
2. "Booth Inquiry" heading
3. Contact form: Name, Email*, Phone, Comment + "Send us a note" button
4. Newsletter + Footer

## Interaction Models
- Header: scroll-driven (transparent → black at 60px scroll)
- Slideshow: time-driven auto-play + click-driven prev/next arrows + dot navigation
- Mobile nav: click-driven full-screen overlay
- Forms: client-side state only (no backend)
- Hover states on EventCard, ProductCard, nav links, buttons

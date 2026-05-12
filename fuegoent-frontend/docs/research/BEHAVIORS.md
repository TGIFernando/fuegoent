# Behavior Bible — thisisfuegoent.com Clone

## Header
- **Scroll-triggered:** transparent → bg-black/95 + backdrop-blur + border-b at scrollY > 60px
- **Transition:** transition-all duration-300
- **Mobile menu:** full-screen overlay, fade in/out with conditional render

## Slideshow (Slideshow.tsx)
- **Auto-play:** interval 4000ms (event pages) / 5000ms (home hero)
- **Transition:** opacity-based fade, duration-700
- **Scale animation:** scale(1.03) → scale(1) on enter (via animate-slide-in keyframe)
- **Controls:** prev/next buttons + dot indicators

## EventCard
- **Hover:** image scale-105, transition duration-700
- **Overlay text:** gradient-overlay (bottom-to-top) reveals title, day, CTA arrow

## ProductCard
- **Hover:** scale-105 on image, "Buy Tickets" button slides up from bottom (opacity+translateY)
- **Transition:** duration-200/500

## Forms (Newsletter, Booth Inquiry)
- **Focus:** border-orange-500/50 on input focus
- **Submit:** client-side setState only, shows success message

## Nav Links
- **Active state:** text-orange-400 via pathname match
- **Hover:** text-orange-400, transition-colors

## Buttons (CTAs)
- **Hover:** bg-white → bg-orange-400 + text-white, transition duration-200

## Responsive
- Desktop: 1440px — 3-column event grid, horizontal nav
- Tablet: 768px — 2-column grid, some sections collapse
- Mobile: 390px — single column, hamburger menu, stacked layout

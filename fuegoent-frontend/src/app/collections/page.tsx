import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import EventCard from "@/components/EventCard";
import ProductCard from "@/components/ProductCard";

const collections = [
  {
    title: "Archive Fridays",
    subtitle: "Every Friday · 21+",
    day: "10pm – 1:30AM",
    ageLimit: "21+",
    image: "/images/collections/archive-fridays.webp",
    href: "/collections/archive-fridays",
  },
  {
    title: "Deseo Sundays",
    subtitle: "Every Sunday · 21+",
    day: "9:30pm – 1:30AM",
    ageLimit: "21+",
    image: "/images/collections/deseo-sundays.png",
    href: "/collections/deseo-sundays",
  },
  {
    title: "Traviesa Saturdays",
    subtitle: "Every Saturday · 21+",
    day: "9:30pm – 1:30AM",
    ageLimit: "21+",
    image: "/images/collections/traviesa-saturdays.jpg",
    href: "/collections/traviesa-saturdays",
  },
];

const products = [
  {
    id: "1",
    title: "18+ Banda Night",
    price: "$15.00 USD",
    image: "/images/products/banda-night.png",
    href: "/products/18-banda-night",
  },
  {
    id: "2",
    title: "Archive Fridays 5.8",
    price: "$10.00 USD",
    image: "/images/products/archive-fridays-58.png",
    href: "/products/archive-fridays-58",
  },
];

export default function CollectionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />

      {/* Page header */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-14 text-center px-4">
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl tracking-widest text-white">
          Event Lineup
        </h1>
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mt-3">
          Sacramento&apos;s premier nightlife events
        </p>
      </section>

      {/* Collections grid */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {collections.map((c) => (
              <EventCard key={c.href} {...c} size="large" />
            ))}
          </div>
        </div>
      </section>

      {/* Tickets section */}
      <section className="section-pad bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-widest text-white mb-2 text-center">
            Get Tickets
          </h2>
          <p className="text-white/40 text-xs tracking-widest text-center mb-10 uppercase">
            Secure your spot tonight
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <span className="text-white/30 text-xs tracking-widest uppercase">View all</span>
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
}

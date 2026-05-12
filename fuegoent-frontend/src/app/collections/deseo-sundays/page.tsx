import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import Slideshow from "@/components/Slideshow";
import ProductCard from "@/components/ProductCard";
import { InstagramIcon, MapPinIcon, ClockIcon } from "@/components/icons";

const slideshowImages = [
  { src: "/images/deseo/deseo-1.jpg", alt: "Deseo Sundays" },
  { src: "/images/deseo/deseo-2.jpg", alt: "Deseo Sundays" },
  { src: "/images/deseo/deseo-3.jpg", alt: "Deseo Sundays" },
  { src: "/images/deseo/deseo-4.jpg", alt: "Deseo Sundays" },
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

export default function DeseoSundaysPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />

      {/* Slideshow */}
      <div className="pt-16 md:pt-20">
        <Slideshow images={slideshowImages} aspectRatio="wide" autoPlayInterval={4000} />
      </div>

      {/* Event info */}
      <section className="section-pad">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-orange-400 text-xs tracking-[0.4em] uppercase mb-2">
            Mix Downtown
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl tracking-widest text-white mb-6">
            Deseo Sundays
          </h1>

          {/* Details badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="flex items-center gap-2 text-white/60 text-sm tracking-wide">
              <MapPinIcon size={14} className="text-orange-400" />
              1525 L St, Sacramento
            </span>
            <span className="flex items-center gap-2 text-white/60 text-sm tracking-wide">
              <ClockIcon size={14} className="text-orange-400" />
              21+ Every Sunday · 9:30pm – 1:30AM
            </span>
          </div>

          <p className="text-white/50 text-sm tracking-wide mb-6">
            Deseo Sunday Guestlist Link Down Below
          </p>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/deseo_sundays/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/50 text-sm tracking-wider hover:text-orange-400 transition-colors mb-10"
          >
            <InstagramIcon size={16} />
            @deseo_sundays
          </a>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://sevn.ly/xopYAhg6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-3.5 bg-white text-black text-sm font-semibold tracking-widest uppercase hover:bg-orange-400 hover:text-white transition-all duration-200"
            >
              Free Entry Guestlist
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Tickets */}
      <section className="section-pad bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-widest text-white mb-10 text-center">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
}

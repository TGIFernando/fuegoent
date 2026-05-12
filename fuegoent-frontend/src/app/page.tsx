import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import EventCard from "@/components/EventCard";
import ProductCard from "@/components/ProductCard";
import Slideshow from "@/components/Slideshow";

const weeklyEvents = [
  {
    title: "Archive Friday",
    subtitle: "Nights",
    day: "Every Friday",
    time: "10pm – 1:30AM",
    ageLimit: "21+",
    image: "/images/collections/archive-fridays.webp",
    href: "/collections/archive-fridays",
  },
  {
    title: "Traviesa Saturday",
    subtitle: "Nights",
    day: "Every Saturday",
    time: "9:30pm – 1:30AM",
    ageLimit: "21+",
    image: "/images/collections/traviesa-saturdays.jpg",
    href: "/collections/traviesa-saturdays",
  },
  {
    title: "Deseo Sunday",
    subtitle: "Nights",
    day: "Every Sunday",
    time: "9:30pm – 1:30AM",
    ageLimit: "21+",
    image: "/images/collections/deseo-sundays.png",
    href: "/collections/deseo-sundays",
  },
];

const slideshowImages = [
  { src: "/images/hero-main.jpg", alt: "Fuego Entertainment" },
  { src: "/images/events/event-1.jpg", alt: "Fuego Event" },
  { src: "/images/events/event-2.jpg", alt: "Fuego Event" },
  { src: "/images/events/event-3.webp", alt: "Fuego Event" },
];

const weekendProducts = [
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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />

      {/* Hero Slideshow */}
      <section className="relative">
        <Slideshow images={slideshowImages} aspectRatio="hero" autoPlayInterval={5000} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
          <p className="text-white/70 text-xs tracking-[0.4em] uppercase mb-3">
            Scroll for Event Lineup
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl tracking-widest text-white leading-none">
            21+ Weekly Events
          </h1>
        </div>
      </section>

      {/* Weekly Events */}
      <section className="section-pad bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-widest text-white mb-2 text-center">
            21+ Weekly Events
          </h2>
          <p className="text-white/40 text-xs tracking-widest text-center mb-10 uppercase">
            Sacramento&apos;s premier nightlife
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {weeklyEvents.map((event) => (
              <EventCard key={event.href} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Events */}
      <section className="pb-16 md:pb-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-widest text-white mb-2 text-center">
            18+ Monthly Events
          </h2>
          <p className="text-white/40 text-xs tracking-widest text-center mb-10 uppercase">
            All ages welcome
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            <EventCard
              title="18+ Banda Nights"
              subtitle="Monthly"
              ageLimit="18+"
              image="/images/products/banda-night.png"
              href="/collections"
            />
            <div className="relative overflow-hidden bg-[#111] rounded-sm h-[45vh] md:h-[50vh] flex flex-col items-center justify-center border border-white/10">
              <div className="text-center px-6">
                <p className="font-[family-name:var(--font-display)] text-3xl tracking-widest text-white mb-2">
                  Upcoming Bailes
                </p>
                <p className="text-white/40 text-xs tracking-wider uppercase">Stay tuned</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Events banner */}
      <section className="relative overflow-hidden h-[40vh] md:h-[50vh]">
        <Image
          src="/images/events/event-2.jpg"
          alt="Artist Events"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 p-6">
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl tracking-widest text-white mb-6">
            Artist Events
          </h2>
          <Link
            href="/collections"
            className="text-xs tracking-[0.3em] uppercase text-white/80 border border-white/30 px-8 py-3 hover:bg-white hover:text-black transition-all duration-200"
          >
            See More
          </Link>
        </div>
      </section>

      {/* This Weekend&apos;s Lineup */}
      <section className="section-pad bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-widest text-white mb-2 text-center">
            This Weekend&apos;s Lineup
          </h2>
          <p className="text-white/40 text-xs tracking-widest text-center mb-10 uppercase">
            Get your tickets now
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl mx-auto">
            {weekendProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
    </div>
  );
}

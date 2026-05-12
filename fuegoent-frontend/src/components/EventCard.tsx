import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  day?: string;
  time?: string;
  ageLimit?: string;
  size?: "default" | "large";
}

export default function EventCard({
  title,
  subtitle,
  image,
  href,
  day,
  time,
  ageLimit,
  size = "default",
}: EventCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden bg-[#111] rounded-sm"
    >
      <div
        className={`relative overflow-hidden ${
          size === "large" ? "h-[55vh] md:h-[65vh]" : "h-[45vh] md:h-[50vh]"
        }`}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 gradient-overlay" />

        {/* Age badge */}
        {ageLimit && (
          <span className="absolute top-4 left-4 text-xs font-semibold tracking-widest uppercase bg-orange-500/90 text-white px-2 py-1 rounded-sm">
            {ageLimit}
          </span>
        )}

        {/* Text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-widest text-white leading-none mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-white/70 text-xs tracking-wider uppercase">{subtitle}</p>
          )}
          {(day || time) && (
            <p className="text-orange-400 text-xs tracking-wider uppercase mt-1">
              {[day, time].filter(Boolean).join(" · ")}
            </p>
          )}
          <div className="mt-3 flex items-center gap-1 text-white/50 text-xs tracking-widest uppercase group-hover:text-orange-400 transition-colors">
            View Details
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

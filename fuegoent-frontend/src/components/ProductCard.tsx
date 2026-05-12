import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  href: string;
}

export default function ProductCard({ title, price, image, href }: ProductCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-sm bg-[#111] aspect-square mb-3">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <button className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-5 py-2 bg-white text-black text-xs font-semibold tracking-widest uppercase translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200 hover:bg-orange-400 hover:text-white">
          Buy Tickets
        </button>
      </div>
      <div>
        <h4 className="text-sm tracking-wide text-white/90 group-hover:text-white transition-colors">
          {title}
        </h4>
        <p className="text-xs text-white/50 mt-0.5">{price}</p>
      </div>
    </Link>
  );
}

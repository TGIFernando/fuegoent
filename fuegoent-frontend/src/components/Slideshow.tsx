"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

interface SlideshowProps {
  images: { src: string; alt: string }[];
  autoPlayInterval?: number;
  aspectRatio?: "hero" | "wide" | "square";
}

export default function Slideshow({
  images,
  autoPlayInterval = 4000,
  aspectRatio = "hero",
}: SlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const heightClass = {
    hero: "h-[70vh] md:h-[85vh]",
    wide: "h-[50vh] md:h-[60vh]",
    square: "h-[60vw] max-h-[600px]",
  }[aspectRatio];

  const go = useCallback(
    (next: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent((next + images.length) % images.length);
      setTimeout(() => setAnimating(false), 700);
    },
    [animating, images.length]
  );

  useEffect(() => {
    const t = setInterval(() => go(current + 1), autoPlayInterval);
    return () => clearInterval(t);
  }, [current, go, autoPlayInterval]);

  if (!images.length) return null;

  return (
    <div className={`relative w-full ${heightClass} overflow-hidden bg-black`}>
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 gradient-overlay-center" />
        </div>
      ))}

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => go(current - 1)}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/70 border border-white/20 rounded-full text-white transition-all hover:scale-110"
          >
            <ChevronLeftIcon size={18} />
          </button>
          <button
            onClick={() => go(current + 1)}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 hover:bg-black/70 border border-white/20 rounded-full text-white transition-all hover:scale-110"
          >
            <ChevronRightIcon size={18} />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-1.5 bg-orange-400"
                  : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

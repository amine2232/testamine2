"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 5000;
const slides = [
  { id: 1, url: "https://zuzz.tv/assets/ch-offer.jpeg" },
  { id: 2, url: "https://zuzz.tv/assets/ch-offer.jpeg" },
  { id: 3, url: "https://zuzz.tv/assets/ch-offer.jpeg" },
];

export function FeaturesSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, SLIDE_DURATION);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  return (
    <div className="w-1/2 bg-blue-600 relative overflow-hidden">
      <div 
        className="relative w-full h-full group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transform transition-transform duration-700 ease-in-out",
              index === currentSlide 
                ? "translate-x-0 opacity-100" 
                : index < currentSlide 
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
            )}
          >
            <Image
              src={slide.url}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover object-center"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                "hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/20",
                index === currentSlide 
                  ? "bg-white scale-110" 
                  : "bg-white/40 hover:scale-105"
              )}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
// src/components/HeroCarousel.tsx
import React, { useEffect, useRef, useState } from "react";

// import your assets (adjust paths/names if different)
import hero1Large from "@/assets/hero-bg.jpg";
import hero1Md from "@/assets/hero-bg@md.jpg";
import hero1Sm from "@/assets/hero-bg@sm.jpg";

import hero2Large from "@/assets/hero-2.jpg";
import hero2Md from "@/assets/hero-2@md.jpg";
import hero2Sm from "@/assets/hero-2@sm.jpg";

import hero3Large from "@/assets/hero-3.jpg";
import hero3Md from "@/assets/hero-3@md.jpg";
import hero3Sm from "@/assets/hero-3@sm.jpg";

const IMAGES = [
  {
    id: "hero-1",
    alt: "Warm dining room with cozy lights",
    large: hero1Large,
    md: hero1Md,
    sm: hero1Sm,
  },
  {
    id: "hero-2",
    alt: "Chef preparing a signature dish",
    large: hero2Large,
    md: hero2Md,
    sm: hero2Sm,
  },
  {
    id: "hero-3",
    alt: "Table setting with wine glasses and dishes",
    large: hero3Large,
    md: hero3Md,
    sm: hero3Sm,
  },
];

// Animation timings
const ZOOM_DURATION = 300; // 0.3s smooth zoom
const PAUSE_DURATION = 5000; // 5s wait before next slide

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Function to advance the slide
  const advanceSlide = () => {
    setIsZoomed(false);

    setTimeout(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, ZOOM_DURATION);
  };

  // Function to start the next cycle (zoom in and wait)
  const startNextCycle = () => {
    setTimeout(() => {
      setIsZoomed(true);
    }, 50);

    timerRef.current = window.setTimeout(
      advanceSlide,
      PAUSE_DURATION + ZOOM_DURATION
    );
  };

  // Manage continuous autoplay
  useEffect(() => {
    if (reduceMotion) return;

    if (timerRef.current === null) {
      startNextCycle();
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [index, reduceMotion]);

  // Hover pause & resume
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const pause = () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setIsZoomed(true);
    };

    const resume = () => {
      if (!timerRef.current && !reduceMotion) {
        advanceSlide();
      }
    };

    node.addEventListener("mouseenter", pause);
    node.addEventListener("focusin", pause);
    node.addEventListener("mouseleave", resume);
    node.addEventListener("focusout", resume);

    return () => {
      node.removeEventListener("mouseenter", pause);
      node.removeEventListener("focusin", pause);
      node.removeEventListener("mouseleave", resume);
      node.removeEventListener("focusout", resume);
    };
  }, [reduceMotion]);

  // Indicator click
  const handleIndicatorClick = (i: number) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setIsZoomed(false);

    setTimeout(() => {
      setIndex(i);
    }, ZOOM_DURATION);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-[90vh] min-h-[560px] flex items-center justify-center overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Hero carousel"
    >
      {/* stacked backgrounds for fade + zoom */}
      <div className="absolute inset-0">
        {IMAGES.map((img, i) => {
          const visible = i === index;
          return (
            <div
              key={img.id}
              aria-hidden={!visible}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out will-change-opacity ${
                visible ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Smoothest zoom effect — fixed, clean, no resizing */}
              <div
                className="absolute inset-0"
                style={{
                  transitionProperty: "transform",
                  transitionDuration: `${ZOOM_DURATION}ms`,
                  transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)", // perfect smooth ease-in-out
                  backgroundImage: `linear-gradient(rgba(8,7,7,0.36), rgba(8,7,7,0.36)), url(${img.large})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: isZoomed ? "scale(1.05)" : "scale(1.0)",
                }}
              >
                <picture className="sr-only">
                  <source srcSet={img.large} media="(min-width:1024px)" />
                  <source srcSet={img.md} media="(min-width:640px)" />
                  <img src={img.sm} alt={img.alt} />
                </picture>
              </div>
            </div>
          );
        })}
      </div>

      {/* content */}
      <div className="relative z-20 px-4 text-center text-primary-foreground space-y-6">
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-tight text-white drop-shadow-lg">
          Kareem's
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          kebabs - curries - biryanis
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/menu"
            className="inline-block px-6 py-3 bg-orange-600 text-white rounded-full shadow hover:scale-[1.02] transition-transform"
          >
            Explore Menu
          </a>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-transparent border border-white/60 text-white rounded-full hover:bg-white/10 transition"
          >
            Reserve Table
          </a>
        </div>

        {/* indicators */}
        <div className="mt-6 flex justify-center gap-3" role="tablist" aria-label="Hero slides">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => handleIndicatorClick(i)}
              role="tab"
              aria-selected={i === index}
              className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
              aria-label={`Show slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

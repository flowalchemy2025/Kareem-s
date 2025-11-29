import React from "react";

/**
 * Grid - 2x2 feature grid to place under the hero
 *
 * Fonts adjusted to match Home theme:
 * - font-display for headings
 * - text-foreground & text-muted-foreground
 * - consistent spacing & weights
 */
import locImg from "@/assets/hero-bg.jpg";
import menuImg from "@/assets/hero-2.jpg";
import whatsNewImg from "@/assets/hero-3.jpg";
import deliverImg from "@/assets/hero-4.jpg";

const ITEMS = [
  {
    id: "locations",
    title: "Our Locations",
    body:
      "Discover our branches across the city and experience authentic Indian dining in warm, inviting spaces.",
    cta: "View Locations",
    href: "/locations",
    img: locImg,
  },
  {
    id: "menu",
    title: "Our Menu",
    body:
      "Explore our signature dishes—from rich curries to aromatic biryanis—crafted with the freshest ingredients.",
    cta: "View Menu",
    href: "/menu",
    img: menuImg,
  },
  {
    id: "whats-new",
    title: "What's New",
    body: "Have you checked out our new limited-time specialties? Don’t miss out!",
    cta: "View Menu",
    href: "/menu#limited",
    img: whatsNewImg,
  },
  {
    id: "delivery",
    title: "We Also Deliver",
    body: "Enjoy Kareem’s from the comfort of your home. Fresh, fast, and delicious.",
    cta: "Order Online",
    href: "/order",
    img: deliverImg,
  },
];

export default function Grid(): JSX.Element {
  return (
    <section aria-label="Kareem's Highlights" className="px-4 md:px-8 lg:px-16 py-20">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {ITEMS.map((item, idx) => {
          const isTopRow = idx < 2;

          return (
            <article
              key={item.id}
              className={`relative overflow-hidden rounded-3xl shadow-lg group 
              ${isTopRow ? "min-h-[380px]" : "min-h-[340px]"} sm:min-h-[340px]`}
            >
              {/* Background image */}
              <div
                aria-hidden
                className="absolute inset-0 transform-gpu transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `linear-gradient(rgba(5,5,5,0.55), rgba(5,5,5,0.55)), url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 py-8">
                
                {/* Matching Home Theme */}
                <h3 className="font-display text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                  {item.title}
                </h3>

                <p className="mt-4 text-base md:text-lg text-white/90 max-w-lg leading-relaxed">
                  {item.body}
                </p>

                <a
                  href={item.href}
                  className="mt-6 inline-block px-7 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-md hover:scale-105 transition-all duration-200"
                >
                  {item.cta}
                </a>
              </div>

              {/* Soft inner border */}
              <span
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  boxShadow:
                    "inset 0 0 0 8px rgba(255,255,255,0.03), inset 0 8px 25px rgba(0,0,0,0.35)",
                }}
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}

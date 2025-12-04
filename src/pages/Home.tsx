// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChefHat, Clock, MapPin, Star, Play, Quote } from "lucide-react";
import HeroCarousel from "@/components/layout/home/HeroCarousel";
import Grid from "@/components/layout/home/Grid";
import Chatbot from "@/components/Chatbot";

// --- Import your video assets ---
import Review1 from "@/assets/Review_1.mp4";
import Review2 from "@/assets/Review_2.mp4";
import Review3 from "@/assets/Review_3.mp4";

// --- Reviews Data ---
const reviews = [
  {
    name: "Biryani Lover",
    rating: 5,
    text: "Excellent Biryani and starters! Soups are delicious. Beautiful and hygienic environment with very polite staff. They can compete with Hyderabad restaurants. It's my 3rd time visiting! 💕",
    food: 5,
    service: 5,
    atmosphere: 5,
    highlight: "No wait • Free parking • Beautiful location",
  },
  {
    name: "Corporate Diner",
    rating: 5,
    text: "Outstanding lunch experience! Visited with my bosses and management team — truly amazing! The food was super delicious, rich in flavor, and beautifully served. Perfect for corporate dining. Everyone left fully satisfied!",
    food: 5,
    service: 5,
    atmosphere: 5,
    highlight: "Very quiet • Quick service • Elegant atmosphere",
  },
  {
    name: "Family Visitor",
    rating: 4,
    text: "One of the best family restaurants in West Nagpur! The ambiance, service, and attention to detail were remarkable. Every dish was perfectly prepared and beautifully presented. Highly recommended the Shahi Tukda and Karachi Chicken!",
    food: 4,
    service: 4,
    atmosphere: 4,
    highlight: "Kid-friendly • Valet parking • Great for families",
  },
];

// --- Video Reviews Data ---
const videoReviews = [
  { id: 1, title: "Unforgettable Experience", src: Review1 },
  { id: 2, title: "Customer Favourite", src: Review2 },
  { id: 3, title: "Authentic Food", src: Review3 },
];

// --- Video Review Card Component ---
const VideoReviewCard = ({ video }: { video: { id: number; title: string; src: string } }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-all duration-500 group bg-card border border-border/50">
      <div className="aspect-[9/16] relative">
        {!isPlaying ? (
          <>
            <video
              src={video.src}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 hover:bg-primary flex items-center justify-center transition-all duration-300 shadow-elegant group-hover:scale-110">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground fill-primary-foreground ml-1" />
              </div>
            </button>

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-primary-foreground font-serif text-xl font-semibold">
                {video.title}
              </h3>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-black">
            <video
              src={video.src}
              className="w-full h-full object-cover"
              controls
              autoPlay
              playsInline
            />
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-3 right-3 px-3 py-1 bg-background/60 rounded-md text-sm border border-border/50"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  // Smooth-scroll to hash (on load + when hash changes)
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // try to find element matching the hash
        const el = document.querySelector(hash);
        if (el && typeof (el as HTMLElement).scrollIntoView === "function") {
          // small timeout to allow layout to settle (optional)
          setTimeout(() => {
            (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        }
      }
    };

    // scroll on mount if URL contains hash
    scrollToHash();

    // listen for future hash changes (e.g., clicking anchor links)
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <HeroCarousel />

      {/* style Grid (2x2) */}
      <Grid/>

      Chatbot UI
      <Chatbot/>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover what makes Kareem's the perfect destination for Indian dining
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-lg border border-border hover:shadow-elegant transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <ChefHat className="text-primary" size={32} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Expert Chefs
              </h3>
              <p className="text-muted-foreground">
                Our master chefs bring decades of experience crafting authentic Indian cuisine with passion and precision
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg border border-border hover:shadow-elegant transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Clock className="text-primary" size={32} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Fresh Daily
              </h3>
              <p className="text-muted-foreground">
                We source the finest ingredients daily, ensuring every dish is prepared with the freshest components
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg border border-border hover:shadow-elegant transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="text-primary" size={32} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">
                Prime Location
              </h3>
              <p className="text-muted-foreground">
                Located in the heart of the city with easy access and elegant ambiance for memorable dining
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------- */}
      {/* CUSTOMER REVIEWS SECTION */}
      {/* ------------------------------- */}
      <section id="reviews" className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img
                src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                className="h-6"
                alt="Google"
              />
              <span className="text-muted-foreground font-medium">Reviews</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Guests Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real experiences from our valued customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elegant transition-all duration-500 border border-border/50 group relative"
              >
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition">
                  <Quote className="w-16 h-16 text-primary" />
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-foreground/90 leading-relaxed mb-4">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <span>Food: {review.food}/5</span> •
                  <span>Service: {review.service}/5</span> •
                  <span>Atmosphere: {review.atmosphere}/5</span>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-primary mt-1">{review.highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------- */}
      {/* VIDEO REVIEWS SECTION */}
      {/* ------------------------------- */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Video Reviews
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Watch what our guests have to say about their Kareem's experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {videoReviews.map((video) => (
              <VideoReviewCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA
      <section className="py-20 bg-gradient-warm text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Book your table now and let us take you on a culinary journey through India
          </p>

          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-background/20"
            asChild
          >
            <Link to="/contact">Reserve Your Table</Link>
          </Button>
        </div>
      </section> */}
    </div>
  );
};

export default Home;

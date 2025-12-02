// src/pages/Home.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChefHat, Clock, MapPin } from "lucide-react";
import HeroCarousel from "@/components/layout/home/HeroCarousel";
import Grid from "@/components/layout/home/Grid";  // <- make sure this path matches your file
import Chatbot from "@/components/Chatbot";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel />

      {/* style Grid (2x2) */}
      <Grid />

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

      {/* CTA Section */}
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
      </section>
    </div>
  );
};

export default Home;

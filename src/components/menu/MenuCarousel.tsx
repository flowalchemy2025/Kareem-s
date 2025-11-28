import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import bruschettaImg from "@/assets/bruschetta.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import tiramisuImg from "@/assets/tiramisu.jpg";

const MenuCarousel = () => {
  const images = [bruschettaImg, pizzaImg, tiramisuImg];

  return (
    <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center animate-[zoom_4s_ease-in-out_forwards]"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/90" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-foreground px-4">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover authentic Indian flavors crafted with passion
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuCarousel;
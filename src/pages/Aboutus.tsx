import { ChefHat, Heart, Flame } from "lucide-react";
import storyImg from "@/assets/hero-bg.jpg"; // Replace with your own image if needed

const Aboutus = () => {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${storyImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>

        <div className="relative z-10 text-center text-primary-foreground px-4 space-y-4">
          <h1 className="font-display text-5xl md:text-6xl font-bold">
            About Us
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Discover the passion and tradition behind Kareem's
          </p>
        </div>
      </section>

     {/* Intro Section — After About Us Hero */}
<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
  <div className="max-w-3xl mx-auto text-center space-y-6">
    <h2 className="font-display text-4xl font-bold text-foreground">
      No connection with "KARIM'S",
    </h2>
    <p>Jama Masjid, Delhi</p>
  </div>

  {/* Divider Line */}
  <div className="mt-12 flex justify-center">
    <div className="w-24 h-1 bg-accent rounded-full"></div>
  </div>
</section>


      {/* Our Story */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <h2 className="font-display text-4xl font-bold text-foreground">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Since 1995 Kareem's has pampered Mumbai's discerning taste buds with their
               unique masterpieces of Indian cuisine, and has taken wing to conquer rest 
               of the world. We insist on purity of every ingredient and take meticulous
                careat every stage of preparation no make every dish a gourmet's delight.
            </p>
            <p className="text-muted-foreground leading-relaxed">
             We understand that no two plates are alike and so our service are customized to match individual needs and preferences. 
             That fusion of traditional tastes with contemporary trends has ensured that our menu meets wide acceptance across age, gender and ethnicity.
            </p>

            <p className="text-muted-foreground leading-relaxed">
                We welcome you to treat your taste buds and the rest of your senses with the fusion of the finest cuisine, 
                comfortable ambience and courteous service at Kareem's.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-elegant">
            <img
              src={storyImg}
              alt="Restaurant Story"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-center text-foreground mb-12">
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="text-center space-y-4 p-6 rounded-lg border border-border bg-background hover:shadow-elegant transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <ChefHat className="text-primary" size={32} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">Craftsmanship</h3>
              <p className="text-muted-foreground">
                Our chefs bring decades of culinary mastery to every plate served at Kareem's.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg border border-border bg-background hover:shadow-elegant transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="text-primary" size={32} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">Hospitality</h3>
              <p className="text-muted-foreground">
                Every guest is treated with warmth and care, making your experience unforgettable.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg border border-border bg-background hover:shadow-elegant transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Flame className="text-primary" size={32} />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground">Authenticity</h3>
              <p className="text-muted-foreground">
                We stay true to the roots of Indian cuisine while embracing fresh ideas.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-warm text-primary-foreground text-center space-y-8">
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          Join Us for a Memorable Experience
        </h2>
        <p className="text-xl max-w-2xl mx-auto opacity-90">
          Explore our menu or reserve your table today.
        </p>
        <a
          href="/menu"
          className="inline-block px-8 py-4 text-lg rounded-lg border border-primary-foreground/40 bg-background/10 backdrop-blur-sm hover:bg-background/20 transition"
        >
          Explore Menu
        </a>
      </section>

    </div>
  );
};

export default Aboutus;

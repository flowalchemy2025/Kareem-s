import { Button } from "@/components/ui/button";
import MenuCard from "@/components/menu/MenuCard";
import { ExternalLink, Download } from "lucide-react";
import MenuCarousel from "@/components/menu/MenuCarousel";
import bruschettaImg from "@/assets/bruschetta.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import tiramisuImg from "@/assets/tiramisu.jpg";
import { useState } from "react";

const Menu = () => {
  const menuCategories = [
    {
      title: "Starters",
      items: [
        {
          image: bruschettaImg,
          title: "Bruschetta Classica",
          description: "Toasted bread topped with fresh tomatoes, basil, garlic, and olive oil",
          price: "₹450",
          isVeg: true,
        },
        {
          image: bruschettaImg,
          title: "Calamari Fritti",
          description: "Crispy fried calamari rings served with spicy marinara sauce",
          price: "₹650",
          isVeg: false,
        },
        {
          image: bruschettaImg,
          title: "Caprese Salad",
          description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze",
          price: "₹550",
          isVeg: true,
        },
      ],
    },
    {
      title: "Main Course",
      items: [
        {
          image: pizzaImg,
          title: "Margherita Pizza",
          description: "Classic pizza with San Marzano tomatoes, fresh mozzarella, and basil",
          price: "₹750",
          isVeg: true,
        },
        {
          image: pizzaImg,
          title: "Seafood Risotto",
          description: "Creamy risotto with prawns, mussels, and calamari in white wine sauce",
          price: "₹1,200",
          isVeg: false,
        },
        {
          image: pizzaImg,
          title: "Osso Buco",
          description: "Slow-braised veal shanks in rich tomato and wine sauce",
          price: "₹1,450",
          isVeg: false,
        },
      ],
    },
    {
      title: "Desserts",
      items: [
        {
          image: tiramisuImg,
          title: "Tiramisu",
          description: "Classic Italian dessert with espresso-soaked ladyfingers and mascarpone",
          price: "₹450",
          isVeg: true,
        },
        {
          image: tiramisuImg,
          title: "Panna Cotta",
          description: "Silky vanilla custard with berry compote",
          price: "₹400",
          isVeg: true,
        },
        {
          image: tiramisuImg,
          title: "Cannoli Siciliani",
          description: "Crispy pastry shells filled with sweet ricotta and chocolate chips",
          price: "₹425",
          isVeg: true,
        },
      ],
    },
    {
      title: "Beverages",
      items: [
        {
          image: bruschettaImg,
          title: "Italian Espresso",
          description: "Rich, bold espresso from premium Italian beans",
          price: "₹200",
          isVeg: true,
        },
        {
          image: bruschettaImg,
          title: "Fresh Lemonade",
          description: "Homemade lemonade with mint and fresh lime",
          price: "₹250",
          isVeg: true,
        },
        {
          image: bruschettaImg,
          title: "House Wine",
          description: "Selection of premium Italian red and white wines",
          price: "₹800",
          isVeg: true,
        },
      ],
    },
    {
      title: "Chef's Specials",
      items: [
        {
          image: pizzaImg,
          title: "Truffle Pasta",
          description: "Handmade pasta with black truffle, parmesan, and butter sauce",
          price: "₹1,650",
          isVeg: true,
        },
        {
          image: pizzaImg,
          title: "Grilled Branzino",
          description: "Whole Mediterranean sea bass grilled with herbs and lemon",
          price: "₹1,800",
          isVeg: false,
        },
      ],
    },
  ];
  const categories = [
    "Starters",
    "Main Course",
    "Desserts",
    "Beverages",
    "Chef's Specials",
  ];

  // Active Category State
  const [activeCategory, setActiveCategory] = useState("Starters");

  // Filtered Category Data
  const filteredCategory = menuCategories.find(
    (cat) => cat.title === activeCategory
  );
  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <MenuCarousel />

      {/* Download Menu Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <Button size="lg" variant="outline" className="gap-2">
            <Download size={20} />
            Download Full Menu
          </Button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-center gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300
                ${activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-secondary text-secondary-foreground border-border hover:bg-accent hover:text-accent-foreground"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredCategory && (
          <div className="space-y-8">
            {/* Title */}
            <div className="text-center space-y-2">
              <h2 className="font-display text-4xl font-bold text-foreground">
                {filteredCategory.title}
              </h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategory.items.map((item, idx) => (
                <MenuCard key={idx} {...item} />
              ))}
            </div>
          </div>
        )}
      </section>


      {/* CTA Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Ready to Order?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Book your table or order online for delivery through our partners
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild>
              <a href="/contact">Book Table Now</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://zomato.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Order on Zomato <ExternalLink size={16} />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://swiggy.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Order on Swiggy <ExternalLink size={16} />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
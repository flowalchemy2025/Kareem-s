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
          description:
            "Toasted bread topped with fresh tomatoes, basil, garlic, and olive oil",
          price: "₹450",
          isVeg: true,
        },
        {
          image: bruschettaImg,
          title: "Calamari Fritti",
          description: "Crispy fried calamari rings served with marinara sauce",
          price: "₹650",
          isVeg: false,
        },
        {
          image: bruschettaImg,
          title: "Caprese Salad",
          description:
            "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze",
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
          description:
            "Classic pizza with San Marzano tomatoes, fresh mozzarella, and basil",
          price: "₹750",
          isVeg: true,
        },
        {
          image: pizzaImg,
          title: "Seafood Risotto",
          description:
            "Creamy risotto with prawns, mussels, and calamari in wine sauce",
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
          description:
            "Classic Italian dessert with espresso-soaked ladyfingers & mascarpone",
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
          description:
            "Crispy pastry shells filled with sweet ricotta & chocolate chips",
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
          description: "Homemade lemonade with mint and lime",
          price: "₹250",
          isVeg: true,
        },
        {
          image: bruschettaImg,
          title: "House Wine",
          description: "Selection of premium Italian wines",
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
          description:
            "Handmade pasta with black truffle, parmesan, and butter sauce",
          price: "₹1,650",
          isVeg: true,
        },
        {
          image: pizzaImg,
          title: "Grilled Branzino",
          description:
            "Mediterranean sea bass grilled with herbs and lemon",
          price: "₹1,800",
          isVeg: false,
        },
      ],
    },
  ];

  // ------------------------------
  // FILTERING ENGINE
  // ------------------------------

  const categories = [
    "Show All",
    "Starters",
    "Main Course",
    "Desserts",
    "Beverages",
    "Chef's Specials",
  ];

  const [activeCategory, setActiveCategory] = useState("Show All");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegFilter, setVegFilter] = useState("All"); // All | Veg | NonVeg

  // Flatten all items for "Show All"
  const allItems = menuCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      category: cat.title,
    }))
  );

  // Filter by main category
  const categoryFilteredItems =
    activeCategory === "Show All"
      ? allItems
      : menuCategories.find((cat) => cat.title === activeCategory)?.items || [];

  // Search filter
  const searchFilteredItems = categoryFilteredItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Veg / NonVeg filter
  const finalFilteredItems = searchFilteredItems.filter((item) => {
    if (vegFilter === "Veg") return item.isVeg === true;
    if (vegFilter === "NonVeg") return item.isVeg === false;
    return true; // All
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <MenuCarousel />

      {/* Download Menu */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <Button size="lg" variant="outline" className="gap-2">
            <Download size={20} />
            Download Full Menu
          </Button>
        </div>
      </section>

      {/* Search + Veg Filters + Category Filters */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">

        {/* Search */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-72 px-4 py-2 rounded-lg border bg-secondary text-foreground shadow-sm 
                       focus:ring-2 focus:ring-primary transition"
          />
        </div>

        {/* Veg / NonVeg */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setVegFilter("All")}
            className={`px-4 py-2 rounded-full border text-sm transition ${vegFilter === "All"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-secondary text-secondary-foreground"
              }`}
          >
            All
          </button>

          <button
            onClick={() => setVegFilter("Veg")}
            className={`px-4 py-2 rounded-full border text-sm transition ${vegFilter === "Veg"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-secondary text-secondary-foreground"
              }`}
          >
            Veg
          </button>

          <button
            onClick={() => setVegFilter("NonVeg")}
            className={`px-4 py-2 rounded-full border text-sm transition ${vegFilter === "NonVeg"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-secondary text-secondary-foreground"
              }`}
          >
            Non-Veg
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300
                ${activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-secondary text-secondary-foreground border-border hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Final Menu Display */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-2">
          <h2 className="font-display text-4xl font-bold text-foreground">
            {activeCategory === "Show All" ? "All Dishes" : activeCategory}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {finalFilteredItems.map((item, idx) => (
            <MenuCard key={idx} {...item} />
          ))}
        </div>
      </section>

      {/* CTA – Balanced 3-Column Layout */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center">
            Ready to Order?
          </h2>

          <p className="text-muted-foreground text-center max-w-2xl mx-auto mt-2 mb-10">
            Book your table or order online for delivery through our partners
          </p>

          {/* CTA Buttons */}
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mt-6">

            {/* Zomato */}
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://zomato.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Order on Zomato <ExternalLink size={16} />
              </a>
            </Button>

            {/* Center Buttons */}
            <div className="flex flex-col gap-3 items-center">
              <Button size="lg" asChild>
                <a href="/contact">Book Table Now</a>
              </Button>

              <Button
                variant="default"
                size="lg"
                asChild
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Connect on WhatsApp <ExternalLink size={16} />
                </a>
              </Button>
            </div>

            {/* Swiggy */}
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://swiggy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
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

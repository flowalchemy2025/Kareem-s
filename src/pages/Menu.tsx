import { Button } from "@/components/ui/button";
import MenuCard from "@/components/menu/MenuCard";
import { ExternalLink, Download } from "lucide-react";
import MenuCarousel from "@/components/menu/MenuCarousel";
import bruschettaImg from "@/assets/bruschetta.jpg";
import pizzaImg from "@/assets/pizza.jpg";
import tiramisuImg from "@/assets/tiramisu.jpg";
import { useState } from "react";
import { api } from "@/lib/api"; // this connects axios to backend
import { useEffect } from "react";

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    api.get("/dishes").then((res) => {
      setDishes(res.data);
    });
  }, []);


  // ------------------------------
  // FILTERING ENGINE
  // ------------------------------

  const categories = [
    "Show All",
    ...Array.from(new Set(dishes.map((d) => d.category)))
  ];


  const [activeCategory, setActiveCategory] = useState("Show All");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegFilter, setVegFilter] = useState("All"); // All | Veg | NonVeg
  const [sortOption, setSortOption] = useState("");

  // Flatten all items for "Show All"
  const allItems = dishes;


  // Filter by main category
  const categoryFilteredItems =
    activeCategory === "Show All"
      ? allItems
      : dishes.filter((d) => d.category === activeCategory);


  // Search filter
  const searchFilteredItems = categoryFilteredItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Veg / NonVeg filter
  const finalFilteredItems = searchFilteredItems.filter((item) => {
    if (vegFilter === "Veg") return item.is_veg === 1;
    if (vegFilter === "NonVeg") return item.is_veg === 0;
    return true;
  });
  <select
    className="border p-2 rounded-md"
    onChange={(e) => setSortOption(e.target.value)}
  >
    <option value="">Sort</option>
    <option value="LowToHigh">Price: Low → High</option>
    <option value="HighToLow">Price: High → Low</option>
  </select>


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
            <MenuCard
              key={item.id}
              title={item.title}
              description={item.description}
              price={item.price}
              image={item.image_url}
              isVeg={item.is_veg === 1}
            />
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

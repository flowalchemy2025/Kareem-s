import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Added REVIEWS link here 👇
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reviews", path: "/#reviews" }, // NEW
    { name: "Contact", path: "/contact" },
    { name: "About us", path: "/aboutus" },
  ];

  const isActive = (path: string) =>
    location.pathname === path || location.hash === path.replace("/#", "#");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold text-primary">Kareem's</span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-6">

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) =>
                link.name === "Reviews" ? (
                  // ---- Reviews anchor link (Desktop) ----
                  <a
                    key={link.path}
                    href={link.path}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.hash === "#reviews" ? "text-primary" : "text-foreground"
                    }`}
                  >
                    Reviews
                  </a>
                ) : (
                  // ---- Normal React Router navigation ----
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(link.path) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}

              <Button variant="default" asChild>
                <Link to="/contact">Reserve Table</Link>
              </Button>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">

            {navLinks.map((link) =>
              link.name === "Reviews" ? (
                // ---- Reviews anchor link (Mobile) ----
                <a
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                >
                  Reviews
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.path) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}

            <Button variant="default" className="w-full" asChild>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                Reserve Table
              </Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

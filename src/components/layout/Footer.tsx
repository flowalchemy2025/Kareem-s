import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-accent">Kareem's</h3>
            <p className="text-sm text-background/80 leading-relaxed">
              Experience authentic Indian cuisine crafted with passion and the finest ingredients. Every dish tells a story of tradition and flavor.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-background/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="#reserve"
                  className="text-sm text-background/80 hover:text-accent transition-colors"
                >
                  Reserve Table
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-background/80">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Ground Floor, Aman Lifestyle, Nelson Square, Rajnagar, Near Sadar, Chaoni, Nagpur</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-background/80">
                <Phone size={16} className="flex-shrink-0" />
                <span>+91 86690 53831</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-background/80">
                <Mail size={16} className="flex-shrink-0" />
                <span>hello@Kareems.com</span>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/kareemssadar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.google.com/maps/place/Kareem's+Restaurant/@21.1747679,79.0772741,20z/data=!4m22!1m15!4m14!1m6!1m2!1s0x3bd4c11b6e8862df:0xb12257c8dda364d8!2sKareem's+Restaurant!2m2!1d79.0776951!2d21.1747679!1m6!1m2!1s0x3bd4c11b6e8862df:0xb12257c8dda364d8!2sNelson+Square,+Ground+Aman+Lifestyle+Building,+Paagal+Khana+Chowk,+Rajnagar,+Nagpur,+Maharashtra+440013!2m2!1d79.0776951!2d21.1747679!3m5!1s0x3bd4c11b6e8862df:0xb12257c8dda364d8!8m2!3d21.1747679!4d79.0776951!16s%2Fg%2F11ddxkv7qw?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Google Maps"
              >
                <MapPin size={20} />
              </a>
            </div>
            <div className="text-sm text-background/80 space-y-1">
              <p className="font-medium text-background">Opening Hours</p>
              <p>Mon - Fri: 12:00 PM - 11:00 PM</p>
              <p>Sat - Sun: 11:00 AM - 11:30 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/20 text-center text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} Kareem's. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

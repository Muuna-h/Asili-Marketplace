import { Link } from "wouter";
import { CATEGORIES, SOCIAL_LINKS, CONTACT_INFO, COLORS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: COLORS.secondary }} className="text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h2 className="font-display font-bold text-2xl mb-4">KUQUZA</h2>
            <p className="text-white/80 mb-6">Connecting you to authentic Kenyan Product.</p>
            <div className="flex space-x-4">
              <a 
                href={SOCIAL_LINKS.facebook} 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition" 
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href={SOCIAL_LINKS.instagram} 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition" 
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href={SOCIAL_LINKS.twitter} 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition" 
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href={SOCIAL_LINKS.whatsapp} 
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition" 
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="font-medium text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link 
                    href={`/category/${category.slug}`} 
                    className="text-white/80 hover:text-white transition"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Information */}
          <div>
            <h3 className="font-medium text-lg mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white/80 hover:text-white transition">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/80 hover:text-white transition">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p><strong>For Inquiry</strong></p>
              <p><strong>Call/Whatsapp:</strong></p>
              <p className="font-medium">+254705003641</p>
            </div>
          </div>
        </div>
        
        {/* Keep only the copyright line */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} KUQUZA Ventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

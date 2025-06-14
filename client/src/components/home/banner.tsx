import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { COLORS, STOCK_IMAGES } from "@/lib/constants";

export default function Banner() {
  return (
    <section 
      className="rounded-lg overflow-hidden"
      style={{ backgroundColor: COLORS.secondary }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 md:p-12 flex items-center">
          <div className="text-white max-w-md">
            <h2 className="font-display text-2xl md:text-3xl mb-4">Welcome to KuQuza</h2>
            <p className="mb-6">
              Discover authentic and quality Kenyan products from local producers across the country.
            </p>
            <Link href="/category/all">
              <Button 
                className="inline-block font-semibold rounded-full"
                style={{ backgroundColor: COLORS.accent, color: COLORS.secondary }}
              >
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
        <div 
          className="md:w-1/2 h-80 md:h-auto bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/images/welcome-banner.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
      </div>
    </section>
  );
}

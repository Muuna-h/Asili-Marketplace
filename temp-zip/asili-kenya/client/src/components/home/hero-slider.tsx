import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/lib/constants";

interface Slide {
  image: string;
  title: string;
  description: string;
  linkUrl: string;
  linkText: string;
}

const slides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1621357860089-93139a5a2375?auto=format&fit=crop&w=1500&q=80",
    title: "Authentic Kenyan Handcrafted Products",
    description: "Discover the beauty of traditional craftsmanship with modern design",
    linkUrl: "/category/crafts",
    linkText: "Shop Collection"
  },
  {
    image: "https://images.unsplash.com/photo-1591378603223-e15b45a3654d?auto=format&fit=crop&w=1500&q=80",
    title: "Exquisite Kenyan Textiles",
    description: "Beautiful fabrics and textiles handcrafted by local artisans",
    linkUrl: "/category/textiles",
    linkText: "Explore Textiles"
  },
  {
    image: "https://images.unsplash.com/photo-1528755192414-9666f1a774ef?auto=format&fit=crop&w=1500&q=80",
    title: "Organic Kenyan Foods & Drinks",
    description: "Taste the authentic flavors of Kenya with our premium selections",
    linkUrl: "/category/foods-drinks",
    linkText: "Discover Flavors"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  return (
    <div 
      className="hero-slider rounded-lg overflow-hidden relative h-[300px] md:h-[500px]" 
      style={{ backgroundColor: COLORS.secondary }}
    >
      {/* Slides */}
      <div className="slides h-full">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slide absolute inset-0 h-full bg-cover bg-center flex items-center transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          >
            <div className="text-white p-8 md:p-16 max-w-lg relative z-20">
              <h2 className="font-display text-3xl md:text-4xl mb-4">{slide.title}</h2>
              <p className="mb-6">{slide.description}</p>
              <Link href={slide.linkUrl}>
                <Button 
                  className="inline-block font-semibold rounded-full"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  {slide.linkText}
                </Button>
              </Link>
            </div>
            {/* Overlay to darken the image and make text readable */}
            <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
          </div>
        ))}
      </div>
      
      {/* Slider Controls */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition z-20"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition z-20"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      
      {/* Slider Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`w-2.5 h-2.5 rounded-full bg-white transition-opacity ${
              index === currentSlide ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

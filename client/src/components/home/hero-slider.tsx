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
    image: "/images/textiles-slide.png",
    title: "Exquisite Kenyan Textiles",
    description: "Get our beautiful textiles and fabrics",
    linkUrl: "/category/textiles",
    linkText: "Explore Textiles"
  },
  {
    image: "/images/food-slide.png",
    title: "Foods & Drinks",
    description: "Taste the flavors of our locally produced food products & drinks",
    linkUrl: "/category/foods-drinks",
    linkText: "Discover Flavors"
  },
  {
    image: "/images/crafts-slide.png",
    title: "Authentic Kenyan Products",
    description: "Discover the authenticity and quality of locally produced goods.",
    linkUrl: "/category/crafts",
    linkText: "Shop Collection"
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
      className="hero-slider rounded-lg overflow-hidden relative h-[400px] md:h-[500px] shadow-md" 
      style={{ backgroundColor: COLORS.secondary }}
    >
      {/* Slides */}
      <div className="slides h-full">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slide absolute inset-0 h-full w-full bg-cover bg-center flex items-center transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ 
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="text-white p-8 md:p-16 max-w-lg relative z-20">
              <h2 className="font-display text-3xl md:text-5xl mb-4 drop-shadow-lg">{slide.title}</h2>
              <p className="mb-6 text-lg drop-shadow-md">{slide.description}</p>
              <Link href={slide.linkUrl}>
                <Button 
                  className="inline-block font-semibold rounded-full px-6 py-3 text-lg shadow-lg"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  {slide.linkText}
                </Button>
              </Link>
            </div>
            {/* Overlay to darken the image and make text readable */}
            <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
          </div>
        ))}
      </div>
      
      {/* Slider Controls */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 text-white flex items-center justify-center transition z-30 shadow-md"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 text-white flex items-center justify-center transition z-30 shadow-md"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Slider Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button 
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

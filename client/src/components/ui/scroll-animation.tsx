import React, { useEffect, useRef } from 'react';

type AnimationType = 'fade-in' | 'fade-up' | 'zoom-in' | 'fade-left' | 'fade-right';

interface ScrollAnimationProps {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  threshold?: number; // When to trigger animation (0-1)
  children: React.ReactNode;
  className?: string;
}

export default function ScrollAnimation({ 
  children, 
  type = 'fade-in',
  duration = 800,
  delay = 0,
  threshold = 0.1,
  className = '',
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Set initial styles (hidden/transformed)
    switch (type) {
      case 'fade-in':
        element.style.opacity = '0';
        break;
      case 'fade-up':
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        break;
      case 'zoom-in':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.9)';
        break;
      case 'fade-left':
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        break;
      case 'fade-right':
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        break;
    }
    
    // Set up transition
    element.style.transition = `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`;
    
    // Create and observe with IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When element enters the viewport, animate in
            element.style.opacity = '1';
            element.style.transform = 'none';
            
            // Stop observing after animation
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );
    
    observer.observe(element);
    
    // Cleanup
    return () => {
      observer.unobserve(element);
    };
  }, [type, duration, delay, threshold]);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
} 
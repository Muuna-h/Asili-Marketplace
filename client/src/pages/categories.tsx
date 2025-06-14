import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useQuery } from '@tanstack/react-query';
import { STOCK_IMAGES, COLORS } from '@/lib/constants';

const sampleCategories = [
  { id: 1, name: "Fashion", slug: "fashion", image: STOCK_IMAGES.handcrafted },
  { id: 2, name: "Foods & Drinks", slug: "foods-drinks", image: STOCK_IMAGES.foodDrinks },
  { id: 3, name: "Crafts", slug: "crafts", image: STOCK_IMAGES.textiles },
  { id: 4, name: "Gifts", slug: "gifts", image: STOCK_IMAGES.furniture },
  { id: 5, name: "Technology", slug: "technology", image: STOCK_IMAGES.handcrafted },
  { id: 6, name: "Health & Beauty", slug: "health-beauty", image: STOCK_IMAGES.foodDrinks },
  { id: 7, name: "Furniture", slug: "furniture", image: STOCK_IMAGES.furniture },
  { id: 8, name: "Textiles", slug: "textiles", image: STOCK_IMAGES.textiles },
  { id: 9, name: "Plants", slug: "plants", image: STOCK_IMAGES.handcrafted },
  { id: 10, name: "Jua Kali", slug: "jua-kali", image: STOCK_IMAGES.furniture },
];

export default function CategoriesPage() {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ["/api/categories"],
    staleTime: 60000,
  });

  const categoriesToDisplay = categories || sampleCategories;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8" style={{ color: COLORS.primary }}>All Categories</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    console.error("Failed to fetch categories:", error);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8" style={{ color: COLORS.primary }}>All Categories</h1>
          <p className="text-red-500">Error loading categories. Please try again later.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8" style={{ color: COLORS.primary }}>All Categories</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoriesToDisplay.map((category) => (
            <Link key={category.id} to={`/category/${category.slug}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div 
                  className="w-full h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url('${category.image}')` }}
                ></div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2" style={{ color: COLORS.secondary }}>{category.name}</h2>
                  {/* <p className="text-gray-600">{category.description}</p> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
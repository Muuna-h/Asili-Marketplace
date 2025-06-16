import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { STOCK_IMAGES, COLORS } from "@/lib/constants";

// Fallback sample data
const sampleCategories = [
  {
    id: 1,
    name: "Handcrafted",
    slug: "crafts",
    image: STOCK_IMAGES.handcrafted
  },
  {
    id: 2,
    name: "Textiles",
    slug: "textiles",
    image: STOCK_IMAGES.textiles
  },
  {
    id: 3,
    name: "Foods & Drinks",
    slug: "foods-drinks",
    image: STOCK_IMAGES.foodDrinks
  },
  {
    id: 4,
    name: "Furniture",
    slug: "furniture",
    image: STOCK_IMAGES.furniture
  }
];

export default function FeaturedCategories() {
  const {
    data: featuredCategories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredCategories"],
    queryFn: async () => {
      const res = await fetch("/api/categories/featured");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    staleTime: 60000,
  });

  const categories = featuredCategories || sampleCategories;

  if (isLoading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl" style={{ color: COLORS.secondary }}>
            Featured Categories
          </h2>
          <Link href="/categories" className="text-sm font-medium" style={{ color: COLORS.primary }}>
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
              <div className="h-40 bg-gray-300"></div>
              <div className="p-3 text-center">
                <div className="h-5 bg-gray-300 rounded w-24 mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Failed to fetch featured categories:", error);
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl" style={{ color: COLORS.secondary }}>
          Featured Categories
        </h2>
        <Link href="/categories" className="text-sm font-medium" style={{ color: COLORS.primary }}>
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition group">
              <div 
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url('${category.image}')` }}
              ></div>
              <div className="p-3 text-center">
                <h3 className="font-medium group-hover:text-primary transition">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

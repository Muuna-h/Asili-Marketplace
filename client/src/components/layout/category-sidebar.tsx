import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { CATEGORIES, COLORS } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export default function CategorySidebar() {
  const [location] = useLocation();
  const currentPathSegments = location.split("/");
  const currentCategorySlug = currentPathSegments[2] || "";
  
  // Fetch categories from the API
  const { data: apiCategories, isLoading } = useQuery({
    queryKey: ["/api/categories"],
    staleTime: 60000 // 1 minute
  });
  
  // Use API categories if available, otherwise fall back to static CATEGORIES
  const categories = apiCategories || CATEGORIES;
  
  if (isLoading) {
    return (
      <aside className="lg:w-1/5 hidden lg:block">
        <div className="bg-white shadow-sm rounded-lg p-4">
          <h2 
            className="font-display font-semibold text-lg mb-4" 
            style={{ color: COLORS.secondary }}
          >
            Categories
          </h2>
          <div className="space-y-2 animate-pulse">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-10 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        </div>
      </aside>
    );
  }
  
  return (
    <aside className="lg:w-1/5 hidden lg:block">
      <div className="bg-white shadow-sm rounded-lg p-4">
        <h2 
          className="font-display font-semibold text-lg mb-4" 
          style={{ color: COLORS.secondary }}
        >
          Categories
        </h2>
        <Separator className="my-2" />
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link 
                href={`/category/${category.slug}`}
                className={`block py-2 px-3 rounded-md transition ${
                  currentCategorySlug === category.slug 
                    ? `bg-primary text-white font-medium`
                    : `text-neutral-dark hover:bg-neutral-light hover:text-primary`
                }`}
                style={{ 
                  backgroundColor: currentCategorySlug === category.slug ? COLORS.primary : 'transparent',
                  color: currentCategorySlug === category.slug ? 'white' : '#332821',
                }}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

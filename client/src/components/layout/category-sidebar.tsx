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
    <aside className="lg:w-1/5 hidden lg:block space-y-6">
      {/* Featured Promotion */}
      <div 
        className="relative rounded-lg overflow-hidden bg-cover bg-center h-48 flex items-end"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1607707972895-7f994d8c2f3b?auto=format&fit=crop&w=500&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="relative p-4 text-white">
          <h3 className="font-display text-xl mb-2">Special Offer</h3>
          <p className="text-sm mb-2">20% off all handcrafted items</p>
          <Link 
            href="/promotions"
            className="inline-block text-xs font-medium px-3 py-1 rounded-full"
            style={{ backgroundColor: COLORS.accent, color: 'white' }}
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="bg-white shadow-sm rounded-lg p-4">
        <h2 
          className="font-display font-semibold text-lg mb-4" 
          style={{ color: COLORS.secondary }}
        >
          Browse Categories
        </h2>
        <Separator className="my-2" />
        <ul className="space-y-2">
          {(categories as Array<{slug: string; name: string}>).map((category) => (
            <li key={category.slug}>
              <Link 
                href={`/category/${category.slug}`}
                className={`flex items-center py-2 px-3 rounded-md transition ${
                  currentCategorySlug === category.slug 
                    ? `bg-primary text-white font-medium`
                    : `text-neutral-dark hover:bg-neutral-light hover:text-primary`
                }`}
                style={{ 
                  backgroundColor: currentCategorySlug === category.slug ? COLORS.primary : 'transparent',
                  color: currentCategorySlug === category.slug ? 'white' : '#332821',
                }}
              >
                <span className="mr-2">
                  {getCategoryIcon(category.slug)}
                </span>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Customer Testimonial Box */}
      <div className="bg-white shadow-sm rounded-lg p-4">
        <h3 
          className="font-display font-semibold text-lg mb-3" 
          style={{ color: COLORS.secondary }}
        >
          Customer Stories
        </h3>
        <Separator className="mb-4" />
        <div className="space-y-3">
          <div className="flex items-start space-x-3 pb-3 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">SM</div>
            <div>
              <div className="italic text-gray-700 text-sm">
                "I love the authentic Kenyan products from Asili. Fast delivery and excellent quality!"
              </div>
              <div className="mt-1 text-xs font-semibold">
                - Sarah M., Nairobi
              </div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">JO</div>
            <div>
              <div className="italic text-gray-700 text-sm">
                "The textiles are exceptional! Will definitely be ordering more soon."
              </div>
              <div className="mt-1 text-xs font-semibold">
                - James O., Mombasa
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Help Center Box */}
      <div className="bg-white shadow-sm rounded-lg p-4">
        <h3 
          className="font-display font-semibold text-lg mb-3" 
          style={{ color: COLORS.secondary }}
        >
          Need Help?
        </h3>
        <Separator className="mb-4" />
        <div className="flex items-center space-x-2 mb-3 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
            <path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z"/>
          </svg>
          <span>+254705003641</span>
        </div>
        <div className="flex items-center space-x-2 mb-3 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
          </svg>
          <span>support@asilimarketplace.co.ke</span>
        </div>
        <div className="flex items-center space-x-2 mb-3 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-primary" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z"/>
          </svg>
          <a href="https://asilimarketplace.co.ke" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            asilimarketplace.co.ke
          </a>
        </div>
        <Link 
          href="/contact"
          className="inline-block text-sm font-medium rounded-md px-4 py-2 transition w-full text-center"
          style={{ 
            backgroundColor: COLORS.primary,
            color: 'white'
          }}
        >
          Contact Us
        </Link>
      </div>
    </aside>
  );
}

// Helper function to render icons for each category
function getCategoryIcon(categorySlug: string) {
  switch (categorySlug) {
    case 'textiles':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
          <path d="M14 6.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zM1 7v1a.5.5 0 0 1-1 0V7a.5.5 0 0 1 1 0zm11 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zM3 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1A.5.5 0 0 1 3 7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1A.5.5 0 0 1 5 7zm3.5-.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
        </svg>
      );
    case 'foods-drinks':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.902.334a.5.5 0 0 1-.28.65l-2.254.902-.4 1.927c.376.095.715.215.972.367.228.135.56.396.56.82 0 .046-.004.09-.011.132l-.962 9.068a1.28 1.28 0 0 1-.524.93c-.488.34-1.494.87-3.01.87-1.516 0-2.522-.53-3.01-.87a1.28 1.28 0 0 1-.524-.93L3.51 5.132A.78.78 0 0 1 3.5 5c0-.424.332-.685.56-.82.262-.154.607-.276.99-.372C5.824 3.614 6.867 3.5 8 3.5c.712 0 1.389.045 1.985.127l.464-2.215a.5.5 0 0 1 .303-.356l2.5-1a.5.5 0 0 1 .65.278zM9.768 4.607A13.991 13.991 0 0 0 8 4.5c-1.076 0-2.033.11-2.707.278A3.284 3.284 0 0 0 4.645 5c.146.073.362.15.648.222C5.967 5.39 6.924 5.5 8 5.5c.571 0 1.109-.03 1.588-.085l.18-.808zm.292 1.756C9.445 6.45 8.742 6.5 8 6.5c-1.133 0-2.176-.114-2.95-.308a5.514 5.514 0 0 1-.435-.127l.838 8.03c.013.121.06.186.102.215.357.249 1.168.69 2.438.69 1.27 0 2.081-.441 2.438-.69.042-.029.09-.094.102-.215l.852-8.03a5.517 5.517 0 0 1-.435.127 8.88 8.88 0 0 1-.89.17zM4.467 4.884s.003.002.005.006l-.005-.006zm7.066 0-.005.006c.002-.004.005-.006.005-.006zM11.354 5a3.174 3.174 0 0 0-.604-.21l-.099.445.055-.013c.286-.072.502-.149.648-.222z"/>
        </svg>
      );
    case 'crafts':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 15a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm-.5-6.5v-5a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0zM8 10a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
      );
    case 'jewelry':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5h-.001z"/>
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
        </svg>
      );
  }
}

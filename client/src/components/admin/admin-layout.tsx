import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { COLORS } from "@/lib/constants";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [location] = useLocation();
  const { logout } = useAdminAuth();

  // Function to check if a nav item is active
  const isActive = (path: string) => {
    if (path === "/admin/dashboard" && location === "/admin/dashboard") {
      return true;
    }
    // Match any path that starts with the given path (except for dashboard)
    return path !== "/admin/dashboard" && location.startsWith(path);
  };

  // Navigation items
  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: "tachometer-alt" },
    { path: "/admin/products", label: "Products", icon: "box" },
    { path: "/admin/categories", label: "Categories", icon: "tags" },
    { path: "/admin/orders", label: "Orders", icon: "shopping-cart" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Admin Header */}
      <header 
        className="shadow-sm py-3 px-6"
        style={{ backgroundColor: COLORS.secondary }}
      >
        <div className="flex justify-between items-center">
          <Link href="/admin/dashboard">
            <span className="text-white text-lg font-medium flex items-center cursor-pointer">
              <span className="mr-2">🛍️</span>
              Asili Admin
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/">
              <span className="text-white text-sm hover:underline cursor-pointer">
                <i className="fas fa-external-link-alt mr-1"></i> View Store
              </span>
            </Link>
            
            <button
              onClick={() => logout()}
              className="text-white text-sm hover:underline"
            >
              <i className="fas fa-sign-out-alt mr-1"></i> Logout
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-grow">
        {/* Sidebar */}
        <nav className="w-64 border-r border-gray-200 bg-white h-full shadow-sm">
          <div className="py-6 px-3">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link href={item.path}>
                    <span
                      className={`
                        px-4 py-3 rounded-md flex items-center text-sm font-medium cursor-pointer
                        ${isActive(item.path) 
                          ? 'text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                      style={isActive(item.path) ? { backgroundColor: COLORS.primary } : {}}
                    >
                      <i className={`fas fa-${item.icon} w-5`}></i>
                      <span>{item.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-grow p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 
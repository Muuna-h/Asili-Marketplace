import { Link, useLocation } from "wouter";
import { COLORS } from "@/lib/constants";

export default function AdminSidebar() {
  const [location] = useLocation();
  
  const menuItems = [
    { 
      icon: "fas fa-chart-line", 
      label: "Dashboard", 
      path: "/admin/dashboard" 
    },
    { 
      icon: "fas fa-box", 
      label: "Products", 
      path: "/admin/products" 
    },
    {
      icon: "fas fa-shopping-bag",
      label: "Orders",
      path: "/admin/orders"
    },
    {
      icon: "fas fa-tags",
      label: "Categories",
      path: "/admin/categories"
    },
    {
      icon: "fas fa-truck",
      label: "Delivery Regions",
      path: "/admin/delivery-regions"
    },
    {
      icon: "fas fa-percentage",
      label: "Promotions",
      path: "/admin/promotions"
    },
    {
      icon: "fas fa-home",
      label: "View Store",
      path: "/"
    }
  ];
  
  return (
    <aside className="bg-white shadow-sm w-64 fixed left-0 bottom-0 top-16 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link href={item.path}>
                <a
                  className={`flex items-center p-3 rounded-md transition ${
                    location === item.path 
                      ? "bg-primary text-white" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  style={
                    location === item.path 
                      ? { backgroundColor: COLORS.primary } 
                      : {}
                  }
                >
                  <i className={`${item.icon} w-5`}></i>
                  <span className="ml-3">{item.label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

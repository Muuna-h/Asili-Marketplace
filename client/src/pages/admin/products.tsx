import { useEffect } from "react";
import { withAdminAuth } from "@/hooks/use-admin-auth";
import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";
import ProductList from "@/components/admin/product-list";

function AdminProductsPage() {
  // Set background color
  useEffect(() => {
    document.body.style.backgroundColor = "#f7f8f9";
    
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <AdminSidebar />
      
      <div className="ml-64 pt-16 p-6">
        <ProductList />
      </div>
    </div>
  );
}

// Wrap with auth protection
export default withAdminAuth(AdminProductsPage);

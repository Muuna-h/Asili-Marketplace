import { useEffect } from "react";
import { withAdminAuth } from "@/hooks/use-admin-auth";
import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";
import PromotionManager from "@/components/admin/promotion-manager";
import { COLORS } from "@/lib/constants";

function AdminPromotionsPage() {
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
        <div className="mb-6">
          <h1 className="text-2xl font-semibold" style={{ color: COLORS.secondary }}>
            Promotions
          </h1>
          <p className="text-gray-500">Manage your promotional offers and discounts.</p>
        </div>
        
        <PromotionManager />
      </div>
    </div>
  );
}

// Wrap with admin authentication
export default withAdminAuth(AdminPromotionsPage); 
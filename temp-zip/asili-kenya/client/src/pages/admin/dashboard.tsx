import { useEffect } from "react";
import { withAdminAuth } from "@/hooks/use-admin-auth";
import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";
import DashboardStats from "@/components/admin/dashboard-stats";
import { COLORS } from "@/lib/constants";

function AdminDashboardPage() {
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
            Dashboard
          </h1>
          <p className="text-gray-500">Welcome to Asili Kenya admin dashboard.</p>
        </div>
        
        <DashboardStats />
      </div>
    </div>
  );
}

// Wrap with auth protection
export default withAdminAuth(AdminDashboardPage);

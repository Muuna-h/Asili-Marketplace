import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/admin-layout";
import AdminCategoryForm from "@/components/admin/admin-category-form";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { COLORS } from "@/lib/constants";

export default function AdminAddCategoryPage() {
  const [_, navigate] = useLocation();
  const { isAuthenticated } = useAdminAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate("/admin");
    return null;
  }

  const handleSuccess = () => {
    navigate("/admin/categories");
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h1 
            className="text-2xl font-semibold"
            style={{ color: COLORS.secondary }}
          >
            Add New Category
          </h1>
          <p className="text-gray-500 mt-1">
            Create a new category for products to be organized under.
          </p>
        </div>
        <div className="max-w-2xl">
          <AdminCategoryForm onSuccess={handleSuccess} />
        </div>
      </div>
    </AdminLayout>
  );
} 
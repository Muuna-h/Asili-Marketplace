import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/admin-layout";
import AdminCategoryForm from "@/components/admin/admin-category-form";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { COLORS } from "@/lib/constants";
import type { Category } from "@shared/schema";

interface AdminEditCategoryPageProps {
  params: {
    id: string;
  };
}

export default function AdminEditCategoryPage({ params }: AdminEditCategoryPageProps) {
  const categoryId = parseInt(params.id);
  const [_, navigate] = useLocation();
  const { isAuthenticated } = useAdminAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate("/admin");
    return null;
  }

  // Fetch category details
  const { data: category, isLoading, error } = useQuery<Category>({
    queryKey: [`/api/categories/${categoryId}`], // This would require an API endpoint GET /api/categories/:id
    enabled: !isNaN(categoryId)
  });

  const handleSuccess = () => {
    navigate("/admin/categories");
  };

  if (isNaN(categoryId)) {
    return (
      <AdminLayout>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h2 className="text-xl font-medium mb-2">Invalid Category ID</h2>
          <p className="text-gray-500 mb-4">The category ID provided is not valid.</p>
          <button 
            onClick={() => navigate("/admin/categories")}
            className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90"
            style={{ backgroundColor: COLORS.primary }}
          >
            Back to Categories
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <h1 
            className="text-2xl font-semibold"
            style={{ color: COLORS.secondary }}
          >
            Edit Category
          </h1>
          <p className="text-gray-500 mt-1">
            Update category details and settings.
          </p>
        </div>
        
        {isLoading ? (
          <div className="py-10 text-center">
            <i className="fas fa-spinner fa-spin text-2xl" style={{ color: COLORS.primary }}></i>
            <p className="mt-2 text-gray-500">Loading category details...</p>
          </div>
        ) : error || !category ? (
          <div className="py-10 text-center text-red-500">
            <p className="mb-4">Failed to load category details. The category may not exist or has been deleted.</p>
            <button 
              onClick={() => navigate("/admin/categories")}
              className="px-4 py-2 text-white rounded-md hover:opacity-90"
              style={{ backgroundColor: COLORS.primary }}
            >
              Back to Categories
            </button>
          </div>
        ) : (
          <div className="max-w-2xl">
            <AdminCategoryForm category={category} onSuccess={handleSuccess} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 
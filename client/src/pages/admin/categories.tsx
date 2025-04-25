import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import AdminLayout from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { COLORS } from "@/lib/constants";
import type { Category } from "@shared/schema";

export default function AdminCategoriesPage() {
  const [_, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isAuthenticated } = useAdminAuth();
  const [deleteInProgress, setDeleteInProgress] = useState<number | null>(null);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate("/admin");
    return null;
  }

  // Fetch categories
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Delete a category
  const handleDelete = async (categoryId: number) => {
    if (
      !window.confirm("Are you sure you want to delete this category? This action cannot be undone.")
    ) {
      return;
    }

    setDeleteInProgress(categoryId);

    try {
      await apiRequest("DELETE", `/api/categories/${categoryId}`);
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({
        title: "Category Deleted",
        description: "The category has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      toast({
        title: "Error Deleting Category",
        description: "There was a problem deleting the category. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteInProgress(null);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 
            className="text-2xl font-semibold"
            style={{ color: COLORS.secondary }}
          >
            Categories
          </h1>
          <Link href="/admin/categories/add">
            <Button style={{ backgroundColor: COLORS.primary }}>
              <i className="fas fa-plus mr-2"></i> Add Category
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="py-20 text-center">
            <i className="fas fa-spinner fa-spin text-2xl" style={{ color: COLORS.primary }}></i>
            <p className="mt-2 text-gray-500">Loading categories...</p>
          </div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">
            <p>Failed to load categories. Please try refreshing the page.</p>
          </div>
        ) : categories && categories.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-gray-500">{category.slug}</TableCell>
                  <TableCell>
                    {category.featured ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Featured
                      </Badge>
                    ) : null}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/admin/categories/edit/${category.id}`}>
                      <Button variant="outline" size="sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(category.id)}
                      disabled={deleteInProgress === category.id}
                      className="text-red-500 hover:text-red-700"
                    >
                      {deleteInProgress === category.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <i className="fas fa-trash"></i>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-10 text-center">
            <p className="text-gray-500 mb-4">No categories found. Create your first category to get started.</p>
            <Link href="/admin/categories/add">
              <Button style={{ backgroundColor: COLORS.primary }}>
                Add First Category
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 
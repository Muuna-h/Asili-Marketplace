import { useState } from "react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { COLORS } from "@/lib/constants";

export default function ProductList() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  
  // Fetch products
  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/products"]
  });
  
  // Fetch categories for mapping
  const { data: categories } = useQuery({
    queryKey: ["/api/categories"]
  });
  
  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/products/${id}`, undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Deleted",
        description: "The product has been deleted successfully."
      });
      setProductToDelete(null);
    },
    onError: () => {
      toast({
        title: "Delete Failed",
        description: "Failed to delete the product.",
        variant: "destructive"
      });
    }
  });
  
  // Filter products based on search term
  const filteredProducts = products?.filter((product: any) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get category name by ID
  const getCategoryName = (categoryId: number) => {
    const category = categories?.find((cat: any) => cat.id === categoryId);
    return category ? category.name : "Unknown";
  };
  
  // Handle delete confirmation
  const confirmDelete = (id: number) => {
    setProductToDelete(id);
  };
  
  // Handle actual deletion
  const handleDelete = () => {
    if (productToDelete) {
      deleteProductMutation.mutate(productToDelete);
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 w-full">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-60 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold" style={{ color: COLORS.secondary }}>
          Manage Products
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>
          
          <Link href="/admin/products/add">
            <Button 
              className="whitespace-nowrap"
              style={{ backgroundColor: COLORS.primary }}
            >
              <i className="fas fa-plus mr-2"></i>
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      
      {filteredProducts && filteredProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product: any) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                  <TableCell>KSh {product.price.toLocaleString()}</TableCell>
                  <TableCell>{product.stock || 0}</TableCell>
                  <TableCell>
                    {product.featured ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Featured
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                        Regular
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/admin/products/edit/${product.id}`}>
                        <Button variant="outline" size="sm">
                          <i className="fas fa-edit mr-1"></i> Edit
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => confirmDelete(product.id)}
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <i className="fas fa-trash-alt mr-1"></i> Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-md">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-box text-gray-400 text-xl"></i>
          </div>
          <h3 className="text-lg font-medium mb-2">No Products Found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm 
              ? `No products matching "${searchTerm}"` 
              : "Start adding products to your store"}
          </p>
          <Link href="/admin/products/add">
            <Button style={{ backgroundColor: COLORS.primary }}>
              <i className="fas fa-plus mr-2"></i>
              Add First Product
            </Button>
          </Link>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={productToDelete !== null} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
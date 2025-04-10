import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { COLORS } from "@/lib/constants";
import ImageUpload from "./image-upload";

// Schema for product form
const productSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  slug: z.string().min(3, { message: "Slug must be at least 3 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { 
      message: "Slug can only contain lowercase letters, numbers, and hyphens" 
    }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().positive({ message: "Price must be positive" }),
  categoryId: z.coerce.number().positive({ message: "Please select a category" }),
  featured: z.boolean().default(false),
  stock: z.coerce.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  productId?: number;
  isEdit?: boolean;
}

export default function ProductForm({ productId, isEdit = false }: ProductFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [_, navigate] = useLocation();
  const [images, setImages] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["/api/categories"]
  });
  
  // Fetch product details for editing
  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: [`/api/products/${productId}`],
    enabled: isEdit && !!productId
  });
  
  // Set up form with default values
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: 0,
      categoryId: 0,
      featured: false,
      stock: 0
    }
  });
  
  // Update form values when product data is loaded
  useEffect(() => {
    if (product && isEdit) {
      form.reset({
        name: product.name,
        slug: product.slug,
        description: product.description || "",
        price: product.price,
        categoryId: product.categoryId,
        featured: product.featured || false,
        stock: product.stock || 0
      });
      setImages(product.images);
    }
  }, [product, form, isEdit]);
  
  // Auto-generate slug from name
  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };
  
  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: async (data: ProductFormValues & { images: string[] }) => {
      const response = await apiRequest("POST", "/api/products", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product Created",
        description: "The product has been created successfully."
      });
      navigate("/admin/products");
    },
    onError: () => {
      toast({
        title: "Create Failed",
        description: "Failed to create the product.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  });
  
  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: ProductFormValues & { images: string[] } }) => {
      const response = await apiRequest("PUT", `/api/products/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      queryClient.invalidateQueries({ queryKey: [`/api/products/${productId}`] });
      toast({
        title: "Product Updated",
        description: "The product has been updated successfully."
      });
      navigate("/admin/products");
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update the product.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  });
  
  // Combine images from existing product and newly uploaded ones
  const getAllImages = () => {
    // Filter out any images that were removed from the original set
    const existingImages = isEdit ? images : [];
    
    // Add all newly uploaded images
    return [...existingImages, ...uploadedImages];
  };
  
  // Handle form submission
  const onSubmit = async (values: ProductFormValues) => {
    setIsLoading(true);
    
    const allImages = getAllImages();
    
    if (allImages.length < 4) {
      toast({
        title: "More Images Required",
        description: "Please upload at least 4 product images.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    if (allImages.length > 7) {
      toast({
        title: "Too Many Images",
        description: "Please upload a maximum of 7 product images.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    const productData = {
      ...values,
      images: allImages
    };
    
    if (isEdit && productId) {
      updateProductMutation.mutate({ id: productId, data: productData });
    } else {
      createProductMutation.mutate(productData);
    }
  };
  
  // Handle image upload
  const handleImagesUploaded = (urls: string[]) => {
    setUploadedImages(prev => [...prev, ...urls]);
  };
  
  // Handle existing image removal
  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };
  
  if (isLoadingProduct && isEdit) {
    return (
      <div className="bg-white rounded-lg shadow p-6 w-full">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow p-6 w-full">
      <h2 className="text-xl font-semibold mb-6" style={{ color: COLORS.secondary }}>
        {isEdit ? "Edit Product" : "Add New Product"}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter product name" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          // Only auto-generate slug if this is a new product or slug is empty
                          if (!isEdit || !form.getValues("slug")) {
                            form.setValue("slug", generateSlug(e.target.value));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="product-slug" {...field} />
                    </FormControl>
                    <FormDescription>
                      Used in URL. Auto-generated from name, but can be edited.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (KSh)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        min="0" 
                        step="0.01" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories?.map((category: any) => (
                            <SelectItem 
                              key={category.id} 
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          min="0" 
                          step="1" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Featured Product</FormLabel>
                      <FormDescription>
                        Featured products appear on the homepage.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter product description" 
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Product Images</FormLabel>
                <FormDescription className="mb-2">
                  Upload 4 to 7 product images. First image will be the main display image.
                </FormDescription>
                
                {/* Display existing images */}
                {images.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Current Images:</div>
                    <div className="grid grid-cols-5 gap-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={image}
                              alt={`Product image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <i className="fas fa-times text-xs"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Upload new images */}
                <ImageUpload onImagesUploaded={handleImagesUploaded} />
                
                {/* Show uploaded images */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium mb-2">Newly Uploaded:</div>
                    <div className="grid grid-cols-5 gap-2">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={image}
                              alt={`New product image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <i className="fas fa-times text-xs"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: COLORS.primary }}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : (
                isEdit ? "Update Product" : "Create Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

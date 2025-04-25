import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Category, InsertCategory } from "@shared/schema";
import { COLORS } from "@/lib/constants";

// Schema for the form using InsertCategory from shared schema
const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters" }),
  slug: z.string().min(2, { message: "Slug must be at least 2 characters" }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug must be lowercase letters, numbers, and hyphens only" }),
  description: z.string().optional(),
  featured: z.boolean().default(false),
  // image: z.string().optional() // Add later for image upload
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface AdminCategoryFormProps {
  category?: Category; // Optional category for editing
  onSuccess: () => void; // Callback on successful submission
}

export default function AdminCategoryForm({ category, onSuccess }: AdminCategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isEditing = !!category;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      featured: category?.featured || false,
    }
  });

  // Watch name field to auto-generate slug
  const watchedName = form.watch("name");
  useEffect(() => {
    if (!isEditing && watchedName) {
      const generatedSlug = watchedName
        .toLowerCase()
        .replace(/&/g, 'and') // Replace '&' with 'and'
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except space and hyphen
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with single
      form.setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [watchedName, isEditing, form]);


  const onSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true);
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/categories/${category.id}` : "/api/categories";

    try {
      const categoryData: Partial<InsertCategory> = { // Use partial for updates
        name: data.name,
        slug: data.slug,
        description: data.description,
        featured: data.featured,
      };

      if (isEditing) {
          await apiRequest(method, url, categoryData);
      } else {
          // For creating, ensure all required fields are present (they are via zod)
          await apiRequest(method, url, categoryData as InsertCategory);
      }


      toast({
        title: isEditing ? "Category Updated" : "Category Created",
        description: `Category "${data.name}" has been saved successfully.`,
      });
      onSuccess(); // Call the success callback (e.g., navigate back)

    } catch (error: any) {
      console.error("Error submitting category:", error);
      const errorMsg = error?.response?.data?.error || (isEditing ? "update" : "create") + " category";
      toast({
        title: `Error ${isEditing ? 'Updating' : 'Creating'} Category`,
        description: `Failed to ${errorMsg}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name (e.g., Fashion)" {...field} />
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
              <FormLabel>Slug *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., fashion (auto-generated)" {...field} />
              </FormControl>
              <FormDescription>
                Unique identifier for the category URL (lowercase, numbers, hyphens).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of the category"
                  className="min-h-[100px]"
                  {...field}
                  value={field.value ?? ''} // Handle null value for textarea
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Feature this category?
                </FormLabel>
                <FormDescription>
                  Featured categories may be highlighted on the homepage.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Image Upload Placeholder - Add later */}
        {/*
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Image (optional)</FormLabel>
              <FormControl>
                 // File input component here
                 <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} />
              </FormControl>
              <FormDescription>
                Upload an image to represent this category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         */}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
           style={{ backgroundColor: COLORS.primary }}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner fa-spin mr-2"></i> Saving...
            </>
          ) : (
            isEditing ? "Update Category" : "Create Category"
          )}
        </Button>
      </form>
    </Form>
  );
} 
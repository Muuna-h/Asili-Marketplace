import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { COLORS, CATEGORIES } from "@/lib/constants";

interface Promotion {
  id: number;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  discountPercent: number;
  categorySlug: string;
  couponCode: string;
}

// Sample data for testing
const samplePromotions: Promotion[] = [
  {
    id: 1,
    title: "Special Offer",
    description: "20% off all handcrafted items",
    image: "https://images.unsplash.com/photo-1607707972895-7f994d8c2f3b?auto=format&fit=crop&w=1000&q=80",
    startDate: "2023-06-01",
    endDate: "2023-07-15",
    isActive: true,
    discountPercent: 20,
    categorySlug: "crafts",
    couponCode: "CRAFT20"
  },
  {
    id: 2,
    title: "Summer Sale",
    description: "Up to 30% off selected textiles",
    image: "https://images.unsplash.com/photo-1565181420688-7c3a17cdbd7a?auto=format&fit=crop&w=1000&q=80",
    startDate: "2023-06-15",
    endDate: "2023-07-30",
    isActive: true,
    discountPercent: 30,
    categorySlug: "textiles",
    couponCode: "SUMMER30"
  }
];

export default function PromotionManager() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null);
  const [newPromotion, setNewPromotion] = useState<Partial<Promotion>>({
    title: "",
    description: "",
    image: "",
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: true,
    discountPercent: 10,
    categorySlug: "",
    couponCode: ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch all promotions from the API
  const { data: promotions = samplePromotions, isLoading } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions"],
    staleTime: 30000 // 30 seconds
  });
  
  // Add promotion mutation
  const addPromotionMutation = useMutation({
    mutationFn: async (promotion: Partial<Promotion>) => {
      // This would be replaced with actual API call
      console.log("Adding promotion:", promotion);
      // Mock API response
      return { ...promotion, id: Date.now() } as Promotion;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/promotions"] });
      toast({
        title: "Promotion Added",
        description: "The promotion has been added successfully.",
        variant: "default"
      });
      setIsAddDialogOpen(false);
      resetNewPromotion();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add promotion: ${error}`,
        variant: "destructive"
      });
    }
  });
  
  // Update promotion mutation
  const updatePromotionMutation = useMutation({
    mutationFn: async (promotion: Promotion) => {
      // This would be replaced with actual API call
      console.log("Updating promotion:", promotion);
      // Mock API response
      return promotion;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/promotions"] });
      toast({
        title: "Promotion Updated",
        description: "The promotion has been updated successfully.",
        variant: "default"
      });
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update promotion: ${error}`,
        variant: "destructive"
      });
    }
  });
  
  // Delete promotion mutation
  const deletePromotionMutation = useMutation({
    mutationFn: async (id: number) => {
      // This would be replaced with actual API call
      console.log("Deleting promotion:", id);
      // Mock API response
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/promotions"] });
      toast({
        title: "Promotion Deleted",
        description: "The promotion has been deleted successfully.",
        variant: "default"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete promotion: ${error}`,
        variant: "destructive"
      });
    }
  });
  
  const handleAddPromotion = () => {
    if (!newPromotion.title || !newPromotion.description || !newPromotion.couponCode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    addPromotionMutation.mutate(newPromotion);
  };
  
  const handleEditPromotion = () => {
    if (!currentPromotion) return;
    
    updatePromotionMutation.mutate(currentPromotion);
  };
  
  const handleDeletePromotion = (id: number) => {
    if (confirm("Are you sure you want to delete this promotion?")) {
      deletePromotionMutation.mutate(id);
    }
  };
  
  const handleToggleActive = (promotion: Promotion) => {
    const updatedPromotion = { ...promotion, isActive: !promotion.isActive };
    updatePromotionMutation.mutate(updatedPromotion);
  };
  
  const resetNewPromotion = () => {
    setNewPromotion({
      title: "",
      description: "",
      image: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true,
      discountPercent: 10,
      categorySlug: "",
      couponCode: ""
    });
  };
  
  const editPromotion = (promotion: Promotion) => {
    setCurrentPromotion(promotion);
    setIsEditDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold" style={{ color: COLORS.secondary }}>Promotion Manager</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button style={{ backgroundColor: COLORS.primary }}>Add New Promotion</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Promotion</DialogTitle>
              <DialogDescription>
                Create a new promotion that will be displayed on the site.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input 
                  id="title" 
                  className="col-span-3" 
                  value={newPromotion.title}
                  onChange={(e) => setNewPromotion({...newPromotion, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea 
                  id="description" 
                  className="col-span-3" 
                  value={newPromotion.description}
                  onChange={(e) => setNewPromotion({...newPromotion, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">Image URL</Label>
                <Input 
                  id="image" 
                  className="col-span-3" 
                  value={newPromotion.image}
                  onChange={(e) => setNewPromotion({...newPromotion, image: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">Start Date</Label>
                <Input 
                  id="startDate" 
                  type="date"
                  className="col-span-3" 
                  value={newPromotion.startDate}
                  onChange={(e) => setNewPromotion({...newPromotion, startDate: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">End Date</Label>
                <Input 
                  id="endDate" 
                  type="date"
                  className="col-span-3" 
                  value={newPromotion.endDate}
                  onChange={(e) => setNewPromotion({...newPromotion, endDate: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discountPercent" className="text-right">Discount %</Label>
                <Input 
                  id="discountPercent" 
                  type="number"
                  min="1"
                  max="99"
                  className="col-span-3" 
                  value={newPromotion.discountPercent}
                  onChange={(e) => setNewPromotion({...newPromotion, discountPercent: parseInt(e.target.value, 10)})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select 
                  onValueChange={(value) => setNewPromotion({...newPromotion, categorySlug: value})}
                  value={newPromotion.categorySlug}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.slug} value={category.slug}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="couponCode" className="text-right">Coupon Code</Label>
                <Input 
                  id="couponCode" 
                  className="col-span-3" 
                  value={newPromotion.couponCode}
                  onChange={(e) => setNewPromotion({...newPromotion, couponCode: e.target.value.toUpperCase()})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isActive" className="text-right">Active</Label>
                <div className="flex items-center">
                  <Switch 
                    id="isActive" 
                    checked={newPromotion.isActive}
                    onCheckedChange={(checked) => setNewPromotion({...newPromotion, isActive: checked})}
                  />
                  <span className="ml-2">{newPromotion.isActive ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddPromotion} style={{ backgroundColor: COLORS.primary }}>
                Add Promotion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Edit Promotion Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Promotion</DialogTitle>
              <DialogDescription>
                Update the promotion details.
              </DialogDescription>
            </DialogHeader>
            {currentPromotion && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-title" className="text-right">Title</Label>
                  <Input 
                    id="edit-title" 
                    className="col-span-3" 
                    value={currentPromotion.title}
                    onChange={(e) => setCurrentPromotion({...currentPromotion, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-description" className="text-right">Description</Label>
                  <Textarea 
                    id="edit-description" 
                    className="col-span-3" 
                    value={currentPromotion.description}
                    onChange={(e) => setCurrentPromotion({...currentPromotion, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-image" className="text-right">Image URL</Label>
                  <Input 
                    id="edit-image" 
                    className="col-span-3" 
                    value={currentPromotion.image}
                    onChange={(e) => setCurrentPromotion({...currentPromotion, image: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-startDate" className="text-right">Start Date</Label>
                  <Input 
                    id="edit-startDate" 
                    type="date"
                    className="col-span-3" 
                    value={currentPromotion.startDate}
                    onChange={(e) => setCurrentPromotion({...currentPromotion, startDate: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-endDate" className="text-right">End Date</Label>
                  <Input 
                    id="edit-endDate" 
                    type="date"
                    className="col-span-3" 
                    value={currentPromotion.endDate}
                    onChange={(e) => setCurrentPromotion({...currentPromotion, endDate: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-discountPercent" className="text-right">Discount %</Label>
                  <Input 
                    id="edit-discountPercent" 
                    type="number"
                    min="1"
                    max="99"
                    className="col-span-3" 
                    value={currentPromotion.discountPercent}
                    onChange={(e) => setCurrentPromotion({...currentPromotion, discountPercent: parseInt(e.target.value, 10)})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-category" className="text-right">Category</Label>
                  <Select 
                    onValueChange={(value) => setCurrentPromotion({...currentPromotion, categorySlug: value})}
                    value={currentPromotion.categorySlug}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.slug} value={category.slug}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-couponCode" className="text-right">Coupon Code</Label>
                  <Input 
                    id="edit-couponCode" 
                    className="col-span-3" 
                    value={currentPromotion.couponCode}
                    onChange={(e) => setCurrentPromotion({...currentPromotion, couponCode: e.target.value.toUpperCase()})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-isActive" className="text-right">Active</Label>
                  <div className="flex items-center">
                    <Switch 
                      id="edit-isActive" 
                      checked={currentPromotion.isActive}
                      onCheckedChange={(checked) => setCurrentPromotion({...currentPromotion, isActive: checked})}
                    />
                    <span className="ml-2">{currentPromotion.isActive ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditPromotion} style={{ backgroundColor: COLORS.primary }}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Promotions List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Promotions</CardTitle>
          <CardDescription>Manage all your current and upcoming promotional offers.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-16 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          ) : promotions.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promotions.map((promotion) => (
                  <TableRow key={promotion.id}>
                    <TableCell className="font-medium">{promotion.title}</TableCell>
                    <TableCell>{promotion.discountPercent}%</TableCell>
                    <TableCell>
                      {CATEGORIES.find(cat => cat.slug === promotion.categorySlug)?.name || promotion.categorySlug}
                    </TableCell>
                    <TableCell>{new Date(promotion.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(promotion.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Switch 
                          checked={promotion.isActive}
                          onCheckedChange={() => handleToggleActive(promotion)}
                        />
                        <span className="ml-2">{promotion.isActive ? 
                          <span className="text-green-600">Active</span> : 
                          <span className="text-gray-500">Inactive</span>
                        }</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline" 
                          size="sm" 
                          onClick={() => editPromotion(promotion)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeletePromotion(promotion.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No promotions found. Create a new promotion to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
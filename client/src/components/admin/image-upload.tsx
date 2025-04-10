import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { uploadImage } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { COLORS } from "@/lib/constants";

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void;
}

export default function ImageUpload({ onImagesUploaded }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Convert FileList to array for easier handling
    const fileArray = Array.from(files);
    
    // Check file types
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const invalidFiles = fileArray.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid File Type",
        description: "Only JPEG, PNG, and WebP images are allowed.",
        variant: "destructive"
      });
      return;
    }
    
    // Check file sizes (max 5MB per file)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = fileArray.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      toast({
        title: "File Too Large",
        description: "Image files must be less than 5MB.",
        variant: "destructive"
      });
      return;
    }
    
    // Start upload
    setIsUploading(true);
    setProgress(0);
    
    try {
      const uploadedUrls: string[] = [];
      
      // Upload each file
      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        
        // Update progress based on files processed
        setProgress(Math.round((i / fileArray.length) * 100));
        
        // Upload to Supabase
        const url = await uploadImage(file, 'products', 'images');
        
        if (url) {
          uploadedUrls.push(url);
        }
      }
      
      setProgress(100);
      
      // Call callback with uploaded URLs
      if (uploadedUrls.length > 0) {
        onImagesUploaded(uploadedUrls);
        toast({
          title: "Upload Successful",
          description: `${uploadedUrls.length} image${uploadedUrls.length > 1 ? 's' : ''} uploaded successfully.`
        });
      }
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload one or more images. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <div className="border-2 border-dashed rounded-lg p-6 text-center">
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      
      {isUploading ? (
        <div className="space-y-4">
          <div className="text-sm font-medium">Uploading...</div>
          <Progress value={progress} />
          <div className="text-xs text-gray-500">{progress}% complete</div>
        </div>
      ) : (
        <div>
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-cloud-upload-alt text-gray-400 text-2xl"></i>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Drag and drop your images here, or click to select files
          </p>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClick}
            className="mx-auto"
          >
            <i className="fas fa-upload mr-2"></i>
            Upload Images
          </Button>
          <p className="text-xs text-gray-400 mt-2">
            JPG, PNG, WebP. Max 5MB per file.
          </p>
        </div>
      )}
    </div>
  );
}

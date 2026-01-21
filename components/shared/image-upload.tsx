'use client';

import { useState } from 'react';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/lib/uploadthing';
import { X} from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  onImagesChange: (urls: string[]) => void;
  maxImages?: number;
  existingImages?: string[];
}

export default function ImageUpload({
  onImagesChange,
  maxImages = 10,
  existingImages = [],
}: ImageUploadProps) {
  const [images, setImages] = useState<string[]>(existingImages);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadComplete = (res: any) => {
    if (res && Array.isArray(res)) {
      const newUrls = res.map((file) => file.url);
      const updatedImages = [...images, ...newUrls].slice(0, maxImages);
      
      setImages(updatedImages);
      onImagesChange(updatedImages);
    }
    setIsUploading(false);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Current Images Preview */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square relative rounded-lg overflow-hidden border">
                <Image
                  src={url}
                  alt={`Property image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100px, 150px"
                />
              </div>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {images.length < maxImages && (
        <div>
          <UploadButton<OurFileRouter, "propertyImageUploader">
            endpoint="propertyImageUploader"
            onUploadBegin={() => setIsUploading(true)}
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error: Error) => {
              console.error('Upload error:', error);
              setIsUploading(false);
            }}
            appearance={{
              button: "ut-ready:bg-blue-600 ut-uploading:cursor-not-allowed bg-blue-500 text-white px-4 py-2 rounded-md",
              container: "w-full",
              allowedContent: "hidden",
            }}
            content={{
              button({ ready }) {
                if (ready) return "Upload Images";
                return "Getting ready...";
              },
            }}
          />
          
          {isUploading && (
            <p className="text-sm text-gray-600 mt-2">Uploading images...</p>
          )}
          
          <p className="text-sm text-gray-500 mt-2">
            {images.length} of {maxImages} images uploaded • Max 4MB each
          </p>
        </div>
      )}

      {images.length >= maxImages && (
        <p className="text-sm text-yellow-600">
          Maximum {maxImages} images reached
        </p>
      )}
    </div>
  );
}
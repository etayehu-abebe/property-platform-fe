"use client";

import ImageUpload from "@/components/shared/image-upload";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PropertyFormInput,
  PropertyFormOutput,
  propertySchema,
} from "@/lib/schemas/property-schema";
import { usePropertyMutations } from "@/hooks/use-property-mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  X,
  Upload,
  Home,
  MapPin,
  DollarSign,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreatePropertyForm() {
  const router = useRouter();
  const { createProperty, createIsLoading, createError, createIsSuccess } =
    usePropertyMutations();
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormInput>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: "",
      images: [],
      status: "DRAFT",
    },
  });

  // Watch images to sync with form
  const formImages = watch("images");

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageField = (index: number) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
    setValue(
      "images",
      newImageUrls.filter((url) => url.trim() !== ""),
    );
  };

  const updateImageUrl = (index: number, url: string) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = url;
    setImageUrls(newImageUrls);

    // Update form value with non-empty URLs
    const validUrls = newImageUrls.filter((url) => url.trim() !== "");
    setValue("images", validUrls, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<PropertyFormInput> = async (data) => {
    const parsedData: PropertyFormOutput = propertySchema.parse(data);

    try {
      await createProperty(parsedData);
      // Success handled by mutation
      router.push("/properties");
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (createIsSuccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-green-600 flex items-center gap-2">
            ✓ Property Created Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Your property has been saved as a draft.</p>
          <div className="flex gap-4">
            <Button onClick={() => router.push("/properties")}>
              View All Properties
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Create Another Property
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-6 w-6" />
          List Your Property
        </CardTitle>
        <CardDescription>
          Fill in the details below to list your property
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          {createError && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md">
              {createError}
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Property Title
            </Label>
            <Input
              id="title"
              placeholder="Beautiful 3-Bedroom Villa with Pool"
              {...register("title")}
              disabled={createIsLoading}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your property in detail..."
              rows={4}
              {...register("description")}
              disabled={createIsLoading}
            />
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="123 Main St, City, State ZIP"
              {...register("location")}
              disabled={createIsLoading}
            />
            {errors.location && (
              <p className="text-sm text-destructive">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="500000"
              {...register("price")}
              disabled={createIsLoading}
            />
            {errors.price && (
              <p className="text-sm text-destructive">{errors.price.message}</p>
            )}
          </div>

          {/* Images */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
        
              <div className="space-y-3">
                <Label>Property Images</Label>
                <ImageUpload
                  onImagesChange={(urls) =>
                    setValue("images", urls, { shouldValidate: true })
                  }
                  maxImages={10}
                  existingImages={watch("images") || []}
                />
                {errors.images && (
                  <p className="text-sm text-destructive">
                    {errors.images.message}
                  </p>
                )}
              </div>
            </Label>

            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com/property-image.jpg"
                  value={url}
                  onChange={(e) => updateImageUrl(index, e.target.value)}
                  disabled={createIsLoading}
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeImageField(index)}
                    disabled={createIsLoading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addImageField}
              disabled={createIsLoading}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Another Image
            </Button>

            {formImages.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {formImages.length} image{formImages.length !== 1 ? "s" : ""}{" "}
                  added
                </p>
              </div>
            )}

            {errors.images && (
              <p className="text-sm text-destructive">
                {errors.images.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Listing Status</Label>
            <Select
              onValueChange={(value: "DRAFT" | "PUBLISHED") =>
                setValue("status", value)
              }
              defaultValue="DRAFT"
              disabled={createIsLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Save as Draft</SelectItem>
                <SelectItem value="PUBLISHED">Publish Immediately</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600">
              Drafts can be published later from your dashboard
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={createIsLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={createIsLoading}>
            {createIsLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Creating Property...
              </>
            ) : (
              "Create Property"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

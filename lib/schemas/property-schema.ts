import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000),
  location: z.string().min(3, "Location is required"),
  price: z.coerce.number().positive("Price must be positive"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

export type PropertySchema = z.infer<typeof propertySchema>;

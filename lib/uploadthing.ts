import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// File router for your app
export const ourFileRouter = {
  propertyImageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      return { userId: "user123" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import { UploadthingProvider } from "@/providers/uploadthing-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Property Platform",
  description: "Multi-tenant property listing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <UploadthingProvider>{children}</UploadthingProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

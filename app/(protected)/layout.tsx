import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex">
            <main className="flex-1 ml-0">{children}</main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

import ProtectedRoute from "@/components/auth/protected-route";
import CreatePropertyForm from "@/components/properties/create-property-form";
import { Plus } from "lucide-react";

export default function CreatePropertyPage() {
  return (
    <ProtectedRoute requiredRole="OWNER">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Plus className="h-6 w-6 text-blue-600" />
                </div>
                List New Property
              </h1>
              <p className="text-gray-600 mt-2">
                Fill in the details below to add your property to our platform
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="container mx-auto px-4 py-8">
          <CreatePropertyForm />

          {/* Help Text */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                💡 Tips for listing your property
              </h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Use high-quality, clear images of your property</li>
                <li>• Be specific about the location and amenities</li>
                <li>• Drafts can be edited before publishing</li>
                <li>
                  • Published properties cannot be edited (archive and create
                  new instead)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

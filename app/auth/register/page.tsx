import RegisterForm from "@/components/auth/registration-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Property Platform
          </h1>
          <p className="text-gray-600 mt-2">Find and list properties</p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}

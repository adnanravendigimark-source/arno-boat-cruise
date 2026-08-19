import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Admin Login | Arno Boat Cruise Florence",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <p className="font-display text-2xl font-bold text-stone-900">
            Arno Boat Cruise Florence
          </p>
        </div>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
          Content Admin
        </p>
        <div className="mt-6">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

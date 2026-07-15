import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth/auth-panel";

export const metadata: Metadata = {
  title: "Request early access",
};

export default function SignupPage() {
  return (
    <Suspense>
      <AuthPanel mode="signup" />
    </Suspense>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import AuthSectionTwo from "@/components/ui/auth-section-2";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  return <AuthSectionTwo mode="signup" />;
}

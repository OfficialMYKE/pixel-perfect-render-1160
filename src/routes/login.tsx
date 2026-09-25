import { createFileRoute } from "@tanstack/react-router";
import AuthSectionTwo from "@/components/ui/auth-section-2";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return <AuthSectionTwo mode="login" />;
}

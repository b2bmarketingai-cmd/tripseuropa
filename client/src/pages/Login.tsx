import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      setLocation("/");
    } else if (!isLoading && !isAuthenticated) {
      // If we are on this page and not authenticated, we should probably
      // redirect to the API login endpoint which handles the Replit Auth flow
      window.location.href = "/api/login";
    }
  }, [isAuthenticated, isLoading, setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="text-center text-white">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-display">Redirecting to secure login...</h2>
      </div>
    </div>
  );
}

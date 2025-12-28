import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { I18nProvider } from "@/lib/i18n";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Tools from "@/pages/Tools";
import Policies from "@/pages/Policies";
import Destinations from "@/pages/Destinations";
import Packages from "@/pages/Packages";
import Blog from "@/pages/Blog";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Testimonials from "@/pages/Testimonials";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";

// Protected Route Wrapper
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Redirect to="/api/login" />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/tools" component={Tools} />
      <Route path="/policies" component={Policies} />
      <Route path="/destinations" component={Destinations} />
      <Route path="/packages" component={Packages} />
      <Route path="/blog" component={Blog} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/testimonios" component={Testimonials} />
      <Route path="/privacy" component={Privacy} />
      
      {/* Protected Routes */}
      <Route path="/app/profile">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/app/bookings">
        <ProtectedRoute component={Dashboard} />
      </Route>

      {/* Fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;

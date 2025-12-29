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
import FromColombia from "@/pages/FromColombia";
import FromBrazil from "@/pages/FromBrazil";
import FromMexico from "@/pages/FromMexico";
import FromPanama from "@/pages/FromPanama";
import FromArgentina from "@/pages/FromArgentina";
import FromPeru from "@/pages/FromPeru";
import FromCostaRica from "@/pages/FromCostaRica";
import BlogColombia from "@/pages/BlogColombia";
import BlogArgentina from "@/pages/BlogArgentina";
import BlogPeru from "@/pages/BlogPeru";
import BlogPanama from "@/pages/BlogPanama";
import BlogCostaRica from "@/pages/BlogCostaRica";
import BlogDominicana from "@/pages/BlogDominicana";
import BlogCaribe from "@/pages/BlogCaribe";
import BlogMexico from "@/pages/BlogMexico";
import BlogBrasil from "@/pages/BlogBrasil";
import TravelAdvisor from "@/pages/TravelAdvisor";
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
      <Route path="/blog/colombia" component={BlogColombia} />
      <Route path="/blog/argentina" component={BlogArgentina} />
      <Route path="/blog/peru" component={BlogPeru} />
      <Route path="/blog/panama" component={BlogPanama} />
      <Route path="/blog/costa-rica" component={BlogCostaRica} />
      <Route path="/blog/dominicana" component={BlogDominicana} />
      <Route path="/blog/caribe" component={BlogCaribe} />
      <Route path="/blog/mexico" component={BlogMexico} />
      <Route path="/blog/brasil" component={BlogBrasil} />
      <Route path="/travel-advisor" component={TravelAdvisor} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/testimonios" component={Testimonials} />
      <Route path="/privacy" component={Privacy} />
      
      {/* Local SEO Landing Pages */}
      <Route path="/desde-colombia" component={FromColombia} />
      <Route path="/desde-brasil" component={FromBrazil} />
      <Route path="/desde-mexico" component={FromMexico} />
      <Route path="/desde-panama" component={FromPanama} />
      <Route path="/desde-argentina" component={FromArgentina} />
      <Route path="/desde-peru" component={FromPeru} />
      <Route path="/desde-costa-rica" component={FromCostaRica} />
      
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

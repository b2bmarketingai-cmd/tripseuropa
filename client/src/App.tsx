import { Switch, Route, Redirect, useLocation } from "wouter";
import { useEffect, Suspense, lazy, Component, type ReactNode, type ErrorInfo } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { I18nProvider } from "@/lib/i18n";
import { ABTestingProvider } from "@/lib/abTesting";

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean; error: Error | null}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('React render error:', error.message, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '2rem', color: '#ff6b6b', fontFamily: 'monospace', background: '#1a1a2e', minHeight: '100vh', whiteSpace: 'pre-wrap'}}>
          <h1 style={{color: '#d4af37', marginBottom: '1rem'}}>Something went wrong</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} style={{marginTop: '1rem', padding: '0.5rem 1rem', background: '#d4af37', color: '#1a1a2e', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Cargando...</div>
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  
  return null;
}

import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import SkipToContent from "@/components/SkipToContent";

const Login = lazy(() => import("@/pages/Login"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Tools = lazy(() => import("@/pages/Tools"));
const Policies = lazy(() => import("@/pages/Policies"));
const Destinations = lazy(() => import("@/pages/Destinations"));
const Packages = lazy(() => import("@/pages/Packages"));
const Blog = lazy(() => import("@/pages/Blog"));
const Contact = lazy(() => import("@/pages/Contact"));
const About = lazy(() => import("@/pages/About"));
const Testimonials = lazy(() => import("@/pages/Testimonials"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const FromColombia = lazy(() => import("@/pages/FromColombia"));
const FromBrazil = lazy(() => import("@/pages/FromBrazil"));
const FromMexico = lazy(() => import("@/pages/FromMexico"));
const FromPanama = lazy(() => import("@/pages/FromPanama"));
const FromArgentina = lazy(() => import("@/pages/FromArgentina"));
const FromPeru = lazy(() => import("@/pages/FromPeru"));
const FromCostaRica = lazy(() => import("@/pages/FromCostaRica"));
const BlogColombia = lazy(() => import("@/pages/BlogColombia"));
const BlogArgentina = lazy(() => import("@/pages/BlogArgentina"));
const BlogPeru = lazy(() => import("@/pages/BlogPeru"));
const BlogPanama = lazy(() => import("@/pages/BlogPanama"));
const BlogCostaRica = lazy(() => import("@/pages/BlogCostaRica"));
const BlogDominicana = lazy(() => import("@/pages/BlogDominicana"));
const BlogCaribe = lazy(() => import("@/pages/BlogCaribe"));
const BlogMexico = lazy(() => import("@/pages/BlogMexico"));
const BlogBrasil = lazy(() => import("@/pages/BlogBrasil"));
const VacacionesEuropa = lazy(() => import("@/pages/VacacionesEuropa"));
const TravelAdvisor = lazy(() => import("@/pages/TravelAdvisor"));
const TravelAssistant = lazy(() => import("@/pages/TravelAssistant"));
const RouteTemplate = lazy(() => import("@/pages/RouteTemplate"));
const CityOriginTemplate = lazy(() => import("@/pages/CityOriginTemplate"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const DestinationPage = lazy(() => import("@/pages/DestinationPage"));
const Rewards = lazy(() => import("@/pages/Rewards"));
const TravelStylePage = lazy(() => import("@/pages/TravelStylePage"));
const LastMinuteOffers = lazy(() => import("@/pages/LastMinuteOffers"));
const ESim = lazy(() => import("@/pages/ESim"));
const VisaRequirements = lazy(() => import("@/pages/VisaRequirements"));
const Forum = lazy(() => import("@/pages/Forum"));
const Flights = lazy(() => import("@/pages/services/Flights"));
const Hotels = lazy(() => import("@/pages/services/Hotels"));
const PackagesService = lazy(() => import("@/pages/services/Packages"));
const Tours = lazy(() => import("@/pages/services/Tours"));
const Insurance = lazy(() => import("@/pages/services/Insurance"));
const CountryLanding = lazy(() => import("@/pages/CountryLanding"));
const CondicionesVenta = lazy(() => import("@/pages/CondicionesVenta"));
const CookiesPage = lazy(() => import("@/pages/Cookies"));
const TermsConditions = lazy(() => import("@/pages/TermsConditions"));
const ExperiencePage = lazy(() => import("@/pages/ExperiencePage"));
const PackagePage = lazy(() => import("@/pages/PackagePage"));
const OfferPage = lazy(() => import("@/pages/OfferPage"));

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
    <main id="main-content" role="main">
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/tools" component={Tools} />
      <Route path="/policies" component={Policies} />
      <Route path="/destinations" component={Destinations} />
      <Route path="/destinations/:slug" component={DestinationPage} />
      <Route path="/destinos" component={Destinations} />
      <Route path="/destinos/:slug" component={DestinationPage} />
      <Route path="/packages" component={Packages} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/post/:slug" component={BlogPost} />
      <Route path="/blog/colombia" component={BlogColombia} />
      <Route path="/blog/argentina" component={BlogArgentina} />
      <Route path="/blog/peru" component={BlogPeru} />
      <Route path="/blog/panama" component={BlogPanama} />
      <Route path="/blog/costa-rica" component={BlogCostaRica} />
      <Route path="/blog/dominicana" component={BlogDominicana} />
      <Route path="/blog/caribe" component={BlogCaribe} />
      <Route path="/blog/mexico" component={BlogMexico} />
      <Route path="/blog/brasil" component={BlogBrasil} />
      <Route path="/vacaciones-europa" component={VacacionesEuropa} />
      <Route path="/travel-advisor" component={TravelAdvisor} />
      <Route path="/travel-assistant" component={TravelAssistant} />
      <Route path="/asistente" component={TravelAssistant} />
      <Route path="/rewards" component={Rewards} />
      <Route path="/travel-style/:slug" component={TravelStylePage} />
      <Route path="/ofertas-ultima-hora" component={LastMinuteOffers} />
      <Route path="/last-minute-offers" component={LastMinuteOffers} />
      <Route path="/services/vuelos" component={Flights} />
      <Route path="/services/flights" component={Flights} />
      <Route path="/services/hoteles" component={Hotels} />
      <Route path="/services/hotels" component={Hotels} />
      <Route path="/services/paquetes" component={PackagesService} />
      <Route path="/services/packages" component={PackagesService} />
      <Route path="/services/tours" component={Tours} />
      <Route path="/services/seguros" component={Insurance} />
      <Route path="/services/insurance" component={Insurance} />
      <Route path="/services/esim" component={ESim} />
      <Route path="/esim" component={ESim} />
      <Route path="/requisitos-visa" component={VisaRequirements} />
      <Route path="/visa-requirements" component={VisaRequirements} />
      <Route path="/forum" component={Forum} />
      <Route path="/foro" component={Forum} />
      <Route path="/comunidad" component={Forum} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/testimonios" component={Testimonials} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/condiciones-venta" component={CondicionesVenta} />
      <Route path="/cookies" component={CookiesPage} />
      <Route path="/terminos-condiciones" component={TermsConditions} />
      
      {/* Experience, Package, Offer Pages */}
      <Route path="/experiencias/:slug" component={ExperiencePage} />
      <Route path="/experiences/:slug" component={ExperiencePage} />
      <Route path="/paquetes/:slug" component={PackagePage} />
      <Route path="/ofertas/:slug" component={OfferPage} />
      
      {/* Local SEO Landing Pages */}
      <Route path="/desde-colombia" component={FromColombia} />
      <Route path="/desde-brasil" component={FromBrazil} />
      <Route path="/desde-mexico" component={FromMexico} />
      <Route path="/desde-panama" component={FromPanama} />
      <Route path="/desde-argentina" component={FromArgentina} />
      <Route path="/desde-peru" component={FromPeru} />
      <Route path="/desde-costa-rica" component={FromCostaRica} />
      
      {/* Dynamic Country Landing Pages */}
      <Route path="/desde/:country" component={CountryLanding} />
      
      {/* Country-Specific SEO Routes (hreflang targeting) */}
      {/* Spanish Colombia (es-co) */}
      <Route path="/es-co" component={Home} />
      <Route path="/es-co/" component={Home} />
      <Route path="/es-co/destinos" component={Destinations} />
      <Route path="/es-co/destinos/:slug" component={DestinationPage} />
      <Route path="/es-co/paquetes" component={Packages} />
      <Route path="/es-co/experiencias/:slug" component={ExperiencePage} />
      <Route path="/es-co/paquetes/:slug" component={PackagePage} />
      <Route path="/es-co/ofertas/:slug" component={OfferPage} />
      <Route path="/es-co/blog" component={Blog} />
      <Route path="/es-co/blog/:country" component={Blog} />
      
      {/* Spanish Mexico (es-mx) */}
      <Route path="/es-mx" component={Home} />
      <Route path="/es-mx/" component={Home} />
      <Route path="/es-mx/destinos" component={Destinations} />
      <Route path="/es-mx/destinos/:slug" component={DestinationPage} />
      <Route path="/es-mx/paquetes" component={Packages} />
      <Route path="/es-mx/experiencias/:slug" component={ExperiencePage} />
      <Route path="/es-mx/paquetes/:slug" component={PackagePage} />
      <Route path="/es-mx/ofertas/:slug" component={OfferPage} />
      <Route path="/es-mx/blog" component={Blog} />
      <Route path="/es-mx/blog/:country" component={Blog} />
      
      {/* Portuguese Brazil (pt-br) */}
      <Route path="/pt-br" component={Home} />
      <Route path="/pt-br/" component={Home} />
      <Route path="/pt-br/destinos" component={Destinations} />
      <Route path="/pt-br/destinos/:slug" component={DestinationPage} />
      <Route path="/pt-br/paquetes" component={Packages} />
      <Route path="/pt-br/experiencias/:slug" component={ExperiencePage} />
      <Route path="/pt-br/paquetes/:slug" component={PackagePage} />
      <Route path="/pt-br/ofertas/:slug" component={OfferPage} />
      <Route path="/pt-br/blog" component={Blog} />
      <Route path="/pt-br/blog/:country" component={Blog} />
      <Route path="/pt-br/forum" component={Forum} />
      <Route path="/pt-br/foro" component={Forum} />

      {/* Spanish Argentina (es-ar) */}
      <Route path="/es-ar" component={Home} />
      <Route path="/es-ar/" component={Home} />
      <Route path="/es-ar/destinos" component={Destinations} />
      <Route path="/es-ar/destinos/:slug" component={DestinationPage} />
      <Route path="/es-ar/paquetes" component={Packages} />
      <Route path="/es-ar/experiencias/:slug" component={ExperiencePage} />
      <Route path="/es-ar/paquetes/:slug" component={PackagePage} />
      <Route path="/es-ar/ofertas/:slug" component={OfferPage} />
      <Route path="/es-ar/blog" component={Blog} />
      <Route path="/es-ar/blog/:country" component={Blog} />
      
      {/* Spanish Peru (es-pe) */}
      <Route path="/es-pe" component={Home} />
      <Route path="/es-pe/" component={Home} />
      <Route path="/es-pe/destinos" component={Destinations} />
      <Route path="/es-pe/destinos/:slug" component={DestinationPage} />
      <Route path="/es-pe/paquetes" component={Packages} />
      <Route path="/es-pe/experiencias/:slug" component={ExperiencePage} />
      <Route path="/es-pe/paquetes/:slug" component={PackagePage} />
      <Route path="/es-pe/ofertas/:slug" component={OfferPage} />
      <Route path="/es-pe/blog" component={Blog} />
      <Route path="/es-pe/blog/:country" component={Blog} />
      <Route path="/es-pe/forum" component={Forum} />
      <Route path="/es-pe/foro" component={Forum} />

      {/* Spanish Panama (es-pa) */}
      <Route path="/es-pa" component={Home} />
      <Route path="/es-pa/" component={Home} />
      <Route path="/es-pa/destinos" component={Destinations} />
      <Route path="/es-pa/destinos/:slug" component={DestinationPage} />
      <Route path="/es-pa/paquetes" component={Packages} />
      <Route path="/es-pa/experiencias/:slug" component={ExperiencePage} />
      <Route path="/es-pa/paquetes/:slug" component={PackagePage} />
      <Route path="/es-pa/ofertas/:slug" component={OfferPage} />
      <Route path="/es-pa/blog" component={Blog} />
      <Route path="/es-pa/blog/:country" component={Blog} />
      
      {/* Spanish Costa Rica (es-cr) */}
      <Route path="/es-cr" component={Home} />
      <Route path="/es-cr/" component={Home} />
      <Route path="/es-cr/destinos" component={Destinations} />
      <Route path="/es-cr/destinos/:slug" component={DestinationPage} />
      <Route path="/es-cr/paquetes" component={Packages} />
      <Route path="/es-cr/experiencias/:slug" component={ExperiencePage} />
      <Route path="/es-cr/paquetes/:slug" component={PackagePage} />
      <Route path="/es-cr/ofertas/:slug" component={OfferPage} />
      <Route path="/es-cr/blog" component={Blog} />
      <Route path="/es-cr/blog/:country" component={Blog} />
      <Route path="/es-cr/forum" component={Forum} />
      <Route path="/es-cr/foro" component={Forum} />

      {/* Spanish Dominican Republic (es-do) */}
      <Route path="/es-do" component={Home} />
      <Route path="/es-do/" component={Home} />
      <Route path="/es-do/destinos" component={Destinations} />
      <Route path="/es-do/destinos/:slug" component={DestinationPage} />
      <Route path="/es-do/paquetes" component={Packages} />
      <Route path="/es-do/experiencias/:slug" component={ExperiencePage} />
      <Route path="/es-do/paquetes/:slug" component={PackagePage} />
      <Route path="/es-do/ofertas/:slug" component={OfferPage} />
      <Route path="/es-do/blog" component={Blog} />
      <Route path="/es-do/blog/:country" component={Blog} />
      
      {/* Spanish Caribbean */}
      <Route path="/es/caribe" component={Home} />
      <Route path="/es/caribe/" component={Home} />
      <Route path="/es/caribe/destinos" component={Destinations} />
      
      {/* English routes */}
      <Route path="/en" component={Home} />
      <Route path="/en/" component={Home} />
      <Route path="/en/destinations" component={Destinations} />
      <Route path="/en/destinations/:slug" component={DestinationPage} />
      <Route path="/en/experiences/:slug" component={ExperiencePage} />
      <Route path="/en/packages/:slug" component={PackagePage} />
      <Route path="/en/blog/:country" component={Blog} />
      <Route path="/en/blog/post/:slug" component={BlogPost} />
      
      {/* English Argentina (en-ar) */}
      <Route path="/en-ar" component={Home} />
      <Route path="/en-ar/" component={Home} />
      <Route path="/en-ar/destinations" component={Destinations} />
      <Route path="/en-ar/destinations/:slug" component={DestinationPage} />
      <Route path="/en-ar/experiences/:slug" component={ExperiencePage} />
      <Route path="/en-ar/packages/:slug" component={PackagePage} />
      
      {/* English Colombia (en-co) */}
      <Route path="/en-co" component={Home} />
      <Route path="/en-co/" component={Home} />
      <Route path="/en-co/destinations" component={Destinations} />
      <Route path="/en-co/destinations/:slug" component={DestinationPage} />
      <Route path="/en-co/experiences/:slug" component={ExperiencePage} />
      <Route path="/en-co/packages/:slug" component={PackagePage} />
      
      {/* English Mexico (en-mx) */}
      <Route path="/en-mx" component={Home} />
      <Route path="/en-mx/" component={Home} />
      <Route path="/en-mx/destinations" component={Destinations} />
      <Route path="/en-mx/destinations/:slug" component={DestinationPage} />
      <Route path="/en-mx/experiences/:slug" component={ExperiencePage} />
      <Route path="/en-mx/packages/:slug" component={PackagePage} />
      
      {/* Route Pages (Origin-Destination) */}
      <Route path="/routes/:route" component={RouteTemplate} />
      
      {/* City Origin Pages */}
      <Route path="/from/:country/:city" component={CityOriginTemplate} />
      
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
    </main>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <ABTestingProvider>
            <TooltipProvider>
              <SkipToContent />
              <ScrollToTop />
              <Toaster />
              <Suspense fallback={<LoadingFallback />}>
                <Router />
              </Suspense>
            </TooltipProvider>
          </ABTestingProvider>
        </I18nProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

import { Switch, Route, Redirect, useLocation } from "wouter";
import { useEffect, Suspense, Component, type ReactNode, type ErrorInfo } from "react";
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
    console.error('React render error:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: '2rem', textAlign: 'center', fontFamily: 'system-ui', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <h1 style={{marginBottom: '1rem'}}>Trips Europa</h1>
          <p style={{marginBottom: '1rem'}}>La pagina necesita recargarse.</p>
          <button onClick={() => window.location.reload()} style={{padding: '0.75rem 2rem', background: '#d4af37', color: '#1a1a2e', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold'}}>
            Recargar
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
import VacacionesEuropa from "@/pages/VacacionesEuropa";
import TravelAdvisor from "@/pages/TravelAdvisor";
import TravelAssistant from "@/pages/TravelAssistant";
import RouteTemplate from "@/pages/RouteTemplate";
import CityOriginTemplate from "@/pages/CityOriginTemplate";
import BlogPost from "@/pages/BlogPost";
import DestinationPage from "@/pages/DestinationPage";
import Rewards from "@/pages/Rewards";
import TravelStylePage from "@/pages/TravelStylePage";
import LastMinuteOffers from "@/pages/LastMinuteOffers";
import ESim from "@/pages/ESim";
import VisaRequirements from "@/pages/VisaRequirements";
import Forum from "@/pages/Forum";
import Flights from "@/pages/services/Flights";
import Hotels from "@/pages/services/Hotels";
import PackagesService from "@/pages/services/Packages";
import Tours from "@/pages/services/Tours";
import Insurance from "@/pages/services/Insurance";
import CountryLanding from "@/pages/CountryLanding";
import CondicionesVenta from "@/pages/CondicionesVenta";
import CookiesPage from "@/pages/Cookies";
import TermsConditions from "@/pages/TermsConditions";
import ExperiencePage from "@/pages/ExperiencePage";
import PackagePage from "@/pages/PackagePage";
import OfferPage from "@/pages/OfferPage";

function ProtectedRoute({ component: Comp }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-primary">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Redirect to="/api/login" />;
  }

  return <Comp />;
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

      <Route path="/experiencias/:slug" component={ExperiencePage} />
      <Route path="/experiences/:slug" component={ExperiencePage} />
      <Route path="/paquetes/:slug" component={PackagePage} />
      <Route path="/ofertas/:slug" component={OfferPage} />

      <Route path="/desde-colombia" component={FromColombia} />
      <Route path="/desde-brasil" component={FromBrazil} />
      <Route path="/desde-mexico" component={FromMexico} />
      <Route path="/desde-panama" component={FromPanama} />
      <Route path="/desde-argentina" component={FromArgentina} />
      <Route path="/desde-peru" component={FromPeru} />
      <Route path="/desde-costa-rica" component={FromCostaRica} />

      <Route path="/desde/:country" component={CountryLanding} />

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

      <Route path="/es/caribe" component={Home} />
      <Route path="/es/caribe/" component={Home} />
      <Route path="/es/caribe/destinos" component={Destinations} />

      <Route path="/en" component={Home} />
      <Route path="/en/" component={Home} />
      <Route path="/en/destinations" component={Destinations} />
      <Route path="/en/destinations/:slug" component={DestinationPage} />
      <Route path="/en/experiences/:slug" component={ExperiencePage} />
      <Route path="/en/packages/:slug" component={PackagePage} />
      <Route path="/en/blog/:country" component={Blog} />
      <Route path="/en/blog/post/:slug" component={BlogPost} />

      <Route path="/en-ar" component={Home} />
      <Route path="/en-ar/" component={Home} />
      <Route path="/en-ar/destinations" component={Destinations} />
      <Route path="/en-ar/destinations/:slug" component={DestinationPage} />
      <Route path="/en-ar/experiences/:slug" component={ExperiencePage} />
      <Route path="/en-ar/packages/:slug" component={PackagePage} />

      <Route path="/en-co" component={Home} />
      <Route path="/en-co/" component={Home} />
      <Route path="/en-co/destinations" component={Destinations} />
      <Route path="/en-co/destinations/:slug" component={DestinationPage} />
      <Route path="/en-co/experiences/:slug" component={ExperiencePage} />
      <Route path="/en-co/packages/:slug" component={PackagePage} />

      <Route path="/en-mx" component={Home} />
      <Route path="/en-mx/" component={Home} />
      <Route path="/en-mx/destinations" component={Destinations} />
      <Route path="/en-mx/destinations/:slug" component={DestinationPage} />
      <Route path="/en-mx/experiences/:slug" component={ExperiencePage} />
      <Route path="/en-mx/packages/:slug" component={PackagePage} />

      <Route path="/routes/:route" component={RouteTemplate} />

      <Route path="/from/:country/:city" component={CityOriginTemplate} />

      <Route path="/app/profile">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/app/bookings">
        <ProtectedRoute component={Dashboard} />
      </Route>

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

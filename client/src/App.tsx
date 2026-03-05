import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import BlogIndex from "@/pages/blog/BlogIndex";
import ArgentinaToEurope2025ES from "@/pages/blog/ArgentinaToEurope2025ES";
import ArgentinaToEurope2025EN from "@/pages/blog/ArgentinaToEurope2025EN";
import ArgentinaToEurope2025PT from "@/pages/blog/ArgentinaToEurope2025PT";
import ChileToEurope2025ES from "@/pages/blog/ChileToEurope2025ES";
import ChileToEurope2025EN from "@/pages/blog/ChileToEurope2025EN";
import ChileToEurope2025PT from "@/pages/blog/ChileToEurope2025PT";
import ColombiaToEurope2025ES from "@/pages/blog/ColombiaToEurope2025ES";
import ColombiaToEurope2025EN from "@/pages/blog/ColombiaToEurope2025EN";
import ColombiaToEurope2025PT from "@/pages/blog/ColombiaToEurope2025PT";
import MexicoToEurope2025ES from "@/pages/blog/MexicoToEurope2025ES";
import MexicoToEurope2025EN from "@/pages/blog/MexicoToEurope2025EN";
import MexicoToEurope2025PT from "@/pages/blog/MexicoToEurope2025PT";
import PeruToEurope2025ES from "@/pages/blog/PeruToEurope2025ES";
import PeruToEurope2025EN from "@/pages/blog/PeruToEurope2025EN";
import PeruToEurope2025PT from "@/pages/blog/PeruToEurope2025PT";
import BrazilToEurope2025ES from "@/pages/blog/BrazilToEurope2025ES";
import BrazilToEurope2025EN from "@/pages/blog/BrazilToEurope2025EN";
import BrazilToEurope2025PT from "@/pages/blog/BrazilToEurope2025PT";
import EcuadorToEurope2025ES from "@/pages/blog/EcuadorToEurope2025ES";
import EcuadorToEurope2025EN from "@/pages/blog/EcuadorToEurope2025EN";
import EcuadorToEurope2025PT from "@/pages/blog/EcuadorToEurope2025PT";
import VenezuelaToEurope2025ES from "@/pages/blog/VenezuelaToEurope2025ES";
import VenezuelaToEurope2025EN from "@/pages/blog/VenezuelaToEurope2025EN";
import VenezuelaToEurope2025PT from "@/pages/blog/VenezuelaToEurope2025PT";
import ParaguayToEurope2025ES from "@/pages/blog/ParaguayToEurope2025ES";
import ParaguayToEurope2025EN from "@/pages/blog/ParaguayToEurope2025EN";
import ParaguayToEurope2025PT from "@/pages/blog/ParaguayToEurope2025PT";
import BoliviaToEurope2025ES from "@/pages/blog/BoliviaToEurope2025ES";
import BoliviaToEurope2025EN from "@/pages/blog/BoliviaToEurope2025EN";
import BoliviaToEurope2025PT from "@/pages/blog/BoliviaToEurope2025PT";
import UruguayToEurope2025ES from "@/pages/blog/UruguayToEurope2025ES";
import UruguayToEurope2025EN from "@/pages/blog/UruguayToEurope2025EN";
import UruguayToEurope2025PT from "@/pages/blog/UruguayToEurope2025PT";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/argentina-europa-2025-es" component={ArgentinaToEurope2025ES} />
      <Route path="/blog/argentina-europe-2025" component={ArgentinaToEurope2025EN} />
      <Route path="/blog/argentina-europa-2025-pt" component={ArgentinaToEurope2025PT} />
      <Route path="/blog/chile-europa-2025-es" component={ChileToEurope2025ES} />
      <Route path="/blog/chile-europe-2025" component={ChileToEurope2025EN} />
      <Route path="/blog/chile-europa-2025-pt" component={ChileToEurope2025PT} />
      <Route path="/blog/colombia-europa-2025-es" component={ColombiaToEurope2025ES} />
      <Route path="/blog/colombia-europe-2025" component={ColombiaToEurope2025EN} />
      <Route path="/blog/colombia-europa-2025-pt" component={ColombiaToEurope2025PT} />
      <Route path="/blog/mexico-europa-2025-es" component={MexicoToEurope2025ES} />
      <Route path="/blog/mexico-europe-2025" component={MexicoToEurope2025EN} />
      <Route path="/blog/mexico-europa-2025-pt" component={MexicoToEurope2025PT} />
      <Route path="/blog/peru-europa-2025-es" component={PeruToEurope2025ES} />
      <Route path="/blog/peru-europe-2025" component={PeruToEurope2025EN} />
      <Route path="/blog/peru-europa-2025-pt" component={PeruToEurope2025PT} />
      <Route path="/blog/brazil-europa-2025-es" component={BrazilToEurope2025ES} />
      <Route path="/blog/brazil-europe-2025" component={BrazilToEurope2025EN} />
      <Route path="/blog/brazil-europa-2025-pt" component={BrazilToEurope2025PT} />
      <Route path="/blog/ecuador-europa-2025-es" component={EcuadorToEurope2025ES} />
      <Route path="/blog/ecuador-europe-2025" component={EcuadorToEurope2025EN} />
      <Route path="/blog/ecuador-europa-2025-pt" component={EcuadorToEurope2025PT} />
      <Route path="/blog/venezuela-europa-2025-es" component={VenezuelaToEurope2025ES} />
      <Route path="/blog/venezuela-europe-2025" component={VenezuelaToEurope2025EN} />
      <Route path="/blog/venezuela-europa-2025-pt" component={VenezuelaToEurope2025PT} />
      <Route path="/blog/paraguay-europa-2025-es" component={ParaguayToEurope2025ES} />
      <Route path="/blog/paraguay-europe-2025" component={ParaguayToEurope2025EN} />
      <Route path="/blog/paraguay-europa-2025-pt" component={ParaguayToEurope2025PT} />
      <Route path="/blog/bolivia-europa-2025-es" component={BoliviaToEurope2025ES} />
      <Route path="/blog/bolivia-europe-2025" component={BoliviaToEurope2025EN} />
      <Route path="/blog/bolivia-europa-2025-pt" component={BoliviaToEurope2025PT} />
      <Route path="/blog/uruguay-europa-2025-es" component={UruguayToEurope2025ES} />
      <Route path="/blog/uruguay-europe-2025" component={UruguayToEurope2025EN} />
      <Route path="/blog/uruguay-europa-2025-pt" component={UruguayToEurope2025PT} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Destinos from "@/pages/Destinos";
import Paquetes from "@/pages/Paquetes";
import Nosotros from "@/pages/Nosotros";
import Contacto from "@/pages/Contacto";
import DestinoDetalle from "@/pages/DestinoDetalle";
import PaqueteDetalle from "@/pages/PaqueteDetalle";
import Francia from "@/pages/Francia";
import Italia from "@/pages/Italia";
import Espana from "@/pages/Espana";
import Grecia from "@/pages/Grecia";
import Portugal from "@/pages/Portugal";
import Alemania from "@/pages/Alemania";
import PaisesNordicos from "@/pages/PaisesNordicos";
import EuropaOriental from "@/pages/EuropaOriental";
import Croacia from "@/pages/Croacia";
import Suiza from "@/pages/Suiza";
import PaqueteEuropaClasica from "@/pages/PaqueteEuropaClasica";
import PaqueteMediterraneo from "@/pages/PaqueteMediterraneo";
import PaqueteNordico from "@/pages/PaqueteNordico";
import PaqueteBalcanes from "@/pages/PaqueteBalcanes";
import PaqueteIberiaFrancia from "@/pages/PaqueteIberiaFrancia";
import PaqueteGranTour from "@/pages/PaqueteGranTour";
import Vuelos from "@/pages/Vuelos";
import Hoteles from "@/pages/Hoteles";
import Seguros from "@/pages/Seguros";
import Visas from "@/pages/Visas";
import Trasladados from "@/pages/Trasladados";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Privacidad from "@/pages/Privacidad";
import Terminos from "@/pages/Terminos";
import FAQ from "@/pages/FAQ";
import Sitemap from "@/pages/Sitemap";
import FromColombia from "@/pages/FromColombia";
import FromBrasil from "@/pages/FromBrasil";
import FromArgentina from "@/pages/FromArgentina";
import FromMexico from "@/pages/FromMexico";
import FromPeru from "@/pages/FromPeru";
import FromChile from "@/pages/FromChile";
import FromEcuador from "@/pages/FromEcuador";
import FromVenezuela from "@/pages/FromVenezuela";
import FromBolivia from "@/pages/FromBolivia";
import FromParaguay from "@/pages/FromParaguay";
import FromUruguay from "@/pages/FromUruguay";
import FromPanama from "@/pages/FromPanama";
import FromCostaRica from "@/pages/FromCostaRica";
import FromGuatemala from "@/pages/FromGuatemala";
import FromHonduras from "@/pages/FromHonduras";
import FromElSalvador from "@/pages/FromElSalvador";
import FromNicaragua from "@/pages/FromNicaragua";
import FromCuba from "@/pages/FromCuba";
import FromRepublicaDominicana from "@/pages/FromRepublicaDominicana";
import BlogColombia from "@/pages/BlogColombia";
import BlogBrasil from "@/pages/BlogBrasil";
import BlogArgentina from "@/pages/BlogArgentina";
import BlogPeru from "@/pages/BlogPeru";
import BlogPanama from "@/pages/BlogPanama";
import BlogCostaRica from "@/pages/BlogCostaRica";
import BlogDominicana from "@/pages/BlogDominicana";
import BlogEspana from "@/pages/BlogEspana";
import BlogFrancia from "@/pages/BlogFrancia";
import BlogItalia from "@/pages/BlogItalia";
import BlogPortugal from "@/pages/BlogPortugal";
import BlogGrecia from "@/pages/BlogGrecia";
import BlogAlemania from "@/pages/BlogAlemania";
import BlogMexico from "@/pages/BlogMexico";
import BlogMexicoEuropa from "@/pages/BlogMexicoEuropa";
import BlogChileEuropa from "@/pages/BlogChileEuropa";
import BlogEcuadorEuropa from "@/pages/BlogEcuadorEuropa";
import BlogVenezuelaEuropa from "@/pages/BlogVenezuelaEuropa";
import BlogArgentinaEuropaPt from "@/pages/BlogArgentinaEuropaPt";
import BlogBoliviaEuropa from "@/pages/BlogBoliviaEuropa";
import BlogUruguayEuropa from "@/pages/BlogUruguayEuropa";
import BlogGuatemalaEuropa from "@/pages/BlogGuatemalaEuropa";
import BlogNicaraguaEuropa from "@/pages/BlogNicaraguaEuropa";
import BlogCubaEuropa from "@/pages/BlogCubaEuropa";
import BlogPuertoRicoEuropa from "@/pages/BlogPuertoRicoEuropa";
import ColombiaToEurope2025ES from "@/pages/blog/ColombiaToEurope2025ES";
import ColombiaToEurope2025EN from "@/pages/blog/ColombiaToEurope2025EN";
import ColombiaToEurope2025PT from "@/pages/blog/ColombiaToEurope2025PT";
import BrazilToEurope2025ES from "@/pages/blog/BrazilToEurope2025ES";
import BrazilToEurope2025EN from "@/pages/blog/BrazilToEurope2025EN";
import BrazilToEurope2025PT from "@/pages/blog/BrazilToEurope2025PT";
import MexicoToEurope2025ES from "@/pages/blog/MexicoToEurope2025ES";
import MexicoToEurope2025EN from "@/pages/blog/MexicoToEurope2025EN";
import MexicoToEurope2025PT from "@/pages/blog/MexicoToEurope2025PT";
import ArgentinaToEurope2025ES from "@/pages/blog/ArgentinaToEurope2025ES";
import ArgentinaToEurope2025EN from "@/pages/blog/ArgentinaToEurope2025EN";
import ArgentinaToEurope2025PT from "@/pages/blog/ArgentinaToEurope2025PT";
import ChileToEurope2025ES from "@/pages/blog/ChileToEurope2025ES";
import ParaguayToEurope2025ES from "@/pages/blog/ParaguayToEurope2025ES";
import ParaguayToEurope2025PT from "@/pages/blog/ParaguayToEurope2025PT";
import EuropeanGastronomy2025 from "@/pages/blog/EuropeanGastronomy2025";
import ETIAS2025Guide from "@/pages/blog/ETIAS2025Guide";
import PeruToEurope2025ES from "@/pages/blog/PeruToEurope2025ES";
import PeruToEurope2025EN from "@/pages/blog/PeruToEurope2025EN";
import PeruToEurope2025PT from "@/pages/blog/PeruToEurope2025PT";
import BoliviaToEurope2025ES from "@/pages/blog/BoliviaToEurope2025ES";
import BoliviaToEurope2025EN from "@/pages/blog/BoliviaToEurope2025EN";
import BoliviaToEurope2025PT from "@/pages/blog/BoliviaToEurope2025PT";

function Router() {
return (
  <Switch>
    <Route path="/" component={Home} />
    <Route path="/destinos" component={Destinos} />
    <Route path="/paquetes" component={Paquetes} />
    <Route path="/nosotros" component={Nosotros} />
    <Route path="/contacto" component={Contacto} />
    <Route path="/destinos/:id" component={DestinoDetalle} />
    <Route path="/paquetes/:id" component={PaqueteDetalle} />
    <Route path="/destinos/francia" component={Francia} />
    <Route path="/destinos/italia" component={Italia} />
    <Route path="/destinos/espana" component={Espana} />
    <Route path="/destinos/grecia" component={Grecia} />
    <Route path="/destinos/portugal" component={Portugal} />
    <Route path="/destinos/alemania" component={Alemania} />
    <Route path="/destinos/paises-nordicos" component={PaisesNordicos} />
    <Route path="/destinos/europa-oriental" component={EuropaOriental} />
    <Route path="/destinos/croacia" component={Croacia} />
    <Route path="/destinos/suiza" component={Suiza} />
    <Route path="/paquetes/europa-clasica" component={PaqueteEuropaClasica} />
    <Route path="/paquetes/mediterraneo" component={PaqueteMediterraneo} />
    <Route path="/paquetes/nordico" component={PaqueteNordico} />
    <Route path="/paquetes/balcanes" component={PaqueteBalcanes} />
    <Route path="/paquetes/iberia-francia" component={PaqueteIberiaFrancia} />
    <Route path="/paquetes/gran-tour" component={PaqueteGranTour} />
    <Route path="/servicios/vuelos" component={Vuelos} />
    <Route path="/servicios/hoteles" component={Hoteles} />
    <Route path="/servicios/seguros" component={Seguros} />
    <Route path="/servicios/visas" component={Visas} />
    <Route path="/servicios/trasladados" component={Trasladados} />
    <Route path="/blog" component={Blog} />
    <Route path="/blog/:slug" component={BlogPost} />
    <Route path="/privacidad" component={Privacidad} />
    <Route path="/terminos" component={Terminos} />
    <Route path="/faq" component={FAQ} />
    <Route path="/sitemap" component={Sitemap} />
    <Route path="/desde/colombia" component={FromColombia} />
    <Route path="/desde/brasil" component={FromBrasil} />
    <Route path="/desde/argentina" component={FromArgentina} />
    <Route path="/desde/mexico" component={FromMexico} />
    <Route path="/desde/peru" component={FromPeru} />
    <Route path="/desde/chile" component={FromChile} />
    <Route path="/desde/ecuador" component={FromEcuador} />
    <Route path="/desde/venezuela" component={FromVenezuela} />
    <Route path="/desde/bolivia" component={FromBolivia} />
    <Route path="/desde/paraguay" component={FromParaguay} />
    <Route path="/desde/uruguay" component={FromUruguay} />
    <Route path="/desde/panama" component={FromPanama} />
    <Route path="/desde/costa-rica" component={FromCostaRica} />
    <Route path="/desde/guatemala" component={FromGuatemala} />
    <Route path="/desde/honduras" component={FromHonduras} />
    <Route path="/desde/el-salvador" component={FromElSalvador} />
    <Route path="/desde/nicaragua" component={FromNicaragua} />
    <Route path="/desde/cuba" component={FromCuba} />
    <Route path="/desde/republica-dominicana" component={FromRepublicaDominicana} />
    <Route path="/blog/espana" component={BlogEspana} />
    <Route path="/blog/francia" component={BlogFrancia} />
    <Route path="/blog/italia" component={BlogItalia} />
    <Route path="/blog/portugal" component={BlogPortugal} />
    <Route path="/blog/grecia" component={BlogGrecia} />
    <Route path="/blog/alemania" component={BlogAlemania} />
    <Route path="/blog/colombia" component={BlogColombia} />
    <Route path="/blog/mexico" component={BlogMexico} />
    <Route path="/blog/argentina" component={BlogArgentina} />
    <Route path="/blog/brasil" component={BlogBrasil} />
    <Route path="/blog/colombia-europa" component={BlogColombia} />
    <Route path="/blog/brasil-europa" component={BlogBrasil} />
    <Route path="/blog/colombia-europa-pt" component={BlogColombia} />
    <Route path="/blog/argentina-europa" component={BlogArgentina} />
    <Route path="/blog/peru-europa" component={BlogPeru} />
    <Route path="/blog/panama-europa" component={BlogPanama} />
    <Route path="/blog/costa-rica-europa" component={BlogCostaRica} />
    <Route path="/blog/dominicana-europa" component={BlogDominicana} />
    <Route path="/blog/mexico-europa" component={BlogMexicoEuropa} />
    <Route path="/blog/chile-europa" component={BlogChileEuropa} />
    <Route path="/blog/ecuador-europa" component={BlogEcuadorEuropa} />
    <Route path="/blog/venezuela-europa" component={BlogVenezuelaEuropa} />
    <Route path="/blog/argentina-europa-pt" component={BlogArgentinaEuropaPt} />
    <Route path="/blog/bolivia-europa" component={BlogBoliviaEuropa} />
    <Route path="/blog/uruguay-europa" component={BlogUruguayEuropa} />
    <Route path="/blog/guatemala-europa" component={BlogGuatemalaEuropa} />
    <Route path="/blog/nicaragua-europa" component={BlogNicaraguaEuropa} />
    <Route path="/blog/cuba-europa" component={BlogCubaEuropa} />
    <Route path="/blog/puerto-rico-europa" component={BlogPuertoRicoEuropa} />
    <Route path="/blog/colombia-europa-2025-es" component={ColombiaToEurope2025ES} />
    <Route path="/blog/colombia-europe-2025" component={ColombiaToEurope2025EN} />
    <Route path="/blog/colombia-europa-2025-pt" component={ColombiaToEurope2025PT} />
    <Route path="/blog/brasil-europa-2025-es" component={BrazilToEurope2025ES} />
    <Route path="/blog/brazil-europe-2025" component={BrazilToEurope2025EN} />
    <Route path="/blog/brasil-europa-2025-pt" component={BrazilToEurope2025PT} />
    <Route path="/blog/mexico-europa-2025-es" component={MexicoToEurope2025ES} />
    <Route path="/blog/mexico-europe-2025" component={MexicoToEurope2025EN} />
    <Route path="/blog/mexico-europa-2025-pt" component={MexicoToEurope2025PT} />
    <Route path="/blog/argentina-europa-2025-es" component={ArgentinaToEurope2025ES} />
    <Route path="/blog/argentina-europe-2025" component={ArgentinaToEurope2025EN} />
    <Route path="/blog/argentina-europa-2025-pt" component={ArgentinaToEurope2025PT} />
    <Route path="/blog/chile-europa-2025-es" component={ChileToEurope2025ES} />
    <Route path="/blog/paraguay-europa-2025-es" component={ParaguayToEurope2025ES} />
    <Route path="/blog/paraguay-europa-2025-pt" component={ParaguayToEurope2025PT} />
    <Route path="/blog/gastronomia-europea-2025" component={EuropeanGastronomy2025} />
    <Route path="/blog/etias-2025-guide" component={ETIAS2025Guide} />
    <Route path="/blog/peru-europa-2025-es" component={PeruToEurope2025ES} />
    <Route path="/blog/peru-europe-2025" component={PeruToEurope2025EN} />
    <Route path="/blog/peru-europa-2025-pt" component={PeruToEurope2025PT} />
    <Route path="/blog/bolivia-europa-2025-es" component={BoliviaToEurope2025ES} />
    <Route path="/blog/bolivia-europe-2025" component={BoliviaToEurope2025EN} />
    <Route path="/blog/bolivia-europa-2025-pt" component={BoliviaToEurope2025PT} />
    <Route component={NotFound} />
  </Switch>
);
}

function App() {
return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  </QueryClientProvider>
);
}

export default App;

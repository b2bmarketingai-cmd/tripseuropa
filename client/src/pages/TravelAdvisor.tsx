import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";
import logoPath from "@assets/erasebg-transformed_(2)_1767029138652.png";

export default function TravelAdvisor() {
  const { language } = useI18n();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"traveler" | "agent">("agent");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const content = {
    es: {
      pageTitle: "Portal de Agentes de Viajes",
      welcomeTraveler: "Bienvenido viajero",
      welcomeAgent: "Bienvenido agente de viajes",
      travelerTab: "Viajero",
      agentTab: "Agente de Viajes",
      agentDescription: "Ofrece a tus clientes paquetes de viaje inolvidables a precios competitivos.",
      travelerDescription: "Accede a tu cuenta para gestionar tus reservas y ver ofertas exclusivas.",
      email: "Correo electronico",
      password: "Contrasena",
      login: "Iniciar Sesion",
      loggingIn: "Iniciando...",
      forgotPassword: "Olvidaste tu contrasena?",
      noAccount: "No tienes cuenta?",
      register: "Registrarse",
      backHome: "Volver al inicio",
      quote: "La unica diferencia entre un buen dia y un mal dia es tu actitud.",
      rights: "Todos los derechos reservados.",
      loginSuccess: "Inicio de sesion exitoso",
      loginError: "Credenciales invalidas",
    },
    en: {
      pageTitle: "Travel Agent Portal",
      welcomeTraveler: "Welcome traveler",
      welcomeAgent: "Welcome travel advisor",
      travelerTab: "Traveler",
      agentTab: "Travel Agent",
      agentDescription: "Offer your clients unforgettable travel packages at competitive prices.",
      travelerDescription: "Access your account to manage your bookings and see exclusive offers.",
      email: "Email",
      password: "Password",
      login: "Login",
      loggingIn: "Logging in...",
      forgotPassword: "Forgot your password?",
      noAccount: "Don't have an account?",
      register: "Register",
      backHome: "Back to home",
      quote: "The only difference between a good day and a bad day is your attitude.",
      rights: "All rights reserved.",
      loginSuccess: "Login successful",
      loginError: "Invalid credentials",
    },
  };

  const c = content[language as "es" | "en"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast({
      title: c.loginSuccess,
    });
  };

  return (
    <div className="min-h-screen flex" data-testid="page-travel-advisor">
      <SEOHead 
        title={`${c.pageTitle} | Trips Europa`}
        description={c.agentDescription}
        url="/travel-advisor"
      />
      
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1504681869696-d977211a5f4c?q=80&w=1200&auto=format&fit=crop"
          alt="Travel advisor"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 right-12">
          <blockquote className="text-2xl md:text-3xl font-display text-white italic">
            "{c.quote}"
          </blockquote>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="p-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4" />
              {c.backHome}
            </Button>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-md border-0 shadow-none">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <img 
                  src={logoPath} 
                  alt="Trips Europa" 
                  className="h-12 mx-auto mb-6"
                  data-testid="img-logo"
                />
                <h1 className="text-2xl font-display font-bold text-foreground mb-2">
                  {activeTab === "agent" ? c.welcomeAgent : c.welcomeTraveler}
                </h1>
              </div>

              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "traveler" | "agent")} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="traveler" data-testid="tab-traveler">{c.travelerTab}</TabsTrigger>
                  <TabsTrigger value="agent" data-testid="tab-agent">{c.agentTab}</TabsTrigger>
                </TabsList>
                <TabsContent value="traveler" className="mt-4">
                  <p className="text-sm text-muted-foreground text-center">{c.travelerDescription}</p>
                </TabsContent>
                <TabsContent value="agent" className="mt-4">
                  <p className="text-sm text-muted-foreground text-center">{c.agentDescription}</p>
                </TabsContent>
              </Tabs>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{c.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                    data-testid="input-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{c.password}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="h-12 pr-12"
                      data-testid="input-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground font-bold"
                  disabled={isLoading}
                  data-testid="button-login"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {c.loggingIn}
                    </>
                  ) : (
                    c.login
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center space-y-4">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground underline" data-testid="link-forgot-password">
                  {c.forgotPassword}
                </a>
                <div className="text-sm text-muted-foreground">
                  {c.noAccount}{" "}
                  <Link href="/contact">
                    <span className="font-medium text-foreground hover:text-accent underline" data-testid="link-register">
                      {c.register}
                    </span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="p-6 text-center text-sm text-muted-foreground">
          Trips Europa {new Date().getFullYear()}. {c.rights}
        </div>
      </div>
    </div>
  );
}

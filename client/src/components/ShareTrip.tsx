import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share2, Facebook, Linkedin, Link, Check, MessageCircle } from "lucide-react";
import { SiX } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";

interface ShareTripProps {
  origin: string;
  destination: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: number;
  tripType?: "roundtrip" | "oneway";
  variant?: "button" | "icon";
  className?: string;
}

export function ShareTrip({
  origin,
  destination,
  departureDate,
  returnDate,
  passengers = 1,
  tripType = "roundtrip",
  variant = "button",
  className = "",
}: ShareTripProps) {
  const { language } = useI18n();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    es: {
      share: "Compartir Viaje",
      shareTitle: "Compartir mi viaje",
      shareDesc: "Comparte tu proximo viaje a Europa con amigos y familia",
      facebook: "Facebook",
      twitter: "X (Twitter)",
      whatsapp: "WhatsApp",
      linkedin: "LinkedIn",
      copyLink: "Copiar enlace",
      copied: "Copiado",
      tripMessage: `Estoy planeando mi viaje de ${origin} a ${destination}`,
      fullMessage: `Estoy planeando mi viaje de ${origin} a ${destination}${departureDate ? ` el ${departureDate}` : ""}${returnDate && tripType === "roundtrip" ? ` con regreso el ${returnDate}` : ""}. ${passengers > 1 ? `Viajamos ${passengers} personas.` : ""} Reservado con Trips Europa - tu agencia de viajes de confianza para Europa.`,
    },
    en: {
      share: "Share Trip",
      shareTitle: "Share my trip",
      shareDesc: "Share your upcoming European trip with friends and family",
      facebook: "Facebook",
      twitter: "X (Twitter)",
      whatsapp: "WhatsApp",
      linkedin: "LinkedIn",
      copyLink: "Copy link",
      copied: "Copied",
      tripMessage: `I'm planning my trip from ${origin} to ${destination}`,
      fullMessage: `I'm planning my trip from ${origin} to ${destination}${departureDate ? ` on ${departureDate}` : ""}${returnDate && tripType === "roundtrip" ? ` returning on ${returnDate}` : ""}. ${passengers > 1 ? `We're ${passengers} travelers.` : ""} Booked with Trips Europa - your trusted travel agency for Europe.`,
    },
    pt: {
      share: "Compartilhar Viagem",
      shareTitle: "Compartilhar minha viagem",
      shareDesc: "Compartilhe sua proxima viagem a Europa com amigos e familia",
      facebook: "Facebook",
      twitter: "X (Twitter)",
      whatsapp: "WhatsApp",
      linkedin: "LinkedIn",
      copyLink: "Copiar link",
      copied: "Copiado",
      tripMessage: `Estou planejando minha viagem de ${origin} para ${destination}`,
      fullMessage: `Estou planejando minha viagem de ${origin} para ${destination}${departureDate ? ` em ${departureDate}` : ""}${returnDate && tripType === "roundtrip" ? ` com retorno em ${returnDate}` : ""}. ${passengers > 1 ? `Somos ${passengers} viajantes.` : ""} Reservado com Trips Europa - sua agencia de viagens de confianca para a Europa.`,
    },
  };

  const c = content[language as keyof typeof content] || content.es;

  const websiteUrl = typeof window !== "undefined" ? window.location.origin : "https://tripseuropa.com";
  const shareUrl = `${websiteUrl}?ref=share`;
  const encodedMessage = encodeURIComponent(c.fullMessage);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedMessage}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedMessage}&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedMessage}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${c.fullMessage}\n\n${shareUrl}`);
      setCopied(true);
      toast({
        title: c.copied,
        description: language === "es" ? "El enlace ha sido copiado" : "Link has been copied",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Error",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {variant === "icon" ? (
          <Button
            variant="outline"
            size="icon"
            className={className}
            data-testid="button-share-trip-icon"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="outline"
            className={`gap-2 ${className}`}
            data-testid="button-share-trip"
          >
            <Share2 className="h-4 w-4" />
            {c.share}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-accent" />
            {c.shareTitle}
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">{c.shareDesc}</p>

        <div className="bg-accent/10 rounded-lg p-4 mb-4">
          <p className="text-sm font-medium text-foreground">{c.tripMessage}</p>
          {departureDate && (
            <p className="text-xs text-muted-foreground mt-1">
              {departureDate}
              {returnDate && tripType === "roundtrip" && ` - ${returnDate}`}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-12 gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-0"
            onClick={() => handleShare("facebook")}
            data-testid="button-share-facebook"
          >
            <Facebook className="h-5 w-5" />
            {c.facebook}
          </Button>

          <Button
            variant="outline"
            className="h-12 gap-2 bg-black hover:bg-black/90 text-white border-0"
            onClick={() => handleShare("twitter")}
            data-testid="button-share-twitter"
          >
            <SiX className="h-4 w-4" />
            {c.twitter}
          </Button>

          <Button
            variant="outline"
            className="h-12 gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white border-0"
            onClick={() => handleShare("whatsapp")}
            data-testid="button-share-whatsapp"
          >
            <MessageCircle className="h-5 w-5" />
            {c.whatsapp}
          </Button>

          <Button
            variant="outline"
            className="h-12 gap-2 bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white border-0"
            onClick={() => handleShare("linkedin")}
            data-testid="button-share-linkedin"
          >
            <Linkedin className="h-5 w-5" />
            {c.linkedin}
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button
            variant="secondary"
            className="w-full h-12 gap-2"
            onClick={handleCopyLink}
            data-testid="button-copy-share-link"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                {c.copied}
              </>
            ) : (
              <>
                <Link className="h-4 w-4" />
                {c.copyLink}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

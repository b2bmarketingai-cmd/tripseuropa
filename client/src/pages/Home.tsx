import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FlightSearch } from "@/components/FlightSearch";
import { Chatbot } from "@/components/Chatbot";
import { ContactForm, ContactInfo } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowRight, Star, Plane, Hotel, Users, Award, CheckCircle, Quote,
  Car, Smartphone, Shield, MapPin, Truck, Tag, Clock, Send, MessageCircle,
  HeadphonesIcon, Briefcase, UserCheck, Compass
} from "lucide-react";
import { SiVisa, SiMastercard, SiBinance } from "react-icons/si";
import { Link } from "wouter";

// Optimized images with responsive sizes
const HERO_IMAGE = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1920&auto=format&fit=crop";
const HERO_IMAGE_SM = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=75&w=768&auto=format&fit=crop";
const HERO_IMAGE_MD = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1280&auto=format&fit=crop";
const DESTINATION_PARIS = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=800&auto=format&fit=crop";
const DESTINATION_ROME = "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=70&w=800&auto=format&fit=crop";
const DESTINATION_BARCELONA = "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=70&w=800&auto=format&fit=crop";
const DESTINATION_SANTORINI = "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=70&w=800&auto=format&fit=crop";
const DESTINATION_AMSTERDAM = "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=70&w=800&auto=format&fit=crop";
const DESTINATION_LONDON = "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=70&w=800&auto=format&fit=crop";

const PACKAGE_ROMANTIC = "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=70&w=800&auto=format&fit=crop";
const PACKAGE_ADVENTURE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=70&w=800&auto=format&fit=crop";
const PACKAGE_CULTURAL = "https://images.unsplash.com/photo-1541849546-216549ae216d?q=70&w=800&auto=format&fit=crop";

const TESTIMONIAL_BG = "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=60&w=1000&auto=format&fit=crop";

// Blog images - smaller for thumbnails
const BLOG_VISA = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=70&w=400&auto=format&fit=crop";
const BLOG_PARIS = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=70&w=400&auto=format&fit=crop";
const BLOG_MADRID = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=70&w=400&auto=format&fit=crop";
const BLOG_ROME = "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=70&w=400&auto=format&fit=crop";

export default function Home() {
  const { t, language } = useI18n();
  
  const destinations = [
    { image: DESTINATION_PARIS, titleKey: "dest.paris", countryKey: "country.france", price: language === "es" ? "Desde $4,299,000" : "From $4,299", rating: 4.9, days: 7 },
    { image: DESTINATION_ROME, titleKey: "dest.rome", countryKey: "country.italy", price: language === "es" ? "Desde $3,899,000" : "From $3,899", rating: 4.8, days: 6 },
    { image: DESTINATION_BARCELONA, titleKey: "dest.barcelona", countryKey: "country.spain", price: language === "es" ? "Desde $3,499,000" : "From $3,499", rating: 4.9, days: 5 },
    { image: DESTINATION_SANTORINI, titleKey: "dest.santorini", countryKey: "country.greece", price: language === "es" ? "Desde $5,199,000" : "From $5,199", rating: 4.9, days: 8 },
    { image: DESTINATION_AMSTERDAM, titleKey: "dest.amsterdam", countryKey: "country.netherlands", price: language === "es" ? "Desde $3,799,000" : "From $3,799", rating: 4.7, days: 5 },
    { image: DESTINATION_LONDON, titleKey: "dest.london", countryKey: "country.england", price: language === "es" ? "Desde $4,099,000" : "From $4,099", rating: 4.8, days: 6 },
  ];

  const packages = [
    {
      image: PACKAGE_ROMANTIC,
      titleKey: "pkg.honeymoon.title",
      descriptionKey: "pkg.honeymoon.desc",
      price: language === "es" ? "$12,500,000" : "$12,500",
      featureKeys: ["pkg.feature.flights", "pkg.feature.hotels5", "pkg.feature.transfers", "pkg.feature.tours"],
      tagKey: "pkg.tag.romantic",
    },
    {
      image: PACKAGE_ADVENTURE,
      titleKey: "pkg.adventure.title",
      descriptionKey: "pkg.adventure.desc",
      price: language === "es" ? "$9,800,000" : "$9,800",
      featureKeys: ["pkg.feature.swissPass", "pkg.feature.mountainHotels", "pkg.feature.cableCars", "pkg.feature.localGuide"],
      tagKey: "pkg.tag.adventure",
      featured: true,
    },
    {
      image: PACKAGE_CULTURAL,
      titleKey: "pkg.cultural.title",
      descriptionKey: "pkg.cultural.desc",
      price: language === "es" ? "$10,200,000" : "$10,200",
      featureKeys: ["pkg.feature.flightsTrain", "pkg.feature.centralHotels", "pkg.feature.concerts", "pkg.feature.guidedTours"],
      tagKey: "pkg.tag.cultural",
    },
  ];

  const testimonials = [
    { nameKey: "testimonial.1.name", locationKey: "testimonial.1.location", tripKey: "testimonial.1.trip", tripLabelKey: "testimonial.1.tripLabel", textKey: "testimonial.1.text", rating: 5 },
    { nameKey: "testimonial.2.name", locationKey: "testimonial.2.location", tripKey: "testimonial.2.trip", tripLabelKey: "testimonial.2.tripLabel", textKey: "testimonial.2.text", rating: 5 },
    { nameKey: "testimonial.3.name", locationKey: "testimonial.3.location", tripKey: "testimonial.3.trip", tripLabelKey: "testimonial.3.tripLabel", textKey: "testimonial.3.text", rating: 5 },
  ];

  const services = [
    { icon: Plane, titleKey: "services.directFlights", descKey: "services.directFlightsDesc" },
    { icon: Hotel, titleKey: "services.boutiqueHotels", descKey: "services.boutiqueHotelsDesc" },
    { icon: Car, titleKey: "services.carRental", descKey: "services.carRentalDesc" },
    { icon: Smartphone, titleKey: "services.esim", descKey: "services.esimDesc" },
    { icon: Shield, titleKey: "services.vipInsurance", descKey: "services.vipInsuranceDesc" },
    { icon: MapPin, titleKey: "services.privateTours", descKey: "services.privateToursDesc" },
    { icon: Truck, titleKey: "services.vipTransfers", descKey: "services.vipTransfersDesc" },
    { icon: Tag, titleKey: "services.exclusiveOffers", descKey: "services.exclusiveOffersDesc" },
  ];

  const blogArticles = [
    { image: BLOG_VISA, titleKey: "blog.article1.title", descKey: "blog.article1.desc", categoryKey: "blog.article1.category", date: "28 Dic 2024", readTime: 8 },
    { image: BLOG_PARIS, titleKey: "blog.article2.title", descKey: "blog.article2.desc", categoryKey: "blog.article2.category", date: "25 Dic 2024", readTime: 6 },
    { image: BLOG_MADRID, titleKey: "blog.article3.title", descKey: "blog.article3.desc", categoryKey: "blog.article3.category", date: "22 Dic 2024", readTime: 7 },
    { image: BLOG_ROME, titleKey: "blog.article4.title", descKey: "blog.article4.desc", categoryKey: "blog.article4.category", date: "20 Dic 2024", readTime: 5 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Hero Section with Contact Form */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" data-testid="section-hero">
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMAGE} 
            srcSet={`${HERO_IMAGE_SM} 768w, ${HERO_IMAGE_MD} 1280w, ${HERO_IMAGE} 1920w`}
            sizes="100vw"
            alt={t("hero.badge")} 
            className="w-full h-full object-cover" 
            loading="eager" 
            fetchPriority="high" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-primary/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/40"></div>
        </div>

        <div className="container relative z-10 px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <Badge className="bg-accent/20 text-accent border-accent/30 backdrop-blur-sm text-sm px-4 py-1" data-testid="badge-hero">
                {t("hero.badge")}
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight animate-fade-in" data-testid="text-hero-title">
                {t("hero.title1")} <span className="text-accent italic">{t("hero.titleHighlight")}</span> {t("hero.title2")}
              </h1>
              
              <p className="text-xl md:text-2xl text-white/80 max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }} data-testid="text-hero-subtitle">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-wrap gap-6 pt-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <StatItem icon={<Award className="w-6 h-6 text-accent" />} value={t("hero.years")} label={t("hero.experience")} testId="text-stat-years" />
                <StatItem icon={<Users className="w-6 h-6 text-accent" />} value={t("hero.travelers")} label={t("hero.happyTravelers")} testId="text-stat-travelers" />
                <StatItem icon={<Star className="w-6 h-6 text-accent fill-accent" />} value={t("hero.satisfaction")} label={t("hero.rating")} testId="text-stat-rating" />
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <ContactForm variant="hero" title={t("contact.title")} subtitle={t("contact.subtitle")} />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" data-testid="scroll-indicator">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Flight Search */}
      <section className="relative z-20 py-8 -mt-20" data-testid="section-search">
        <FlightSearch />
      </section>

      {/* Services Section (8 services) */}
      <section className="py-24 bg-white" data-testid="section-services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" data-testid="badge-services">{t("services.badge")}</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4" data-testid="text-services-title">
              {t("services.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-services-subtitle">
              {t("services.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} icon={<service.icon className="w-7 h-7" />} title={t(service.titleKey)} description={t(service.descKey)} testId={`card-service-${index}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 bg-gray-50" data-testid="section-destinations">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <Badge className="mb-4" data-testid="badge-destinations">{t("destinations.badge")}</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary" data-testid="text-destinations-title">{t("destinations.title")}</h2>
              <p className="text-muted-foreground mt-2 max-w-xl" data-testid="text-destinations-subtitle">{t("destinations.subtitle")}</p>
            </div>
            <Link href="/destinations">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-destinations">
                {t("destinations.viewAll")} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <DestinationCard key={index} image={dest.image} title={t(dest.titleKey)} country={t(dest.countryKey)} price={dest.price} rating={dest.rating} days={dest.days} daysLabel={t("destinations.days")} viewMoreLabel={t("destinations.viewMore")} testId={`card-destination-${index}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-24 bg-white" data-testid="section-packages">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" data-testid="badge-packages">{t("packages.badge")}</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4" data-testid="text-packages-title">{t("packages.title")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-packages-subtitle">{t("packages.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <PackageCard key={index} image={pkg.image} title={t(pkg.titleKey)} description={t(pkg.descriptionKey)} price={pkg.price} features={pkg.featureKeys.map(key => t(key))} tag={t(pkg.tagKey)} featured={pkg.featured} perPersonLabel={t("packages.perPerson")} quoteLabel={t("packages.quote")} bestSellerLabel={t("packages.bestSeller")} fromLabel={t("destinations.from")} testId={`card-package-${index}`} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/packages">
              <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90 px-8" data-testid="button-view-all-packages">
                {t("packages.viewAll")} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-gray-50" data-testid="section-blog">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <Badge className="mb-4" data-testid="badge-blog">{t("blog.badge")}</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary" data-testid="text-blog-title">{t("blog.title")}</h2>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-blog">
                {t("blog.viewAll")} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogArticles.map((article, index) => (
              <BlogCard key={index} image={article.image} title={t(article.titleKey)} description={t(article.descKey)} category={t(article.categoryKey)} date={article.date} readTime={article.readTime} minLabel={t("blog.minRead")} readMoreLabel={t("blog.readMore")} testId={`card-blog-${index}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary relative overflow-hidden" data-testid="section-testimonials">
        <div className="absolute inset-0 opacity-10">
          <img src={TESTIMONIAL_BG} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-testimonials">{t("testimonials.badge")}</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4" data-testid="text-testimonials-title">{t("testimonials.title")}</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto" data-testid="text-testimonials-subtitle">{t("testimonials.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} name={t(testimonial.nameKey)} location={t(testimonial.locationKey)} trip={t(testimonial.tripKey)} tripLabel={t(testimonial.tripLabelKey)} text={t(testimonial.textKey)} rating={testimonial.rating} testId={`card-testimonial-${index}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50" data-testid="section-process">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" data-testid="badge-process">{t("process.badge")}</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4" data-testid="text-process-title">{t("process.title")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProcessStep number={1} title={t("process.step1.title")} description={t("process.step1.desc")} testId="step-process-1" />
            <ProcessStep number={2} title={t("process.step2.title")} description={t("process.step2.desc")} testId="step-process-2" />
            <ProcessStep number={3} title={t("process.step3.title")} description={t("process.step3.desc")} testId="step-process-3" />
            <ProcessStep number={4} title={t("process.step4.title")} description={t("process.step4.desc")} isLast testId="step-process-4" />
          </div>
        </div>
      </section>

      {/* Complete Your Trip Section */}
      <CompleteYourTripSection />

      {/* Strategic Alliances Section */}
      <AlliancesSection />

      {/* VIP Club Section */}
      <VIPClubSection />

      {/* Final CTA with Contact Form */}
      <section className="py-24 bg-white" data-testid="section-cta">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4" data-testid="badge-cta">{t("cta.badge")}</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6" data-testid="text-cta-title">
                {t("cta.title")} <span className="text-accent">{t("cta.titleHighlight")}</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-8" data-testid="text-cta-subtitle">{t("cta.subtitle")}</p>
              <ContactInfo />
            </div>
            <div>
              <ContactForm variant="page" title={t("cta.formTitle")} subtitle={t("cta.formSubtitle")} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
      <WhatsAppButton />
    </div>
  );
}

function StatItem({ icon, value, label, testId }: { icon: React.ReactNode, value: string, label: string, testId: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">{icon}</div>
      <div>
        <div className="font-bold text-lg" data-testid={testId}>{value}</div>
        <div className="text-white/60 text-sm">{label}</div>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, description, testId }: { icon: React.ReactNode, title: string, description: string, testId: string }) {
  return (
    <div className="p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group border border-gray-100 text-center" data-testid={testId}>
      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 text-accent group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-lg font-bold text-primary mb-2 font-display">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function DestinationCard({ image, title, country, price, rating, days, daysLabel, viewMoreLabel, testId }: { image: string, title: string, country: string, price: string, rating: number, days: number, daysLabel: string, viewMoreLabel: string, testId: string }) {
  return (
    <div className="group rounded-2xl overflow-hidden relative aspect-[4/5] cursor-pointer" data-testid={testId}>
      <img src={image} alt={`${title}, ${country}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent"></div>
      <div className="absolute top-4 left-4"><Badge className="bg-white/90 text-primary backdrop-blur-sm">{days} {daysLabel}</Badge></div>
      <div className="absolute bottom-0 left-0 w-full p-6 text-white">
        <div className="flex items-center gap-1 mb-2"><Star className="w-4 h-4 text-accent fill-accent" /><span className="text-sm font-bold">{rating}</span></div>
        <h3 className="text-2xl font-bold font-display">{title}</h3>
        <p className="text-white/70 text-sm mb-3">{country}</p>
        <div className="flex justify-between items-center gap-4">
          <span className="text-accent font-bold text-lg">{price}</span>
          <Button size="sm" className="bg-white text-primary hover:bg-accent hover:text-primary font-bold opacity-0 group-hover:opacity-100 transition-all duration-300" data-testid={`${testId}-button`}>{viewMoreLabel}</Button>
        </div>
      </div>
    </div>
  );
}

function PackageCard({ image, title, description, price, features, tag, featured, perPersonLabel, quoteLabel, bestSellerLabel, fromLabel, testId }: { image: string, title: string, description: string, price: string, features: string[], tag: string, featured?: boolean, perPersonLabel: string, quoteLabel: string, bestSellerLabel: string, fromLabel: string, testId: string }) {
  return (
    <Card className={`overflow-hidden group ${featured ? "ring-2 ring-accent shadow-xl" : ""}`} data-testid={testId}>
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <Badge className="absolute top-4 left-4 bg-accent text-primary">{tag}</Badge>
        {featured && <Badge className="absolute top-4 right-4 bg-primary text-white">{bestSellerLabel}</Badge>}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold font-display text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        <div className="space-y-2 mb-6">
          {features.map((feature, i) => (<div key={i} className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-accent" /><span>{feature}</span></div>))}
        </div>
        <div className="flex items-center justify-between pt-4 border-t gap-4">
          <div>
            <span className="text-sm text-muted-foreground">{fromLabel}</span>
            <div className="text-2xl font-bold text-primary">{price}</div>
            <span className="text-xs text-muted-foreground">{perPersonLabel}</span>
          </div>
          <Button className="bg-accent text-primary font-bold hover:bg-accent/90" data-testid={`${testId}-button`}>{quoteLabel}</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function BlogCard({ image, title, description, category, date, readTime, minLabel, readMoreLabel, testId }: { image: string, title: string, description: string, category: string, date: string, readTime: number, minLabel: string, readMoreLabel: string, testId: string }) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300" data-testid={testId}>
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" data-testid={`${testId}-image`} />
        <Badge className="absolute top-4 left-4 bg-accent text-primary" data-testid={`${testId}-category`}>{category}</Badge>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span data-testid={`${testId}-date`}>{date}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
          <span className="flex items-center gap-1" data-testid={`${testId}-readtime`}><Clock className="w-3 h-3" />{readTime} {minLabel}</span>
        </div>
        <h3 className="font-bold text-primary mb-2 font-display line-clamp-2 group-hover:text-accent transition-colors" data-testid={`${testId}-title`}>{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4" data-testid={`${testId}-desc`}>{description}</p>
        <Link href="/blog" className="text-accent font-semibold text-sm hover:underline flex items-center gap-1" data-testid={`${testId}-link`}>
          {readMoreLabel} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function TestimonialCard({ name, location, trip, tripLabel, text, rating, testId }: { name: string, location: string, trip: string, tripLabel: string, text: string, rating: number, testId: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10" data-testid={testId}>
      <Quote className="w-10 h-10 text-accent mb-4" />
      <p className="text-white/90 leading-relaxed mb-6" data-testid={`${testId}-text`}>{text}</p>
      <div className="flex items-center gap-1 mb-4">{Array.from({ length: rating }).map((_, i) => (<Star key={i} className="w-4 h-4 text-accent fill-accent" />))}</div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-bold text-white" data-testid={`${testId}-name`}>{name}</div>
          <div className="text-white/60 text-sm" data-testid={`${testId}-location`}>{location}</div>
        </div>
        <div className="text-right">
          <div className="text-white/50 text-xs">{tripLabel}</div>
          <div className="text-accent font-semibold text-sm" data-testid={`${testId}-trip`}>{trip}</div>
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ number, title, description, isLast, testId }: { number: number, title: string, description: string, isLast?: boolean, testId: string }) {
  return (
    <div className="text-center relative" data-testid={testId}>
      <div className="w-16 h-16 rounded-full bg-accent text-primary font-bold text-2xl flex items-center justify-center mx-auto mb-6 font-display">{number}</div>
      <h3 className="text-xl font-bold text-primary mb-2 font-display">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      {!isLast && (<div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-accent/20"><ArrowRight className="absolute -right-2 -top-2 w-5 h-5 text-accent" /></div>)}
    </div>
  );
}

function VIPClubSection() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate subscription
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: t("vipClub.success"), description: t("vipClub.successDesc") });
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10" data-testid="section-vipclub">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 bg-accent text-primary" data-testid="badge-vipclub">{t("vipClub.badge")}</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4" data-testid="text-vipclub-title">{t("vipClub.title")}</h2>
          <p className="text-muted-foreground mb-2" data-testid="text-vipclub-subtitle">{t("vipClub.subtitle")}</p>
          <p className="text-accent font-semibold mb-6" data-testid="text-vipclub-discount">{t("vipClub.discount")}</p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder={t("vipClub.placeholder")} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-white"
              required
              data-testid="input-vipclub-email"
            />
            <Button type="submit" className="h-12 bg-accent text-primary font-bold hover:bg-accent/90 px-8" disabled={isSubmitting} data-testid="button-vipclub-subscribe">
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2"><Send className="w-4 h-4" />{t("vipClub.button")}</span>
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4" data-testid="text-vipclub-nospam">{t("vipClub.noSpam")}</p>
        </div>
      </div>
    </section>
  );
}

function CompleteYourTripSection() {
  const { t } = useI18n();
  
  const features = [
    {
      icon: <UserCheck className="w-8 h-8" />,
      titleKey: "completeTrip.advisor.title",
      descKey: "completeTrip.advisor.desc",
    },
    {
      icon: <Compass className="w-8 h-8" />,
      titleKey: "completeTrip.complete.title",
      descKey: "completeTrip.complete.desc",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      titleKey: "completeTrip.insurance.title",
      descKey: "completeTrip.insurance.desc",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      titleKey: "completeTrip.support.title",
      descKey: "completeTrip.support.desc",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden" data-testid="section-complete-trip">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4" data-testid="badge-complete-trip">{t("completeTrip.badge")}</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6" data-testid="text-complete-trip-title">{t("completeTrip.title")}</h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed" data-testid="text-complete-trip-subtitle">{t("completeTrip.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300 group" data-testid={`card-complete-feature-${idx}`}>
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-display">{t(feature.titleKey)}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{t(feature.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-accent/20 border border-accent/30 rounded-full px-6 py-3">
            <Briefcase className="w-5 h-5 text-accent" />
            <span className="text-white font-medium">{t("completeTrip.luggage")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function AlliancesSection() {
  const { t } = useI18n();
  
  const alliances = [
    { name: "Avianca", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Avianca_Logo.svg/200px-Avianca_Logo.svg.png" },
    { name: "Iberia", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Iberia_Logo.svg/200px-Iberia_Logo.svg.png" },
    { name: "Air Europa", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Air_Europa_logo.svg/200px-Air_Europa_logo.svg.png" },
    { name: "Booking.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/200px-Booking.com_logo.svg.png" },
    { name: "Civitatis", logo: "https://www.civitatis.com/f/rs/logo.svg" },
  ];

  return (
    <section className="py-16 bg-white" data-testid="section-alliances">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4" data-testid="badge-alliances">{t("alliances.badge")}</Badge>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4" data-testid="text-alliances-title">{t("alliances.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-alliances-subtitle">{t("alliances.subtitle")}</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {alliances.map((alliance, idx) => (
            <div key={idx} className="grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300" data-testid={`alliance-${idx}`}>
              <img src={alliance.logo} alt={alliance.name} className="h-8 md:h-10 w-auto object-contain" loading="lazy" />
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-center text-sm text-muted-foreground mb-4">{t("alliances.paymentMethods")}</p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <SiVisa className="w-12 h-8 text-[#1A1F71]" />
            <SiMastercard className="w-10 h-8 text-[#EB001B]" />
            <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-full">
              <span className="text-purple-600 font-semibold text-sm">Scalapay</span>
            </div>
            <SiBinance className="w-8 h-8 text-[#F0B90B]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppButton() {
  const { t } = useI18n();
  const whatsappNumber = "34612345678";
  const message = encodeURIComponent(t("whatsapp.message"));
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      data-testid="button-whatsapp"
      aria-label={t("whatsapp.ariaLabel")}
    >
      <MessageCircle className="w-7 h-7 fill-white" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-3 py-2 rounded-lg shadow-md text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        {t("whatsapp.tooltip")}
      </span>
    </a>
  );
}

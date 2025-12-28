import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FlightSearch } from "@/components/FlightSearch";
import { Chatbot } from "@/components/Chatbot";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Map, ShieldCheck, Globe } from "lucide-react";
import { Link } from "wouter";

// Static placeholders from Unsplash
const HERO_IMAGE = "https://images.unsplash.com/photo-1499856871940-a09627c6d7db?q=80&w=2070&auto=format&fit=crop"; // Paris Eiffel
const DESTINATION_1 = "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop"; // Rome
const DESTINATION_2 = "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1886&auto=format&fit=crop"; // Cinque Terre
const DESTINATION_3 = "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2070&auto=format&fit=crop"; // Madrid

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMAGE} 
            alt="European Travel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 bg-gradient-to-b from-primary/60 via-primary/20 to-primary/80"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10 text-center text-white px-4 mt-20">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight leading-tight animate-fade-in">
            Discover the <span className="text-accent italic">Soul</span> of Europe
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Curated journeys, exclusive experiences, and seamless travel planning for the modern explorer.
          </p>
          <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link href="/destinations">
              <Button size="lg" className="bg-accent text-primary font-bold hover:bg-accent/90 px-8 py-6 text-lg rounded-xl shadow-lg shadow-accent/20">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Flight Search Overlap */}
      <section className="relative z-20 pb-20">
        <FlightSearch />
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-accent font-bold tracking-wider text-sm uppercase mb-2 block">Why Choose Us</span>
          <h2 className="text-4xl font-display font-bold text-primary">Travel with Confidence</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            icon={<Map className="w-8 h-8 text-accent" />}
            title="Curated Itineraries"
            description="Hand-picked destinations and hidden gems you won't find in standard guidebooks."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-8 h-8 text-accent" />}
            title="Secure Booking"
            description="Bank-level security for all transactions and guaranteed reservations for peace of mind."
          />
          <FeatureCard 
            icon={<Globe className="w-8 h-8 text-accent" />}
            title="Local Expertise"
            description="24/7 support from local guides and concierge services in every major city."
          />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-accent font-bold tracking-wider text-sm uppercase mb-2 block">Inspiration</span>
              <h2 className="text-4xl font-display font-bold text-primary">Popular Destinations</h2>
            </div>
            <Link href="/destinations">
              <Button variant="ghost" className="text-primary hover:text-accent gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DestinationCard 
              image={DESTINATION_1}
              title="Rome, Italy"
              price="From $1,299"
              rating={4.9}
            />
            <DestinationCard 
              image={DESTINATION_2}
              title="Cinque Terre"
              price="From $1,499"
              rating={4.8}
            />
            <DestinationCard 
              image={DESTINATION_3}
              title="Madrid, Spain"
              price="From $1,199"
              rating={4.7}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 skew-x-12 transform translate-x-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready for your next <span className="text-accent">Adventure?</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
            Join thousands of happy travelers who have discovered the magic of Europe with us.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/api/login">
              <Button size="lg" className="bg-white text-primary font-bold hover:bg-gray-100 px-8 py-6 rounded-xl">
                Sign Up Now
              </Button>
            </Link>
             <Link href="/contact">
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-primary font-bold px-8 py-6 rounded-xl">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-primary mb-3 font-display">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

function DestinationCard({ image, title, price, rating }: { image: string, title: string, price: string, rating: number }) {
  return (
    <div className="group rounded-2xl overflow-hidden relative aspect-[4/5] cursor-pointer">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold font-display">{title}</h3>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
            <Star className="w-3 h-3 text-accent fill-accent" />
            <span className="text-xs font-bold">{rating}</span>
          </div>
        </div>
        <p className="text-accent font-medium mb-4">{price}</p>
        <Button className="w-full bg-white text-primary hover:bg-accent hover:text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Details
        </Button>
      </div>
    </div>
  );
}

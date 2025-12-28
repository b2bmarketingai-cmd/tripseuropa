import { useAuth } from "@/hooks/use-auth";
import { useBookings } from "@/hooks/use-bookings";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, Plane, Calendar, CreditCard, User } from "lucide-react";
import { format } from "date-fns";

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();

  if (authLoading || bookingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-primary pb-32">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-3xl font-bold text-primary">
              {user?.firstName?.[0] || <User />}
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-white">
                Welcome back, {user?.firstName || 'Traveler'}
              </h1>
              <p className="text-white/60">Manage your bookings and profile settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold font-display text-primary mb-6 flex items-center gap-2">
                <Plane className="w-5 h-5 text-accent" />
                Your Trips
              </h2>

              {!bookings || bookings.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-500 mb-6">Start planning your next adventure today.</p>
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Find Flights
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking: any) => (
                    <div key={booking.id} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-accent mb-1 block">
                            {booking.serviceType}
                          </span>
                          <h3 className="text-lg font-bold text-primary">Trip to {booking.details.destination}</h3>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                         <div className="flex items-center gap-2">
                           <Calendar className="w-4 h-4" />
                           {format(new Date(booking.createdAt), "PPP")}
                         </div>
                         <div className="flex items-center gap-2">
                           <CreditCard className="w-4 h-4" />
                           ${booking.totalAmount}
                         </div>
                      </div>
                      
                      <Button variant="outline" className="w-full">View Details</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Profile & Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h3 className="text-lg font-bold font-display text-primary mb-4">Loyalty Status</h3>
               <div className="bg-primary rounded-xl p-6 text-white mb-4 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -mr-10 -mt-10"></div>
                 <p className="text-accent font-bold uppercase tracking-wider text-sm mb-1">Explorer Tier</p>
                 <div className="text-3xl font-bold mb-2">0 Points</div>
                 <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-accent w-[10%]"></div>
                 </div>
                 <p className="text-xs text-white/60 mt-2">1,000 points to Elite status</p>
               </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold font-display text-primary mb-4">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">Our concierge team is available 24/7 to assist with your travel plans.</p>
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-primary">
                Contact Concierge
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

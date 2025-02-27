
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/navigation/BottomNav";
import { MainDrawer } from "@/components/layout/MainDrawer";
import { SearchForm } from "@/components/search/SearchForm";
import { RideCard } from "@/components/mobile/RideCard";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { Bell, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data
const popularRoutes = [
  { id: "1", from: "Paris", to: "Lyon" },
  { id: "2", from: "Madrid", to: "Barcelona" },
  { id: "3", from: "Berlin", to: "Munich" },
  { id: "4", from: "Rome", to: "Milan" },
];

const upcomingRides = [
  {
    id: "1",
    from: "Paris",
    to: "Lyon",
    date: "2023-08-15",
    time: "10:00",
    price: 25,
    currency: "€",
    availableSeats: 2,
    distance: 465,
    duration: "4h 30min",
    driver: {
      name: "Alexandre D.",
      rating: 4.8,
    },
  },
  {
    id: "2",
    from: "Madrid",
    to: "Barcelona",
    date: "2023-08-16",
    time: "14:30",
    price: 30,
    currency: "€",
    availableSeats: 1,
    distance: 620,
    duration: "6h 15min",
    driver: {
      name: "Carmen L.",
      rating: 4.9,
    },
  },
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRideClick = (id: string) => {
    navigate(`/ride/${id}`);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background safe-area-inset-padding">
        <header className="px-4 py-3 flex items-center justify-between">
          <MainDrawer>
            {/* Drawer content is defined in the MainDrawer component */}
          </MainDrawer>
          <div className="flex-1 flex justify-center">
            <div className="h-10 w-10 flex items-center justify-center">
              <span className="font-bold text-2xl text-blabla">BlaBlaCar</span>
            </div>
          </div>
          <button 
            className="p-2 rounded-full hover:bg-secondary"
            onClick={() => toast({ title: "Notifications", description: "No new notifications" })}
          >
            <Bell className="h-6 w-6" />
          </button>
        </header>
        
        <main className="flex-1 pb-20">
          <section className="px-4 py-6 bg-gradient-to-b from-blabla/10 to-background">
            <h1 className="text-2xl font-bold mb-6">Where do you want to go?</h1>
            <SearchForm />
          </section>
          
          <section className="px-4 py-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Popular Routes</h2>
            </div>
            <div className="flex overflow-x-auto gap-3 no-scrollbar pb-2">
              {popularRoutes.map((route) => (
                <div 
                  key={route.id}
                  className="flex-none bg-white p-3 rounded-lg shadow-sm border border-border/40 min-w-[160px] press-effect"
                  onClick={() => navigate(`/search?from=${route.from}&to=${route.to}`)}
                >
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">{route.from}</span>
                    <span className="text-muted-foreground text-sm">to</span>
                    <span className="font-medium">{route.to}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section className="px-4 py-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your upcoming rides</h2>
              <button 
                className="text-sm text-blabla"
                onClick={() => navigate("/trips")}
              >
                See all
              </button>
            </div>
            {upcomingRides.length > 0 ? (
              <div className="space-y-4">
                {upcomingRides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    onClick={() => handleRideClick(ride.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You have no upcoming rides</p>
                <ButtonMobile 
                  variant="outline" 
                  onClick={() => navigate("/search")}
                >
                  Find a ride
                </ButtonMobile>
              </div>
            )}
          </section>
        </main>
        
        {/* Floating action button for creating a ride */}
        <button 
          className="fixed right-4 bottom-20 bg-blabla text-white p-4 rounded-full shadow-lg z-30"
          onClick={() => navigate("/create-ride")}
        >
          <Plus className="h-6 w-6" />
        </button>
        
        <BottomNav />
      </div>
    </MobileLayout>
  );
};

export default Index;

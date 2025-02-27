
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/navigation/BottomNav";
import { RideCard } from "@/components/mobile/RideCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { Plus } from "lucide-react";

// Sample data
const myRides = [
  {
    id: "10",
    from: "Paris",
    to: "Lyon",
    date: "2023-08-25",
    time: "08:00",
    price: 25,
    currency: "€",
    availableSeats: 3,
    distance: 465,
    duration: "4h 30min",
    driver: {
      name: "You",
      rating: 4.9,
    },
  },
  {
    id: "11",
    from: "Lyon",
    to: "Paris",
    date: "2023-08-27",
    time: "16:00",
    price: 25,
    currency: "€",
    availableSeats: 3,
    distance: 465,
    duration: "4h 30min",
    driver: {
      name: "You",
      rating: 4.9,
    },
  },
];

const passengerRides = [
  {
    id: "20",
    from: "Paris",
    to: "Bordeaux",
    date: "2023-08-20",
    time: "09:30",
    price: 40,
    currency: "€",
    availableSeats: 1,
    distance: 585,
    duration: "5h 45min",
    driver: {
      name: "Jean M.",
      rating: 4.7,
    },
  },
];

const pastRides = [
  {
    id: "30",
    from: "Paris",
    to: "Brussels",
    date: "2023-07-15",
    time: "11:00",
    price: 35,
    currency: "€",
    availableSeats: 0,
    distance: 315,
    duration: "3h 20min",
    driver: {
      name: "Marie L.",
      rating: 4.8,
    },
  },
];

const TripsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  const handleRideClick = (id: string) => {
    navigate(`/ride/${id}`);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background safe-area-inset-padding">
        <header className="px-4 py-3 flex items-center justify-between sticky top-0 bg-background z-10 border-b">
          <h1 className="text-xl font-bold">My Trips</h1>
          <ButtonMobile 
            size="sm" 
            variant="ghost"
            className="text-blabla"
            onClick={() => navigate("/create-ride")}
          >
            <Plus className="h-5 w-5 mr-1" />
            Create
          </ButtonMobile>
        </header>
        
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-4 pt-4 sticky top-[53px] bg-background z-10">
            <TabsList className="w-full">
              <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
              <TabsTrigger value="passenger" className="flex-1">As passenger</TabsTrigger>
              <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="upcoming" className="flex-1 p-4 pb-20">
            {myRides.length > 0 ? (
              <div className="space-y-4">
                {myRides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    onClick={() => handleRideClick(ride.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg font-medium mb-2">No upcoming rides</p>
                <p className="text-muted-foreground mb-6">
                  You haven't published any rides yet
                </p>
                <ButtonMobile 
                  className="bg-blabla hover:bg-blabla/90"
                  onClick={() => navigate("/create-ride")}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Publish a ride
                </ButtonMobile>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="passenger" className="flex-1 p-4 pb-20">
            {passengerRides.length > 0 ? (
              <div className="space-y-4">
                {passengerRides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    onClick={() => handleRideClick(ride.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg font-medium mb-2">No rides as passenger</p>
                <p className="text-muted-foreground mb-6">
                  You haven't booked any rides yet
                </p>
                <ButtonMobile 
                  className="bg-blabla hover:bg-blabla/90"
                  onClick={() => navigate("/search")}
                >
                  Find a ride
                </ButtonMobile>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="flex-1 p-4 pb-20">
            {pastRides.length > 0 ? (
              <div className="space-y-4">
                {pastRides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    onClick={() => handleRideClick(ride.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg font-medium mb-2">No past rides</p>
                <p className="text-muted-foreground">
                  Your ride history will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <BottomNav />
      </div>
    </MobileLayout>
  );
};

export default TripsPage;

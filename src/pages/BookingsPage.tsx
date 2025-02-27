
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/navigation/BottomNav";
import { Card } from "@/components/mobile/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { Car, Clock, MapPin, Calendar, ChevronRight } from "lucide-react";

// Sample data
const upcomingBookings = [
  {
    id: "1",
    from: "Paris",
    to: "Lyon",
    date: "2023-08-20",
    time: "09:30",
    price: 25,
    currency: "€",
    seats: 1,
    status: "confirmed",
    driver: {
      name: "Alexandre D.",
      rating: 4.8,
    },
  },
];

const pastBookings = [
  {
    id: "2",
    from: "Brussels",
    to: "Paris",
    date: "2023-07-10",
    time: "14:00",
    price: 30,
    currency: "€",
    seats: 2,
    status: "completed",
    driver: {
      name: "Marie L.",
      rating: 4.7,
    },
  },
];

const BookingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Confirmed
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background safe-area-inset-padding">
        <header className="px-4 py-3 flex items-center justify-between sticky top-0 bg-background z-10 border-b">
          <h1 className="text-xl font-bold">My Bookings</h1>
        </header>
        
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <div className="px-4 pt-4 sticky top-[53px] bg-background z-10">
            <TabsList className="w-full">
              <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
              <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="upcoming" className="flex-1 p-4 pb-20">
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <Card key={booking.id} pressable className="overflow-visible" onClick={() => navigate(`/booking/${booking.id}`)}>
                    <Card.Content className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center mb-1">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm">{booking.date}</span>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{booking.price} {booking.currency}</p>
                          <p className="text-xs text-muted-foreground">
                            {booking.seats} {booking.seats === 1 ? "seat" : "seats"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-3">
                        <div className="flex">
                          <div className="mr-3 flex flex-col items-center">
                            <div className="h-4 w-4 rounded-full border-2 border-blabla bg-white"></div>
                            <div className="h-8 w-0.5 bg-gray-200 my-1"></div>
                            <div className="h-4 w-4 rounded-full border-2 border-blabla bg-blabla"></div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <p className="font-medium">{booking.from}</p>
                              <p className="text-xs text-muted-foreground">{booking.time}</p>
                            </div>
                            <div>
                              <p className="font-medium">{booking.to}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-3 border-t">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                            <Car className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="text-sm">{booking.driver.name}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg font-medium mb-2">No upcoming bookings</p>
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
            {pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map((booking) => (
                  <Card key={booking.id} pressable className="overflow-visible" onClick={() => navigate(`/booking/${booking.id}`)}>
                    <Card.Content className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center mb-1">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span className="text-sm">{booking.date}</span>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{booking.price} {booking.currency}</p>
                          <p className="text-xs text-muted-foreground">
                            {booking.seats} {booking.seats === 1 ? "seat" : "seats"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-3">
                        <div className="flex">
                          <div className="mr-3 flex flex-col items-center">
                            <div className="h-4 w-4 rounded-full border-2 border-blabla bg-white"></div>
                            <div className="h-8 w-0.5 bg-gray-200 my-1"></div>
                            <div className="h-4 w-4 rounded-full border-2 border-blabla bg-blabla"></div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <p className="font-medium">{booking.from}</p>
                              <p className="text-xs text-muted-foreground">{booking.time}</p>
                            </div>
                            <div>
                              <p className="font-medium">{booking.to}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4 pt-3 border-t">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                            <Car className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="text-sm">{booking.driver.name}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg font-medium mb-2">No past bookings</p>
                <p className="text-muted-foreground">
                  Your booking history will appear here
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

export default BookingsPage;

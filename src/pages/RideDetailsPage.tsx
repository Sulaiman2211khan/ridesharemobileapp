
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { 
  ChevronLeft, 
  Clock, 
  MapPin, 
  Users, 
  MessageCircle, 
  Share2, 
  Info,
  Star,
  Car,
  CreditCard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Sample ride data
const rideDetails = {
  id: "1",
  from: "Paris",
  to: "Lyon",
  date: "2023-08-15",
  time: "10:00",
  arrivalTime: "14:30",
  price: 25,
  currency: "€",
  availableSeats: 2,
  distance: 465,
  duration: "4h 30min",
  description: "I'm driving from Paris to Lyon. I can pick you up at Gare de Lyon. I have space for medium-sized luggage. No smoking please.",
  meetingPoint: "Gare de Lyon, Paris",
  dropOffPoint: "Gare Part-Dieu, Lyon",
  car: {
    make: "Renault",
    model: "Clio",
    color: "Blue",
    year: 2018
  },
  driver: {
    id: "driver1",
    name: "Alexandre D.",
    rating: 4.8,
    rides: 124,
    joined: "2019",
    avatar: "https://i.pravatar.cc/150?img=12",
    verified: true
  }
};

const RideDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [seats, setSeats] = useState(1);
  
  // In a real app, fetch the ride details based on the ID
  const ride = rideDetails;

  const handleContactDriver = () => {
    toast({
      title: "Contact requested",
      description: "Message functionality will be implemented soon",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share",
      description: "Share functionality will be implemented soon",
    });
  };

  const handleBook = () => {
    // In a real app, would call an API to book the ride
    setShowBookingDialog(false);
    toast({
      title: "Booking confirmed!",
      description: `You have booked ${seats} ${seats === 1 ? 'seat' : 'seats'} to ${ride.to}`,
    });
    // Navigate to bookings page after successful booking
    navigate("/bookings");
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background safe-area-inset-padding">
        <header className="px-4 py-3 flex items-center justify-between sticky top-0 bg-background z-10 border-b">
          <button 
            className="p-2 rounded-full hover:bg-secondary"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Ride Details</h1>
          <button 
            className="p-2 rounded-full hover:bg-secondary"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </button>
        </header>
        
        <main className="flex-1 pb-24">
          {/* Route details */}
          <section className="p-4 border-b">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src={ride.driver.avatar} 
                  alt={ride.driver.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{ride.driver.name}</p>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                  <span className="text-sm">{ride.driver.rating} · {ride.driver.rides} rides</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-3 flex flex-col items-center">
                  <div className="h-5 w-5 rounded-full border-2 border-blabla bg-white"></div>
                  <div className="h-16 w-0.5 bg-gray-200 my-1"></div>
                  <div className="h-5 w-5 rounded-full border-2 border-blabla bg-blabla"></div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-lg">{ride.from}</p>
                    <p className="text-sm text-muted-foreground">{ride.time} · {ride.meetingPoint}</p>
                  </div>
                  <div>
                    <p className="font-medium text-lg">{ride.to}</p>
                    <p className="text-sm text-muted-foreground">{ride.arrivalTime} · {ride.dropOffPoint}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Ride info */}
          <section className="p-4 border-b">
            <h2 className="font-semibold mb-4">Ride information</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>Duration</span>
                </div>
                <span className="font-medium">{ride.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>Distance</span>
                </div>
                <span className="font-medium">{ride.distance} km</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Car className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>Car</span>
                </div>
                <span className="font-medium">{ride.car.make} {ride.car.model}, {ride.car.color}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span>Available seats</span>
                </div>
                <span className="font-medium">{ride.availableSeats}</span>
              </div>
            </div>
          </section>
          
          {/* Description */}
          <section className="p-4 border-b">
            <h2 className="font-semibold mb-2">About this ride</h2>
            <p className="text-sm text-muted-foreground">{ride.description}</p>
          </section>
          
          {/* Driver info */}
          <section className="p-4">
            <h2 className="font-semibold mb-4">About the driver</h2>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Info className="h-5 w-5 mr-3 text-muted-foreground" />
                <span>Member since</span>
              </div>
              <span className="font-medium">{ride.driver.joined}</span>
            </div>
            <ButtonMobile
              variant="outline"
              className="w-full"
              onClick={handleContactDriver}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact {ride.driver.name.split(' ')[0]}
            </ButtonMobile>
          </section>
        </main>
        
        {/* Booking sticky footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-between z-20 safe-area-inset-padding">
          <div>
            <p className="text-2xl font-bold">{ride.price} {ride.currency}</p>
            <p className="text-sm text-muted-foreground">per passenger</p>
          </div>
          <ButtonMobile 
            onClick={() => setShowBookingDialog(true)}
            className="bg-blabla hover:bg-blabla/90"
          >
            Book now
          </ButtonMobile>
        </div>
        
        {/* Booking dialog */}
        <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book your ride</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Number of seats</span>
                <div className="flex items-center space-x-3">
                  <button 
                    className="h-8 w-8 rounded-full border flex items-center justify-center disabled:opacity-50"
                    onClick={() => setSeats(Math.max(1, seats - 1))}
                    disabled={seats <= 1}
                  >
                    -
                  </button>
                  <span className="w-4 text-center">{seats}</span>
                  <button 
                    className="h-8 w-8 rounded-full border flex items-center justify-center disabled:opacity-50"
                    onClick={() => setSeats(Math.min(ride.availableSeats, seats + 1))}
                    disabled={seats >= ride.availableSeats}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span>Price ({seats} {seats === 1 ? 'seat' : 'seats'})</span>
                  <span className="font-medium">{ride.price * seats} {ride.currency}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Service fee</span>
                  <span className="font-medium">2 {ride.currency}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>{(ride.price * seats) + 2} {ride.currency}</span>
                </div>
              </div>
              
              <div className="bg-secondary/30 p-3 rounded-lg flex items-center">
                <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment method</p>
                  <p className="text-xs text-muted-foreground">You'll pay when the driver accepts</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <ButtonMobile variant="outline" onClick={() => setShowBookingDialog(false)}>
                Cancel
              </ButtonMobile>
              <ButtonMobile className="bg-blabla hover:bg-blabla/90" onClick={handleBook}>
                Confirm booking
              </ButtonMobile>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MobileLayout>
  );
};

export default RideDetailsPage;

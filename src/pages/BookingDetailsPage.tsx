
import { useParams, useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { 
  ChevronLeft, 
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  MessageCircle, 
  Phone,
  Car,
  CreditCard,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample booking data
const bookingDetails = {
  id: "1",
  from: "Paris",
  to: "Lyon",
  date: "2023-08-20",
  time: "09:30",
  arrivalTime: "14:00",
  price: 25,
  currency: "€",
  servicesFee: 2,
  totalPrice: 27,
  seats: 1,
  status: "confirmed",
  bookingReference: "BLA-1234567",
  meetingPoint: "Gare de Lyon, Paris",
  dropOffPoint: "Gare Part-Dieu, Lyon",
  paymentMethod: "Visa ****1234",
  driver: {
    id: "driver1",
    name: "Alexandre D.",
    rating: 4.8,
    rides: 124,
    phone: "+33 6 12 34 56 78",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  car: {
    make: "Renault",
    model: "Clio",
    color: "Blue",
    licensePlate: "AB-123-CD"
  }
};

const BookingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, fetch the booking details based on the ID
  const booking = bookingDetails;

  const handleContactDriver = () => {
    toast({
      title: "Contact requested",
      description: "Message functionality will be implemented soon",
    });
  };

  const handleCancelBooking = () => {
    toast({
      title: "Cancellation requested",
      description: "Your booking cancellation is being processed",
    });
    navigate("/bookings");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Confirmed
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
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
          <button 
            className="p-2 rounded-full hover:bg-secondary"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Booking Details</h1>
          <div className="w-10"></div> {/* Empty div for spacing */}
        </header>
        
        <main className="flex-1 pb-24">
          {/* Booking status banner */}
          <div className="p-4 bg-secondary/30 border-b">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm mb-1">Booking reference: {booking.bookingReference}</p>
                {getStatusBadge(booking.status)}
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{booking.totalPrice} {booking.currency}</p>
                <p className="text-xs text-muted-foreground">
                  {booking.seats} {booking.seats === 1 ? "seat" : "seats"}
                </p>
              </div>
            </div>
          </div>
          
          {/* Route details */}
          <section className="p-4 border-b">
            <div className="mb-3">
              <div className="flex items-center mb-2">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{booking.date}</span>
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
                    <p className="font-medium text-lg">{booking.from}</p>
                    <p className="text-sm text-muted-foreground">{booking.time} · {booking.meetingPoint}</p>
                  </div>
                  <div>
                    <p className="font-medium text-lg">{booking.to}</p>
                    <p className="text-sm text-muted-foreground">{booking.arrivalTime} · {booking.dropOffPoint}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Driver and car info */}
          <section className="p-4 border-b">
            <h2 className="font-semibold mb-4">Driver & car details</h2>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img 
                  src={booking.driver.avatar} 
                  alt={booking.driver.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{booking.driver.name}</p>
                <div className="flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`h-3 w-3 ${i < Math.floor(booking.driver.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">{booking.driver.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary/30 p-3 rounded-lg mb-4">
              <div className="flex items-center">
                <Car className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{booking.car.make} {booking.car.model}, {booking.car.color}</p>
                  <p className="text-xs text-muted-foreground">License plate: {booking.car.licensePlate}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <ButtonMobile
                variant="outline"
                className="w-full"
                onClick={handleContactDriver}
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Message {booking.driver.name.split(' ')[0]}
              </ButtonMobile>
              
              <ButtonMobile
                variant="outline"
                className="w-full"
                onClick={() => toast({ title: "Calling driver", description: "This would initiate a call in a real app" })}
              >
                <Phone className="h-5 w-5 mr-2" />
                Call driver
              </ButtonMobile>
            </div>
          </section>
          
          {/* Payment info */}
          <section className="p-4 border-b">
            <h2 className="font-semibold mb-4">Payment details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Price ({booking.seats} {booking.seats === 1 ? 'seat' : 'seats'})</span>
                <span>{booking.price} {booking.currency}</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>{booking.servicesFee} {booking.currency}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>{booking.totalPrice} {booking.currency}</span>
              </div>
            </div>
            
            <div className="mt-4 bg-secondary/30 p-3 rounded-lg flex items-center">
              <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
              <p className="text-sm">{booking.paymentMethod}</p>
            </div>
          </section>
          
          {/* Cancellation policy */}
          <section className="p-4">
            <div className="flex items-start space-x-3 mb-4">
              <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Cancellation policy</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Free cancellation until 24 hours before departure. After that, a 50% fee applies.
                </p>
              </div>
            </div>
            
            <ButtonMobile
              variant="outline"
              className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
              onClick={handleCancelBooking}
            >
              Cancel booking
            </ButtonMobile>
          </section>
        </main>
      </div>
    </MobileLayout>
  );
};

export default BookingDetailsPage;

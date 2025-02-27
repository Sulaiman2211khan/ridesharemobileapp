
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Car,
  DollarSign,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateRidePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    from: "",
    fromDetails: "",
    to: "",
    toDetails: "",
    date: "",
    time: "",
    seats: 3,
    price: "",
    car: "Renault Clio",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    // Basic validation for each step
    if (step === 1) {
      if (!formData.from || !formData.to) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 2) {
      if (!formData.date || !formData.time) {
        toast({
          title: "Missing information",
          description: "Please select date and time",
          variant: "destructive",
        });
        return;
      }
    } else if (step === 3) {
      if (!formData.price) {
        toast({
          title: "Missing information",
          description: "Please enter a price",
          variant: "destructive",
        });
        return;
      }
    }
    
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, would call an API to create the ride
    toast({
      title: "Ride created!",
      description: "Your ride has been published successfully",
    });
    
    navigate("/trips");
  };

  const renderFormStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Route details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="from" className="block text-sm font-medium">
                  Departure city
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="from"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    placeholder="From where?"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="fromDetails" className="block text-sm font-medium">
                  Pickup point (optional)
                </label>
                <Input
                  id="fromDetails"
                  name="fromDetails"
                  value={formData.fromDetails}
                  onChange={handleChange}
                  placeholder="e.g. Train station, airport"
                  className="h-12"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="to" className="block text-sm font-medium">
                  Destination city
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="to"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="To where?"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="toDetails" className="block text-sm font-medium">
                  Drop-off point (optional)
                </label>
                <Input
                  id="toDetails"
                  name="toDetails"
                  value={formData.toDetails}
                  onChange={handleChange}
                  placeholder="e.g. City center, university"
                  className="h-12"
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Date and time</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="date" className="block text-sm font-medium">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="time" className="block text-sm font-medium">
                  Departure time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Ride details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="seats" className="block text-sm font-medium">
                  Available seats
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="seats"
                    name="seats"
                    type="number"
                    value={formData.seats}
                    onChange={handleChange}
                    min={1}
                    max={8}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="car" className="block text-sm font-medium">
                  Car
                </label>
                <div className="relative">
                  <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="car"
                    name="car"
                    value={formData.car}
                    onChange={handleChange}
                    placeholder="Car make and model"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium">
                  Price per passenger (€)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0"
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Additional information</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium">
                  Description (optional)
                </label>
                <div className="relative">
                  <Info className="absolute left-3 top-3 text-muted-foreground h-5 w-5" />
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Add any useful details about your ride..."
                    className="pl-10 min-h-[100px]"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h3 className="font-medium mb-2">Trip summary</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">From:</span> {formData.from}</p>
                <p><span className="text-muted-foreground">To:</span> {formData.to}</p>
                <p><span className="text-muted-foreground">Date:</span> {formData.date}</p>
                <p><span className="text-muted-foreground">Time:</span> {formData.time}</p>
                <p><span className="text-muted-foreground">Price:</span> €{formData.price}</p>
                <p><span className="text-muted-foreground">Seats:</span> {formData.seats}</p>
              </div>
            </div>
          </div>
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
            onClick={() => step === 1 ? navigate(-1) : handlePrevStep()}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">
            {step < 4 ? `Create a ride (${step}/4)` : "Review and publish"}
          </h1>
          <div className="w-10"></div> {/* Empty div for spacing */}
        </header>
        
        <main className="flex-1 p-4 pb-24">
          <form onSubmit={handleSubmit}>
            {renderFormStep()}
            
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex items-center justify-end z-20 safe-area-inset-padding">
              {step < 4 ? (
                <ButtonMobile
                  type="button"
                  className="bg-blabla hover:bg-blabla/90 min-w-[120px]"
                  onClick={handleNextStep}
                >
                  Next
                </ButtonMobile>
              ) : (
                <ButtonMobile 
                  type="submit"
                  className="bg-blabla hover:bg-blabla/90 min-w-[120px]"
                >
                  Publish
                </ButtonMobile>
              )}
            </div>
          </form>
        </main>
      </div>
    </MobileLayout>
  );
};

export default CreateRidePage;

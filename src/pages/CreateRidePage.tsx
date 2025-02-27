
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
                  placeholder="e.g. Train
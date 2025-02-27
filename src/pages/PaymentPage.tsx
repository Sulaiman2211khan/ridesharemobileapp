
import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useNavigate } from "react-router-dom";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/mobile/Card";
import { useToast } from "@/hooks/use-toast";
import { 
  ChevronLeft, 
  CreditCard, 
  CheckCircle, 
  ChevronRight,
  Plus,
  Lock
} from "lucide-react";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showAddCard, setShowAddCard] = useState(false);
  
  // Sample payment methods
  const paymentMethods = [
    {
      id: "card1",
      type: "card",
      last4: "4242",
      expiryMonth: "04",
      expiryYear: "2025",
      brand: "Visa",
    },
    {
      id: "card2",
      type: "card",
      last4: "7890",
      expiryMonth: "08",
      expiryYear: "2024",
      brand: "Mastercard",
    }
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      toast({
        title: "No payment method selected",
        description: "Please select a payment method to continue",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Payment successful",
      description: "Your payment has been processed",
    });
    
    navigate("/bookings");
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Card added",
      description: "Your card has been added successfully",
    });
    setShowAddCard(false);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background safe-area-inset-padding">
        <header className="px-4 py-3 flex items-center justify-between bg-background z-10 border-b sticky top-0">
          <div className="flex items-center">
            <button 
              className="p-2 rounded-full hover:bg-secondary mr-2"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold">Payment</h1>
          </div>
        </header>
        
        <main className="flex-1 p-4">
          {!showAddCard ? (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Payment Methods</h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div 
                      key={method.id}
                      className={`border rounded-lg p-4 flex items-center cursor-pointer ${
                        selectedMethod === method.id ? 'border-[#2DBEFF] bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      <div className="h-10 w-10 bg-secondary/80 rounded-md flex items-center justify-center">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="font-medium">
                          {method.brand} •••• {method.last4}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </div>
                      </div>
                      {selectedMethod === method.id && (
                        <CheckCircle className="h-6 w-6 text-[#2DBEFF]" />
                      )}
                    </div>
                  ))}
                  
                  <div 
                    className="border border-dashed rounded-lg p-4 flex items-center cursor-pointer hover:bg-secondary/20"
                    onClick={() => setShowAddCard(true)}
                  >
                    <div className="h-10 w-10 bg-secondary/80 rounded-md flex items-center justify-center">
                      <Plus className="h-6 w-6" />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium">Add new payment method</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              <Card className="mb-6">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ride fare</span>
                      <span>€25.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service fee</span>
                      <span>€2.50</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>€27.50</span>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                <Lock className="h-4 w-4 mr-1" />
                Secure payment powered by Stripe
              </div>
              
              <ButtonMobile
                className="w-full bg-[#2DBEFF] hover:bg-[#2DBEFF]/90 text-white"
                onClick={handlePayment}
                disabled={!selectedMethod}
              >
                Pay €27.50
              </ButtonMobile>
            </>
          ) : (
            <div>
              <h2 className="text-lg font-semibold mb-4">Add Payment Method</h2>
              
              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                    Name on card
                  </label>
                  <Input
                    id="cardName"
                    placeholder="Full name on card"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                    Card number
                  </label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                      Expiry date
                    </label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium mb-1">
                      CVC
                    </label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex space-x-3">
                  <ButtonMobile
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowAddCard(false)}
                  >
                    Cancel
                  </ButtonMobile>
                  <ButtonMobile
                    type="submit"
                    className="flex-1 bg-[#2DBEFF] hover:bg-[#2DBEFF]/90 text-white"
                  >
                    Add Card
                  </ButtonMobile>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </MobileLayout>
  );
};

export default PaymentPage;

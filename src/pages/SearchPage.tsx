
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/navigation/BottomNav";
import { RideCard } from "@/components/mobile/RideCard";
import { ChevronLeft, Filter, SortAsc } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Sample data
const searchResults = [
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
    from: "Paris",
    to: "Lyon",
    date: "2023-08-15",
    time: "12:30",
    price: 22,
    currency: "€",
    availableSeats: 3,
    distance: 465,
    duration: "4h 45min",
    driver: {
      name: "Sophie M.",
      rating: 4.7,
    },
  },
  {
    id: "3",
    from: "Paris",
    to: "Lyon",
    date: "2023-08-15",
    time: "14:00",
    price: 28,
    currency: "€",
    availableSeats: 1,
    distance: 465,
    duration: "4h 15min",
    driver: {
      name: "Thomas B.",
      rating: 4.9,
    },
  },
  {
    id: "4",
    from: "Paris",
    to: "Lyon",
    date: "2023-08-15",
    time: "16:45",
    price: 20,
    currency: "€",
    availableSeats: 4,
    distance: 465,
    duration: "5h 00min",
    driver: {
      name: "Marie L.",
      rating: 4.6,
    },
  },
];

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [results, setResults] = useState(searchResults);
  const [isLoading, setIsLoading] = useState(true);
  
  // Parse search params
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get("from") || "Paris";
  const to = searchParams.get("to") || "Lyon";
  const date = searchParams.get("date") || "2023-08-15";
  
  // Format the date for display
  const formattedDate = date ? format(new Date(date), "EEE, MMM d") : "Today";

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [from, to, date]);

  const handleRideClick = (id: string) => {
    navigate(`/ride/${id}`);
  };

  const handleFilter = () => {
    toast({
      title: "Filters",
      description: "Filter functionality will be implemented soon",
    });
  };

  const handleSort = () => {
    // Toggle sort by price
    const sorted = [...results].sort((a, b) => a.price - b.price);
    setResults(sorted);
    toast({
      title: "Sorted",
      description: "Rides sorted by price (lowest first)",
    });
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
          <h1 className="text-lg font-semibold">Search Results</h1>
          <div className="w-10"></div> {/* Empty div for spacing */}
        </header>
        
        <div className="px-4 py-3 bg-secondary/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-medium">{from} → {to}</h2>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                className="p-2 rounded-full bg-white border border-border shadow-sm"
                onClick={handleFilter}
              >
                <Filter className="h-5 w-5" />
              </button>
              <button 
                className="p-2 rounded-full bg-white border border-border shadow-sm"
                onClick={handleSort}
              >
                <SortAsc className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <main className="flex-1 p-4 pb-20">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl h-40 animate-pulse" />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map((ride) => (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  onClick={() => handleRideClick(ride.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-medium mb-2">No rides found</p>
              <p className="text-muted-foreground mb-6">
                Try changing your search criteria or date
              </p>
            </div>
          )}
        </main>
        
        <BottomNav />
      </div>
    </MobileLayout>
  );
};

export default SearchPage;

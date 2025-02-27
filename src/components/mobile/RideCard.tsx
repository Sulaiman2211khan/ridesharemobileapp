
import { cn } from "@/lib/utils";
import { Car, Clock, MapPin, Users } from "lucide-react";
import { formatDistance } from "@/lib/formatUtils";

interface RideCardProps {
  ride: {
    id: string;
    from: string;
    to: string;
    date: string;
    time: string;
    price: number;
    currency: string;
    availableSeats: number;
    distance: number;
    duration: string;
    driver: {
      name: string;
      rating: number;
      avatar?: string;
    };
  };
  onClick?: () => void;
  className?: string;
}

export function RideCard({ ride, onClick, className }: RideCardProps) {
  return (
    <div 
      className={cn(
        "bg-card rounded-xl border border-border overflow-hidden press-effect",
        className
      )}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
              {ride.driver.avatar ? (
                <img src={ride.driver.avatar} alt={ride.driver.name} className="h-full w-full object-cover" />
              ) : (
                <Users className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium text-sm">{ride.driver.name}</p>
              <div className="flex items-center">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i} 
                      className={cn(
                        "h-3 w-3", 
                        i < Math.floor(ride.driver.rating) ? "text-yellow-400" : "text-gray-300"
                      )}
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">{ride.driver.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-lg font-bold">{ride.price}</span>
            <span className="text-sm ml-1">{ride.currency}</span>
          </div>
        </div>
        
        <div className="space-y-3 mb-3">
          <div className="flex">
            <div className="mr-3 flex flex-col items-center">
              <div className="h-5 w-5 rounded-full border-2 border-blabla bg-white"></div>
              <div className="h-10 w-0.5 bg-gray-200 my-1"></div>
              <div className="h-5 w-5 rounded-full border-2 border-blabla bg-blabla"></div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-medium">{ride.from}</p>
                <p className="text-xs text-muted-foreground">{ride.time}</p>
              </div>
              <div>
                <p className="font-medium">{ride.to}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{ride.duration}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{formatDistance(ride.distance)}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{ride.availableSeats} seats left</span>
          </div>
        </div>
      </div>
    </div>
  );
}

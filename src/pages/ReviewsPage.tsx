
import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/navigation/BottomNav";
import { Card } from "@/components/mobile/Card";
import { Input } from "@/components/ui/input";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { 
  Star, 
  ChevronLeft, 
  Search, 
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample review data
const reviewsData = [
  {
    id: "1",
    reviewerName: "Sophie L.",
    reviewerAvatar: "https://i.pravatar.cc/150?img=49",
    rating: 5,
    comment: "Great ride! Thomas was punctual, friendly, and a safe driver. The car was clean and comfortable. Highly recommend!",
    date: "May 15, 2023",
    trip: "Paris → Lyon",
  },
  {
    id: "2",
    reviewerName: "Marc D.",
    reviewerAvatar: "https://i.pravatar.cc/150?img=53",
    rating: 4,
    comment: "Nice experience. The ride was smooth and we had good conversations along the way.",
    date: "April 22, 2023",
    trip: "Marseille → Nice",
  },
  {
    id: "3",
    reviewerName: "Julie B.",
    reviewerAvatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    comment: "Excellent driver! Very professional and made sure everyone was comfortable during the long journey.",
    date: "March 10, 2023",
    trip: "Bordeaux → Paris",
  },
  {
    id: "4",
    reviewerName: "Lucas M.",
    reviewerAvatar: "https://i.pravatar.cc/150?img=59",
    rating: 3,
    comment: "The ride was okay. The driver was a bit late but got us to the destination safely.",
    date: "February 5, 2023",
    trip: "Lyon → Grenoble",
  },
];

// Pending review requests
const pendingReviews = [
  {
    id: "5",
    driverName: "Emma W.",
    driverAvatar: "https://i.pravatar.cc/150?img=5",
    date: "May 20, 2023",
    trip: "Paris → Lille",
  },
  {
    id: "6",
    driverName: "Alexandre D.",
    driverAvatar: "https://i.pravatar.cc/150?img=12",
    date: "May 18, 2023",
    trip: "Lyon → Geneva",
  },
];

const ReviewsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("received");
  
  // Filter reviews based on search query
  const filteredReviews = reviewsData.filter(review => 
    review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.trip.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background safe-area-inset-padding pb-20">
        <header className="px-4 py-3 flex items-center justify-between bg-background z-10 border-b sticky top-0">
          <div className="flex items-center">
            <button 
              className="p-2 rounded-full hover:bg-secondary mr-2"
              onClick={() => navigate("/profile")}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold">Ratings & Reviews</h1>
          </div>
        </header>
        
        <div className="px-4 py-3">
          <div className="relative mb-4">
            <Input
              placeholder="Search reviews..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
          
          <Tabs defaultValue="received" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="received">Received</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
            
            <TabsContent value="received" className="mt-0">
              <div className="space-y-4">
                {activeTab === "received" && filteredReviews.length > 0 ? (
                  filteredReviews.map(review => (
                    <Card key={review.id} className="overflow-visible">
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                            <img 
                              src={review.reviewerAvatar} 
                              alt={review.reviewerName} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{review.reviewerName}</h3>
                                <div className="text-xs text-muted-foreground mb-1">
                                  {review.date} • {review.trip}
                                </div>
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, index) => (
                                  <Star 
                                    key={index} 
                                    className={`h-4 w-4 ${
                                      index < review.rating 
                                        ? 'text-yellow-400 fill-yellow-400' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm mt-2">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-8 w-8 text-muted-foreground" />
                    </div>
                    {searchQuery ? (
                      <p className="text-muted-foreground">No reviews match your search</p>
                    ) : (
                      <p className="text-muted-foreground">No reviews received yet</p>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <div className="space-y-4">
                {activeTab === "pending" && pendingReviews.length > 0 ? (
                  pendingReviews.map(review => (
                    <Card key={review.id} className="overflow-visible">
                      <div className="p-4">
                        <div className="flex items-start">
                          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                            <img 
                              src={review.driverAvatar} 
                              alt={review.driverName} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <h3 className="font-semibold">{review.driverName}</h3>
                            <div className="text-xs text-muted-foreground mb-2">
                              {review.date} • {review.trip}
                            </div>
                            <ButtonMobile
                              className="w-full bg-[#2DBEFF] hover:bg-[#2DBEFF]/90 text-white"
                              onClick={() => navigate(`/review/${review.id}`)}
                            >
                              Leave a review
                            </ButtonMobile>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No pending reviews</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default ReviewsPage;

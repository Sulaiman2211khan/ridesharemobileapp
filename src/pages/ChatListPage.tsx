
import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/navigation/BottomNav";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/mobile/Card";
import { Search, MessageCircle } from "lucide-react";

// Sample chat list data
const chatListData = [
  {
    id: "1",
    contactName: "Alexandre D.",
    avatar: "https://i.pravatar.cc/150?img=12",
    lastMessage: "Perfect! That works for me. I'll be there 15 minutes early.",
    timestamp: "09:30",
    date: "Today",
    unread: 0,
    isOnline: true,
  },
  {
    id: "2",
    contactName: "Carmen L.",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "Great! Can I bring a small suitcase with me?",
    timestamp: "17:45",
    date: "Yesterday",
    unread: 2,
    isOnline: false,
  },
  {
    id: "3",
    contactName: "Martin S.",
    avatar: "https://i.pravatar.cc/150?img=67",
    lastMessage: "I'll be waiting at the parking lot near the north entrance.",
    timestamp: "12:33",
    date: "Mon",
    unread: 0,
    isOnline: false,
  },
  {
    id: "4",
    contactName: "Julia R.",
    avatar: "https://i.pravatar.cc/150?img=23",
    lastMessage: "Thanks for the ride! Would definitely travel with you again.",
    timestamp: "08:15",
    date: "Aug 10",
    unread: 0,
    isOnline: true,
  },
];

const ChatListPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredChats = chatListData.filter(chat => 
    chat.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background safe-area-inset-padding">
        <header className="px-4 py-3 flex items-center justify-between sticky top-0 bg-background z-10 border-b">
          <h1 className="text-xl font-bold">Messages</h1>
        </header>
        
        <div className="px-4 py-3">
          <div className="relative">
            <Input
              placeholder="Search conversations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        
        <main className="flex-1 pb-20">
          {filteredChats.length > 0 ? (
            <div className="divide-y">
              {filteredChats.map((chat) => (
                <div 
                  key={chat.id}
                  className="px-4 py-3 flex items-center hover:bg-secondary/20 cursor-pointer"
                  onClick={() => navigate(`/chat/${chat.id}`)}
                >
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img 
                        src={chat.avatar} 
                        alt={chat.contactName} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold truncate">{chat.contactName}</h3>
                      <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                        {chat.date === "Today" ? chat.timestamp : chat.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  
                  {chat.unread > 0 && (
                    <div className="ml-2 flex-shrink-0">
                      <div className="h-6 w-6 bg-blabla text-white rounded-full flex items-center justify-center text-xs">
                        {chat.unread}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-60 px-4 text-center">
              <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              {searchQuery ? (
                <p className="text-muted-foreground">No conversations match your search</p>
              ) : (
                <p className="text-muted-foreground">No conversations yet</p>
              )}
            </div>
          )}
        </main>
        
        <BottomNav />
      </div>
    </MobileLayout>
  );
};

export default ChatListPage;

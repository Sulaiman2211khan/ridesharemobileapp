
import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { Card } from "@/components/mobile/Card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronLeft, 
  Send,
  Image,
  Paperclip,
  MoreVertical
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

// Sample conversations for demo
const chatData = {
  "1": {
    contactName: "Alexandre D.",
    avatar: "https://i.pravatar.cc/150?img=12",
    isOnline: true,
    lastSeen: "Just now",
    messages: [
      {
        id: "1",
        sender: "them",
        content: "Hello, I'm interested in your ride from Paris to Lyon tomorrow.",
        timestamp: "09:15",
        date: "Today",
      },
      {
        id: "2",
        sender: "you",
        content: "Hi Alexandre! Yes, I still have 2 seats available.",
        timestamp: "09:20",
        date: "Today",
      },
      {
        id: "3",
        sender: "them",
        content: "Great! I would like to book one seat. What time are you planning to leave exactly?",
        timestamp: "09:22",
        date: "Today",
      },
      {
        id: "4",
        sender: "you",
        content: "I'll be leaving at 9:00 AM from Gare de Lyon. Does that work for you?",
        timestamp: "09:25",
        date: "Today",
      },
      {
        id: "5",
        sender: "them",
        content: "Perfect! That works for me. I'll be there 15 minutes early.",
        timestamp: "09:30",
        date: "Today",
      }
    ]
  },
  "2": {
    contactName: "Carmen L.",
    avatar: "https://i.pravatar.cc/150?img=4",
    isOnline: false,
    lastSeen: "2 hours ago",
    messages: [
      {
        id: "1",
        sender: "them",
        content: "Hi, do you still have space for the Madrid to Barcelona trip?",
        timestamp: "Yesterday",
        date: "Yesterday",
      },
      {
        id: "2",
        sender: "you",
        content: "Hello Carmen, yes I have one seat left!",
        timestamp: "Yesterday",
        date: "Yesterday",
      },
      {
        id: "3",
        sender: "them",
        content: "Great! Can I bring a small suitcase with me?",
        timestamp: "Yesterday",
        date: "Yesterday",
      }
    ]
  }
};

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messageText, setMessageText] = useState("");
  
  // In a real app, you would fetch chat data based on the ID
  const chat = id && chatData[id] ? chatData[id] : null;
  
  if (!chat) {
    return (
      <MobileLayout>
        <div className="flex flex-col min-h-screen items-center justify-center p-4">
          <h1 className="text-xl font-bold mb-4">Chat not found</h1>
          <ButtonMobile onClick={() => navigate("/chats")}>
            Back to all chats
          </ButtonMobile>
        </div>
      </MobileLayout>
    );
  }

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    
    // In a real app, this would send the message to an API
    toast({
      description: "Message sent",
    });
    
    setMessageText("");
  };

  const formatDate = (dateStr: string) => {
    if (dateStr === "Today" || dateStr === "Yesterday") {
      return dateStr;
    }
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full min-h-screen bg-background">
        <header className="px-4 py-3 flex items-center justify-between bg-background z-10 border-b sticky top-0">
          <div className="flex items-center">
            <button 
              className="p-2 rounded-full hover:bg-secondary mr-2"
              onClick={() => navigate("/chats")}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden relative">
                <img 
                  src={chat.avatar} 
                  alt={chat.contactName} 
                  className="h-full w-full object-cover"
                />
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="ml-3">
                <div className="font-semibold">{chat.contactName}</div>
                <div className="text-xs text-muted-foreground">
                  {chat.isOnline ? "Online" : `Last seen ${chat.lastSeen}`}
                </div>
              </div>
            </div>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-full hover:bg-secondary">
                <MoreVertical className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="py-4">
                <h3 className="text-lg font-semibold mb-4">Chat options</h3>
                <div className="space-y-4">
                  <button className="w-full text-left py-2 hover:bg-secondary/50 rounded px-2">
                    View profile
                  </button>
                  <button className="w-full text-left py-2 hover:bg-secondary/50 rounded px-2">
                    Clear chat history
                  </button>
                  <button className="w-full text-left py-2 hover:bg-secondary/50 rounded px-2 text-destructive">
                    Block user
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        
        <main className="flex-1 p-4 overflow-y-auto flex flex-col-reverse">
          <div className="space-y-4">
            {chat.messages.map((message, index) => {
              const showDateHeader = 
                index === 0 || 
                chat.messages[index - 1].date !== message.date;
              
              return (
                <div key={message.id}>
                  {showDateHeader && (
                    <div className="text-center my-4">
                      <span className="text-xs bg-secondary/30 text-muted-foreground px-2 py-1 rounded-full">
                        {formatDate(message.date)}
                      </span>
                    </div>
                  )}
                  
                  <div 
                    className={`flex ${message.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === 'you' 
                          ? 'bg-blabla text-white rounded-br-none' 
                          : 'bg-secondary rounded-bl-none'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div 
                        className={`text-xs mt-1 ${
                          message.sender === 'you' ? 'text-white/70' : 'text-muted-foreground'
                        }`}
                      >
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }).reverse()}
          </div>
        </main>
        
        <footer className="p-2 border-t bg-background sticky bottom-0">
          <div className="flex items-end gap-2">
            <ButtonMobile size="icon" variant="ghost" className="flex-shrink-0">
              <Paperclip className="h-5 w-5" />
            </ButtonMobile>
            <ButtonMobile size="icon" variant="ghost" className="flex-shrink-0">
              <Image className="h-5 w-5" />
            </ButtonMobile>
            <div className="flex-1 relative">
              <Textarea 
                placeholder="Type a message..."
                className="resize-none pr-10 min-h-[50px] max-h-[150px]"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
            </div>
            <ButtonMobile 
              size="icon" 
              className="bg-blabla text-white hover:bg-blabla/90 flex-shrink-0"
              onClick={handleSendMessage}
              disabled={messageText.trim() === ""}
            >
              <Send className="h-5 w-5" />
            </ButtonMobile>
          </div>
        </footer>
      </div>
    </MobileLayout>
  );
};

export default ChatPage;

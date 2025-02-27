
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Calendar, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Search",
      path: "/search",
      icon: Search,
    },
    {
      name: "Trips",
      path: "/trips",
      icon: Calendar,
    },
    {
      name: "Messages",
      path: "/chats",
      icon: MessageCircle,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background h-16 md:hidden">
      <div className="grid grid-cols-5 h-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = 
            currentPath === item.path ||
            (item.path !== "/" && currentPath.startsWith(item.path));
            
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center text-xs font-medium",
                isActive
                  ? "text-blabla"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

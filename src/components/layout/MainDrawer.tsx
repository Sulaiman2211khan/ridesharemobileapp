
import { ReactNode, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface MainDrawerProps {
  children: ReactNode;
}

export function MainDrawer({ children }: MainDrawerProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Search Rides", path: "/search" },
    { title: "My Trips", path: "/trips" },
    { title: "My Bookings", path: "/bookings" },
    { title: "Profile", path: "/profile" },
    { title: "Settings", path: "/settings" },
    { title: "Help & Support", path: "/help" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 rounded-full hover:bg-secondary">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[280px]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blabla flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div className="ml-3">
                <h2 className="font-semibold text-lg">BlaBlaCar</h2>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-secondary flex items-center justify-center"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Menu Items */}
          <div className="flex-1 overflow-auto py-2">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className="flex items-center px-4 py-3 text-sm hover:bg-secondary"
                  onClick={() => setOpen(false)}
                >
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t">
            <button 
              className="w-full text-sm text-muted-foreground hover:text-destructive"
              onClick={() => {
                toast({ title: "Logged out" });
                setOpen(false);
              }}
            >
              Log out
            </button>
          </div>
          
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}

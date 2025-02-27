
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Home, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/trips", icon: Car, label: "My trips" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out transform bg-background/80 backdrop-blur-lg border-t border-border/40 safe-area-inset-padding",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavButton
            key={item.path}
            to={item.path}
            icon={<item.icon className="h-5 w-5" />}
            label={item.label}
            isActive={location.pathname === item.path}
          />
        ))}
      </nav>
    </div>
  );
}

interface NavButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavButton({ to, icon, label, isActive }: NavButtonProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center w-full h-full transition-all",
        isActive
          ? "text-blabla font-medium"
          : "text-muted-foreground"
      )}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
      <span
        className={cn(
          "absolute bottom-0 h-0.5 w-4 rounded-t-full transition-all duration-300",
          isActive ? "bg-blabla" : "bg-transparent"
        )}
      />
    </Link>
  );
}

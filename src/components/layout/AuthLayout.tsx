
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backTo?: string;
}

export function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  showBackButton = true, 
  backTo = "/" 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background safe-area-inset-padding">
      <header className="px-4 py-3 flex items-center">
        {showBackButton && (
          <Link to={backTo} className="p-2 rounded-full hover:bg-secondary">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        )}
      </header>
      
      <main className="flex-1 flex flex-col px-6 pt-6 pb-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        
        {children}
      </main>
    </div>
  );
}


import { useNavigate } from "react-router-dom";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen items-center justify-center px-4 py-8 text-center bg-background">
        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
          <span className="text-4xl">🚗</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <ButtonMobile
          className="bg-blabla hover:bg-blabla/90"
          onClick={() => navigate("/")}
        >
          <Home className="h-5 w-5 mr-2" />
          Back to home
        </ButtonMobile>
      </div>
    </MobileLayout>
  );
};

export default NotFound;

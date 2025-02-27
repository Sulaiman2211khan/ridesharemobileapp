
import { MobileLayout } from "@/components/layout/MobileLayout";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { 
  ChevronLeft, 
  BellRing, 
  Globe, 
  Shield, 
  CreditCard, 
  HelpCircle,
  ChevronRight,
  Mail
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleClearData = () => {
    toast({
      title: "Data cleared",
      description: "Your app data has been cleared successfully",
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
          <h1 className="text-lg font-semibold">Settings</h1>
          <div className="w-10"></div> {/* Empty div for spacing */}
        </header>
        
        <main className="flex-1 pb-6">
          {/* Notification settings */}
          <div className="px-4 py-4 border-b">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BellRing className="h-5 w-5 text-muted-foreground mr-3" />
                  <span>Push notifications</span>
                </div>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                  <span>Email notifications</span>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
            </div>
          </div>
          
          {/* Account settings */}
          <div className="px-4 py-4 border-b">
            <h2 className="text-lg font-semibold mb-4">Account</h2>
            <div className="space-y-4">
              <button className="flex items-center justify-between w-full py-2">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-muted-foreground mr-3" />
                  <span>Language</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <span className="mr-2">English</span>
                  <ChevronRight className="h-5 w-5" />
                </div>
              </button>
              <button className="flex items-center justify-between w-full py-2">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-muted-foreground mr-3" />
                  <span>Privacy</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="flex items-center justify-between w-full py-2">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-muted-foreground mr-3" />
                  <span>Payment methods</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>
          
          {/* Support */}
          <div className="px-4 py-4 border-b">
            <h2 className="text-lg font-semibold mb-4">Support</h2>
            <button className="flex items-center justify-between w-full py-2">
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 text-muted-foreground mr-3" />
                <span>Help center</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          
          {/* App data */}
          <div className="px-4 py-4">
            <h2 className="text-lg font-semibold mb-4">App data</h2>
            <ButtonMobile
              variant="outline"
              className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
              onClick={handleClearData}
            >
              Clear app data
            </ButtonMobile>
            <p className="text-xs text-muted-foreground mt-2">
              This will clear cached data, but won't delete your account.
            </p>
          </div>
          
          <div className="mt-6 px-4 text-center text-xs text-muted-foreground">
            <p>BlaBlaCar Clone</p>
            <p>Version 1.0.0</p>
          </div>
        </main>
      </div>
    </MobileLayout>
  );
};

export default SettingsPage;

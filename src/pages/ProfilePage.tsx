
import { useState } from "react";
import { MobileLayout } from "@/components/layout/MobileLayout";
import { BottomNav } from "@/components/navigation/BottomNav";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Star, 
  Settings, 
  LogOut,
  Edit
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Sample user data
const userData = {
  name: "Emma Wilson",
  email: "emma.wilson@example.com",
  phone: "+33 6 12 34 56 78",
  joined: "2021",
  rides: 24,
  rating: 4.8,
  verifications: ["Email", "Phone", "ID"],
  avatar: "https://i.pravatar.cc/150?img=5"
};

const ProfilePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    navigate("/login");
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background safe-area-inset-padding">
        <header className="px-4 py-3 flex items-center justify-between bg-background z-10 border-b">
          <h1 className="text-xl font-bold">Profile</h1>
          <ButtonMobile 
            size="sm" 
            variant="ghost"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? "Done" : <Edit className="h-5 w-5" />}
          </ButtonMobile>
        </header>
        
        <main className="flex-1 px-4 py-6 pb-20">
          {/* User basic info */}
          <div className="flex items-center mb-8">
            <div className="relative">
              <div className="h-20 w-20 rounded-full overflow-hidden">
                <img 
                  src={userData.avatar} 
                  alt={userData.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              {isEditMode && (
                <button className="absolute bottom-0 right-0 bg-blabla text-white p-1 rounded-full">
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">{userData.name}</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span>{userData.rating} · {userData.rides} rides</span>
              </div>
              <p className="text-sm text-muted-foreground">Member since {userData.joined}</p>
            </div>
          </div>
          
          {/* User contact and verifications */}
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">Contact information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-muted-foreground mr-3" />
                  <span>{userData.phone}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Verifications</h3>
              <div className="space-y-3">
                {userData.verifications.map((verification) => (
                  <div key={verification} className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-3" />
                    <span>{verification} verified</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* App options */}
          <div className="space-y-4 border-t pt-6">
            <ButtonMobile
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </ButtonMobile>
            
            <ButtonMobile
              variant="outline"
              className="w-full justify-start text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Log out
            </ButtonMobile>
          </div>
        </main>
        
        <BottomNav />
      </div>
    </MobileLayout>
  );
};

export default ProfilePage;

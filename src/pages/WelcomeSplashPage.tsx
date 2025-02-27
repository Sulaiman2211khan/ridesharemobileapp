
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { Car, Users, Sparkles, ChevronsDown } from "lucide-react";

const WelcomeSplashPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#054752] to-[#2DBEFF]/90 text-white p-6 safe-area-inset-padding">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="text-center mb-12 animate-fade-in">
          <Sparkles className="h-16 w-16 mb-4 mx-auto text-[#9EF769]" />
          <h1 className="text-4xl font-bold mb-4">Welcome to Rideshare!</h1>
          <p className="text-xl opacity-90">
            Your journey to affordable, eco-friendly travel starts here
          </p>
        </div>
        
        <div className="w-full space-y-6 mb-12 animate-fade-in">
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-lg p-4">
            <div className="h-12 w-12 rounded-full bg-[#9EF769]/20 flex items-center justify-center mr-4 flex-shrink-0">
              <Car className="h-6 w-6 text-[#9EF769]" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Find affordable rides</h3>
              <p className="text-sm opacity-90">Save money by sharing travel costs</p>
            </div>
          </div>
          
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-lg p-4">
            <div className="h-12 w-12 rounded-full bg-[#9EF769]/20 flex items-center justify-center mr-4 flex-shrink-0">
              <Users className="h-6 w-6 text-[#9EF769]" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Connect with travelers</h3>
              <p className="text-sm opacity-90">Meet new people heading your way</p>
            </div>
          </div>
          
          <div className="flex items-center bg-white/10 backdrop-blur-md rounded-lg p-4">
            <div className="h-12 w-12 rounded-full bg-[#9EF769]/20 flex items-center justify-center mr-4 flex-shrink-0">
              <Sparkles className="h-6 w-6 text-[#9EF769]" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Reduce your carbon footprint</h3>
              <p className="text-sm opacity-90">Help the environment by sharing rides</p>
            </div>
          </div>
        </div>
        
        <div className="w-full space-y-4 animate-fade-in">
          <ButtonMobile
            className="w-full bg-[#2DBEFF] hover:bg-[#2DBEFF]/90 text-white border-white/20"
            onClick={() => navigate("/")}
          >
            Get Started
          </ButtonMobile>
          
          <div className="text-center text-sm">
            <p className="opacity-80">Swipe down to explore</p>
            <ChevronsDown className="h-5 w-5 mx-auto mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSplashPage;

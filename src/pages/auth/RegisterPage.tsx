
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Your account has been created",
      });
      navigate("/login");
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Create account" 
      subtitle="Enter your details to create a new account"
    >
      <form onSubmit={handleRegister} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="h-12"
            autoComplete="name"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-12"
            autoComplete="email"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="h-12 pr-10"
              autoComplete="new-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Password must be at least 8 characters long
          </p>
        </div>
        
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blabla focus:ring-blabla"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-muted-foreground">
            I agree to the{" "}
            <Link to="/terms" className="text-blabla">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blabla">
              Privacy Policy
            </Link>
          </label>
        </div>
        
        <ButtonMobile
          type="submit"
          className="w-full bg-blabla hover:bg-blabla/90"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </ButtonMobile>
        
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-blabla">
            Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;

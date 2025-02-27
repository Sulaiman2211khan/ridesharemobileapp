
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonMobile } from "@/components/ui/button-mobile";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Search as SearchIcon } from "lucide-react";

export function SearchForm({ className }: { className?: string }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?from=${from}&to=${to}&date=${date}`);
  };

  return (
    <form onSubmit={handleSearch} className={`space-y-4 ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="Leaving from..."
          className="pl-10 h-12 bg-white shadow-sm"
        />
      </div>
      
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Going to..."
          className="pl-10 h-12 bg-white shadow-sm"
        />
      </div>
      
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="pl-10 h-12 bg-white shadow-sm"
        />
      </div>
      
      <ButtonMobile 
        type="submit" 
        className="w-full bg-blabla hover:bg-blabla/90"
      >
        <SearchIcon className="h-5 w-5 mr-2" />
        Search
      </ButtonMobile>
    </form>
  );
}

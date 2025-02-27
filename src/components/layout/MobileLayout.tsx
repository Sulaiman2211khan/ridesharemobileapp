
import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="mx-auto max-w-md h-full min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}

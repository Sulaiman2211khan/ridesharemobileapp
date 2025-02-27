
import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  pressable?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, pressable, onClick }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-card rounded-xl border border-border overflow-hidden",
        pressable && "press-effect cursor-pointer",
        className
      )}
      onClick={pressable ? onClick : undefined}
    >
      {children}
    </div>
  );
}

Card.Content = function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("", className)}>{children}</div>;
};

Card.Header = function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-4", className)}>{children}</div>;
};

Card.Footer = function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-4 border-t", className)}>{children}</div>;
};

Card.Title = function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>;
};

Card.Description = function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
};

export { Card };

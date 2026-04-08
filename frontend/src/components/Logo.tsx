import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const Logo = ({ className, iconOnly = false, size = "md", onClick }: LogoProps) => {
  const sizes = {
    sm: { icon: "h-6 w-6", text: "text-lg" },
    md: { icon: "h-8 w-8", text: "text-xl" },
    lg: { icon: "h-12 w-12", text: "text-3xl" },
  };

  const currentSize = sizes[size];

  return (
    <div 
      className={cn("flex items-center gap-2 cursor-pointer", className)} 
      onClick={onClick}
    >
      <img 
        src="/medinova.png" 
        alt="MediNova Logo" 
        className={cn("object-contain", currentSize.icon)} 
      />
      {!iconOnly && (
        <span className={cn("font-bold tracking-tight", currentSize.text)}>
          <span className="text-[#0A1F44]">Medi</span>
          <span className="text-[#00C896]">Nova</span>
        </span>
      )}
    </div>
  );
};

export default Logo;

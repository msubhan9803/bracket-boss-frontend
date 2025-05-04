import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from '@/graphql/generated/graphql';
import { cn } from "@/lib/utils";

interface TeamAvatarProps {
  user: User;
  variant?: 'primary' | 'secondary';
}

const TeamAvatar = ({ user, variant = 'primary' }: TeamAvatarProps) => {
  const getFallbackClasses = () => {
    switch (variant) {
      case 'secondary':
        return "bg-secondary text-secondary-foreground text-xs sm:text-sm";
      case 'primary':
      default:
        return "bg-primary text-primary-foreground text-xs sm:text-sm";
    }
  };

  return (
    <Avatar className="border-2 border-white w-8 h-8 sm:w-10 sm:h-10">
      <AvatarFallback className={cn(getFallbackClasses())}>
        {user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default TeamAvatar;

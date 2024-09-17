import React from "react";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SelectableCardProps {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
}

const SelectableCard: React.FC<SelectableCardProps> = ({
  id,
  value,
  label,
  icon,
}) => {
  return (
    <div>
      <RadioGroupItem value={value} id={id} className="peer sr-only" />
      <Label
        htmlFor={id}
        className={cn(
          "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-8 hover:bg-primary/50 hover:text-accent-foreground peer-data-[state=checked]:border-primary",
          "[&:has([data-state=checked])]:border-primary"
        )}
      >
        {icon}
        <span className="mt-3">{label}</span>
      </Label>
    </div>
  );
};

export default SelectableCard;

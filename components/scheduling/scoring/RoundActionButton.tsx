import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const RoundActionButton = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <Button
      variant="secondary"
      className={cn("flex-1", className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default RoundActionButton;

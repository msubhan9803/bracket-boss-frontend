import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

const ScoreDisplay = ({
  score,
  onIncrement,
  onDecrement,
}: {
  score: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}) => {
  return (
    <div className="flex items-center space-x-2">
      {onDecrement && (
        <Button
          variant="default"
          size="icon"
          className="rounded-full bg-green-500 text-white hover:bg-green-600"
          onClick={onDecrement}
        >
          <Minus className="h-6 w-6" />
        </Button>
      )}
      <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center">
        <span className="text-2xl font-bold">{score}</span>
      </div>
      {onIncrement && (
        <Button
          variant="default"
          size="icon"
          className="rounded-full bg-green-500 text-white hover:bg-green-600"
          onClick={onIncrement}
        >
          <Plus className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default ScoreDisplay;

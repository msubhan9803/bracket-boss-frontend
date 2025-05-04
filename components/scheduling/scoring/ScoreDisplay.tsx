import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import React from "react";

interface ScoreDisplayProps {
  score: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onScoreChange?: (newScore: number) => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  onIncrement,
  onDecrement,
  onScoreChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && onScoreChange) {
      onScoreChange(newValue);
    }
  };

  return (
    <div className="flex items-center space-x-2 max-md:mx-auto max-md:mt-4">
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
      <Input
        type="text"
        className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center text-center text-2xl font-bold"
        value={score}
        onChange={handleChange}
      />
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
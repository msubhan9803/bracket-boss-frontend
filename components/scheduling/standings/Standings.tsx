import React, { useEffect, useState } from "react";
import { Level } from "@/graphql/generated/graphql";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import LevelTeamStandingsTable from "@/components/tables/LevelTeamStandingsTable";

type Props = {
  levels: Level[];
};

export default function StandingsManagement({ levels }: Props) {
  const [selectedLevel, setSelectedLevel] = useState<Level>();

  useEffect(() => {
    if (levels?.length && !selectedLevel) {
      setSelectedLevel(levels[0]);
    }
  }, [levels]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4">
        <Select
          onValueChange={(value) => {
            const level = levels?.find((l) => l.id === value);
            setSelectedLevel(level);
          }}
          value={selectedLevel?.id}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            {levels?.map((level) => (
              <SelectItem key={level.id} value={level.id}>
                {level.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedLevel && (
        <div className="gap-5">
          <LevelTeamStandingsTable levelId={selectedLevel.id} />
        </div>
      )}
    </div>
  );
}

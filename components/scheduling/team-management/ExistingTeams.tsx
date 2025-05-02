import { Team } from "@/graphql/generated/graphql";
import TeamCard from "../TeamCard";
import SkeletonLoader from "@/components/ui/skeleton";

type ExistingPlayersProps = {
  teams: Team[];
  isLoading: boolean;
};

export default function ExistingTeams({
  teams,
  isLoading,
}: ExistingPlayersProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <SkeletonLoader key={index} type="teamCard" />
          ))
        : teams.map((team, index) => (
            <TeamCard key={index} team={team} teamIndex={index} />
          ))}
    </div>
  );
}

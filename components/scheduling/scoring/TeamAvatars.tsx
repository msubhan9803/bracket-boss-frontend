import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Team } from "@/graphql/generated/graphql";
import TeamAvatar from "./TeamAvatar";

const TeamAvatars = ({
  team,
  variant,
}: {
  team: Team;
  variant?: "primary" | "secondary";
}) => {
  const users = team.users || [];

  return (
    <div className="flex flex-col items-center md:flex-row md:items-center md:space-x-3">
      <div className="flex -space-x-2">
        {users.length > 0 ? (
          <>
            {users.slice(0, 3).map((user) => (
              <TeamAvatar key={user.id} user={user} variant={variant} />
            ))}
            {users.length > 3 && (
              <Avatar className="border-2 border-white w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  +{users.length - 3}
                </AvatarFallback>
              </Avatar>
            )}
          </>
        ) : (
          <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            <span className="text-xs">
              {team.name.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <span className="mt-2 md:mt-0 font-bold text-lg">{team.name}</span>
    </div>
  );
};

export default TeamAvatars;

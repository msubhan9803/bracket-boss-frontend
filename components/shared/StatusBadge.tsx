import { MatchStatusTypes, RoundStatusTypesEnum } from "@/graphql/generated/graphql";
import { convertSnakeCaseToTitleCase } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type MatchStatusBadgeProps = {
  status: MatchStatusTypes;
};
export const MatchStatusBadge: React.FC<MatchStatusBadgeProps> = ({ status }) => {
  const MatchstatusBadgeVariants: Record<MatchStatusTypes, string> = {
    [MatchStatusTypes.Completed]: "bg-blue-500 text-white",
    [MatchStatusTypes.InProgress]: "bg-green-500 text-black",
    [MatchStatusTypes.NotStarted]: "bg-gray-500 text-white",
    [MatchStatusTypes.Paused]: "bg-yellow-500 text-white",
    [MatchStatusTypes.Void]: "bg-red-500 text-white",
  };

  return (
    <Badge className={`${MatchstatusBadgeVariants[status]} rounded-md text-xs`}>
      Match {convertSnakeCaseToTitleCase(status)}
    </Badge>
  );
};

type RoundStatusBadgeProps = {
  status: RoundStatusTypesEnum;
};
export const RoundStatusBadge: React.FC<RoundStatusBadgeProps> = ({ status }) => {
  const MatchstatusBadgeVariants: Record<RoundStatusTypesEnum, string> = {
    [RoundStatusTypesEnum.Completed]: "bg-blue-500 text-white",
    [RoundStatusTypesEnum.InProgress]: "bg-green-500 text-black",
    [RoundStatusTypesEnum.NotStarted]: "bg-gray-500 text-white",
  };

  return (
    <Badge className={`${MatchstatusBadgeVariants[status]} rounded-md text-xs`}>
      {convertSnakeCaseToTitleCase(status)}
    </Badge>
  );
};

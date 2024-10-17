import { Badge } from "@/components/ui/badge";

type Props = {
  tournamentDetails: {
    id: number;
    name: string;
    description: string;
    isPrivate: boolean;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
  };
};

export default function TournamentCard({ tournamentDetails }: Props) {
  return (
    <div className="rounded-lg my-4">
      <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12">
        <div className="bg-green-0 flex flex-col justify-between">
          <div className="pb-6">
            <Badge className="my-2">
              {tournamentDetails.isPrivate ? "Private Event" : "Public Event"}
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold">
              {tournamentDetails.name}
            </h2>
            <p className="text-xl text-muted-foreground mt-4">
              {tournamentDetails.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GiftIcon, MapIcon, MedalIcon, PlaneIcon } from "@/components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Player Management",
    description:
      "Easily register, track, and manage players in your Pickleball tournaments with real-time updates.",
  },
  {
    icon: <MapIcon />,
    title: "Tournament Scheduling",
    description:
      "Organize tournaments with customizable match schedules and bracket structures tailored to your needs.",
  },
  {
    icon: <PlaneIcon />,
    title: "Club Growth",
    description:
      "Scale your Pickleball club effortlessly with tools for handling multiple events and teams simultaneously.",
  },
  {
    icon: <GiftIcon />,
    title: "Rewards System",
    description:
      "Engage players with gamification features, including badges and rewards for tournament achievements.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Discover how Bracket Boss simplifies managing your Pickleball tournaments, players, and events.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

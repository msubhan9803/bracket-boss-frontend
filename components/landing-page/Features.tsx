import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "@/public/images/growth.png";
import image3 from "@/public/images/reflecting.png";
import image4 from "@/public/images/looking-ahead.png";
import Image, { StaticImageData } from "next/image";
import { Badge } from "@/components/ui/badge";

interface FeatureProps {
  title: string;
  description: string;
  image: StaticImageData;
}

const features: FeatureProps[] = [
  {
    title: "Real-Time Score Tracking",
    description:
      "Keep track of scores live during matches and provide real-time updates to players and spectators.",
    image: image4,
  },
  {
    title: "Easy Tournament Management",
    description:
      "Simplify the setup and management of Pickleball tournaments with intuitive bracket and scheduling tools.",
    image: image3,
  },
  {
    title: "AI-Powered Player Insights",
    description:
      "Analyze player performance and trends using advanced AI-powered insights to improve future strategies.",
    image: image,
  },
];

const featureList: string[] = [
  "Live Scores",
  "Tournament Setup",
  "Player Management",
  "Team Scheduling",
  "Analytics Dashboard",
  "Event Registration",
  "Club Growth Tools",
  "AI-Powered Insights",
  "Customizable Brackets",
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Many{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Amazing Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <Image
                src={image}
                alt="Feature image"
                className="w-[200px] lg:w-[300px] mx-auto"
                width={200}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

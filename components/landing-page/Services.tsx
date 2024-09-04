import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "../Icons";
import cubeLeg from "@/public/images/cube-leg.png";
import Image from "next/image";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Tournament Planning",
    description:
      "Effortlessly plan and schedule Pickleball tournaments with customizable brackets and event timelines.",
    icon: <ChartIcon />,
  },
  {
    title: "Club Management",
    description:
      "Manage all aspects of your Pickleball club, from player registrations to team organization, in one place.",
    icon: <WalletIcon />,
  },
  {
    title: "Automated Scheduling",
    description:
      "Automatically schedule matches and events, ensuring optimal times for all players while avoiding conflicts.",
    icon: <MagnifierIcon />,
  }
];

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              Pickleball{" "}
            </span>
            Management Services
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 ">
            Discover the tools and services that make running your Pickleball club and tournaments a breeze.
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
                  <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Image
          src={cubeLeg}
          className="w-[300px] md:w-[500px] lg:w-[600px] object-contain"
          alt="Pickleball management services"
          width={300}
        />
      </div>
    </section>
  );
};

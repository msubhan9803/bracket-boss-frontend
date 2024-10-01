import Image from "next/image";
import ClubStatistics from "./ClubStatistics";

type Props = {
  clubDetails: {
    name: string;
    description: string;
    logo: string;
  };
};

export default function ClubCard({ clubDetails }: Props) {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image
            src={clubDetails.logo}
            className="w-[250px] rounded-lg"
            width={250}
            height={250}
            alt="Pickleball player"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  {clubDetails.name}
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                {clubDetails.description}
              </p>
            </div>

            <ClubStatistics />
          </div>
        </div>
      </div>
    </section>
  );
}

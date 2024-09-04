import Image from "next/image";
import pilot from "@/public/images/pilot.png";
import { Statistics } from "./Statistics";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Image
            src={pilot}
            className="w-[300px] object-contain rounded-lg"
            width={300}
            alt="Pickleball player"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Bracket Boss
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Bracket Boss is your all-in-one Pickleball management platform. 
                From organizing tournaments to managing player registrations and tracking match results, 
                we make it easy to streamline every aspect of your Pickleball club.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};

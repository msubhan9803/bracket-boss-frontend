import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import { PageUrls } from "@/lib/app-types";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              The Bracket Boss
            </span>{" "}
            Manage Your
          </h1>{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              Pickleball
            </span>{" "}
            Club Like a Pro
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Simplify player registrations, organize tournaments, track scores, and manage
          your Pickleball club efficiently with Bracket Boss.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link href={PageUrls.REGISTRATION}>
            <Button className="w-full md:w-1/3 font-bold">Register Now</Button>
          </Link>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};

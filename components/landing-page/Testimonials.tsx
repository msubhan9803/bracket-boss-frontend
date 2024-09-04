import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://github.com/shadcn.png",
    name: "Sarah Johnson",
    userName: "@sarah_pickles",
    comment: "Bracket Boss has completely streamlined our tournaments!",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Michael Lee",
    userName: "@michael_lee",
    comment:
      "Managing player registrations and scheduling matches has never been easier. The automated scheduling feature has saved us so much time, and the ability to track real-time scores has really elevated the experience for both players and spectators. Bracket Boss is a game-changer for our club!",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Emily Davis",
    userName: "@emily_davis",
    comment:
      "The real-time score tracking feature is a game-changer for our club.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "David Thompson",
    userName: "@david_thompson",
    comment:
      "I love how Bracket Boss simplifies everything, from organizing tournaments to managing teams. The platform offers a seamless experience for setting up events, tracking scores, and keeping everyone informed with automated updates. It has become an essential tool for our Pickleball club, helping us run events more efficiently and giving players an enhanced experience. Whether you're managing a small local tournament or a large-scale event, Bracket Boss has all the tools you need to stay organized and save time.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Lisa Wong",
    userName: "@lisa_wong",
    comment:
      "Our club has grown rapidly thanks to the tools and features provided by Bracket Boss. We’ve been able to organize larger tournaments with ease and keep players engaged with seamless communication. The platform’s intuitive design and powerful features make managing multiple events stress-free. Highly recommend it!",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "James Smith",
    userName: "@james_smith",
    comment:
      "The automated notifications keep everyone informed and on time. Fantastic platform!",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold">
        Discover Why
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          People Love{" "}
        </span>
        Bracket Boss
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        See how Bracket Boss has transformed Pickleball clubs around the world.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage alt="" src={image} />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};

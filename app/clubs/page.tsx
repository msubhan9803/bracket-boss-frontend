import ClubCard from "@/components/clubs/ClubCard";
import { Navbar } from "@/components/landing-page/Navbar";
import { getAllClubs } from "@/services/club.service";

export default async function Clubs() {
  const clubs = await getAllClubs();
  const selectedClub = clubs[0];

  return (
    <>
      <Navbar />
      <ClubCard
        clubDetails={{
          ...selectedClub,
          description:
            "Bracket Boss is your all-in-one Pickleball management platform. From organizing tournaments to managing player registrations and tracking match results, we make it easy to streamline every aspect of your Pickleball club.",
        }}
      />
    </>
  );
}

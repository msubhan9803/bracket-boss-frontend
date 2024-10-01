import { Navbar } from "@/components/landing-page/Navbar";
import { getAllClubs } from "@/services/club.service";

export default async function Clubs() {
  const clubs = await getAllClubs();
  console.log("🌺🌺🌺🌺 clubs: ", clubs);

  return (
    <>
      <Navbar />

      <h1 className="text-3xl font-bold p-20">Clubs</h1>
    </>
  );
}

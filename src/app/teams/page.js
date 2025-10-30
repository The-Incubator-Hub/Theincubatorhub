import Navbar from "@/components/Navbar.js";
import Header from "@/components/Header.js";
import TeamIntro from "@/components/TeamIntro.js";
import Teamgrid from "@/components/Teamgrid.js";
import JoinUs from "@/components/JoinUs.js"
import FooterR from "@/components/FooterR.js"

export default function Page() {
  return (
    <div>
      <Navbar />
      <Header />
      <TeamIntro />
      <Teamgrid />
      <JoinUs />
      <FooterR />
    </div>
  );
}
// src/app/(marketing)/page.tsx

import Dreambox from "../components/business/Dreambox";
import Nysc from "../components/business/Nysc";
import Rove from "../components/business/Rove";
import EstateApp from "../components/marketing/EstateApp";

// import { Hero } from "../components/marketing/Hero";
import { PartnerStrip } from "../components/marketing/PartnerStrip";
// import { Hero } from "../components/marketing/Hero";
// import { PartnerStrip } from "../components/marketing/PartnerStrip";
import { ServicesGrid } from "../components/marketing/ServicesGrid";
import UpdateStrip from "../components/marketing/UpdateStrip";
// import { BusinessSpotlight } from "@/components/marketing/BusinessSpotlight";
// import { ServicesGrid } from "@/components/marketing/ServicesGrid";
// import { TalentAcademy } from "@/app/components/marketing/TalentAcademy";

export default function LandingPage() {
  return (
    <main className="min-h-screen ">
      {/* 1. The "Command Center" Hero Section */}
      {/* <Hero /> */}
      {/* <UpdateStrip /> */}
      {/* 2. The "Buttons" Ecosystem (Services) */}
      {/* <Hero/> */}
      <ServicesGrid />

      {/* <PartnerStrip/> */}
      

      {/* ROVE */}
      {/* <Rove /> */}
      {/* <Nysc /> */}
      {/* <Dreambox /> */}

      {/* Who are we? */}

      {/* 3. The Business Partners (Visibility Section) */}
      {/* <BusinessSpotlight /> */}
      {/* <PartnerStrip /> */}

      {/* 4. The Talent & Academy (Builders & Students) */}
      {/* <TalentAcademy /> */}

      {/*  */}


      {/* NEW APP */}
      {/* <EstateApp /> */}

    </main>
  );
}

import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Trust from "./components/Trust";

import Footer from "./components/Footer";

import Showroom from "./components/Showroom";
import BusinessTiers from "./components/BusinessTiers";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Trust/> 

    <Showroom />
    <BusinessTiers />


    {/* <Infrastructure/> */}
    
    {/* <TheFleet/> */}
    {/* <Pricing/> */}
    {/* <ThePortal/> */}
    <Footer /> 

    </>
  );
}

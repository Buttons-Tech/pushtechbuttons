"use client";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Trust from "./components/Trust";
import OriginStory from "./components/OriginStory";

import Footer from "./components/Footer";

import Showroom from "./components/Showroom";
import BusinessTiers from "./components/BusinessTiers";
import { useState } from "react";

export default function Home() {

  const [isStoryOpen, setIsStoryOpen] = useState(false);
  return (
    <>
    <Navbar onOpenStory={() => setIsStoryOpen(true)}/>
      <OriginStory 
        isOpen={isStoryOpen} 
        onClose={() => setIsStoryOpen(false)} 
      />
    <Hero onOpenStory={() => setIsStoryOpen(true)}/>
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

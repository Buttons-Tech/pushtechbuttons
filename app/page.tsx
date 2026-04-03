import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Trust from "./components/Trust";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import Infrastructure from "./components/Infrastructure";
import TheFleet from "./components/TheFleet";
import ThePortal from "./components/ThePortal";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Infrastructure/>
    <Trust/> 
    <TheFleet/>
    <Pricing/>
    <ThePortal/>
    <Footer /> 

    </>
  );
}

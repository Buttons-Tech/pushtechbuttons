import Image from "next/image";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Trust from "./components/Trust";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Trust/> 
    <Pricing/>
    <Footer /> 

    </>
  );
}

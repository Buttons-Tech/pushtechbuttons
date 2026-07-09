import Image from "next/image";
import React from "react";

const Rove = () => {
  return (
    <div className="bg-black rounded-xl text-white flex items-center-safe justify-between  ">
      <div className="ml-20 text-xl ">
        <span className="font-black text-4xl text-amber-400">RoVE</span> <br />
        <span>Reliable. </span>
        <span> Local.</span>
        <br />
        <span>Right on Time</span>
        <br />
        <button className="bg-amber-400 p-3 rounded-full text-sm text-black mt-3 w-full">
          Request Delivery
        </button>
      </div>

      <Image
        height={300}
        width={200}
        loading="eager"
        src="/images/rove.jpg"
        className="w-auto h-auto"
        alt=""
      />
    </div>
  );
};

export default Rove;

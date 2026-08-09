import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="w-auto">
      {/* <Image 
src="/images/signup.avif"
width={500}
height={300}
alt='signup'
      /> */}
      <div className="w-full m-auto  h-full bg-amber-300 ">
        <span className="font-bold">Store Registration</span>
        <div className="">
          <label htmlFor="">Store Name:</label> <br />
          <input type="text" className="bg-gray-200" />
        </div>
        <div className="">
          <label htmlFor="">Store owner :</label> <br />
          <input type="text" className="bg-gray-200" />
        </div>
        <div className="">
          <label htmlFor="">Whatsapp:</label> <br />
          <input type="text" className="bg-gray-200" />
        </div>
        <div className="">
          <label htmlFor="">Socials</label> <br />
          <input type="text" className="bg-gray-200" />
        </div>
        <div className="">
          <label htmlFor="">Location</label> <br />
          <input type="text" className="bg-gray-200" />
        </div>
        <div className="">
          <label htmlFor="">Email</label> <br />
          <input type="text" className="bg-gray-200" />
        </div>
        <div className="">
          <label htmlFor="">Payment</label> <br />
          <input type="text" className="bg-gray-200" />
        </div>
        <div className="">
          <label htmlFor="">Images</label> <br />
          <input type="text" className="bg-gray-200" />
        </div>
      </div>

      <div>
        <span className="font-bold">Create Food Item</span>
        <div className="w-full  bg-black text-white">
          <div className="px-4">
            <label htmlFor="">Food Item</label> <br />
            <input type="text" className="bg-gray-300" />
          </div>
          <div className="px-4">
            <label htmlFor="">Description</label> <br />
            <input type="text" className="bg-gray-300" />
          </div>
          <div className="px-4">
            <label htmlFor="">Category</label> <br />
            <input type="text" className="bg-gray-300 text-black" />
          </div>

          <div className="px-4">
            <label htmlFor="">Image</label> <br />
            <input type="text" className="bg-gray-300 text-black" />
          </div>

          <div className="px-4">
            <label htmlFor="">Price</label> <br />
            <input type="text" className="bg-gray-300 text-black" />
          </div>
          <button className="bg-amber-300 w-20 text-black font-bold m-auto">CREATE</button>
        </div>
      </div>
    </div>
  );
};

export default page;

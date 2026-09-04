import React from "react";

const ButtonStrip = () => {
  return (
    <>
      <div className="bg-gray-200 w-full h-20 flex m-auto items-center justify-center text-gray-700 gap-7">
        <span className="border border-gray-400 rounded py-2 px-4 bg-gray-300 text-sm">
          {" "}
          Secured by <span className="font-bold text-xl text-black">Black Guard </span>  
        </span>
        <span className="border b rounded py-2 px-4 bg-gray-300 border-gray-400 text-sm ">
          Payments by <span className="font-bold text-xl text-green-800">opay</span>  
        </span>
        <span className="border b rounded py-2 px-4 bg-gray-300 border-gray-400 text-sm ">
         <span className="font-bold text-xl text-pink-600">Paatee </span> Wallet
        </span>
      </div>
    </>
  );
};

export default ButtonStrip;

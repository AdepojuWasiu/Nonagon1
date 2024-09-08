'use client'
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import {PiHandTapBold} from "react-icons/pi";
import Image from "next/image";
import { useEnergy } from "@/context/context";

const Earn = () => {
  const { points } = useEnergy();

  return (
    <div className="p-4">
      
      <div className="flex justify-center items-center justify-items-center content-center mt-5">
         <div>
           <h1 className="font-bold text-[25px] mb-6 pl-7">Earn</h1>
           <h1 className="font-bold text-[15px] pl-5">Your Balance</h1>
         </div>
      </div>
      <div className="flex justify-center items-center gap-[5px]">
            <Image src="/assets/coin.png" alt="coin" width={40} height={40}/>
            <p className="text-[23px] font-bold">{points.toLocaleString()}</p>
      </div>

      <h1 className="text-[20px] font-bold mt-7">Daily tasks</h1>
         <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
            <div className="flex gap-2">
                 <PiHandTapBold color="gold" className="w-[50px] h-[50px]" />
                 <div>
                    <p className="text-[17px] font-bold">Daily Reward</p>
                    <div className="flex gap-2">
                        <Image src="/assets/coin.png" alt="coin" width={20} height={20}/>
                        <p>+6,000, 000</p>
                    </div>
                 </div>
            </div>
            <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
          </div>

          <h1 className="text-[20px] font-bold mt-10">Tasks List</h1>
         <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
            <div className="flex gap-2">
                 <PiHandTapBold color="gold" className="w-[50px] h-[50px]" />
                 <div>
                    <p className="text-[17px] font-bold">Follow our X account</p>
                    <div className="flex gap-2">
                        <Image src="/assets/coin.png" alt="coin" width={20} height={20}/>
                        <p>+40,000</p>
                    </div>
                 </div>
            </div>
            <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
          </div>
          <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
            <div className="flex gap-2">
                 <PiHandTapBold color="gold" className="w-[50px] h-[50px]" />
                 <div>
                    <p className="text-[17px] font-bold">Follow our X account</p>
                    <div className="flex gap-2">
                        <Image src="/assets/coin.png" alt="coin" width={20} height={20}/>
                        <p>+40,000</p>
                    </div>
                 </div>
            </div>
            <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
          </div>
          <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
            <div className="flex gap-2">
                 <PiHandTapBold color="gold" className="w-[50px] h-[50px]" />
                 <div>
                    <p className="text-[17px] font-bold">Follow our X account</p>
                    <div className="flex gap-2">
                        <Image src="/assets/coin.png" alt="coin" width={20} height={20}/>
                        <p>+40,000</p>
                    </div>
                 </div>
            </div>
            <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
          </div>
          <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
            <div className="flex gap-2">
                 <PiHandTapBold color="gold" className="w-[50px] h-[50px]" />
                 <div>
                    <p className="text-[17px] font-bold">Follow our X account</p>
                    <div className="flex gap-2">
                        <Image src="/assets/coin.png" alt="coin" width={20} height={20}/>
                        <p>+40,000</p>
                    </div>
                 </div>
            </div>
            <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
          </div>
    </div>
  )
}

export default Earn

'use client'

import {IoMdBatteryCharging} from "react-icons/io";
import { FaPaperPlane } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import {PiHandTapBold} from "react-icons/pi";
import { FaRobot } from "react-icons/fa";
import {BsFillLightningChargeFill} from "react-icons/bs"


import Image from "next/image";
import { useState } from "react";


const Boost = () => {
  const [points, setPoints] = useState(31249365);


  return (
    <div className="p-4 pb-10">
        <div className="flex justify-center items-center justify-items-center content-center mt-5">
        <h1 className="font-bold text-[15px]">Your Balance</h1>
        </div>
        <div className="flex justify-center items-center gap-[5px]">
            <Image src="/assets/coin.png" alt="coin" width={40} height={40}/>
            <p className="text-[23px] font-bold">{points.toLocaleString()}</p>
        </div>
      <div className="mt-6">
        <h1 className="text-[20px] font-bold">Free daily boosters</h1>
        <div className="grid grid-cols-2 gap-4 mt-4" >
          <div className="bg-[#272727] flex justify-between pl-4 rounded-md pb-2 pt-2">
            <div><p className="text-[17px] font-bold">Turbo</p><p>3/3 available</p></div>
            <FaPaperPlane color="gold" className="w-[40px] h-[40px] mr-4" />
          </div>
          <div className="bg-[#272727] flex justify-between pl-4 rounded-md pb-2 pt-2">
            <div><p className="text-[17px] font-bold">Full Battery</p><p>3/3 available</p></div>
            <IoMdBatteryCharging color="gold" className="w-[50px] h-[50px]" />
          </div>
        </div>
      </div>

      <div className="mt-8">
         <h1 className="text-[20px] font-bold">Boosters</h1>
         <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
            <div className="flex gap-2">
                 <PiHandTapBold color="gold" className="w-[50px] h-[50px]" />
                 <div>
                    <p className="text-[17px] font-bold">Multi tap</p>
                    <div className="flex gap-2">
                        <Image src="/assets/coin.png" alt="coin" width={20} height={20}/>
                        <p>400 000 <span className="text-gray-500">| Level 13</span></p>
                    </div>
                 </div>
            </div>
            <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
          </div>
          <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
            <div className="flex gap-2">
                 <IoMdBatteryCharging color="blue" className="w-[50px] h-[50px]" />
                 <div>
                    <p className="text-[17px] font-bold">Energy limit</p>
                    <div className="flex gap-2">
                        <Image src="/assets/coin.png" alt="coin" width={20} height={20}/>
                        <p>400 000 <span className="text-gray-500">| Level 13</span></p>
                    </div>
                 </div>
            </div>
            <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
          </div>
          <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
            <div className="flex gap-2">
                 <BsFillLightningChargeFill color="gold" className="w-[50px] h-[50px]" />
                 <div>
                    <p className="text-[17px] font-bold">Recharging speed</p>
                    <div className="flex gap-2">
                        <Image src="/assets/coin.png" alt="coin" width={20} height={20}/>
                        <p>400 000 <span className="text-gray-500">| Level 13</span></p>
                    </div>
                 </div>
            </div>
            <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
          </div>
          <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
            <div className="flex gap-2">
                 <FaRobot color="blue" className="w-[50px] h-[50px]" />
                 <div>
                    <p className="text-[17px] font-bold">Multi tap</p>
                    <div className="flex gap-2">
                        <Image src="/assets/coin.png" alt="coin" width={20} height={20}/>
                        <p>400 000 </p>
                    </div>
                 </div>
            </div>
            <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
          </div>
      </div>
    </div>
  )
}

export default Boost;

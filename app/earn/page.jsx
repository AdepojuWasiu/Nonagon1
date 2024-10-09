'use client'
import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import {PiHandTapBold} from "react-icons/pi";
import Image from "next/image";
import { useEnergy } from "@/context/context";
import {IoClose} from 'react-icons/io5';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTelegram } from "@/hooks/useTelegram";

const Earn = () => {
  const router = useRouter();
  const { tg, enableCloseConfirmation } = useTelegram();

  const { points, setPoints,xStatus,setXStatus, xTimeLeft, setXTimeleft } = useEnergy();
  const [xpullup, setXpullup] = useState(false);

    if(tg){
      tg.BackButton.show(); 
  };
  const goBack = () => {
    tg.BackButton.hide();
    router.push('/'); 
  };
  if(tg){
    tg.BackButton.onClick(goBack);
  };


  const openLink = (url) => {
     window.open(url, '_blank');
     setXStatus("unclaimed");
  };


  const handleClaim = () => {
     setPoints(points+500000);
     setXStatus('claimed');
     setXpullup(false);
  };

  const unClaim = xStatus === 'unclaimed' || xStatus === 'ready' || xStatus === "";

  return (
    <div className="p-4">
      
      <div className="flex justify-center items-center justify-items-center content-center mt-5">
         <div>
           <h1 className="font-bold text-[25px] mb-6 pl-7">Earn</h1>
           <h1 className="font-bold text-[15px] pl-5">Your Balance</h1>
         </div>
      </div>
      <div className="flex justify-center items-center gap-[5px]">
            <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
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
          <button className="w-full" onClick={() => setXpullup(true)}>
              <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
                <div className="flex gap-2">
                    <PiHandTapBold color="gold" className="w-[50px] h-[50px]" />
                    <div>
                        <p className="text-[17px] font-bold">Follow our X account</p>
                        <div className="flex gap-2">
                            <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                            <p>+40,000</p>
                        </div>
                    </div>
                </div>
                <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
              </div>
          </button>
  
          <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
            <div className="flex gap-2">
                 <PiHandTapBold color="gold" className="w-[50px] h-[50px]" />
                 <div>
                    <p className="text-[17px] font-bold">Follow our X account</p>
                    <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
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
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
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
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p>+40,000</p>
                    </div>
                 </div>
            </div>
            <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
          </div>

          {xpullup && (
                <div className="bg-black bottom-[10vw] right-[10vw] left-[10vw] top-[100px] 
                               flex flex-col gap-[20px] font-bold  justify-center items-center justify-items-center absolute z-30 border-white border-[1px]">
                  <IoClose size={27} onClick ={() => setXpullup(false)} className="absolute right-2 top-2"/>
                  <PiHandTapBold color="gold" className="w-[80px] h-[80px]" />
                  <h1 className="text-[25px] mt-[30px]">Follow our X account</h1>
                  {/* <Link href= "https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09" className="bg-[#ffbf00af] p-4 px-[50px] text-[20px] rounded-md">
                       Visit
                  </Link> */}
                  <button className="bg-[#ffbf00af] p-4 px-[50px] text-[20px] rounded-md" onClick={() => openLink('https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09')}>
                    Visit
                  </button>
                  {xStatus === 'unclaimed' && (<p className="text-red-600 text-[15px]">make sure you complete the task, {xTimeLeft}</p>)}
                  <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[20px]">+50000</p> 
                  </div>
                  <button className={`bg-[#ffbf00af] p-4 px-[50px] text-[20px] rounded-md ${xStatus === 'unclaimed' || xStatus === 'claimed' || xStatus === "" ? 'bg-gray-500' : ' bg-green-600'}`} disabled={xStatus==='unclaimed' || xStatus === 'claimed' || xStatus === "" || xTimeLeft === 0} onClick={handleClaim}>
                      { unClaim ? "Claim" : "Claimed" }
                  </button>
                </div>
               )}
    </div>
  )
}

export default Earn

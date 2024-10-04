'use client'
import Image from "next/image";
import { useEffect } from "react";
import { useTelegram } from "@/hooks/useTelegram";

import { IoIosCopy } from "react-icons/io";
import { useEnergy } from "@/context/context";


const Friends = () => {

  const { tg, onClose, offClose, enableCloseConfirmation } = useTelegram();

  const handleShare = () => {
    const linkToShare = "https://your-link.com";
    const message = "Check out this link!";
    
    tg.share({
      url: linkToShare,
      text: message,
      disable_notification: false, // Optional, to disable notifications for the recipient
    });
  };

  enableCloseConfirmation();
        
  const { username, referals } = useEnergy();
     
  return (
    <div className="p-4">
      <div className="flex justify-center items-center justify-items-center mt-5 gap-6 self-center">
        <div>
        <h1 className="font-bold text-[25px] mb-6 pl-7">10 Friends</h1>
        <h1 className="font-bold text-[18px]">Invite a friend and get coins</h1>
        </div>
        
       </div>
      <div className="bg-[#272727] flex justify-between rounded-md pb-8 pt-6 pr-6  mt-4 font-bold">
            <div className="flex gap-2">
              <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                 <div>
                    <p className="text-[18px] ">Invite Friends </p>
                    <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[15px]">50,000 for you & your friend</p>
                    </div>
                 </div>
            </div>
      </div>

      <div className="flex gap-8">
        <button onClick={handleShare}>
          <div className="bg-[#ffff] text-[#000] mt-10 flex justify-center justify-items-center font-bold text-[20px] px-[50px] py-4 rounded-full">
            <p>Invite Friend</p>
          </div>
        </button>
        <div className="bg-[#ffff] text-[#000] mt-10 flex justify-center justify-items-center font-bold text-[20px] p-4 rounded-full">
          <IoIosCopy className="h-[30px] w-[30px]"/>
        </div>
      </div>

      
         {referals.map((referal) => (
          <div className="bg-[#272727] flex  rounded-md pb-2 pt-2 pl-4 pr-4 mt-4 justify-between ">
                <div className="flex gap-4">
                  <div className="bg-[#000] py-3 px-5 rounded-full font-bold text-[15px] text-[#ffbf00]"><p>{referal.username[0]}</p></div>
                  <div>
                  <p className="text-[17px] font-bold">{referal.username}</p>
                  <div className="flex gap-2">
                      <p></p>
                  </div>
                  </div>
               </div>
               <div className="flex mt-3">
                 <div>
                    <Image src="/assets/coin.png" alt="coin" width={20} height={20}/>
                 </div>
                 <div>
                    <p>{referal.point} </p>
                </div>
              </div>
           </div>

         ))}
        
        
    </div>
  )
}

export default Friends

'use client'
import Image from "next/image";
import { useEffect,useState } from "react";
import { useTelegram } from "@/hooks/useTelegram";
import { useRouter } from "next/navigation";
import {FaUserFriends} from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";


import { IoIosCopy } from "react-icons/io";
import { useEnergy } from "@/context/context";


const Friends = () => {
  const router = useRouter();

  const { tg, enableCloseConfirmation } = useTelegram();
  const [copyClick, setCopyClick] = useState(false);
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

        
  const { username, referals, userid } = useEnergy();


  const handleCopyLink = () => {
    const inviteLink = `https://t.me/Nonagonbot/nonagon?startapp=${userid}`;
    navigator.clipboard.writeText(inviteLink);
      setCopyClick(true);

    setTimeout(() => {
      setCopyClick(false);
    }, 200);
    
  };
     
  return (
    <div className="p-4">
      <div className="flex justify-center items-center justify-items-center mt-5 gap-6 self-center">
        <div>
          <div className="flex justify-center items-center justify-items-center">
           <h1 className="font-bold text-[25px] mb-6 pl-7">10 Friends</h1>
          </div>
        <h1 className="font-bold text-[18px]">Invite a friend and get coins</h1>
        </div>
        
       </div>
      <div className="bg-[#272727] flex justify-between rounded-md pb-8 pt-6 pr-6  mt-4 font-bold">
            <div className="flex gap-2 pl-4">
              <FaUserFriends className="w-[50px] h-[50px]" color="gold"/>
                 <div>
                    <p className="text-[18px] ">Invite Friends </p>
                    <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[15px]">50,000 for you & your friend</p>
                    </div>
                 </div>
            </div>
      </div>
      <div className="flex justify-center items-center justify-items-center mt-4 text-green-700">
        {copyClick && (<div><p>Copied succesfully</p></div>)}

      </div>
      <div className="flex-row justify-center items-center gap-5 mt-8">
        
        <button onClick = {handleCopyLink}>
           <div  className="bg-[#ffff] text-[#000] flex justify-center justify-items-center font-bold text-[20px] p-4 px-8 rounded-xl gap-2">
              <p>Click to copy referal link</p>
              <IoIosCopy className="h-[30px] w-[30px]"/>
            </div>
        </button>
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
                 <FaHandshake className="w-[30px] h-[30px]" color="gold" />
              </div>
           </div>

         ))}
        
        
    </div>
  )
}

export default Friends;

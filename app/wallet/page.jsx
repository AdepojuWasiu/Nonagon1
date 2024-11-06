'use client'

import Image from "next/image";
import { useEnergy } from "@/context/context";
import { useTelegram } from "@/hooks/useTelegram";
import { FaWallet } from "react-icons/fa";

const Wallet = () => {

  const { tg, enableCloseConfirmation } = useTelegram();
  const {points} = useEnergy();

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

  return (
    <div className="flex-col justify-center items-center justify-items-center p-3">
        <div className="flex justify-center items-center justify-items-center content-center mb-5">
        <h1 className="font-bold text-[25px] mt-4">Your Balance</h1>
        </div>
        <div className="flex justify-center items-center gap-[5px] mb-[30px]">
            <Image src="/assets/coin.jpg" alt="coin" width={40} height={40} className="rounded-full"/>
            <p className="text-[30px] font-bold">{points.toLocaleString()}</p>
        </div>
        <FaWallet className=" w-[100px] h-[100px]" color="gold"/>
        <div  className="bg-[#ffff] text-[#000] flex justify-center justify-items-center font-bold text-[20px] p-4 px-14 rounded-xl gap-6 mt-[80px]">
              <p>Connect Wallet </p>
              <p className="text-[15px] text-gray-600">soon</p>
         </div>
    </div>
  )
}

export default Wallet

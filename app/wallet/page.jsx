'use client'
import { useEnergy } from "@/context/context";

const Wallet = () => {

    const {points} = useEnergy();

  return (
    <div className="flex-col justify-center items-center justify-items-center">
              <div className="flex justify-center items-center justify-items-center content-center mt-5">
        <h1 className="font-bold text-[25px]">Your Balance</h1>
        </div>
        <div className="flex justify-center items-center gap-[5px]">
            <Image src="/assets/coin.jpg" alt="coin" width={40} height={40} className="rounded-full"/>
            <p className="text-[30px] font-bold">{points.toLocaleString()}</p>
        </div>
        <div  className="bg-[#ffff] text-[#000] flex justify-center justify-items-center font-bold text-[20px] p-4 px-8 rounded-xl gap-2">
              <p>Connect Wallet </p>
              <p className="text-[15px] text-gray-600">soon</p>
         </div>
    </div>
  )
}

export default Wallet

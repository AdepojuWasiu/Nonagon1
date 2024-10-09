'use client'

import {IoMdBatteryCharging} from "react-icons/io";
import { FaPaperPlane } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import {PiHandTapBold} from "react-icons/pi";
import { FaRobot } from "react-icons/fa";
import {BsFillLightningChargeFill} from "react-icons/bs"
import { useEnergy } from "@/context/context";
import {IoClose} from 'react-icons/io5';
import { useRouter } from "next/navigation";
import { useTelegram } from "@/hooks/useTelegram";


import Image from "next/image";
import { useState } from "react";


const Boost = () => {
  const router = useRouter();
  const { tg, enableCloseConfirmation } = useTelegram();

   const [turboPullup, setTurboPullup] = useState(false);
   const [energyPullup, setEnergyPullup] = useState(false);
   const [multiTapPullup, setMultiTapPullup] = useState(false);
   const [energyLimitPullup, setEnergyLimitPullup] = useState(false);
   const [rechargingPullup, setRechargingPullup] = useState(false);


  const { userid, points, setPoints, energy, availableTurbo, availableEnergyRefill, multitapLevel,tapValue, setTapValue, setAvailabeTurbo,
               energyLimitLevel, rechargingSpeedLevel, setEnergy, setAvailableEnergyRefill, setWelcomeTurbo,
               setMultitapLevel, setEnergyLimitLevel,energyIncrease, setEnergyIncrease, setRechargingSpeedLevel,
               energyLimit, setEnergyLimit, dailyTimeLeft } = useEnergy();
  
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
  


      const updateAvailableTurbo = async (e) => {
       e.preventDefault();
       const updatedTurbo = availableTurbo - 1;  // Calculate the new value

        setAvailabeTurbo(updatedTurbo); 

       try {
      
        const response = await fetch("api/update/turbo", {
          method:'PATCH',
          body: JSON.stringify({
            userId: userid,
            availableTurbo: updatedTurbo
          })
        })
        if(response.ok) {
          setTapValue(prevValue => prevValue * 10);
          setWelcomeTurbo(true);
          router.push('/');
          
          setTimeout(() => {
            setTapValue(prevValue => prevValue/10);
            setWelcomeTurbo(false);
          },10000);
        }
        
       } catch (error) {
        console.log(error)
       }
    };

    const updateAvailableEnergyRefill = async (e) => {
      e.preventDefault();
      const updatedEnergyRefill =  availableEnergyRefill - 1; 

      setAvailableEnergyRefill(updatedEnergyRefill); 

      try {
     
       const response = await fetch("api/update/energyrefill", {
         method:'PATCH',
         body: JSON.stringify({
           userId: userid,
           availableEnergyRefill: updatedEnergyRefill
         })
       })
       if(response.ok) {
         setEnergy(energyLimit);
         router.push('/'); 
       }
         
      } catch (error) {
       console.log(error)
      }
   };
   
   const updateMultitap = async (e) => {
    e.preventDefault();
    const updatedMultitap = multitapLevel+1;
    const updatedTapValue = tapValue+1; // Calculate the new value

    setTapValue(updatedTapValue); 
    setMultitapLevel(updatedMultitap);

    try {
   
     const response = await fetch("api/update/multitap", {
       method:'PATCH',
       body: JSON.stringify({
         userId: userid,
         multitapLevel: updatedMultitap,
         tapValue: updatedTapValue
       })
     })
     if(response.ok) {
       setPoints(points-5000*multitapLevel); 
       router.push('/')
     }
     
    } catch (error) {
     console.log(error)
    }
 };

 const updateEnergyLimit = async (e) => {
  e.preventDefault();
  const updatedEnergyLimit =  energyLimit+500; 
  const updatedEnergyLimitLevel = energyLimitLevel+1; // Calculate the new value

  setEnergyLimit(updatedEnergyLimit);
  setEnergyLimitLevel(updatedEnergyLimitLevel);

  try {
 
   const response = await fetch("api/update/energyLimit", {
     method:'PATCH',
     body: JSON.stringify({
       userId: userid,
       energyLimit: updatedEnergyLimit,
       energyLimitLevel: updatedEnergyLimitLevel
     })
   })
   if(response.ok) {
    setPoints(points-5000*energyLimitLevel); 
    router.push('/');
   }
   
  } catch (error) {
   console.log(error)
  }
};

 const updateRecharging = async (e) => {
  e.preventDefault();
  const updatedEnergyIncrease =  energyIncrease+1; 
  const updatedRechargingSpeedLevel = rechargingSpeedLevel+1; // Calculate the new value
  
  setEnergyIncrease(updatedEnergyIncrease);
  setRechargingSpeedLevel(updatedRechargingSpeedLevel);

  try {
 
   const response = await fetch("api/update/rechargingSpeed", {
     method:'PATCH',
     body: JSON.stringify({
       userId: userid,
       energyIncrease: updatedEnergyIncrease,
       rechargingSpeedLevel: updatedRechargingSpeedLevel
     })
   })
   if(response.ok) {
     setPoints(points-5000*rechargingSpeedLevel);
     router.push('/');
   }
   
  } catch (error) {
   console.log(error)
  }
};

const insufficientMultitap = points < 5000*multitapLevel;
const insufficientEnergyLimit = points < 5000*energyLimitLevel;
const insufficientRecharging = points < 5000*rechargingSpeedLevel;


const noTurbo = availableTurbo == 0
const noRefill = availableEnergyRefill == 0;

const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
};


  return (
    <div className="p-4 pb-10 relative">
        <div className="flex justify-center items-center justify-items-center content-center mt-5">
        <h1 className="font-bold text-[15px]">Your Balance</h1>
        </div>
        <div className="flex justify-center items-center gap-[5px]">
            <Image src="/assets/coin.jpg" alt="coin" width={40} height={40} className="rounded-full"/>
            <p className="text-[23px] font-bold">{points.toLocaleString()}</p>
        </div>
      <div className="mt-6">
        <h1 className="text-[20px] font-bold">Free daily boosters</h1>
        <div className="grid grid-cols-2 gap-4 mt-4" >
          <button onClick={() => setTurboPullup(true)} disabled = {noTurbo}>
              <div className="bg-[#272727] flex justify-between pl-4 rounded-md pb-2 pt-2">
                <div><p className="text-[14px] font-bold">Turbo</p><p>{availableTurbo}/3 available</p></div>
                <div>
                  <FaPaperPlane color="gold" className="w-[40px] h-[40px] mr-4" />
                  <p>{`${formatTime(dailyTimeLeft)}`}</p>
                </div>
              </div>
          </button>
          <button onClick={() => setEnergyPullup(true)} disabled = {noRefill}>
              <div className="bg-[#272727] flex justify-between pl-4 rounded-md pb-2 pt-2">
                <div><p className="text-[17px] font-bold">Full Battery</p><p>{availableEnergyRefill}/3 available</p></div>
                <IoMdBatteryCharging color="gold" className="w-[50px] h-[50px]" />
              </div>
          </button>
        </div>
      </div>

      <div className="mt-8">
         <h1 className="text-[20px] font-bold">Boosters</h1>
         <button onClick={() => setMultiTapPullup(true)} className="w-full">
              <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
                  <div className="flex gap-2">
                      <PiHandTapBold color="gold" className="w-[50px] h-[50px]" />
                      <div>
                          <p className="text-[17px] font-bold">Multi tap</p>
                          <div className="flex gap-2">
                              <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                              <p>400 000 <span className="text-gray-500">| Level {multitapLevel}</span></p>
                          </div>
                      </div>
                  </div>
                  <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
                </div>
         </button>
         <button onClick={() => setEnergyLimitPullup(true)} className="w-full">
             <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
                 <div className="flex gap-2">
                      <IoMdBatteryCharging color="blue" className="w-[50px] h-[50px]" />
                      <div>
                          <p className="text-[17px] font-bold">Energy limit</p>
                          <div className="flex gap-2">
                              <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                              <p>400 000 <span className="text-gray-500">| Level {energyLimitLevel}</span></p>
                          </div>
                      </div>
                  </div>
                  <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
                </div>
         </button>
         <button className="w-full" onClick={() => setRechargingPullup(true)}>
              <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
                  <div className="flex gap-2">
                      <BsFillLightningChargeFill color="gold" className="w-[50px] h-[50px]" />
                      <div>
                          <p className="text-[17px] font-bold">Recharging speed</p>
                          <div className="flex gap-2">
                              <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                              <p>400 000 <span className="text-gray-500">| Level {rechargingSpeedLevel}</span></p>
                          </div>
                      </div>
                  </div>
                  <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
                </div>
         </button>
         <button className="w-full">
              <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
                  <div className="flex gap-2">
                      <FaRobot color="blue" className="w-[50px] h-[50px]" />
                      <div>
                          <p className="text-[17px] font-bold">Offline Worker </p>
                          <div className="flex gap-2">
                              <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                              <p>400 000 </p>
                          </div>
                      </div>
                  </div>
                  <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
                </div>
         </button>
      </div>
      {turboPullup && (
                <div className="bg-black bottom-[10vw] right-[10vw] left-[10vw] top-[100px] 
                               flex flex-col gap-[20px] font-bold  justify-center items-center justify-items-center absolute z-30 border-white border-[1px]">
                  <IoClose size={27} onClick ={() => setTurboPullup(false)} className="absolute right-2 top-2"/>
                  <FaPaperPlane color="gold" className="w-[80px] h-[80px]" />
                  <h1 className="text-[30px] mt-[30px]">Fly Plane</h1>
                  <p className="text-[#ffffff6c]">Get 10x of tapping for 10seconds</p> 
                  <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[20px]">Free</p>
                  </div>
                  <button className="bg-[#ffbf00af] p-4 px-[100px] text-[20px] rounded-md"
                                    onClick={updateAvailableTurbo}>
                    Get it!
                  </button>
                </div>
               )}
           {energyPullup && (
                <div className="bg-black bottom-[10vw] right-[10vw] left-[10vw] top-[100px] 
                               flex flex-col gap-[20px] font-bold  justify-center items-center justify-items-center absolute z-30 border-white border-[1px]">
                  <IoClose size={27} onClick ={() => setEnergyPullup(false)} className="absolute right-2 top-2"/>
                  <IoMdBatteryCharging color="gold" className="w-[80px] h-[80px]" />
                  <h1 className="text-[30px] mt-[30px]">Full Energy</h1>
                  <p className="text-[#ffffff6c]">Fill your energy to the max</p> 
                  <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[20px]">Free</p>
                  </div>
                  <button className="bg-[#ffbf00af] p-4 px-[100px] text-[20px] rounded-md"
                                    onClick={updateAvailableEnergyRefill}>
                    Get it!
                  </button>
                </div>
               )}

          {multiTapPullup && (
                <div className="bg-black bottom-[10vw] right-[10vw] left-[10vw] top-[100px] 
                               flex flex-col gap-[20px] font-bold  justify-center items-center justify-items-center absolute z-30 border-white border-[1px]">
                  <IoClose size={27} onClick ={() => setMultiTapPullup(false)} className="absolute right-2 top-2"/>
                  <IoMdBatteryCharging color="gold" className="w-[80px] h-[80px]" />
                  <h1 className="text-[30px] mt-[30px]">Multitap</h1>
                  <p className="text-[#ffffff6c] px-3">Increase amount of TAP you can earn per one tap</p> 
                  <p className="text-[#ffffff6c]">+1 per tap for each level.</p>
                  <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[20px]">{5000*multitapLevel} | Level {multitapLevel+1} </p> 
                  </div>
                  <button className="bg-[#ffbf00af] p-4 px-[50px] text-[20px] rounded-md"
                                    onClick={updateMultitap} disabled = {insufficientMultitap}>
                    {insufficientMultitap ? "Insufficient Coin!": "Get it!"}
                  </button>
                </div>
               )}

           {energyLimitPullup && (
                <div className="bg-black bottom-[10vw] right-[10vw] left-[10vw] top-[100px] 
                               flex flex-col gap-[20px] font-bold  justify-center items-center justify-items-center absolute z-30 border-white border-[1px]">
                  <IoClose size={27} onClick ={() => setEnergyLimitPullup(false)} className="absolute right-2 top-2"/>
                  <IoMdBatteryCharging color="gold" className="w-[80px] h-[80px]" />
                  <h1 className="text-[30px] mt-[30px]">Energy Limit</h1>
                  <p className="text-[#ffffff6c]">Increase the limit of energy storage</p>
                  <p className="text-[#ffffff6c]">+500 energy limit for each level.</p>
                  <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[20px]">{5000*energyLimitLevel} | Level {energyLimitLevel+1} </p> 
                  </div>
                  <button className="bg-[#ffbf00af] p-4 px-[50px] text-[20px] rounded-md"
                                    onClick={updateEnergyLimit} disabled = {insufficientEnergyLimit}>
                    {insufficientEnergyLimit ? "Insufficient Coin!": "Get it!"}
                  </button>
                </div>
               )}

               
           {rechargingPullup && (
                <div className="bg-black bottom-[10vw] right-[10vw] left-[10vw] top-[100px] 
                               flex flex-col gap-[20px] font-bold  justify-center items-center justify-items-center absolute z-30 border-white border-[1px]">
                  <IoClose size={27} onClick ={() => setRechargingPullup(false)} className="absolute right-2 top-2"/>
                  <IoMdBatteryCharging color="gold" className="w-[80px] h-[80px]" />
                  <h1 className="text-[30px] mt-[30px]">Recharching Speed</h1>
                  <p className="text-[#ffffff6c]">Increase your rechaeging speed</p>
                  <p className="text-[#ffffff6c]">+10 recharging speed for each level.</p>
                  <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[20px]">{5000*rechargingSpeedLevel} | Level {rechargingSpeedLevel+1} </p> 
                  </div>
                  <button className="bg-[#ffbf00af] p-4 px-[50px] text-[20px] rounded-md"
                                    onClick={ updateRecharging} disabled = {insufficientRecharging}>
                    {insufficientRecharging ? "Insufficient Coin!": "Get it!"}
                  </button>
                </div>
               )}
    </div>
  )
}

export default Boost;

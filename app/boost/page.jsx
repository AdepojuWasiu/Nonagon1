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
import { IoIosCheckmarkCircleOutline } from "react-icons/io";


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
   const [buttonLoading, setButtonLoading] = useState(false);


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
        setButtonLoading(true);
       e.preventDefault();
       const updatedTurbo = availableTurbo - 1;  // Calculate the new value 

       try {
        const response = await fetch("api/update/turbo", {
          method:'PATCH',
          body: JSON.stringify({
            userId: userid,
            availableTurbo: updatedTurbo
          })
        })
        if(response.ok) {
          setTapValue(prevValue => prevValue * 5);
          setAvailabeTurbo(updatedTurbo);
          setWelcomeTurbo(true);
          router.push('/');
          setButtonLoading(false);
          
          setTimeout(() => {
            setTapValue(prevValue => prevValue/5);
            setWelcomeTurbo(false);
          },20000);
        }
        
       } catch (error) {
        setButtonLoading(false);
        console.log(error)
       }
    };

    const updateAvailableEnergyRefill = async (e) => {
      e.preventDefault();
      setButtonLoading(true);
      const updatedEnergyRefill =  availableEnergyRefill - 1;  

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
         setAvailableEnergyRefill(updatedEnergyRefill);
         router.push('/'); 
         setButtonLoading(false);
       }
         
      } catch (error) {
        setButtonLoading(false);
       console.log(error)
      }
   };
   
   const updateMultitap = async (e) => {
    setButtonLoading(true);
    e.preventDefault();
    const updatedMultitap = multitapLevel+1;
    const updatedTapValue = tapValue+1; // Calculate the new value

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
       setPoints(points-(5000*(multitapLevel**2))); 
       setTapValue(updatedTapValue); 
       setMultitapLevel(updatedMultitap);
       router.push('/')
       setButtonLoading(false);
     }
     
    } catch (error) {
      setButtonLoading(false);
     console.log(error)
    }
 };

 const updateEnergyLimit = async (e) => {
  e.preventDefault();
  setButtonLoading(true);
  const updatedEnergyLimit =  energyLimit+500; 
  const updatedEnergyLimitLevel = energyLimitLevel+1; // Calculate the new value

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
    setPoints(points-(5000*(energyLimitLevel**2))); 
    setEnergyLimit(updatedEnergyLimit);
    setEnergyLimitLevel(updatedEnergyLimitLevel);
    router.push('/');
    setButtonLoading(false);
   }
   
  } catch (error) {
    setButtonLoading(false);
   console.log(error)
  }
};

 const updateRecharging = async (e) => {
  e.preventDefault();
  setButtonLoading(true);
  const updatedEnergyIncrease =  energyIncrease+1; 
  const updatedRechargingSpeedLevel = rechargingSpeedLevel+1; // Calculate the new value

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
     setPoints(points-(5000*(rechargingSpeedLevel**2)));
     setEnergyIncrease(updatedEnergyIncrease);
     setRechargingSpeedLevel(updatedRechargingSpeedLevel);
     router.push('/');
     setButtonLoading(false);
   }
   
  } catch (error) {
   setButtonLoading(false);
   console.log(error)
  }
};

const insufficientMultitap = points < (5000*(multitapLevel**2));
const insufficientEnergyLimit = points < (5000*(energyLimitLevel**2));
const insufficientRecharging = points < (5000*(rechargingSpeedLevel**2));


const noTurbo = availableTurbo == 0
const noRefill = availableEnergyRefill == 0;
const noMultitap = multitapLevel === 12;
const noEnergyLimit = energyLimitLevel === 12;
const noRechargeSpeed = rechargingSpeedLevel === 12;

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
                <div><p className="text-[15px] font-bold">Turbo</p><p>{availableTurbo}/3 available</p></div>
                <div>
                  <FaPaperPlane color="gold" className="w-[40px] h-[40px] mr-4 mt-2" />
                  <p>{`${formatTime(dailyTimeLeft)}`}</p>
                </div>
              </div>
          </button>
          <button onClick={() => setEnergyPullup(true)} disabled = {noRefill}>
              <div className="bg-[#272727] flex justify-between pl-4 rounded-md pb-2 pt-2">
                <div><p className="text-[15px] font-bold">Full Battery</p><p>{availableEnergyRefill}/3 available</p></div>
                <div>
                  <IoMdBatteryCharging color="gold" className="w-[47px] h-[47px] " />
                  <p>{`${formatTime(dailyTimeLeft)}`}</p>
                </div>
              </div>
          </button>
        </div>
      </div>

      <div className="mt-8">
         <h1 className="text-[20px] font-bold">Boosters</h1>
         <button onClick={() => setMultiTapPullup(true)} className="w-full" disabled = {noMultitap}>
              <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
                  <div className="flex gap-2">
                      <PiHandTapBold color="gold" className="w-[50px] h-[50px]" />
                      <div>
                          <p className="text-[17px] font-bold">Multi tap</p>
                          <div className="flex gap-2">
                              <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                              <p>{(5000*(multitapLevel**2)).toLocaleString()}  <span className="text-gray-500">| Level {multitapLevel +1}</span></p>
                          </div>
                      </div>
                  </div>
                  {noMultitap ? <IoIosCheckmarkCircleOutline color="green" className="w-[30px] h-[30px] mt-2" /> : <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" /> }
                </div>
         </button>
         <button onClick={() => setEnergyLimitPullup(true)} className="w-full" disabled = {noEnergyLimit}>
             <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
                 <div className="flex gap-2">
                      <IoMdBatteryCharging color="blue" className="w-[50px] h-[50px]" />
                      <div>
                          <p className="text-[17px] font-bold">Energy limit</p>
                          <div className="flex gap-2">
                              <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                              <p>{(5000*(energyLimitLevel**2)).toLocaleString()}  <span className="text-gray-500">| Level {energyLimitLevel +1}</span></p>
                          </div>
                      </div>
                  </div>
                  {noEnergyLimit ? <IoIosCheckmarkCircleOutline color="green" className="w-[30px] h-[30px] mt-2" /> : <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />}
                </div>
         </button>
         <button className="w-full" onClick={() => setRechargingPullup(true)} disabled = {noRechargeSpeed}>
              <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
                  <div className="flex gap-2">
                      <BsFillLightningChargeFill color="gold" className="w-[50px] h-[50px]" />
                      <div>
                          <p className="text-[17px] font-bold">Recharging speed</p>
                          <div className="flex gap-2">
                              <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                              <p>{(5000*(rechargingSpeedLevel**2)).toLocaleString()} <span className="text-gray-500">| Level {rechargingSpeedLevel+1}</span></p>
                          </div>
                      </div>
                  </div>
                  {noRechargeSpeed ? <IoIosCheckmarkCircleOutline color="green" className="w-[30px] h-[30px] mt-2" /> : <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />}
                </div>
         </button>
         {/* <button className="w-full">
              <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
                  <div className="flex gap-2">
                      <FaRobot color="blue" className="w-[50px] h-[50px]" />
                      <div>
                          <p className="text-[17px] font-bold">Offline Worker </p>
                          <div className="flex gap-2">
                              <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                              <p></p>
                          </div>
                      </div>
                  </div>
                  <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
                </div>
         </button> */}
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
                  <button className={`bg-[#ffbf00af] p-4  text-[20px] rounded-md ${buttonLoading ? 'px-[30px]': 'px-[100px]'}`}
                                    onClick={updateAvailableTurbo} disabled={buttonLoading === true}>
                    { buttonLoading ? "Loading ..." : "Get it!"}
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
                  <button className={`bg-[#ffbf00af] p-4  text-[20px] rounded-md ${buttonLoading ? 'px-[30px]': 'px-[100px]'}`}
                                    onClick={updateAvailableEnergyRefill} disabled={ buttonLoading === true}>
                     { buttonLoading ? "Loading ..." : "Get it!"}
                  </button>
                </div>
               )}

          {multiTapPullup && (
                <div className="bg-black bottom-[10vw] right-[10vw] left-[10vw] top-[100px] 
                               flex flex-col gap-[20px] font-bold  justify-center items-center justify-items-center absolute z-30 border-white border-[1px]">
                  <IoClose size={27} onClick ={() => setMultiTapPullup(false)} className="absolute right-2 top-2"/>
                  <PiHandTapBold color="gold" className="w-[80px] h-[80px]" />
                  <h1 className="text-[30px] mt-[30px]">Multitap</h1>
                  <p className="text-[#ffffff6c] px-3">Increase amount of TAP you can earn per one tap</p> 
                  <p className="text-[#ffffff6c]">+1 per tap for each level.</p>
                  <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[20px]">{(5000*(multitapLevel**2)).toLocaleString()} | Level {multitapLevel+1} </p> 
                  </div>
                  <button className="bg-[#ffbf00af] p-4 px-[50px] text-[20px] rounded-md"
                                    onClick={updateMultitap} disabled = {insufficientMultitap || buttonLoading === true}>
                     {insufficientMultitap ? "Insufficient Coin!" : (buttonLoading ? "Loading ..." : "Get it!")}
                  </button>
                </div>
               )}

           {energyLimitPullup && (
                <div className="bg-black bottom-[10vw] right-[10vw] left-[10vw] top-[100px] 
                               flex flex-col gap-[20px] font-bold  justify-center items-center justify-items-center absolute z-30 border-white border-[1px]">
                  <IoClose size={27} onClick ={() => setEnergyLimitPullup(false)} className="absolute right-2 top-2"/>
                  <IoMdBatteryCharging color="blue" className="w-[80px] h-[80px]" />
                  <h1 className="text-[30px] mt-[30px]">Energy Limit</h1>
                  <p className="text-[#ffffff6c]">Increase the limit of energy storage</p>
                  <p className="text-[#ffffff6c]">+500 energy limit for each level.</p>
                  <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[20px]">{(5000*(energyLimitLevel**2)).toLocaleString()} | Level {energyLimitLevel+1} </p> 
                  </div>
                  <button className="bg-[#ffbf00af] p-4 px-[50px] text-[20px] rounded-md"
                                    onClick={updateEnergyLimit} disabled = {insufficientEnergyLimit || buttonLoading === true}>
                     {insufficientEnergyLimit ? "Insufficient Coin!" : (buttonLoading ? "Loading ..." : "Get it!")}
                  </button>
                </div>
               )}

               
           {rechargingPullup && (
                <div className="bg-black bottom-[10vw] right-[10vw] left-[10vw] top-[100px] 
                               flex flex-col gap-[20px] font-bold  justify-center items-center justify-items-center absolute z-30 border-white border-[1px]">
                  <IoClose size={27} onClick ={() => setRechargingPullup(false)} className="absolute right-2 top-2"/>
                  <BsFillLightningChargeFill color="gold" className="w-[80px] h-[80px]" />
                  <h1 className="text-[30px] mt-[30px]">Recharching Speed</h1>
                  <p className="text-[#ffffff6c]">Increase your rechaeging speed</p>
                  <p className="text-[#ffffff6c]">+10 recharging speed for each level.</p>
                  <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[20px]">{(5000*(rechargingSpeedLevel**2)).toLocaleString()} | Level {rechargingSpeedLevel+1} </p> 
                  </div>
                  <button className="bg-[#ffbf00af] p-4 px-[50px] text-[20px] rounded-md"
                                    onClick={ updateRecharging} disabled = {insufficientRecharging || buttonLoading === true}>
                     {insufficientRecharging ? "Insufficient Coin!" : (buttonLoading ? "Loading ..." : "Get it!")}
                  </button>
                </div>
               )}
    </div>
  )
}

export default Boost;

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
import Social from "@/components/social";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const Earn = () => {
  const router = useRouter();
  const { tg, enableCloseConfirmation } = useTelegram();

  const { userid,points,setPoints, xStatus,teStatus, yoStatus, tikStatus, inStatus, faStatus, dailyStatus, setDailyStatus } = useEnergy();
  const [dailyPullup, setDailyPullup, dailyTaskLeft, setDailyTaskLeft] = useState(false);
 

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

    const handleDailyClaim = async (e) => {
      e.preventDefault();
      try {
       const response = await fetch("api/farming/daily", {
         method:'PATCH',
         body: JSON.stringify({
           userId: userid,
           dailyStatus: 'claimed',
           dailyTaskLeft: dailyTaskLeft-1
         })
       })
       if(response.ok) {
          setPoints(points+20000)
          setDailyStatus('claimed');
          setDailyTaskLeft(dailyTaskLeft-1)
          setDailyPullup(false) 
       }
         
      } catch (error) {
       console.log(error)
      }
   };

  const styleDisableX = xStatus==='unclaimed' || xStatus === 'claimed' || xStatus === "";
  const styleDisableTe = teStatus==='unclaimed' || teStatus === 'claimed' || teStatus === "";
  const styleDisableYo = yoStatus==='unclaimed' || yoStatus === 'claimed' || yoStatus === "";
  const styleDisableTik = tikStatus==='unclaimed' || tikStatus === 'claimed' || tikStatus === "";
  const styleDisableIn = inStatus==='unclaimed' || inStatus === 'claimed' || inStatus === "";
  const styleDisableFa = faStatus==='unclaimed' || faStatus === 'claimed' || faStatus === "";

  const unClaimX = xStatus === 'unclaimed' || xStatus === 'ready' || xStatus === "";
  const unClaimTe = teStatus==='unclaimed' || teStatus === 'ready' || teStatus === "";
  const unClaimYo = yoStatus==='unclaimed' || yoStatus === 'ready' || yoStatus === "";
  const unClaimTik = tikStatus==='unclaimed' || tikStatus === 'ready' || tikStatus === "";
  const unClaimIn =  inStatus==='unclaimed' || inStatus === 'ready' || inStatus === "";
  const unClaimFa = faStatus==='unclaimed' || faStatus === 'ready' || faStatus === "";

  return (
    <div className="p-4 mb-[200px]">
      
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
       <button className = 'w-full' onClick={() => setDailyPullup(true)}>
          <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
                <div className="flex gap-2">
                    <Image src='/assets/calender.png' alt="social" width={50} height={50}/>
                    <div>
                        <p className="text-[17px] font-bold">Daily Reward</p>
                        <div className="flex gap-2">
                            <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                            <p>+20,000</p>
                        </div>
                    </div>
                </div>
                {dailyStatus === '' ? <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" /> : <IoIosCheckmarkCircleOutline color="green" className="w-[30px] h-[30px] mt-2" />}
          </div>
       </button>


          <h1 className="text-[20px] font-bold mt-10">Tasks List</h1>
          
          <Social discription= {'Follow  X account'} image= {'/assets/twitter.png' } id ={'twitter'} url = {'https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09'} styleDisable = {styleDisableX} unClaim= {unClaimX} status={xStatus}/>
          <Social discription= {'Join our Telegram channel'} image= {'/assets/telegram.png'} id={'telegram'} url = {'https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09'} styleDisable = {styleDisableTe} unClaim ={unClaimTe} status={teStatus}/>
          <Social discription= {'Subscribe to our Youtube'} image= {"/assets/youtube.png" } id = {'youtube'} url = {'https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09'} styleDisable = {styleDisableYo} unClaim ={unClaimYo} status={yoStatus}/>
          <Social discription= {'Follow our Tiktok account'} image= {'/assets/tiktok.png' } id= {'tiktok'} url = {'https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09'} styleDisable = {styleDisableTik} unClaim={unClaimTik} status={tikStatus}/>
          <Social discription= {'Follow our Instagram account'} image= {'/assets/instagram.png'} id ={'instagram'} url = {'https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09' } styleDisable = {styleDisableIn} unClaim ={unClaimIn} status={inStatus}/>
          <Social discription= {'Follow our Facebook account'} image= {'/assets/facebook.png' } id= {'facebook'} url = {'https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09'} styleDisable = {styleDisableFa} unClaim= {unClaimFa} status={faStatus}/>

          {dailyPullup && (
                <div className="bg-black bottom-[10vw] right-[10vw] left-[10vw] top-[100px] 
                               flex flex-col gap-[20px] font-bold  justify-center items-center justify-items-center fixed z-30 border-white border-[1px]">
                  <IoClose size={27} onClick ={() => setDailyPullup(false)} className="absolute right-2 top-2"/>
                  <Image src='/assets/calender.png' alt="social" width={100} height={100}/>
                  <h1 className="text-[20px] mt-[15px]">Daily Reward</h1>
                  {dailyStatus === 'claimed' && (<p className="text-[#ffbf00af] text-[20px] ">Come Back Tommorow</p>)}
                  <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[20px]">+20,000</p> 
                  </div>
                  <button className={`bg-[#ffbf00af] p-4 px-[50px] text-[20px] rounded-md ${dailyStatus === 'claimed' ? 'bg-gray-500' : ' bg-green-600'}`} disabled={dailyStatus === 'claimed'} onClick={handleDailyClaim}>
                      { dailyStatus === '' ? "Claim" : "Claimed" }
                  </button>
                </div>
               )}

    </div>
  )
}

export default Earn

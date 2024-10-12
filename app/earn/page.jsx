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

const Earn = () => {
  const router = useRouter();
  const { tg, enableCloseConfirmation } = useTelegram();

  const { points,xStatus,teStatus, yoStatus, tikStatus, inStatus, faStatus } = useEnergy();
  const [xpullup, setXpullup] = useState(false);
  const [socialDescription, setSocialDescription] = useState('');

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
          
          <Social discription= {'Follow  X account'} image= {'/assets/twitter.png' } id ={'twitter'} url = {'https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09'} styleDisable = {styleDisableX} unClaim= {unClaimX}/>
          <Social discription= {'Join our Telegram channel'} image= {'/assets/telegram.png'} id={'telegram'} url = {'https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09'} styleDisable = {styleDisableTe} unClaim ={unClaimTe}/>
          <Social discription= {'Subscribe to our Youtube'} image= {"/assets/youtube.png" } id = {'youtube'} url = {'https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09'} styleDisable = {styleDisableYo} unClaim ={unClaimYo}/>
          <Social discription= {'Follow our Tiktok account'} image= {'/assets/tiktok.png' } id= {'tiktok'} url = {'https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09'} styleDisable = {styleDisableTik} unClaim={unClaimTik}/>
          <Social discription= {'Follow our Instagram account'} image= {'/assets/instagram.png'} id ={'instagram'} url = {'https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09' } styleDisable = {styleDisableIn} unClaim ={unClaimIn}/>
          <Social discription= {'Follow our Facebook account'} image= {'/assets/facebook.png' } id= {'facebook'} url = {'https://x.com/NonagonAI?t=vMrC8N3pNR4S1bZu1W5I-A&s=09'} styleDisable = {styleDisableFa} unClaim= {unClaimFa}/>

    </div>
  )
}

export default Earn

'use client'
import Image from "next/image";
import { useEnergy } from "@/context/context";
import { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import {IoClose} from 'react-icons/io5';

const Social = ({image, discription , id, url, styleDisable, unClaim, status}) => {

  const { points, setPoints,xStatus,setXStatus, teStatus, yoStatus, tikStatus, inStatus, faStatus, 
              setTeStatus,setYoStatus,setTikStatus,setInStatus, setFaStatus} = useEnergy();
  const [xpullup, setXpullup] = useState(false);
  const [socialDescription, setSocialDescription] = useState('');


  const openLink = (url,id) => {
    window.open(url, '_blank');
    if(id==='tiktok'){
        if(tikStatus === ''){
            setTikStatus("unclaimed");
          }
    } else if (id==='telegram') {
        if(teStatus === ''){
            setTeStatus("unclaimed");
          }
    }  else if (id==='youtube') {
        if(yoStatus === ''){
            setYoStatus("unclaimed");
          }
    }  else if (id==='twitter') {
        if(xStatus === ''){
            setXStatus("unclaimed");
          }
    }   else if (id==='instagram') {
        if(inStatus === ''){
            setInStatus("unclaimed");
          }
    }  else  {
        if(faStatus === ''){
            setFaStatus("unclaimed");
          }
    }
  
 };


 const handleClaim = (id) => {
    if(id=== 'twitter') {
        setPoints(points+500000);
        setXStatus('claimed');
        setXpullup(false);
    } else if (id === 'telegram' ) {
        setPoints(points+500000);
        setTeStatus('claimed');
        setXpullup(false);
    }  else if (id === 'youtube' ) {
        setPoints(points+500000);
        setYoStatus('claimed');
        setXpullup(false);
    }  else if (id === 'tiktok' ) {
        setPoints(points+500000);
        setTikStatus('claimed');
        setXpullup(false);
    }  else if (id === 'instagram' ) {
        setPoints(points+500000);
        setInStatus('claimed');
        setXpullup(false);
    }  else if (id === 'facebook' ) {
        setPoints(points+500000);
        setFaStatus('claimed');
        setXpullup(false);
    }

 };

 const handlePullup = (description) => {
    setXpullup(true);
    setSocialDescription(description);
 };


  return (
    <div>
        <button className="w-full" onClick={() => handlePullup(discription)}>
              <div className="bg-[#272727] flex justify-between rounded-md pb-2 pt-2 mt-4">
                <div className="flex gap-2">
                    <Image src={image} alt="social" width={50} height={50}/>
                    <div>
                        <p className="text-[17px] font-bold">{discription}</p>
                        <div className="flex gap-2">
                            <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                            <p>+50,000</p>
                        </div>
                    </div>
                </div>
                <IoIosArrowForward color="gray" className="w-[30px] h-[30px] mt-2" />
              </div>
          </button>
          {xpullup && (
                <div className="bg-black bottom-[10vw] right-[10vw] left-[10vw] top-[100px] 
                               flex flex-col gap-[20px] font-bold  justify-center items-center justify-items-center fixed z-30 border-white border-[1px]">
                  <IoClose size={27} onClick ={() => setXpullup(false)} className="absolute right-2 top-2"/>
                  <Image src={image} alt="social" width={50} height={50}/>
                  <h1 className="text-[20px] mt-[30px]">{socialDescription}</h1>
                  <button className="bg-[#ffbf00af] p-4 px-[50px] text-[20px] rounded-md" onClick={() => openLink(url, id)}>
                    Visit
                  </button>
                  {status === 'unclaimed' && (<p className="text-red-600 text-[15px]">Make sure you complete the task</p>)}
                  {/* {xStatus === 'unclaimed' && (<p className="text-red-600 text-[15px]">Make sure you complete the task</p>)}
                  {yoStatus === 'unclaimed' && (<p className="text-red-600 text-[15px]">Make sure you complete the task</p>)}
                  {tikStatus === 'unclaimed' && (<p className="text-red-600 text-[15px]">Make sure you complete the task</p>)}
                  {inStatus === 'unclaimed' && (<p className="text-red-600 text-[15px]">Make sure you complete the task</p>)}
                  {faStatus === 'unclaimed' && (<p className="text-red-600 text-[15px]">Make sure you complete the task</p>)}  */}
                  <div className="flex gap-2">
                        <Image src="/assets/coin.jpg" alt="coin" width={20} height={20} className="rounded-full"/>
                        <p className="text-[20px]">+50,000</p> 
                  </div>
                  <button className={`bg-[#ffbf00af] p-4 px-[50px] text-[20px] rounded-md ${styleDisable ? 'bg-gray-500' : ' bg-green-600'}`} disabled={styleDisable} onClick={() => handleClaim(id)}>
                      { unClaim ? "Claim" : "Claimed" }
                  </button>
                </div>
               )}
    </div>
  )
}

export default Social;

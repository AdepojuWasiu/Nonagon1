 'use client'

 import { useState, useEffect } from "react";
 import Image from "next/image";

 import {BsFillLightningChargeFill} from "react-icons/bs"
import Link from "next/link";
import { useEnergy } from "@/context/context";
import { useTelegram } from "@/hooks/useTelegram";
import { IoIosArrowForward } from "react-icons/io";






const Home = () => {
   
  
  const levelNames = [
    "Circle",    // From 0 to 4999 coins
    "Monogon",    // From 5000 coins to 24,999 coins
    "Digon",      // From 25,000 coins to 99,999 coins
    "Triangle",  // From 100,000 coins to 999,999 coins
    "Quadrilateral",   // From 1,000,000 coins to 2,000,000 coins
    "Pentagon",      // From 2,000,000 coins to 10,000,000 coins
    "Hexagon", // From 10,000,000 coins to 50,000,000 coins
    "Heptagon",    // From 50,000,000 coins to 100,000,000 coins
    "Octagon", // From 100,000,000 coins to 1,000,000,000 coins
    "Nonagon"       // From 1,000,000,000 coins to ∞
  ];


  const levelMinPoints = [
    0,        // Circle
    501000,     // Monogon
    2200000,    // Digon
    6300000,   // Triangle
    10400000,  // Quadrilateral
    20500000,  // Pentagon
    28600000, //  Hexagon
    35700000, //  Heptagon
    45000000, //  Octagon
    90000000  //  Nonagon

  ];

  const [levelIndex, setLevelIndex] = useState(6);
  const [clicks, setClicks] = useState([]);

  const { userid, username, points, energy, setPoints, setEnergy, tapValue, welcomeTurbo,
          gameLevel, setGameLevel, energyLimit, loading, status, count, timeLeft, setStatus, setCount, setTimeLeft } = useEnergy();

   const { tg } = useTelegram();



   if(tg) {
    tg.setHeaderColor('#000000');
    tg.enableClosingConfirmation();
    tg.BackButton.hide();
   };
  
  const calculateProgress = () => {
    if (levelIndex >= levelNames.length - 1) {
      return 100;
    }
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    const progress = ((points - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100;
    return Math.min(progress, 100);
  };

  useEffect(() => {
    const currentLevelMin = levelMinPoints[levelIndex];
    const nextLevelMin = levelMinPoints[levelIndex + 1];
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1);
    }
    setGameLevel(levelNames[levelIndex])
  }, [points, levelIndex, levelMinPoints, levelNames.length]);

  const handleCardClick = (e) => {
    e.preventDefault();
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
  
    const newClicks = Array.from(e.touches).map(touch => {
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      
      // Return an object for each touch point
      return {
        id: Date.now() + Math.random(), // Unique ID for each touch
        x: x,
        y: y,
        transform: `perspective(1000px) rotateX(${-y / 15}deg) rotateY(${x / 15}deg)`
      };
    });
  
    // Apply the first touch's transform effect to the card
    card.style.transform = newClicks[0]?.transform || '';
  
    // Reset the transform after 100ms
    setTimeout(() => {
      card.style.transform = '';
    }, 100);
  
    // Update the clicks state with all the new touch points
    if(!welcomeTurbo){
      if(energy>tapValue * newClicks.length) {
        setClicks([...clicks, ...newClicks]);
        setPoints(points + tapValue * newClicks.length); 
        setEnergy(energy - tapValue * newClicks.length);
     }
    }else {
      setClicks([...clicks, ...newClicks]);
      setPoints(points + tapValue * newClicks.length);
    }
    
    
  };
  
  const handleAnimationEnd = (id) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  const handleStart = () => {
    setStatus('farming');
  };

  const handleClaim = () => {
    setPoints((prevPoints) => prevPoints + Math.round(count));
    setCount(0);
    setTimeLeft(8 * 60 * 60 ); // reset timer to 3:40:05
    setStatus('start');
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
  };

  if(loading) {
    return <div className=" absolute inset-0 z-30 flex flex-col justify-center items-center justify-items-center bg-[#000000]">
                 <div className="text-[30px] text-white">Loading ...</div>
                 <div><svg className=" animate-spin h-[50px] w-[50px] bg-gray-600" viewBox="0 0 24 24"></svg></div>
                 
          </div>
  };
  

  


  return (
    <div className="mt-[20px] flex-col justify-center items-center background__home">
      <div className="flex justify-between items-center mx-[15px]">
        <div><h1 className="text-[20px] font-bold">Hi,{username}</h1></div>
        {/* <div><h1 className="text-[20px] font-bold" onClick={() => {updatePointWithBeacon()}}>Choose Exchange</h1></div> */}
        
        <div className="flex justify-center items-center font-bold mt-[20px]">
              <div>
                <div className="flex justify-between gap-[50px]">
                  <div>
                    <p className="text-sm">{gameLevel}</p>
                    <IoIosArrowForward color="gray" className="w-[15px] h-[15px]" />
                  </div>
                  <p className="text-sm">{levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span></p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    <div className="bg-[#ffbf00] h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                  </div>
                </div>
              </div>
         </div>
      </div>

         <div className="flex-col mt-[15px]">
          <div className="flex justify-center items-center gap-[5px]">
            <Image src="/assets/coin.jpg" alt="coin" width={40} height={40} className="rounded-full"/>
            <p className="text-[23px] font-bold">{points.toLocaleString()}</p>
          </div>
          <div className="flex justify-center items-center mt-[15px]" onTouchStart={handleCardClick}>
            <div className="circle-outer rounded-full">
              <div className="rounded-full circle-inner w-[200px]"> <Image className="rounded-full" src="/assets/nonagon.png" alt="nonagon" width={300} height={300} /></div>
            </div>
            {
                clicks.map((click) => (
                  <div
                    key={click.id}
                    className="absolute text-[30px] font-bold text-[#fff]"
                    style={{
                      top: `${click.y - 25}px`,
                      left: `${click.x - 15}px`,
                      animation: `float 1s ease forwards`,
                    }}
                    onAnimationEnd={() => handleAnimationEnd(click.id)}
                  >
                    {+tapValue}
                  </div>
                ))
              }
          </div>
        </div>

        <div className="flex justify-between items-center mx-[15px] font-bold mt-[20px] pb-[5px]">
          <div className="flex">
            <div><BsFillLightningChargeFill className="w-[30px] h-[30px]" color="#EE7600" /></div>
            <div className="flex mt-[4px]">
              <p>{energy}</p>
              <p>/{energyLimit}</p>
            </div>
          </div>
          <Link href="/boost">
              <div className="flex gap-[5px]">
                <Image src="/assets/boost.png" alt="boost" width={40} height={40}/>
                <p className=" mt-[4px]">Boost</p>
              </div>
          </Link>
          
        </div>
        <div className="flex justify-center items-center justify-items-center mt-2 pb-[30px]">
          <button onClick={status === 'start' ? handleStart : status === 'claim' ? handleClaim : null} className=" p-3 px-[20px] text-[25px] bg-black rounded-xl">
            {status === 'start' && 'Start Farming'}
            {status === 'farming' && `Farming... ${Math.round(count)} | ${formatTime(timeLeft)}`}
            {status === 'claim' && `Claim | ${Math.round(count)}`}
          </button>
        </div>

    </div>
  )
}
export default Home;



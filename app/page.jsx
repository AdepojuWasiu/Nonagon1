 'use client'

 import { useState, useEffect } from "react";
 import Image from "next/image";

 import {BsFillLightningChargeFill} from "react-icons/bs"
import Link from "next/link";
import { useEnergy } from "@/context/context";
import { useTelegram } from "@/hooks/useTelegram";





const Home = () => {

  const levelNames = [
    "Bronze",    // From 0 to 4999 coins
    "Silver",    // From 5000 coins to 24,999 coins
    "Gold",      // From 25,000 coins to 99,999 coins
    "Platinum",  // From 100,000 coins to 999,999 coins
    "Diamond",   // From 1,000,000 coins to 2,000,000 coins
    "Epic",      // From 2,000,000 coins to 10,000,000 coins
    "Legendary", // From 10,000,000 coins to 50,000,000 coins
    "Master",    // From 50,000,000 coins to 100,000,000 coins
    "GrandMaster", // From 100,000,000 coins to 1,000,000,000 coins
    "Lord"       // From 1,000,000,000 coins to ∞
  ];


  const levelMinPoints = [
    0,        // Bronze
    5000,     // Silver
    25000,    // Gold
    100000,   // Platinum
    1000000,  // Diamond
    2000000,  // Epic
    10000000, // Legendary
    50000000, // Master
    100000000,// GrandMaster
    1000000000// Lord

  ];

  const [levelIndex, setLevelIndex] = useState(6);
  const [clicks, setClicks] = useState([]);

  const { userid, username, points, energy, setPoints, setEnergy, tapValue, welcomeTurbo,
         close, setClose, energyLimit, energyIncrease } = useEnergy();

   const { tg, onClose, offClose, enableCloseConfirmation } = useTelegram();
  
  



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
        transform: `perspective(1000px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`
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
      if(energy>=tapValue) {
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

  useEffect(() => {
    if(energy>0) {
      const interval = setInterval(() => {
        setEnergy((prevEnergy) => Math.min(prevEnergy + energyIncrease, energyLimit));
      },3000); // Restore 10 energy points every second
  
      return () => clearInterval(interval); // Clear interval on component unmount
    }
    
  }, [energy]);


    // useEffect(() => {
    //   const handleClose = () => {
    //     updatePointWithBeacon(); // Your function to be called on close
    //   };
  
    //   // Register the 'close' event listener
    //   onClose(handleClose);
  
    //   // Cleanup: Remove the 'close' event listener when component unmounts or `onClose` changes
    //   return () => {
    //     offClose(handleClose);
    //   };
    // }, [onClose]);

    const updatePointWithBeacon = async () => {
      const url = "/api/update";
      const data = JSON.stringify({
        userId: userid,
        point: points,
      });
  
      navigator.sendBeacon(url, data);
    };

      window.addEventListener('unload',updatePointWithBeacon);

      return () => {
        window.removeEventListener('unload', updatePointWithBeacon);
      }

  
    // useEffect(() => {
    //   if(tg) {
    //     tg.ready();
    //     alert('hmmm')
    //     tg.onEvent('close', () => {
    //        updatePointWithBeacon();
    //        tg.close();
    //     });
    //     return () => {
    //      tg.offEvent('close');
    //     };
        
    //   }      
    // }, []);


  

  return (
    <div className="mt-[20px] flex-col justify-center items-center background__home">
      <div className="flex justify-between items-center mx-[15px]">
        <div><h1 className="text-[20px] font-bold">Hi,{username}</h1></div>
        <div><h1 className="text-[20px] font-bold" onClick={() => {updatePointWithBeacon()}}>Choose Exchange</h1></div>
      </div>

         <div className="flex justify-center items-center font-bold mt-[20px]">
              <div>
                <div className="flex justify-between gap-[50px]">
                  <p className="text-sm">{levelNames[levelIndex]}</p>
                  <p className="text-sm">{levelIndex + 1} <span className="text-[#95908a]">/ {levelNames.length}</span></p>
                </div>
                <div className="flex items-center mt-1 border-2 border-[#43433b] rounded-full">
                  <div className="w-full h-2 bg-[#43433b]/[0.6] rounded-full">
                    <div className="bg-[#ffbf00] h-2 rounded-full" style={{ width: `${calculateProgress()}%` }}></div>
                  </div>
                </div>
              </div>
         </div>

         <div className="flex-col mt-[30px]">
          <div className="flex justify-center items-center gap-[5px]">
            <Image src="/assets/coin.png" alt="coin" width={40} height={40}/>
            <p className="text-[23px] font-bold">{points.toLocaleString()}</p>
          </div>
          <div className="flex justify-center items-center mt-[30px]" onTouchStart={handleCardClick}>
            <div className="circle-outer rounded-full">
              <div className="rounded-full circle-inner w-[200px]"> <Image className="rounded-full" src="/assets/nonagon.png" alt="nonagon" width={300} height={300} /></div>
            </div>
            {
                clicks.map((click) => (
                  <div
                    key={click.id}
                    className="absolute text-[30px] font-bold text-[#fff]"
                    style={{
                      top: `${click.y - 60}px`,
                      left: `${click.x - 50}px`,
                      animation: `float 0.5s ease forwards`,
                    }}
                    onAnimationEnd={() => handleAnimationEnd(click.id)}
                  >
                    {+tapValue}
                  </div>
                ))
              }
          </div>
        </div>

        <div className="flex justify-between items-center mx-[15px] font-bold mt-[20px] pb-[55px]">
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

    </div>
  )
}
export default Home;



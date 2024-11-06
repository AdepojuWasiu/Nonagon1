
'use client'
import {GiDiamondTrophy} from "react-icons/gi";
import { useEnergy } from "@/context/context";
import { useTelegram } from "@/hooks/useTelegram";

const Level = () => {

  const {gameLevel} = useEnergy();
  const { tg, enableCloseConfirmation } = useTelegram();

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
    <div className='mb-[100px]'>
          <div className={`${gameLevel === 'Nonagon' ? 'bg-[#237e23]' : 'bg-[#272727]'} flex  rounded-md pb-2 pt-2 pl-4 pr-4 mt-4 justify-between`}>
                <div className="flex gap-4">
                  <div className="bg-[#000] py-3 px-5 rounded-full font-bold text-[15px] text-[#ffbf00]"><p>10</p></div>
                  <div>
                  <p className="text-[17px] font-bold">Nonagon</p>
                  <div className="flex gap-2">
                      <p>90,000,000 - {"\u221E"}</p>
                  </div>
                  </div>
               </div>
               <div className="flex mt-3">
                 <GiDiamondTrophy className="w-[30px] h-[30px]" color="gold" />
              </div>
         </div>
         <div className={`${gameLevel === 'Octagon' ? 'bg-[#237e23]' : 'bg-[#272727]'} flex  rounded-md pb-2 pt-2 pl-4 pr-4 mt-4 justify-between`}>
                <div className="flex gap-4">
                  <div className="bg-[#000] py-3 px-5 rounded-full font-bold text-[15px] text-[#ffbf00]"><p>9</p></div>
                  <div>
                  <p className="text-[17px] font-bold">Octagon</p>
                  <div className="flex gap-2">
                      <p>45,000,000 - 89,999,999</p>
                  </div>
                  </div>
               </div>
               <div className="flex mt-3">
                 <GiDiamondTrophy className="w-[30px] h-[30px]" color="gold" />
              </div>
         </div>
         <div className={`${gameLevel === 'Heptagon' ? 'bg-[#237e23]' : 'bg-[#272727]'} flex  rounded-md pb-2 pt-2 pl-4 pr-4 mt-4 justify-between`}>
                <div className="flex gap-4">
                  <div className="bg-[#000] py-3 px-5 rounded-full font-bold text-[15px] text-[#ffbf00]"><p>8</p></div>
                  <div>
                  <p className="text-[17px] font-bold">Heptagon</p>
                  <div className="flex gap-2">
                      <p>35,700,000 - 44,999,999</p>
                  </div>
                  </div>
               </div>
               <div className="flex mt-3">
                 <GiDiamondTrophy className="w-[30px] h-[30px]" color="gold" />
              </div>
         </div>
         <div className={`${gameLevel === 'Hwxagon' ? 'bg-[#237e23]' : 'bg-[#272727]'} flex  rounded-md pb-2 pt-2 pl-4 pr-4 mt-4 justify-between`}>
                <div className="flex gap-4">
                  <div className="bg-[#000] py-3 px-5 rounded-full font-bold text-[15px] text-[#ffbf00]"><p>7</p></div>
                  <div>
                  <p className="text-[17px] font-bold">Hexagon</p>
                  <div className="flex gap-2">
                      <p>28,600,000 - 35,699,999</p>
                  </div>
                  </div>
               </div>
               <div className="flex mt-3">
                 <GiDiamondTrophy className="w-[30px] h-[30px]" color="gold" />
              </div>
         </div>
         <div className={`${gameLevel === 'Pentagon' ? 'bg-[#237e23]' : 'bg-[#272727]'} flex  rounded-md pb-2 pt-2 pl-4 pr-4 mt-4 justify-between`}>
                <div className="flex gap-4">
                  <div className="bg-[#000] py-3 px-5 rounded-full font-bold text-[15px] text-[#ffbf00]"><p>6</p></div>
                  <div>
                  <p className="text-[17px] font-bold">Pentagon</p>
                  <div className="flex gap-2">
                      <p> 20,500,000 - 28,599,999</p>
                  </div>
                  </div>
               </div>
               <div className="flex mt-3">
                 <GiDiamondTrophy className="w-[30px] h-[30px]" color="gold" />
              </div>
         </div>
         <div className={`${gameLevel === 'Quadrilateral' ? 'bg-[#237e23]' : 'bg-[#272727]'} flex  rounded-md pb-2 pt-2 pl-4 pr-4 mt-4 justify-between`}>
                <div className="flex gap-4">
                  <div className="bg-[#000] py-3 px-5 rounded-full font-bold text-[15px] text-[#ffbf00]"><p>5</p></div>
                  <div>
                  <p className="text-[17px] font-bold">Quadrilateral</p>
                  <div className="flex gap-2">
                      <p>10,400,000 - 20,499,999</p>
                  </div>
                  </div>
               </div>
               <div className="flex mt-3">
                 <GiDiamondTrophy className="w-[30px] h-[30px]" color="gold" />
              </div>
         </div>
         <div className={`${gameLevel === 'Triangle' ? 'bg-[#237e23]' : 'bg-[#272727]'} flex  rounded-md pb-2 pt-2 pl-4 pr-4 mt-4 justify-between`}>
                <div className="flex gap-4">
                  <div className="bg-[#000] py-3 px-5 rounded-full font-bold text-[15px] text-[#ffbf00]"><p>4</p></div>
                  <div>
                  <p className="text-[17px] font-bold">Triangle</p>
                  <div className="flex gap-2">
                      <p>6,300,000 - 10,399,999</p>
                  </div>
                  </div>
               </div>
               <div className="flex mt-3">
                 <GiDiamondTrophy className="w-[30px] h-[30px]" color="gold" />
              </div>
         </div>
         <div className={`${gameLevel === 'Digon' ? 'bg-[#237e23]' : 'bg-[#272727]'} flex  rounded-md pb-2 pt-2 pl-4 pr-4 mt-4 justify-between`}>
                <div className="flex gap-4">
                  <div className="bg-[#000] py-3 px-5 rounded-full font-bold text-[15px] text-[#ffbf00]"><p>3</p></div>
                  <div>
                  <p className="text-[17px] font-bold">Digon</p>
                  <div className="flex gap-2">
                      <p>2,200,000 - 6,299,999</p>
                  </div>
                  </div>
               </div>
               <div className="flex mt-3">
                 <GiDiamondTrophy className="w-[30px] h-[30px]" color="gold" />
              </div>
         </div>
         <div className={`${gameLevel === 'Monogon' ? 'bg-[#237e23]' : 'bg-[#272727]'} flex  rounded-md pb-2 pt-2 pl-4 pr-4 mt-4 justify-between`}>
                <div className="flex gap-4">
                  <div className="bg-[#000] py-3 px-5 rounded-full font-bold text-[15px] text-[#ffbf00]"><p>2</p></div>
                  <div>
                  <p className="text-[17px] font-bold">Monogon</p>
                  <div className="flex gap-2">
                      <p>501,000 - 2,199,999</p>
                  </div>
                  </div>
               </div>
               <div className="flex mt-3">
                 <GiDiamondTrophy className="w-[30px] h-[30px]" color="gold" />
              </div>
         </div>
         <div className={`${gameLevel === 'Circle' ? 'bg-[#237e23]' : 'bg-[#272727]'} flex  rounded-md pb-2 pt-2 pl-4 pr-4 mt-4 justify-between`}>
                <div className="flex gap-4">
                  <div className="bg-[#000] py-3 px-5 rounded-full font-bold text-[15px] text-[#ffbf00]"><p>1</p></div>
                  <div>
                  <p className="text-[17px] font-bold">Circle</p>
                  <div className="flex gap-2">
                      <p>0 - 500,999</p>
                  </div>
                  </div>
               </div>
               <div className="flex mt-3">
                 <GiDiamondTrophy className="w-[30px] h-[30px]" color="gold" />
              </div>
         </div>
    </div>
  )
}

export default Level

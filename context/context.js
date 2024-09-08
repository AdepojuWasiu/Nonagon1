'use client'


// context/EnergyContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import useTelegramInitData from '@/components/telegram';

const EnergyContext = createContext();

export function EnergyProvider({ children }) {

  const [userid, setUserid] = useState("");
  const [username, setUsername] = useState("");
  const [refCode, setRefCode] = useState("");
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [timeStamp, setTimeStamp] = useState("");
  const [availableTurbo, setAvailabeTurbo] = useState(0);
  const [availableEnergyRefill, setAvailableEnergyRefill] = useState(0);
  const [multitapLevel, setMultitapLevel] = useState(0);
  const [energyLimitLevel, setEnergyLimitLevel] = useState(0);
  const [rechargingSpeedLevel, setRechargingSpeedLevel] = useState("");
  const [gameLevel, setGameLevel] = useState("");
  const [exchange, setExchange] = useState("");
  const [referals, setReferals] = useState([]);
  const [tapValue, setTapValue] = useState(0);
  const [welcomeTurbo, setWelcomeTurbo] = useState(false);
  const [energyLimit, setEnergyLimit] = useState(0);
  const [energyIncrease, setEnergyIncrease] = useState(0);

  const initData = useTelegramInitData();

  const userId = initData.user?.id;
  const start_param = initData.start_param;
  const userName = initData.user?.username;

  useEffect(() => {
    setUserid(userId);
    setUsername(userName);
    setRefCode(start_param);
}, [userId, userName]);  // Set state only once when the component mounts

useEffect(() => {
    if (userid && username && refCode) {  // Only make the request when state variables are set
        const sendUser = async () => {
            try {
                const response = await fetch("/api/users", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userid,
                        username: username,
                        refCode: refCode,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setUsername(data.username);
                    setPoints(6000);
                    setEnergy(data.energy);
                    setAvailabeTurbo(data.availableTurbo);
                    setAvailableEnergyRefill(data.availableEnergyRefill);
                    setMultitapLevel(1);
                    setEnergyLimitLevel(1);
                    setRechargingSpeedLevel(1);
                    setReferals(data.referals);
                    setTapValue(1);
                    console.log(referals);
                    setEnergyLimit(5000);
                    setEnergyIncrease(1)

                } else {
                    console.log('Failed to save user:', response.statusText);
                }
            } catch (error) {
                console.log(error);
            }
        };

        sendUser();
    }
}, [userid, username]);  // This useEffect runs when the state variables are updated


 

  // setPoint(point);
  // setTimeStamp(timeStamp);
  // setAvailabeTurbo(availableTurbo);
  // setAvailableEnergyRefill(availableEnergyRefill);
  // setMultitapLevel(multitapLevel);
  // setEnergyLimitLevel(energyLimitLevel);
  // setRechargingSpeedLevel(rechargingSpeedLevel);
  // setGameLevel(gameLevel);
  // setExchange(exchange);
  // setReferals(referals);

  

  return (
    <EnergyContext.Provider value={{ userid, username, refCode, points, energy, timeStamp,welcomeTurbo, setWelcomeTurbo, energyLimit, setEnergyLimit,
                                     availableTurbo, availableEnergyRefill, multitapLevel, energyLimitLevel, rechargingSpeedLevel,
                                     gameLevel, exchange, referals,tapValue,setTapValue, setPoints, setEnergy, setTimeStamp, setAvailabeTurbo, setAvailableEnergyRefill,
                                     setMultitapLevel, setEnergyLimitLevel, setRechargingSpeedLevel, setGameLevel, setExchange, setReferals,
                                     energyIncrease, setEnergyIncrease }}>
      {children}
    </EnergyContext.Provider>
  );
}

export function useEnergy() {
  return useContext(EnergyContext);
}

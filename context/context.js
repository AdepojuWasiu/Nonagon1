'use client'


// context/EnergyContext.js
import { createContext, useState, useContext, useEffect,useRef } from 'react';
import useTelegramInitData from '@/components/telegram';
import { useTelegram } from '@/hooks/useTelegram';

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
  const [onceFetch, setOnceFetch] = useState(true);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState('');
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // in seconds (3 hours, 40 mins, 5 seconds) 0 * 60 * 60 + 1 * 60 + 5
  const [xTimeLeft, setXTimeleft] = useState(0);
  const [xStatus, setXStatus] = useState('');
  const [dailyTimeLeft, setDailyTimeLeft] = useState(0);

  const initData = useTelegramInitData();

  const userId = initData.user?.id;
  const start_param = initData.start_param;
  const userNames = initData.user?.username;
  const firstName = initData.user?.first_name;
  const userName = userNames !== "" ? userNames : firstName;

  useEffect(() => {
    setUserid(userId);
    setUsername(userName);
    setRefCode(start_param);
}, [userId,userName]);  // Set state only once when the component mounts

useEffect(() => {
    if (userid && username && onceFetch) {  // Only make the request when state variables are set
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
                    setOnceFetch(false);
                    setPoints(data.point);
                    setUsername(data.username);
                    setAvailabeTurbo(data.availableTurbo);
                    setAvailableEnergyRefill(data.availableEnergyRefill);
                    setMultitapLevel(data.multitapLevel);
                    setEnergyLimitLevel(data.energyLimitLevel);
                    setRechargingSpeedLevel(data.rechargingSpeedLevel);
                    setReferals(data.referals);
                    setTapValue(data.tapValue);
                    setEnergyLimit(data.energyLimit);
                    setEnergyIncrease(data.energyIncrease);
                    setTimeLeft(data.farmingTimeLeft);
                    setStatus(data.status);
                    setXStatus(data.xStatus);
                    
                    const timeLogin = Date.now();
                    const lastEnergyTime = new Date(data.lastEnergyUpdatedTime).getTime();
                    const timeDifferent =  timeLogin - lastEnergyTime;
                    const timeSeconds = timeDifferent/3000
                    const addEnergy =  data.energyIncrease * timeSeconds;
                    const newEnergy =  data.energy + addEnergy;
                    const roundEnergy = Math.round(newEnergy);
                    if(newEnergy >= data.energyLimit) {
                      setEnergy(data.energyLimit);
                    } else {
                      setEnergy(roundEnergy);
                    };

                    if(data.status === 'farming'){                         
                        const lastFarmingTime = new Date(data.lastFarmingTime).getTime();
                        const timeDifferentFarm = timeLogin - lastFarmingTime;
                        const timeSecondsFarm = timeDifferentFarm/1000;
                        const subtractTimeLeftout = data.farmingTimeLeft - timeSecondsFarm;
                        const addCount = timeSecondsFarm * 1;
                        const newCount = addCount + data.farming;
                        const roundSubtractTime = Math.round(subtractTimeLeftout);
                        const roundNewCount = Math.round(newCount);
                        if(roundSubtractTime <= 0){
                          setTimeLeft(0);
                          setCount(5000)
                        } else {
                          setTimeLeft(roundSubtractTime);
                          setCount(roundNewCount)
                        };

                    }else {
                       setCount(data.farming);
                    }

                  if(data.xStatus === 'unclaimed'){                         
                      const xLastTimeUpdated = new Date(data.xLastTimeUpdate).getTime();
                      const xtimeDifferentFarm = timeLogin - xLastTimeUpdated;
                      const xtimeSecondsFarm = xtimeDifferentFarm/1000;
                      const xsubtractTimeLeftout = data.xTimeLeft - xtimeSecondsFarm;
                      const xroundSubtractTime = Math.round(xsubtractTimeLeftout);
                      if(xroundSubtractTime <= 0){
                        setXTimeleft(0);
                      } else {
                        setXTimeleft(xroundSubtractTime); 
                      };

                  }else {
                    setXTimeleft(data.xTimeLeft);
                  }

                    setTimeout(() => {
                      setLoading(false);
                    }, 1000);

                    function getTodayAt1AM() {
                      const now = new Date();
                      now.setHours(1, 0, 0, 0); // Set hours to 1 AM, minutes, seconds, milliseconds to 0
                      return now;
                    }
                    
                    function getDifferenceInSeconds() {
                      const dateAt1AM = getTodayAt1AM();
                      const now = Date.now();
                      
                      // Difference in milliseconds
                      const differenceInMs = now - dateAt1AM.getTime();
                      
                      // Convert milliseconds to seconds
                      const differenceInSeconds = Math.floor(differenceInMs / 1000);
                      
                      return differenceInSeconds;
                    }
                    
                    const diff = getDifferenceInSeconds();
                    const daily = 86400 - diff;
                    setDailyTimeLeft(daily);
   
                } else {
                    console.log('Failed to save user:', response.statusText);
                }
            } catch (error) {
                console.log(error);
            }
        };

        sendUser();
    }
}, [userid, onceFetch]);  // This useEffect runs when the state variables are updated


const updatePointWithBeacon = async () => {
  const url = "/api/update";
  const data = JSON.stringify({
    userId: userid,
    point: points,
    lastPointsUpdatedTime: Date.now(),
    gameLevel:gameLevel
  });

  navigator.sendBeacon(url, data);
};

useEffect(() => {
  updatePointWithBeacon();
}, [points]);

const updateEnergyWithBeacon = async () => {
  const url = "/api/energy";
  const data = JSON.stringify({
    userId: userid,
    energy: energy,
    lastEnergyUpdatedTime: Date.now()
  });

  navigator.sendBeacon(url, data);
};

useEffect(() => {
  updateEnergyWithBeacon();
}, [energy]);

const updateFarmingWithBeacon = async () => {
  const url = "/api/farming";
  const data = JSON.stringify({
    userId: userid,
    farmingTimeLeft: timeLeft,
    farming: count,
    status: status,
    lastFarmingTime: Date.now()
  });

  navigator.sendBeacon(url, data);
};

useEffect(() => {
  updateFarmingWithBeacon();
}, [count]);

useEffect(() => {
  if(energy>0) {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + energyIncrease, energyLimit));
    },3000); // Restore 10 energy points every second
    return () => clearInterval(interval); // Clear interval on component unmount
  }
  
}, [energy]);



useEffect(() => {
  if (status === 'farming') {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(interval); // Stop the interval when time reaches 0
          setStatus('claim'); // Switch to claim mode
          return 0; // Ensure timeLeft doesn't go below 0
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts or status changes
  }
}, [status]);

const updateXWithBeacon = async () => {
  const url = "/api/farming/twiter";
  const data = JSON.stringify({
    userId: userid,
    xTimeLeft: xTimeLeft,
    xStatus: xStatus,
    xLastTimeUpdate: Date.now()
  });

  navigator.sendBeacon(url, data);
};

useEffect(() => {
  updateXWithBeacon();
}, [xStatus, xTimeLeft]);

useEffect(() => {
  if (xStatus === 'unclaimed') {
    const interval = setInterval(() => {
      setXTimeleft((prevXtimeLeft) => {
        if (prevXtimeLeft > 0) {
          return prevXtimeLeft - 1;
        } else {
          clearInterval(interval); // Stop the interval when time reaches 0
          setXStatus('ready');  // Switch to claim mode
          return 0; // Ensure timeLeft doesn't go below 0
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts or status changes
  }
}, [xStatus]);

useEffect(() => {
    const interval = setInterval(() => {
      setDailyTimeLeft((prevDailyTimeLeft) => {
        if (prevDailyTimeLeft > 0) {
          return prevDailyTimeLeft - 1;
        } else {
          clearInterval(interval); // Stop the interval when time reaches 0
          return 0; // Ensure timeLeft doesn't go below 0
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts or status changes
  
}, [dailyTimeLeft])


  return (
    <EnergyContext.Provider value={{ userid, username, refCode, points, energy, timeStamp,welcomeTurbo, setWelcomeTurbo, energyLimit, setEnergyLimit,
                                     availableTurbo, availableEnergyRefill, multitapLevel, energyLimitLevel, rechargingSpeedLevel,
                                     gameLevel, exchange, referals,tapValue,setTapValue, setPoints, setEnergy, setTimeStamp, setAvailabeTurbo, setAvailableEnergyRefill,
                                     setMultitapLevel, setEnergyLimitLevel, setRechargingSpeedLevel, setGameLevel, setExchange, setReferals, loading,
                                     energyIncrease, setEnergyIncrease, status, setStatus, count, setCount, timeLeft, setTimeLeft, xStatus,setXStatus, xTimeLeft, setXTimeleft, 
                                     dailyTimeLeft, setDailyTimeLeft }}>
      {children}
    </EnergyContext.Provider>
  );
}

export function useEnergy() {
  return useContext(EnergyContext);
}

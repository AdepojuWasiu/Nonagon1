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
  const [dailyTaskLeft, setDailyTaskLeft] = useState(0);
  const [socialTaskLeft, setSocialTaskLeft] = useState(0);

  const [status, setStatus] = useState('');
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // in seconds (3 hours, 40 mins, 5 seconds) 0 * 60 * 60 + 1 * 60 + 5
  const [xStatus, setXStatus] = useState('');
  const [xTimeLeft, setXTimeleft] = useState(0);
  const [teStatus, setTeStatus] = useState('');
  const [teTimeLeft, setTeTimeleft] = useState(0);
  const [yoStatus, setYoStatus] = useState('');
  const [yoTimeLeft, setYoTimeleft] = useState(0);
  const [tikStatus, setTikStatus] = useState('');
  const [tikTimeLeft, setTikTimeleft] = useState(0);
  const [inStatus, setInStatus] = useState('');
  const [inTimeLeft, setInTimeleft] = useState(0);
  const [faStatus, setFaStatus] = useState('');
  const [faTimeLeft, setFaTimeleft] = useState(0);
  const [dailyTimeLeft, setDailyTimeLeft] = useState(0);
  const [dailyStatus, setDailyStatus] = useState('');
  const [waiting, setWaiting] = useState(false);

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
                    setTeStatus(data.teStatus);
                    setYoStatus(data.yoStatus);
                    setTikStatus(data.tikStatus);
                    setInStatus(data.inStatus);
                    setFaStatus(data.faStatus);
                    setDailyStatus(data.dailyStatus);
                    setDailyTaskLeft(data.dailyTaskLeft);
                    setSocialTaskLeft(data.socialTaskLeft);
                    
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
                        const addCount = timeSecondsFarm * 0.695;
                        const newCount = addCount + data.farming;
                        const roundSubtractTime = Math.round(subtractTimeLeftout);
                        const roundNewCount = Math.round(newCount);
                        if(roundSubtractTime <= 0){
                          setTimeLeft(0);
                          setCount(20016)
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
                  };

                  if(data.teStatus === 'unclaimed'){                         
                    const teLastTimeUpdated = new Date(data.teLastTimeUpdate).getTime();
                    const tetimeDifferentFarm = timeLogin - teLastTimeUpdated;
                    const tetimeSecondsFarm = tetimeDifferentFarm/1000;
                    const tesubtractTimeLeftout = data.teTimeLeft - tetimeSecondsFarm;
                    const teroundSubtractTime = Math.round(tesubtractTimeLeftout);
                    if(teroundSubtractTime <= 0){
                      setTeTimeleft(0);
                    } else {
                      setTeTimeleft(teroundSubtractTime); 
                    };

                }else {
                  setTeTimeleft(data.teTimeLeft);
                };

                if(data.yoStatus === 'unclaimed'){                         
                  const yoLastTimeUpdated = new Date(data.yoLastTimeUpdate).getTime();
                  const yotimeDifferentFarm = timeLogin - yoLastTimeUpdated;
                  const yotimeSecondsFarm = yotimeDifferentFarm/1000;
                  const yosubtractTimeLeftout = data.yoTimeLeft - yotimeSecondsFarm;
                  const yoroundSubtractTime = Math.round(yosubtractTimeLeftout);
                  if(yoroundSubtractTime <= 0){
                    setYoTimeleft(0);
                  } else {
                    setYoTimeleft(yoroundSubtractTime); 
                  };

              }else {
                setYoTimeleft(data.yoTimeLeft);
              };

              if(data.tikStatus === 'unclaimed'){                         
                const tikLastTimeUpdated = new Date(data.tikLastTimeUpdate).getTime();
                const tiktimeDifferentFarm = timeLogin - tikLastTimeUpdated;
                const tiktimeSecondsFarm = tiktimeDifferentFarm/1000;
                const tiksubtractTimeLeftout = data.tikTimeLeft - tiktimeSecondsFarm;
                const tikroundSubtractTime = Math.round(tiksubtractTimeLeftout);
                if(tikroundSubtractTime <= 0){
                  setTikTimeleft(0);
                } else {
                  setTikTimeleft(tikroundSubtractTime); 
                };

             }else {
              setTikTimeleft(data.tikTimeLeft);
             };

            if(data.inStatus === 'unclaimed'){                         
              const inLastTimeUpdated = new Date(data.inLastTimeUpdate).getTime();
              const intimeDifferentFarm = timeLogin - inLastTimeUpdated;
              const intimeSecondsFarm = intimeDifferentFarm/1000;
              const insubtractTimeLeftout = data.inTimeLeft - intimeSecondsFarm;
              const inroundSubtractTime = Math.round(insubtractTimeLeftout);
              if(inroundSubtractTime <= 0){
                setInTimeleft(0);
              } else {
                setInTimeleft(inroundSubtractTime); 
              };

            }else {
            setInTimeleft(data.inTimeLeft);
            };

                if(data.faStatus === 'unclaimed'){                         
                  const faLastTimeUpdated = new Date(data.faLastTimeUpdate).getTime();
                  const fatimeDifferentFarm = timeLogin - faLastTimeUpdated;
                  const fatimeSecondsFarm = fatimeDifferentFarm/1000;
                  const fasubtractTimeLeftout = data.faTimeLeft - fatimeSecondsFarm;
                  const faroundSubtractTime = Math.round(fasubtractTimeLeftout);
                  if(faroundSubtractTime <= 0){
                    setFaTimeleft(0);
                  } else {
                    setFaTimeleft(faroundSubtractTime); 
                  };

                }else {
                setFaTimeleft(data.faTimeLeft);
                };

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
        setTimeout(() => {
          setWaiting(true);
        }, 1000);
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
  if(waiting === true) {
    updatePointWithBeacon();  
  }
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
  if(waiting === true) {
    updateEnergyWithBeacon(); 
  }
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
  if(waiting === true) {
    updateFarmingWithBeacon();
  }
}, [count]);

useEffect(() => {
  if(energy>0) {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + energyIncrease, energyLimit));
    },10000); // Restore 10 energy points every second
    return () => clearInterval(interval); // Clear interval on component unmount
  }
  
}, [energy]);



useEffect(() => {
  if (status === 'farming') {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 6.95);
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 10;
        } else {
          clearInterval(interval); // Stop the interval when time reaches 0
          setStatus('claim'); // Switch to claim mode
          return 0; // Ensure timeLeft doesn't go below 0
        }
      });
    }, 10000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts or status changes
  }
}, [status]);

const updateXWithBeacon = async () => {
  const url = "/api/farming/twiter";
  const data = JSON.stringify({
    userId: userid,
    xTimeLeft: xTimeLeft,
    xStatus: xStatus,
    xLastTimeUpdate: Date.now(),
    socialTaskLeft: socialTaskLeft
  });

  navigator.sendBeacon(url, data);
};

useEffect(() => {
  if(waiting === true) {
    updateXWithBeacon();
  }
}, [xStatus, xTimeLeft]);

const updateTeWithBeacon = async () => {
  const url = "/api/farming/telegram";
  const data = JSON.stringify({
    userId: userid,
    teTimeLeft: teTimeLeft,
    teStatus: teStatus,
    teLastTimeUpdate: Date.now(),
    socialTaskLeft: socialTaskLeft
  });

  navigator.sendBeacon(url, data);
};

useEffect(() => {
  if(waiting === true) {
    updateTeWithBeacon();
  }
}, [teStatus, teTimeLeft]);

const updateYoWithBeacon = async () => {
  const url = "/api/farming/youtube";
  const data = JSON.stringify({
    userId: userid,
    yoTimeLeft: yoTimeLeft,
    yoStatus: yoStatus,
    yoLastTimeUpdate: Date.now(),
    socialTaskLeft: socialTaskLeft
  });

  navigator.sendBeacon(url, data);
};

useEffect(() => {
  if(waiting === true) {
    updateYoWithBeacon();
  }
}, [yoStatus, yoTimeLeft]);

const updateTikWithBeacon = async () => {
  const url = "/api/farming/tiktok";
  const data = JSON.stringify({
    userId: userid,
    tikTimeLeft: tikTimeLeft,
    tikStatus: tikStatus,
    tikLastTimeUpdate: Date.now(),
    socialTaskLeft: socialTaskLeft
  });

  navigator.sendBeacon(url, data);
};

useEffect(() => {
  if(waiting === true) {
    updateTikWithBeacon();
  }
}, [tikStatus, tikTimeLeft]);

const updateInWithBeacon = async () => {
  const url = "/api/farming/instagram";
  const data = JSON.stringify({
    userId: userid,
    inTimeLeft: inTimeLeft,
    inStatus: inStatus,
    inLastTimeUpdate: Date.now(),
    socialTaskLeft: socialTaskLeft
  });

  navigator.sendBeacon(url, data);
};

useEffect(() => {
  if(waiting === true) {
    updateInWithBeacon();
  }
}, [inStatus, inTimeLeft]);

const updateFaWithBeacon = async () => {
  const url = "/api/farming/facebook";
  const data = JSON.stringify({
    userId: userid,
    faTimeLeft: faTimeLeft,
    faStatus: faStatus,
    faLastTimeUpdate: Date.now(),
    socialTaskLeft: socialTaskLeft
    
  });

  navigator.sendBeacon(url, data);
};

useEffect(() => {
  if(waiting === true) {
    updateFaWithBeacon();
  }
}, [faStatus, faTimeLeft]);

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
  if (teStatus === 'unclaimed') {
    const interval = setInterval(() => {
      setTeTimeleft((prevTetimeLeft) => {
        if (prevTetimeLeft > 0) {
          return prevTetimeLeft - 1;
        } else {
          clearInterval(interval); // Stop the interval when time reaches 0
          setTeStatus('ready');  // Switch to claim mode
          return 0; // Ensure timeLeft doesn't go below 0
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts or status changes
  }
}, [teStatus]);

useEffect(() => {
  if (yoStatus === 'unclaimed') {
    const interval = setInterval(() => {
      setYoTimeleft((prevYotimeLeft) => {
        if (prevYotimeLeft > 0) {
          return prevYotimeLeft - 1;
        } else {
          clearInterval(interval); // Stop the interval when time reaches 0
          setYoStatus('ready');  // Switch to claim mode
          return 0; // Ensure timeLeft doesn't go below 0
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts or status changes
  }
}, [yoStatus]);

useEffect(() => {
  if (tikStatus === 'unclaimed') {
    const interval = setInterval(() => {
      setTikTimeleft((prevTiktimeLeft) => {
        if (prevTiktimeLeft > 0) {
          return prevTiktimeLeft - 1;
        } else {
          clearInterval(interval); // Stop the interval when time reaches 0
          setTikStatus('ready');  // Switch to claim mode
          return 0; // Ensure timeLeft doesn't go below 0
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts or status changes
  }
}, [tikStatus]);

useEffect(() => {
  if (inStatus === 'unclaimed') {
    const interval = setInterval(() => {
      setInTimeleft((prevIntimeLeft) => {
        if (prevIntimeLeft > 0) {
          return prevIntimeLeft - 1;
        } else {
          clearInterval(interval); // Stop the interval when time reaches 0
          setInStatus('ready');  // Switch to claim mode
          return 0; // Ensure timeLeft doesn't go below 0
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts or status changes
  }
}, [inStatus]);

useEffect(() => {
  if (faStatus === 'unclaimed') {
    const interval = setInterval(() => {
      setFaTimeleft((prevFatimeLeft) => {
        if (prevFatimeLeft > 0) {
          return prevFatimeLeft - 1;
        } else {
          clearInterval(interval); // Stop the interval when time reaches 0
          setFaStatus('ready');  // Switch to claim mode
          return 0; // Ensure timeLeft doesn't go below 0
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval when the component unmounts or status changes
  }
}, [faStatus]);

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
                                     availableTurbo, availableEnergyRefill, multitapLevel, energyLimitLevel, rechargingSpeedLevel, dailyStatus, setDailyStatus,
                                     gameLevel, exchange, referals,tapValue,setTapValue, setPoints, setEnergy, setTimeStamp, setAvailabeTurbo, setAvailableEnergyRefill,
                                     setMultitapLevel, setEnergyLimitLevel, setRechargingSpeedLevel, setGameLevel, setExchange, setReferals, loading,
                                     energyIncrease, setEnergyIncrease, status, setStatus, count, setCount, timeLeft, setTimeLeft, xStatus,setXStatus, xTimeLeft, setXTimeleft, 
                                     dailyTimeLeft, setDailyTimeLeft, teStatus, yoStatus, tikStatus, inStatus, faStatus, setTeStatus,setYoStatus,setTikStatus,setInStatus, setFaStatus,
                                     dailyTaskLeft, setDailyTaskLeft,socialTaskLeft, setSocialTaskLeft }}>
      {children}
    </EnergyContext.Provider>
  );
}

export function useEnergy() {
  return useContext(EnergyContext);
}

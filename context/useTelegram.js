// 'use client'
// import { useEffect, useState } from 'react';

// export function useTelegram() {
//   const [tg, setTg] = useState(null);

//   useEffect(() => {
//     // Make sure the Telegram Web Apps SDK is available
//     if (window.Telegram && window.Telegram.WebApp) {
//       const telegram = window.Telegram.WebApp;
//       setTg(telegram); // Set the Telegram WebApp instance in state
//     }

//     // Optional: Clean up on unmount
//     return () => {
//       setTg(null); // Reset the state
//     };
//   }, []);

//   return {
//     tg, // The Telegram WebApp instance
//     onClose: tg ? tg.close : () => console.log('Telegram instance is not ready'), // Safeguard for calling close
//   };
// }

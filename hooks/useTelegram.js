// 'use client'

// import { useEffect, useState } from 'react';

// export function useTelegram() {
//   const [tg, setTg] = useState(null); // Initialize state for the Telegram WebApp object

//   useEffect(() => {
//     // Ensure the code runs only on the client side
//     if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
//       const telegram = window.Telegram.WebApp;
//       setTg(telegram); // Set the Telegram WebApp instance
//     }

//     return () => {
//       setTg(null); // Cleanup if needed
//     };
//   }, []);

//   return { tg };
// }


'use client';

// 
import { useEffect, useState } from 'react';

export function useTelegram() {
  const [tg, setTg] = useState(null); // Initialize state for the Telegram WebApp object

  useEffect(() => {
    // Ensure the code runs only on the client side
    if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
      const telegram = window.Telegram.WebApp;
      setTg(telegram); // Set the Telegram WebApp instance
    }

    return () => {
      setTg(null); // Cleanup if needed
    };
  }, []);

  // Listen to the browser's 'beforeunload' event for when the user is closing the app
  const onClose = (callback) => {
    const handleBeforeUnload = (e) => {
      // Run the provided callback before the app is closed
      callback();

      // Chrome requires returnValue to be set for confirmation to be shown
      e.preventDefault();
      e.returnValue = ''; 
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload); // Cleanup on unmount
    };
  };

  // Use this to remove the event listener (if needed)
  const offClose = (callback) => {
    window.removeEventListener('beforeunload', callback);
  };

  return { tg, onClose, offClose };
}

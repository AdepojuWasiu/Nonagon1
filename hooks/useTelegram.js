'use client'

import { useEffect, useState } from 'react';

// Custom hook to initialize and access Telegram Web App instance
export function useTelegram() {
  const [tg, setTg] = useState(null); // Holds the Telegram WebApp instance

  useEffect(() => {
    // Check if the Telegram WebApp API is available in the browser
    if (window.Telegram && window.Telegram.WebApp) {
      const telegram = window.Telegram.WebApp;
      setTg(telegram); // Set Telegram WebApp instance
    }

    // Optional cleanup when the component is unmounted
    return () => {
      setTg(null);
    };
  }, []);

  return {
    tg, // Exposes the Telegram WebApp instance
  };
}

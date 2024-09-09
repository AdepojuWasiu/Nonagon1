'use client'

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

  return { tg };
}


'use client';
import { useEffect, useState } from 'react';

/**
 * Hook to get the initial data from the Telegram Web Apps API, including any referral data.
 * @example
 * const { user, start_param } = useTelegramInitData();
 * console.log(user.username, user.id, start_param);
 */
function useTelegram() {
  const [data, setData] = useState({});
  const [tg, setTg] = useState(null)

  useEffect(() => {
    const telegram = Object.fromEntries(
      new URLSearchParams(window.Telegram.WebApp)
    );

    setTg(telegram)
  }, []);

  return tg ;
}

export default useTelegram;

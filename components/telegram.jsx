'use client';
import { useEffect, useState } from 'react';

/**
 * Hook to get the initial data from the Telegram Web Apps API, including any referral data.
 * @example
 * const { user, start_param } = useTelegramInitData();
 * console.log(user.username, user.id, start_param);
 */
function useTelegramInitData() {
  const [data, setData] = useState({});
  const [tg, setTg] = useState(null)

  useEffect(() => {
    const firstLayerInitData = Object.fromEntries(
      new URLSearchParams(window.Telegram.WebApp.initData)
    );
    const telegram = Object.fromEntries(
      new URLSearchParams(window.Telegram.WebApp)
    );

    const initData = {};

    for (const key in firstLayerInitData) {
      try {
        initData[key] = JSON.parse(firstLayerInitData[key]);
      } catch {
        initData[key] = firstLayerInitData[key];
      }
    }

    setData(initData);
    setTg(telegram)
  }, []);

  return {data, tg };
}

export default useTelegramInitData;

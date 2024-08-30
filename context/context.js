'use client'


// context/EnergyContext.js
import { createContext, useState, useContext } from 'react';

const EnergyContext = createContext();

export function EnergyProvider({ children }) {
  const [energy, setEnergy] = useState(15); // Default energy value

  return (
    <EnergyContext.Provider value={{ energy, setEnergy }}>
      {children}
    </EnergyContext.Provider>
  );
}

export function useEnergy() {
  return useContext(EnergyContext);
}

import React, { createContext, useContext, useState } from "react";

interface GenderContextType {
  isMale: boolean;
  setIsMale: (isMale: boolean) => void;
}

const GenderContext = createContext<GenderContextType | undefined>(undefined);

export const GenderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMale, setIsMale] = useState(true);

  return (
    <GenderContext.Provider value={{ isMale, setIsMale }}>
      {children}
    </GenderContext.Provider>
  );
};

export const useGender = (): GenderContextType => {
  const context = useContext(GenderContext);
  if (!context) {
    throw new Error('useGender must be used within a GenderProvider');
  }
  return context;
};

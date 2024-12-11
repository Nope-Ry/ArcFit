import React, { createContext, useContext } from "react";
import { useUser } from "./UserContext";
import { UserInfo } from "./UserContext.types";

interface GenderContextType {
  isMale: boolean;
  setIsMale: (isMale: boolean) => void;
}

const GenderContext = createContext<GenderContextType | undefined>(undefined);

export const GenderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser } = useUser();
  const isMale = user.gender !== 1;
  
  const setIsMale = (isMale: boolean) => {
    const newUser: UserInfo = { ...user, gender: isMale ? 0 : 1 };
    setUser(newUser);
  };

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

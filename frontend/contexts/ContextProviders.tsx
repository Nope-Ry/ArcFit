import React from "react";
import { UserProvider } from "./UserContext";
import { CartProvider } from "./CartContext";
import { GenderProvider } from "./GenderContext";

export const ContextProviders = ({ children }) => {
  return (
    <UserProvider>
      <CartProvider>
        <GenderProvider>{children}</GenderProvider>
      </CartProvider>
    </UserProvider>
  );
};

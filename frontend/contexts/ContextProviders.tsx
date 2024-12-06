import React from 'react';
import { UserProvider } from './UserContext';
import { CartProvider } from './CartContext';

export const ContextProviders = ({children}) => {
  return (
    <UserProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </UserProvider>
  );
};


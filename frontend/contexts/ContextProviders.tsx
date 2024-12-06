import React from 'react';
import { UserInfo, UserProvider } from './UserContext';
import { CartProvider } from './CartContext';

interface ContextProvidersProps {
  children: React.ReactNode;
  initValues?: {
    userValue: UserInfo;
  };
}

export const ContextProviders = (props: ContextProvidersProps) => {
  const userValue = props.initValues?.userValue;

  return (
    <UserProvider userValue={userValue}>
      <CartProvider>
        {props.children}
      </CartProvider>
    </UserProvider>
  );
};


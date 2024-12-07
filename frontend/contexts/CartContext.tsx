import React, { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const incrementCart = (id) => {
    // console.log(id)
    if (!cart.includes(id)) {
        setCart([...cart, id]);
    }
  };

  const clearCart = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, incrementCart,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (producto) => {
    setCartItems((prevItems) => {
      if (prevItems.length > 0 && prevItems[0].location !== producto.location) {
        alert('No se pueden agregar productos de diferentes ubicaciones al carrito.');
        return prevItems;
      }

      const itemExists = prevItems.find((item) => item.id === producto.id);
      if (itemExists) {
        if (itemExists.quantity >= producto.availability) {
          alert('No se pueden agregar más productos de los disponibles.');
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...producto, quantity: 1 }];
    });
  };


  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === id);
      if (item) {
        if (newQuantity > item.availability) {
          alert('No se pueden agregar más productos de los disponibles.');
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
      }
      return prevItems;
    });
  };

  
  const removeFromCart = (productoId) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === productoId);
      if (itemExists) {
        if (itemExists.quantity > 1) {
          return prevItems.map((item) =>
            item.id === productoId ? { ...item, quantity: item.quantity - 1 } : item
          );
        }
        return prevItems.filter((item) => item.id !== productoId);
      }
      return prevItems;
    });
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    handleQuantityChange,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
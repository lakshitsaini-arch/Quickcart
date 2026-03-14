import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';   // ⭐ add this

// Create context
const CartContext = createContext();

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
};

// Provider
export function CartProvider({ children }) {

  // ⭐ Cart now saved in localStorage
  const [cart, setCart] = useLocalStorage('quickcart-cart', []);

  // ⭐ Sidebar state normal
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add To Cart
  const addToCart = (product) => {
    setCart((prevCart) => {

      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove Item
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  // Update Quantity
  const updateQuantity = (productId, newQuantity) => {

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Toggle Sidebar
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Total Items
  const getTotalItems = () => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  // Total Price
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const value = {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
// QuantityContext.js
import React, { createContext, useState, useContext } from 'react';
import TotalPrice from '../../User/TotalPrice';

// Create Context
const QuantityContext = createContext();

// Create a provider component
export const QuantityProvider = () => {
  const [quantities, setQuantities] = useState({});

  // Increase quantity for a specific item
  const increaseQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  // Decrease quantity for a specific item
  const decreaseQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) > 1 ? prevQuantities[id] - 1 : 1,
    }));
  };

  return (
    <QuantityContext.Provider
      value={{
        quantities,
        increaseQuantity,
        decreaseQuantity,
        setQuantities,
      }}
    >
      
    </QuantityContext.Provider>
  );
};

// Custom hook to use the context
export const useQuantities = () => {
  return useContext(QuantityContext);
};

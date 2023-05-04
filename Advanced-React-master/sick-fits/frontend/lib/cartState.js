import { createContext, useContext, useState } from 'react';

const LocalCartContext = createContext();
const LocalCartStateProvider = LocalCartContext.Provider;

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  function openCart() {
    setCartOpen(true);
  }
  function closeCart() {
    setCartOpen(false);
  }

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  return (
    <LocalCartStateProvider
      value={{ cartOpen, openCart, closeCart, toggleCart }}
    >
      {children}
    </LocalCartStateProvider>
  );
}

// Custom hook for accessing the cart local state
function useCart() {
  // Here passing the context to access all the data of the context
  const all = useContext(LocalCartContext);
  return all;
}

export { CartStateProvider, useCart };

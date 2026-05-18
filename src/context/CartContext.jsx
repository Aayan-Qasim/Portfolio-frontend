import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("aayan_portfolio_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("aayan_portfolio_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        toast.info(`${product.title} is already in your cart!`);
        return prev;
      }
      toast.success(`${product.title} has been added to your cart! 🛒`);
      return [...prev, product];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) {
        toast.error(`${item.title} removed from your cart.`);
      }
      return prev.filter((i) => i.id !== productId);
    });
  };

  const clearCart = () => {
    if (cartItems.length > 0) {
      setCartItems([]);
      toast.success("Your cart has been cleared.");
    }
  };

  const isItemInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isItemInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

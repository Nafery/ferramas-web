// En cartContext.js
import { createContext, useContext, useReducer, useEffect } from "react";

// Este contexto se utiliza para manejar el carrito de compras en la aplicación.
const CartContext = createContext();

// Inicializamos el carrito desde el localStorage o como un array vacío si no hay datos guardados.
const initialCart = JSON.parse(localStorage.getItem("cart")) || [];

// Reducer para manejar las acciones del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existing = state.find(product => product.id === action.payload.id);
      if (existing) {
        return state.map(product =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case "REMOVE_FROM_CART":
      return state.filter(product => product.id !== action.payload);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

// CartProvider es un componente que envuelve la aplicación y proporciona el contexto del carrito.
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

import React, {createContext, useContext, useState} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartId, setCartId] = useState();

    const updateCartId = (newCartId) => {
        setCartId(newCartId);
    };

    return (
        <CartContext.Provider value={{ cartId, updateCartId}} >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
}


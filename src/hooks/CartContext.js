import React, {createContext, useContext, useEffect, useState} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartId, setCartId] = useState();
    const [cartItems, setCartItems] = useState([]);

    // ladda produkter i cart från localstorage när komponenten monteras
    // (dvs. när komponenten skapats och lagts till i DOM:en för första gången)
    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];
        setCartItems(storedCartItems);
    }, []);

    const updateCartId = (newCartId) => {
        setCartId(newCartId);
    };

    const updateCartItems = (newCartItems) => {
        setCartItems(newCartItems);
        // console.log(cartItems);
    };

    return (
        <CartContext.Provider value={{ cartId, updateCartId, cartItems, updateCartItems}} >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
}


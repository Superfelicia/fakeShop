import {useEffect, useState} from "react";
import {createCart, fetchCart, updateQuantityInCart} from "../api/productService";
import {useCart} from "../hooks/CartContext";
import {FaMinus, FaPlus} from "react-icons/fa";

const Cart = () => {
    const [cartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { cartId, updateCartId, cartItems, updateCartItems } = useCart();

    useEffect(() => {
        const createOrloadCart = async () => {
            setLoading(true);
            try {
                // om cartId inte är null/undefined (falsy) så väljer vi det sparade värdet i localStorage
                let currentCartId = cartId ?? localStorage.getItem('cartId');
                const storedVariantIds = JSON.parse(localStorage.getItem('productsInCart')) || [];

                if (!currentCartId && storedVariantIds.length > 0) {
                    // skapa ny cart om cartId inte finns eller om det finns produkter i localStorage
                    const createdCart = await createCart(storedVariantIds);
                    if (createdCart) {
                        updateCartId(createdCart.id);
                        setCartData(createdCart);
                        localStorage.setItem('cartId', createdCart.id);
                    }
                } else if (currentCartId) {
                    // hämta befintlig cart om cartId finns
                    const existingCart = await fetchCart(currentCartId);
                    setCartData(existingCart);
                    updateCartItems(existingCart.totalQuantity)
                    console.log("existing cart with cartId:", currentCartId, cartItems);
                }
            } catch (error) {
                console.error("Error fetching cartData:", error);
            } finally {
                setLoading(false);
            }
        };

        createOrloadCart();
    }, [cartId, updateCartId, updateCartItems]);

    const handleUpdateCart = async (lineIdToUpdate, currentQuantity) => {
        const newQuantity = currentQuantity;

        try {
            const response = await updateQuantityInCart(cartId, lineIdToUpdate, newQuantity);
            console.log("Remove from cart response:", response);

            if (response && response.id) {
                const updatedCart = await fetchCart(cartId);
                console.log("Updated cartData:", updatedCart);

                updateCartItems(updatedCart.totalQuantity);

                setCartData(updatedCart);

            } else {
                console.error("failed to remove product from cart");
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    }

    if (loading) {
        return <div>Loading cart...</div>;
    }

    if (!cartData ||!cartData.lines?.edges?.length) {
        return <div>Cart is empty</div>;
    }

    return (
        <div className="cart-detail-container">
            <h2>Your cart</h2>
            <div className="cart-detail-content">
            <ul>
                {cartData.lines.edges.map((line) => (
                    <li key={line.node.id}>
                        <p>{line.node.merchandise.title}</p>
                        <img className="cart-image" src={line.node.merchandise.image.url} />
                        <div className="cart-description-container">
                            <p>${line.node.merchandise.price.amount} {line.node.merchandise.price.currencyCode}</p>
                            <div className="quantity-container">
                                <button className="cart-btn quantity-btn" onClick={() => handleUpdateCart(line.node.id, line.node.quantity -1)}>
                                    <FaMinus />
                                </button>
                                <p>{line.node.quantity}</p>
                                <button className="cart-btn quantity-btn"  onClick={() => handleUpdateCart(line.node.id, line.node.quantity +1)}>
                                    <FaPlus />
                                </button>
                            </div>
                        </div>

                        <button className="cart-btn"  onClick={() => handleUpdateCart(line.node.id, line.node.quantity -line.node.quantity)}>
                            Remove from cart
                        </button>
                    </li>
                ))}
            </ul>
            </div>
            <div className="subtotal-container">
                {cartData.cost && cartData.cost.totalAmount && (
                    <p>
                        Total: {cartData.cost.totalAmount.amount}{' '}
                        {cartData.cost.totalAmount.currencyCode}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Cart;
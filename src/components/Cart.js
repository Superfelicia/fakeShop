import {useEffect, useState} from "react";
import {addProductsToCart, createCart, fetchCart, removeFromCart} from "../api/productService";
import {useCart} from "../hooks/CartContext";

const Cart = () => {
    const [cartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { cartId, updateCartId } = useCart();

    useEffect(() => {
        const createOrloadCart = async () => {
            setLoading(true);
            try {
                let currentCartId = cartId;

                // hämta cartId från localStorage om det inte finns
                if (!currentCartId) {
                    currentCartId = localStorage.getItem('cartId');
                    if (currentCartId) {
                        updateCartId(currentCartId);
                    }
                }

                const storedVariantIds = JSON.parse(localStorage.getItem('productsInCart')) || [];

                if (!currentCartId && storedVariantIds.length > 0) {
                    // skapa ny cart om cartId inte finns eller om det finns produkter i localStorage
                    const createdCart = await createCart(storedVariantIds);
                    if (createdCart) {
                        updateCartId(createdCart.id);
                        setCartData(createdCart);
                        localStorage.setItem('cartId', createdCart.id);
                        console.log("current cartId:", cartId);
                    }
                } else if (currentCartId) {
                    // hämta befintlig cart om cartId finns
                    const existingCart = await fetchCart(currentCartId);
                    console.log(existingCart, currentCartId);
                    setCartData(existingCart);

                    // synka cart med produkter från localStorage
                    if (storedVariantIds.length > 0) {
                        await addProductsToCart(currentCartId, storedVariantIds);
                        console.log(storedVariantIds, currentCartId);
                        const updatedCart = await fetchCart(currentCartId);
                        setCartData(updatedCart);
                    }
                }

                // rensa localstorage efter synk
                localStorage.removeItem('productsInCart');
            } catch (error) {
                console.error("Error fetching cartData:", error);
            } finally {
                setLoading(false);
            }
        };

        createOrloadCart();
    }, [cartId, updateCartId]);

    const handleRemoveFromCart = async (lineIdToRemove) => {
        try {
            const updatedCart = await removeFromCart(cartId, lineIdToRemove);

            if (updatedCart) {
                console.log("Product removed from cart", lineIdToRemove);
                setCartData(updatedCart);
                console.log("Updated cartData:", updatedCart);

                // kolla om carten är tom och rensa och återställ om den är det
                if (updatedCart.lines.edges?.length === 0) {
                    clearCart();
                }
            } else {
                console.error("failed to remove product from cart");
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    }

    const clearCart = () => {
        setCartData(null);
        updateCartId(null);
        localStorage.removeItem('cartId');
    }

    if (!cartId) {
        return <div>Cart empty...</div>
    }

    if (loading) {
        return <div>Loading cart...</div>;
    }

    if (!cartData || !cartData.lines || !cartData.lines.edges) {
        return <div>Cart is empty or data is not available.</div>;
    }

    return (
        <div className="products-detail-container">
            <h2>Your cart</h2>
            <div className="detail-content">
            <ul>
                {cartData.lines.edges.map((line) => (
                    <li key={line.node.id}>
                        <p>{line.node.merchandise.title}</p>
                        <img className="detail-image-container" src={line.node.merchandise.image.url} />
                        <button onClick={() => handleRemoveFromCart(line.node.id)}>
                            Remove from cart
                        </button>
                    </li>
                ))}
            </ul>
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
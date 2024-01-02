import {useEffect, useState} from "react";
import {createCart, fetchCart} from "../api/productService";
import {useCart} from "../hooks/CartContext";

const Cart = () => {
    const [cartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { cartId, updateCartId } = useCart();

    useEffect(() => {
        const createOrloadCart = async () => {
            setLoading(true);
            try {
                if (!cartId) {
                    // skapa ny cart
                    const storedVariantIds = JSON.parse(localStorage.getItem('productsInCart')) || [];
                    if (storedVariantIds.length > 0) {
                        const createdCart = await createCart(storedVariantIds);
                        if (createdCart) {
                            updateCartId(createdCart.id);
                            setCartData(createdCart);
                            // localStorage.removeItem('productsInCart');
                        }
                    }
                } else {
                    // hämta befintlig cart
                    const existingCart = await fetchCart(cartId);
                    console.log(existingCart, cartId);
                    setCartData(existingCart);
                }
            } catch (error) {
                console.error("Error fetching cartData:", error);
            } finally {
                setLoading(false);
            }
        };

        createOrloadCart();
    }, [cartId, updateCartId]);

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
        <div>
            <h2>Your cart</h2>
            <ul>
                {cartData.lines.edges.map((line) => (
                    <li key={line.node.id}>
                        <p>{line.node.merchandise.title}</p>
                        <img className="detail-image-container" src={line.node.merchandise.image.url} />
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
    )
}

export default Cart;
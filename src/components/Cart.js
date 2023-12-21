import {useEffect, useState} from "react";
import {fetchCart} from "../api/productService";
import {useParams} from "react-router-dom";
import {useCart} from "../hooks/CartContext";

const Cart = () => {
    const [cartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { updateCartId } = useCart();
    const { cartId } = useParams();

    useEffect(() => {
        const loadCart = async () => {
            try {
                setLoading(true);
                console.log('Loading cart with id:', cartId);
                const decodedCartId = decodeURIComponent(cartId);
                console.log('Formatted cartId:', decodedCartId);
                const data = await fetchCart(decodedCartId);

                if (data) {
                    console.log(data);
                    updateCartId(decodedCartId);
                    setCartData(data);
                } else {
                    console.error("No cart data found");
                }
            } catch (error) {
                console.error("Error fetching cartData:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCart();
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
                {cartData.lines.edges.map((line) => {
                    if (line.node.merchandise.price)
                    return <li key={line.node.id}>
                        <p>{line.node.merchandise.title}</p>
                        <p>
                            Price: ${line.node.merchandise.price.amount}
                            {line.node.price.currencyCode}
                        </p>
                    </li>
                })}
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
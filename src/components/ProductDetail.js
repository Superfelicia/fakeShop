import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createCart, fetchCart, fetchProductDetails} from "../api/productService";
import Cart from "./Cart";
import {useCart} from "../hooks/CartContext";

const ProductDetail = () => {
    const {productId} = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const { updateCartId } = useCart();
    const {cartId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productDetailsData = await fetchProductDetails(productId);
                console.log(productDetailsData)
                setProductDetail(productDetailsData);
                console.log(productDetail);

                if (productDetailsData?.variants?.edges?.length === 1) {
                    setSelectedVariant(productDetailsData.variants.edges[0].node);
                }
            } catch (error) {
                console.error('Error fetching product detail:', error);
            }
        }

        fetchData();
    }, [productId]);

    const handleVariantChange = (event) => {
        const variantId = event.target.value;
        const selectedVariant = productDetail.variants.edges.find(
            (variant) => variant.node.id === variantId
        );
        setSelectedVariant(selectedVariant.node);
    }

    const handleAddToCart = async () => {
        if (!selectedVariant) {
            console.error("No variant selected");
            return;
        }

        try {
            if (!cartId) {
                const createdCart = await createCart(selectedVariant.id);
                console.log("Cart created:", createdCart);
                if (createdCart) {
                    updateCartId(createdCart.id);
                    navigate(`/cart/${encodeURIComponent(createdCart.id)}`);
                } else {
                    console.error("Error creating cart: No cart data returned");
                }
            } else {
                const existingCart = await fetchCart(cartId);
                console.log("Existing cart:", existingCart);

                if (!existingCart) {
                    console.error("Error fetching existing cart: No cart data returned");
                }
            }

        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    if (!productDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="products-detail-container">
            <div className="detail-content">
                <div className="detail-image-container">
                    <img src={productDetail.featuredImage.url} alt={productDetail.title}/>
                </div>
                <div className="detail-description-container">
                    <div className="detail-text">
                        <h2>{productDetail.title}</h2>
                    </div>
                    <div className="detail-price">
                        <p>${productDetail.variants.edges[0].node.price.amount} {productDetail.variants.edges[0].node.price.currencyCode}</p>
                    </div>
                    <div>
                        {productDetail.variants && productDetail.variants.edges.map((variant) => (
                            <label key={variant.node.id}>
                                <input
                                    type="radio"
                                    name="variant"
                                    value={variant.node.id}
                                    checked={selectedVariant && selectedVariant.id === variant.node.id}
                                    onChange={handleVariantChange}
                                />
                                {variant.node.title}
                            </label>
                        ))}
                    </div>
            {/*{productDetail.variants && productDetail.variants.edges ? (*/}
            {/*        <ul>*/}
            {/*            {productDetail.variants.edges.map((variant) => (*/}
            {/*                <li key={variant.node.id}>*/}
            {/*                    <p>Title: {variant.node.title}</p>*/}
            {/*                    /!*{variant.node.image && (*!/*/}
            {/*                    /!*    <img src={variant.node.image.url}*!/*/}
            {/*                    /!*         alt={productDetail.title + ' ' + variant.node.title}*!/*/}
            {/*                    /!*         style={{ width: "200px" }}*!/*/}
            {/*                    /!*    />*!/*/}
            {/*                    /!*)}*!/*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*):(*/}
            {/*    <p>No variants available</p>*/}
            {/*)}*/}
                    <div className="detail-size">
                        <button onClick={() => handleAddToCart()}>Add to cart</button>
                        <Link to={`/cart/${updateCartId}`}>
                            <button>Go to cart</button>
                        </Link>
                    </div>
                    <div className="detail-text">
                        <p>{productDetail.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
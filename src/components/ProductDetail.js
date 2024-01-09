import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {addProductsToCart, fetchCart, fetchProductDetails} from "../api/productService";
import {useCart} from "../hooks/CartContext";

const ProductDetail = () => {
    const {productId} = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const { cartId, updateCartId, updateCartItems } = useCart();
    const [currentCartData, setCurrentCartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productDetailsData = await fetchProductDetails(productId);
                setProductDetail(productDetailsData);
                // console.log(productDetail);

                if (productDetailsData?.variants?.edges?.length === 1) {
                    setSelectedVariant([productDetailsData.variants.edges[0].node]);
                }

                // om productDetailsData & -:-.cartId finns
                if (productDetailsData && productDetailsData.cartId) {
                    // om cartId är falsy eller inte matchar cartId på productDetailsData
                    if (!cartId || cartId !== productDetailsData?.cartId) {
                        console.log("cartId found on productDetailsData", productDetailsData.cartId);
                        updateCartId(productDetailsData.cartId);
                    } else {
                        console.error("Unable to fetch cartId from product details.");
                    }
                }

                const cartData = await fetchCart(cartId);
                setCurrentCartData(cartData);

                if (currentCartData && cartData.totalQuantity) {
                    console.log("cartId from fetchedCart:", cartData);
                    console.log("Currect cartData:", currentCartData.totalQuantity);
                }

            } catch (error) {
                console.error('Error fetching product detail:', error);
            }
        }

        fetchData();
    }, [productId, cartId, updateCartId, updateCartItems, currentCartData]);

    const handleVariantChange = (event) => {
        const variantId = event.target.value;
        const newSelectedVariant = productDetail.variants.edges.find(
            (variant) => variant.node.id === variantId).node;
        setSelectedVariant(newSelectedVariant);
    };

    const handleAddToCart = async (cartId, productToAdd) => {
        if (!selectedVariant) {
            console.error("No variant selected");
            return;
        }

        try {
            await addProductsToCart(cartId, productToAdd);

            // uppdatera antalet baserat på det senaste värdet
            updateCartItems((prevQuantity) => prevQuantity + 1);

            updateCartId(cartId);
            console.log("Product added to cart", productToAdd);

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
                                    checked={selectedVariant ? selectedVariant.id === variant.node.id : false}
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
                        <button onClick={() => handleAddToCart(cartId, selectedVariant)}>Add to cart</button>
                        {cartId && (
                            <Link to={`/cart/${encodeURIComponent(cartId)}`}>
                                <button>Go to cart</button>
                            </Link>
                        )}
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
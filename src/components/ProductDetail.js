import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchProductDetails} from "../api/productService";

const ProductDetail = () => {
    const {productId} = useParams();
    const [productDetail, setProductDetail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productDetailsData = await fetchProductDetails(productId);
                console.log(productDetailsData)
                setProductDetail(productDetailsData);
                console.log(productDetail);
            } catch (error) {
                console.error('Error fetching product detail:', error);
            }
        }

        fetchData();
    }, [productId]);

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
                        <p>{productDetail.description}</p>
                    </div>
                    <div className="detail-price">
                        <p>{productDetail.variants.edges[0].node.price.amount} {productDetail.variants.edges[0].node.price.currencyCode}</p>
            {productDetail.variants && productDetail.variants.edges ? (
                    <ul>
                        {productDetail.variants.edges.map((variant) => (
                            <li key={variant.node.id}>
                                <p>Title: {variant.node.title}</p>
                                {variant.node.image && (
                                    <img src={variant.node.image.url}
                                         alt={productDetail.title + ' ' + variant.node.title}
                                         style={{ width: "200px" }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
            ):(
                <p>No variants available</p>
            )}
                </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
import { Link } from "react-router-dom";

const ProductItem = ({ product, onProductClick }) => {

    const handleProductClick = () => {
        onProductClick(product.node.title, product.node.id);
    };

    return (
        <div className="products-content">
            <Link className="product-link-content"
                  to={`/products/${encodeURIComponent(product.node.id)}`}
                  onClick={handleProductClick}
            >
                {product.node.featuredImage && (
                    <img src={product.node.featuredImage.url} alt={product.node.title} />
                )}
                <h3 className="products-name">{product.node.title}</h3>
                <p className="product-price">${product.node.variants.edges[0].node.priceV2.amount} {product.node.variants.edges[0].node.priceV2.currencyCode}</p>
            </Link>
        </div>
    );
};

export default ProductItem;

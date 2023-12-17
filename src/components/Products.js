import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {fetchCollectionProducts} from "../api/productService";

const Products = () => {
    const {collectionId} = useParams();
    const [products, setProducts] = useState([]);
    // const location = useLocation();
    // const [collectionTitle, setCollectionTitle] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionProducts = await fetchCollectionProducts(collectionId);
                // console.log(collectionProducts);
                setProducts(collectionProducts);

                // if (location.state && location.state.key !== location.key) {
                //     setCollectionTitle(location.state?.collectionTitle);
                // }
            } catch (error) {
                console.error('Error fetching collections:', error);
            }

        }

        fetchData();
    }, [collectionId]);
    // location

    if (!products) {
        return <div>Loading...</div>;
    }

    return (
        <div className="products-page">
            <div className="products-title-container">
                <h2>Collections category</h2>
            </div>
            <div className="products-container">
                        {products?.map((product) => (
                            <div className="products-content">
                            <Link key={product.node.id} className="product-link-content" to={`/products/${encodeURIComponent(product.node.id)}`}>
                                {product.node.featuredImage && (
                                    <img src={product.node.featuredImage.url} alt={product.node.title} />
                                )}
                                <h3 className="products-name">{product.node.title}</h3>
                                <p className="product-price">{product.node.variants.edges[0].node.priceV2.amount} {product.node.variants.edges[0].node.priceV2.currencyCode}</p>
                            </Link>
                            </div>
                        ))}
            </div>
        </div>
    )
}

export default Products;
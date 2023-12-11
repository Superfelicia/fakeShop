import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
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
        <section className="products-section">
            <div className="products-container">
                {/*<h2>{collectionTitle}</h2>*/}
                <div className="products-content">
                    <ul>
                        {products?.map((product) => (
                            <li key={product.node.id}>
                                {product.node.featuredImage && (
                                    <img src={product.node.featuredImage.url} alt={product.node.title} />
                                )}
                                <h3>{product.node.title}</h3>
                                <p className="product-price">{product.node.variants.edges.cursor} {product.node.variants.edges[0].node.priceV2.amount} {product.node.variants.edges[0].node.priceV2.currencyCode}</p>
                                {/*<p>{product.node.description}</p>*/}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>

    )
}

export default Products;
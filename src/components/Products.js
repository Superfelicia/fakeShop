import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchCollectionProducts} from "../api/productService";
import ProductItem from "./ProductItem";

const Products = ({ onProductClick }) => {
    const {collectionId} = useParams();
    const [products, setProducts] = useState([]);
    // const location = useLocation();
    // const [collectionTitle, setCollectionTitle] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionProducts = await fetchCollectionProducts(collectionId);
                setProducts(collectionProducts);

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
                            <ProductItem key={product.node.id}
                                         product={product}
                                         onProductClick={onProductClick}/>
                        ))}
            </div>
        </div>
    )
}

export default Products;
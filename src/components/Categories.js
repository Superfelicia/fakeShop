import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchCollectionProducts} from "../api/productService";

const Categories = () => {
    const {collectionId} = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const collectionProducts = await fetchCollectionProducts(collectionId);
                console.log(collectionProducts);
                setProducts(collectionProducts);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        }

        fetchData();
    }, [collectionId]);

    if (!products) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{collectionId}</h2>
            <ul>
                {products?.map((product) => (
                    <li key={product.node.id}>
                        <h3>{product.node.title}</h3>
                        <p>{product.node.description}</p>
                        {product.node.featuredImage && (
                            <img src={product.node.featuredImage.url} alt={product.node.title} style={{width: "200px"}} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;
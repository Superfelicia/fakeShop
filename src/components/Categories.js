import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {fetchCategory, fetchProducts} from "../api/productService";

const Categories = () => {
    const {categoryId} = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await fetchProducts();
                if (!productsResponse.ok) {
                    throw new Error(`Failed to fetch category with id ${categoryId}`);
                }
                const productsData = await productsResponse.json();
                setProducts(productsData);

                const categoryResponse = await fetchCategory(categoryId);
                if (!categoryResponse.ok) {
                    throw new Error("Failed to fetch category");
                }
                const categoryData = await categoryResponse.json();
                setCategory(categoryData);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchData();
    }, [categoryId]);

    if (!category) {
        return <div>Loading...</div>;
    }
    
    return (
        <div>
            <h2>Categories</h2>
            <ul>
                {category.map((category) => (
                    <li key={category.id}>
                        <Link to={`/categories/${category.id}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
            <h2>{categoryId}</h2>
            <ul>
                {products && products.map((product) => (
                    <li key={product.id}>
                        <h3>{product.title} -{' '}</h3>
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
                        {product.images && product.images.length > 0 && (
                            <div>
                                {product.images.map((image, index) => (
                                    <img key={index} src={image} alt={`Product ${index + 1}`} style={{width: "200px"}} />
                                ))}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;
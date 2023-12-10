import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchProducts} from "../api/productService";

const Category = ({ categoryId, categoryName }) => {
    const [categoryProducts, setCategoryProducts] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProducts(categoryId);

                if (!response.ok) {
                    throw new Error(`Failed to fetch products for category ${categoryId}`);
                }

                const productsInCategory = await response.json();
                setCategoryProducts(productsInCategory);
                console.log('categories:', productsInCategory);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchData();
    }, [categoryId]);

    return (
        <div>
            <h2>{categoryName}</h2>
            <ul>
                {categoryProducts.map((product) => (
                    <li key={product.id}>
                        <Link to={`/categories/${product.id}`}>{product.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Category;
import {useEffect, useState} from "react";
import {fetchCategory, fetchProducts} from "../api/productService";
import {Link, useParams} from "react-router-dom";

const Home = () => {
    // const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const {categoryId} = useParams();

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const data = categoryId
        //             ? await fetchProducts(categoryId)
        //             : await fetchProducts();
        //         console.log(data);
        //
        //         if (categoryId) {
        //             setProducts(data);
        //         } else {
        //             setCategories(data);
        //         }
        //     } catch (error) {
        //         console.error('Error', error);
        //     }
        // };
        const fetchAllCategories = async () => {
            try {
                let categoriesData;
                if (categoryId) {
                    categoriesData = await fetchCategory(categoryId);
                    console.log("category specific action");
                } else {
                    categoriesData = await fetchCategory();
                }

                setCategories(categoriesData);
                console.log(categoriesData);
            } catch (error) {
                console.error('Error categories:', error);
            }
        };

        fetchAllCategories();
        // fetchData();
    }, [categoryId]);

    return (
        <section className="home-section">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-image">

                    </div>
                </div>
            </div>
            <div>
                <h2>Categories</h2>
                <ul>
                    {categories?.map((category) => (
                        <li key={category.id}>
                            <Link to={`/categories/${category.id}`}>
                                <img src={category.image}
                                alt={category.name}
                                style={{ width: "50px", height: "50px" }}
                                />
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Home;
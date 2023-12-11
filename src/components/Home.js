import {useEffect, useState} from "react";
import {fetchCollections} from "../api/productService";
import {Link, useParams} from "react-router-dom";
import Categories from "./Categories";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const {collectionId} = useParams();
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchAllCollections = async () => {
            try {
                const collectionData = await fetchCollections();
                console.log(collectionData.collections.edges);
                setCollections(collectionData.collections.edges);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        }

        fetchAllCollections();
    }, [])

    // useEffect(() => {
    //     const fetchAllCategories = async () => {
    //         try {
    //             let categoriesData;
    //             if (categoryId) {
    //                 categoriesData = await fetchCategory(categoryId);
    //                 console.log("category specific action");
    //             } else {
    //                 categoriesData = await fetchCategory();
    //             }
    //
    //             setCategories(categoriesData);
    //             console.log(categoriesData);
    //         } catch (error) {
    //             console.error('Error categories:', error);
    //         }
    //     };
    //
    //     fetchAllCategories();
    // }, [categoryId]);

    const handleCollectionClick = (collectionId) => {
        console.log("Clicked on collection with collectionId:", collectionId);
    }

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
                    {collections.map((category) => (
                        <li key={category.node.id}>
                            <Link to={`/categories/${encodeURIComponent(category.node.id)}`} onClick={() => handleCollectionClick(category.node.id)} >
                                <img src={category.node.image.url} alt={category.node.title} style={{ width: "50px", height: "50px" }}/>
                                {category.node.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Home;
import {useEffect, useState} from "react";
import {fetchCollections} from "../api/productService";
import {Link} from "react-router-dom";

const Home = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchAllCollections = async () => {
            try {
                const collectionData = await fetchCollections();
                // console.log(collectionData.collections.edges);
                setCollections(collectionData.collections.edges);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        }

        fetchAllCollections();
    }, [])

    const handleCollectionClick = (collectionId) => {
        console.log("Clicked on collection with collectionId:", collectionId);
    }

    return (
        <section className="home-section">
            <div className="categories-container">
                <ul className="categories-links-list">
                    {collections.map((category) => (
                        <li key={category.node.id} className="category-item">
                            <Link to={`/categories/${encodeURIComponent(category.node.id)}`} onClick={() => handleCollectionClick(category.node.id)} >
                                {category.node.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-image"></div>
                </div>
            </div>

        </section>
    )
}

export default Home;
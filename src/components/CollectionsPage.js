import {useEffect, useState} from "react";
import {fetchCollections} from "../api/productService";
import {Link} from "react-router-dom";
import {FaArrowRight} from "react-icons/fa";

const CollectionsPage = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchAllCollections = async () => {
            try {
                const collectionsData = await fetchCollections();
                setCollections(collectionsData.collections.edges);
            } catch (error) {
                console.error('Error fetching collections:', error);
            }
        }

        fetchAllCollections();
    }, []);

    return (
        <div className="collections-page">
            <div className="collections-title-container">
                <h2>All collections</h2>
            </div>
            <div className="collections-container">
                {collections.map((collection) => (
                    <div className="collection-content">
                        <Link key={collection.node.id} to={`/categories/${encodeURIComponent(collection.node.id)}`}>
                            <img className="collection-image" src={collection.node.image.url} alt={collection.node.title}/>
                            <p className="collection-title">
                                {collection.node.title}
                                <FaArrowRight />
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CollectionsPage;
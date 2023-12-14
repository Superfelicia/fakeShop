import {Link} from "react-router-dom";
import {FaBars, FaHeart, FaUser, FaWindowClose} from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {fetchCollections} from "../api/productService";

const Navbar = ({ isDesktop, isMobile }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        if (isMobile) {
            showSidebar();
        }
    }

    const showSidebar = () => {
        console.log('Open sidebar');
        setIsSidebarOpen(!isSidebarOpen);
    };

    const filteredCategories = ['Men', 'Women', 'Unisex', 'Shoes'];

    return (
        <>
        <header className="header-section">
            <nav className="nav-bar">
                {isMobile &&
                    <Link to='#' className='menu-bars' >
                        <FaBars onClick={showSidebar} />
                    </Link>
                }
                {isDesktop &&
                    <div className='desktop-menu'>
                        <ul>
                            {collections.map((category) => {
                                if (filteredCategories.includes(category.node.title)) {
                                    return (
                                    <li key={category.node.id}>
                                        <Link to={`/categories/${encodeURIComponent(category.node.id)}`}
                                              onClick={() => handleCollectionClick(category.node.id)}>
                                            {category.node.title}
                                        </Link>
                                    </li>
                                    );
                                }
                                return null;
                            })}
                            <li>
                                <Link to={`/collections`}>
                                    Collections
                                </Link>
                            </li>
                        </ul>
                    </div>
                }
                <ul className="nav-links-list">
                    {/*<li>*/}
                    {/*    <Link to="/">*/}
                    {/*        <FaSearch />*/}
                    {/*        <span>Search</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    <li>
                        <Link to="/liked">
                            <FaHeart />
                        </Link>
                    </li>
                    <li>
                        <Link to="/user">
                            <FaUser />
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart">
                            <FaCartShopping />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
            {isMobile &&
                <div className={isSidebarOpen ? 'sidebar-menu active' : 'sidebar-menu'}>
                    <Link to='#' className='menu-bars'>
                        <FaWindowClose onClick={showSidebar} />
                    </Link>
                    <ul>
                        {collections.map((category) => {
                            if (filteredCategories.includes(category.node.title)) {
                                return (
                                    <li key={category.node.id}>
                                        <Link to={`/categories/${encodeURIComponent(category.node.id)}`}
                                              onClick={() => handleCollectionClick(category.node.id)}>
                                            {category.node.title}
                                        </Link>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            }
        </>
    )
}

export default Navbar;
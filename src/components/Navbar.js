import {Link} from "react-router-dom";
import {FaBars, FaHeart, FaUser, FaWindowClose} from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";
import {useEffect, useState} from "react";
import {fetchCollections} from "../api/productService";
import {useCart} from "../hooks/CartContext";

const Navbar = ({ isDesktop, isMobile }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [collections, setCollections] = useState([]);
    const { cartId, updateCartId, cartItems } = useCart();
    const [isCartUpdated, setIsCartUpdated] = useState(false);

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

        if (!cartId) {
            const storedCartId = localStorage.getItem('cartId');
            if (storedCartId) {
                updateCartId(storedCartId);
            }
        }
    }, [cartId, updateCartId]);

    const handleCollectionClick = (collectionId) => {
        console.log("Clicked on collection with collectionId:", collectionId);
        if (isMobile) {
            showSidebar();
        }
    }

    useEffect(() => {
        setIsCartUpdated(true);

        const timeoutId = setTimeout(() => {
            setIsCartUpdated(false);
        }, 1000)

        return () => clearTimeout(timeoutId);
    }, [cartItems]);

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
                <div className="nav-links-container">
                    <ul className="nav-links-list">
                    {/*<li>*/}
                    {/*    <Link to="/">*/}
                    {/*        <FaSearch />*/}
                    {/*        <span>Search</span>*/}
                    {/*    </Link>*/}
                    {/*</li>*/}
                    <li>
                        <Link to="/liked">
                            <FaHeart size={25}/>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user">
                            <FaUser size={25}/>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/cart/${encodeURIComponent(cartId)}`}>
                            <div className="cart-container" style={{position: 'relative'}}>
                                <FaCartShopping size={25}/>
                                <div className={`cart-item-count ${isCartUpdated ? 'pulse': ''}`} style={{position: 'absolute', top: -6, right: -6, height: '15px', width: '15px', backgroundColor: 'orange', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px'}}>
                                    {cartItems.length > 0 && (
                                        <p style={{fontSize: '10px'}}>
                                            {cartItems.length}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
                </div>
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
import {Link} from "react-router-dom";
import {FaBars, FaRegHeart, FaRegCircle, FaRegUser, FaWindowClose} from "react-icons/fa";
import {FaBasketShopping} from "react-icons/fa6";
import {useEffect, useRef, useState} from "react";
import {fetchCollections} from "../api/productService";
import {useCart} from "../hooks/CartContext";

const Navbar = ({ isDesktop, isMobile, onCollectionClick }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const [collections, setCollections] = useState([]);
    const { cartId, updateCartId, cartItems } = useCart();
    const [isCartUpdated, setIsCartUpdated] = useState(false);

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

        if (!cartId) {
            const storedCartId = localStorage.getItem('cartId');
            if (storedCartId) {
                updateCartId(storedCartId);
            }
        }
    }, [cartId, updateCartId]);

    const handleCollectionClick = (collectionId, collectionTitle) => {
        console.log("Clicked on collection with collectionId:", collectionId);
        onCollectionClick(collectionTitle, collectionId);
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

    const closeSidebar = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", closeSidebar);

        return () => {
            document.removeEventListener("click", closeSidebar);
        }
    }, []);

    const filteredCategories = ['Men', 'Women', 'Unisex', 'Shoes'];

    return (
        <>
        <header className="header-section">
            <nav className="nav-bar">
                {isDesktop &&
                    <div className='desktop-menu'>
                        <ul>
                            {collections.map((category) => {
                                if (filteredCategories.includes(category.node.title)) {
                                    return (
                                    <li key={category.node.id}>
                                        <Link to={`/categories/${encodeURIComponent(category.node.id)}`}
                                              onClick={() => handleCollectionClick(category.node.id, category.node.title)}>
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

                {isMobile &&
                    <div ref={sidebarRef}  to='#' className='menu-bars' onClick={showSidebar}>
                        <FaBars />
                    </div>
                }
                <div className="logo-container">
                    <Link to="/">
                    <div className="logo-content">
                            <FaRegCircle />
                            <FaRegCircle />
                            <FaRegCircle />
                    </div>
                    </Link>
                </div>
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
                            <FaRegHeart size={25}/>
                        </Link>
                    </li>
                    <li>
                        <Link to="/user">
                            <FaRegUser size={25}/>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/cart/${encodeURIComponent(cartId)}`}>
                            <div className="cart-container" style={{position: 'relative'}}>
                                <FaBasketShopping size={25}/>
                                {cartItems > 0 ? (
                                <div className={`cart-item-count ${isCartUpdated ? 'pulse': ''}`} style={{position: 'absolute', top: -6, right: -6, height: '15px', width: '15px', backgroundColor: 'red', borderRadius: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px'}}>
                                        <p>
                                            {cartItems}
                                        </p>
                                </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </Link>
                    </li>
                </ul>
                </div>
            </nav>
        </header>
            {isMobile &&
                <div className={isSidebarOpen ? 'sidebar-menu active' : 'sidebar-menu'}>
                    <div to='#' className='menu-bars' onClick={closeSidebar}>
                        <FaWindowClose />
                    </div>
                    <ul>
                        {collections.map((category) => {
                            if (filteredCategories.includes(category.node.title)) {
                                return (
                                    <li key={category.node.id}>
                                        <Link to={`/categories/${encodeURIComponent(category.node.id)}`}
                                              onClick={() => handleCollectionClick(category.node.id, category.node.title)}>
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
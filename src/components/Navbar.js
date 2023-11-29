import {Link} from "react-router-dom";
import {FaHeart, FaSearch, FaUser} from "react-icons/fa";
import {FaCartShopping} from "react-icons/fa6";

const Navbar = () => {
    return (
        <header className="header-section">
            <nav className="nav-bar">
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

    )
}

export default Navbar;
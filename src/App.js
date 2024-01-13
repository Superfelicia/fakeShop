import './App.scss';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import useMediaQuery from "./hooks/useMediaQuery";
import CollectionsPage from "./components/CollectionsPage";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import {CartProvider} from "./hooks/CartContext";
import Footer from "./components/Footer";


function App() {
    const isDesktop = useMediaQuery('(min-width: 720px)');
    const isMobile = useMediaQuery('(max-width: 720px)');

  return (
      <Router>
          <CartProvider>
              <div>
                  <Navbar isDesktop={isDesktop} isMobile={isMobile} />
                  <div>
                      <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/collections" element={<CollectionsPage />} />
                          <Route path="/categories/:collectionId" element={<Products />} />
                          <Route path="/products/:productId" element={<ProductDetail />} />
                          <Route path="/cart/:cartId" element={<Cart />} />
                      </Routes>
                  </div>
                  <Footer />
              </div>
          </CartProvider>
      </Router>
  );
}

export default App;

import './App.scss';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import useMediaQuery from "./hooks/useMediaQuery";


function App() {
    const isDesktop = useMediaQuery('(min-width: 720px)');
    const isMobile = useMediaQuery('(max-width: 720px)');

  return (
      <Router>
        <div>
          <Navbar isDesktop={isDesktop} isMobile={isMobile} />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories/:collectionId" element={<Products />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

import './App.scss';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Categories from "./components/Categories";


function App() {
  return (
      <Router>
        <div>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories/:categoryId" element={<Categories />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

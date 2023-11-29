import './App.scss';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import User from "./components/User";
import Home from "./components/Home";
import LikedProducts from "./components/LikedProducts";


function App() {
  return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/" exact component={User} />
            <Route path="/" exact component={LikedProducts} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;

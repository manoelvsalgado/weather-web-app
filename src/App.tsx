import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import City from "./pages/City";

function App() {
    return (
      <Router>
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/city/:name" element={<City />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import ItemList from "./pages/ItemList";
import ItemCreate from "./pages/ItemCreate";
import ItemDetail from "./pages/ItemDetail";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen p-0 m-0 flex flex-col items-center">
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/create" element={<ItemCreate />} />
            <Route path="/detail" element={<ItemDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

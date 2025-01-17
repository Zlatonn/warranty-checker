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
        <div className="container mx-auto py-10 px-10 sm:px-15 lg:px-20">
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/create" element={<ItemCreate />} />
            <Route path="/detail/:id" element={<ItemDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

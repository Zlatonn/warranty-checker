import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import ItemList from "./pages/ItemList";
import ItemForm from "./pages/ItemForm";

// define base api URL
const BASE_URL: string = "http://localhost:8000";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen p-0 m-0 flex flex-col items-center">
        <NavBar />
        <div className="container mx-auto py-10 px-10 sm:px-15 lg:px-20">
          <Routes>
            <Route path="/" element={<ItemList apiURL={BASE_URL} />} />
            <Route path="/create" element={<ItemForm apiURL={BASE_URL} />} />
            <Route path="/edit/:id" element={<ItemForm apiURL={BASE_URL} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

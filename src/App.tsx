import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/navbar/Navbar";
import ItemList from "./pages/ItemList";
import ItemForm from "./pages/ItemForm";
import { useState } from "react";

// define base api URL
const BASE_URL: string = "http://localhost:8000";

// create client
const queryClient = new QueryClient();

const App = () => {
  // create state for collect search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen p-0 m-0 flex flex-col items-center">
          <NavBar setSearchQuery={setSearchQuery} />
          <div className="container mx-auto py-10 px-10 sm:px-15 lg:px-20">
            <Routes>
              <Route path="/" element={<ItemList apiURL={BASE_URL} searchQuery={searchQuery} />} />
              <Route path="/create" element={<ItemForm apiURL={BASE_URL} />} />
              <Route path="/edit/:id" element={<ItemForm apiURL={BASE_URL} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

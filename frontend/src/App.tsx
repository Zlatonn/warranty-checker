import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import NavBar from "./components/navbar/Navbar";
import ItemList from "./pages/ItemList";
import ItemForm from "./pages/ItemForm";

// create client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen p-0 m-0 flex flex-col items-center">
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/create" element={<ItemForm />} />
            <Route path="/edit/:id" element={<ItemForm />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;

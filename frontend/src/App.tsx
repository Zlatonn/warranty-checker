import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ItemList from "./pages/ItemList";
import ItemForm from "./pages/ItemForm";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";

// create client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen p-0 m-0 flex flex-col items-center">
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoutes />}>
              <Route path="/items" element={<ItemList />} />
              <Route path="/create" element={<ItemForm />} />
              <Route path="/edit/:id" element={<ItemForm />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;

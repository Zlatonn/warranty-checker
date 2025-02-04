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
import Error404 from "./components/error/Error404";

// Create QueryClient client for use react query in app
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen p-0 m-0 flex flex-col items-center">
          {/* Public routes when haven't token*/}
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>
            {/* Private routes when have token*/}
            <Route element={<PrivateRoutes />}>
              <Route path="/items" element={<ItemList />} />
              <Route path="/create" element={<ItemForm />} />
              <Route path="/edit/:id" element={<ItemForm />} />
            </Route>
            {/* Not found route when in correct path */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};

export default App;

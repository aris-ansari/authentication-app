import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import HandleRedirect from "./HandleRedirect";
import Admin from "./pages/Admin";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    // return isAuthenticated ? element : <Navigate to="/" />;
    return element;
  };

  return (
    <div>
      <HandleRedirect setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/welcome"
          element={<PrivateRoute element={<Welcome />} />}
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

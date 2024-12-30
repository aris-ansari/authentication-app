import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function HandleRedirect({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();
  const localAccessToken = localStorage.getItem("localAccessToken");

  useEffect(() => {
    if (localAccessToken) {
      setIsAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register"
      ) {
        navigate("/welcome", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default HandleRedirect;

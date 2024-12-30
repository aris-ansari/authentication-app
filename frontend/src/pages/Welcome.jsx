import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Welcome() {
  const [userName, setUserName] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const localAccessToken = localStorage.getItem("localAccessToken");

  useEffect(() => {
    setUserName(localStorage.getItem("localName"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("localAccessToken");
    localStorage.removeItem("localName");

    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const fetchProducts = async () => {
    try {
      const URL = "http://localhost:3000/api/v1/products/mobile";

      const response = await axios.get(URL, {
        headers: {
          Authorization: localAccessToken,
        },
      });

      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!localAccessToken) {
      toast.error("Redirecting to home...");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      {localAccessToken ? (
        <div>
          <button
            className="text-lg w-32 h-10 bg-[#14213d] text-[#fff] font-medium fixed top-2 left-2"
            onClick={handleLogout}
          >
            Logout
          </button>

          <h1 className="text-6xl text-[#14213d] my-4 text-center">
            Hello! <span className="font-semibold">{userName}</span>
          </h1>

          <div>
            <h2 className="text-4xl mb-2">Here is your products list</h2>
            {products.map((product, index) => (
              <div key={index} className="flex justify-center gap-4">
                <p className="text-xl">Name: {product.name}</p>
                <p className="text-xl">Price: {product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-4xl">Oops! It looks like you're not logged in.</h1>
      )}
    </div>
  );
}

export default Welcome;

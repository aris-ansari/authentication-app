import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;
    if (!email || !password) {
      return toast.error("Email and password is required");
    }

    try {
      const URL = "http://localhost:3000/api/v1/auth/login";

      const response = await axios.post(URL, loginInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("localAccessToken", response.data?.jwtToken);
      localStorage.setItem("localName", response.data?.name);

      navigate("/welcome");

      console.log(response.data);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      const validationError =
        error?.response?.data?.error?.details?.[0]?.message;

      if (validationError) {
        toast.error("Password must be at least 4 characters long.");
        console.error("Validation error:", validationError);
        return;
      }

      toast.error(errorMessage);
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Link to="/">
        <button className="text-lg w-32 h-10 bg-[#14213d] text-[#fff] font-medium fixed top-2 left-2">
          Home
        </button>
      </Link>
      <form
        className="h-[500px] w-[400px] bg-[#f4f4f4] flex flex-col justify-between items-center py-6"
        onSubmit={handleLogin}
      >
        <h1 className="text-4xl font-semibold">Login</h1>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="block w-[300px] h-[50px] py-2 px-4 my-4 mx-auto bg-transparent border border-[#bebebe] outline-none"
            onChange={handleChange}
            value={loginInfo.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="block w-[300px] h-[50px] py-2 px-4 my-4 mx-auto bg-transparent border border-[#bebebe] outline-none"
            onChange={handleChange}
            value={loginInfo.password}
          />
          <button className="text-lg w-[300px] h-10 bg-[#14213d] text-[#fff] font-medium">
            Login
          </button>
        </div>
        <div>
          <p className="text-md">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-[#14213d]">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;

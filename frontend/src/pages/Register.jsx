import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyRegisterInfo = { ...registerInfo };
    copyRegisterInfo[name] = value;
    setRegisterInfo(copyRegisterInfo);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password } = registerInfo;
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    try {
      const URL = "http://localhost:3000/api/v1/auth/register";

      const response = await axios.post(URL, registerInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Registered successfully");

      setTimeout(() => navigate("/login"), 3000);

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
        onSubmit={handleRegister}
      >
        <h1 className="text-4xl font-semibold">Register</h1>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="block w-[300px] h-[50px] py-2 px-4 my-4 mx-auto bg-transparent border border-[#bebebe] outline-none"
            onChange={handleChange}
            value={registerInfo.name}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="block w-[300px] h-[50px] py-2 px-4 my-4 mx-auto bg-transparent border border-[#bebebe] outline-none"
            onChange={handleChange}
            value={registerInfo.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="block w-[300px] h-[50px] py-2 px-4 my-4 mx-auto bg-transparent border border-[#bebebe] outline-none"
            onChange={handleChange}
            value={registerInfo.password}
          />
          <button className="text-lg w-[300px] h-10 bg-[#14213d] text-[#fff] font-medium">
            Register
          </button>
        </div>
        <div>
          <p className="text-md">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#14213d]">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;

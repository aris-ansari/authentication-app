import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-semibold text-[#14213d]">
        Welcome to home!
      </h1>
      <div className="flex justify-between items-center gap-6 my-6">
        <Link to="/login">
          <button className="text-lg w-32 h-10 bg-[#14213d] text-[#fff] font-medium">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="text-lg w-32 h-10 bg-[#14213d] text-[#fff] font-medium">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const localAccessToken = localStorage.getItem("localAccessToken");

  const handleLogout = () => {
    localStorage.removeItem("localAccessToken");
    localStorage.removeItem("localName");

    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const fetchUsers = async () => {
    try {
      const URL = "http://localhost:3000/api/v1/admin/users";

      const response = await axios.get(URL, {
        headers: {
          Authorization: localAccessToken,
        },
      });

      setUsers(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
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

          <div>
            <h2 className="text-4xl mb-4 text-center">Users list</h2>
            {users.map((user, index) => (
              <div key={index} className="border border-[#616161] p-2 my-2">
                <p className="text-xl">Name: {user.name}</p>
                <p className="text-xl">Email: {user.email}</p>
                <p className="text-xl">
                  Is Admin: {user.is_admin ? "True" : "False"}
                </p>
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

export default Admin;

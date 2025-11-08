import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate()
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow-md">

       <Link
        to="/dashboard"
        className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition-colors duration-200"
      >
        Admin Panel
      </Link>


      <ul className="flex space-x-6 text-lg font-medium">
        <li>
          <Link
            to="/user"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            View User
          </Link>
        </li>
        <li>
          <Link
            to="/course"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Add Course
          </Link>
        </li>
        <li>
          <Link
            to="/message"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            View Message
          </Link>
        </li>

        <li>
          <button
            onClick={() => {
              localStorage.removeItem("token"); 
              navigate('/')
            }}
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;

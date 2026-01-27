import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center p-4 w-11/12 mx-auto">
          <p className="text-2xl font-bold ">Task Manager</p>
          <div className="hidden md:block">
            <Link to="/register">
              <button
                type="button"
                className="text-lg bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white font-semibold"
              >
                Register
              </button>
            </Link>
            <Link to="/login">
              <button
                type="button"
                className="text-lg bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white ml-4 font-semibold"
              >
                Login
              </button>
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl"
            >
              <IoMdMenu />
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="px-4 md:hidden">
            <Link to="/register">
              <button
                type="button"
                className="w-full text-lg bg-blue-500 py-2 mb-4 rounded text-white font-semibold"
              >
                Register
              </button>
            </Link>
            <Link to="/login">
              <button
                type="button"
                className="w-full text-lg bg-blue-500 py-2 mb-4  rounded text-white font-semibold"
              >
                Login
              </button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;

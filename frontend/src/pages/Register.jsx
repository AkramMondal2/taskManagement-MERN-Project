import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Nav from "../components/Nav";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import api from "../api/axios";

const Register = () => {
  const data = { userName: "", email: "", password: "" };
  const [inputData, setInputData] = useState(data);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      inputData.userName === "" ||
      inputData.email === "" ||
      inputData.password === ""
    ) {
      toast.error("All fields are required");
    } else {
      try {
        const response = await api.post("/api/user/register", inputData);
        toast.success(response.data?.message || "Registered successfully!");
        setInputData({ userName: "", email: "", password: "" });
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    }
  };
  return (
    <>
      <Nav />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 w-4/5 md:w-1/2 lg:w-[30%]   mx-auto rounded-lg shadow-lg mt-10 border border-blue-500 p-8 "
      >
        <h1 className="text-center text-3xl text-blue-500 font-bold py-5">
          Create an account
        </h1>
        <label
          htmlFor="userName"
          className="text-lg font-semibold text-blue-500"
        >
          userName
        </label>
        <input
          value={inputData.userName}
          onChange={handleChange}
          type="text"
          placeholder="userName"
          name="userName"
          id="userName"
          className="w-full p-2 rounded my-2 border border-blue-500 outline-none"
        />
        <label htmlFor="email" className="text-lg font-semibold text-blue-500">
          Email
        </label>
        <input
          value={inputData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          className="w-full p-2 rounded my-2 border border-blue-500 outline-none"
        />
        <label
          htmlFor="password"
          className="text-lg font-semibold text-blue-500"
        >
          Password
        </label>
        <div className="relative">
          <input
            value={inputData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            id="password"
            className="w-full p-2 rounded my-2 border border-blue-500 outline-none"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute top-5 right-4 text-xl"
          >
            {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
          </button>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="text-lg mx-auto bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white font-semibold mt-4 mb-2 "
          >
            Register
          </button>
          <p className="text-gray-400">
            Already have an account?
            <Link to="/login">
              <span className="text-blue-500 hover:text-blue-600 font-semibold text-lg cursor-pointer text-center">
                Login
              </span>
            </Link>
          </p>
          <Link to="/resendVerification">
            <p className="text-blue-400 hover:text-blue-500  text-lg cursor-pointer text-center">
              ResendVerification
            </p>
          </Link>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Register;

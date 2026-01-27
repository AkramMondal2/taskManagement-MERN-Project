import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Nav from "../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import Footer from "../components/Footer";
import api from "../api/axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const data = { email: "", password: "" };
  const [inputData, setInputData] = useState(data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputData.email === "" || inputData.password === "") {
      toast.error("All fields are required");
    } else {
      try {
        const response = await api.post("api/user/login", inputData);
        toast.success(response.data?.message || "Loggedin successfully!");
        setInputData({ email: "", password: "" });
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        dispatch(login());
        navigate("/");
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
        className="bg-gray-100 w-4/5 md:w-1/2 lg:w-[30%]  mx-auto rounded-lg shadow-lg mt-10 border border-blue-500 p-8 "
      >
        <h1 className="text-center text-3xl text-blue-500 font-bold py-5">
          Login
        </h1>
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
          <Link to="/forgatePassword">
            <p className="text-blue-400 hover:text-blue-500  text-lg cursor-pointer text-center sm:text-end">
              ForgotPassword
            </p>
          </Link>
          <button
            type="submit"
            className="text-lg mx-auto bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white font-semibold mt-4 mb-2 "
          >
            Login
          </button>
          <p className="text-gray-400">
            Don't have an account?
            <Link to="/register">
              <span className="text-blue-500 hover:text-blue-600 font-semibold text-lg cursor-pointer text-center">
                Register
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
      <Footer/>
    </>
  );
};

export default Login;

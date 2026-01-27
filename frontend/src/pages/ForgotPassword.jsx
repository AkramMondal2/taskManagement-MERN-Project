import { useState } from "react";
import Nav from "../components/Nav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import api from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email is required");
    }

    try {
      const response = await api.post("/api/user/forgotPassword", {
        email,
      });

      toast.success(
        response.data?.message || "Password reset link sent to your email"
      );
      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <Nav />
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 w-4/5 md:w-1/2 lg:w-[30%] mx-auto rounded-lg shadow-lg mt-10 border border-blue-500 p-8"
      >
        <h1 className="text-center text-3xl text-blue-500 font-bold py-5">
          Forgot Password
        </h1>

        <p className="text-gray-500 text-center mb-4">
          Enter your registered email to receive a reset link
        </p>

        <label
          htmlFor="email"
          className="text-lg font-semibold text-blue-500"
        >
          Email
        </label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          name="email"
          id="email"
          className="w-full p-2 rounded my-2 border border-blue-500 outline-none"
        />

        <div className="text-center">
          <button
            type="submit"
            className="text-lg mx-auto bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white font-semibold mt-4 mb-2"
          >
            Send Reset Link
          </button>

          <p className="text-gray-400 mt-2">
            Remember your password?{" "}
            <Link to="/login">
              <span className="text-blue-500 hover:text-blue-600 font-semibold cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default ForgotPassword;

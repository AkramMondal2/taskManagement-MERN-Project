import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Nav from "../components/Nav";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import api from "../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const data = { password: "", confirmPassword: "" };
  const [inputData, setInputData] = useState(data);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = inputData;

    if (!password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      const response = await api.post(`/api/user/resetPassword/${token}`, {
        password,
      });

      toast.success(response.data?.message || "Password reset successful");
      setInputData(data);
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Reset link is invalid or expired",
      );
    } finally {
      setLoading(false);
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
          Reset Password
        </h1>

        <label
          htmlFor="password"
          className="text-lg font-semibold text-blue-500"
        >
          New Password
        </label>

        <div className="relative">
          <input
            value={inputData.password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
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

        <label
          htmlFor="confirmPassword"
          className="text-lg font-semibold text-blue-500"
        >
          Confirm Password
        </label>

        <input
          value={inputData.confirmPassword}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          className="w-full p-2 rounded my-2 border border-blue-500 outline-none"
        />

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`text-lg mx-auto py-2 px-4 rounded text-white font-semibold mt-4 mb-2 
           ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}
          `}
          >
            {loading ? "Reset Pasword..." : "Reset Password"}
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default ResetPassword;

import { useState } from "react";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer";
import api from "../api/axios";

const ResendVerification = () => {
  const [inputData, setInputData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputData.email === "") {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const response = await api.post(
        "/api/user/resendVerification",
        inputData,
      );
      setInputData({ email: "" });
      toast.success(response.data?.message || "Email send successfuly");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
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
          Resend Verification
        </h1>
        <label htmlFor="email" className="text-lg font-semibold text-blue-500">
          Email
        </label>
        <input
          value={inputData.email}
          onChange={(e) =>
            setInputData({ ...inputData, email: e.target.value })
          }
          type="email"
          placeholder="Email"
          name="email"
          id="email"
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
            {loading ? "Submiting..." : "Submit"}
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default ResendVerification;

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

const EmailVerify = () => {
  const { token } = useParams();
  const handleSubmit = async () => {
    try {
      const response = await api.post(
        "/api/user/verifymail",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data?.message || "Email verified successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-100">
      <button
        onClick={handleSubmit}
        type="button"
        className="text-lg bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white font-semibold"
      >
        Verify Your Registation
      </button>
    </div>
  );
};

export default EmailVerify;

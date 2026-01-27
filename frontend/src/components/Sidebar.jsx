import { FaWallet } from "react-icons/fa6";
import { MdOutlineLabelImportant } from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { logout } from "../features/userSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const data = [
    { menu: "All Task", icon: <FaWallet />, link: "/", id: "1" },
    {
      menu: "Important Task",
      icon: <MdOutlineLabelImportant />,
      link: "/importantTask",
      id: "2",
    },
    {
      menu: "Completed Task",
      icon: <GrCompliance />,
      link: "/completedTask",
      id: "3",
    },
    {
      menu: "Incompleted Task",
      icon: <MdOutlineIncompleteCircle />,
      link: "/inCompletedTask",
      id: "4",
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await api.post("/api/user/logout");

      toast.success(response.data?.message || "Logged out successfully!");

      localStorage.removeItem("userName");
      localStorage.removeItem("id");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      dispatch(logout());
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <div className="border-b-2 border-blue-500 pb-2">
        <h1 className="pb-2 text-lg sm:text-xl font-bold">Task Manager</h1>
        <p className="font-semibold text-lg">{userName}</p>
      </div>
      <div>
        {data.map((item) => (
          <Link to={item.link} key={item.id}>
            <li className="flex items-center gap-2 mt-4 xl:mt-6 list-none cursor-pointer font-semibold text-sm sm:text-lg lg:text-xl text-gray-700 hover:text-gray-950 transition-all duration-500">
              <span className="hidden sm:block">{item.icon}</span> {item.menu}
            </li>
          </Link>
        ))}
      </div>
      <div>
        <button
          onClick={handleLogout}
          type="button"
          className="sm:text-lg bg-blue-500 hover:bg-blue-600 py-2 w-full rounded text-white  font-semibold"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;

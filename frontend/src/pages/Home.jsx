import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Home = () => {
  
  return (
    <div className="flex h-screen gap-4 p-2 ">
      <div className="h-[99%] border-2 border-blue-800 rounded-lg p-4 w-2/6 md:w-1/5  flex flex-col justify-between">
      <Sidebar />
      </div>
      <div className="h-[99%] overflow-y-auto border-2 border-blue-800 rounded-lg p-2 sm:p-4 w-4/6 md:w-4/5"><Outlet /></div>
    </div>
  );
};

export default Home;

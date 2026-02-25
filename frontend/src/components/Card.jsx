import { FaRegEdit, FaRegHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";
import api from "../api/axios";
import {
  updateCompletedTaskStatus,
  updateImportantTaskStatus,
} from "../features/taskSlice";
import { IoIosHeart } from "react-icons/io";
import UpdateModal from "./UpdateModal";

const Card = ({ home, setAddFormModal, task }) => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [loading, setLoading] = useState({
    id: null,
    type: null,
  });

  const handleComplete = async (id) => {
    try {
      setLoading({ id, type: "complete" });
      await api.put(`/api/task/updatecompletetask/${id}`);

      dispatch(updateCompletedTaskStatus(id));
      toast.success("Updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading({ id: null, type: null });
    }
  };

  const handleImportant = async (id) => {
    try {
      setLoading({ id, type: "important" });
      await api.put(`/api/task/updateimportanttask/${id}`);
      dispatch(updateImportantTaskStatus(id));
      toast.success("Updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading({ id: null, type: null });
    }
  };

  return (
    <div className="grid  md:grid-cols-2 xl:grid-cols-3 gap-4 p-1 md:p-4">
      {task?.map((item) => (
        <div
          key={item._id}
          className="flex flex-col justify-between  border-2 border-green-500 rounded-lg p-2 md:p-5  "
        >
          <div>
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-gray-700 my-2">{item.description}</p>
          </div>
          <div className="flex flex-col-reverse sm:flex-row gap-5  sm:gap-0 items-center w-full mt-4">
            <button
              disabled={loading.id === item._id && loading.type === "complete"}
              onClick={() => handleComplete(item._id)}
              className={`${
                item.completedTask === false ? "bg-red-700" : "bg-green-700"
              }
               ${loading.id === item._id && loading.type === "complete" ? "opacity-50 cursor-not-allowed" : ""}
               text-white font-semibold p-2 rounded w-full sm:w-3/6`}
            >
              {loading.id === item._id && loading.type === "complete"
                ? "Updating..."
                : item.completedTask === false
                  ? "InCompleted"
                  : "Completed"}
            </button>
            <div className="flex justify-around w-full sm:w-3/6 text-2xl font-bold">
              <button
                disabled={
                  loading.id === item._id && loading.type === "important"
                }
                onClick={() => handleImportant(item._id)}
                className={
                  loading.id === item._id && loading.type === "important"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              >
                {item.importantTask === false ? (
                  <FaRegHeart />
                ) : (
                  <IoIosHeart className="text-red-700" />
                )}
              </button>
              <button
                onClick={() => {
                  setShowUpdateModal(true);
                  setTaskId(item._id);
                }}
              >
                <FaRegEdit />
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(true);
                  setTaskId(item._id);
                }}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      ))}
      {home && (
        <div
          onClick={() => setAddFormModal(true)}
          className="flex flex-col justify-center items-center  border-2 border-green-500 rounded-lg p-2 md:p-5  cursor-pointer text-gray-700 hover:text-gray-950 hover:bg-slate-200 transition-all duration-500 "
        >
          <IoIosAddCircle className="text-7xl" />
          <h2 className="text-2xl mt-4 font-semibold">AddTask</h2>
        </div>
      )}
      {!home && task.length === 0 && (
        <h2 className="text-2xl mt-4 font-semibold">NO Task Found</h2>
      )}
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          taskId={taskId}
          setTaskId={setTaskId}
        />
      )}
      {showUpdateModal && (
        <UpdateModal
          setShowUpdateModal={setShowUpdateModal}
          taskId={taskId}
          setTaskId={setTaskId}
        />
      )}
    </div>
  );
};

export default Card;

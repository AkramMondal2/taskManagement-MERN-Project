import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { updateTask } from "../features/taskSlice";
import api from "../api/axios";

const UpdateModal = ({ setShowUpdateModal, taskId, setTaskId }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ title: "", description: "" });
  useEffect(() => {
    getUpdatedData();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const getUpdatedData = async () => {
    try {
      const response = await api.get(`api/task/getonetask/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTask({ taskId, data })).unwrap();
      toast.success("Task updated successfully!");
      setData({ title: "", description: "" });
      setShowUpdateModal(false);
      setTaskId(null);
    } catch (err) {
      toast.error(err?.message || "Failed to add task");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 bg-gray-900 opacity-80 h-screen w-full "></div>
      <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 w-4/5 md:w-1/2 lg:w-[30%]  mx-auto rounded-lg shadow-lg mt-10 border border-blue-500 p-8 "
        >
          <div className="flex justify-end">
            <button
              onClick={() => {
                setShowUpdateModal(false);
                setTaskId(null);
              }}
              className="text-blue-500 text-2xl hover:text-blue-600"
            >
              <IoClose />
            </button>
          </div>
          <label
            htmlFor="title"
            className="text-lg font-semibold text-blue-500"
          >
            Title
          </label>
          <input
            value={data.title}
            onChange={handleChange}
            type="text"
            placeholder="Title"
            name="title"
            id="title"
            className="w-full p-2 rounded my-2 border border-blue-500 outline-none"
          />
          <label
            htmlFor="description"
            className="text-lg font-semibold text-blue-500"
          >
            Description
          </label>
          <textarea
            value={data.description}
            onChange={handleChange}
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Description"
            className="block w-full p-2 rounded my-2 border border-blue-500 outline-none"
          ></textarea>

          <div className="text-center">
            <button
              type="submit"
              className="text-lg mx-auto bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white font-semibold mt-4 "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateModal;

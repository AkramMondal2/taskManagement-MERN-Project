import React, { useEffect, useState } from "react";
import Card from "../components/Card";

import { IoIosAddCircle } from "react-icons/io";
import AddForm from "../components/AddForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask } from "../features/taskSlice";

const AllTask = () => {
  const [addFormModal, setAddFormModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  const { task } = useSelector((state) => state.task);

  return (
    <>
      <div>
        <div className="w-full flex justify-end items-center px-2 py-4 ">
          <button onClick={() => setAddFormModal(true)} className="fixed">
            <IoIosAddCircle className="text-4xl text-gray-700 hover:text-gray-950 transition-all duration-500" />
          </button>
        </div>
        <Card home={true} setAddFormModal={setAddFormModal} task={task} />
      </div>
      {addFormModal && <AddForm setAddFormModal={setAddFormModal} />}
    </>
  );
};

export default AllTask;

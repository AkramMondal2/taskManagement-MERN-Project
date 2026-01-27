import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { useEffect } from "react";
import { fetchTask } from "../features/taskSlice";

const IncompletedTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.task);

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  const InCompleteTask = tasks.filter((item) => item.completedTask === false);

  return (
    <div>
      <Card home={false} task={InCompleteTask} />
    </div>
  );
};

export default IncompletedTask;

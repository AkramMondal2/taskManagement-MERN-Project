import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { useEffect } from "react";
import { fetchTask } from "../features/taskSlice";

const CompletedTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.task);

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  const completeTask = tasks.filter((item) => item.completedTask === true);

  return (
    <div>
      <Card home={false} task={completeTask} />
    </div>
  );
};

export default CompletedTask;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask } from "../features/taskSlice";
import Card from "../components/Card";

const ImportantTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.task);

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  const importantTask = tasks.filter((item) => item.importantTask === true);

  return (
    <div>
      <Card home={false} task={importantTask} />
    </div>
  );
};

export default ImportantTask;

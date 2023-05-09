import * as React from "react";
import { api } from "~/utils/api";
import { BsPencilSquare } from "react-icons/bs";

type TasksCardProps = {
  projectId: string;
  category: string;
};

const TasksCard = (props: TasksCardProps) => {
  //get project id from props
  const { projectId, category } = props;
  //step up state for new task from input
  const [newTask, setNewTask] = React.useState("");
  //step up state for editing task name
  const [taskName, setTaskName] = React.useState("");
  const [editTaskName, setEditTaskName] = React.useState(false);
  //get existing tasks from api
  const { data: tasks, isLoading: taskUpdating } = api.tasks.getAll.useQuery({
    projectId,
  });
  const ctx = api.useContext();

  //create mutation for adding new task and upon success clear input and refetch tasks
  const { mutate: createTask } = api.tasks.create.useMutation({
    onSuccess: () => {
      setNewTask("");
      void ctx.tasks.getAll.invalidate({ projectId });
    },
  });
  const { mutate: updateTaskName } = api.tasks.update.useMutation({
    onSuccess: () => {
      void ctx.tasks.getAll.invalidate({ projectId });
    },
  });
  const { mutate: deleteTask } = api.tasks.delete.useMutation({
    onSuccess: () => {
      void ctx.tasks.getAll.invalidate({ projectId });
    },
  });

  //if tasks are loading show loading message
  if (!tasks) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-1">
      <ul className="">
        {tasks.map((task, index) => (
          <li key={task.id} className="">
            <div className="grid grid-cols-8 gap-1">
              <p className="col-span-1">{index + 1}</p>
              {!editTaskName ? (
                <h2
                  className="text-wrap overflow-wrap w-250 col-span-6 flex gap-2 text-lg font-medium text-gray-900"
                  onClick={() => {
                    setEditTaskName(true);
                  }}
                >
                  {task.taskName || "Edit task"}
                  <span className="flex items-center text-sm text-gray-600">
                    <BsPencilSquare />
                  </span>
                </h2>
              ) : (
                <form
                  className="col-span-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateTaskName({
                      id: task.id,
                      taskName: taskName,
                    });
                    setTaskName("Enter a project name");
                    setEditTaskName(false);
                  }}
                  onBlur={() => setEditTaskName(false)}
                >
                  <input
                    autoFocus
                    className="border p-1"
                    type="text"
                    placeholder={task.taskName}
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </form>
              )}
              <button
                className="col-end-9"
                onClick={() => deleteTask({ id: task.id })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <hr className="my-5" />
      <div className="flex gap-2">
        <input
          className="col-span-3 border bg-slate-200 px-2 py-2"
          type="text"
          placeholder="Enter New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          disabled={taskUpdating}
        />

        <button
          className={`col-span-2 col-end-6 w-[80px] rounded-lg border border-cyan-600 p-1 font-semibold ${
            category === "Short-Term"
              ? "text-gray-500"
              : "bg-slate-200 text-gray-900 hover:bg-gray-400"
          } no-underline transition hover:bg-cyan-500/50`}
          onClick={() => createTask({ taskName: newTask, projectId })}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TasksCard;

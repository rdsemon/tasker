import { useState } from "react";
import AddTaskModel from "./AddTaskModel";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
function TaskBoard() {
  const initailTask = {
    id: crypto.randomUUID(),
    title: "React.js",
    description:
      "React is a javascript library.I hepls us to crate beautiful Ui",
    tags: ["React.js", "Javascript", "Programming"],
    priority: "High",
    isFavourite: true,
  };
  const [task, setTask] = useState([initailTask]);
  const [showAddTaskModel, setShowAddTaskModel] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  function addNewTask(newTask, isAdd) {
    if (isAdd) {
      setTask([...task, newTask]);
    } else {
      setTask(
        task.map((taskData) => {
          return taskData.id === newTask.id ? newTask : taskData;
        }),
      );
    }
    setShowAddTaskModel(false);
  }

  function handleEditTask(updateTask) {
    setEditTask(updateTask);
    setShowAddTaskModel(true);
  }

  function handleSearch(searchTerm) {
    setSearchTerm(searchTerm);
  }

  const filteredTasks = task.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="mb-20" id="tasks">
      {showAddTaskModel && (
        <AddTaskModel
          onAddNewTask={addNewTask}
          editTask={editTask}
          onSetEditTask={setEditTask}
        />
      )}
      <div className="container">
        {/* <!-- Search Box --> */}
        <SearchTask onHandleSearch={handleSearch} />
        {/* <!-- Search Box Ends --> */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction onShowAddTaskModel={setShowAddTaskModel} />
          <TaskList tasks={filteredTasks} onEditTask={handleEditTask} />
        </div>
      </div>
    </section>
  );
}

export default TaskBoard;

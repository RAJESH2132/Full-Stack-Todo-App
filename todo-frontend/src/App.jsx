import axios from "axios";
import { useEffect, useState } from "react";

function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [editableId, setEditedId] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");

  // Helper function to format dates for `datetime-local` input
  const formatDateForDatetimeLocal = (dateString) => {
    // Ensure proper format `yyyy-MM-ddThh:mm` for `datetime-local`
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Remove `Z` and extra parts
  };

  const fetchTasks = () => {
    axios
      .get("http://localhost:5000/tasks/getTodoList")
      .then((result) => {
        setTodoList(result.data);
      })
      .catch((err) => console.log(err));
  };

  const AddTask = (e) => {
    if (!newTask || !newStatus || !newDeadline) {
      alert("Every field should be filled");
      return;
    }

    e.preventDefault();
    const data = {
      task: newTask,
      status: newStatus,
      deadline: newDeadline,
    };
    axios
      .post("http://localhost:5000/tasks/addTodoList", data)
      .then(() => {
        fetchTasks();
        setNewTask("");
        setNewStatus("");
        setNewDeadline("");
      })
      .catch((err) => console.log(err));
  };

  const DeleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/deleteTodoList/${id}`)
      .then(() => {
        alert("The task deleted Successfully");
        fetchTasks();
      })
      .catch((err) => console.log(err));
  };

  const toggleEditable = (id) => {
    const rowData = todoList.find((data) => data._id === id);
    if (rowData) {
      setEditedId(id);
      setEditedTask(rowData.task);
      setEditedStatus(rowData.status);
      // Format the date for `datetime-local`
      setEditedDeadline(formatDateForDatetimeLocal(rowData.deadline));
    } else {
      setEditedId(null);
      setEditedTask("");
      setEditedStatus("");
      setEditedDeadline("");
    }
  };

  const saveEditedTask = (id) => {
    const editedData = {
      task: editedTask,
      status: editedStatus,
      deadline: editedDeadline,
    };

    if (!editedTask || !editedStatus || !editedDeadline) {
      alert("All fields must be filled out.");
      return;
    }

    axios
      .put(`http://127.0.0.1:5000/tasks/updateTodoList/${id}`, editedData)
      .then(() => {
        setEditedId(null);
        setEditedTask("");
        setEditedStatus("");
        setEditedDeadline("");
        fetchTasks();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <div className="flex flex-wrap">
        <div className="w-full p-4 md:w-7/12">
          <h2 className="text-2xl font-semibold text-center">Todo List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-blue-100 ">
                <tr>
                  <th className="px-4 py-2 ">Task</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Deadline</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>

              {Array.isArray(todoList) ? (
                <tbody>
                  {todoList.map((data) => (
                    <tr key={data._id}>
                      <td className="px-4 py-2 border">
                        {editableId === data._id ? (
                          <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                          />
                        ) : (
                          data.task
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        {editableId === data._id ? (
                          <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                          />
                        ) : (
                          data.status
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        {editableId === data._id ? (
                          <input
                            type="datetime-local"
                            className="w-full p-2 border rounded"
                            value={editedDeadline}
                            onChange={(e) => setEditedDeadline(e.target.value)}
                          />
                        ) : data.deadline ? (
                          new Date(data.deadline).toLocaleString()
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="flex flex-wrap items-center justify-center gap-2 px-4 py-2 border">
                        {editableId === data._id ? (
                          <button
                            className="px-4 py-1 text-white bg-green-500 rounded"
                            onClick={() => saveEditedTask(data._id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="px-4 py-1 text-white bg-blue-500 rounded"
                            onClick={() => toggleEditable(data._id)}
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => DeleteTask(data._id)}
                          className="px-4 py-1 ml-2 text-white bg-red-500 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="4">Loading products...</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
        <div className="w-full p-4 md:w-5/12">
          <h2 className="text-2xl font-semibold text-center">Add Task</h2>
          <form className="p-4 bg-gray-100 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-sm font-medium">Task</label>
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Enter Task"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Status</label>
              <input
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-2 border rounded"
                type="text"
                placeholder="Enter Status"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Deadline</label>
              <input
                value={newDeadline}
                onChange={(e) =>
                  setNewDeadline(formatDateForDatetimeLocal(e.target.value))
                }
                className="w-full p-2 border rounded"
                type="datetime-local"
              />
            </div>
            <button
              onClick={AddTask}
              className="px-4 py-2 text-white bg-green-500 rounded"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Todo;

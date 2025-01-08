// function Todo() {
//   const [todoList, setTodoList] = useState([]);
//   const [editableId, setEditableId] = useState(null);
//   const [editedTask, setEditedTask] = useState("");
//   const [editedStatus, setEditedStatus] = useState("");
//   const [newTask, setNewTask] = useState("");
//   const [newStatus, setNewStatus] = useState("");
//   const [newDeadline, setNewDeadline] = useState("");
//   const [editedDeadline, setEditedDeadline] = useState("");

//   // Fetch tasks from database
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:5000/tasks/getTodoList")
//       .then((result) => {
//         setTodoList(result.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   // Function to toggle the editable state for a specific row
//   const toggleEditable = (id) => {
//     const rowData = todoList.find((data) => data._id === id);
//     if (rowData) {
//       setEditableId(id);
//       setEditedTask(rowData.task);
//       setEditedStatus(rowData.status);
//       setEditedDeadline(rowData.deadline || "");
//     } else {
//       setEditableId(null);
//       setEditedTask("");
//       setEditedStatus("");
//       setEditedDeadline("");
//     }
//   };

//   // Function to add task to the database
//   const addTask = (e) => {
//     e.preventDefault();
//     if (!newTask || !newStatus || !newDeadline) {
//       alert("All fields must be filled out.");
//       return;
//     }

//     axios
//       .post("http://127.0.0.1:5000/tasks/addTodoList", {
//         task: newTask,
//         status: newStatus,
//         deadline: newDeadline,
//       })
//       .then((res) => {
//         console.log(res);
//         window.location.reload();
//       })
//       .catch((err) => console.log(err));
//   };

//   // Function to save edited data to the database
//   const saveEditedTask = (id) => {
//     const editedData = {
//       task: editedTask,
//       status: editedStatus,
//       deadline: editedDeadline,
//     };

//     // If the fields are empty
//     if (!editedTask || !editedStatus || !editedDeadline) {
//       alert("All fields must be filled out.");
//       return;
//     }

//     // Updating edited data to the database through updateById API
//     axios
//       .put("http://127.0.0.1:5000/tasks/updateTodoList/" + id, editedData)
//       .then((result) => {
//         console.log(result);
//         setEditableId(null);
//         setEditedTask("");
//         setEditedStatus("");
//         setEditedDeadline(""); // Clear the edited deadline
//         window.location.reload();
//       })
//       .catch((err) => console.log(err));
//   };

//   // Delete task from database
//   const deleteTask = (id) => {
//     axios
//       .delete("http://127.0.0.1:5000/tasks/deleteTodoList/" + id)
//       .then((result) => {
//         console.log(result);
//         window.location.reload();
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="container mx-auto mt-5">
//       <div className="flex flex-wrap">
//         <div className="w-full p-4 md:w-7/12">
//           <h2 className="text-2xl font-semibold text-center">Todo List</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto">
//               <thead className="bg-blue-100 border-2 border-black">
//                 <tr>
//                   <th className="px-4 py-2 ">Task</th>
//                   <th className="px-4 py-2">Status</th>
//                   <th className="px-4 py-2">Deadline</th>
//                   <th className="px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               {Array.isArray(todoList) ? (
//                 <tbody>
//                   {todoList.map((data) => (
//                     <tr key={data._id}>
//                       <td className="px-4 py-2 border">
//                         {editableId === data._id ? (
//                           <input
//                             type="text"
//                             className="w-full p-2 border rounded"
//                             value={editedTask}
//                             onChange={(e) => setEditedTask(e.target.value)}
//                           />
//                         ) : (
//                           data.task
//                         )}
//                       </td>
//                       <td className="px-4 py-2 border">
//                         {editableId === data._id ? (
//                           <input
//                             type="text"
//                             className="w-full p-2 border rounded"
//                             value={editedStatus}
//                             onChange={(e) => setEditedStatus(e.target.value)}
//                           />
//                         ) : (
//                           data.status
//                         )}
//                       </td>
//                       <td className="px-4 py-2 border">
//                         {editableId === data._id ? (
//                           <input
//                             type="datetime-local"
//                             className="w-full p-2 border rounded"
//                             value={editedDeadline}
//                             onChange={(e) => setEditedDeadline(e.target.value)}
//                           />
//                         ) : data.deadline ? (
//                           new Date(data.deadline).toLocaleString()
//                         ) : (
//                           ""
//                         )}
//                       </td>

//                       <td className="flex flex-wrap items-center justify-center gap-2 px-4 py-2 border">
//                         {editableId === data._id ? (
//                           <button
//                             className="px-4 py-1 text-white bg-green-500 rounded"
//                             onClick={() => saveEditedTask(data._id)}
//                           >
//                             Save
//                           </button>
//                         ) : (
//                           <button
//                             className="px-4 py-1 text-white bg-blue-500 rounded"
//                             onClick={() => toggleEditable(data._id)}
//                           >
//                             Edit
//                           </button>
//                         )}
//                         <button
//                           className="px-4 py-1 ml-2 text-white bg-red-500 rounded"
//                           onClick={() => deleteTask(data._id)}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               ) : (
//                 <tbody>
//                   <tr>
//                     <td colSpan="4" className="py-2 text-center">
//                       Loading products...
//                     </td>
//                   </tr>
//                 </tbody>
//               )}
//             </table>
//           </div>
//         </div>
//         <div className="w-full p-4 md:w-5/12">
//           <h2 className="text-2xl font-semibold text-center">Add Task</h2>
//           <form className="p-4 bg-gray-100 rounded-lg shadow-md">
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Task</label>
//               <input
//                 className="w-full p-2 border rounded"
//                 type="text"
//                 placeholder="Enter Task"
//                 onChange={(e) => setNewTask(e.target.value)}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Status</label>
//               <input
//                 className="w-full p-2 border rounded"
//                 type="text"
//                 placeholder="Enter Status"
//                 onChange={(e) => setNewStatus(e.target.value)}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">Deadline</label>
//               <input
//                 className="w-full p-2 border rounded"
//                 type="datetime-local"
//                 onChange={(e) => setNewDeadline(e.target.value)}
//               />
//             </div>
//             <button
//               onClick={addTask}
//               className="px-4 py-2 text-white bg-green-500 rounded"
//             >
//               Add Task
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Todo;

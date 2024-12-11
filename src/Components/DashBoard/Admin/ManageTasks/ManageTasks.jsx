import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UseAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

export const ManageTasks = () => {
  const axiosSecure = UseAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks from the server
  const { data: tasks = [], refetch, isLoading } = useQuery({
    queryKey: ["TaskItems"],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get("/TaskItems");
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  // Handle delete task
  const handleDelete = (taskId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/TaskItems/${taskId}`);
          if (response.status === 200) {
            Swal.fire("Deleted!", "The task has been deleted.", "success");
            refetch(); // Refresh tasks
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Failed to delete the task.", "error");
        }
      }
    });
  };

  // Handle see details
  const handleSeeDetails = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  // Loader component
  const Loader = () => (
    <div className="flex justify-center items-center py-10">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="font-bold mb-4 text-center text-3xl text-blue-600 font1">
        Tasks: {tasks.length}
      </h1>
      {isLoading ? (
        <Loader /> // Show loader while loading tasks
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-xl">
                <th className="border border-gray-300 px-4 py-2 text-left font1">#</th>
                <th className="border border-gray-300 px-4 py-2 text-left font1">Task Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left font1">
                  Payable Amount
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left font1">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left font1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.payableAmount}$</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.UserEmail || "No Email available"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleSeeDetails(task)}
                      className="px-3 font1 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      See Details
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="px-3 font1 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for showing task details */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg w-96 p-8 transition-all transform scale-95 hover:scale-100">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">{selectedTask.title}</h2>
            <p className="mb-2 text-gray-700">
              <strong className="text-blue-600">Payable Amount:</strong> {selectedTask.payableAmount}$
            </p>
            <p className="mb-2 text-gray-700">
              <strong className="text-blue-600">Email:</strong> {selectedTask.UserEmail || "No Email available"}
            </p>
            <p className="mb-4 text-gray-700">
              <strong className="text-blue-600">Description:</strong> {selectedTask.description || "No Description provided"}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-gray-800 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

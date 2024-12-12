import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UseAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { UseAuth } from "../../../../Hooks/useAuth";

export const TaskReview = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient(); // Access the query client to invalidate queries
  const { user } = UseAuth();
  const email = user.email;

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["TaskItems"],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get("/TaskItems");
        return response.data;
      } catch (error) {
        console.error("Error fetching task review:", error);
        throw error;
      }
    },
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-xl font-semibold text-red-500">
          Error fetching task reviews: {error.message}
        </h1>
      </div>
    );
  }

  const handleApprove = async (id, email) => {
    console.log("Email:", email); // Debugging to ensure the email is being passed
    console.log("Task ID:", id);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        queryClient.setQueryData(["TaskItems"], (oldData) =>
          oldData.map((task) =>
            task._id === id ? { ...task, status: "approved" } : task
          )
        );

        // Update the task status to approved on the server
        await axiosSecure.patch(`/TaskItems/${id}`, { status: "approved" });

        // Update the user's coins
        await axiosSecure.patch(`/users/${email}`);

        console.log("Task approved and coins updated successfully");

        queryClient.invalidateQueries("TaskItems");

        Swal.fire(
          "Approved!",
          "The task has been approved and the coins have been updated.",
          "success"
        );
      } catch (error) {
        console.error("Error approving task:", error);
        Swal.fire(
          "Error!",
          "There was an issue approving the task and updating coins.",
          "error"
        );
      }
    } else {
      Swal.fire("Cancelled", "The task approval was cancelled.", "info");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center font1 font-bold text-blue-500 mb-4">
        Task Review ({data.length})
      </h1>

      {/* Table View for larger screens */}
      <div className="overflow-x-auto rounded-lg shadow-md hidden sm:block">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gradient-to-r text-white from-purple-600 via-indigo-600 to-blue-600">
            <tr>
              <th className="p-3 text-left ">#</th>
              <th className="p-3 text-left text-xl font1">Name</th>
              <th className="p-3 text-left text-xl font1">Details</th>
              <th className="p-3 text-xl font1 text-left ">Status</th>
              <th className="p-3 text-center text-xl font1">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((task, index) => (
              <tr
                key={task.id || index}
                className="hover:bg-gray-50 border-b border-gray-200"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={task.avatar || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                          alt={`Avatar for ${task.name || `Task ${index + 1}`}`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{task.title || `Task ${index + 1}`}</div>
                      <div className="text-sm text-gray-500">{task.UserName || "Unknown Name"}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  {task.payableAmount || "Unknown Amount"}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {task.UserEmail || "Unknown Email"}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      task.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {task.status || "Unknown"}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {task.status === "Pending" ? (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleApprove(task._id, task.UserEmail)}
                    >
                      Approve
                    </button>
                  ) : (
                    <span className="text-sm text-green-500 font-semibold">Already Approved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View for mobile devices */}
      <div className="sm:hidden">
        {data.map((task, index) => (
          <div
            key={task.id || index}
            className="bg-white shadow-md rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-lg text-gray-800">{task.title || `Task ${index + 1}`}</h2>
              <span className="text-gray-500">{task.payableAmount || "Unknown Amount"}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">User: {task.UserName || "Unknown Name"}</p>
            <p className="text-sm text-gray-600 mt-2">Expire Date: {new Date(task.completionDate).toLocaleDateString()}</p>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                task.status === "Pending"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {task.status || "Unknown"}
            </span>
            <div className="mt-3 text-center">
              {task.status === "Pending" ? (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleApprove(task._id, task.UserEmail)}
                >
                  Approve
                </button>
              ) : (
                <span className="text-sm text-green-500 font-semibold">Already Approved</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { Link, useLoaderData } from "react-router-dom";

export const Details = () => {
  
  // Get task details from loader
  const taskDetails = useLoaderData();
  console.log('task details',taskDetails);

  // Check if data is fetched
  if (!taskDetails) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-center text-gray-800 font1 text-4xl mb-8">Task Details</h1>

      <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-3xl font1"><span >Tittle : </span>{taskDetails.title}</h2>

        {/* Payable Amount */}
        <div className="flex items-center text-lg font-medium text-gray-700 mb-4">
          <span className="mr-2 text-xl text-green-600">💵</span>
          <span>
            <strong>Payable Amount:</strong> ${taskDetails.payableAmount}
          </span>
        </div>

        {/* Expire Date */}
        <div className="flex items-center text-lg text-gray-700 mb-4">
          <span className="mr-2 text-xl text-indigo-600">⏳</span>
          <span>
            <strong>Expire Date:</strong> {new Date(taskDetails.completionDate).toLocaleDateString()}
          </span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-800 mb-2 font1">Description : </h3>
          <p className="text-gray-700 text-lg">{taskDetails.detail || "No description provided"}</p>
        </div>

        {/* Quantity */}
        <div className="flex items-center text-lg text-gray-700 mb-4">
          <span className="mr-2 text-xl text-orange-600">🔢</span>
          <span>
            <strong>Quantity:</strong> {taskDetails.quantity}
          </span>
        </div>

        {/* Submission Info */}
        <div className="flex items-center text-lg text-gray-700 mb-4">
          <span className="mr-2 text-xl text-blue-600">📝</span>
          <span>
            <strong>Submission Info:</strong> {taskDetails.submissionInfo}
          </span>
        </div>

        {/* User Information */}
        <div className="mb-6">
          <h3 className="text-xl font-medium text-gray-800 mb-2">User Information</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>User Email:</strong> {taskDetails.UserEmail}
          </p>
          <p className="text-lg text-gray-700">
            <strong>User Name:</strong> {taskDetails.UserName}
          </p>
        </div>

        {/* Image */}
        {taskDetails.imageUrl && (
          <div className="mb-6">
            <img
              src={taskDetails.imageUrl}
              alt={taskDetails.title}
              className="w-full h-72 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Back Button */}
        <div className="text-center">
          <Link
            to="/dashboard/workers/allTaskList"
            className="text-blue-600 hover:underline text-lg font-medium"
          >
            ⬅️ Back to Task List
          </Link>
        </div>
      </div>
    </div>
  );
};

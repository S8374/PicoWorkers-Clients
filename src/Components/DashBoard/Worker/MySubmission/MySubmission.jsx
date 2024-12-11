import { useEffect, useState } from 'react';
import { UseAuth } from '../../../../Hooks/useAuth';
import { UseAxiosSecure } from '../../../../Hooks/useAxiosSecure';

export const MySubmission = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      console.log('User email:', user.email);
      axiosSecure.get(`/TaskItems`)
        .then((response) => {
          console.log('Fetched tasks:', response.data);
          const matchedData = response.data.filter(
            (task) => task.UserEmail?.toLowerCase() === user.email.toLowerCase()
          );
          setFilteredData(matchedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user tasks:", error);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  // Helper function to determine button color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'approved':
        return 'bg-green-500 text-white';
      case 'rejected':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800 font1">My Submissions</h1>
      
      {/* Loader using DaisyUI spinner */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-dashed border-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          {filteredData.length === 0 ? (
            <p className="text-center text-gray-500">No tasks found for your account.</p>
          ) : (
            <table className="table-auto w-full text-sm text-left text-gray-700 border-separate border-spacing-0">
              <thead className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
                <tr>
                  <th className="p-4 font1">Title</th>
                  <th className="p-4 font1 ">Quantity</th>
                  <th className="p-4 font1">Payable Amount</th>
                  <th className="p-4 font1">Completion Date</th>
                  <th className="p-4 font1">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-100 transition-all">
                    <td className="p-4 border-b font1">{task.title}</td>
                    <td className="p-4 border-b font1">{task.quantity}</td>
                    <td className="p-4 border-b font1">{task.payableAmount}$</td>
                    <td className="p-4 border-b font1">{task.completionDate}</td>
                    <td className="p-4 border-b">
                      <button className={`px-3 py-1 rounded-lg text-xl font1 font-semibold ${getStatusColor(task.status)}`}>
                        {task.status === 'pending' ? 'Pending Approval' : task.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

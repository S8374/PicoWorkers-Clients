import { UseAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { useEffect, useState } from "react";

export const WithdrawRequest = () => {
  const axiosSecure = UseAxiosSecure();
  const [withdrawData, setWithdrawData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axiosSecure
      .get("/withDraw")
      .then((response) => {
        setWithdrawData(response.data); // Assuming response.data is an array of objects
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching withdrawal requests:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [axiosSecure]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Withdrawal Requests</h2>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : withdrawData.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gradient-to-r font1 from-purple-600 via-indigo-600 to-blue-600 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {withdrawData.map((item) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2">{item._id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.userId}</td>
                <td className="border border-gray-300 px-4 py-2">${item.amount}</td>
                <td className="border border-gray-300 px-4 py-2 capitalize">
                  {item.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="px-3 py-1 font1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Approved
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No withdrawal requests found.</p>
      )}
    </div>
  );
};

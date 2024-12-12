import { useQuery } from "@tanstack/react-query";
import { UseAxiosSecure } from "../../../../Hooks/useAxiosSecure";

export const PaymentHistory = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get("/payments");
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }, // fetcher function to fetch the data from the server
  });

  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center font1">Payment History ({payments.length})</h1>

      {/* Table (Hidden on mobile) */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg hidden md:block">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gradient-to-r text-white from-purple-600 via-indigo-600 to-blue-600">
              <th className="border font1 border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border font1 border-gray-300 px-4 py-2 text-left">User Name</th>
              <th className="border font1 border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border font1 border-gray-300 px-4 py-2 text-left">Payment Amount</th>
              <th className="border font1 border-gray-300 px-4 py-2 text-left">Buying Time</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((coin, index) => (
              <tr key={coin._id} className="hover:bg-gray-50">
                <td className="border font1 border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border font1 border-gray-300 px-4 py-2">{coin.name}</td>
                <td className="border font1 border-gray-300 px-4 py-2">{coin.email}</td>
                <td className="border font1 border-gray-300 px-4 py-2">
                  {coin.coinPrice || "No Amount Available"}
                </td>
                <td className="border font1 border-gray-300 px-4 py-2">
                  {coin.timestamp ? formatTimestamp(coin.timestamp) : "No Time Available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Visible on mobile) */}
      <div className="block md:hidden">
        {payments.map((coin, index) => (
          <div key={coin._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between">
              <span className="font-bold text-gray-800 text-lg">{coin.name}</span>
              <span className="text-gray-500 text-sm">{formatTimestamp(coin.timestamp)}</span>
            </div>
            <div className="text-sm text-gray-600">{coin.email}</div>
            <div className="mt-2 text-lg font-semibold">
              {coin.coinPrice || "No Amount Available"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

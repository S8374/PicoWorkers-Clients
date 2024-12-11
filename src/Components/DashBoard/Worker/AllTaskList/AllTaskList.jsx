import { useQuery } from "@tanstack/react-query";
import { UseAxiosPublic } from "../../../../Hooks/useAxiosPublic";
import React from "react";
import { Link } from "react-router-dom";

export const AllTaskList = () => {
  const axiosPublic = UseAxiosPublic();

  const { data: taskItems = [], isLoading } = useQuery({
    queryKey: ["TaskItems"],
    queryFn: async () => {
      const res = await axiosPublic.get("/TaskItems");
      return res.data; // Return fetched data
    },
  });

  // Filter out tasks that have status "pending"
  const filteredTaskItems = taskItems.filter(item => item.status !== "pending");

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800 font1">Task List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
          {/* Table Head */}
          <thead className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600   text-white text-sm">
            <tr>
              <th className="p-3 text-left font1">#</th>
              <th className="p-3 text-left font1">Task Title</th>
              <th className="p-3 text-left font1">Payable Amount</th>
              <th className="p-3 text-left font1">Expire Date</th>
              <th className="p-3 text-center font1">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="p-5 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-gray-200 border-t-blue-500 rounded-full"></div>
                    <span className="text-gray-500">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : filteredTaskItems.length > 0 ? (
              filteredTaskItems.map((item, index) => (
                <tr
                  key={item._id}
                  className={`border-t border-gray-200 text-sm ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="p-3 text-gray-800">{index + 1}</td>
                  <td className="p-3 text-gray-800 font-medium font1">{item.title}</td>
                  <td className="p-3 text-gray-800 font1">${item.payableAmount}</td>
                  <td className="p-3 text-gray-800 font1">
                    {new Date(item.completionDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-center">
                    <Link
                      to={`/dashboard/workers/details/${item._id}`} // Ensure the URL is correctly structured with task ID
                      className="bg-blue-600 font1 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 focus:outline-none"
                    >
                      See Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-5 text-center text-gray-500">
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

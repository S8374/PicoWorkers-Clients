import { UseUsers } from "../../../../../Hooks/useUsers";
import { useState } from "react";

export const TopEarnUsers = () => {
  const [users] = UseUsers();

  // Filter top users based on the coin condition
  const topUsers = users.filter(user => user.coins > 20);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6; // Number of users to show per page
  const totalPages = Math.ceil(topUsers.length / usersPerPage);

  // Get users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = topUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
        <p className="inline-block mb-4 font-semibold tracking-wider text-3xl uppercase rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-6 py-2 font1 text-white">
          Top Workers
        </p>
        <p className="font2 text-2xl text-white md:text-xl">
          Recognizing the best performers who have earned more than 20 coins.
        </p>
      </div>
      <div className="grid gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-3 lg:max-w-screen-lg">
        {currentUsers.length > 0 ? (
          currentUsers.map(user => (
            <div key={user.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl">
              <div className="relative pb-56 mb-4 rounded-lg overflow-hidden">
                <img
                  className="absolute object-cover w-full h-full rounded-lg"
                  src={user.photoUrl || "https://via.placeholder.com/150"} // Default image if none exists
                  alt={user.name}
                />
              </div>
              <div className="px-6 py-4">
                <p className="text-2xl font-semibold text-gray-800">{user.name}</p>
                <p className="mb-2 text-xl font-semibold text-red-500">{user.role || "Top Performer"}</p>
                <p className="mb-5 text-sm text-gray-600">Coins: {user.coins}</p>
                <div className="flex items-center space-x-3 sm:justify-center">
                  <a
                    href={user.twitter || "/"}
                    className="text-gray-600 transition-colors duration-300 hover:text-blue-500"
                  >
                    {/* Twitter Icon */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                      <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6-0.1-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                    </svg>
                  </a>
                  <a
                    href={user.facebook || "/"}
                    className="text-gray-600 transition-colors duration-300 hover:text-blue-500"
                  >
                    {/* Facebook Icon */}
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                      <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No top workers found.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 text-sm font-medium ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-full transition-colors duration-300 hover:bg-blue-400 hover:text-white`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

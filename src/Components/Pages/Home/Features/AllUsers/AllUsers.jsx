import { useState } from "react";
import { UseUsers } from "../../../../../Hooks/useUsers";

export const AllUsers = () => {
  const [users] = UseUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
         
          <h2 className="max-w-lg rounded-lg mb-6 font1 text-3xl font-bold leading-none tracking-tight py-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white sm:text-5xl md:mx-auto">
            All Users (Page {currentPage} of {totalPages})
          </h2>
          <p className="text-base text-white md:text-lg">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque rem aperiam, eaque ipsa quae.
          </p>
        </div>

        {/* User Grid */}
        <div className="grid gap-10 row-gap-8 mx-auto sm:row-gap-10 lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3">
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-center">
                <div className="flex items-center p-4 bg-white rounded-lg shadow-lg">
                  <img
                    className="object-cover w-20 h-20 mr-4 rounded-full shadow"
                    src={user.photoUrl || "https://via.placeholder.com/150"}
                    alt={user.name}
                  />
                  <div className="flex flex-col justify-center">
                    <p className="text-lg font1">{user.name}</p>
                    <p className="text-sm text-red-800">{user.role || "Role"}</p>
                    <p className="text-sm text-gray-600">Coins: {user.coins}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No users found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav aria-label="Pagination">
            <ul className="inline-flex items-center space-x-4">
              <li>
                <button
                  onClick={() => handlePagination(currentPage - 1)}
                  className="px-4 py-2 text-gray-500 bg-white border rounded-md shadow-sm hover:bg-gray-100 disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
              </li>
              {[...Array(totalPages).keys()].map((number) => (
                <li key={number}>
                  <button
                    onClick={() => handlePagination(number + 1)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      currentPage === number + 1
                        ? "bg-teal-600 text-white"
                        : "bg-white text-gray-700 hover:bg-teal-100"
                    }`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePagination(currentPage + 1)}
                  className="px-4 py-2 text-gray-500 bg-white border rounded-md shadow-sm hover:bg-gray-100 disabled:opacity-50"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

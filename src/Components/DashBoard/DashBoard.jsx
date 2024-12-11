import { useState } from "react";
import { UseAdmin } from "../../Hooks/UsersCategoryHooks/useAdmin";
import { UseUsers } from "../../Hooks/useUsers";
import { UseAuth } from "../../Hooks/useAuth";
import { TaskCreator } from "./TaskCreator/TaskCreator/TaskCreator";
import { Admin } from "./Admin/Admin/Admin";
import { Outlet, Navigate } from "react-router-dom";
import { Workers } from "./Worker/Workers/Workers";
import { NavBarLogo } from "../Pages/Home/Header/NavBarLogo/NavBarLogo";

export const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading: userLoading } = UseAuth();
  const [users, usersLoading] = UseUsers();
  const [isAdmin, isAdminLoading] = UseAdmin();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Redirect to login if the user is not authenticated
  if (!user && !userLoading) {
    return <Navigate to="/" replace />;
  }

  if (userLoading || usersLoading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const userCategory =
    users?.find((u) => u?.email?.toLowerCase() === user?.email?.toLowerCase())?.userCategory || "Unknown";

  const renderSidebarContent = () => {
    if (isAdmin?.admin) return <Admin />;
    switch (userCategory) {
      case "Worker":
        return <Workers />;
      case "TaskCreator":
        return <TaskCreator />;
      default:
        return <div className="text-center text-gray-600">No role assigned</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-md hover:bg-blue-500 lg:hidden"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <h1 
            onClick={() => window.location.href = '/'}
          className="text-4xl cursor-pointer flex text-center font1">
            <NavBarLogo></NavBarLogo> PicoWorkers


            Dashboard</h1>
        </div>
        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
          <span className="text-white font-semibold">{user?.displayName || "User"}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div
          className={`${isSidebarOpen ? "block" : "hidden"
            } lg:block w-64 bg-gradient-to-b from-indigo-600 to-blue-600 text-white shadow-lg transition-all duration-300`}
        >
          <nav>
            <ul className="space-y-4 px-6 py-4">
              {renderSidebarContent()}
            </ul>
          </nav>
        </div>

        {/* Dashboard Content Area */}
        <div className="flex-grow bg-white shadow-lg rounded-lg p-8 m-4">
          <Outlet />
        </div>
      </div>

      {/* Go Home Button */}

      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md  text-2xl  hover:bg-blue-700 transition duration-300 font1"
        >
          Go Home
        </button>
      </div>

    </div>
  );
};

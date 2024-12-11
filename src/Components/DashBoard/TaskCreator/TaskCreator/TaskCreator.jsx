import { ImIndentIncrease } from "react-icons/im";
import { MdOutlinePreview, MdPayments } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { RiScissorsFill } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";

export const TaskCreator = () => {
    const location = useLocation();

    return (
        <div className="flex justify-center items-start bg-gray-100 min-h-screen py-8 px-4">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-indigo-600 text-white p-6">
                    <h2 className="text-2xl font1 flex items-center font-bold">
                        <ImIndentIncrease className="mr-2" /> Task Creator
                    </h2>
                </div>
                <div className="p-6 space-y-6">
                    <NavLink
                        to="/dashboard/taskReview"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 hover:text-indigo-600 ${isActive || location.pathname === "/dashboard/taskReview" ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100'}`
                        }
                    >
                        <MdOutlinePreview className="text-3xl mr-3" />
                        <span className="text-lg  font1 font-medium">Task To Review</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/addTask"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 hover:text-indigo-600 ${isActive || location.pathname === "/dashboard/addTask" ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100'}`
                        }
                    >
                        <IoMdAddCircle className="text-3xl mr-3" />
                        <span className="text-lg font-medium font1">Add New Tasks</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/paymentHistory"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 hover:text-indigo-600 ${isActive || location.pathname === "/dashboard/paymentHistory" ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100'}`
                        }
                    >
                        <MdPayments className="text-3xl mr-3" />
                        <span className="text-lg font1 font-medium">Payment History</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/buyCoins"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 hover:text-indigo-600 ${isActive || location.pathname === "/dashboard/buyCoins" ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100'}`
                        }
                    >
                        <RiScissorsFill className="text-3xl mr-3" />
                        <span className="text-lg  font1 font-medium">Buy Coins</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

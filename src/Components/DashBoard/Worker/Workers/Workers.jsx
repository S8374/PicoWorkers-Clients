import { FaChartBar, FaCoins, FaTasks, FaPlusCircle, FaMoneyBillWave } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const Workers = () => {
    return (
        <div className="flex justify-center items-start bg-gray-100 min-h-screen py-8 px-4">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-indigo-600 text-white p-6">
                    <h2 className="text-3xl font-bold font1">Workers</h2>
                </div>
                <div className="p-6 space-y-6">
                    <NavLink
                        to="/dashboard/workers/WithDrawal"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 hover:text-indigo-600 ${isActive ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100'}`
                        }
                    >
                        <FaMoneyBillWave className="text-2xl mr-3" />
                        <span className="text-lg font-medium font1">WithDrawal Money</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/workers/buyCoins"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 hover:text-indigo-600 ${isActive ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100'}`
                        }
                    >
                        <FaCoins className="text-2xl mr-3" />
                        <span className="text-lg font-medium font1">Buy Coins</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/workers/mySubmissions"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 hover:text-indigo-600 ${isActive ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100'}`
                        }
                    >
                        <FaChartBar className="text-2xl mr-3" />
                        <span className="text-lg font-medium font1">My Submissions</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/workers/allTaskList"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 hover:text-indigo-600 ${isActive ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100'}`
                        }
                    >
                        <FaTasks className="text-2xl mr-3" />
                        <span className="text-lg font-medium font1">Task List</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/workers/addMyPost"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 hover:text-indigo-600 ${isActive ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100'}`
                        }
                    >
                        <FaPlusCircle className="text-2xl mr-3" />
                        <span className="text-lg font-medium font1">Add Post</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

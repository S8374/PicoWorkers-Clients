import { FaChartBar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const Admin = () => {
    return (
        <div className="flex justify-center items-start bg-gray-100 min-h-screen py-8 px-4">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-indigo-600 text-white p-6">
                    <h2 className="text-2xl font1 font-bold">Admin</h2>
                </div>
                <div className="p-6 space-y-6">
                    <NavLink
                        to="/dashboard/admin/WithdrawRequest"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 ${isActive ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100 hover:text-indigo-600'}`
                        }
                    >
                        <FaChartBar className="text-2xl mr-3" />
                        <span className="text-lg font-medium font1">Withdraw Request</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/manageUsers"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 ${isActive ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100 hover:text-indigo-600'}`
                        }
                    >
                        <FaChartBar className="text-2xl mr-3" />
                        <span className="text-lg font-medium font1">Manage Users</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/manageTask"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 ${isActive ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100 hover:text-indigo-600'}`
                        }
                    >
                        <FaChartBar className="text-2xl mr-3" />
                        <span className="text-lg font-medium font1">Manage Tasks</span>
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/sellCoins"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 ${isActive ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100 hover:text-indigo-600'}`
                        }
                    >
                        <FaChartBar className="text-2xl mr-3" />
                        <span className="text-lg font-medium font1">Sell Coins</span>
                    </NavLink>
                    {/* <NavLink
                        to="/dashboard/admin/buyCoins"
                        className={({ isActive }) =>
                            `flex items-center py-3 px-4 rounded-lg transition duration-200 text-gray-700 ${isActive ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white' : 'hover:bg-indigo-100 hover:text-indigo-600'}`
                        }
                    >
                        <FaChartBar className="text-2xl mr-3" />
                        <span className="text-lg font-medium font1">Coins Buyers</span>
                    </NavLink> */}
                </div>
            </div>
        </div>
    );
};

import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { FaCoins } from "react-icons/fa";
import { UseAuth } from "../../../../Hooks/useAuth";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { UseUsers } from "../../../../Hooks/useUsers";
import { UseAxiosSecure } from "../../../../Hooks/useAxiosSecure";

export const UserProfile = () => {
    const { user, logOut } = UseAuth();
    const [users, loading, refetch] = UseUsers();
    const axiosSecure = UseAxiosSecure();

    // Find the user profile safely
    const userProfile = users?.find((u) => u.email === user?.email) || {};
    console.log(userProfile);

    // Get the user role or default to 'User Category'
    const userRole = userProfile?.role || "User Category";
    const userCategory = userProfile?.userCategory || "Unknown"; // Default if userCategory is missing

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out!",
        });

        if (result.isConfirmed) {
            await logOut();
            Swal.fire({
                title: "Logged out!",
                text: "You have been logged out successfully.",
                icon: "success",
            });
            refetch();
        }
    };

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform hover:scale-110 duration-300 border-[3px] border-green-600"
                    color="gradient"
                    size="lg"
                    src={
                        user?.photoURL || "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    }
                />
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Profile Actions"
                variant="shadowed"
                className="w-72 bg-white rounded-lg shadow-lg"
            >
                {/* Profile Info */}
                <DropdownItem key="profile" className="py-4 px-4 flex flex-col gap-2">
                    <p className="text-sm font-semibold text-gray-600">Signed in as:</p>
                    <p className="text-lg font-bold text-gray-800 truncate">
                        {user?.displayName || "User Name"}
                    </p>
                    <p className="text-sm font-medium text-blue-500">
                        {user?.email || "zoey@example.com"}
                    </p>
                </DropdownItem>

                {/* Coins Display */}
                <DropdownItem
                    key="coins"
                    className="flex items-center gap-3 border-t border-gray-200 px-4 py-2"
                >
                    <FaCoins className="text-yellow-500 text-2xl" />
                    <span className="text-gray-700 font-semibold">
                        Coins:{" "}
                        <span className="text-gray-900 font-bold text-lg"></span>
                    </span>
                </DropdownItem>

                {/* Conditionally display Role or User Category */}
                {userRole !== "User Category" ? (
                    <DropdownItem
                        key="role"
                        className="flex items-center gap-3 border-t border-gray-200 px-4 py-2"
                    >
                        <span className="text-gray-700 font-semibold">Role:</span>
                        <span className="text-gray-900 font-bold text-lg">{userRole}</span>
                    </DropdownItem>
                ) : (
                    <DropdownItem
                        key="category"
                        className="flex items-center gap-3 border-t border-gray-200 px-4 py-2"
                    >
                        <span className="text-gray-700 font-semibold">User Category:</span>
                        <span className="text-gray-900 font-bold text-lg">{userCategory}</span>
                    </DropdownItem>
                )}

                {/* Dashboard Link */}
                <DropdownItem
                    key="settings"
                    className="hover:bg-blue-50 border-t border-gray-200 px-4 py-2"
                >
                    <NavLink
                        to="/dashboard"
                        className="w-full text-gray-700 font-medium flex items-center justify-start"
                        onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    >
                        Dashboard
                    </NavLink>
                </DropdownItem>

                {/* Logout */}
                <DropdownItem
                    key="logout"
                    className="hover:bg-red-50 border-t border-gray-200 px-4 py-2"
                    onClick={handleLogout}
                >
                    <span className="font-medium text-red-600">Log Out</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

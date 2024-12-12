import { UseAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { HiDotsVertical } from "react-icons/hi";
import Swal from "sweetalert2";

export const ManageUsers = () => {
  const axiosSecure = UseAxiosSecure();

  // Fetch users data
  const { data: Users = [], isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get("/users");
        return response.data;
      } catch (err) {
        console.error("Error fetching users:", err.message);
        throw err;
      }
    },
  });

  // Loader component
  const Loader = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );

  if (isLoading) {
    return <Loader />; // Show loader when loading
  }

  if (error) {
    return <p className="text-center text-red-500">Failed to load users: {error.message}</p>;
  }

  const handleMakeAdmin = (id) => {
    axiosSecure.patch(`/users/admin/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `User is now an Admin!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeWorker = (id) => {
    axiosSecure.patch(`/users/worker/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `User is now a Worker!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeTaskCreator = (id) => {
    axiosSecure.patch(`/users/taskCreator/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `User is now a Task Creator!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`)
          .then((res) => {
            if (res.status === 200) {
              refetch(); // Refetch the users list after deletion
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `User has been deleted!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `Failed to delete user: ${err.message}`,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  return (
    <div className="px-4 md:px-8">
      <div className="overflow-x-auto">
        <h1 className="text-center font-semibold text-2xl md:text-3xl mb-4">Total Users: {Users.length}</h1>

        {/* Table - Visible on medium screens and larger */}
        <div className="hidden md:block">
          <table className="table-auto w-full text-sm md:text-base">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white text-lg md:text-xl">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Name</th>
                <th className="p-2">Role</th>
                <th className="p-2">Coin</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white">
              {Users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="p-2 text-center">{index + 1}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10">
                        <img
                          className="rounded-full"
                          src={user.photoUrl || "https://via.placeholder.com/150"}
                          alt={user.name || "User Avatar"}
                        />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 text-center">{user.role}</td>
                  <td className="p-2 text-center">{user.coins}</td>
                  <td className="p-2 text-center">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly radius="full" size="sm" variant="light">
                          <HiDotsVertical className="text-xl" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem key="admin" onClick={() => handleMakeAdmin(user._id)}>
                          Make Admin
                        </DropdownItem>
                        <DropdownItem key="worker" onClick={() => handleMakeWorker(user._id)}>
                          Make Worker
                        </DropdownItem>
                        <DropdownItem key="task-creator" onClick={() => handleMakeTaskCreator(user._id)}>
                          Make Task Creator
                        </DropdownItem>
                        <DropdownItem key="delete" onClick={() => handleDeleteUser(user._id)}>
                          Delete User
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Users displayed as a list on mobile */}
        <div className="md:hidden">
          {Users.map((user, index) => (
            <div key={user._id} className="flex items-center gap-3 p-4 border-b">
              <div className="w-12 h-12">
                <img
                  className="rounded-full"
                  src={user.photoUrl || "https://via.placeholder.com/150"}
                  alt={user.name || "User Avatar"}
                />
              </div>
              <div className="flex-1">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-sm text-gray-600">Role: {user.role}</div>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button isIconOnly radius="full" size="sm" variant="light">
                        <HiDotsVertical className="text-xl" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="admin" onClick={() => handleMakeAdmin(user._id)}>
                        Make Admin
                      </DropdownItem>
                      <DropdownItem key="worker" onClick={() => handleMakeWorker(user._id)}>
                        Make Worker
                      </DropdownItem>
                      <DropdownItem key="task-creator" onClick={() => handleMakeTaskCreator(user._id)}>
                        Make Task Creator
                      </DropdownItem>
                      <DropdownItem key="delete" onClick={() => handleDeleteUser(user._id)}>
                        Delete User
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

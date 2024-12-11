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
    <div>
      <div className="overflow-x-auto">
        <h1 className="text-center font1 text-3xl">Total Users: {Users.length} </h1>
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gradient-to-r font1 from-purple-600 via-indigo-600 to-blue-600 text-white text-xl">
            <tr>
              <th>
                <label></label>
              </th>
              <th>Name</th>
              <th>Role</th>
              <th>Coin</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {Users.map((user) => (
              <tr key={user._id}>
                <th>
                  <label></label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoUrl || "https://via.placeholder.com/150"}
                          alt={user.photoUrl || "User Avatar"}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user.role}
                  <br />
                  <span className="badge badge-ghost badge-sm">{user?.userCategory || "N/A"}</span>
                </td>
                <td>
                  {user.coins}
                </td>
                <th>
                  <Dropdown className="bg-background border-1 border-default-200">
                    <DropdownTrigger>
                      <Button isIconOnly radius="full" size="sm" variant="light">
                        <HiDotsVertical className="text-default-400 text-3xl" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem key="view" onClick={() => handleMakeAdmin(user._id)}>Make Admin</DropdownItem>
                      <DropdownItem key="edit" onClick={() => handleMakeWorker(user._id)}>Make Worker</DropdownItem>
                      <DropdownItem key="delete" onClick={() => handleMakeTaskCreator(user._id)}>Make Task Creator</DropdownItem>
                      <DropdownItem key="delete" onClick={() => handleDeleteUser(user._id)}>Delete User</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

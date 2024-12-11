import { useQuery } from "@tanstack/react-query";
import { UseAuth } from "../useAuth";
import { UseAxiosSecure } from "../useAxiosSecure";

export const UseAdmin = () => {
    const { user, loading } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    // Using React Query to check if the user is an admin
    const { data, isLoading: isAdminLoading, error } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email,  // Ensures query runs only when user is authenticated
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log("Backend Response:", res);  // Log the full response for debugging
            return res.data;  // Adjust based on actual response structure
        }
    });
    

    // Log loading and data states
    console.log("isAdminLoading:", isAdminLoading);
    console.log("isAdmin:", data);

    // Check for errors in the query
    if (error) {
        console.error("Error fetching admin status:", error);
    }

    return [data, isAdminLoading];
};

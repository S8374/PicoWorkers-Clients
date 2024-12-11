import { UseAxiosPublic } from "./useAxiosPublic"
import { useQuery } from "@tanstack/react-query";
export const UseUsers = () => {
    const axiosPublic = UseAxiosPublic() ;
    const {data : users=[] , isPending: loading , refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosPublic.get('/users')
            return response.data
        }
    })
  return [users,loading ,refetch]
}

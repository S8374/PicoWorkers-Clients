import axios from "axios"

const axiosPublic = axios.create({
  baseURL: 'https://pico-workers-server-theta.vercel.app'
})
export const UseAxiosPublic = () => {
  return axiosPublic;
}

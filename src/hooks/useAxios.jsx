import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://studyflatform.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
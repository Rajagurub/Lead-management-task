import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

const axiosInstance = axios.create({
  timeout: 30000,
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {

      localStorage.removeItem("token");

  
      if (window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export const apiRequest = async (
  request: AxiosRequestConfig
): Promise<AxiosResponse> => {
  const result = await axiosInstance(request);
  return result;
};
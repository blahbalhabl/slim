import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshTOken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.token}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    const resInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if(error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Eject the interceptors when the component unmounts
      axiosPrivate.interceptors.request.eject(reqInterceptor);
      axiosPrivate.interceptors.response.eject(resInterceptor);
    };
  },[ auth, refresh ])
  
  return axiosPrivate;
}

export default useAxiosPrivate;

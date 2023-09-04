import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshTOken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    let isMounted = true;
    
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (auth?.accessToken) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error?.response?.status === 400 || 404) {
          if (isMounted) {
            try {
              const newAccessToken = await refresh();
              setAuth((prevAuth) => ({
                ...prevAuth,
                accessToken: newAccessToken,
              }));
              // Resend the original request with the new token
              return axiosPrivate(error.config);
            } catch (refreshError) {
              // Handle refresh error (e.g., logout)
              console.log(refreshError);
              return Promise.reject(refreshError);
            }
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Eject the interceptors when the component unmounts
      axiosPrivate.interceptors.request.eject(reqInterceptor);
      axiosPrivate.interceptors.response.eject(resInterceptor);
      isMounted = false;
    };
  },[ auth, refresh, setAuth ])
  
  return axiosPrivate;
}

export default useAxiosPrivate;

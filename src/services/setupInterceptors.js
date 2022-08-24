import axiosInstance from "./api";
import tokenService from "./tokenService";
import { apiConfig } from "../config";
import { refreshAuthSuccess, refreshAuthFail } from "../redux/auth/slice";

const setup = (store) => {
  axiosInstance.interceptors.request.use((config) => {
    const token = tokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  const { dispatch } = store;

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const originalRequest = error.config;
      const refresh_token = tokenService.getLocalRefreshToken();
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config._isRetry
      ) {
        originalRequest._isRetry = true;
        try {
          const { data } = await axiosInstance.put(
            `${apiConfig.refreshTokenURI}`,
            { refresh_token },
            { withCredentials: true }
          );
          dispatch(refreshAuthSuccess(data));
          tokenService.updateLocalAccessToken(data);
          return axiosInstance.request(originalRequest);
        } catch (error) {
          console.log("Not authorized");
          store.dispatch(refreshAuthFail());
        }
      }
      throw error;
    }
  );
};

export default setup;

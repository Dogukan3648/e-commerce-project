import apiClient from "../../api/apiClient";
import { SET_LANGUAGE, SET_ROLES, SET_THEME, SET_USER } from "../actionTypes";

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles,
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
});

export const fetchRoles = () => async (dispatch, getState) => {
  const { roles } = getState().client;

  if (roles.length > 0) {
    return;
  }
  try {
    const response = await apiClient.get("/roles");

    dispatch(setRoles(response.data));
  } catch (error) {
    console.error("Failed to fetch roles:", error);
  }
};

export const loginUser =
  ({ email, password, rememberMe }) =>
  async (dispatch) => {
    const response = await apiClient.post("/login", {
      email,
      password,
    });

    const { token, ...user } = response.data;

    dispatch(setUser(user));

    apiClient.defaults.headers.common.Authorization = token;

    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }

    return user;
  };

export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return;
  }

  apiClient.defaults.headers.common.Authorization = token;

  try {
    const response = await apiClient.get("/verify");

    const { token: renewedToken, ...user } = response.data;

    dispatch(setUser(user));

    localStorage.setItem("token", renewedToken);
    apiClient.defaults.headers.common.Authorization = renewedToken;

    return user;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      delete apiClient.defaults.headers.common.Authorization;
    }
  }
};

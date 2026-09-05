import apiClient from "../../api/apiClient";
import {
  SET_ADDRESS_LIST,
  SET_AUTH_CHECKED,
  SET_LANGUAGE,
  SET_ROLES,
  SET_THEME,
  SET_USER,
} from "../actionTypes";

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

export const setAuthChecked = (authChecked) => ({
  type: SET_AUTH_CHECKED,
  payload: authChecked,
});

export const setAddressList = (addressList) => ({
  type: SET_ADDRESS_LIST,
  payload: addressList,
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
    dispatch(setAuthChecked(true));
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
      dispatch(setUser({}));
      localStorage.removeItem("token");
      delete apiClient.defaults.headers.common.Authorization;
    }
  } finally {
    dispatch(setAuthChecked(true));
  }
};

export const fetchAddressList = () => async (dispatch) => {
  try {
    const response = await apiClient.get("/user/address");

    dispatch(setAddressList(response.data));
  } catch (error) {
    console.error("Failed to fetch address list:", error);
  }
};

export const createAddress = (addressData) => async (dispatch) => {
  const response = await apiClient.post("/user/address", addressData);

  await dispatch(fetchAddressList());

  return response.data;
};

export const updateAddress = (addressData) => async (dispatch) => {
  const response = await apiClient.put("/user/address", addressData);

  await dispatch(fetchAddressList());

  return response.data;
};

export const deleteAddress = (addressId) => async (dispatch) => {
  await apiClient.delete(`/user/address/${addressId}`);

  await dispatch(fetchAddressList());
};

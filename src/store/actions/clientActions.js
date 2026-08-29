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

  const response = await apiClient.get("/roles");

  dispatch(setRoles(response.data));
};

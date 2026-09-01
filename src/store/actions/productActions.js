import apiClient from "../../api/apiClient";
import {
  SET_CATEGORIES,
  SET_FETCH_STATE,
  SET_FILTER,
  SET_LIMIT,
  SET_OFFSET,
  SET_PRODUCT_LIST,
  SET_TOTAL,
} from "../actionTypes";

let categoriesRequest = null;

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setProductList = (productList) => ({
  type: SET_PRODUCT_LIST,
  payload: productList,
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total,
});

export const setFetchState = (fetchState) => ({
  type: SET_FETCH_STATE,
  payload: fetchState,
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit,
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const fetchCategories = () => async (dispatch, getState) => {
  const { categories } = getState().product;

  if (categories.length > 0) {
    return;
  }
  if (!categoriesRequest) {
    categoriesRequest = apiClient.get("/categories");
  }

  try {
    const response = await categoriesRequest;

    if (getState().product.categories.length === 0) {
      dispatch(setCategories(response.data));
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  } finally {
    categoriesRequest = null;
  }
};

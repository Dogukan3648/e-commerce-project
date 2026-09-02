import apiClient from "../../api/apiClient";
import {
  SET_CATEGORIES,
  SET_FETCH_STATE,
  SET_FILTER,
  SET_LIMIT,
  SET_OFFSET,
  SET_PRODUCT_LIST,
  SET_SORT,
  SET_TOTAL,
} from "../actionTypes";

let categoriesRequest = null;
let productRequestId = 0;

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

export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort,
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

export const fetchProducts = (categoryId) => async (dispatch, getState) => {
  const requestId = ++productRequestId;
  const { filter, sort } = getState().product;

  const params = {};

  if (categoryId) {
    params.category = categoryId;
  }
  if (filter) {
    params.filter = filter;
  }
  if (sort) {
    params.sort = sort;
  }

  dispatch(setFetchState("FETCHING"));

  try {
    const response = await apiClient.get("/products", { params });

    if (requestId !== productRequestId) {
      return;
    }

    dispatch(setProductList(response.data.products));
    dispatch(setTotal(response.data.total));
    dispatch(setFetchState("FETCHED"));
  } catch (error) {
    if (requestId !== productRequestId) {
      return;
    }
    console.error("Failed to fetch products:", error);
    dispatch(setFetchState("NOT_FETCHED"));
  }
};

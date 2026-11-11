import apiClient from "../../api/apiClient";

export const createOrder = (orderData) => async () => {
  const response = await apiClient.post("/order", orderData);

  return response.data;
};

export const fetchOrders = () => async () => {
  const response = await apiClient.get("/order");

  return response.data;
};

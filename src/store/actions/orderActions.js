import apiClient from "../../api/apiClient";

export const createOrder = (orderData) => async () => {
  const response = await apiClient.post("/order", orderData);

  return response.data;
};

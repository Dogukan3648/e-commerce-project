import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

export default apiClient;

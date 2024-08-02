import instance from "@/libs/axios/axiosInstance";

export const findOneCart = async (data) => {
  try {
    console.log(`Sending request to /carts`, data);
    const response = await instance.get(`/carts`, data);
    console.log("response find one cart received: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching cart data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const addToCart = async (data) => {
  try {
    const { product_id } = data;
    const response = await instance.post(`/carts/${product_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (data) => {
  try {
    const { product_id } = data;
    const response = await instance.delete(`/carts/${product_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShippingCost = async (data) => {
  try {
    console.log(`Sending request to /carts/shipping-cost`, data);
    const response = await instance.post(`/carts/shipping-cost`, data);
    console.log("response cart/shipping-cost received: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching shipping cost data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const updateCart = async (data) => {
  try {
    const response = await instance.put("/carts", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const destroyCart = async (id) => {
  try {
    console.log(`Sending request to /carts/${id} to delete item`);
    const response = await instance.delete(`/carts/${id}`);
    console.log("response received, item deleted: ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting Shopping Item:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const deleteAll = async (user_id) => {
  try {
    console.log("Sending request to /carts to delete all items");
    const response = await instance.delete("/carts/all", { data: { user_id } });
    console.log("response received, all items deleted: ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting all Shopping Items:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export default {
  findOneCart,
  getShippingCost,
  updateCart,
  destroyCart,
  deleteAll,
};

import axiosInstance from "../../libs/axios/axiosInstance";

export const findAllProduct = async () => {
  try {
    // console.log("Sending request to /products");
    const response = await axiosInstance.get("/products");
    // console.log("response received: ", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const findOneProduct = async (slug) => {
  try {
    const response = await axiosInstance.get(
      `/products/`,
      slug /*slug and role?*/
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching product data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const create = async (data) => {
  try {
      const response = await instance.post("/products", data);
      return response.data;
  } catch (error) {
      console.error("Error creating product:", error.response ? error.response.data : error.message);
      throw error;
  }
};

export const update = async (id, data) => {
  try {
      const response = await instance.put(`/products/${id}`, data);
      return response.data;
  } catch (error) {
      console.error("Error updating product:", error.response ? error.response.data : error.message);
      throw error;
  }
};  

export const uploadImage = async (id, data) => {
  try {
      const response = await instance.put(`/products/${id}`, data /** productId and filePath? */);
      return response.data;
  } catch (error) {
      console.error("Error updating product:", error.response ? error.response.data : error.message);
      throw error;
  }
};

export const destroy = async (id) => {
  try {
      const response = await instance.delete(`/products/${id}`);
      return response.data;
  } catch (error) {
      console.error("Error deleting product:", error.response ? error.response.data : error.message);
      throw error;
  }
};

export default { findAllProduct, findOneProduct, create, update, uploadImage, destroy };

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

export default { findAllProduct, findOneProduct };

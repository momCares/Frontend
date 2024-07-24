import axiosInstance from "../../libs/axios/axiosInstance";

export const findAllProduct = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching products data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const findOneProduct = async (slug, role = "admin") => {
  try {
    const response = await axiosInstance.get(`/products/${slug}`, {
      params: { role },
    });

    const baseURL = process.env.NEXT_PUBLIC_IMAGE_API_URL;

    if (response.data.data && response.data.data.product_images) {
      response.data.data.product_images.forEach((image) => {
        if (image.url) {
          image.url = image.url.replace(/\\/g, "/");
          try {
            image.url = new URL(image.url, baseURL).toString();
          } catch (e) {
            console.error("Invalid image URL:", image.url);
          }
        }
      });
    }

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
    console.error(
      "Error creating product:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const update = async (id, data) => {
  try {
    const response = await instance.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const uploadImage = async (id, data) => {
  try {
    const response = await instance.put(`/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating product:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const destroy = async (id) => {
  try {
    const response = await instance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting product:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default {
  findAllProduct,
  findOneProduct,
  create,
  update,
  uploadImage,
  destroy,
};

import axiosInstance from "../../libs/axios/axiosInstance";

// Function to fetch a single category by ID
export const getCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching category data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Function to update a category
export const updateCategory = async (id) => {
  try {
    const response = await axiosInstance.put(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating category:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};


export default {findAll, findOne};



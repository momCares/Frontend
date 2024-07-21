"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import protectedPage from "../../../libs/protectedPage/index";

const Select = dynamic(() => import("react-select"), { ssr: false });

const CreateProductPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [stock, setStock] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      let categories = [];

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      categories = response.data.data.categories;
      const pages = response.data.data.totalPages;

      for (let i = 2; i <= pages; i++) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cms/categories`,
          {
            params: {
              page: i,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        categories = categories.concat(res.data.data.categories);
      }

      setCategories(
        categories.map((category) => ({
          value: category.id,
          label: `${category.id} : ${category.name}`,
        }))
      );
    } catch (error) {
      console.error("Fetch categories error:", error.message || error);
    }
  };

  const handleCreateProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const newProduct = {
        name,
        price: parseFloat(price),
        weight: parseFloat(weight),
        category_id: parseInt(categoryId.value),
        stock: parseInt(stock),
        sku,
        description,
      };

      const productResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/products`,
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const productId = productResponse.data.data.id;

      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("id", productId);

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/cms/products/uploads/${productId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      router.push("/products");
    } catch (error) {
      setError(error.message || "Error creating product");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="px-4 md:px-32 lg:px-64 py-8 bg-color-secondary">
      <h1 className="text-2xl text-color-primary underline underline-offset-8 font-bold mb-4 mt-4 justify-center flex">
        Add New Product
      </h1>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateProduct();
        }}
      >
        {error && <div className="text-red mb-4">{error}</div>}
        <div className="rounded-lg bg-color-primary px-12 py-8 mt-12 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Name
            </label>
            <input
              placeholder="Product Name..."
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-color-pink">
              Price
            </label>
            <input
              placeholder="Product Price..."
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-color-pink">
              Weight
            </label>
            <input
              placeholder="Product Weight..."
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-color-pink">
              Category
            </label>
            <Select
              value={categoryId}
              onChange={setCategoryId}
              options={categories}
              className="mt-1 block w-full text-color-pink rounded-md border border-color-customRed"
              placeholder="Select Category..."
              isSearchable
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-color-pink">
              Stock
            </label>
            <input
              placeholder="Product Stock..."
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-color-pink">
              SKU
            </label>
            <input
              placeholder="Product SKU..."
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-color-pink">
              Description
            </label>
            <textarea
              placeholder="Product Descriptions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-color-pink">
              Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        <div className="flex space-x-2 justify-center mt-4">
          <button
            type="submit"
            className="bg-color-pink hover:bg-color-primary text-color-primary hover:text-color-pink font-semibold rounded-lg h-10 md:w-32 w-40"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
          <button
            type="button"
            className="bg-color-primary hover:bg-color-pink text-color-pink hover:text-color-primary font-semibold rounded-lg h-10 md:w-32 w-40"
            onClick={() => router.push("/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default protectedPage(CreateProductPage);

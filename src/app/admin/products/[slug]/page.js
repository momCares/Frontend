"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Select from "react-select";
import Image from "next/image";
import momCaresLogo from "@/assets/momcares_logo.png";

const ProductDetailPage = () => {
  const router = useRouter();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [stockError, setStockError] = useState("");
  const [skuError, setSkuError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchProductData(slug);
      fetchCategories();
    }
  }, [slug]);

  const fetchProductData = async (slug) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/products/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const productData = response.data.data;

      setProduct(productData);
      setLoading(false);
    } catch (error) {
      setError(error.message || "Error fetching product data");
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories(
        response.data.data.categories.map((category) => ({
          value: category.id,
          label: `${category.id} : ${category.name}`,
        }))
      );
    } catch (error) {
      console.error("Fetch categories error:", error.message || error);
    }
  };

  const saveProduct = async (updatedProduct) => {
    if (!updatedProduct.name) {
      setNameError("Name cannot be empty");
      return;
    } else {
      setNameError("");
    }

    if (updatedProduct.price < 0) {
      setPriceError("Price cannot be negative");
      return;
    }

    if (updatedProduct.weight < 0) {
      setWeightError("Weight cannot be negative");
      return;
    }

    if (!updatedProduct.category_id) {
      setCategoryError("Category cannot be empty");
      return;
    }

    if (updatedProduct.stock < 0) {
      setStockError("Stock cannot be negative");
      return;
    }

    if (!updatedProduct.sku) {
      setSkuError("SKU cannot be empty");
      return;
    }

    if (!updatedProduct.description) {
      setDescriptionError("Description cannot be empty");
      return;
    } else {
      setDescriptionError("");
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authorization token found");
        return;
      }

      // Update product details
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/products/${updatedProduct.id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle image upload if a new image is provided
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("id", updatedProduct.id);

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/cms/products/uploads/${updatedProduct.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      // Redirect to the products page
      router.push("/products");
    } catch (error) {
      setError(error.message || "Error saving product data");
    }
  };

  const deleteProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/products/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/products");
    } catch (error) {
      setError(error.message || "Error deleting product");
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-4 md:px-32 lg:px-64 py-8 bg-color-secondary font-semibold">
      <h1 className="text-2xl text-color-primary underline underline-offset-8 font-bold mb-4 mt-4 justify-center flex">
        Product Details
      </h1>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          saveProduct(product);
        }}
      >
        {error && <div className="text-red mb-4">{error}</div>}
        <div className="rounded-lg bg-color-primary px-12 py-8 mt-12 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-color-pink">
              ID
            </label>
            <input
              type="text"
              value={product.id}
              readOnly
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Name
            </label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
            {nameError && <p className="text-red text-sm mt-1">{nameError}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={product.price}
              onChange={(e) => {
                const newPrice = parseFloat(e.target.value);
                setProduct({ ...product, price: newPrice });
              }}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
            {priceError && (
              <p className="text-red text-sm mt-1">{priceError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Weight
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={product.weight}
              onChange={(e) =>
                setProduct({ ...product, weight: parseFloat(e.target.value) })
              }
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
            {weightError && (
              <p className="text-red text-sm mt-1">{weightError}</p>
            )}
          </div>
          <div>
            <label className="blockw text-sm font-bold text-color-pink">
              Category
            </label>
            <Select
              options={categories}
              value={categories.find(
                (cat) => cat.value === product.category_id
              )}
              onChange={(selectedOption) =>
                setProduct({ ...product, category_id: selectedOption.value })
              }
              placeholder="Select category"
              className="mt-1 block w-full text-color-pink rounded-md border border-color-customRed"
            />
            {categoryError && (
              <p className="text-red text-sm mt-1">{categoryError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Stock
            </label>
            <input
              type="number"
              min="0"
              value={product.stock}
              onChange={(e) =>
                setProduct({ ...product, stock: parseInt(e.target.value, 10) })
              }
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
            {stockError && (
              <p className="text-red text-sm mt-1">{stockError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              SKU
            </label>
            <input
              type="text"
              value={product.sku}
              onChange={(e) => setProduct({ ...product, sku: e.target.value })}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
            {skuError && <p className="text-red text-sm mt-1">{skuError}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Description
            </label>
            <textarea
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              rows="4"
              required
            />
            {descriptionError && (
              <p className="text-red text-sm mt-1">{descriptionError}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-color-pink">
              Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full text-color-pink border border-color-customRed rounded-md p-2"
            />
            {image && (
              <Image src={image} alt="Product Image" width={200} height={200} />
            )}
          </div>
          <div className="md:col-span-2 flex justify-between">
            <button
              type="submit"
              className="bg-color-pink hover:bg-color-primary text-color-primary hover:text-color-pink font-semibold hover:border-2 rounded-lg h-10 md:w-32 w-40"
            >
              Save
            </button>
            <button
              type="button"
              onClick={deleteProduct}
              className="border-2 bg-color-primary hover:bg-color-pink text-color-pink hover:text-color-primary font-semibold rounded-lg h-10 md:w-32 w-40"
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductDetailPage;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import protectedPage from "../../../libs/protectedPage/index";

const Select = dynamic(() => import("react-select"), { ssr: false });

const AddPromoPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [allProducts, setAllProducts] = useState(false);
  const [deduction, setDeduction] = useState("");
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [role] = useState("admin");
  const [productOptions, setProductOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      let allProducts = [];
      let page = 1;
      let moreProducts = true;

      while (moreProducts) {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cms/products?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const products = response.data.data.products;

        if (products.length > 0) {
          allProducts = allProducts.concat(products);
          page++;
        } else {
          moreProducts = false;
        }
      }

      setProductOptions(
        allProducts.map((product, index) => ({
          value: product.id,
          label: `${index + 1} : ${product.name}`,
        }))
      );
    } catch (error) {
      console.error("Fetch products error:", error.message || error);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    const milliseconds = String(d.getMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const handleCreatePromo = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const newPromo = {
        name,
        code,
        all_products: allProducts,
        deduction: parseFloat(deduction),
        quantity: parseInt(quantity),
        products: products.map((product) => product.value),
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        role,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/promo`,
        newPromo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/");
    } catch (error) {
      setError(error.message || "Error creating promo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-32 lg:px-64 py-8 bg-color-secondary">
      <h1 className="text-2xl text-color-primary underline underline-offset-8 font-bold mb-4 mt-4 justify-center flex">
        Add New Promo
      </h1>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreatePromo();
        }}
      >
        {error && <div className="text-red mb-4">{error}</div>}
        <div className="rounded-lg bg-color-primary px-12 py-8 mt-12 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Name
            </label>
            <input
              placeholder="Promo Name..."
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Code
            </label>
            <input
              placeholder="Promo Code..."
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Deduction
            </label>
            <input
              placeholder="Promo Deduction..."
              type="number"
              value={deduction}
              onChange={(e) => setDeduction(e.target.value)}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Quantity
            </label>
            <input
              placeholder="Promo Quantity..."
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Products
            </label>
            <Select
              value={products}
              onChange={setProducts}
              options={productOptions}
              className="mt-1 block w-full text-color-pink rounded-md border border-color-customRed"
              placeholder="Select Products..."
              isMulti
              isSearchable
              isDisabled={allProducts}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="block text-sm font-bold text-color-pink mr-2">
              Apply to All Products
            </label>
            <input
              type="checkbox"
              checked={allProducts}
              onChange={(e) => setAllProducts(e.target.checked)}
              className="text-color-pink"
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
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default protectedPage(AddPromoPage);

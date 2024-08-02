"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Select from "react-select";
import Image from "next/image";
import momCaresLogo from "@/assets/momcares_logo.png";
import protectedPage from "../../../../libs/protectedPage/index";

const PromoDetailPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Changed from slug to id for clarity
  const [promo, setPromo] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [deductionError, setDeductionError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  useEffect(() => {
    if (id) {
      fetchPromoData(id);
      fetchProducts();
    }
  }, [id]);

  const fetchPromoData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/promo/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const promoData = response.data.data;
      setPromo(promoData);
      setLoading(false);
    } catch (error) {
      setError(error.message || "Error fetching promo data");
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(
        response.data.data.products.map((product) => ({
          value: product.id,
          label: `${product.id} : ${product.name}`,
        }))
      );
    } catch (error) {
      console.error("Fetch products error:", error.message || error);
    }
  };

  const savePromo = async (updatedPromo) => {
    if (!updatedPromo.name) {
      setNameError("Name cannot be empty");
      return;
    } else {
      setNameError("");
    }

    if (!updatedPromo.code) {
      setCodeError("Code cannot be empty");
      return;
    } else {
      setCodeError("");
    }

    if (updatedPromo.deduction < 0) {
      setDeductionError("Deduction cannot be negative");
      return;
    } else {
      setDeductionError("");
    }

    if (updatedPromo.quantity < 0) {
      setQuantityError("Quantity cannot be negative");
      return;
    } else {
      setQuantityError("");
    }

    if (!updatedPromo.start_date) {
      setStartDateError("Start date cannot be empty");
      return;
    } else {
      setStartDateError("");
    }

    if (!updatedPromo.end_date) {
      setEndDateError("End date cannot be empty");
      return;
    } else {
      setEndDateError("");
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authorization token found");
        return;
      }

      // Update promo details
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/promo/${updatedPromo.id}`,
        updatedPromo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirect to the promo page
      router.push("/admin/promo");
    } catch (error) {
      setError(error.message || "Error saving promo data");
    }
  };

  const deletePromo = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/promo/${promo.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/admin/promo");
    } catch (error) {
      setError(error.message || "Error deleting promo");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Ensure promo.products is always defined and set to an empty array if undefined
  const promoProducts = promo?.products || [];

  return (
    <div className="px-4 md:px-32 lg:px-64 py-8 bg-color-secondary font-semibold">
      <h1 className="text-2xl text-color-primary underline underline-offset-8 font-bold mb-4 mt-4 justify-center flex">
        Promo Details
      </h1>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          savePromo(promo);
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
              value={promo.id}
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
              value={promo.name}
              onChange={(e) => setPromo({ ...promo, name: e.target.value })}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
            {nameError && <p className="text-red text-sm mt-1">{nameError}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Code
            </label>
            <input
              type="text"
              value={promo.code}
              onChange={(e) => setPromo({ ...promo, code: e.target.value })}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
            {codeError && <p className="text-red text-sm mt-1">{codeError}</p>}
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Deduction
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={promo.deduction}
              onChange={(e) => {
                const newDeduction = parseFloat(e.target.value);
                setPromo({ ...promo, deduction: newDeduction });
              }}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
            {deductionError && (
              <p className="text-red text-sm mt-1">{deductionError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Quantity
            </label>
            <input
              type="number"
              min="0"
              value={promo.quantity}
              onChange={(e) =>
                setPromo({ ...promo, quantity: parseInt(e.target.value, 10) })
              }
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
            {quantityError && (
              <p className="text-red text-sm mt-1">{quantityError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Start Date
            </label>
            <input
              type="date"
              value={promo.start_date}
              onChange={(e) =>
                setPromo({ ...promo, start_date: e.target.value })
              }
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
            {startDateError && (
              <p className="text-red text-sm mt-1">{startDateError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              End Date
            </label>
            <input
              type="date"
              value={promo.end_date}
              onChange={(e) => setPromo({ ...promo, end_date: e.target.value })}
              className="mt-1 block w-full border border-color-customRed text-color-pink rounded-md shadow-sm p-2"
              required
            />
            {endDateError && (
              <p className="text-red text-sm mt-1">{endDateError}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-color-pink">
              Applicable Products
            </label>
            <Select
              isMulti
              options={products}
              value={promoProducts.map((productId) => ({
                value: productId,
                label:
                  products.find((product) => product.value === productId)
                    ?.label || "",
              }))}
              onChange={(selectedOptions) =>
                setPromo({
                  ...promo,
                  products: selectedOptions.map((option) => option.value),
                })
              }
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-color-pink hover:bg-color-primary text-color-primary hover:text-color-pink font-semibold hover:border-2 rounded-lg h-10 md:w-32 w-40"
          >
            Save
          </button>
          <button
            type="button"
            onClick={deletePromo}
            className="border-2 bg-color-primary hover:bg-color-pink text-color-pink hover:text-color-primary font-semibold rounded-lg h-10 md:w-32 w-40"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default protectedPage(PromoDetailPage);

"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ArrowSquareIn,
  ListPlus,
  ArrowLineLeft,
  ArrowLineRight,
} from "@phosphor-icons/react";
import { debounce } from "lodash";
import dynamic from "next/dynamic";
import CardProduct from "@/components/ui/CardProduct";  // Import your CardProduct component

const Select = dynamic(() => import("react-select"), { ssr: false });

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerms, setSearchTerms] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState({ value: "id", label: "Default" });
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const perPage = 10;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProductsData();
  }, [currentPage, searchTerms, selectedCategory, sortBy, sortOrder]);

  const fetchProductsData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          params: {
            page: currentPage,
            limit: perPage,
            role: "admin",
            showDeleted: true,
            searchTerms,
            categoryId: selectedCategory ? selectedCategory.value : undefined,
            sortBy: sortBy.value,
            sortOrder,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const productsData = response.data.data;
      setProducts(productsData.products);
      setTotalPages(productsData.totalPages);
    } catch (error) {
      console.error("Fetch products error:", error.message || error);
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pages = response.data.data.totalPages;
      let allCategories = response.data.data.categories;
      for (let i = 2; i <= pages; i++) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories?page=${i}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        allCategories = allCategories.concat(res.data.data.categories);
      }
      setCategories(
        allCategories.map((category) => ({
          value: category.id,
          label: `${category.id} : ${category.name}`,
        }))
      );
    } catch (error) {
      console.error("Fetch categories error:", error.message || error);
      toast.error("Failed to fetch categories.");
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerms(value);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleResetAll = () => {
    setSearchTerms("");
    setSelectedCategory(null);
    setSortBy({ value: "id", label: "Default" });
    setSortOrder("asc");
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;
    let startPage = Math.max(
      currentPage - Math.floor(maxPageNumbersToShow / 2),
      1
    );
    let endPage = startPage + maxPageNumbersToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`mx-1 px-3 py-1 text-color-primary hover:text-color-primary rounded hover:bg-color-pink ${
            currentPage === i ? "font-bold" : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="bg-color-secondary relative px-4 md:px-8 lg:px-32 pt-14 justify-center w-full pb-12">
      <ToastContainer />
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 mt-4">
        <h1 className="underline underline-offset-8 text-2xl font-bold text-color-primary">
          Products
        </h1>
        <button
          onClick={handleResetAll}
          className="bg-color-primary hover:bg-color-pink text-color-pink hover:text-color-primary font-semibold rounded-lg h-10 w-full md:w-32 mt-4 md:mt-0"
        >
          Reset All
        </button>
      </div>
      <div className="flex flex-col md:flex-row mb-2 space-y-2 md:space-y-0 md:space-x-2 px-28">
        <input
          type="text"
          placeholder="Search here..."
          className="ring-2 ring-color-primary focus:ring-color-blue-500 focus:outline-none p-2 rounded flex-1"
          onChange={handleSearchChange}
          value={searchTerms}
        />
      </div>
      <div className="text-color-pink font-semibold flex flex-col md:flex-row mb-8 space-y-2 md:space-y-0 md:space-x-2 px-28">
        <Select
          value={selectedCategory}
          onChange={(selectedOption) => {
            setSelectedCategory(selectedOption);
          }}
          options={categories}
          className="flex-1 text-color-pink"
          placeholder="Select Category"
          isSearchable
        />
        <Select
          value={sortBy}
          onChange={setSortBy}
          options={[
            { value: "name", label: "Name" },
            { value: "price", label: "Price" },
            { value: "category_id", label: "Category" },
          ]}
          className="flex-1 text-color-pink"
          placeholder="Sort By"
          isSearchable
        />
        <Select
          value={{ value: sortOrder, label: sortOrder.toUpperCase() }}
          onChange={(selectedOption) => setSortOrder(selectedOption.value)}
          options={[
            { value: "asc", label: "Ascending" },
            { value: "desc", label: "Descending" },
          ]}
          className="flex-1 text-color-pink"
          placeholder="Sort Order"
          isSearchable
        />
      </div>
      <div className="overflow-x-auto pb-8">
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : (
          <CardProduct products={{ data: { products } }} limit={9} />
        )}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {currentPage > 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-3 py-1 text-color-primary hover:text-color-primary rounded hover:bg-color-pink"
          >
            <ArrowLineLeft size={24} />
          </button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-3 py-1 text-color-primary hover:text-color-primary rounded hover:bg-color-pink"
          >
            <ArrowLineRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductPage;

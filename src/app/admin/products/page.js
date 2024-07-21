"use client";
import Button from "@/components/ui/Button";
import { ArrowSquareIn } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const productsData = [
  [
    {
      id: 1,
      name: "Product One",
      price: 100,
      weight: 1,
      category: "Makanan",
      stock: 10,
      sku: "PB0001",
      slug: "product-one",
      status: "Active",
    },
    {
      id: 2,
      name: "Product Two",
      price: 150,
      weight: 1.5,
      category: "Mainan",
      stock: 15,
      sku: "PB0002",
      slug: "product-two",
      status: "Active",
    },
    {
      id: 3,
      name: "Product Three",
      price: 200,
      weight: 2,
      category: "Perlengkapan Tidur",
      stock: 20,
      sku: "PB0003",
      slug: "product-three",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Product Four",
      price: 120,
      weight: 1.2,
      category: "Makanan",
      stock: 12,
      sku: "PB0004",
      slug: "product-four",
      status: "Active",
    },
    {
      id: 5,
      name: "Product Five",
      price: 180,
      weight: 1.8,
      category: "Mainan",
      stock: 18,
      sku: "PB0005",
      slug: "product-five",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Product Six",
      price: 130,
      weight: 1.3,
      category: "Perlengkapan Tidur",
      stock: 13,
      sku: "PB0006",
      slug: "product-six",
      status: "Active",
    },
    {
      id: 7,
      name: "Product Seven",
      price: 170,
      weight: 1.7,
      category: "Makanan",
      stock: 17,
      sku: "PB0007",
      slug: "product-seven",
      status: "Active",
    },
    {
      id: 8,
      name: "Product Eight",
      price: 140,
      weight: 1.4,
      category: "Mainan",
      stock: 14,
      sku: "PB0008",
      slug: "product-eight",
      status: "Inactive",
    },
    {
      id: 9,
      name: "Product Nine",
      price: 190,
      weight: 1.9,
      category: "Perlengkapan Tidur",
      stock: 19,
      sku: "PB0009",
      slug: "product-nine",
      status: "Active",
    },
    {
      id: 10,
      name: "Product Ten",
      price: 110,
      weight: 1.1,
      category: "Makanan",
      stock: 11,
      sku: "PB0010",
      slug: "product-ten",
      status: "Inactive",
    },
  ],
  [
    {
      id: 11,
      name: "Product Eleven",
      price: 160,
      weight: "1.6 kg",
      category: "Mainan",
      stock: 16,
      sku: "PB0011",
      slug: "product-eleven",
      status: "Active",
    },
    {
      id: 12,
      name: "Product Twelve",
      price: 210,
      weight: "2.1 kg",
      category: "Perlengkapan Tidur",
      stock: 21,
      sku: "PB0012",
      slug: "product-twelve",
      status: "Active",
    },
    {
      id: 13,
      name: "Product Thirteen",
      price: 125,
      weight: "1.25 kg",
      category: "Makanan",
      stock: 13,
      sku: "PB0013",
      slug: "product-thirteen",
      status: "Inactive",
    },
    {
      id: 14,
      name: "Product Fourteen",
      price: 175,
      weight: "1.75 kg",
      category: "Mainan",
      stock: 17,
      sku: "PB0014",
      slug: "product-fourteen",
      status: "Active",
    },
    {
      id: 15,
      name: "Product Fifteen",
      price: 195,
      weight: "1.95 kg",
      category: "Perlengkapan Tidur",
      stock: 19,
      sku: "PB0015",
      slug: "product-fifteen",
      status: "Inactive",
    },
  ],
];

const getUniqueCategories = (data) => {
  const categories = new Set();
  data.forEach((page) => {
    page.forEach((product) => {
      categories.add(product.category);
    });
  });
  return Array.from(categories);
};

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const uniqueCategories = getUniqueCategories(productsData);

  useEffect(() => {
    fetchProductData();
  }, [currentPage]);

  useEffect(() => {
    filterProductData();
  }, [searchTerm, filterStatus, filterCategory, sortBy, products]);

  const fetchProductData = async () => {
    setProducts(productsData[currentPage - 1]);
    setTotalPages(2);
  };

  const filterProductData = () => {
    let filteredData = [...products];

    if (filterStatus) {
      filteredData = filteredData.filter(
        (product) => product.status === filterStatus
      );
    }

    if (filterCategory) {
      filteredData = filteredData.filter(
        (product) => product.category === filterCategory
      );
    }

    if (searchTerm) {
      filteredData = filteredData.filter((product) =>
        Object.values(product).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortBy) {
      filteredData.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    }

    setFilteredProducts(filteredData);
  };

  const handleResetAll = () => {
    setSearchTerm("");
    setFilterStatus("");
    setFilterCategory("");
    setSortBy("");
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-24 py-12 justify-center bg-color-secondary font-semibold">
      <div className="flex justify-between items-center mb-8 mt-4">
        <h1 className="underline underline-offset-8 text-color-primary text-2xl font-bold">
          Products
        </h1>
        <button
          onClick={handleResetAll}
          className="text-color-primary font-semibold hover:underline"
        >
          Reset All
        </button>
      </div>
      <div className="flex mb-8">
        <select
          className="text-color-pink border p-2 rounded mr-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Select By Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          className="text-color-pink border p-2 rounded mr-2"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Select By Category</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search here..."
          className="text-color-pink border p-2 rounded flex-1 mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="text-color-pink border p-2 rounded"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="weight">Weight</option>
          <option value="category">Category</option>
          <option value="stock">Stock</option>
          <option value="sku">SKU</option>
          <option value="slug">Slug</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div className="rounded-xl bg-color-primary overflow-x-auto mb-4">
        <table className="min-w-full w-full">
          <thead>
            <tr>
              <th className="border-2 border-color-secondary text-color-pink px-4 py-2">
                ID
              </th>
              <th className="border-2 border-color-secondary text-color-pink px-4 py-2">
                Name
              </th>
              <th className="border-2 border-color-secondary text-color-pink px-4 py-2">
                Price
              </th>
              <th className="border-2 border-color-secondary text-color-pink px-4 py-2">
                Weight
              </th>
              <th className="border-2 border-color-secondary text-color-pink px-4 py-2">
                Category
              </th>
              <th className="border-2 border-color-secondary text-color-pink px-4 py-2">
                Stock
              </th>
              <th className="border-2 border-color-secondary text-color-pink px-4 py-2">
                SKU
              </th>
              <th className="border-2 border-color-secondary text-color-pink px-4 py-2">
                Slug
              </th>
              <th className="border-2 border-color-secondary text-color-pink px-4 py-2">
                Status
              </th>
              <th className="border-2 border-color-secondary text-color-pink px-4 py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="border-2 border-color-secondary text-color-pink px-4 py-2 w-32 overflow-hidden whitespace-nowrap truncate text-center">
                  {product.id}
                </td>
                <td className="border-2 border-color-secondary text-color-pink px-4 py-2 w-60 overflow-hidden whitespace-nowrap truncate text-center">
                  {product.name}
                </td>
                <td className="border-2 border-color-secondary text-color-pink px-4 py-2 w-80 overflow-hidden whitespace-nowrap truncate text-center">
                  {product.price}
                </td>
                <td className="border-2 border-color-secondary text-color-pink px-4 py-2 w-40 overflow-hidden whitespace-nowrap truncate text-center">
                  {product.weight}
                </td>
                <td className="border-2 border-color-secondary text-color-pink px-4 py-2 w-80 overflow-hidden whitespace-nowrap truncate text-center">
                  {product.category}
                </td>
                <td className="border-2 border-color-secondary text-color-pink px-4 py-2 w-80 overflow-hidden whitespace-nowrap truncate text-center">
                  {product.stock}
                </td>
                <td className="border-2 border-color-secondary text-color-pink px-4 py-2 w-80 overflow-hidden whitespace-nowrap truncate text-center">
                  {product.sku}
                </td>
                <td className="border-2 border-color-secondary text-color-pink px-4 py-2 w-80 overflow-hidden whitespace-nowrap truncate text-center">
                  {product.slug}
                </td>
                <td className="border-2 border-color-secondary text-color-pink px-4 py-2 w-80 overflow-hidden whitespace-nowrap truncate text-center">
                  {product.status}
                </td>
                <td className="border-2 border-color-secondary text-color-pink px-4 py-2 text-center">
                  <Button className="bg-green hover:bg-greenhover text-primary rounded-lg h-10">
                    <ArrowSquareIn className="w-10 h-5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border border-color-secondary text-color-primary flex justify-center px-2 py-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`bg-color-customRed mx-1 px-3 py-1 hover:underline rounded ${
                  currentPage === number ? "font-bold" : ""
                }`}
              >
                {number}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

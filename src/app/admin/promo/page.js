"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/components/ui/Button";
import {
  ArrowSquareIn,
  ListPlus,
  ArrowLineLeft,
  ArrowLineRight,
} from "@phosphor-icons/react";
import protectedPage from "../../../libs/protectedPage/index";

const PromoPage = () => {
  const router = useRouter();
  const [promo, setPromo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const perPage = 10;

  useEffect(() => {
    fetchPromoData();
  }, [currentPage]);

  const fetchPromoData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/promo`,
        {
          params: {
            page: currentPage,
            limit: perPage,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const promoData = response.data.data;
  
      // Filter out soft-deleted promos
      const filteredPromos = promoData.promo.filter(p => !p.deleted_at);
  
      setPromo(filteredPromos);
      setTotalPages(promoData.totalPages);
    } catch (error) {
      console.error("Fetch promo error:", error.message || error);
      toast.error("Failed to fetch promo.");
    } finally {
      setLoading(false);
    }
  };
  
  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleCreatePromo = () => {
    router.push("/admin/add-promo");
  };

  const handleEditPromo = (id) => {
    router.push(`/admin/promo/${id}`);
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
          Promo
        </h1>
        <Button
          onClick={handleCreatePromo}
          className="p-2 bg-color-pink hover:bg-color-primary text-color-primary hover:text-color-pink hover:border-2 rounded-lg h-10 flex items-center justify-center"
        >
          <ListPlus className="mr-2" />
          Create
        </Button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : (
          <table className="bg-color-primary text-color-pink rounded-lg min-w-full w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border-2 border-color-customRed">
                  No
                </th>
                <th className="px-4 py-2 border-2 border-color-customRed">
                  Name
                </th>
                <th className="px-4 py-2 border-2 border-color-customRed">
                  Code
                </th>
                <th className="px-4 py-2 border-2 border-color-customRed">
                  All Products
                </th>
                <th className="px-4 py-2 border-2 border-color-customRed">
                  Deduction
                </th>
                <th className="px-4 py-2 border-2 border-color-customRed">
                  Quantity
                </th>
                <th className="px-4 py-2 border-2 border-color-customRed">
                  Products
                </th>
                <th className="px-4 py-2 border-2 border-color-customRed">
                  Start Date
                </th>
                <th className="px-4 py-2 border-2 border-color-customRed">
                  End Date
                </th>
                <th className="px-4 py-2 border-2 border-color-customRed">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {promo && promo.length > 0 ? (
                promo.map((promo, index) => (
                  <tr key={promo.id} className="border font-semibold">
                    <td className="border-2 border-color-customRed px-4 py-2 text-center">
                      {(currentPage - 1) * perPage + index + 1}
                    </td>
                    <td className="border-2 border-color-customRed px-4 py-2 overflow-hidden truncate">
                      {promo.name}
                    </td>
                    <td className="border-2 border-color-customRed px-4 py-2 overflow-hidden truncate">
                      {promo.code}
                    </td>
                    <td className="border-2 text-center border-color-customRed px-4 py-2 overflow-hidden truncate">
                      {promo.all_products ? "Yes" : "No"}
                    </td>
                    <td className="border-2 text-center border-color-customRed px-4 py-2 overflow-hidden truncate">
                      {promo.deduction}%
                    </td>
                    <td className="border-2 text-center border-color-customRed px-4 py-2 overflow-hidden truncate">
                      {promo.quantity}
                    </td>
                    <td className="border-2 text-center border-color-customRed px-4 py-2 overflow-hidden truncate">
                      {promo.products && promo.products.length > 0 ? promo.products.map(product => product.name).join(", ") : "N/A"}
                    </td>
                    <td className="border-2 text-center border-color-customRed px-4 py-2 overflow-hidden truncate">
                      {new Date(promo.start_date).toLocaleDateString()}
                    </td>
                    <td className="border-2 text-center border-color-customRed px-4 py-2 overflow-hidden truncate">
                      {new Date(promo.end_date).toLocaleDateString()}
                    </td>
                    <td className="border-2 text-center border-color-customRed px-4 py-2">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEditPromo(promo.id)}
                          className="text-color-dark hover:text-color-pink"
                        >
                          <ArrowSquareIn size={24} weight="bold" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    No Promo Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {currentPage > 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-3 py-1 text-color-primary hover:text-color-primary rounded hover:bg-color-pink"
          >
            <ArrowLineLeft />
          </button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-3 py-1 text-color-primary hover:text-color-primary rounded hover:bg-color-pink"
          >
            <ArrowLineRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default protectedPage(PromoPage);

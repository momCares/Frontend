"use client";

import React, { useEffect, useState } from "react";
import { findAllAddress, destroyAddress } from "@/modules/fetch/fetchAddress";
import UpdateAddress from "./UpdateAddress";

const AddressList = ({ setCurrentComponent }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateAddress, setShowUpdateAddress] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await findAllAddress();
        setAddresses(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleDeleteAddress = async (id) => {
    try {
      await destroyAddress(id);
      setAddresses(addresses.filter((address) => address.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleUpdateAddress = async (id) => {
    setSelectedId(id);
    console.log("Selected ID:", id);
    setShowUpdateAddress(true);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startPage = (currentPage - 1) * itemsPerPage;
  const selectedAddress = addresses.slice(startPage, startPage + itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {!showUpdateAddress && (
        <div className="bg-color-secondary flex flex-row items-center px-8 w-full py-2">
          <div className="w-4/12 h-screen p-10">
            <button
              onClick={() => setCurrentComponent("detailProfile")}
              className="underline underline-offset-8 text-color-primary flex flex-row text-2xl font-bold mb-20"
            >
              Account Setting
            </button>
            <div className="text-color-primary font-semibold flex flex-col items-start">
              <button
                onClick={() => setCurrentComponent("addressList")}
                className="w-full text-left p-2 rounded-lg h-10 my-2 hover:bg-color-pink"
              >
                List Address
              </button>
              <button className="w-full text-left p-2 rounded-lg h-10 my-2 hover:bg-color-pink">
                Change Password
              </button>
              <button className="w-full text-left p-2 rounded-lg h-10 my-2 hover:bg-color-pink">
                Checkout List
              </button>
            </div>
          </div>

          <div className="w-1/2 hover:auto h-full bg-color-primary shadow-2xl rounded-lg p-12">
            <h2 className="underline underline-offset-8 text-color-pink text-2xl font-bold mb-8 p-2">
              My Address
            </h2>
            <h2 className="font-bold mb-4 text-color-pink">
              Total Address: {addresses.length}
            </h2>
            <ul>
              {selectedAddress.map((address) => (
                <div
                  key={address.id}
                  className="border border-color-secondary rounded-lg p-8 mb-5 text-color-pink"
                >
                  <label className="text-lg font-semibold mb-3 py-8">
                    Reciever Name
                  </label>
                  <p>{address.user.name}</p>
                  <label className="text-lg font-semibold mb-3 py-8">
                    Descriptions
                  </label>
                  <p>{address.description}</p>
                  <label className="text-lg font-semibold mb-3 py-8">
                    Address Detail
                  </label>
                  <p>{address.detail_address}</p>
                  <label className="text-lg font-semibold mb-3 py-8">
                    Postal Code
                  </label>
                  <p>{address.zip_code}</p>
                  <label className="text-lg font-semibold mb-3 py-8">
                    City
                  </label>
                  <p>{address.city.name}</p>
                  <label className="text-lg font-semibold mb-3 py-8">
                    Province
                  </label>
                  <p>{address.province.name}</p>
                  <button
                    className="text-red-500 shadow-sm border p-2 my-8 mr-4 rounded-md text-color-pink hover:bg-color-red hover:transition-all hover:text-color-primary"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    Delete
                  </button>
                  <button
                    className=" shadow-sm border p-2 my-8 rounded-md text-color-pink hover:bg-color-customRed hover:transition-all hover:text-color-primary"
                    onClick={() => handleUpdateAddress(address.id)}
                  >
                    Update
                  </button>
                </div>
              ))}
            </ul>

            <div className="flex justify-between mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:bg-gray-100 disabled:text-gray-400"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={startPage + itemsPerPage >= addresses.length}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:bg-gray-100 disabled:text-gray-400"
              >
                Next
              </button>
            </div>
            <button
              className="text-color-primary w-1/4 font-semibold rounded-lg h-10 bg-color-pink mt-2 shadow-md hover:bg-color-customRed"
              onClick={() => setCurrentComponent("addAddress")}
            >
              Add Address
            </button>
          </div>
        </div>
      )}
      {showUpdateAddress && (
        <UpdateAddress
          addressId={selectedId}
          onClose={() => setShowUpdateAddress(false)}
          setCurrentComponent={setCurrentComponent}
        />
      )}
    </>
  );
};

export default AddressList;

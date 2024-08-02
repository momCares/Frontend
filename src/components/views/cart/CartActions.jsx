import React, { useState, useEffect } from "react";
import { findAllAddress } from "@/modules/fetch/fetchAddress";

export default function CartActions({ userId }) {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        console.log("Fetching addresses for userId:", userId);
        const data = await findAllAddress(userId);
        console.log("Fetched addresses:", data);
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userId]);

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  return (
    <div className="flex flex-col bg-color-primary md:px-10 px-3 py-3 rounded-lg w-full shadow-md">
      <div className="text-color-customRed font-bold flex flex-row gap-2 items-center">
        <h2>Pilih Alamat Pengiriman</h2>
      </div>
      <div className="mt-3">
        <select
          className="w-full px-4 py-2 rounded-lg border-color-grey focus:outline-none focus:border-color-green"
          value={selectedAddress}
          onChange={handleAddressChange}
        >
          <option value="" disabled>
            Pilih alamat
          </option>
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.description || "Alamat Tidak Diketahui"}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Tidak ada alamat tersedia
            </option>
          )}
        </select>
      </div>
    </div>
  );
}

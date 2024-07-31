import React, { useState, useEffect } from "react";
import Select from "react-select";
import { createAddress } from "@/modules/fetch/fetchAddress";
import axiosInstance from "@/libs/axios/axiosInstance";

const AddAddress = ({
  onClose,
  setCurrentComponent,
  addresses,
  setAddresses,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [cityResponse, provinceResponse] = await Promise.all([
          axiosInstance.get("/cities"),
          axiosInstance.get("/provinces"),
        ]);

        const cityData = cityResponse.data;
        const provinceData = provinceResponse.data;

        const fetchedCityOptions = cityData.map((city) => ({
          value: city.id,
          label: city.name,
        }));
        const fetchedProvinceOptions = provinceData.map((province) => ({
          value: province.id,
          label: province.name,
        }));

        setCityOptions(fetchedCityOptions);
        setProvinceOptions(fetchedProvinceOptions);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAddress = {
      title: title,
      description: description,
      detail_address: detailAddress,
      city_id: selectedCity?.value,
      zip_code: Number(zipCode),
      province_id: selectedProvince?.value,
    };

    try {
      const createdAddress = await createAddress(newAddress);
      setAddresses([...addresses, createdAddress]);
      console.log("Address created:", createdAddress);
      setCurrentComponent("addressList");
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-12 bg-color-primary shadow-lg rounded-lg p-6 sm:p-8">
      <h1 className="text-2xl font-bold mb-4 text-color-pink">Add Address</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your address title"
            className="p-2 border rounded-lg w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Descriptions</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your address"
            className="p-2 border rounded-lg w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Detail Address</label>
          <input
            type="text"
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            placeholder="Enter your address"
            className="p-2 border rounded-lg w-full"
          />
        </div>

        <div>
          <label className="font-semibold">City</label>
          <Select
            options={cityOptions}
            value={selectedCity}
            onChange={setSelectedCity}
            placeholder="Select city"
            className="mt-1 w-full text-color-pink rounded-md border border-color-customRed"
          />
        </div>

        <div>
          <label className="font-semibold">Province</label>
          <Select
            options={provinceOptions}
            value={selectedProvince}
            onChange={setSelectedProvince}
            placeholder="Select province"
            className="mt-1 w-full text-color-pink rounded-md border border-color-customRed"
          />
        </div>

        <div>
          <label className="font-semibold">Postal Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter your postal code"
            className="p-2 border rounded-lg w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-color-primary text-color-pink border-2 rounded-lg h-10 hover:bg-color-customRed hover:text-color-primary col-span-2 mt-8"
        >
          Add Address
        </button>
      </form>
      <button
        onClick={onClose}
        className="w-full mt-4 bg-color-customRed text-color-primary rounded-lg h-10 hover:bg-color-primary hover:border-2 border-color-pink hover:text-color-pink"
      >
        Cancel
      </button>
    </div>
  );
};

export default AddAddress;

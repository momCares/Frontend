import React, { useEffect, useState } from "react";
import { updateAddress, findOneAddress } from "@/modules/fetch/fetchAddress";
import Select from "react-select";
import axiosInstance from "@/libs/axios/axiosInstance";

const UpdateAddress = ({ addressId, onClose, setCurrentComponent }) => {
  const [receiverName, setReceiverName] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [description, setDescription] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [postalCode, setPostalCode] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      try {
        const address = await findOneAddress(addressId);
        console.log("Address ID in UpdateAddress:", addressId);
        setReceiverName(address.user?.name);
        setDescription(address.description);
        setDetailAddress(address.detail_address);
        setSelectedCity({ value: address.city.name, label: address.city.name });
        setSelectedProvince({
          value: address.province.name,
          label: address.province.name,
        });
        setPostalCode(address.zip_code);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

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

    getAddress();
    fetchOptions();
  }, [addressId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedAddress = await updateAddress(addressId, {
        description: description,
        detail_address: detailAddress,
        city_id: selectedCity.value,
        province: selectedProvince.value,
        zip_code: Number(postalCode),
      });
      console.log("Address updated:", updatedAddress);
      setCurrentComponent("addressList");
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start bg-color-secondary w-full py-20">
      <div className="w-full lg:w-4/12 lg:h-screen lg:p-10">
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

      <div className="w-full lg:w-8/12 flex items-center">
        <div className="w-full max-w-lg bg-white shadow-md bg-color-primary rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-color-pink">
            Update Address
          </h2>
          <form
            onSubmit={handleUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="font-bold text-color-pink">Receiver Name</label>
              <input
                type="text"
                value={receiverName}
                placeholder="Enter receiver name"
                className="border-2 border-color-customRed rounded-lg p-2 w-full text-color-pink"
                disabled
              />
            </div>

            <div>
              <label className="font-bold text-color-pink">Postal Code</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                placeholder="Enter address"
                className="border-2 border-color-customRed rounded-lg p-2 w-full text-color-pink"
              />
            </div>

            <div>
              <label className="font-bold text-color-pink">City</label>
              <Select
                options={cityOptions}
                value={selectedCity}
                onChange={setSelectedCity}
                placeholder="Select city"
                className="mt-1 w-full text-color-pink rounded-md border border-color-customRed"
              />
            </div>

            <div>
              <label className="font-bold text-color-pink">Province</label>
              <Select
                options={provinceOptions}
                value={selectedProvince}
                onChange={setSelectedProvince}
                placeholder="Select province"
                className="mt-1 w-full text-color-pink rounded-md border border-color-customRed"
              />
            </div>

            <div className="col-span-2">
              <label className="font-bold text-color-pink">Descriptions</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter descriptions"
                className="border-2 border-color-customRed rounded-lg p-2 w-full text-color-pink"
              />
            </div>

            <div className="col-span-2">
              <label className="font-bold text-color-pink">
                Detail Address
              </label>
              <input
                type="text"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                placeholder="Enter address"
                className="border-2 border-color-customRed rounded-lg p-2 w-full text-color-pink"
              />
            </div>

            <div className="flex justify-center gap-4 col-span-2 mt-4">
              <button
                type="submit"
                className="w-1/3 rounded-lg h-10 text-color-primary bg-color-customRed hover:bg-color-primary hover:text-color-pink hover:border-2 my-2 shadow-md"
              >
                Update
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 rounded-lg h-10 border-2 border-color-customRed hover:transition-all hover:text-color-pink hover:bg-color-customRed hover:text-color-primary my-2 shadow-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAddress;

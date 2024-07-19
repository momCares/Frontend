import React, { useState } from "react";
import momCaresLogo from "@/assets/momcares_logo.png";
import Image from "next/image";

const EditProfile = ({ user, handleUpdateUser, cancelEdit }) => {
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting form with data: ", formData);
    handleUpdateUser(formData);
  };

  return (
    <>
      <div className="w-full flex flex-row my-20 gap-4 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 flex flex-col h-auto mb-4 p-12 rounded-lg shadow-2xl bg-color-primary"
        >
          <h2 className="underline underline-offset-8 text-color-pink text-2xl font-bold mb-8 p-2">
            Edit Profile
          </h2>
          <div className="mb-4 w-1/2">
            <label className="block text-color-pink text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-color-grey-200 shadow-md p-3"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block text-color-pink text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-color-grey-200 shadow-md p-3"
            />
          </div>
          <div className="flex flex-row gap-4 w-1/3 mt-8">
            <button
              type="submit"
              className="text-color-primary w-full font-semibold rounded-lg h-10 bg-color-pink my-2 shadow-sm hover:bg-color-customRed"
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-color-primary w-full font-semibold rounded-lg h-10 bg-color-pink my-2 shadow-sm hover:bg-color-customRed"
            >
              Cancel
            </button>
          </div>
        </form>
        <div className=" w-1/2 items-center justify-center flex">
          <Image
            src={momCaresLogo}
            width={500}
            height={300}
            className="rounded-xl p-5"
            alt="Auth Image"
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;

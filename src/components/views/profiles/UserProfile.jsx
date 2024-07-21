"use client";

import React from "react";
import { useRouter } from "next/navigation";

const DetailProfile = ({ user, enterEditMode, editMode, isAdmin }) => {
  const router = useRouter();

  const handleAddProductClick = () => {
    router.push("/admin/add-products");
  };

  return (
    <div className="bg-color-secondary flex flex-row items-center px-8 w-full py-2">
      <div className="w-4/12 h-screen p-10">
        <h2 className="underline underline-offset-8 text-color-primary flex flex-row text-2xl font-bold mb-20">
          Account Setting
        </h2>
        <div className="text-color-primary font-semibold flex flex-col items-start">
          <button className="w-full text-left p-2 rounded-lg h-10 my-2 hover:bg-color-pink">
            List Address
          </button>
          <button className="w-full text-left p-2 rounded-lg h-10 my-2 hover:bg-color-pink">
            Change Password
          </button>
          <button className="w-full text-left p-2 rounded-lg h-10 my-2 hover:bg-color-pink">
            Checkout List
          </button>
          {isAdmin && (
            <button
              onClick={handleAddProductClick}
              className="w-full text-left p-2 rounded-lg h-10 my-2 hover:bg-color-pink"
            >
              Add Product
            </button>
          )}
        </div>
      </div>

      <div className="w-1/2 hover:auto h-full bg-color-primary shadow-2xl rounded-lg p-12">
        <h2 className="underline underline-offset-8 text-color-pink text-2xl font-bold mb-8 p-2">
          My Profile
        </h2>

        <div className="flex justify-center gap-4">
          <img
            className="w-36 h-36 rounded-full"
            src="https://bit.ly/code-beast"
            alt="Profile"
          />
          <div className="flex flex-col p-2 w-52">
            <button className="text-color-primary w-full font-semibold rounded-lg h-10 bg-color-pink my-2 shadow-sm hover:bg-color-customRed">
              Change Picture
            </button>
            <button className="text-color-primary w-full font-semibold rounded-lg h-10 bg-color-pink shadow-sm hover:bg-color-red">
              Delete Picture
            </button>
          </div>
        </div>

        <form className="py-4">
          <div className="mb-4">
            <label
              className="block text-color-pink text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <p
              className="w-2/5 bg-color-grey-200 shadow-md p-3"
              aria-placeholder="User Data Here"
            >
              {user.name}
            </p>
          </div>
          <div className="mb-8">
            <label
              className="block text-color-pink text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <p
              className="w-2/5 bg-color-grey-200 shadow-md p-3"
              aria-placeholder="User Email Here"
            >
              {user.email}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={enterEditMode}
              className="text-color-primary w-1/4 font-semibold rounded-lg h-10 bg-color-pink mt-2 shadow-md hover:bg-color-customRed"
            >
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailProfile;

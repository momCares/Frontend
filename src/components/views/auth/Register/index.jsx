"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayout from "@/components/layouts/AuthLayout";
import axiosInstance from "@/libs/axios/axiosInstance";
import { CheckCircle, XCircle } from "@phosphor-icons/react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showAffiliateCode, setShowAffiliateCode] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    const form = event.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    if (showAffiliateCode && form.affiliateCode.value) {
      data.affiliateCode = form.affiliateCode.value;
    }

    console.log("Form data:", data); // Log form data

    try {
      const result = await axiosInstance.post("/auth/register", data);
      console.log("Response:", result); // Log response

      if (result.status === 201) {
        form.reset();
        setSuccessMessage("Registration successful. Redirecting to login...");
        setTimeout(() => {
          window.location.replace("/auth/login");
        }, 2000);
      } else {
        setIsLoading(false);
        setError(result.data.message || "Email is already registered");
        console.error("Error:", result.data.message); // Log error message
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Catch error:", error); // Log catch error
      if (error.response) {
        setError(
          error.response.data.message ||
            "Something went wrong. Please try again."
        );
        console.error("Response error:", error.response.data.message); // Log response error
      } else if (error.request) {
        setError("No response received from server. Please try again.");
        console.error("Request error:", error.request); // Log request error
      } else {
        setError("Something went wrong. Please try again.");
        console.error("General error:", error.message); // Log general error
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleAffiliateCodeVisibility = () => {
    setShowAffiliateCode((prevState) => !prevState);
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Sudah punya akun? "
      linkName="Login"
    >
      {error && (
        <p className=" flex gap-2 items-center border rounded-md border-color-red p-3 mb-5 text-color-red text-xs bg-color-red bg-opacity-10 ">
          <XCircle size={20} /> {error}
        </p>
      )}
      {successMessage && (
        <p className="flex gap-2 items-center border border-color-green rounded-md p-3 mb-5 text-color-green text-xs bg-color-green bg-opacity-10">
          <CheckCircle size={20} />
          {successMessage}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className="text-color-pink font-bold">
            Name
          </label>
          <Input
            label="Name"
            name="name"
            type="text"
            placeholder="Name"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="email" className="text-color-pink font-bold">
            Email
          </label>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="password" className="text-color-pink font-bold">
            Password
          </label>
          <div className="relative">
            <Input
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-2 py-1 focus:outline-none mb-4"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            onClick={toggleAffiliateCodeVisibility}
            className="w-full rounded-lg h-10 bg-color-customRed hover:bg-color-primary text-color-primary hover:text-color-pink hover:border-2 my-2"
          >
            {showAffiliateCode ? "Hide Affiliate Code" : "Enter Affiliate Code"}
          </Button>
          {showAffiliateCode && (
            <div className="flex flex-col gap-3">
              <label
                htmlFor="affiliateCode"
                className="text-color-pink font-bold"
              >
                Affiliate Code
              </label>
              <Input
                label="Affiliate Code"
                name="affiliateCode"
                type="text"
                placeholder="Affiliate Code"
              />
            </div>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          className="w-full rounded-lg h-10 bg-color-customRed hover:bg-color-primary text-color-primary hover:text-color-customRed hover:border-2 my-2"
        >
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;

"use client";

import React, { useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import axiosInstance from "@/libs/axios/axiosInstance";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    const form = event.target;
    const data = {
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const result = await axiosInstance.post("/auth/login", data);

      if (result.status === 200 && result.data.token) {
        form.reset();
        setSuccessMessage("Login successful. Redirecting...");
        localStorage.setItem("token", result.data.token);
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      } else {
        setIsLoading(false);
        setError(result.data.message || "Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        setError(
          error.response.data.message || "Email or password is incorrect"
        );
      } else if (error.request) {
        setError("No response received from server. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Belum punya akun? "
      linkName="Register"
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
              className="absolute mb-4 inset-y-0 right-2 flex items-center text-gray-500 focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          className="w-full rounded-lg h-10 bg-color-customRed hover:bg-color-secondary text-color-primary mt-2 mb-8"
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginView;

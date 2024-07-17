import React from "react";
import Button from "@/components/ui/Button";

export default function CartSummary({ totalCost }) {
  return (
    <div className="flex fixed lg:flex-col flex-row justify-between items-start h-auto lg:bottom-auto bottom-0 lg:right-24 right-0 bg-color-primary lg:shadow-md shadow-inner w-full lg:w-1/4 px-6 pt-8 pb-10 rounded-lg">
      <h2 className="text-color-customRed font-bold lg:text-lg text-xl">
        Total belanja
      </h2>
      <div className="flex flex-col lg:w-full w-1/2 gap-4">
        <h3 className="text-color-customRed flex flex-row items-center justify-between">
          Total: <span className="font-bold truncate">${totalCost}</span>
        </h3>
        <Button className="w-full bg-color-customRed hover:bg-color-greenhover text-color-primary rounded-lg h-8">
          Checkout
        </Button>
      </div>
    </div>
  );
}

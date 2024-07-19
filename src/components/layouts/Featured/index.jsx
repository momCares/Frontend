import React from "react";
import { CardProduct } from "@/components/ui/CardProduct";

const Featured = () => {
  return (
    <div className="text-center bg-color-secondary">
      <div className="text-center ">
        <h1 className="pt-28 pb-10 text-6xl font-bold  text-color-primary">
          Featured
        </h1>
      </div>

      <div>
        <div className="px-10 pb-28 pt-4 h-100 grid grid-cols-5 gap-5 content-between">
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </div>
    </div>
  );
};

export default Featured;

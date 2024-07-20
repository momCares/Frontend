import { useEffect, useState } from "react";
import React from "react";
import CardProduct from "@/components/ui/CardProduct";
import { findAllProduct } from "@/modules/fetch/fetchProduct";

const Featured = () => {
  const [products, setProducts] = useState({ data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await findAllProduct();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-center bg-color-secondary">
      <div className="text-center ">
        <h1 className="pt-28 pb-10 text-6xl font-bold  text-color-primary">
          Featured
        </h1>
      </div>

      <div className="flex flex-row px-10 pb-28 pt-4 h-full">
        <CardProduct products={products} />
      </div>
    </div>
  );
};

export default Featured;

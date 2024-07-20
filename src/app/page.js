"use client";

import CardProduct from "@/components/ui/CardProduct/index";
import Carousel from "@/components/layouts/Carousel";
import Featured from "@/components/layouts/Featured";
import { findAllProduct } from "@/modules/fetch/fetchProduct";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const listProducts = await findAllProduct();
        setProducts(listProducts);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="w-full h-full">
      <title>Mom Cares</title>
      <main>
        <div>
          <ul>
            <li>
              <Carousel />
            </li>
          </ul>
        </div>
      </main>
      <div className="bg-color-secondary py-28 px-8">
        <p className="underline underline-offset-8 text-6xl text-color-primary font-bold text-center">
          Our Product
        </p>
        {error && <p>Error: {error}</p>}
        <CardProduct products={products} />
      </div>
    </div>
  );
}

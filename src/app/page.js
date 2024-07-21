"use client";

import CardProduct from "@/components/ui/CardProduct/index";
import Carousel from "@/components/layouts/Carousel";
import { findAllProduct } from "@/modules/fetch/fetchProduct";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  const handleViewMore = () => {
    router.push("/products");
  };

  return (
    <div className="w-full min-h-screen bg-color-secondary">
      <title>Mom Cares</title>
      <main>
        <Carousel />
      </main>
      <div className="py-12 px-4 md:px-8 lg:px-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-color-primary font-bold text-center mb-8">
          Our Product
        </h1>
        {error && <p className="text-center text-red-500">{error}</p>}
        <CardProduct products={products} limit={4} />
        {products?.data?.products?.length > 4 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleViewMore}
              className="bg-color-primary hover:bg-color-pink text-color-pink hover:text-color-primary font-semibold rounded-lg h-10 px-6 md:px-8 lg:px-10"
            >
              View More...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

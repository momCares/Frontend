"use client";

import CardProduct from "@/components/ui/CardProduct/index";
import CardPromo from "@/components/ui/CardPromo";
import Carousel from "@/components/layouts/Carousel";
import { findAllProduct } from "@/modules/fetch/fetchProduct";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [promos, setPromos] = useState([]);
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

    const fetchPromos = async () => {
      try {
        const token = localStorage.getItem("token"); // Ambil token dari local storage
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/promo`, // Endpoint untuk fetch promos
          {
            headers: {
              Authorization: `Bearer ${token}`, // Sertakan token dalam header Authorization
            },
          }
        );
        setPromos(response.data); // Set data promos ke state atau variable yang sesuai
      } catch (error) {
        setError(error.message); // Tangani kesalahan dengan setError atau metode yang sesuai
      }
    };
    

    fetchProduct();
    fetchPromos();
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
      <div className="bg-color-customRed py-12 px-4 md:px-8 lg:px-16">
        <h1 className="underline underline-offset-8 text-3xl md:text-4xl lg:text-6xl text-color-primary font-bold text-center mb-4 mt-14">
          Get Offers Here!
        </h1>
        <CardPromo promos={promos} limit={3} />
      </div>
      <div className="py-12 px-4 md:px-8 lg:px-16">
        <h1 className="underline underline-offset-8 text-3xl md:text-4xl lg:text-6xl text-color-primary font-bold text-center mb-4 mt-14">
          Our Product
        </h1>
        {error && <p className="text-center text-color-red">{error}</p>}
        <CardProduct products={products} limit={6} />
        {products?.data?.products?.length > 5 && (
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

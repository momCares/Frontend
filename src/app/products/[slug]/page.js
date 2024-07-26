"use client";

import { useState, useEffect } from "react";
import ProductView from "@/components/views/products";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const ProductPage = ({ params }) => {
  const { slug } = params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>{loading ? <LoadingSpinner /> : <ProductView slug={slug} />}</div>
  );
};

export default ProductPage;

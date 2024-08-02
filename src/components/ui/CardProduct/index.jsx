"use client";
import Button from "@/components/ui/Button";
import { Heart, ShoppingCart } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { addToCart } from "@/modules/fetch/fetchCart";
import { convertToRupiah } from "@/libs/convertToRupiah";

const CardProduct = ({ products, limit }) => {
  const productList = products?.data?.products || [];
  const displayedProducts = productList.slice(0, limit);

  const handleAddCart = async (id) => {
    const response = await addToCart({ product_id: id });
  };

  return (
    <div className="place-content-center flex flex-wrap gap-4 mt-10">
      {displayedProducts.length > 0 ? (
        displayedProducts.map((product) => {
          const imageUrl = product.product_images[0]?.url
            ? `${
                process.env.NEXT_PUBLIC_IMAGE_API_URL
              }/${product.product_images[0]?.url.replace(/\\/g, "/")}`
            : "/momcares_logo.png";

          return (
            <div
              key={product.id}
              className="w-full max-w-xs bg-color-primary border border-color-secondary rounded-lg shadow-md flex flex-col justify-between mx-2 my-2"
            >
              <Link href={`/products/${product.slug}`} legacyBehavior>
                <div className="hover:cursor-pointer">
                  <img
                    src={imageUrl}
                    className="p-4 rounded-t-lg h-48 w-full object-cover"
                    alt={product.name}
                    loading="lazy"
                  />
                  <div className="px-4 py-3">
                    <h5 className="text-lg font-bold tracking-tight text-color-pink truncate">
                      {product.name}
                    </h5>
                    <p className="text-xs text-color-pink font-semibold mt-2 truncate">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex flex-col px-4 pb-3">
                <h5 className="text-sm font-bold text-color-pink">
                  <span>{convertToRupiah(product.price)}</span>
                </h5>
                <div className="flex justify-between gap-2 pt-2">
                  <Button className="flex border-2 border-color-pink justify-center items-center text-color-red gap-1 py-1 px-1 rounded-lg">
                    <Heart size={24} weight="fill" />
                  </Button>
                  <Button
                    onClick={(e) => handleAddCart(product.id)}
                    className="flex bg-color-pink justify-center items-center text-color-primary gap-1 py-1 px-1 rounded-lg"
                  >
                    <ShoppingCart size={24} />
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-white">No products available.</p>
      )}
    </div>
  );
};

export default CardProduct;

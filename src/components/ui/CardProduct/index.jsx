"use client";
import Button from "@/components/ui/Button";
import { Heart, ShoppingCart } from "@phosphor-icons/react";
import Link from "next/link";

const CardProduct = ({ products }) => {
  // console.log(products);

  const productList = products?.data?.products || [];

  return (
    <div className="place-content-center flex flex-wrap mt-8">
      {productList.length > 0 ? (
        productList.map((product) => {
          const imageUrl = product.product_images[0]?.url
            ? `${
                process.env.NEXT_PUBLIC_IMAGE_API_URL
              }/${product.product_images[0]?.url.replace(/\\/g, "/")}`
            : "/momcares_logo.png";

          return (
            <div
              key={product.id}
              className="w-full max-w-xs bg-color-primary border border-color-secondary rounded-lg shadow-md flex flex-col justify-between mx-3 my-2"
            >
              <Link href={`/products/${product.id}`}>
                <img
                  src={imageUrl}
                  className="p-8 rounded-t-lg h-60 w-full object-cover"
                  alt={product.name}
                  loading="lazy"
                />
                <div className="px-8 py-5">
                  <h5 className="text-xl font-bold tracking-tight text-color-pink">
                    {product.name}
                  </h5>
                  <p className="text-sm text-color-pink font-semibold mt-4">
                    {product.description}
                  </p>
                </div>
              </Link>
              <div className="flex flex-col px-8 pb-5">
                <h5 className="text-xl font-bold text-color-pink">
                  Rp. <span>{product.price.toLocaleString("id-ID")}</span>
                </h5>
                <div className="flex justify-end gap-4 pt-4">
                  <Button className="flex border-2 border-color-pink justify-center items-center text-color-red gap-2 py-2 px-2 rounded-lg">
                    <Heart size={32} weight="fill" />
                  </Button>
                  <Button className="flex bg-color-pink justify-center items-center text-color-primary gap-2 py-2 px-2 rounded-lg">
                    <ShoppingCart size={32} />
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

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Heart, ShareNetwork, Star } from "@phosphor-icons/react";
import Diapers from "@/assets/Diapers.jpg";

const ProductView = () => {
  const [quantity, setQuantity] = useState(1);

  const handleWishlistClick = () => {
    console.log("Added to wishlist");
  };

  const handleShareClick = () => {
    console.log("Shared product");
  };

  const handleAddToCart = () => {
    console.log("Added to cart");
  };

  const handleBuyNow = () => {
    console.log("Buy now");
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <header className="flex justify-center bg-color-secondary md:py-24 py-48 md:px-10 px-6">
      <div className="rounded-md flex flex-wrap w-auto justify-between shadow-2xl bg-color-primary md:px-14 px-3 py-4">
        <div className="flex flex-col md:w-2/5 w-full md:py-10 py-2">
          <Image
            src={Diapers}
            className="border-2 border-color-pink shadow-xl rounded-xl w-full h-full object-cover"
          />
          <div className="pt-2 text-color-pink font-semibold flex flex-col gap-2 w-full mt-4">
            <h3 className="font-semibold">Product Details :</h3>
            <p className="text-sm line-clamp-2">Popok bayi</p>
            <h3 className="font-semibold text-color-grey">Description :</h3>
            <p className="text-sm line-clamp-2">
              Popok bayi yang memiliki tingkat kenyamanan yang tinggi dan nyaman
              dipakai setiap hari
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between md:py-10 py-2 md:w-1/2 w-full">
          <div className="text-color-pink font-semibold flex flex-col gap-4">
            <h2 className="font-semibold text-3xl">Diapers</h2>
            <div className="flex flex-row gap-1">
              <Star size={16} weight="fill" className=" text-color-gold" />
              <p className="text-center text-sm">
                4,5 <span>(350 rating)</span>
              </p>
            </div>
            <div className="flex flex-row gap-2 text-color-grey">
              <Button onClick={handleWishlistClick}>
                <Heart
                  size={30}
                  weight="fill"
                  className="border border-color-grey  rounded-md p-1"
                />
              </Button>
              <Button onClick={handleShareClick}>
                <ShareNetwork
                  size={30}
                  className="border border-color-grey  rounded-md p-1"
                />
              </Button>
            </div>
            <span className="text-3xl font-medium">Rp. 200.000,00</span>
          </div>
          <div className="text-color-pink flex flex-col gap-4 my-14">
            <h3 className="font-semibold">Size</h3>
            <Button className="text-color-pink border border-color-pink hover:bg-color-pink hover:text-color-primary rounded-lg h-8 md:w-24 w-32 ">
              All Size
            </Button>
          </div>
          <div className="text-color-pink flex flex-col gap-4">
            <h3 className="font-semibold">Atur jumlah</h3>
            <div className="flex md:flex-row flex-col items-center justify-between gap-4">
              <div className="flex flex-row">
                <div>
                  <div className="flex flex-row relative items-center justify-center ">
                    <Button
                      onClick={handleDecrease}
                      className="w-9 h-9 absolute start-0 rounded-md hover:text-color-red"
                    >
                      -
                    </Button>
                    <input
                      className="border border-color-customRed focus:outline-none focus:border-color-red text-center w-28 h-9 py-2 px-6 rounded-lg text-color-pink"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                    <Button
                      onClick={handleIncrease}
                      className="w-9 h-9 absolute end-0 rounded-md hover:text-color-red"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold">
                Subtotal : Rp. {quantity * 100000}
              </h3>
            </div>
            <div className="flex flex-row items-center justify-between gap-5 mt-14">
              <Button
                onClick={handleAddToCart}
                className="border border-color-pink hover:bg-color-pink hover:text-color-primary text-color-pink rounded-lg h-10 md:w-52 w-32 "
              >
                + Keranjang
              </Button>
              <Button
                onClick={handleBuyNow}
                className="bg-color-customRed hover:bg-color-pink text-color-primary rounded-lg h-10 md:w-52 w-32 "
              >
                Beli Sekarang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProductView;

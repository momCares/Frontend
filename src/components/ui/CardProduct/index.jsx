"use client";
import Button from "@/components/ui/Button";
import { Heart, ShoppingCart } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

export const CardProduct = () => {
  return (
    <header className="w-full max-w-xs bg-color-customRed border border-color-secondary rounded-lg shadow-md flex flex-col justify-between mx-3 my-2">
      <Link href={"/product/:id"}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRKGLPQvjmD9eT1EYNrLd-ZE5ZWPcPQfA3zg&s"
          className="p-10 rounded-t-lg h-60 w-full object-cover"
          alt="product"
          loading="lazy"
        />
        <div className="px-8 pb-5 text-color-primary font-semibold">
          <h5 className="text-xl font-semibold tracking-tight text-dark mb-2">
            Diapers
          </h5>
          <p className="text-sm text-dark">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque,
            dolor.
          </p>
        </div>
      </Link>
      <div className="text-color-primary flex flex-col px-8 pb-5">
        <h5 className="text-xl font-bold text-dark">
          Rp. <span>1000</span>
        </h5>
        <div className="flex justify-end gap-2 mt-8">
          <Button className="flex bg-color-primary justify-center items-center text-color-red gap-2 py-2 px-2 rounded-lg">
            <Heart size={32} weight="fill" />
          </Button>
          <Button className="flex bg-color-primary justify-center items-center text-color-dark gap-2 py-2 px-2 rounded-lg">
            <ShoppingCart size={32} />
          </Button>
        </div>
      </div>
    </header>
  );
};

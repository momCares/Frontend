"use client";
import React from "react";
import Button from "@/components/ui/Button";
import { Trash } from "@phosphor-icons/react";
import {
  deleteProduct,
  findOneCart,
  updateCart,
} from "@/modules/fetch/fetchCart";
import { convertToRupiah } from "@/libs/convertToRupiah";
import { useState } from "react";

export default function CartItem({
  carts,
  selectedItems,
  handleSelectItem,
  // removeFromCart,
  setQuantity,
  setCarts,
  setTotalCost,
  setNetPrice,
}) {
  // const [stock, setStock] = useState(1)

  const handleDelete = async (id) => {
    const response = await deleteProduct({ product_id: id });
    const listCarts = await findOneCart();
    setCarts(listCarts);
    setTotalCost(listCarts.data.cart.total_cost);
    setNetPrice(listCarts.data.cart.net_price);
  };

  const handleUpdateStock = async ({ product_id, quantity }) => {
    // stock must > 0

    if (quantity <= 0) return;

    const response = await updateCart({
      product_id: product_id,
      quantity: quantity,
    });
    const listCarts = await findOneCart();
    setCarts(listCarts);
    setTotalCost(listCarts.data.cart.total_cost);
    setNetPrice(listCarts.data.cart.net_price);
  };

  const cartLists = carts?.data?.data || [];
  return (
    <div className=" px-3 md:py-10  py-4 bg-color-primary shadow-md w-full rounded-lg">
      {cartLists.length > 0 ? (
        cartLists.map((cart) => {
          return (
            <div className="flex justify-between md:flex-row flex-col gap-2 md:px-10 px-3 md:py-10 py-4 bg-color-primary shadow-md w-full rounded-lg">
              <div className="flex flex-row gap-2"></div>
              <div className="flex items-center gap-3 w-full">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRKGLPQvjmD9eT1EYNrLd-ZE5ZWPcPQfA3zg&s"
                  alt={cart.product.name}
                  className="border-color-customRed border md:w-[100px] w-[60px]"
                />
                <div className="w-full">
                  <div className="text-color-pink font-bold text-lg w-48 line-clamp-2">
                    {cart.product.name}
                  </div>
                  <span className="font-normal text-[12px] text-color-customRed border px-1 rounded-sm border-color-customRed">
                    Bebas pengembalian
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end md:gap-5 gap-2">
                <h4 className="text-color-customRed text-lg">
                  {convertToRupiah(cart.product.price * cart.quantity)}
                </h4>
                <div className="flex flex-row gap-3">
                  <Button
                    className="text-color-grey hover:text-color-red"
                    onClick={(e) => handleDelete(cart.product.id)}
                  >
                    <Trash size={20} />
                  </Button>
                  <div className="flex flex-row relative items-center justify-center ">
                    <Button
                      className="w-7 h-7 absolute start-0 rounded-md hover:text-color-green"
                      onClick={() =>
                        handleUpdateStock({
                          product_id: cart.product.id,
                          quantity: cart.quantity - 1,
                        })
                      }
                    >
                      -
                    </Button>
                    <input
                      className="border border-color-grey focus:outline-none focus:border-color-green text-center w-20 h-7 py-2 px-6 rounded-lg text-color-dark"
                      value={cart.quantity}
                      onChange={(e) =>
                        setQuantity(product, parseInt(e.target.value))
                      }
                    />
                    <Button
                      className="w-7 h-7 absolute end-0 rounded-md hover:text-color-green"
                      onClick={() =>
                        handleUpdateStock({
                          product_id: cart.product.id,
                          quantity: cart.quantity + 1,
                        })
                      }
                    >
                      +
                    </Button>
                  </div>
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
}

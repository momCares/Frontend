import React from "react";
import Button from "@/components/ui/Button";
import { Trash } from "@phosphor-icons/react";

export default function CartItem({
  product,
  selectedItems,
  handleSelectItem,
  removeFromCart,
  setQuantity,
}) {
  return (
    <div className="flex justify-between md:flex-row flex-col gap-2 md:px-10 px-3 md:py-10 py-4 bg-color-primary shadow-md w-full rounded-lg">
      <div className="flex flex-row gap-2">
        <input
          className="custom-checkbox"
          type="checkbox"
          checked={selectedItems.includes(product.name)}
          onChange={(e) => handleSelectItem(e, product.name)}
        />
        <div className="flex items-center gap-3 w-full">
          <img
            src={product.image}
            alt={product.name}
            className="border-color-customRed border md:w-[100px] w-[60px]"
          />
          <div className="w-full">
            <div className="text-color-pink font-bold text-lg w-48 line-clamp-2">
              {product.name}
            </div>
            <span className="font-normal text-[12px] text-color-customRed border px-1 rounded-sm border-color-customRed">
              Bebas pengembalian
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end items-end md:gap-5 gap-2">
        <h4 className="text-color-customRed text-xl font-bold">
          ${product.cost}
        </h4>
        <div className="flex flex-row gap-3">
          <Button
            className="text-color-grey hover:text-color-red"
            onClick={() => removeFromCart(product)}
          >
            <Trash size={20} />
          </Button>
          <div className="flex flex-row relative items-center justify-center ">
            <Button
              className="w-7 h-7 absolute start-0 rounded-md hover:text-color-green"
              onClick={() => setQuantity(product, product.quantity - 1)}
            >
              -
            </Button>
            <input
              className="border border-color-grey focus:outline-none focus:border-color-green text-center w-20 h-7 py-2 px-6 rounded-lg text-color-dark"
              value={product.quantity}
              onChange={(e) => setQuantity(product, parseInt(e.target.value))}
            />
            <Button
              className="w-7 h-7 absolute end-0 rounded-md hover:text-color-green"
              onClick={() => setQuantity(product, product.quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import CartItem from "@/components/views/cart/CartItem";
import CartSummary from "@/components/views/cart/CartSummary";
import CartActions from "@/components/views/cart/CartActions";
import { useRouter } from "next/navigation";
import { findOneCart } from "@/modules/fetch/fetchCart";

export default function CartsView({ setCart }) {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [carts, setCarts] = useState([]); 
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const listCarts = await findOneCart();
        setCarts(listCarts);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCart();
  }, []);

  const cart = [
    {},
  ];

  const getTotalCost = () => {
    return cart?.reduce((sum, { cost, quantity }) => sum + cost * quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
    setSelectedItems([]);
    setSelectAll(false);
  };

  const setQuantity = (product, amount) => {
    if (amount < 1) return;
    const newCart = cart.map((item) =>
      item.name === product.name ? { ...item, quantity: amount } : item
    );
    setCart(newCart);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
    setSelectedItems((prevSelected) =>
      prevSelected.filter((name) => name !== productToRemove.name)
    );
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedItems(cart.map((product) => product.name));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (e, productName) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedItems((prevSelected) => [...prevSelected, productName]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((name) => name !== productName)
      );
    }
  };

  return (
    <header className="md:pt-28 pt-48 lg:px-24 md:px-14 px-5 w-full min-h-screen bg-color-secondary">
      <h1 className="text-color-primary md:text-[32px] text-[22px] font-medium mb-6">
        Keranjang Anda
      </h1>
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col items-start md:gap-3 gap-2 lg:w-8/12 w-full ">
          <CartActions
            selectAll={selectAll}
            handleSelectAll={handleSelectAll}
            clearCart={clearCart}
            selectedItems={selectedItems}
          />

          <CartItem
              carts={carts}
              selectedItems={selectedItems}
              handleSelectItem={handleSelectItem}
              removeFromCart={removeFromCart}
              setQuantity={setQuantity}
            />
        </div>

        <CartSummary totalCost={getTotalCost()} />
      </div>
    </header>
  );
}

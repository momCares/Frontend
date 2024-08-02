"use client";

import React, { useEffect, useState } from "react";
import CartItem from "@/components/views/cart/CartItem";
import CartSummary from "@/components/views/cart/CartSummary";
import CartActions from "@/components/views/cart/CartActions";
import { useRouter } from "next/navigation";
import { findOneCart } from "@/modules/fetch/fetchCart";
import { findAllAddress } from "@/modules/fetch/fetchAddress";

export default function CartsView({ setCart }) {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [carts, setCarts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [netPrice, setNetPrice] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const listCarts = await findOneCart();
        setTotalCost(listCarts.data.cart.total_cost);
        setNetPrice(listCarts.data.cart.net_price);
        setCarts(listCarts);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCart();
  }, []);

  // Addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await findAllAddress();
        console.log("Fetched addresses:", data);
        setAddresses(data);
      } catch (error) {
        setError("Error fetching addresses");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const cart = [{}];

  const getTotalCost = () => {
    return cart?.reduce((sum, { cost, quantity }) => sum + cost * quantity, 0);
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

  return (
    <header className="md:pt-28 pt-48 lg:px-24 md:px-14 px-5 w-full min-h-screen bg-color-secondary">
      <h1 className="text-color-primary md:text-[32px] text-[22px] font-medium mb-6">
        Keranjang Anda
      </h1>
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col items-start md:gap-3 gap-2 lg:w-8/12 w-full ">
          <CartActions addresses={addresses} />

          <CartItem
            carts={carts}
            selectedItems={selectedItems}
            removeFromCart={removeFromCart}
            setCarts={setCarts}
            setQuantity={setQuantity}
            setTotalCost={setTotalCost}
            setNetPrice={setNetPrice}
          />
        </div>

        <CartSummary totalCost={totalCost} netPrice={netPrice} />
      </div>
    </header>
  );
}

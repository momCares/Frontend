"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { Heart, ShareNetwork, ShoppingCart, Star } from "@phosphor-icons/react";
import { updateCart, findOneCart } from "@/modules/fetch/fetchCart";
import { getUser } from "@/modules/fetch/fetchUser";
import { findOneProduct } from "@/modules/fetch/fetchProduct";
import { jwtDecode } from "jwt-decode";

const ProductView = ({ slug }) => {
  const [cart, setCart] = useState(null);
  const [userId, setUserId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const decodedToken = jwtDecode(token);
        const getUserId = decodedToken.id;
        try {
          const userData = await getUser(getUserId);
          setUserId(userData.id);
        } catch (err) {
          console.error("Error fetching user data:", err.message);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await findOneProduct(slug);
        const cartData = await findOneCart(userId);
        setCart(cartData?.data);
        setProduct(productData.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    if (slug && userId) {
      fetchProduct();
    }
  }, [slug, userId]);

  const handleWishlistClick = () => {
    console.log("Added to wishlist");
  };

  const handleShareClick = () => {
    console.log("Shared product");
  };

  const handleAddToCart = async () => {
    try {
      let updatedItems = [...(cart?.shopping_items || [])];
      const productIndex = updatedItems.findIndex(
        (item) => item.product_id === product.id
      );

      if (productIndex > -1) {
        updatedItems[productIndex].quantity += quantity;
      } else {
        updatedItems.push({
          product_id: product.id,
          quantity: quantity,
        });
      }

      const newCart = await updateCart(cart.id, {
        address_id: cart.address_id,
        courier_id: cart.courier_id,
        shipping_method: cart.shipping_method,
        shopping_items: updatedItems,
      });

      setCart(newCart);
      console.log("Added to cart");
      alert(`Product ${product.name} Added to cart`);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleBuyNow = async () => {
    if (product) {
      try {
        await buyNow(product.id, quantity);
        console.log("Proceeding to checkout");
      } catch (error) {
        console.error("Error proceeding to checkout:", error);
      }
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
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

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  const description = product.description;
  const shortDescription =
    description.length > 200
      ? description.substring(0, 200) + "..."
      : description;

  return (
    <div className="md:py-14 py-24 md:px-28 px-0 bg-color-secondary w-full">
      <div className="flex justify-center w-full md:py-12 py-8 md:px-16 px-6">
        <div className="px-8 py-8 flex lg:flex-row flex-col justify-center md:gap-16 gap-6 w-full bg-color-primary shadow-md rounded-md">
          <Image
            width={500}
            height={500}
            className="md:rounded-l-md rounded-t-md"
            src={product.product_images[0].url || "/placeholder.jpg"}
            alt={product.name}
            priority
          />
          <div className="flex flex-col justify-between py-0 md:py-10 md:pr-14 pr-0">
            <div className="flex flex-col md:gap-4 gap-3">
              <h1 className="md:text-3xl text-2xl font-bold text-color-pink">
                {product.name}
              </h1>
              <p className="text-justify text-sm text-color-pink">
                {showFullDescription ? description : shortDescription}
                {description.length > 200 && (
                  <button
                    onClick={toggleDescription}
                    className="text-color-customRed font-semibold ml-2"
                  >
                    {showFullDescription ? "View Less" : "View More"}
                  </button>
                )}
              </p>
              <div className="flex justify-start items-center gap-1">
                <div className="flex flex-row">
                  <Star
                    size={25}
                    weight="fill"
                    className="text-color-gold w-4"
                  />
                </div>
                <p className="text-sm text-color-pink">4.3</p>
                <p className="text-sm text-color-pink">(123 review)</p>
              </div>
              <div className="flex justify-start gap-3">
                <Button
                  className="border rounded-md border-color-pink text-color-pink flex justify-center items-center font-semibold p-2"
                  onClick={handleWishlistClick}
                >
                  <Heart size={20} weight="fill" />
                </Button>
                <Button
                  className="border rounded-md border-color-pink text-color-gray-300 text-color-pink flex justify-center items-center font-semibold p-2"
                  onClick={handleShareClick}
                >
                  <ShareNetwork size={20} weight="fill" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <p className="md:text-3xl text-2xl font-bold pt-6 text-color-pink">
                Rp. {product.price.toLocaleString()}
              </p>
              <div className="flex justify-between items-center gap-5 text-color-pink">
                Kuantitas
                <div className="flex flex-row relative items-end justify-end">
                  <Button
                    className="w-7 h-7 absolute bottom-1 start-1 rounded-md bg-color-primary hover:bg-color-customRed hover:text-color-primary"
                    onClick={handleDecrease}
                  >
                    -
                  </Button>
                  <input
                    className="w-24 h-9 py-2 pl-4 border-2 border-color-customRed focus:outline-none focus:border-color-customRed text-center rounded-lg text-color-pink"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <Button
                    className="w-7 h-7 absolute bottom-1 end-1 rounded-md bg-color-primary hover:bg-color-customRed hover:text-color-primary"
                    onClick={handleIncrease}
                  >
                    +
                  </Button>
                </div>
                <p className="flex flex-row gap-3 items-end md:text-3xl text-2xl font-bold">
                  <span className="text-lg font-medium">Total</span> Rp.{" "}
                  {(product.price * quantity).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center md:gap-5 gap-3 pt-5">
              <Button
                className="py-2 px-4 h-11 w-full bg-color-customRed hover:bg-color-pink text-color-primary font-semibold rounded-md"
                onClick={handleAddToCart}
              >
                + Keranjang
              </Button>
              <Button
                className="py-2 px-4 w-full h-11 bg-color-primary border-color-customRed border-2 hover:bg-color-pink text-color-pink hover:text-color-primary font-semibold rounded-md"
                onClick={handleBuyNow}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

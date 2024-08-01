"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Tag } from "@phosphor-icons/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardPromo = ({ promos, limit }) => {
  const [countdowns, setCountdowns] = useState({});

  const calculateCountdown = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end - now;

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdowns = {};
      promos?.data?.promo.forEach((promo) => {
        updatedCountdowns[promo.id] = calculateCountdown(promo.end_date);
      });
      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [promos]);

  const handleCopyCode = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => toast.success(`Promo code "${code}" copied to clipboard!`))
      .catch((err) =>
        toast.error("Failed to copy promo code. Please try again.")
      );
  };

  const promoList = promos?.data?.promo || [];
  const displayedPromos = promoList.slice(0, limit);

  return (
    <div className="place-content-center flex flex-wrap gap-4 mt-10">
      {displayedPromos.length > 0 ? (
        displayedPromos.map((promo) => {
          const countdown = countdowns[promo.id] || {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };

          return (
            <div
              key={promo.id}
              className="w-full max-w-xs bg-color-primary border-2 border-color-pink rounded-xl shadow-xl flex flex-col justify-between mx-2 mt-2 mb-14"
            >
              <div className="hover:cursor-pointer">
                <div className="px-4 py-3">
                  <h5 className="text-lg font-bold tracking-tight text-color-pink truncate">
                    {promo.name}
                  </h5>
                  <p className="text-xs text-color-pink font-semibold mt-2 truncate">
                    Code: {promo.code}
                  </p>
                  <p className="text-xs text-color-pink font-semibold mt-2 truncate">
                    Ends in: {countdown.days}d {countdown.hours}h{" "}
                    {countdown.minutes}m {countdown.seconds}s
                  </p>
                </div>
              </div>
              <div className="flex flex-col px-4 pb-3">
                <div className="flex justify-between gap-2 pt-2">
                  <Button
                    onClick={() => handleCopyCode(promo.code)}
                    className="flex justify-center items-center text-color-pink gap-1 py-1 px-1 rounded-lg"
                  >
                    <Tag size={24} />
                    <span>Use Code</span>
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-color-primary text-xl p-32">No promos available.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default CardPromo;

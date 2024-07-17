"use client";

import InputSearch from "@/components/layouts/Navbar/InputSearch";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { BellSimple, ShoppingCart } from "@phosphor-icons/react";

const Navbar = () => {

  return (
    <header className=" md:px-10 px-2 bg-color-customRed z-10 navbar-border w-full shadow-sm">
      <div className="flex md:flex-row flex-col justify-between md:items-center p-4 gap-2">
        <Link
          href="/"
          className="font-bold text-color-primary hover:text-color-greenhover text-2xl"
        >
          Mom Cares
        </Link>
        <div className="flex md:flex-row flex-col justify-between md:items-center md:gap-8 gap-4">
          <div className="flex flex-row justify-between md:gap-8 gap-1 items-center w-full">
            <InputSearch className="border-[2px] border-color-primary focus:border-color-pink focus:outline-none lg:w-[500px] md:w-[300px] w-full" />
            <div className="flex flex-row justify-center items-center md:gap-2 gap-1">
              <Link href="/notif">
                <Button className="text-color-primary hover:bg-color-primary hover:text-color-customRed text-color-grey p-1 rounded-lg">
                  <BellSimple size={26} />
                </Button>
              </Link>
              <Link href="/carts">
                <Button className="text-color-primary hover:bg-color-primary hover:text-color-customRed text-color-grey p-1 rounded-lg">
                  <ShoppingCart size={26} />
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex sm:flex-row justify-between items-center md:items-center gap-3">
            <Link href="/auth/login">
              <Button className="border border-color-primary text-color-primary rounded-lg h-10 md:w-32 w-40 ">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-color-primary text-color-pink rounded-lg h-10 md:w-32 w-40 ">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

"use client";

import InputSearch from "@/components/layouts/NavBar/InputSearch";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <header className="px-10 bg-color-secondary z-10 navbar-border w-full">
      <div className="flex md:flex-row flex-col justify-between md:items-center p-4 gap-2">
        <Link href="/" className="font-bold text-color-primary text-2xl">
          Mom Cares
        </Link>
        <div className="flex md:flex-row flex-col justify-between md:items-center lg:gap-32 md:gap-4 gap-4">
          <InputSearch className="border border-color-primary lg:w-[500px] md:w-[300px] w-full" />
          <div className="flex sm:flex-row justify-between md:items-center gap-3">
            <Link href="/auth/login">
              <Button
                className="border border-color-primary text-color-primary rounded-lg h-10 w-32 "
                onClick={() => (session ? signOut() : signIn())}
              >
                {session ? "Logout" : "Login"}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-color-primary text-color-pink rounded-lg h-10 w-32 ">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

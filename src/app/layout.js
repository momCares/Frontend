"use client";

import { Poppins } from "next/font/google";
import NavBar from "@/components/layouts/NavBar";
import "./globals.css";
import Head from "next/head";
import Footer from "@/components/layouts/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <Head>
        <title>Mom Cares</title>
      </Head>
      <body
        className={`${poppins.className} bg-color-primary`}
        suppressHydrationWarning={true}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

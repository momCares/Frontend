// src/libs/protectedPage.js
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Update the import statement

const protectedPage = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      const checkAdmin = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/");
          return;
        }

        let userId;
        try {
          const decodedToken = jwtDecode(token);
          userId = decodedToken.id; // Adjust according to token structure
        } catch (error) {
          console.error("Error decoding token:", error);
          router.push("/");
          return;
        }

        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.role === "admin") {
            setIsAdmin(true);
          } else {
            router.push("/");
          }
        } catch (error) {
          console.error("Error verifying admin status:", error);
          router.push("/");
        } finally {
          setLoading(false);
        }
      };

      checkAdmin();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return isAdmin ? <WrappedComponent {...props} /> : null;
  };
};

export default protectedPage;

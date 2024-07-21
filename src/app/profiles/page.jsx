"use client";

import React, { useEffect, useState } from "react";
import EditProfile from "@/components/views/profiles/EditProfile";
import UserProfile from "@/components/views/profiles/UserProfile";
import { getUser, updateUser } from "../../modules/fetch/fetchUser";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Add state for admin role

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const fetchUser = async () => {
        try {
          const userData = await getUser(userId);
          setUser(userData);
          setIsAdmin(userData.role === "admin"); // Check if user is admin
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, []);

  const handleUpdateUser = async (formData) => {
    try {
      await updateUser(formData);
      window.location.reload();
      setEditMode(false);
    } catch (error) {
      setError(error.message); // Fix error handling
    }
  };

  const enterEditMode = () => {
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center p-8 bg-color-secondary min-h-screen">
      {editMode ? (
        <EditProfile
          user={user}
          handleUpdateUser={handleUpdateUser}
          cancelEdit={cancelEdit}
          isAdmin={isAdmin} // Pass isAdmin prop to EditProfile
        />
      ) : (
        <UserProfile
          user={user}
          enterEditMode={enterEditMode}
          isAdmin={isAdmin} // Pass isAdmin prop to UserProfile
        />
      )}
    </div>
  );
};

export default ProfilePage;

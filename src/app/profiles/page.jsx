"use client";

import React, { useEffect, useState } from "react";
import EditProfile from "@/components/views/profiles/EditProfile";
import { getUser, updateUser } from "../../modules/fetch/fetchUser";
import UserProfile from "@/components/views/profiles/UserProfile";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const fetchUser = async () => {
        try {
          const userData = await getUser(userId);
          //   console.log("User Data:", userData);
          setUser(userData);
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
      setError(err.message);
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
        />
      ) : (
        <UserProfile user={user} enterEditMode={enterEditMode} />
      )}
    </div>
  );
};

export default ProfilePage;

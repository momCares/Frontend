"use client";

import React, { useEffect, useState } from "react";
import EditProfile from "@/components/views/profiles/EditProfile";
import UserProfile from "@/components/views/profiles/UserProfile";
import AddressList from "@/components/views/Address/AddressList";
import AddAddress from "@/components/views/Address/AddAddress";
import UpdateAddress from "@/components/views/Address/UpdateAddress";
import { getUser, updateUser } from "../../modules/fetch/fetchUser";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [currentComponent, setCurrentComponent] = useState("detailProfile");
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const enterEditMode = () => {
    setEditMode(true);
    setCurrentComponent("editProfile");
  };

  const cancelEdit = () => {
    setEditMode(false);
    setCurrentComponent("detailProfile");
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "detailProfile":
        return (
          <UserProfile
            user={user}
            enterEditMode={enterEditMode}
            setCurrentComponent={setCurrentComponent}
            isAdmin={isAdmin}
          />
        );
      case "editProfile":
        return (
          <EditProfile
            user={user}
            handleUpdateUser={handleUpdateUser}
            cancelEdit={cancelEdit}
            isAdmin={isAdmin}
          />
        );
      case "addressList":
        return (
          <AddressList user={user} setCurrentComponent={setCurrentComponent} isAdmin={isAdmin}/>
        );
      case "addAddress":
        return (
          <AddAddress
            onClose={() => setCurrentComponent("addressList")}
            setCurrentComponent={setCurrentComponent}
            addresses={addresses}
            setAddresses={setAddresses}
            isAdmin={isAdmin}
          />
        );
      case "updateAddress":
        return (
          <UpdateAddress
            user={user}
            setCurrentComponent={setCurrentComponent}
            isAdmin={isAdmin}
          />
        );
      default:
        return (
          <UserProfile
            user={user}
            setCurrentComponent={setCurrentComponent}
            isAdmin={isAdmin}
          />
        );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const fetchUser = async () => {
        try {
          const userData = await getUser(userId);
          // console.log("User Data:", userData);
          setUser(userData);
          setIsAdmin(userData.role === "admin");
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center p-8 bg-color-secondary min-h-full">
      {renderComponent()}
    </div>
  );
};

export default ProfilePage;

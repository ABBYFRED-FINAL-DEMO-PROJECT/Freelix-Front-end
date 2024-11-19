import React, { useState, useEffect } from "react";
import { apiGetUserData, apiUpdateUserData } from "../../services/dashboard";
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaInfoCircle } from "react-icons/fa";

const ProfileSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex flex-col items-center mb-8">
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
      <div className="h-6 w-48 bg-gray-200 rounded-lg mb-2"></div>
      <div className="h-4 w-36 bg-gray-200 rounded-lg"></div>
    </div>
    <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
      <div className="flex items-center space-x-3">
        <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-32 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="flex items-start space-x-3">
        <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
        <div className="h-16 w-full bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const Profile = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await apiGetUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      await apiUpdateUserData(userData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="relative bg-white backdrop-blur-lg bg-opacity-95 rounded-2xl w-full max-w-md p-8 
                      shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)]">
        {!isLoading && (
          <button
            className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 hover:bg-gray-100 
                       transition-colors duration-300 group"
            onClick={() => setIsEditing(!isEditing)}
          >
            <FaEdit className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
          </button>
        )}

        {isLoading ? (
          <ProfileSkeleton />
        ) : !isEditing ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mb-4">
                <FaUser className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{userData.fullName}</h2>
              <p className="text-teal-600 font-medium">{userData.email}</p>
            </div>
            <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
              <div className="flex items-center space-x-3">
                <FaPhone className="w-5 h-5 text-teal-600" />
                <p className="text-gray-700">{userData.phone}</p>
              </div>
              <div className="flex items-start space-x-3">
                <FaInfoCircle className="w-5 h-5 text-teal-600 mt-1" />
                <p className="text-gray-700">{userData.bio || "No bio added yet"}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Edit Profile</h3>
            {["fullName", "email", "phone", "bio"].map((field) => (
              <div key={field}>
                <label className="block font-medium text-gray-700 mb-2 capitalize">
                  {field.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <div className="flex items-center">
                  {field === "bio" ? (
                    <textarea
                      name={field}
                      value={userData[field]}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-xl py-3 px-4 
                               focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                               transition-all duration-300 resize-none h-32"
                      placeholder={`Enter your ${field}`}
                    />
                  ) : (
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={userData[field]}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-xl py-3 px-4 
                               focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                               transition-all duration-300"
                      placeholder={`Enter your ${field}`}
                    />
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={handleSaveChanges}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium 
                         py-3 px-4 rounded-xl hover:from-teal-600 hover:to-teal-700 
                         transition-all duration-300 transform hover:-translate-y-0.5
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
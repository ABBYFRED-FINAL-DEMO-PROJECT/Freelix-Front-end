import React, { useState, useEffect } from "react";
import { apiGetUserData, apiUpdateUserData } from "../../services/dashboard";
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaInfoCircle } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const data = await apiGetUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
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
      await apiUpdateUserData(userData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="relative bg-white shadow-lg rounded-xl w-full max-w-md p-6 sm:p-8">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setIsEditing(!isEditing)}
        >
          <FaEdit className="w-5 h-5" />
        </button>

        {!isEditing ? (
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <FaUser className="w-6 h-6 text-gray-500" />
              <h2 className="text-xl font-semibold text-gray-800">{userData.fullName}</h2>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <FaEnvelope className="w-6 h-6 text-gray-500" />
              <p className="text-gray-600">{userData.email}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Full Name</label>
              <div className="flex items-center mt-2">
                <FaUser className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Email</label>
              <div className="flex items-center mt-2">
                <FaEnvelope className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Phone</label>
              <div className="flex items-center mt-2">
                <FaPhone className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block font-medium text-gray-700">Bio</label>
              <div className="flex items-start mt-2">
                <FaInfoCircle className="w-5 h-5 text-gray-500 mr-2" />
                <textarea
                  name="bio"
                  value={userData.bio}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <button
              onClick={handleSaveChanges}
              className="w-full bg-[#00796B] hover:bg-[#006655] text-white font-medium py-2 px-4 rounded-md"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

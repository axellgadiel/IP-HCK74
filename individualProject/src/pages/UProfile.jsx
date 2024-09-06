import { useNavigate, useParams } from "react-router-dom";
import video from "../assets/bgimage.mp4";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UProfile() {
  const nav = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    profileP: "",
  });

  const handleChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const fetchUser = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3001/user-profile/" + id,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      console.log("response:", response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:3001/user-profile/` + id,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
        data: {
          username: userData.username,
          fullName: userData.fullName,
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          profileP: userData.profileP,
        },
      });
      nav("/user-profile/" + id);
      setUpdateUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      nav("/login");
      response = await axios({
        method: "delete",
        url: `http://localhost:3001/user-profile/${id}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black opacity-0"></div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <form className="relative z-10 bg-white shadow-lg rounded-lg max-w-4xl w-full p-8 mx-auto mt-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="relative w-24 h-24">
              <img
                src={userData.profileP} // Placeholder for profile image
                alt="Profile"
                className="w-full h-full object-cover rounded-full border border-gray-200"
              />
            </div>
            <div className="ml-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-800"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  className="w-full border border-gray-300 rounded-md p-2 text-gray-800"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSubmit}
              className="text-black-600 border border-black rounded px-3 py-1"
            >
              Edit Profile
            </button>
            <button
              onClick={() => deleteUser(id)}
              className="text-red-600 border border-red-600 rounded px-3 py-1"
            >
              Delete Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>
            <div className="bg-white-100 p-4 rounded-md ">
              <div className="mb-3">
                <label className="text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-lg font-medium text-gray-800"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-lg font-medium text-gray-800"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Miscellanous
            </h2>
            <div className="bg-white-100 p-4 rounded-md ">
              <div className="mb-3">
                <label className="text-sm font-medium text-gray-500">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-lg font-medium text-gray-800"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Profile Picture
                </label>
                <input
                  type="tel"
                  name="profileP"
                  value={userData.profileP}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 text-lg font-medium text-gray-800"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Images</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 h-48 rounded-md"></div>
          </div>
        </div>
      </form>
    </div>
  );
}

import video from "../assets/bgimage.mp4";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function UProfile() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Video Background */}
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

      {/* Overlay to darken the video */}
      <div className="absolute inset-0 bg-black opacity-0"></div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Profile Content */}
      <div className="relative z-10 bg-white shadow-lg rounded-lg max-w-4xl w-full p-8 mx-auto mt-10">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="relative w-24 h-24">
              {/* Profile Picture */}
              <img
                src="https://via.placeholder.com/150" // Placeholder for profile image
                alt="Profile"
                className="w-full h-full object-cover rounded-full border border-gray-200"
              />
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-semibold text-gray-800">John Doe</h1>
              <p className="text-gray-500">johndoe@example.com</p>
            </div>
          </div>

          {/* Profile Actions (Edit and Delete Profile Buttons) */}
          <div className="flex space-x-4">
            <button className="text-black-600 border border-black rounded px-3 py-1">
              Edit Profile
            </button>
            <button className="text-red-600 border border-red-600 rounded px-3 py-1">
              Delete Profile
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Personal Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>
            <div className="bg-gray-100 p-4 rounded-md shadow-inner">
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-lg font-medium text-gray-800">John Doe</p>
              </div>
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg font-medium text-gray-800">
                  johndoe@example.com
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Phone Number
                </p>
                <p className="text-lg font-medium text-gray-800">
                  +1 234 567 890
                </p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Address
            </h2>
            <div className="bg-gray-100 p-4 rounded-md shadow-inner">
              <p className="text-lg font-medium text-gray-800">
                123 Main Street
              </p>
              <p className="text-lg font-medium text-gray-800">
                City, State, 12345
              </p>
              <p className="text-lg font-medium text-gray-800">Country</p>
            </div>
          </div>
        </div>

        {/* Profile Actions */}
      </div>
    </div>
  );
}

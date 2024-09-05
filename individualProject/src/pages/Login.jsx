import React from "react";
import video from "../assets/bgimage.mp4";
import photo from "../assets/google.svg";

export default function Login() {
  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Overlay to darken the video */}
        <div className="absolute inset-0 bg-black opacity-0"></div>

        {/* Login Form */}
        <div className="relative z-10 w-full max-w-sm p-4 bg-black border-black rounded-lg shadow sm:p-6">
          <h5 className="mb-3 text-base font-semibold text-white md:text-xl">
            Connect to Google account
          </h5>
          <p className="text-sm font-sans text-white">
            Connect with Google so you can use our services
          </p>
          <ul className="my-4 space-y-3">
            <li>
              <a
                onClick={() => console.log("Google sign in")}
                className="flex items-center p-3 text-base font-bold text-black rounded-lg bg-white hover:bg-gray-300 group hover:shadow "
              >
                <img src={photo} alt="photo/svg" className="w-6 h-6" />
                <span className="flex-1 ms-3 whitespace-nowrap text-">
                  Google
                </span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-white bg-gray-600 rounded">
                  Sign In
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

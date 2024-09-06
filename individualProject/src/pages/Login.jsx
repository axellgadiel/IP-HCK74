import React from "react";
import video from "../assets/bgimage.mp4";
import photo from "../assets/google.svg";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const nav = useNavigate();

  const googleLogin = async (response) => {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3001/google-login",
        headers: {
          google_token: response.credential,
        },
      });

      nav("/home");
      localStorage.setItem("token", data.access_token);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async (response) => {
    googleLogin(response);
  };
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

        <div className="absolute inset-0 bg-black opacity-0"></div>

        {/* Login */}
        <div className="relative z-10 w-full max-w-sm p-4 bg-black border-black rounded-lg shadow sm:p-6">
          <h5 className="mb-3 text-base font-semibold text-white md:text-xl">
            Connect to Google account
          </h5>
          <p className="text-sm font-sans text-white">
            Connect with Google so you can use our services
          </p>
          <ul className="my-4 space-y-3">
            <li>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  handleGoogleLogin(credentialResponse);
                }}
                onError={() => {
                  console.log("login failed");
                }}
              />
              {/* <a className="flex items-center p-3 text-base font-bold text-black rounded-lg bg-white hover:bg-gray-300 group hover:shadow ">
                <img src={photo} alt="photo/svg" className="w-6 h-6" />
                <span className="flex-1 ms-3 whitespace-nowrap text-">
                  Google
                </span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-white bg-gray-600 rounded">
                  Sign In
                </span>
              </a> */}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

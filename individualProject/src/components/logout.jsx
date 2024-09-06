import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Logout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    nav("/login");
  };

  return (
    <>
      <button
        onClick={handleLogOut}
        className="text-red-700 hover:underline border border-red-700 rounded px-2 py-1"
      >
        Logout
      </button>
    </>
  );
}

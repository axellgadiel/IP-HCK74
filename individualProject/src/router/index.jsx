import { createBrowserRouter, redirect } from "react-router-dom";
import SpotifyLogin from "../pages/SpotifyLogin";
// import pages here

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <test />,
  },
  {
    path: "/register",
    element: <test />,
  },
  {
    path: "/spotify-login",
    element: <SpotifyLogin />,
  },
  {
    path: "/home",
    element: <test />,
  },

  // loader: async () => {
  //   const token = localStorage.getItem("access_token");
  //   if (token) {
  //     throw redirect("");
  //   }

  //   return null;
  // },
  // path: "/login",
  // element,
]);

// {
//   path: "/",
//   element: <Home />,
// },

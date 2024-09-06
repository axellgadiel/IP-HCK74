import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/Login";
import UProfile from "../pages/UProfile";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import pages here

export const router = createBrowserRouter([
  // {
  //   element: (
  //     <div>
  //       <h1>ininavbar</h1>
  //       <Outlet />
  //     </div>
  //   ),
  //   children: [
  //     {
  //       path: "//",
  //       element: <test />,
  //     },
  //   ]
  // },
  {
    element: (
      <GoogleOAuthProvider clientId="266093002681-thcvokofhocq0fhrjv6euged05eldsqp.apps.googleusercontent.com">
        <Outlet />
      </GoogleOAuthProvider>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/user-profile/:id",
    element: <UProfile />,
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

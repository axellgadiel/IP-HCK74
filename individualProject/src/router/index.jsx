import { createBrowserRouter, Outlet, redirect } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/Login";
import UProfile from "../pages/UProfile";
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <test />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/user-profile",
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

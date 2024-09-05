import { createBrowserRouter, RouterProvider } from "react-router-dom";

import * as apiClient from "./api-client";
import Error from "./components/error";
import RootLayout from "./components/root-layout";
import { useAppContext } from "./contexts/AppContext";
import AddHotel from "./routes/AddHotel";
import Home from "./routes/home";
import Register from "./routes/Register";
import SignIn from "./routes/SignIn";

const routes = [
  {
    path: "/",
    element: (
      <RootLayout>
        <Home />
      </RootLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <RootLayout>
        <Register />
      </RootLayout>
    ),
    errorElement: <Error />,
    children: [{}],
  },
  {
    path: "/login",
    element: (
      <RootLayout>
        <SignIn />
      </RootLayout>
    ),
  },
];

// Define or import isLoggedIn
const isLoggedIn = true; // or false, depending on your logic

if (isLoggedIn) {
  routes.push({
    path: "/add-hotel",
    element: (
      <RootLayout>
        <AddHotel />
      </RootLayout>
    ),
  });
}

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}

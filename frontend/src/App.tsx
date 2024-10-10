import path from "path";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./components/error";
import RootLayout from "./components/root-layout";
import AddHotel from "./routes/AddHotel";
import EditHotel from "./routes/EditHotel";
import Home from "./routes/home";
import MyHotels from "./routes/MyHotels";
import Register from "./routes/Register";
import Search from "./routes/Search";
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
    path: "/search",
    element: (
      <RootLayout>
        <Search />
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
  routes.push(
    {
      path: "/add-hotel",
      element: (
        <RootLayout>
          <AddHotel />
        </RootLayout>
      ),
    },
    {
      path: "/edit-hotel/:id",
      element: (
        <RootLayout>
          <EditHotel />
        </RootLayout>
      ),
    },
    {
      path: "/my-hotels",
      element: (
        <RootLayout>
          <MyHotels />
        </RootLayout>
      ),
    }
  );
}

const router = createBrowserRouter(routes);

export default function App() {
  return <RouterProvider router={router} />;
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./components/error";
import RootLayout from "./components/root-layout";
// Add this line
import Home from "./routes/home";
import Register from "./routes/Register";
import SignIn from "./routes/SignIn";

const router = createBrowserRouter([
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
]);

export default function App() {
  return <RouterProvider router={router} />;
}

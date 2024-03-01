import { useAppContext } from "@/contexts/AppContext";
import { Link } from "react-router-dom";

import SignButton from "./SignButton";

function Header() {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6 ">
      <div className="container mx-auto flex justify-between ">
        <span className="text-3xl font-bold tracking-tight text-white ">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center px-3 font-bold text-white hover:bg-blue-600"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center px-3 font-bold text-white hover:bg-blue-600"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              <SignButton />
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center bg-white px-3 font-bold text-blue-600 hover:bg-red-100  "
            >
              Sign in
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}

export default Header;

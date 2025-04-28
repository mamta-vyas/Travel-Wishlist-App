import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../config/firebaseConfig";
import { setUser } from "../features/userSlice";

const Header = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact Us" },
    { to: "/userinfo", label: "User Info" },
    { to: "/wishlist", label: "Wishlist" },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      dispatch(setUser(null)); // Clear user state in Redux
      localStorage.removeItem("authToken"); // Remove authToken from localStorage
      navigate("/"); // Redirect to the Landing Page or Home
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-pink-500 to-yellow-400 shadow-md px-4 py-4">
      <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-white text-2xl font-bold mb-4 sm:mb-0">
          Travel Wishlist 🌍
        </h1>
        <ul className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-4 sm:gap-6 mb-4 sm:mb-0">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-white text-xl font-semibold border-b-2 border-white pb-0"
                    : "text-white font-bold text-xl hover:text-gray-100 transition"
                }>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Add the logout button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;

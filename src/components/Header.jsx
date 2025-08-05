import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { href, Link, NavLink, useLocation, useNavigate } from "react-router";
import { navigation } from "../constants/Navigation.jsx";
import styles from "./Header.module.css";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/authSlics.js";

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [serchinput, setSearchInput] = useState(removeSpace);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const colors = ["red", "blue", "green", "purple", "orange", "teal", "maroon"];
  const colorIndex = user ? user.name.charCodeAt(0) % colors.length : 0;
  const colorClasses = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
    teal: "bg-teal-500",
    maroon: "bg-red-900",
  };

  const avatarColor = colorClasses[colors[colorIndex]] || "bg-gray-500";

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
    setDropdownOpen(false);
    console.log("Log")
  };

  useEffect(() => {
    if (serchinput) {
      navigate(`/search?q=${serchinput}`);
    }
  }, [serchinput]);

  const handlsubmit = (e) => {
    e.preventDefault();
  };

  // Unified function to handle mobile search
  const handleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  // Function to close mobile search
  const closeMobileSearch = () => {
    setShowMobileSearch(false);
  };

  useEffect(() => {
    // Clear search input when not on search page
    if (!location.pathname.includes("/search")) {
      setSearchInput("");
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 w-full h-16 bg-slate-900 bg-opacity-50 backdrop-blur-md z-50">
     <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 flex items-center justify-between h-full">

        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-20 sm:w-24 md:w-28 lg:w-32" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-5">
          {navigation.map((nav, index) => {
            return (
              <div key={index}>
                <NavLink
                  key={nav.label}
                  to={nav.href}
                  className={({ isActive }) =>
                    `px-2 hover:text-white no-underline text-neutral-300 ${
                      isActive ? "text-white" : ""
                    }`
                  }
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:gap-5">
          {/* Desktop Search */}
          <form
            className="hidden lg:flex items-center gap-2"
            onSubmit={handlsubmit}
          >
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 outline-none border-none text-white"
              onChange={(e) => setSearchInput(e.target.value)}
              value={serchinput}
            />
            <button className="text-2xl bg-transparent px-4 py-1 outline-none border-none text-white">
              <IoSearchOutline />
            </button>
          </form>

          {/* Mobile Search Button */}
          <button
            className="lg:hidden text-xl sm:text-2xl bg-transparent px-2 py-1 outline-none border-none text-white"
            onClick={handleMobileSearch}
          >
            <IoSearchOutline />
          </button>

          {/* User Icon - Made responsive */}
          <div className={`${styles.usericonresponsive} rounded-full cursor-pointer transition-all icon `}>
            <span className="action_name">
              {user ? (
                <div ref={dropdownRef} className="relative">
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${avatarColor}`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {user.name[0].toUpperCase()}
                  </span>

                  {dropdownOpen && (
                   <div className="absolute top-full mt-2 right-0 bg-white text-black shadow-lg rounded-md p-4 z-50 min-w-[180px] w-max max-w-[90vw]">

                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 mb-2">{user.email}</p>
                      <hr className="my-2" />
                      <button
                        className="w-full text-left py-1 text-sm hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => navigate("/")}
                      >
                        Home
                      </button>
                      <button
                        className="w-full text-left py-1 text-sm hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => navigate("profiledetails")}
                      >
                        Profile
                      </button>
                      <button
                        className="w-full text-left py-1 text-sm hover:bg-gray-100 rounded mt-1 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/profile">
                  <img
                    src={userIcon}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </Link>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-slate-900 bg-opacity-95 backdrop-blur-md p-3 border-t border-slate-700">
          <form className="flex items-center gap-2" onSubmit={handlsubmit}>
            <input
              type="text"
              placeholder="Search here..."
              className="flex-1 bg-slate-800 px-3 py-2 rounded-md outline-none border-none text-white placeholder-neutral-400"
              onChange={(e) => setSearchInput(e.target.value)}
              value={serchinput}
              autoFocus
            />
            <button
              type="button"
              className="text-neutral-400 px-2 py-2"
              onClick={closeMobileSearch}
            >
              ✕
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;

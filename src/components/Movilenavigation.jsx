import React from "react";
import { mobileNavigation } from "../constants/Navigation";
import { NavLink } from "react-router";

const Movilenavigation = () => {
  return (
    <section className="lg:hidden h-16 bg-black bg-opacity-80 backdrop-blur-2xl fixed bottom-0 left-0 right-0 w-full z-50 border-t border-gray-700">
      <div className="flex items-stretch justify-around h-full text-neutral-400">
        {mobileNavigation.map((nav, index) => {
          return (
            <NavLink
              key={nav.label + "mobilenavigation"}
              to={nav.href}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center h-full px-3 py-2 no-underline transition-colors duration-200 ${
                  isActive
                    ? "text-white bg-gray-800 bg-opacity-50"
                    : "text-neutral-400 hover:text-neutral-200"
                }`
              }
            >
              <div className="text-lg mb-0.5">{nav.icon}</div>
              <span className="text-xs font-medium">{nav.label}</span>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default Movilenavigation;

import React from "react";
import { useLocation, NavLink } from "react-router-dom";

function LinkItem({ icon, title, to }) {
  const location = useLocation();

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        !isActive
          ? ` text-gray-700 transition duration-200 hover:text-blue-600`
          : " text-blue-600 transition duration-200 hover:text-gray-700"
      }
    >
      <div
        className={
          to === location.pathname
            ? "flex flex-row py-2 border-r-4 border-blue-600"
            : "flex flex-row py-2"
        }
      >
        <div className="pr-4 text-2xl">{icon}</div>
        <div className="flex flex-col justify-center text-base text-center">
          <p>{title}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default LinkItem;

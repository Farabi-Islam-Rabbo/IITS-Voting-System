import React from "react";
import { ViewGridIcon } from "@heroicons/react/outline";

const NotFound = ({ title, subtitle, size }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-2/3 my-4">
      <ViewGridIcon className="h-20 w-16 text-gray-400" />
      <span className="text-2xl font-bold text-gray-600 mt-2">{title}</span>
      <span className="text-sm font-bold text-gray-400">{subtitle}</span>
    </div>
  );
};

export default NotFound;

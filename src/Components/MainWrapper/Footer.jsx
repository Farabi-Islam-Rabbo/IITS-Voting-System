import { Link } from "react-router-dom";
import React from "react";

function Footer() {
  return (
    <div className="">
      <footer className="text-gray-600 bg-black body-font">
        <div className="bg-gray-800">
          <div className="container flex flex-col flex-wrap px-5 py-4 mx-auto sm:flex-row">
            <p className="text-sm text-center text-white sm:text-left">
              © 2023 IUBAT IT SOCIETY VOTING PANEL—
              <a
                href="https://ahmmedabir.me"
                rel="noopener noreferrer"
                className="ml-1 text-white"
                target="_blank"
              >
                Developed By IITS
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

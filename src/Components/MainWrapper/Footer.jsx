import { Link } from "react-router-dom";
import React from "react";

function Footer() {
  return (
    <div className="">
      <footer className="text-gray-600 bg-black body-font">
        <div className="bg-blue-400">
          <div className="container flex flex-col flex-wrap px-5 py-4 mx-auto sm:flex-row">
            <p className="text-sm text-center text-white sm:text-left mx-auto">
              © 2023 IITS VOTING PANEL —
              <a
                href="https://iubat.edu/cse"
                rel="noopener noreferrer"
                className="ml-1 text-white"
                target="_blank"
              >
                Developed By Department of Computer Science and Engineering, IUBAT
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

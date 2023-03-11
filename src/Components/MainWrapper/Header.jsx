import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
//redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { duckOperations } from "../../Redux/Main/index";
import { classNames } from "../../common/utility";

function Header(props) {
  const { user, setUser } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("auth_token");
  };

  return (
    <nav className="fixed z-50 w-full py-4 shadow-md bg-blue-900">
      <div className="flex items-center justify-between px-4 mx-auto xl:max-w-full lg:max-w-full md:max-w-3xl md:px-2 xl:px-2 lg:px-2">
        <section className="flex items-center space-x-2 text-gray-900">
          <Link to="/">
            {/* <img src={logo} className="h-10 pl-4" alt="coursology logo" /> */}
            <h1 className="text-white text-3xl font-bold">
              IUBAT <span className="text-primary"> IT SOCIETY</span>
            </h1>
          </Link>
        </section>
        <section>
          <button className="flex p-2 transition-all rounded-full outline-none md:hidden hover:bg-gray-100 focus:ring focus:ring-purple-500 focus:ring-opacity-25 active:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <ul className="hidden space-x-4 md:flex">
            <li className="flex flex-col justify-center px-1">
              <Link
                title="LINK"
                to="/"
                className="px-4 py-1 font-semibold bg-transparent rounded outline-none text-primary border-primary hover:bg-gray-100 hover:text-secondary active:bg-gray-200 active:text-secondary focus:ring focus:ring-blue-600 focus:ring-opacity-25"
              >
                {/* <item.icon className="w-6 h-6" aria-hidden="true" /> */}
              </Link>
            </li>

            {user && (
              <li
                className="flex flex-col justify-center px-2"
                key={"shoppingCart1"}
              >
                <Menu as="div" className="relative mx-3">
                  <div>
                    <Menu.Button className="flex text-sm rounded-full items-center space-x-2 border border-gray-700 hover:bg-gray-800 p-1">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={
                          user?.photo?.fileName
                            ? config.fileServer + user?.photo?.fileName
                            : "https://media.istockphoto.com/vectors/user-member-vector-icon-for-ui-user-interface-or-profile-face-avatar-vector-id1130884625?k=20&m=1130884625&s=612x612&w=0&h=OITK5Otm_lRj7Cx8mBhm7NtLTEHvp6v3XnZFLZmuB9o="
                        }
                        alt=""
                      />
                      <div className="text-left pr-3">
                        <span className="block font-bold text-primary leading-none">
                          {user?.name}
                        </span>
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/account"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            )}
          </ul>
        </section>
      </div>
    </nav>
  );
}

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

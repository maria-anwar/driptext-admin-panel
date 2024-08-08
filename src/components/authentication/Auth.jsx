import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../assets/homeimages/driptext-logo.png";
import germanFlag from "../../assets/homeimages/germanylogo.png";
import englishFlag from "../../assets/homeimages/usalogo.png";
import backgroundImage from "../../assets/homeimages/Loginlogo.png";
import googlelogo from "../../assets/homeimages/googlelogo.png";

const Auth = () => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown((prevState) => !prevState);
  };

  return (
    <div className="grid grid-cols-1 2xl:grid-cols-12 h-screen ">
      {/* Left Column */}
      <div className="col-span-1 2xl:col-span-6 flex flex-col  justify-between 4xl:justify-normal items-center  py-10 xxs:px-10 2xl:px-10 4xl:px-20 bg-dark-blue border-r-2 border-gray-200">
        <div className="w-full flex flex-col justify-center items-center gap-6 ">
          <div className="w-full flex items-center justify-center gap-1.5 mb-8">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-md" />
            <div>
              <h1 className="text-[17px] font-bold text-white">DRIPTEXT</h1>
              <p className="text-cyan-600 text-[13px]">We love SEO & Content</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 4xl:gap-5 px-20">
            <div className="w-full flex flex-col items-center justify-center">
              <h1 className="text-white text-lg 4xl:text-xl">
                Enter your email and password to <span className="border-b-2 border-b-cyan-600">Login</span>
              </h1>
            </div>
            <div className="w-full flex flex-col gap-1 mt-5">
              <label
                className="block text-white text-sm 4xl:text-base font-normal"
                htmlFor="email"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="max@mustermann.com"
                className="w-full py-2 px-4 rounded-md border-2 shadow-sm focus:outline-none focus:border-none focus:appearance-none focus:ring-none"
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <label
                className="block text-white text-sm 4xl:text-base font-normal"
                htmlFor="email"
              >
                Password
              </label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="max@mustermann.com"
                className="w-full py-2 px-4 rounded-md border-2 shadow-sm focus:outline-none focus:border-none focus:appearance-none focus:ring-none"
              />
            </div>
            <div className="w-full flex justify-between items-center mt-1.5">
              <div className="flex gap-1.5 items-center">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-dark-blue border-white rounded focus:ring-blue-500 "
                ></input>
                <p className="text-white ">Save Password</p>
              </div>
              <Link className="text-cyan-500 hover:underline text-sm">Forgot Password ?</Link>
            </div>
            <div className="w-full flex justify-between items-center">
              <button className="w-full text-white text-lg font-semibold border-none border  bg-sky-800 py-2 rounded-md">
                Login
              </button>
            </div>
            <div className="w-full flex justify-center items-center gap-1.5 py-2 mt-3 rounded-md border border-gray cursor-pointer">
              <img src={googlelogo} alt="Google logo" className="w-6 h-6" />
              <div className="text-white">Sign in with Google</div>
            </div>
            <div className="flex justify-center gap-1.5 items-center">
                <div className="text-white">Not registered ?</div>
                <Link className="text-cyan-500 hover:underline">Create an account</Link>
            </div>
            <div className="relative z-20">
            <img
              src={germanFlag}
              alt="Language"
              className="w-8 h-8 cursor-pointer hover:opacity-80 transition duration-200 ease-in-out"
              onClick={toggleLanguageDropdown}
            />
            {showLanguageDropdown && (
              <div className="absolute bottom-12 left-0 mt-2 py-2 w-40 bg-white border rounded shadow-xl">
                <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
                  <img
                    src={englishFlag}
                    alt="English"
                    className="w-5 h-5 mr-2"
                  />
                  <span>English</span>
                </div>
                <div className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200">
                  <img src={germanFlag} alt="German" className="w-5 h-5 mr-2" />
                  <span>German</span>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden 2xl:flex 2xl:col-span-6 flex-col h-screen py-6 ">
        <div className="flex-grow flex items-center justify-center">
          <img
            src={backgroundImage}
            alt="Background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-4 text-sm text-gray-700 flex justify-end border-gray-200">
          <Link to="/imprint" className="mr-2 hover:underline">
            Imprint
          </Link>
          <Link to="/privacy-policy" className="mr-2 hover:underline">
            Privacy Policy
          </Link>
          <Link to="/developer" className="hover:underline">
            Developed by TECOYO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;

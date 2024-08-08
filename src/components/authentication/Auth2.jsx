import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../../assets/homeimages/driptext-logo.png";
import germanFlag from "../../assets/homeimages/germanylogo.png";
import englishFlag from "../../assets/homeimages/usalogo.png";
import backgroundImage from "../../assets/homeimages/Loginlogo.png";
import googlelogo from "../../assets/homeimages/googlelogo.png";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import LoginForm from "./LoginForm";
import AuthTagline from "./AuthTagline";

const Auth2 = ({children,authline}) => {

const handleLogoClick = () =>{
  window.location.href = 'https://driptext.de/';
}
  return (
    <div className="grid grid-cols-1 2xl:grid-cols-12 h-screen ">
      {/* Left Column */}
      <div className="col-span-1 2xl:col-span-7 flex flex-col  justify-between 2xl:justify-normal items-center  py-10 xxs:px-10 2xl:px-24 3xl:px-36 4xl:px-52 border-r border-r-zinc-200">
        <div className=" mt-10">
          <div className="w-full flex items-center justify-center gap-1.5 mb-8 cursor-pointer" onClick={handleLogoClick}>
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-md" />
            <div>
              <h1 className="text-[17px] 4xl:text-lg font-bold text-black">DRIPTEXT</h1>
              <p className="text-gray-500 text-[13px] 4xl:text-sm">We love SEO & Content</p>
            </div>
          </div>
          <AuthTagline authline={authline}/>
        </div>
        {children}
      </div>

      {/* Right Column */}
      <div className="hidden 2xl:flex 2xl:col-span-5 flex-col gap-9 3xl:gap-12 4xl:h-screen py-12  4xl:py-6">
        <div className="flex 3xl:flex-grow h-[90%] 3xl:h-[90%] pl-5 items-center justify-center">
          <img
            src={backgroundImage}
            alt="Background"
            className="h-full 3xl:h-full w-full object-cover"
          />
        </div>
        <div className="text-sm text-gray-700 flex justify-end border-gray-200">
          <Link to="/imprint" className="mr-2 4xl:mr-3.5 hover:underline">
            Imprint
          </Link>
          <Link
            to="/privacy-policy"
            className="mr-2 4xl:mr-3.5 hover:underline"
          >
            Privacy Policy
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default Auth2;

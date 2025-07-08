import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Profile = ({ userData }) => {
  const [initials, setInitials] = useState('');
  const [formattedNumber, setFormattedNumber] = useState('');

  // Format phone number
  const formatPhoneNumber = (number) => {
    return "+" + number.slice(0, 2) + " " + number.slice(2);
  };

  // Format number when userData.number changes
  useEffect(() => {
    if (userData && userData.number) {
      setFormattedNumber(formatPhoneNumber(userData.number));
    }
  }, [userData]);

  // Set initials when userData changes
  useEffect(() => {
    if (userData && userData.name) {
      const initials = userData.name.charAt(0);
      setInitials(initials);
    }
  }, [userData]);

  return (
    <div className="  z-10 lg:mt-0 lg:py-10 py-2  shadow-lg shadow-[#F8444F]/40">
      <div className="w-full h-10 bg-white p-3 pt-6 flex justify-end">
        <div className="items-center flex">
          <Link to={`/admin/seller/seller/profile/update/${userData._id}`} className="no-underline">
            <FaRegEdit className="icon" color="black" size={20} />
          </Link>
        </div>
      </div>
      <div className="flex justify-center w-full">
        {userData?.profile_image?.url ? (
          <img
            className="w-52 h-52 bg-gray-950 rounded-full"
            src={userData?.profile_image?.url}
            alt="Profile"
          />
        ) : (
          <div className="flex justify-center items-center w-52 h-52 bg-rose-500 rounded-full text-white text-[120px] font-semibold">
            {initials}
          </div>
        )}
      </div>
      <div className="flex justify-center my-8">
        <p className="font-sans font-semibold text-5xl">
          {userData.name || 'Seller Name'}
        </p>
      </div>
      <div className="flex mt-11 items-center w-full p-4">
        <div className="grid grid-rows-3 grid-flow-col lg:gap-8 gap-6 font-sans font-normal text-lg">
          <div className="flex gap-4 whitespace-nowrap">
            <FaPhoneAlt />
            <div>{formattedNumber || "+910000000000"}</div>
          </div>
          <div className="flex gap-4 whitespace-nowrap">
            <FaMapMarkerAlt />
            <div>{userData.email || "seller@gmail.com"}</div>
          </div>
          <div className="flex gap-4">
            <FaEnvelope />
            <div>{userData.address || "29522 Market Square, Amytown"}</div>
          </div>
        </div>
      </div>
      <div className="">
        <Rating className={"lg:hidden ml-10 my-7 text-lg font-semibold"} stars={userData.rating || 3} />
      </div>
    </div>
  );
};

export default Profile;

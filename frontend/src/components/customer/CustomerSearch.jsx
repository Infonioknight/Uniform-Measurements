import React, { useState } from "react";
import { TbMapPinCode } from "react-icons/tb";
import { FaAddressBook } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IoPricetagOutline } from "react-icons/io5";
import { LiaTapeSolid } from "react-icons/lia";



const CustomerSearch = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [searchName, setSearchName] = useState("");
  const [searchPincode, setSearchPincode] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  // Handle form submission and navigate to search results page

  const submitHandler = (e) => {
    e.preventDefault();

    // Prepare query parameters
    const query = new URLSearchParams();
    if (searchName.trim()) query.set("searchName", searchName);
    if (searchPincode.trim()) query.set("searchPincode", searchPincode);
    if (searchAddress.trim()) query.set("searchAddress", searchAddress);

    if (query.toString()) {
      navigate(`/users/home/${userId}/?${query.toString()}`);
    } else {
      navigate(`/users/home/${userId}`);
    }
  };

  return (
    <div className="flex justify-center pt-7 w-full">
      <form
        onSubmit={submitHandler}
        className="flex xl:flex-row flex-col w-11/12 md:w-10/12 justify-between  items-center text-center border-solid border-[1px] border-[#868686] p-2 rounded shadow-md"
      >
        <div className="flex justify-between xl:flex-row flex-col items-center text-center 2xl:w-[86%] w-full">

          <div className="flex items-center m-2 xl:w-[30%]">
            <IoMdSearch className="mr-1 text-3xl" size={30}/>
            <input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="p-2 focus:outline-blue-300 focus:ring focus:ring-blue-200 focus:rounded w-full text-[15px]"
            />
          </div>

          <div className="flex items-center  m-2 xl:w-[30%] xl:border-l-[1px]  xl:border-solid">
            <LiaTapeSolid className="mr-2 text-3xl xl:ml-2"  size={32}/>
            <input
              type="text"
              placeholder="Search by pincode"
              value={searchPincode}
              onChange={(e) => setSearchPincode(e.target.value)}
              className="p-2 focus:outline-blue-300 focus:ring focus:ring-blue-200 focus:rounded w-full text-[15px]"
            />
          </div>
          <div className="flex items-center m-2 xl:w-[30%]  xl:border-l-[1px]  xl:border-solid">
            <IoPricetagOutline  className="mr-2 text-3xl xl:ml-2" size={30}/>
            <input
              type="text"
              placeholder="Search by address"
              value={searchAddress}
              onChange={(e) => setSearchAddress(e.target.value)}
              className="p-2 focus:outline-blue-300 focus:ring focus:ring-blue-200 focus:rounded w-full text-[15px]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#f9454f] hover:bg-black w-6/12 xl:w-[100px] text-white font-bold py-2 px-2 rounded transition duration-300 ease-in-out cursor-pointer m-2"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default CustomerSearch;

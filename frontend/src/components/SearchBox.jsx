import React, { useState } from 'react';
import { MdOutlinePerson2, MdOutlineBrandingWatermark } from 'react-icons/md';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';


const SearchBox = ({ title, sellerId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const path = window.location.pathname;

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm) {
      if (path.includes(`/admin/seller/all-customers/${sellerId}`)) {
        navigate(`/admin/seller/all-customers/${sellerId}?searchTerm=${trimmedSearchTerm}`);
      } else if (path.includes(`/admin/seller/brand/${sellerId}`)) {
        navigate(`/admin/seller/brand/${sellerId}?searchTerm=${trimmedSearchTerm}`);
      } else {
        navigate(`/admin/seller/${sellerId}`);
      }
    } else {
      if (path.includes(`/admin/seller/all-customers/${sellerId}`)) {
        navigate(`/admin/seller/all-customers/${sellerId}`);
      } else if (path.includes(`/admin/seller/brand/${sellerId}`)) {
        navigate(`/admin/seller/brand/${sellerId}`);
      } else {
        navigate(`/admin/seller/${sellerId}`);
      }
    }
  };

  return (
    <>
    {/* {title !== 'Customers Info' && (
      <div className='flex ml-14 md:ml-0 lg:ml-0 justify-center lg:justify-end md:justify-end font-poppins'>
        <Link
          to={`/admin/seller/${sellerId}/brand/size`}
          className=' no-underline bg-crimson text-white p-2 rounded-lg  text-center hover:bg-neutral-200 hover:text-black lg:mt-8 md:mt-8 mt-2 mr-14'
        >
          Add New Brand
        </Link>

      </div>
    )} */}


      <div className="flex flex-col md:flex-row items-center md:mt-12 mt-2  lg:mt-12 ml-8 mb-10 justify-between">
        <div className="flex items-center lg:text-[17px] md:text-[16px] font-light p-0 bg-transparent rounded font-poppins ml-4 ">
          {title === 'Customers Info' ? <MdOutlinePerson2 className="w-6 h-6 " /> : <MdOutlineBrandingWatermark className="w-6 h-6" />}

          <span className="underline ml-2 py-4 mr-10 lg:mr-0 md:mr-0">{title}</span>
        </div>
        <form onSubmit={submitHandler} className="flex gap-1 mr-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="p-2 h-8 outline outline-black outline-1 rounded-lg w-48 focus:outline-crimson focus:outline-2"
          />
          <button
            type="submit"
            className="bg-transparent cursor-pointer hover:bg-neutral-200"
          >
            <FaSearch className="text-xl ml-2 text-black" />
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchBox;

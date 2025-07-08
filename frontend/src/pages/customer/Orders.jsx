// import React, { useState } from 'react'
import CustomerHeader from "../../components/customer/CustomerHeader";
import Sliderbar from "../../components/customer/Slidebar";
import { IoMdSearch } from "react-icons/io";
import { LiaTapeSolid } from "react-icons/lia";
function Orders() {
  return (
    <>
      <div className="flex w-dvw h-dvh p-3">
        {/*left slidebar */}
        <div>
          <Sliderbar />
        </div>

        {/* main content */}
        <main className="w-full h-full overflow-auto scrollbar-hide">
          <CustomerHeader />
          <div className=" flex items-center gap-5 py-4 justify-between">
            <h1 className="text-slate-500 text-base md:text-xl lg:text-[32px] ">
              My Orders
            </h1>
            {/* Search Bar */}
            <div className="flex justify-center  ">
              <div className="flex flex-wrap md:flex-nowrap justify-center items-center custom-border  rounded shadow-md w-full">
                <div className="flex items-center  md:mb-0 w-full ">
                  <IoMdSearch className="h-8 w-8 p-1 " />
                  <input
                    type="text"
                    placeholder="Search by Name"
                    className="p-2 w-3/5 max-md:w-auto"
                  />
                </div>
                <div className="hidden md:block w-px bg-gray-300 h-full mx-2"></div>
                <div className="flex items-center mb-1 md:mb-0">
                  <LiaTapeSolid className="h-9 w-9 p-1 " />
                  <input
                    type="date"
                    placeholder="Search by Date"
                    className="p-2 w-40 mr-2 max-md:w-auto"
                  />
                </div>
                <div className="hidden md:block w-px bg-gray-300 h-full mx-2"></div>

                <button className="bg-[#f9454f] hover:bg-black text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer">
                  Search
                </button>
              </div>
            </div>
          </div>
          {/* menu bar */}
          <div className="overscroll-contain ">
            <div className=" flex justify-between  bg-[#F8444F] text-white rounded sm:text-smi md:text-base space-x-1 py-4 px-1">
              <p>SNo</p>
              <p>Order name</p>
              <p>Order ID</p>
              <p>Date of Order Placed</p>
              <p>Date of Order Reached</p>
              <p>Status of Order</p>
            </div>
            <div className="full h-full flex justify-center">
              <img
                className=" w-1/3 h-1/3"
                src="https://i.ibb.co/0rc5XFZ/Animation-1725609604490.gif"
              ></img>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Orders;

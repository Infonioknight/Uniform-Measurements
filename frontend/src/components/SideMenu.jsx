import React from 'react'
import { MdOutlineCategory, MdOutlinePerson2, MdOutlinePersonAddAlt1 } from 'react-icons/md'
import { GiClothes } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

const SideMenu = ({ sellerId, className }) => {
  const navigate = useNavigate();
  const path = window.location.pathname
  const isActive = (path) => {
    if (window.location.pathname === path) {
      return 'bg-crimson cursor-pointer text-base md:text-base lg:text-lg font-light p-2 rounded flex flex-row items-center justify-center'
    } else {
      return 'cursor-pointer text-base md:text-base lg:text-lg font-light p-2 rounded flex flex-row items-center justify-center bg-[transparent]'
    }
  }
  return (
    <div className={`flex flex-col md:flex-row mt-6 md:px-10 px-8 gap-2 ${className}`}>
          {/* left side Button */}
          <div className="w-full mb-4 md:mb-0">
            <div className="flex flex-wrap  items-center  justify-center gap-3  lg:gap-4">
              <button
                onClick={() => {
                  navigate(`/admin/seller/customer/${sellerId}`);
                }}
                className={`${isActive(`/admin/seller/customer/${sellerId}`)}`}
              >
                Add Customers
                <MdOutlinePersonAddAlt1 className="ml-1 text-base" />
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/seller/all-customers/${sellerId}`);
                }}
                className={`${isActive(`/admin/seller/all-customers/${sellerId}`)}`}
              >
                All Customers
                <MdOutlinePerson2 className="ml-1 text-base" />
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/seller/stock/${sellerId}`);
                }}
                className={`${isActive(`/admin/seller/stock/${sellerId}`)}`}
              >
                Stock New Items
                <GiClothes className="ml-1 text-base"/>
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/seller/${sellerId}/category`);
                }}
                className={`${isActive(`/admin/seller/${sellerId}/category`)}`}>
                Add Category
                <MdOutlineCategory className="ml-1 text-base"/>
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/seller/brand/${sellerId}`);
                }}
                className={`${isActive(`/admin/seller/brand/${sellerId}`)}`}
              >
                View All Brand
                <MdOutlineCategory className="ml-1 text-base"/>
              </button>
            </div>
          </div>
          </div>
  )
}

export default SideMenu
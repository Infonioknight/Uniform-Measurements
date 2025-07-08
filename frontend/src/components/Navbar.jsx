import React, { useState, useEffect } from "react";
import logo from '../assets/Zimutail-logo.jpg';

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCategories } from "../slices/category";
import { clearBrand } from "../slices/brand";
import { clearCustomer } from "../slices/customer";
import { clearStock } from "../slices/stock";
import { deleteCredentials } from "../slices/authSlice";
import axios from "axios";
import { IoSearch, IoHeartOutline } from "react-icons/io5";
import { MdOutlineShoppingBag } from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { baseUrl } from "../baseUrl/BaseUrl";
import Swal from 'sweetalert2'

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userInfo:user} = useSelector((state) => state.auth);

  const [isNavOpen, setIsNavOpen] = useState(false);

  // Toggle mobile navigation visibility
  const toggleNavbar = () => setIsNavOpen(!isNavOpen);

// This call helps us expire the user data in the local storage if token has expired or been deleted
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users/${user._id}`, {
          withCredentials: true,
        });
        
      } catch (error) {
        console.error("Error fetching user data:", error?.response?.data?.message);
        if (error?.response?.data?.message === 'Log in to continue') {
          console.log('User session expired');
          dispatch(clearCategories());
          dispatch(clearBrand());
          dispatch(clearStock());
          dispatch(clearCustomer());
          dispatch(deleteCredentials());
          window.location.reload();
        }
      }
    };
    if (user) {
      checkUserSession();
    }
  }, [user, navigate, location]);


  // navbar hide on scroll
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll event handler to show/hide the navbar
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);  // Hide navbar on scroll down
    } else {
      setShowNavbar(true);   // Show navbar on scroll up
    }
    setLastScrollY(window.scrollY); // Update last scroll position
  };

  // Set up scroll event listener and clean up on unmount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle user logout by clearing relevant states and redirecting
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Current Section and Data will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F8444F",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, LogOut"
    });

    if (result.isConfirmed) {
      try {
        await axios.get(`${baseUrl}/logout`,{
          withCredentials: true,
        }
        );
        dispatch(deleteCredentials());
        dispatch(clearCategories());
        dispatch(clearBrand());
        dispatch(clearCustomer());
        dispatch(clearStock());
      localStorage.removeItem('loginInitiatedFrom');
        navigate("/");
        window.location.reload();

        Swal.fire({
          title: "Logged Out",
          text: "Successfully removed data.",
          icon: "success",
          timer: 3000
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message,
          icon: "error",
        });
      }
    }
  };
  // Determine action based on login state (login or logout)
  const handleLoginLogout = () => {
    user ? handleLogout() : navigate("/login");
  };

  // Common links for all users
  const commonLinks = [
    { link: "/", text: "Home" },
    { link: "/about", text: "About Us" },
    { link: "/contactus", text: "Contact" },
    {link: "/admin/seller/login", text: "Seller"},
    // { link: "/bulk-tshirts", text: "Bulk" },
  ];

  // Common links for logged in  users
  const loggedInLinks = [
    { link: "/", text: "Home" },
    { link: "/about", text: "About Us" },
    { link: "/contactus", text: "Contact" },
    { link: `/users/dashboard/${user?._id}`, text: "Dashboard" },
    // { link: "/bulk-tshirts", text: "Bulk" },
  ];

  // Links for admin users
  const sellerLinks = [
    { link: "/", text: "Home" },
    // { link: `/admin/seller/home/${user?._id} `, text: "Home" },
    { link: `/admin/seller/${user?._id}`, text: "Dashboard" },
    { link: `/admin/seller/profile/${user?._id}`, text: "Profile" },
    { link: `/admin/seller/about/${user?._id}`, text: "About Us" },
    { link: `/admin/seller/contactus/${user?._id}`, text: "Contact" },
  ];


  // Helper function to render navigation links
  function renderLinks(linksGroup) {

    return linksGroup.map(({ link, text }) => (
      // const isActive = useLocation().pathname === link; // Check active state manually
      // console.log(`Link: ${link}, Active: ${isActive}`);
      <NavLink
        key={link}
        to={link}
        className={({ isActive }) =>
          ` no-underline px-4 py-1 text-xl text-black  rounded-md
         hover:bg-[#F8444F] hover:text-white ${isActive ? 'bg-[#F8444F]  text-white' : ''}`
        }
      >
        {text}
      </NavLink>
    ));
  }

  return (
    /**
     * Applied fixed positioning for the navbar to the top of the page
     */
    // <nav className="container fixed max-w-full min-w-full m-auto overflow-hidden top-0 z-[9999] bg-white">
    <nav className={`bg-white overflow-hidden border-b-[1px] border-solid border-[#F8444F] fixed top-0 w-full z-[9999] transition-transform duration-700 ${showNavbar ? '' : '-translate-y-full'}`} >
      <div className="w-full h-[60px] flex justify-between bg-white">
        {/* left */}
        <div className=" w-1/5 flex  justify-center items-center">
          <img loading="lazy" src={logo} className=" object-cover w-36 h-36" alt="Zimutail Logo" />
        </div>


        {/* middle */}
        <div className="w-3/5 hidden lg:flex justify-evenly items-center">
          {renderLinks( user?.role === 'customer' ?  loggedInLinks:  user?.role === 'seller' ? sellerLinks : commonLinks )}
        </div>


        {/* right */}
        <div className="w-1/5 flex justify-evenly items-center">

          <div className="w-[45%] h-full hidden lg:flex items-center">
            <div className="w-full border-[1px] border-solid border-[#C4C4C4] rounded-md overflow-hidden flex">
              <Link to="#" className="w-full py-2 flex justify-center items-center border-r-[1px] border-solid border-[#C4C4C4] hover:bg-[#F8444F] group"><IoSearch className="text-black group-hover:text-white" /></Link>
              <Link to="#" className="w-full py-2 flex justify-center items-center border-r-[1px] border-solid border-[#C4C4C4] hover:bg-[#F8444F] group"><IoHeartOutline className="text-black group-hover:text-white" /></Link>
              <Link to="#" className="w-full py-2 flex justify-center items-center border-r-[1px] border-solid border-[#C4C4C4] hover:bg-[#F8444F] group"><MdOutlineShoppingBag className="text-black group-hover:text-white" /></Link>
              <Link to="#" className="w-full py-2 flex justify-center items-center border-solid border-[#C4C4C4] hover:bg-[#F8444F] group"><GrUserManager className="text-black group-hover:text-white" /></Link>
            </div>
          </div>

          <div className="w-[45%] h-full hidden lg:flex justify-center items-center">
            <button to="#" className="p-2 border-[1px] border-solid border-[#C4C4C4] rounded-md cursor-pointer hover:bg-[#F8444F] hover:text-white" onClick={handleLoginLogout}>{ user ? "LogOut" : "SignUp/LogIn"}</button>
          </div>

          <div className="lg:hidden h-full w-full flex justify-end items-center">
            {/* Hamburger icon. it will be hide on lg*/}
            <div className="w-10 h-10 relative focus:outline-none bg-red text-white cursor-pointer mr-5" onClick={toggleNavbar}>
              <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span
                  aria-hidden="true"
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isNavOpen ? "rotate-45" : "-translate-y-1.5"}`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isNavOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isNavOpen ? "-rotate-45" : "translate-y-1.5"}`}
                ></span>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* destop div complete */}

      {/* second div for mobile and tab */}
      <div className={`lg:hidden duration-500 ease-in-out ${isNavOpen ? "max-h-screen py-2" : "max-h-0"} flex flex-col gap-3 items-center`}>

        <div className="w-full border-[1px] border-solid border-[#C4C4C4] rounded-md overflow-hidden flex">
          <Link to="#" className="w-full py-2 flex justify-center items-center border-r-[1px] border-solid border-[#C4C4C4] hover:bg-[#F8444F] group"><IoSearch className="text-black group-hover:text-white" /></Link>
          <Link to="#" className="w-full py-2 flex justify-center items-center border-r-[1px] border-solid border-[#C4C4C4] hover:bg-[#F8444F] group"><IoHeartOutline className="text-black group-hover:text-white" /></Link>
          <Link to="#" className="w-full py-2 flex justify-center items-center border-r-[1px] border-solid border-[#C4C4C4] hover:bg-[#F8444F] group"><MdOutlineShoppingBag className="text-black group-hover:text-white" /></Link>
          <Link to="#" className="w-full py-2 flex justify-center items-center border-solid border-[#C4C4C4] hover:bg-[#F8444F] group"><GrUserManager className="text-black group-hover:text-white" /></Link>
        </div>

        <div className="w-1/2 flex flex-col items-center gap-2">
        {renderLinks( !user? commonLinks : user.role === 'customer' ?  loggedInLinks :  sellerLinks )}
        </div>

        <div className="w-full flex justify-center">
          <button to="#" className="p-2 border-[1px] border-solid border-[#C4C4C4] rounded-md cursor-pointer hover:bg-[#F8444F] hover:text-white" onClick={handleLoginLogout}>{user ? "LogOut" : "SignUp/LogIn"}</button>
        </div>

      </div>
    </nav >
  );
};

export default Navbar;

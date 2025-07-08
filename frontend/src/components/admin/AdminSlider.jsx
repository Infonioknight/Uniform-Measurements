import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { baseUrl } from '../../baseUrl/BaseUrl';
import { CgProfile } from "react-icons/cg";
import {  RiMenuUnfoldFill, RiMenuFoldLine } from "react-icons/ri";
import { AiFillDashboard } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import { deleteCredentials } from '../../slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from "../../assets/Zimutail-logo.jpg"
import axios from 'axios';
import Swal from 'sweetalert2'
import { FaPowerOff, FaTasks } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const AdminSlider = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const {userInfo: user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Automatically open the sidebar if window width is greater than 639px
        if (window.innerWidth >= 768) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]); // Add windowWidth as a dependency to re-trigger useEffect on resize


    // This call helps us expire the user data in the local storage if token has expired or been deleted
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users/${user?._id}`, {
          withCredentials: true,
        });
      
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error?.response?.data?.message === 'Log in to continue') {
          dispatch(deleteCredentials());
          window.location.reload();
        }
      }
    };
    if (user?._id) {
      checkUserSession();
    }

  }, [user?._id, navigate, location]);



    const menuItems = [
        { path: `/admin/dashboard/${user?._id}`, name: "Dashboard", icon: <AiFillDashboard /> },
        { path: `/admin/profile/${user?._id}`, name: "Profile", icon: <CgProfile /> },
        { path: `/admin/delete-requests/${user?._id}`, name: "Account Delete Requests", icon: <AiFillDashboard /> },
        {
          path: '/admin/requests',
          name: 'Manage Requests',
          icon: <FaTasks />,
        },
        // { path: `/users/logout/${id}`, name: "Logout", icon: <FaPowerOff /> }
    ];

  // LogOut function start
  // Handle user logout by clearing relevant states and redirecting

  const Logout = async () => {
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
        console.error("Error:", error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message,
          icon: "error",
        });
      }
    }
  };
    // LogOut function end

    return (
        <nav className={`h-full border-[2px] border-solid border-transparent rounded-md ease-in-out duration-700 pb-16 bg-white z-50 ${isOpen ? "sm:w-72 w-[235px] absolute md:static md:bg-transparent" : "w-12"} overflow-hidden mr-3`}>
            <div className="flex items-center h-20 w-full border-b-2 border-solid border-[#D3D3D3]">
            <img src={Logo} className={`ease-in-out duration-700 ${isOpen ? "w-32 h-20" : "w-0 h-full"}`} alt="Logo" />
                
                <div
                    className={`h-9 w-9 mx-auto text-3xl flex justify-center items-center rounded-md cursor-pointer text-[#135049] ${isOpen ? "bg-[#F8444F] text-white" : "hover:bg-[#F8444F] hover:text-white transition-all duration-500"}`}
                    onClick={toggle}
                >
                    {isOpen ? <RiMenuFoldLine className='hover:mr-2' /> : <RiMenuUnfoldFill className='hover:ml-2' />}
                </div>
            </div>
            <div className='h-full overflow-y-scroll scrollbar-hide mt-3'>
                {menuItems.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className={({ isActive }) =>
                            `flex items-center whitespace-nowrap py-3 px-3 gap-4 mb-3 no-underline transition-all duration-500 ${isActive ? "bg-[#F8444F] text-white rounded-md" : "text-[#135049]"}  hover:bg-[#F8444F] hover:text-white hover:rounded-md`
                        }
                    >
                        <div className="text-[21px]">{item.icon}</div>
                        <div className={`${isOpen ? "block" : "hidden"}`}>{item.name}</div>
                    </NavLink>
                ))}

                {/* Logout button start */}
                <div className="flex items-center whitespace-nowrap py-3 px-3 gap-4 mb-3 no-underline transition-all duration-500 text-[#135049] hover:bg-[#F8444F] hover:text-white hover:rounded-md cursor-pointer" onClick={Logout}>
                    <div className="text-[21px]"><FaPowerOff /></div>
                    <div className={`${isOpen ? "block" : "hidden"}`}>Logout</div>
                </div>
                {/* LogOut button end */}
            </div>
        </nav>
    );
};

export default AdminSlider;
import React from 'react'
import ProfilePhoto from "../../assets/profile-image.jpeg"
import { CiBellOn } from "react-icons/ci";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from '../../baseUrl/BaseUrl';
import axios from "axios";
import { useSelector } from 'react-redux'; 

function AdminHeader() {
    const [UserOnline, setIsUserOnline] = useState(true);
    const {userInfo: user} = useSelector((state) => state.auth);


    return (
        <div className='flex w-full h-20 bg-[#F8444F] rounded-md justify-end items-center'>
            <div className='flex justify-center items-center text-10xl text-white w-12 h-12 rounded-full overflow-hidden bg-[#0000001A]'>
                <CiBellOn />
            </div>
            <div className="relative w-12 h-12 sm:mx-7 mx-3">
                <img src={user?.profile_image?.url || ProfilePhoto } loading='lazy' className="h-full w-full rounded-full object-cover" alt="Profile" />
                {UserOnline && (
                    <span className="bottom-0 start-8 absolute w-4 h-4 bg-green-500 rounded-full border-2 border-solid border-white"></span>
                )}
            </div>
        </div>
    )
}

export default AdminHeader;

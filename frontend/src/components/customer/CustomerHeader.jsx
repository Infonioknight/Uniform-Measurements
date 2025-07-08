import React, { useState } from 'react';
import ProfilePhoto from "../../assets/profile-image.jpeg"; 
import { CiBellOn } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



function CustomerHeader(props) {
    const [isUserOnline, setIsUserOnline] = useState(true); 
    const {userInfo}  = useSelector((state) => state.auth);
    const profileImage = props?.profileImage || userInfo.profile_image ;
    

   

    return (
        <div className='flex w-full h-20 bg-[#F8444F] rounded-md justify-end items-center'>
            <div className='flex justify-center items-center text-10xl text-white w-12 h-12 rounded-full overflow-hidden bg-[#0000001A]'>
                <CiBellOn />
            </div>
            <Link to={`/users/profile/${userInfo._id}`}>
            <div className="relative w-12 h-12 sm:mx-7 mx-3">
                <img 
                    src={profileImage || ProfilePhoto}  // Use the profileImage passed as a prop
                    loading='lazy' 
                    className="h-full w-full rounded-full object-cover" 
                    alt="Profile" 
                />
                {isUserOnline && (
                    <span className="bottom-0 start-8 absolute w-4 h-4 bg-green-500 rounded-full border-2 border-solid border-white"></span>
                )}
            </div>
            </Link>
        </div>
    )
}

export default CustomerHeader;
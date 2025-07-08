import React, { useState, useEffect } from 'react'
import CustomerHeader from '../../components/customer/CustomerHeader';
import Sliderbar from '../../components/customer/Slidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userAuthService } from '../../AuthService/authService';

function Logout() {
    const navigate = useNavigate();
    const userService = userAuthService();
    useEffect(() => {
        const removeData = async () => {
            userService.removeUserData();
            navigate("/");
            window.location.reload();
        }
        removeData();
    }, []);
    return (
        <>
            <div className='flex w-dvw h-dvh p-3'>
                {/*left slidebar */}
                <div>
                    <Sliderbar />
                </div>

                {/* main content */}
                <main className="w-full h-full">
                    <CustomerHeader />
                </main >
            </div>
        </>
    )
}

export default Logout
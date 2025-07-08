 import React, { useState, useEffect } from 'react';
import logo from "../../assets/logo.png";
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { baseUrl } from "../../baseUrl/BaseUrl";

const SignUpotp = () => {
    const [otp, setOtp] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state.email;
    const [isVerify, setIsVerify] = useState(false);
    const [isCooldown, setIsCooldown] = useState(true);
    const [cooldownTime, setCooldownTime] = useState(60);

    useEffect(() => {
        let timer;
        if (cooldownTime > 0) {
            timer = setInterval(() => {
                setCooldownTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (cooldownTime === 0 && isCooldown) {
            setIsCooldown(false);
        }

        return () => clearInterval(timer);
    }, [cooldownTime, isCooldown]);

    useEffect(() => {
        setCooldownTime(60);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/verify`, { email, otp });
            if (response.data.role === 'seller') {
                Swal.fire({
                    title: 'Success',
                    text: response?.data?.message,
                    icon: 'success',
                });
                navigate("/admin/seller/login");
            } else if (response.status === 200) {
                setIsVerify(true);
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data.message === "Your registration details are not found. Please complete the registration again.") {
                Swal.fire({
                    title: 'Registration Required',
                    text: error?.response?.data?.message,
                    icon: 'error',
                });
                navigate("/signup");  
            } else {
                Swal.fire({
                    title: 'Invalid OTP',
                    text: error?.response?.data?.message,
                    icon: 'error',
                });
            }
        }
    };

    const handleResendOtp = async () => {
        if (isCooldown) return;

        try {
            const response = await axios.post(`${baseUrl}/resend-otp`, { email });
            if (response.status === 200) {
                Swal.fire({
                    title: 'OTP Resent',
                    text: 'A new OTP has been sent to your email.',
                    icon: 'success',
                });
                setIsCooldown(true);
                setCooldownTime(60);
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error Resending OTP',
                text: error.message,
                icon: 'error',
            });
        }
    };

    return (
        <>
            {isVerify && <Navigate to="/signupthanks" />}
            <form className="w-full h-screen flex flex-col items-center justify-center p-4 bg-white shadow-md relative" onSubmit={handleSubmit}>
                <img className="absolute top-4 left-4 w-[100px] h-[38px] lg:w-[159px] lg:h-[38.7px] object-cover" alt="logo" src={logo} />
                <div className="text-center text-[25px] md:text-[56px] lg:text-[60px] font-light mb-4 mt-16">
                    Enter the verification code
                </div>
                <div className="text-center text-[14px] md:text-[18px] lg:text-[18px] mb-8">
                    We have just sent a verification code to <br />
                    <span className='font-semibold'>{email}</span>
                </div>
                <input
                    className="text-center form-control bg-silver p-2 rounded-[10px] w-[80%] max-w-[300px] mb-4"
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button type="submit" className="bg-crimson text-white py-2 px-6 rounded-md w-[80%] max-w-[300px] text-[18px] mb-4">
                    Verify
                </button>
                <button
                    type="button"
                    onClick={handleResendOtp}
                    className={`bg-crimson text-white py-2 px-6 rounded-md w-[80%] max-w-[300px] text-[18px] ${isCooldown ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isCooldown}
                >
                    {isCooldown ? `Resend OTP in ${cooldownTime}s` : 'Resend OTP'}
                </button>
            </form>
        </>
    );
};

export default SignUpotp;

import React from 'react'
import logo from '../../assets/logo.png'
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../../baseUrl/BaseUrl";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Loader from '../../components/customer/Loader';


const CustomerVerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      navigate('/users/customerforgotpassword',);
    }
  }, [location, navigate]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/verifyotp`, { email, otp }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        title: "Otp Verified",
        text: response?.data?.message,
        icon: "success",
      });
      setLoading(false);
      navigate('/users/customerresetpassword', { state: { email } })
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Something went wrong",
        text: error?.response?.data?.message,
        icon: "error",
      });
      setLoading(false);
    }
  };
  return (
    <>
      <div className='flex justify-start'>
        <img
          className="w-[100px] h-[38px]  lg:w-[159px] lg:h-[38.7px] object-cover mt-6 ml-6"
          alt=""
          src={logo}
        />
      </div>
      <div className="container mx-auto h-auto text-gray-700 font-poppins">
        {loading && <Loader />}
        <div className="w-10/12  mx-auto bg-white shadow-md shadow-transparent rounded-lg   mt-20">
          <p className="text-center mt-3   mx-auto mb-5 text-[30px] md:text-[50px] lg:text-[60px]"> Code <span className='text-crimson'>Verification</span></p>
          <div>
            <form
              onSubmit={handleSubmit}
              className='max-w-lg mx-auto'
            >
              <div className="mb-4">
                <label htmlFor="forgotPasswordotp" className="block">
                  <span className="block font-bold text-3xl mb-2">Otp</span>
                </label>

                <input
                  type="number"
                  id="forgotPasswordotp"
                  placeholder="Enter 6-digit code OTP"
                  value={otp}
                  required
                  onChange={(e) => setOtp(e.target.value)}
                  className=" focus:outline-blue-300 hover:outline-blue-300   block  px-3 py-2 h-10 rounded-md bg-inherit border-2  w-full"
                />
              </div>
              <div className='flex justify-center mt-10 mb-4'>
                <button
                  type="submit"
                  disabled={!otp}
                  className="py-3 px-3 font-bold  text-white cursor-pointer w-3/12 bg-crimson rounded-md shadow-md hover:bg-red-700">
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerVerifyOtp;
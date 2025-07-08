import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import axios from "axios";
import { baseUrl } from "../../baseUrl/BaseUrl";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from "sweetalert2";
import Loader from '../../components/customer/Loader';
import { Link, useNavigate, useLocation } from "react-router-dom";

const CustomerResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
      // console.log('email', email);
    } else {
      console.log('no email found');
      navigate('/users/customerforgotpassword',);
    }
  }, [location, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");

    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/resetpassword`, { email , password}, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
      });
      setLoading(false);
      navigate('/login');
    } catch (error) {
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
          className="w-[100px] h-[38px] lg:w-[159px] lg:h-[38.7px] object-cover mt-6 ml-6"
          alt=""
          src={logo}
        />
      </div>
      <div className="container mx-auto h-auto text-gray-700 font-poppins">
        {loading && <Loader />}
        <div className="w-10/12 mx-auto bg-white shadow-md shadow-transparent rounded-lg mt-20">
          <p className="text-center mt-3 mx-auto mb-5 text-[30px] md:text-[50px] lg:text-[60px]">
            Reset <span className='text-crimson'>Password</span>
          </p>
          <div>
            <form onSubmit={handleSubmit} className='max-w-lg mx-auto'>
              <div className="mb-4">
                <label htmlFor="password" className="block">
                  <span className="block font-bold text-lg mb-2">Password</span>
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 h-10 rounded-md bg-inherit border-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-black bg-inherit"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="confirmpassword" className="block">
                  <span className="block font-bold text-lg mb-2">Confirm Password</span>
                </label>
                <div className='relative'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmpassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 h-10 rounded-md bg-inherit border-2 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-black bg-inherit"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {passwordError !== '' && (
                  <p className="text-red text-xs italic">{passwordError}</p>
                )}
              </div>

              <div className='flex justify-center mt-10 mb-4'>
                <button
                  type="submit"
                  disabled={password === "" || confirmPassword === ""}
                  className="py-3 px-3 font-bold  disabled:cursor-not-allowed text-white cursor-pointer w-3/12 bg-crimson rounded-md shadow-md hover:bg-black"
                >
                  Reset
                </button>
              </div>
            </form>

            <div className='mb-5 max-w-lg mx-auto'>
              <Link to='/login' className='text-crimson hover:underline'>
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerResetPassword;

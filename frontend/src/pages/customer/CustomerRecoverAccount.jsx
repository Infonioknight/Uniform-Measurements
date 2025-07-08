import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl/BaseUrl";
import { useState } from "react";
import Swal from "sweetalert2";
import Loader from '../../components/customer/Loader';
import Navbar from '../../components/Navbar';
import { useParams } from 'react-router-dom';

const CustomerRecoverAccount = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const {userId} = useParams();
  
  
    const navigate = useNavigate(); // Use useNavigate instead of history
  
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
  
      try {
        const response = await axios.post(`${baseUrl}/recover_account`, { email, userId }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        Swal.fire({
          title: "Success",
          text: response.data.message,
          icon: "success",
        });
        setLoading(false);
        navigate(`/login`);
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Something went wrong",
          text: error?.response?.data?.message || 'An error occurred',
          icon: "error",
        });
        setLoading(false);
      }
    };
    return (
      <>
       <Navbar />
        
        <div className="container  mx-auto  h-auto text-gray-700 font-poppins">
          {loading && <Loader />}
          <div className="w-10/12  mx-auto bg-white shadow-md shadow-transparent rounded-lg   mt-40">
            <p className="text-center mt-3   mx-auto mb-5 text-[30px] md:text-[50px] lg:text-[60px]">Recover  <span className='text-crimson'>Account</span></p>
            <div>
              <form
                onSubmit={handleSubmit}
                className='max-w-lg mx-auto'
              >
                <div className="mb-4">
                  <label htmlFor="recoveryemail" className="block">
                    <span className="block font-bold text-lg  mb-2">Email</span>
                  </label>
  
                  <input
                    type="text"
                    id="recoveryemail"
                    placeholder="email_name@gmail.com"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className=" focus:outline-blue-300 hover:outline-blue-300   block  px-3 py-2 h-10 rounded-md bg-inherit border-2  w-full"
                  />
                </div>
                <div className='flex justify-center mt-10 mb-4'>
                  <button
                    type="submit"
                    disabled={!email}
                    className="py-3 px-3 font-bold  text-white cursor-pointer w-5/12 lg:w-4/12 md:w-4/12 bg-crimson rounded-md shadow-md hover:bg-red-700 disabled:cursor-not-allowed">
                    Recover Account
                  </button>
                </div>
              </form>
  
            </div>
          </div>
        </div>
      </>
    )
  }
  
export default CustomerRecoverAccount
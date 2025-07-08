
import { useState } from 'react';
import logo from '../../assets/logo.png';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl/BaseUrl";
import Swal from "sweetalert2";
import Loader from '../../components/customer/Loader';

const CustomerForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Email validation regex
  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if email is valid before submitting
    if (!emailFormat.test(email)) {
      Swal.fire({
        title: "Invalid Email",
        text: "Please enter a valid email address.",
        icon: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/forgotpassword`, { email }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      Swal.fire({
        title: "Email Sent",
        text: "Please check your email for reset instructions.",
        icon: "success",
      });
      setLoading(false);
      navigate('/users/customerverifyotp', { state: { email } });
    } catch (error) {
      Swal.fire({
        title: "Something went wrong",
        text: error?.response?.data?.message || "Unable to send reset instructions.",
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
        <div className="w-10/12 mx-auto bg-white  rounded-lg mt-20">
          <p className="text-center mt-3 mx-auto mb-5 text-[30px] md:text-[50px] lg:text-[60px]">
            Forgot <span className='text-crimson'>Password</span>
          </p>
          <div>
            <form onSubmit={handleSubmit} className='max-w-lg mx-auto'>
              <div className="mb-4">
                <label htmlFor="forgotPasswordemail" className="block">
                  <span className="block font-bold text-lg mb-2">Email</span>
                </label>

                <input
                  type="text"
                  id="forgotPasswordemail"
                  placeholder="email_name@gmail.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 h-10 rounded-md bg-inherit border-2 w-full"
                />
              </div>
              <div className='flex justify-center mt-10 mb-4'>
                <button
                  type="submit"
                  disabled={!email || !emailFormat.test(email)}
                  className={`py-3 px-3 font-bold text-white w-3/12 rounded-md shadow-md ${
                    !email || !emailFormat.test(email) ? 'bg-gray-400 cursor-not-allowed' : 'bg-crimson hover:bg-red-700'
                  }`}
                >
                  Send
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

export default CustomerForgotPassword;
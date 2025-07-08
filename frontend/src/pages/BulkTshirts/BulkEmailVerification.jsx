import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { baseUrl } from '../../baseUrl/BaseUrl';
import axios from 'axios';

export default function BulkEmailVerification() {
  const params = useParams();
  const companyId = params.id
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationEndpoint = `${baseUrl}/user/authenticate/email`;

    try {
      const response = await axios.post(verificationEndpoint, {
        email: email,
        companyId: companyId,
      });

      if (response.status === 200) {
        // setIsEmailVerified(true);
        navigate('/user/body-measurement', { state: { userEmail: email } });
      } else {
        setError('Email verification failed. Please check your email and try again.');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      if (error.response.status == 404) {
        setError("Unauthorised Email Id")
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };


  const buttonStyle = "text-xl py-2 px-4 rounded bg-blue-500 text-white cursor-pointer mx-2";
  const proceedWithoutRegistration = () => {
    navigate('/user/men-top-wear/form', { state: { userEmail: email } });
  };
  const proceedWithRegistration = () => {
    navigate('/signup', { state: { userEmail: email } });
  };

  return (
    <>
      {isEmailVerified ? (
        <>
          <div className="relative bg-crimson  flex flex-col">
            <br />
            <Navbar />
          <div className="flex-grow flex justify-center items-end pb-4">
            <div className="self-center mt-6 text-5xl font-bold leading-10 text-center text-white max-md:mt-10 max-md:max-w-full">
              How would You Like To Proceed?
            </div>
          </div>
          </div>
          <div className="ml-20 flex flex-col items-start self-center px-5 mt-16 w-full text-lg font-bold leading-7 max-w-[1081px] text-neutral-700 max-md:mt-10 max-md:max-w-full">
            <div className="font-semibold text-black max-md:max-w-full">
              {" "}
              Proceed with Registration
            </div>
            <div className="mt-8 text-xl max-md:max-w-full">
              Register with us to enjoy personalized benefits and faster checkout
              for future orders
            </div>
            <button onClick={proceedWithRegistration} className="justify-center px-6 py-3 mt-8 text-white bg-[#f8444f] rounded-md leading-[126%] max-md:px-5">
              Proceed with Registration
            </button>
            <div className="self-center mt-12 text-xl max-md:mt-10">OR</div>
            <div className="self-stretch mt-12 font-semibold text-black max-md:mt-10 max-md:max-w-full">
              Proceed without Registration
            </div>
            <div className="self-stretch mt-8 text-xl max-md:max-w-full">
              Skip registration and proceed directly to checkout. Your order details
              will not be saved for future reference
            </div>
            <button onClick={proceedWithoutRegistration} className="justify-center px-6 py-3 mt-8 text-white bg-[#f8444f] rounded-md leading-[126%] max-md:px-5">
              Proceed without Registration
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="relative bg-crimson  flex flex-col">
            <br />
            <Navbar />
            <div className="flex-grow flex justify-center items-end pb-10">
              <div className="self-center mt-8 text-5xl font-bold leading-10 text-center text-white max-md:mt-10 max-md:max-w-full">
                Enter Your Company Email ID to proceed
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white">
            <label className="mt-10 text-lg text-slate-900 max-md:mt-10 max-md:max-w-full">
              Please enter your company email address below. This helps us organize
              and process bulk orders efficiently.
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="justify-center items-start px-3 py-2 mt-14 max-w-full text-base bg-white rounded-md border border-solid border-slate-300 text-zinc-500 w-[578px] max-md:pr-5 max-md:mt-10"
            />

            <button type="submit" className="justify-center px-6 py-2.5 mt-8 text-base font-semibold leading-5 text-white whitespace-nowrap bg-red rounded-md max-md:px-5">
              Submit
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>

        </>
      )}
      <Footer />
    </>
  )
}

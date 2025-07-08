import React, { useState, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom';
import logo from "../../../assets/logo.png"
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SellerRegistration = () => {
  const [signUpForm, setSignUpForm] = useState({ seller: true });
  const confirmPasswordRef = useRef();
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  let isFormValidate = false;
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { userEmail } = location.state || {};
  const [isVerify, setIsVerify] = useState(false);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  function isNameValid(sentence) {
    const words = sentence.split(" ");
    return words.some((word) => /\d/.test(word));
  }

  const validate = (signUpForm, confirmPassword) => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const errors = {};
    if (!signUpForm.name) {
      isFormValidate = false;
      errors.name = "Name is required!";
    }
    if (isNameValid(signUpForm.name)) {
      isFormValidate = false;
      errors.name = "*Number not allowed";
    }
    if (!signUpForm.number) {
      isFormValidate = false;
      errors.phone = "*Mobile number is required";
    }
    else if (signUpForm.number.length < 10) {
      isFormValidate = false;
      errors.phone = "*Mobile number should be at least 10 digits";
    }
    if (!signUpForm.email.match(emailFormat)) {
      isFormValidate = false;
      errors.email = "*Email is not valid!";
    }
    if (!signUpForm.password) {
      isFormValidate = false;
      errors.password = "*Password is required";
    }
    if (signUpForm.password.length < 8) {
      isFormValidate = false;
      errors.password = "*Passwords should be more than 8 characters in length";
    }
    if (signUpForm.password !== confirmPassword) {
      isFormValidate = false;
      errors.confirmPassword = "*Password does not match";
    }
    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (userEmail !== undefined) {
      setSignUpForm((prevState) => ({
        ...prevState,
        email: userEmail,
      }));
    }
  };

  const mobileNumberHandle = (mobileNumber) => {
    if(!mobileNumber.startsWith("+91")){
      mobileNumber = "+91";
    }
    setPhone(mobileNumber);
    setSignUpForm((prevState) => ({
      ...prevState,
      number: mobileNumber,
    }));
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  let confirmPassword = confirmPasswordRef.current.value;
  isFormValidate = true;
  setFormErrors(validate(signUpForm, confirmPassword));
  
  if (isFormValidate) {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/users`, signUpForm, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      Swal.fire({
        title: 'Please Verify your mail',
        text: 'OTP is sent to your mail, please check your mail',
        icon: 'success',
      });
      navigate('/signup/otp', {state:{ email: signUpForm.email }})
      setSignUpForm({});
      confirmPasswordRef.current.value = '';

    } catch (error) {
      console.error('Error:', error);

      if (error.response) {
        if (error.response.status === 400) {
          Swal.fire({
            title: 'Email already registered',
            text: error.response.data.message || 'The email is already in use.',
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: 'Something went wrong',
            text: `HTTP error! Status: ${error.response.status}`,
            icon: 'error',
          });
        }
      } else if (error.request) {
        Swal.fire({
          title: 'Network Error',
          text: 'No response received from server.',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
        });
      }
    }
    setLoading(false);
  }
};


  return (
    <>
      <div className="flex flex-col items-center justify-center w-full py-4">
        <form className="w-full bg-white" onSubmit={handleSubmit}>
          <img className="w-36 h-16 mx-auto mb-2" alt="" src={logo} />
          <h1 className="text-[50px] font-light text-center text-rose-700 mb-4">
            Seller <span className="text-black">Sign</span> <span className="text-[#78bdc4]">Up</span>
          </h1>
          <div className="w-96 m-auto">
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg text-black text-lg outline-none"
              placeholder="Your beautiful name"
              type="text"
              name="name"
              value={signUpForm.name || ""}
              onChange={handleChange}
              required
            />
            {formErrors.name && <p className="text-red-500 text-xs italic">{formErrors.name}</p>}
          </div>
          <div className="mb-4">
            <div className="w-full outline outline-1 outline-zinc-500 rounded-md  ">
            <PhoneInput              
                country={"IN"}
                value={phone || "+91"}
                onChange={(mobileNumber) => mobileNumberHandle(mobileNumber || "+91")}
                inputClass="w-full px-3 py-2 border rounded-lg text-black text-lg outline-none"
                containerClass="w-full border rounded-lg"
                countryCodeEditable={true}
                enableSearch={true}
                disableDropdown={false}
              />
            </div>
            {formErrors.phone && <p className="text-red-500 text-xs italic">{formErrors.phone}</p>}
          </div>
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg text-black text-lg outline-none"
              placeholder="Email"
              name="email"
              type="email"
              value={signUpForm.email || userEmail || ''}
              onChange={handleChange}
              required
              disabled={userEmail !== undefined}
            />
            {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
          </div>
          <div className="relative mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg text-black text-lg outline-none"
              placeholder="Password"
              name="password"
                type={showPassword ? "text" : "password"}
                value={signUpForm.password || ""}
                onChange={handleChange}
                required
            />
            <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            {formErrors.password && <p className="text-red-500 text-xs italic">{formErrors.password}</p>}
          </div>
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg text-black text-lg outline-none"
              placeholder="Confirm password"
              type="password"
              ref={confirmPasswordRef}
              required
            />
            {formErrors.confirmPassword && <p className="text-red-500 text-xs italic">{formErrors.confirmPassword}</p>}
          </div>
          {loading ? (
            <p className="text-center text-red text-xl italic">Please Wait <b>. . .</b></p>
          ) : (
            <button type="submit" className="w-full py-2 mt-4 text-white bg-crimson rounded-lg cursor-pointer">Sign Up</button>
          )}
          </div>
          <div className="mt-4 text-center text-black">
            <span>{`Already have an account? `}</span>
            <Link to="/" className="text-crimson">Log in</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SellerRegistration;

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from 'axios';
import { baseUrl } from "../../baseUrl/BaseUrl";
import logo from "../../assets/Zimutail-logo.jpg";
import Loader from "../../components/Loader/Loader";

const CompanySignup = () => {
  const [signUpForm, setSignUpForm] = useState({});
  const confirmPasswordRef = useRef();
  const [formErrors, setFormErrors] = useState({});
  let isFormValidate = false;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let forwardLoginUrl = '/bulk-tshirts';
  if (window.location.pathname === '/bulk-tshirts/Company/Shareable-Link/signup') {
    forwardLoginUrl = '/bulk-tshirts/Company/Shareable-Link/login';
  } else if (window.location.pathname === '/bulk-tshirts/Company/domain-filtered/signup') {
    forwardLoginUrl = '/bulk-tshirts/Company/domain-filtered/login';
  }

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let confirmPassword = confirmPasswordRef.current.value;
    isFormValidate = true;
    setFormErrors(validate(signUpForm, confirmPassword));

    if (isFormValidate) {
      setLoading(true);

      try {
        const response = await axios.post(`${baseUrl}/company`, signUpForm, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            title: 'Registration Successful',
            text: 'Thank You for Registration, Now Login to your Account',
            icon: 'success',
          });
          setSignUpForm({});
          confirmPasswordRef.current.value = '';
          navigate(forwardLoginUrl);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          Swal.fire({
            title: 'Something went Bad',
            text: 'Email already registered',
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: 'Something went Bad',
            text: error.message,
            icon: 'error',
          });
        }
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
  };
 
  
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full py-4">
        <form className="w-full p-2 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
          <img className="w-36 h-21 mx-auto mb-2" alt="" src={logo} />
          <h1 className="text-[60px] font-light text-center text-rose-700 mb-4">
            Company <span className="text-black">Sign</span> <span className="text-[#78bdc4]">Up</span>
          </h1>
          <div className="w-96 m-auto">
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 border rounded-lg text-black text-lg outline-none"
                placeholder="Company Name"
                type="text"
                name="name"
                value={signUpForm.name || ""}
                onChange={handleChange}
                required
              />
              {formErrors.name && <p className="text-red-500 text-xs italic">{formErrors.name}</p>}
            </div>
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 border rounded-lg text-black text-lg outline-none"
                placeholder="Company Email"
                name="email"
                type="email"
                value={signUpForm.email || ""}
                onChange={handleChange}
                required
              />
              {formErrors.email && <p className="text-red-500 text-xs italic">{formErrors.email}</p>}
            </div>
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 border rounded-lg text-black text-lg outline-none"
                placeholder="Password"
                name="password"
                type="password"
                value={signUpForm.password || ""}
                onChange={handleChange}
                required
              />
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
              <p className="text-center text-red-500 text-xs italic">Please Wait <b>. . .</b></p>
            ) : (
              ""
            )}
            {loading ? (
              <Loader />
            ) : (
              <button type="submit" className="w-full py-2 mt-4 text-white bg-crimson rounded-lg cursor-pointer">Sign Up</button>
            )}
          </div>
          <div className="mt-4 text-center text-black">
            <span>{`Already have an account? `}</span>
            <Link to={forwardLoginUrl} className="text-crimson cursor-pointer">Log in</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompanySignup;

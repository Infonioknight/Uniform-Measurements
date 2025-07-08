import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl/BaseUrl";
import { useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";
import { userAuthService } from "../../AuthService/authService";
import logo from "../../assets/Zimutail-logo.jpg";
import axios from "axios";

const CompanyLogin = () => {
  const [loginForm, setLoginForm] = useState({});
  const [formErrors, setFormErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const userService = userAuthService();
  const navigate = useNavigate();

  let forwardSignUpUrl = "/bulk-tshirts";
  let forwardDashboardUrl = "/bulk-tshirts";
  if (window.location.pathname === "/bulk-tshirts/Company/Shareable-Link/login") {
    forwardSignUpUrl = "/bulk-tshirts/Company/Shareable-Link/signup";
    forwardDashboardUrl = "/bulk-tshirts/company/Shareable-Link/";
  } else if (window.location.pathname === "/bulk-tshirts/Company/domain-filtered/login") {
    forwardSignUpUrl = "/bulk-tshirts/Company/domain-filtered/signup";
    forwardDashboardUrl = "/bulk-tshirts/company/domain-filtered/";
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/company/login`, loginForm, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const responseData = response.data;
        Swal.fire({
          title: "Login Successful",
          text: "Redirecting to your dashboard",
          icon: "success",
        });

        const company = responseData.companyDetails;
        userService.setUserLogin(responseData.companyDetails);
        setFormErrors("");
        navigate(`${forwardDashboardUrl}${company._id}`);
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        const { status } = error.response;

        if (status === 401) {
          setFormErrors("Incorrect password or email");
          Swal.fire({
            title: "Something went Bad",
            text: "Incorrect password or email",
            icon: "error",
          });
        } else if (status === 404) {
          setFormErrors("This Email id is not registered");
          Swal.fire({
            title: "Something went Bad",
            text: "This Email id is not registered",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Something went Bad",
            text: `HTTP error! Status: ${status}`,
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "Something went Bad",
          text: error.message,
          icon: "error",
        });
      }
    }

    setLoading(false);
  };

  return (
    <>
      <form
        className="w-full relative h-screen text-left text-base overflow-x-hidden text-wireframe font-poppins"
        onSubmit={handleSubmit}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 rounded-[10px] bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-full h-full" />
          <img
            className="absolute top-[20.7px] left-[20.7px] w-[100px] h-[38px] lg:w-[159px] lg:h-[58.7px] object-cover"
            alt=""
            src={logo}
          />
          <div className="absolute top-[70.1px] left-[30%] lg:left-[40%] md:left-[40%] text-[50px] md:text-[70px] lg:text-[100px]">
            <span className="font-light">Log</span>
            <span className="font-light font-inter text-crimson">In</span>
          </div>
          <div className="absolute top-[150px] left-[10px] md:left-[27%] lg:top-[210.1px] md:top-[170px] lg:left-[36%] text-[14px] text-center">
            Hello there log in and start your new shopping experience
          </div>
          <input
            className="absolute top-[202px] lg:top-[252px] md:left-[25%] left-[7%] lg:left-[32%] w-[300px] lg:w-[550px] text-[20px] outline-none font-light text-black"
            placeholder="email_name@gmail.com"
            type="email"
            onChange={handleInputChange}
            name="email"
            value={loginForm.email || ""}
            required
          />

          <input
            className="absolute top-[240px] lg:top-[310.8px] md:left-[25%] left-[7%] lg:left-[32%] w-[300px] text-[20px] lg:w-[550px] outline-none font-light text-black"
            placeholder="password1234"
            type="password"
            name="password"
            value={loginForm.password || ""}
            onChange={handleInputChange}
            required
          />
          <div className="absolute top-[228px] lg:top-[278.6px] md:left-[25%] left-[7%] lg:left-[32%] box-border w-[310px] md:w-[436.9px] lg:w-[536.9px] h-px border-t-[1px] border-solid border-crimson" />
          <div className="absolute top-[267px] lg:top-[338.4px] md:left-[25%] left-[7%] lg:left-[32%] box-border w-[310px] md:w-[436.9px] lg:w-[536.9px] h-px border-t-[1px] border-solid border-crimson" />
          <div className="absolute top-[280px] left-[135px] lg:top-[345.7px] md:left-[336px] lg:left-[591.5px] w-full h-6">
            <div className="text-rose-600 m-auto mr-24">{formErrors}</div>
          </div>
          {loading ? (
            <h5 className="error-message text-xl text-red-500 absolute top-[320px] md:left-[38%] md:top-[320px] lg:top-[390px] left-[27%] lg:left-[46%]">
              <Loader />
            </h5>
          ) : (
            <button
              type="submit"
              className="absolute top-[320px] md:left-[38%] md:top-[320px] lg:top-[390px] left-[27%] lg:left-[42%] rounded bg-my-color w-[167.8px] text-white h-[35px]"
            >
              Log In
            </button>
          )}
          <div className="absolute top-[380px] lg:top-[460.3px] md:left-[34%] md:top-[390px] left-[18%] lg:left-[40%] font-light text-black">
            <span>Haven't joined the experience yet?</span>
            <Link to={forwardSignUpUrl} className="no-underline">
              <span className="text-crimson no-underline">Sign Up</span>
            </Link>
            <br />
            
          </div>
        </div>
      </form>
    </>
  );
};

export default CompanyLogin;
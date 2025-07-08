import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";
import logo from "../../../assets/Zimutail-logo.jpg";
import axios from "axios";
import { clearCategories } from "../../../slices/category";
import { clearBrand } from "../../../slices/brand";
import { clearStock } from "../../../slices/stock";
import { clearCustomer } from "../../../slices/customer";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../slices/authSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SellerLogin = () => {
  const [loginForm, setLoginForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState("");
  const location = useLocation();
  const { userInfo: user } = useSelector((state) => state.auth);
  const path = location.pathname;

  useEffect(() => {
    if (user) {
      if (user.role === "seller" ) {
        navigate(`/admin/seller/${user._id}`);
      }
      if (user.role === "admin") {
        navigate(`/admin/dashboard/${user._id}`);
        
      }
    }
  }, [user, navigate]);

  // Google submit handler
  const googleLogin = async () => {
    localStorage.setItem("loginInitiatedFrom", path);
    window.location.href = `${baseUrl}/googlelogin`;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      Swal.fire({
        title: "Error",
        text: "Please enter email and password",
        icon: "error",
        timer: 3000,
      });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/seller/login`, loginForm, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.redirectUrl) {
        navigate(response.data.redirectUrl, {
          state: { email: loginForm.email },
        });
        return;
      }

      dispatch(clearCategories());
      dispatch(clearBrand());
      dispatch(clearStock());
      dispatch(clearCustomer());
      dispatch(setCredentials(response?.data?.user));

      Swal.fire({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
        timer: 3000,
      });

      navigate(`/admin/seller/${response?.data?.user?._id}`);
    } catch (error) {
      console.log("Error:", error);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-full h-full" />
        <Link to="/">
          <img src={logo} alt="logo" className="h-36 w-36 " />
        </Link>

        <div className="text-center mt-4 text-23xl lg:text-[100px] animate-pulse">
          <span className="font-medium font-inter">{`Log `}</span>
          <span className="font-medium font-inter text-crimson">In</span>
        </div>
        <div className="text-lg text-center py-3">
          Hello there, log in and start your new shopping experience
        </div>
        <div className="flex items-center justify-center">
          {loading && (
            <div className="text-xl text-red-500 absolute top-[320px] md:left-[46%] md:top-[320px] lg:top-[390px] left-[calc(50%_-_50px)] lg:left-[50%]">
              <Loader />
            </div>
          )}
          <form className="w-full max-w-xs md:max-w-md mx-auto text-base text-wireframe font-poppins" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 text-lg md:text-3xl outline-none font-light text-black border-b border-crimson"
                placeholder="email_name@gmail.com"
                type="email"
                onChange={handleInputChange}
                name="email"
                value={loginForm.email}
                required
              />
            </div>
            <div className="mb-4 flex relative">
              <input
                className="w-full px-3 py-2 text-lg md:text-3xl outline-none font-light text-black border-b border-crimson focus:border-crimson"
                placeholder="password1234"
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
              </span>
            </div>

            <div className="text-rose-600 mx-auto mr-24">{formErrors}</div>
            <div className="flex flex-col items-center w-full">
              <button
                type="submit"
                className="rounded bg-crimson text-white cursor-pointer text-lg w-[167.8px] h-[35px] my-3"
              >
                LogIn
              </button>
            </div>
          </form>
        </div>

        <div className="font-light text-black cursor-pointer text-center gap-4">
          <div className="flex justify-center items-center">
            <button
              // diabled now will resume afterwards
              disabled
              onClick={googleLogin}
              className="rounded hover:cursor-pointer w-[167.8px] text-crimson h-[35px] flex items-center gap-2 mb-4"
            >
              <img src="/google.png" alt="" className="w-9 h-9" />
              <p>LogIn with Google</p>
            </button>
          </div>

          <span>{`New to the Zimutail? `}</span>
          {/* currently changed but actual route of signup is seller signup */}
          {/* <Link to="/admin/seller/signup" className="no-underline"> */}
          <Link to="/signup" className="no-underline">
            <span className="text-crimson no-underline">SignUp</span>
          </Link>
          <br />
          <span>{`Forgot your Password? `}</span>
          <Link to="/users/customerforgotpassword" className="no-underline">
            <span className="text-crimson no-underline">forgot password</span>
          </Link>
        </div>
        <hr />
      </div>
    </>
  );
};

export default SellerLogin;

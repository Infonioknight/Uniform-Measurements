import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { clearBrand } from "../../slices/brand";
import { clearCategories } from "../../slices/category";
import { clearCustomer } from "../../slices/customer";
import { clearStock } from "../../slices/stock";
import { setCredentials } from "../../slices/authSlice";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import Swal from "sweetalert2";
import logo from "../../assets/Zimutail-logo.jpg";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [loginForm, setloginForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const { userInfo: user } = useSelector((state) => state.auth);
  const path = location.pathname;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setloginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const user = decoded.user;
        // Clear previous data in the redux store
        dispatch(clearCategories());
        dispatch(clearBrand());
        dispatch(clearStock());
        dispatch(clearCustomer());
        dispatch(setCredentials(user));

        const loginInitiatedFrom = localStorage.getItem("loginInitiatedFrom");
        console.log(loginInitiatedFrom, 'login initiated path')

        Swal.fire({
          title: "Success",
          text: "Login successful",
          icon: "success",
          timer: 3000,
        });

        // // Redirect based on the initiated path
        // if (
        //   loginInitiatedFrom === "/admin/login" &&
        //   user.role !== "customer" &&
        //   user.role !== "seller"
        // ) {
        //   // Allow any non-customer and non-seller to access the admin dashboard
        //   console.log("Redirecting to admin dashboard");
        //   navigate(`/admin/dashboard/${user?._id}`);
        // } else if (
        //   loginInitiatedFrom === "/admin/seller/login" &&
        //   user.role !== "customer"
        // ) {
        //   // Allow any non-customer to access the seller dashboard
        //   console.log("Redirecting to seller dashboard");
        //   navigate(`/admin/seller/${user?._id}`);
        // } else if (loginInitiatedFrom === "/login") {
        //   // Allow all users to access the user dashboard
        //   console.log("Redirecting to user dashboard");
        //   navigate(`/users/dashboard/${user?._id}`);
        // } else {
        //   // you do not have permission to access this page
        //   Swal.fire({
        //     title: "Permission Denied",
        //     text: "Unathorized.Redirecting to User dashboard",
        //     icon: "error",
        //     timer: 3000,
        //   });
        //   navigate(`/users/dashboard/${user?._id}`);
        // }
      } catch (error) {
        console.log(error.message);
        Swal.fire({
          title: "Something went wrong",
          text: error.message,
          icon: "error",
        });
      }
    }
  }, [token, dispatch, navigate]);

  //google submit handler
  const googleLogin = async () => {
    // Store the current pathname (either `/login` or `/admin/seller/login`)
    localStorage.setItem("loginInitiatedFrom", path);
    window.location.href = `${baseUrl}/googlelogin`;
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
      const response = await axios.post(`${baseUrl}/users/login`, loginForm, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        withCredentials: true,
      });

      if (response.data.redirectUrl) {
        await Swal.fire({
          title: "Success",
          text: response?.data?.message,
          icon: "success",
        });
        // Navigate to the redirected URL
        navigate(response?.data?.redirectUrl, {
          state: { email: loginForm.email },
        });
        return;
      }

      // Clear previous data in the redux store
      dispatch(clearCategories());
      dispatch(clearBrand());
      dispatch(clearStock());
      dispatch(clearCustomer());

      // Save the user credentials in the redux store
      dispatch(setCredentials(response?.data?.user));

      // Handle the response data here
      Swal.fire({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
        timer: 3000,
      });

      // Navigate to the appropriate path
      if (response?.data?.user?.role==='seller') {
        navigate(`/users/home/${response?.data?.user?._id}`);
      } else if (response?.data?.user?.role === 'admin') {
        navigate(`/admin/dashboard/${response?.data?.user?._id}`);
      } else {
        navigate(`/users/home/${response?.data?.user?._id}`);
      }
    } catch (error) {
      console.log("Error:", error);
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
      <div>
        <div className="bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-full h-full" />
        <Link to="/">
          <img className="object-cover  w-36 h-36 p-1" alt="" src={logo} />
        </Link>

        <div className="text-center mt-4 text-23xl lg:text-[100px] animate-pulse">
          <span className="font-medium font-inter">{`Log `}</span>
          <span className="font-medium font-inter text-crimson">In</span>
        </div>
        <div className="text-lg text-center py-3">
          Hello there log in and start your new shopping experience
        </div>
        <div className="flex items-center justify-center">
          <form className="w-full max-w-xs md:max-w-md mx-auto text-base text-wireframe font-poppins">
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
            <div className="mb-4 relative">
              <input
                className="w-full px-3 py-2 text-lg md:text-3xl outline-none font-light text-black border-b border-crimson"
                placeholder="password1234"
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginForm.password}
                onChange={handleInputChange}
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            <div className="text-rose-600 mx-auto mr-24"></div>
            <div className="flex flex-col items-center w-full">
              <button
                onClick={handleSubmit}
                className="rounded bg-crimson text-white cursor-pointer text-lg w-[167.8px] h-[35px] my-3"
              >
                LogIn
              </button>
            </div>
              {/* Centered Loading Icon */}
            {loading &&
            (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            )}
          </form>
        </div>

        <div className="font-light text-black cursor-pointer text-center gap-4">
          <div className="flex justify-center items-center">
            <button
            //currently disabled
              disabled
              onClick={googleLogin}
              className="rounded hover:cursor-pointer w-[167.8px] text-crimson h-[35px] flex items-center gap-2 mb-4"
            >
              <img src="/google.png" alt="" className="w-9 h-9" />
              <p>LogIn with Google</p>
            </button>
          </div>

          <span>{`New to the Zimutail ? `}</span>
          <Link to="/signup " className="no-underline ">
            <span className="text-crimson no-underline">SignUp</span>
          </Link>
          <br />
          <span>{`Forgot your Password? ? `}</span>
          {/* <Link to="/users/customerforgotpassword" className="no-underline "> */}
          <Link to="/users/customerforgotpassword" className="no-underline ">
            <span className="text-crimson no-underline">forgotpassword</span>
          </Link>
        </div>
        <hr />
      </div>
    </>
  );
};


export default Login;

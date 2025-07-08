import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import { LuCheckCircle } from "react-icons/lu";
import logo from "../../../assets/Zimutail-logo.jpg";
import { FiCheckSquare } from "react-icons/fi";
import axios from 'axios';
import { clearCategories } from "../../../slices/category";
import { clearBrand } from "../../../slices/brand";
import { clearStock } from "../../../slices/stock";
import { clearCustomer } from "../../../slices/customer";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../slices/authSlice";
import Loader from "../../../components/Loader/Loader";

const AdminLogin = () => {
  const [loginForm, setloginForm] = useState({});
  const [formErrors, setFormErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { userInfo: user } = useSelector((state) => state.auth);
  const path = location.pathname;

  useEffect(() => {
    if (user) {
      if ( user.role === "admin") {
        navigate("/admin/dashboard/" + user._id);
      }
    }
  }, [user, navigate]);

  // Google submit handler
  const googleLogin = async () => {
    // Store the current pathname (either `/login` or `/admin/seller/login`)
    localStorage.setItem("loginInitiatedFrom", path);
    window.location.href = `${baseUrl}/googlelogin`;
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setloginForm((prevState) => ({
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
    const response = await axios.post(`${baseUrl}/admin/login`, loginForm, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include', 
      withCredentials: true, 
    });
    
    if(response.data.redirectUrl){
      await Swal.fire({
         title: "Success",
         text: response?.data?.message,
         icon: "success"
       });
       // Navigate to the redirected URL
       navigate(response?.data?.redirectUrl, {
         state: { email: loginForm.email }
       });
       return;
     }
    
      // lets clear the previous data in the redux store
      dispatch(clearCategories());
      dispatch(clearBrand());
      dispatch(clearStock());
      dispatch(clearCustomer());
      dispatch(setCredentials(response?.data?.user));
      Swal.fire({
        title: "Login Successful",
        text: response?.data?.message,
        icon: "success",
      });
      setFormErrors("");
      // console.log("Response:", response?.data);
      navigate(`/admin/dashboard/${response?.data?.user?._id}`);
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "Something went Bad",
      text: error.response?.data?.message || error.response?.data?.error,
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
        <img className="object-cover  w-36 h-36 p-1" alt="" src={logo} />
      </Link>

      <div className="text-center mt-4 text-23xl lg:text-[100px] animate-pulse">
        <span className="font-medium font-inter">{`Log `}</span>
        <span className="font-medium font-inter text-crimson">In</span>
      </div>
      <div className="text-lg text-center py-3">
        Welcome to Admin Login
      </div>
      <div className="flex items-center justify-center">
       
        <form className="w-full max-w-xs md:max-w-md mx-auto text-base text-wireframe font-poppins">
        {loading && (
              <div className="flex justify-center items-center h-auto">
                <Loader />
              </div>
            )}
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
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 text-lg md:text-3xl outline-none font-light text-black border-b border-crimson"
              placeholder="password1234"
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="text-rose-600 mx-auto mr-24">{formErrors}</div>
          <div className="flex flex-col items-center w-full">
            <button
              onClick={handleSubmit}
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
  onClick={googleLogin}
  className="rounded hover:cursor-pointer w-[167.8px] text-crimson h-[35px] flex items-center gap-2 mb-4"
>
  <img src="/google.png" alt="" className="w-9 h-9" />
  <p>LogIn with Google</p>
</button>
</div>

        <span>{`New to the Zimutail? `}</span>
        <Link to="/admin/seller/signup" className="no-underline">
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

export default AdminLogin;

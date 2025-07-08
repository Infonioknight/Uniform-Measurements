import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'
import { baseUrl } from '../../../baseUrl/BaseUrl';
import { MdOutlineCategory, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { MdOutlinePerson2 } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import Loader from '../../../components/Loader/Loader';
import scale from "../../../assets/scale.png"
import Footer from '../../../components/Footer';
import Navbar from '../../../components/Navbar';
import Hero from '../../../components/Hero';
import SideMenu from '../../../components/SideMenu';
import { GiClothes } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomers, updateCustomer } from '../../../slices/customer';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import JumpButton from "../../../components/jump/JumpButton";


const validateField = (field, value) => {
  if (field === 'name') {
    return value.trim() !== '';
  }
  else if (field === 'email') {
    return value.trim() !== '';
  }
  else if (field === 'phone') {
    return !isNaN(value) && parseInt(value) > 0;
  }
  else if (field === 'age') {
    return !isNaN(value) && value.trim() !== '';
  }
  else if (field === 'chestSize' || field === 'shoulderSize' || field === 'frontLength' || field === 'waistSize') {
    return !isNaN(value) && value.trim() !== '';
  }
  return true;
};
const validName = (field, value) => {
  if (field === "name") {
    return isNaN(parseInt(value))
  }

}
const isNeg = (field, value) => {

  if (field === "age") {
    return parseInt(value) < 0
  }
  else if (field === 'chestSize' || field === 'shoulderSize' || field === 'frontLength' || field === 'waistSize') {
    return parseFloat(value) <= 0
  }
  return false;
}

const AddCustomer = () => {
  const params = useParams();
  const sellerId = params.id
  const dispatch = useDispatch();
  const { customerItems } = useSelector((state) => state.customer);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender:"",
    chestSize: '',
    frontLength: '',
    waistSize: '',
    shoulderSize: '',

  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };


  // Lets first get the customer data from the local storage
  // If the customer data is not available in the local storage then we will fetch the data from the server
  // So when we create a new customer we will add the customer to the local storage
  useEffect(() => {
    fetchCustomersData();
  }, []);

  const fetchCustomersData = async () => {
    try {
      //lets first get the data from local storage
      if (!customerItems || customerItems.length === 0) {
        // console.log("Fetching customer data from the server");
        const response = await axios.get(
          `${baseUrl}/seller/customers/${sellerId}`,
          {
            withCredentials: true,
          }
        );
        dispatch(addCustomers(response.data.customers));
      } else {
        // console.log("Fetching customer data from local storage");
        return customerItems;
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const isValid = validateField(field, formData[field]);
      const isNegative = isNeg(field, formData[field]);
      let validateName = true;
      if (field === "name") {
        validateName = validName(field, formData[field]);
      }
      if (!isValid) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        formValid = false;
      }
      else if (isNegative) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} should not be a negative value`
        formValid = false;
      }
      else if (!validateName) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} should not be a number`
        formValid = false;
      }
    });

    if (!formValid) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoading(true)
      const response = await axios.post(`${baseUrl}/seller/customer/${sellerId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        // console.log('Customer added successfully:', response.data.customer);
        dispatch(updateCustomer(response.data.customer));
        Swal.fire({
          title: 'Customer Added successfully',
          text: 'Thank You',
          icon: 'success',
        });
        navigate(`/admin/seller/all-customers/${sellerId}`)
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      });
    }
    setLoading(false)
  };

  return (
    <>
      <div className="w-full h-4 bg-[#f9454f]"></div>
      <Navbar />
      <Hero page='"Add New Customer"' subtitle=' Add a new customer to database' />
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12">
        <div className="col-span-1 md:col-span-4 lg:col-span-3 h-auto  border-r border-solid border-black">
          <SideMenu sellerId={sellerId} />
        </div>
        <div className="col-span-1 md:col-span-8 lg:col-span-9 h-auto">
          <form className="w-full max-w-3xl mx-auto p-4 md:p-8 bg-white rounded-lg" onSubmit={handleSubmit}>
            <div className="flex flex-row justify-center items-center mt-6 text-xl mb-10">
              <MdOutlinePersonAddAlt1 className="w-7 h-7 mr-2" />
              <p className="font-semibold text-gray-700">Customer Details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
              <div className="col-span-2">
                <label htmlFor="name" className="block text-gray-600 font-bold mb-2 ml-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 rounded-md border w-full"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="age" className="block text-gray-600 font-bold mb-2 ml-1">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  value={formData.age}
                  onChange={handleChange}
                  className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 rounded-md border w-full"
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>
              <div className="">
            <label htmlFor="email" className="block text-gray-600 font-bold mb-2 ml-1">
                  Gender
                </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        gender: e.target.value,
                      }))
                    }
                    className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 rounded-md border w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
              </div>
            </div>
            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            <div className="col-span-2">
                <label htmlFor="email" className="block text-gray-600 font-bold mb-2 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Johndoe@email.com"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 rounded-md border w-full"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              

              <div>
                <label htmlFor="mobile" className="block text-gray-600 font-bold mb-2 ml-1">
                  Phone Number
                </label>
                <PhoneInput
                  country={'in'}
                  value={formData.phone}
                  onChange={(phone) => setFormData({ ...formData, phone })}
                  inputProps={{
                    required: true,
                    name: 'phone',
                    className: "focus:outline-blue-300 ml-9 hover:outline-blue-300 block px-3 py-2 rounded-md border  w-11/12  lg:w-10/12"
                  }}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              
            </div>

            <div className="flex flex-row items-center justify-center mt-8 mb-8">
              <img className="mr-2" alt="" src={scale} />
              <p className="mr-2 text-sm lg:text-base font-semibold text-gray-700">Measurement Details</p>
              <span className="text-xs lg:text-[12px] font-bold text-gray-500">(In Inches)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="chestSize" className="block text-gray-600 font-bold mb-2 ml-1">
                  Chest Size
                </label>
                <input
                  type="number"
                  id="chestSize"
                  name="chestSize"
                  required
                  placeholder="In Inches"
                  value={formData.chestSize}
                  onChange={handleChange}
                  className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 rounded-md border w-full"
                />
                {errors.chestSize && <p className="text-red-500 text-xs mt-1">{errors.chestSize}</p>}
              </div>

              <div>
                <label htmlFor="frontLength" className="block text-gray-600 font-bold mb-2 ml-1">
                  Front Length
                </label>
                <input
                  type="number"
                  id="frontLength"
                  name="frontLength"
                  required
                  placeholder="In Inches"
                  value={formData.frontLength}
                  onChange={handleChange}
                  className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 rounded-md border w-full"
                />
                {errors.frontLength && <p className="text-red-500 text-xs mt-1">{errors.frontLength}</p>}
              </div>

              <div>
                <label htmlFor="waistSize" className="block text-gray-600 font-bold mb-2 ml-1">
                  Waist Size
                </label>
                <input
                  type="number"
                  id="waistSize"
                  name="waistSize"
                  required
                  placeholder="In Inches"
                  value={formData.waistSize}
                  onChange={handleChange}
                  className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 rounded-md border w-full"
                />
                {errors.waistSize && <p className="text-red-500 text-xs mt-1">{errors.waistSize}</p>}
              </div>

              <div>
                <label htmlFor="shoulderSize" className="block text-gray-600 font-bold mb-2 ml-1">
                  Shoulder Length
                </label>
                <input
                  type="number"
                  id="shoulderSize"
                  name="shoulderSize"
                  required
                  placeholder="In Inches"
                  value={formData.shoulderSize}
                  onChange={handleChange}
                  className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 rounded-md border w-full"
                />
                {errors.shoulderSize && <p className="text-red-500 text-xs mt-1">{errors.shoulderSize}</p>}
              </div>
            </div>

            {loading?(
            <div className="flex flex-row items-center justify-center">
               <Loader />
               </div>
              ):(
                <div className="flex flex-row items-center justify-center mb-10 gap-4">
                <button
                  type="submit"
                  className="lg:text-base w-[130px] lg:w-[160px] text-[12px] text-white py-3 px-3.5 bg-[#f9454f] rounded shadow hover:bg-blue-500 transition duration-300"
                >
                  Save Customer
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="lg:text-base w-[80px] text-[12px] text-black py-3 px-3.5 bg-transparent border border-gray-400 rounded hover:bg-black hover:text-white transition duration-300"
                >
                  Cancel
                </button>
              </div>
              )}
          </form>
        </div>

      </div>
      <JumpButton />
      <Footer />
    </>
  );
};

export default AddCustomer;

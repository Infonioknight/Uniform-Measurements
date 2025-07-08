import React, { useEffect } from 'react';
import axios from 'axios';
import {useParams,useNavigate} from "react-router-dom"
import { FaCamera } from 'react-icons/fa';
import { useState } from 'react';
import ProfilePhoto from '../../../assets/seller-profile.jpeg';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import Swal from 'sweetalert2';
import Loader from '../../../components/Loader/Loader';

function SellerEditProfile() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    profile_image: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [imageLoading , setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [prevImageId, setPrevImageId] = useState(null); 
  const params =useParams();
  const sellerId=params.sellerId;
  

  useEffect(() => {
    // Fetch seller data from the backend
    const fetchSellerData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users/${sellerId}`,{
          headers:{
            "Content-Type":"application/json",
            
          },
          withCredentials:true
        }); 
        
        const sellerData=response?.data?.User;
        // console.log(sellerData.role)
        // console.log(sellerData.seller)
        setFormData(sellerData);
       
      } catch (error) {
        console.error('Error fetching seller data:', error);
        Swal.fire({
          title: 'Error',
          text: error?.response?.data?.error || error?.response?.data?.message,
          icon: 'error',
        });
      }
    };

    fetchSellerData();
  }, []);

  const isValidEmail = (email) => {
    // Regular expression for basic email validation.
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const isValidContactNumber = (number) => {
    // Regular expression for basic phone number validation (12 digits)
    const contactRegex = /^\d{12}$/;
    return contactRegex.test(number);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "FullName is required.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.number) {
      newErrors.number = "Contact number is required.";
    } else if (!isValidContactNumber(formData.number)) {
      newErrors.number = "Invalid contact number.";
    }
    if (!formData.address) {
      newErrors.address = "Address is required.";
    }
    if (!formData.city) {
      newErrors.city = "City is required.";
    }
    if (!formData.state) {
      newErrors.state = "State is required.";
    }
    if (!formData.zipcode) {
      newErrors.zipcode = "ZipCode is required.";
    }
  
    

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        
        const response = await axios.put(`${baseUrl}/users/${sellerId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        Swal.fire({
          title: 'Profile Updated successfully',
          text: 'Thank You',
          icon: 'success',
        });
        navigate(`/admin/seller/profile/${sellerId}`)
  
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          title: 'Error',
          text: error?.response?.data?.error || error?.response?.data?.message,
          icon: 'error',
        });
      }
    } else {
      console.log("Form Validation Failed.");
    }
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    // console.log(event.target.name);
  };

  // Function to handle image upload
  const handleImageChange = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      setImageLoading(true)
       // If there's a previous image, delete it from Cloudinary
    if (prevImageId) {
      try {
        const res = await axios.delete(`${baseUrl}/upload/image/${prevImageId}`, {
          withCredentials: true,
        });
          // console.log("Previous image deleted.", res.data);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error?.response?.data?.message,
          icon: 'error',
        });
          console.error("Error deleting previous image:", error.message);
      }
  }
      const { data } = await axios.post(`${baseUrl}/upload/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      setPrevImageId(data.imageId);
      setImagePreview(data.url);
      setFormData((prevData) => ({
        ...prevData,
        profile_image: { url: data.url, publicId: data.imageId },
      }));
      setImageLoading(false)
    } catch (error) {
      console.error("Error uploading image:", error.message);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message || error.response.data.error,
        icon: 'error',
      });
      setImageLoading(false)
    }
  };
  


  return (
    <>
      <div className="bg-crimson h-30 w-full ">
        <div className="h-4"></div>
        <div><Navbar /></div>
        <div className="flex items-center justify-center text-white font-bold">
          <p className="text-xl font-bold mt-12 mb-12">Edit Profile</p>
        </div>
      </div>

      
      <div className="max-w-xl mx-auto mt-20 mb-20 border border-solid border-rose-300 rounded ">
        
       
        <div className="max-w-2xl mx-auto bg-white border-none border-gray-200 rounded-lg  p-6">
          <form onSubmit={handleSubmit} className="form">
          <div className="mx-auto my-5 w-32 h-32 relative border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover object-center h-32 w-32"
            src={formData?.profile_image?.url || imagePreview || ProfilePhoto}
            alt="Profile"
          />
          <label htmlFor="file-upload" className="absolute  bottom-0 right-1 bg-crimson text-white p-2 rounded-full overflow-hidden  cursor-pointer">
            <FaCamera className="mx-2 my-1 " />
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        {imageLoading && <Loader />}
        <div  className>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium text-left">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-600 rounded"
                  placeholder="Full Name"
                />
                <h6 className="error-message text-xs text-red">{errors.name}</h6>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-left font-medium ">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}                 
                  className="w-full mt-1 p-2 border border-gray-600 rouned "
                  placeholder="example@gmail.com"
                  readOnly
                />
                <h6 className="error-message text-xs text-red">{errors.email}</h6>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-left font-medium ">Contact Number</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-600 rounded"
                  placeholder="+91"
                />
                <h6 className="error-message text-xs text-red">{errors.number}</h6>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-left font-medium ">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-600 rounded"
                  placeholder="Address"
                />
                <h6 className="error-message text-xs text-red">{errors.address}</h6>
              </div>
              <div>
                <label className="block text-gray-700 text-left font-medium ">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-600 rounded"
                  placeholder="City"
                />
                <h6 className="error-message text-xs text-red">{errors.city}</h6>
              </div>
              <div>
                <label className="block text-gray-700 text-left font-medium ">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-600 rounded"
                  placeholder="State"
                />
                <h6 className="error-message text-xs text-red">{errors.state}</h6>
              </div>
              <div>
                <label className="block text-gray-700 text-left font-medium ">Zip Code</label>
                <input
                  type="text"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-600 rounded"
                  placeholder="Zip Code"
                />
                <h6 className="error-message text-xs text-red">{errors.zipCode}</h6>
              </div>
              <div>
                <label className="block text-gray-700 text-left font-medium ">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-600 rounded"
                  placeholder="Country"
                />
                <h6 className="error-message text-xs text-red">{errors.country}</h6>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 text-left font-medium ">About Us</label>
                <textarea
                  name="profile"
                  value={formData.profile}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border border-gray-600 rounded"
                  placeholder="About their brand"
                  rows="6"
                />
                <h6 className="error-message text-xs text-red">{errors.aboutUs}</h6>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <button type="submit" className="w-20 bg-[#f8444f] text-white py-2 px-3 rounded shadow hover:bg-[#f8444f]">
                Save
              </button>
            </div>
            </div>
          </form>
        </div>
      </div>
      <hr className="my-4 border-t-2 border-gray-200" />
      <Footer />
    </>
  );

}

export default SellerEditProfile;


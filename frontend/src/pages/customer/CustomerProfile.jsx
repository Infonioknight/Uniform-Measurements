/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl/BaseUrl";
import CustomerHeader from "../../components/customer/CustomerHeader";
import Sliderbar from "../../components/customer/Slidebar";
import ProfilePhoto from "../../assets/profile-image.jpeg";
import Swal from "sweetalert2";
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { useDispatch } from 'react-redux';
import {setCredentials} from '../../slices/authSlice';
import { BsCamera } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import Loader from '../../components/Loader/Loader';


function CustomerProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    state: "",
    age: "",
    city: "",
    country: "",
    weight: "",
    zipcode: "",
    address: "",
    height: "",
    profile_image:""
  });
  const [perviousFormData, setperviousFormData] = useState({});
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(ProfilePhoto);
  const [originalImage, setOriginalImage] = useState(ProfilePhoto);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpLoader , setIsUpLoader] = useState(false)

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get(`${baseUrl}/users/${userId}`, {
          withCredentials: true,
        });

        if (response.status === 201) {
          const userData = response?.data?.User;
          setFormData(userData);
          setperviousFormData(userData);
          const fetchedImage = userData.profile_image || ProfilePhoto; // Fallback to default image if none is set
          setProfileImage(fetchedImage);
          setOriginalImage(fetchedImage);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        Swal.fire({
          title: "Something went wrong",
          text: error.message,
          icon: "error",
        });
      }
    }

    getUserData();
  }, [userId]);

  // Handle form input changes
const handleChange = (e) => {
  if (!isEditMode) return;

  const { name, value } = e.target;

  // Handle age validation (must be a number between 0 and 120)
  if (name === 'age') {
    if (value && (isNaN(value) || value < 0 || value > 120)) {
      return;  // Don't update the state if the age is invalid
    }
  }

  // Handle height validation (must be a number and at least 30)
  if (name === 'height') {
    if (value && (isNaN(value) || value < 1 || value >8)) {
      return;  // Don't update the state if the height is invalid
    }
  }
    // Handle state, city, and address validation (only alphabetic characters and spaces allowed)
  if (['state', 'city'].includes(name)) {
    const regex = /^[A-Za-z\s,]*$/;  // Allow only alphabetic characters, spaces, and commas
    if (value && !regex.test(value)) {
      return;  // Don't update the state if the input contains invalid characters
    }
  }
  setFormData((prev) => ({ ...prev, [name]: value }));
};


  const handleUpdateForm = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      try {
        const response = await axios.put(
          `${baseUrl}/users/${userId}`,
          formData,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          Swal.fire({ title: "Update Successful", icon: "success" });
          setIsEditMode(false);
        }
      } catch (error) {
        Swal.fire({
          title: "Update Failed",
          text: error.response?.data?.message || "Failed to update.",
          icon: "error",
        });
      }
    }
  };

    // const handleImageClick = () => {
    //     if (isEditMode) {
    //         setIsModalOpen(true);
    //     }
    // };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setProfileImage(URL.createObjectURL(file)); // Preview image
        }
        if (isEditMode) {
            setIsModalOpen(true);
        }
    };

  const handleSaveImage = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      Swal.fire({
        title: "No Image Selected",
        text: "Please select an image.",
        icon: "warning",
      });
      return;
    }
    setIsUpLoader(true)
    const profileImageData = new FormData();
    profileImageData.append("file", selectedImage);

    try {
      const response = await axios.post(`${baseUrl}/upload/image`, profileImageData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsUpLoader(false)
        setProfileImage(response.data.url);
        setFormData((prev) => ({ ...prev, ['profile_image']: response.data.url }));
        Swal.fire({ title: "Profile Image Updated", icon: "success" });
      }

      setIsModalOpen(false);
    } catch (error) {
      setIsUpLoader(false)
      Swal.fire({ title: "Upload Failed", text: error.message, icon: "error" });
    }
  };

    const handleCancelImage = () => {
        setProfileImage(originalImage);
        setSelectedImage(null);
        setIsModalOpen(false);
    };

    const handleRemoveImage = () => {
        setProfileImage(ProfilePhoto); // Reset to default image
        setSelectedImage(null);
        setIsModalOpen(false);
    };

  const handleCancelFormUpdate = () => {
    setFormData(perviousFormData);
    setIsEditMode(false);
  };

  const handlePhoneChange = (phone) => {
    if (!isEditMode) return;
    setFormData((prev) => ({ ...prev, number: phone }));
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete your account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/customerDeleteAccount/${userId}`);
      }
    });
  };


    return (
        <div className='flex w-dvw h-dvh p-3'>
            {/*left slidebar */}
            <div>
                <Sliderbar />
            </div>

            {/* main content */}
            <main className="w-full h-full overflow-auto scrollbar-hide">
                <CustomerHeader profileImage={profileImage} />
                <p className='h-20 w-full sm:justify-start justify-center font-poppins text-3xl flex items-center text-[#13504973] font-bold sm:pl-3'>
                    My Profile
                </p>
                <div className='flex flex-col sm:flex-row w-full h-auto mb-9'>
                    <div className='relative sm:w-1/2 mx-auto group'>
                        <img
                            loading="lazy"
                            src={profileImage}
                            className='h-44 w-44 rounded-full object-cover'
                            alt="Profile"
                        />

                        {isEditMode ? (
                            <div className=''
                                // onClick={handleImageClick}
                            >
                            <label className='h-44 w-44 rounded-full absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-100 transition-opacity duration-300 cursor-pointer border-2 border-solid border-red'>
                            <input
                                     type='file'
                                     accept='image/*'
                                     onChange={handleImageChange}
                                     className='hidden'
                                  />
                                  <span className='text-crimson text-xl absolute -bottom-0 -right-0 bg-stone-700 rounded-full p-2'><BsCamera />
                                  </span>
                            </label>
                                
                            </div>
                        ) : (
                            <div
                                className='h-44 w-44 rounded-full absolute inset-0 flex justify-center items-center cursor-not-allowed'

                            >  </div>
                        )}

                    </div>

          <div className="flex flex-col gap-2 items-center justify-center w-full sm:w-1/2">
            <button
              onClick={() => setIsEditMode(true)}
              className={`w-full sm:w-40 p-2 font-poppins text-[15px] font-medium border-2 border-[#F8444F] text-[#F8444F] rounded-md hover:bg-[#F8444F] hover:text-white cursor-pointer ${
                isEditMode ? "bg-[#F8444F] text-white" : "bg-transparent"
              }`}
            >
              Edit Account
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full sm:w-40 py-2 font-poppins text-[15px] font-medium border-2 border-[#F8444F] rounded-md bg-transparent text-[#F8444F] hover:bg-[#F8444F] hover:text-white cursor-pointer"
            >
              Delete Account
            </button>
          </div>
        </div>

                <form className='w-full h-auto md:flex gap-3 sm:mt-9' >
                    <div className='flex-1 flex flex-col gap-6 mb-3 '>
                        <div className="relative w-full">
                        <InputField name='name'
                        value={formData.name} placeholder='Name' disabled={!isEditMode} onChange={handleChange} />
                        <label className="absolute -top-2 left-2 rounded-md bg-crimson px-2 text-base text-white duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-crimson peer-focus:text-sm peer-focus:text-white">
                                Name
                            </label>
                        </div>
                        
                        {/* Phone number input with country code */}
                        <div className="relative w-full">
                        <PhoneInput
                            country={'in'}
                            value={formData.number}
                            onChange={handlePhoneChange}
                            disabled={!isEditMode}
                            inputStyle={{ width: '100%', border: '2px solid #D3D3D3', borderRadius: '8px' }}
                        />
                        <label className="absolute -top-2 left-2 rounded-md bg-crimson px-2 text-base text-white duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-crimson peer-focus:text-sm peer-focus:text-white">
                        Phone Number
                            </label>
                        </div>

                        <div className="relative w-full">
                        <InputField name='age' value={formData.age} placeholder='Age in Years' disabled={!isEditMode} onChange={handleChange} />
                        <label className="absolute -top-2 left-2 rounded-md bg-crimson px-2 text-base text-white duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-crimson peer-focus:text-sm peer-focus:text-white">
                        Age
                            </label>
                        </div>
                        <div className="relative w-full">
                        <InputField name='city' value={formData.city} placeholder='City' disabled={!isEditMode} onChange={handleChange} />
                        <label className="absolute -top-2 left-2 rounded-md bg-crimson px-2 text-base text-white duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-crimson peer-focus:text-sm peer-focus:text-white">
                        City
                            </label>
                        </div>
                        <div className="relative w-full">
                        <InputField name='address' value={formData.address} placeholder='Address' disabled={!isEditMode} onChange={handleChange} />
                        <label className="absolute -top-2 left-2 rounded-md bg-crimson px-2 text-base text-white duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-crimson peer-focus:text-sm peer-focus:text-white">
                        Address
                            </label>
                        </div>
                        
                    </div>
                    <div className='flex-1 flex flex-col gap-6'>
                        <div className="relative w-full">
                        <InputField name='email' value={formData.email} placeholder='Email' type='email' disabled={!isEditMode} onChange={handleChange} readOnly={true} />
                        <label className="absolute -top-2 left-2 rounded-md bg-crimson px-2 text-base text-white duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-crimson peer-focus:text-sm peer-focus:text-white">
                        Email
                            </label>
                        </div>
                        <div className="relative w-full">
                        <InputField name='state' value={formData.state} placeholder='State' disabled={!isEditMode} onChange={handleChange} />
                        <label className="absolute -top-2 left-2 rounded-md bg-crimson px-2 text-base text-white duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-crimson peer-focus:text-sm peer-focus:text-white">
                        State
                            </label>
                        </div>
                        <div className="relative w-full">
                        <InputField name='zipcode' value={formData.zipcode} placeholder='Pincode' disabled={!isEditMode} onChange={handleChange} />
                        <label className="absolute -top-2 left-2 rounded-md bg-crimson px-2 text-base text-white duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-crimson peer-focus:text-sm peer-focus:text-white">
                        Pincode
                            </label>
                        </div>
                        
                        <div className="relative w-full">
                        <InputField name='height' value={formData.height} placeholder='Height in feet' disabled={!isEditMode} onChange={handleChange} />
                        <label className="absolute -top-2 left-2 rounded-md bg-crimson px-2 text-base text-white duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-crimson peer-focus:text-sm peer-focus:text-white">
                        Height
                            </label>
                        </div>
                        
                    </div>
                </form>


        <div className="flex flex-col w-full gap-4 sm:flex-row sm:justify-center sm:gap-32 mt-5 sm:mt-9">
          <ActionButton
            label="Update Account"
            onClick={handleUpdateForm}
            disabled={!isEditMode}
            className={!isEditMode ? "cursor-not-allowed opacity-50" : ""}
          />
          <ActionButton
            label="Cancel"
            isCancel
            onClick={handleCancelFormUpdate}
          />
        </div>

                {isModalOpen && (
                    <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                        <div className='bg-white p-10 rounded-lg shadow-lg max-md:w-3/4 max-md:py-6 '>                      
                           <div className=' flex justify-between'>
                           <h2 className='text-xl font-semibold mb-8'>Edit Profile Image</h2>
                           {/* close icon */}
                           <h3 type="button" onClick={handleCancelImage}    ><IoMdClose className='hover:bg-slate-300 rounded-full p-1 text-10xl' /></h3>
                           </div>
                            <div className='flex flex-col items-center w-80 h-80 rounded-full  max-md:w-60 ml-3'>
                                <div className='w-full h-full rounded-full  items-center'>
                                <img
                                    loading="lazy"
                                    src={profileImage}  // This will now display the Cloudinary image URL
                                    className='w-full h-full rounded-full object-contain mb-6'
                                    alt="Profile"
                                />
                                
                                </div>
                              
                            </div>
                            <div className='flex justify-between mt-6 gap-3'>
                                {/* <ActionButton label='Upload' onChange={handleImageChange}  accept='image/*'  /> */}
                                <ActionButton label='Upload'
                                 onClick={handleSaveImage}
                                 disabled={isUpLoader}
                                 />
                                 {isUpLoader?<Loader className=" z-10"/>:""}
                                <ActionButton label='Remove'
                                 onClick={handleRemoveImage}
                                 disabled={isUpLoader} 
                                />
                               
                                {/* <button className='w-full sm:w-36 h-12 text-lg font-medium rounded-md border-2 transition-colors duration-200 cursor-pointer text-[#F8444F] border-solid border-[#F8444F] bg-transparent hover:bg-[#F8444F] hover:text-white text-center flex justify-center items-center'
                                onClick={handleRemoveImage}
                                >
                                    Remove
                                </button> */}
                                {/* <ActionButton label='Cancel' isCancel onClick={handleCancelImage} /> */}
                            </div>
                            
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

// InputField Component for reuse
const InputField = ({ name, value, placeholder, type = 'text', maxLength, onChange, readOnly, disabled }) => (
    <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        className='p-3 border-[#D3D3D3] border-2 rounded-md outline-none w-full'
    />
);

const ActionButton = ({
  label,
  isCancel = false,
  onClick,
  disabled = false,
}) => (
  <button
    onClick={disabled ? null : onClick}
    disabled={disabled}
    className={`w-full sm:w-36 h-12 text-lg font-medium rounded-md border-2 transition-colors duration-200 cursor-pointer ${
      disabled ? "opacity-50" : ""
    } ${
      isCancel
        ? "border-[#F8444F] text-[#F8444F] bg-transparent hover:bg-[#F8444F] hover:text-white"
        : "border-[#F8444F] bg-[#F8444F] text-white"
    }`}
  >
    {label}
  </button>
);
export default CustomerProfile;

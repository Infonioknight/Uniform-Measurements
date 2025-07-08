import React, { useState,useEffect } from 'react';
import { useLocation,useNavigate ,Link} from 'react-router-dom';
import { baseUrl } from '../../baseUrl/BaseUrl';
import Swal from 'sweetalert2'
import axios from 'axios';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'


const validateField = (field, value) => {
  if (field === 'name') {
    return value.trim() !== '';
  } else if (field === 'age') {
    return !isNaN(value) && parseInt(value) > 0;
  } else if (field === 'chestSize' || field === 'shoulderSize' || field === 'frontLength') {
    return !isNaN(value) && parseFloat(value) >= 0;
  }
  return true;
};

export default function BodyMeasurement() {
  const location = useLocation();
  const { userEmail } = location.state || {};
  const { isFromEmailVerify } = location.state || null;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email:userEmail,
    chestSize: '',
    shoulderSize: '',
    frontLength: '',
    waist:'',
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let formValid = true;
    const newErrors = {};
  
    // Validate each field in formData
    Object.keys(formData).forEach((field) => {
      const isValid = validateField(field, formData[field]);
      if (!isValid) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        formValid = false;
      }
    });
  
    // If form is not valid, set errors and return
    if (!formValid) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const response = await axios.post(`${baseUrl}/user/men-top-wear`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        Swal.fire({
          title: 'Data updated successfully',
          text: 'Thank You',
          icon: 'success',
        });
        navigate('/user/ThankYou');
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  useEffect(()=>{
    if(userEmail == null || userEmail == undefined){
        navigate("/")
    }
  },[])

  return (
    <>
    <div className="w-full h-4 bg-[#f9454f]"></div>

    <Navbar/>
    {/* </div> */}
    <div>
      <div className="flex flex-col pb-20 bg-white">
      <div className="flex bg-[#f9454f] flex-col px-4 pt-2 pb-6 w-full bg-red-500 max-md:px-5 max-md:max-w-full">
      
        <div className="self-center mt-4 text-5xl font-bold leading-4 text-center text-black max-md:mt-10">
          Tailor Your Style
        </div>
        <div className="text-2xl font-semibold mt-4 text-center text-black">
          Men's Topwear Measurement Form
        </div>
      </div>
      <div className="flex flex-col items-center pl-4 mt-2 w-full max-md:pl-5 max-md:mt-10 max-md:max-w-full">
        
        <div className="mt-8 w-full max-w-[1304px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col justify-center text-base font-semibold text-slate-900 max-md:mt-10 max-md:max-w-full">
                <div className="text-lg max-md:max-w-full">
                  Let's get to know you!
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-5">
                      <label className="block text-lg mb-2" htmlFor="fullName">Please Enter Your Full Name</label>
                      <input
                        name="name"
                        value={formData.name}
                        type="text"
                        className="w-full px-3 py-2 bg-white rounded-md border border-solid border-slate-300 text-zinc-500"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div className="mt-14">
                      <label className="block text-lg mb-2" htmlFor="age">Age - Just a number, but it's important for that perfect fit</label>
                      <input
                        name="age"
                        value={formData.age}
                        type="number"
                        className="w-full px-3 py-2 bg-white rounded-md border border-solid border-slate-300 text-zinc-500"
                        placeholder="Age"
                        onChange={handleChange}
                        required
                      />
                      {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                    </div>
                    <div className="mt-14">
                      <label className="block text-lg mb-2" htmlFor="chestSize">Measure Your Chest - Your gateway to a well-fitted look!</label>
                      <input
                        name="chestSize"
                        value={formData.chestSize}
                        type="number"
                        className="w-full px-3 py-2 bg-white rounded-md border border-solid border-slate-300 text-zinc-500"
                        placeholder="Chest Size (in inch)"
                        onChange={handleChange}
                        required
                      />
                      {errors.chestSize && <p className="text-red-500 text-xs mt-1">{errors.chestSize}</p>}
                    </div>
                    <div className="mt-14">
                      <label className="block text-lg mb-2" htmlFor="shoulderSize">Broaden Your Horizons - Measure your shoulders</label>
                      <input
                        name="shoulderSize"
                        value={formData.shoulderSize}
                        type="number"
                        className="w-full px-3 py-2 bg-white rounded-md border border-solid border-slate-300 text-zinc-500"
                        placeholder="Shoulder Size (in inch)"
                        onChange={handleChange}
                        required
                      />
                       {errors.shoulderSize && <p className="text-red-500 text-xs mt-1">{errors.shoulderSize}</p>}
                    </div>
                    <div className="mt-14">
                      <label className="block text-lg mb-2" htmlFor="frontLength">Define Your Look - How long do you want it to be?</label>
                      <input
                        name="frontLength"
                        value={formData.frontLength}
                        type="number"
                        className="w-full px-3 py-2 bg-white rounded-md border border-solid border-slate-300 text-zinc-500"
                        placeholder="Front Length (in inch)"
                        onChange={handleChange}
                        required
                      />
                      {errors.frontLength && <p className="text-red-500 text-xs mt-1">{errors.frontLength}</p>}
                    </div>
                    <div className="mt-14">
                      <label className="block text-lg mb-2" htmlFor="waist">To ensure we get the perfect fit for you, could you please provide your waist size?</label>
                      <input
                        name="waist"
                        value={formData.waist}
                        type="number"
                        className="w-full px-3 py-2 bg-white rounded-md border border-solid border-slate-300 text-zinc-500"
                        placeholder="Front Length (in inch)"
                        onChange={handleChange}
                        required
                      />
                      {errors.frontLength && <p className="text-red-500 text-xs mt-1">{errors.waist}</p>}
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-2.5 mt-14 font-bold text-white bg-red rounded-md leading-[126%] max-md:px-5 lg:w-10% max-md:mt-8"
                    >
                      Submit and Elevate Your Style!
                    </button>
                  </form>
             </div>
          </div>
             <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
               <div className="flex flex-col grow mt-14 max-md:mt-10 max-md:max-w-full">
                 <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3f14efe7685af3924c82b02319675450b3d1566631569c1d09154664d3471998?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3f14efe7685af3924c82b02319675450b3d1566631569c1d09154664d3471998?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3f14efe7685af3924c82b02319675450b3d1566631569c1d09154664d3471998?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3f14efe7685af3924c82b02319675450b3d1566631569c1d09154664d3471998?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3f14efe7685af3924c82b02319675450b3d1566631569c1d09154664d3471998?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3f14efe7685af3924c82b02319675450b3d1566631569c1d09154664d3471998?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3f14efe7685af3924c82b02319675450b3d1566631569c1d09154664d3471998?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3f14efe7685af3924c82b02319675450b3d1566631569c1d09154664d3471998?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
                  className="max-w-full aspect-[1.04] w-[520px]"
                />
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/011bc4f45913c29fb847f57f3ad39c50f1d8b3cbfe4125b9818b62fb0ec7a481?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/011bc4f45913c29fb847f57f3ad39c50f1d8b3cbfe4125b9818b62fb0ec7a481?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/011bc4f45913c29fb847f57f3ad39c50f1d8b3cbfe4125b9818b62fb0ec7a481?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/011bc4f45913c29fb847f57f3ad39c50f1d8b3cbfe4125b9818b62fb0ec7a481?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/011bc4f45913c29fb847f57f3ad39c50f1d8b3cbfe4125b9818b62fb0ec7a481?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/011bc4f45913c29fb847f57f3ad39c50f1d8b3cbfe4125b9818b62fb0ec7a481?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/011bc4f45913c29fb847f57f3ad39c50f1d8b3cbfe4125b9818b62fb0ec7a481?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/011bc4f45913c29fb847f57f3ad39c50f1d8b3cbfe4125b9818b62fb0ec7a481?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
                  className="self-end mt-16 max-w-full aspect-[0.65] w-[173px] max-md:mt-10"
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

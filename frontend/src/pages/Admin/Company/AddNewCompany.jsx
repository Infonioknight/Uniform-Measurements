import React, { useState } from 'react';
import { baseUrl } from '../../../baseUrl/BaseUrl';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

const NewCompany = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    companyAddress: '',
    companyContactNum: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.companyName || !formData.companyEmail || !formData.companyAddress || !formData.companyContactNum) {
      Swal.fire({
        title: 'Error',
        text: 'All fields are required',
        icon: 'error',
      });
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/company`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      Swal.fire({
        title: 'Success',
        text: response?.data?.message,
        icon:'success',
      });
        setFormData({
          companyName: '',
          companyEmail: '',
          companyAddress: '',
          companyContactNumber: '',
        });
        navigate("/admin/dashboard");
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      })
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-600">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            required
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-600">
            Company Email
          </label>
          <input
            type="email"
            id="companyEmail"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-600">
            Company Address
          </label>
          <input
            type="text"
            id="companyAddress"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
         
        </div>

        <div className="mb-4">
          <label htmlFor="companyContactNumber" className="block text-sm font-medium text-gray-600">
            Company Contact Number
          </label>
          <input
            type="tel"
            id="companyContactNumber"
            name="companyContactNum"
            value={formData.companyContactNum}
            required
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4 cursor-pointer"
          >
            Submit
          </button>
          <Link
          to={"/admin/dashboard"}
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-2 rounded-md"
          role="button"
          aria-pressed="true"
        >
          Back
        </Link>
        </div>
      </form>
    </div>
  );
};

export default NewCompany;

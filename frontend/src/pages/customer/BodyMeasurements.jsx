import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import CustomerHeader from "../../components/customer/CustomerHeader";
import Sliderbar from "../../components/customer/Slidebar";
import measurement from "../../assets/measurement.png";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../../baseUrl/BaseUrl";
import { Link } from 'react-router-dom';
import { RiBodyScanFill } from "react-icons/ri";
import SideViewCapture from "./SideViewCapture";
import LandingPage from "./LandingPage";

// Validation ranges
const validationRanges = {
  chest: { min: 6, max: 70 },
  shoulder: { min: 11, max: 30 },
  waist: { min: 18, max: 100 },
  inseam: { min: 9, max: 100 },
  outseam: { min: 9, max: 100 },
  height: { min: 60, max: 200 },
  weight: { min: 10, max: 200 },
};

const InputField = ({ label, value, onChange, placeholder, error, name }) => (
  <div className="w-full px-3 mb-4 md:mb-0 pt-4">
    <label className="font-bold">{label}</label>
    <input
      className={`appearance-none mt-2 block w-full h-10 bg-gray-100 text-gray-700 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded py-2 px-4 mb-1 leading-tight focus:outline-none focus:bg-white`}
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
);

function BodyMeasurements() {
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    chest: "",
    shoulder: "",
    waist: "",
    inseam: "",
    outseam: "",
    height: "",
    weight: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    if (isNaN(numericValue) && value !== "") {
      setErrors((prev) => ({ ...prev, [name]: "Must be a number." }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
    
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const hasMeasurements = ["chest", "shoulder", "waist", "inseam", "outseam"].some(
      (key) => formData[key] !== ""
    );
    const hasHW = formData.height !== "" || formData.weight !== "";

    if (!hasMeasurements && !hasHW) {
      newErrors.form = "Please provide either body measurements or height/weight.";
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") {
        const range = validationRanges[key];
        const numeric = parseFloat(value);
        if (isNaN(numeric) || (range && (numeric < range.min || numeric > range.max))) {
          newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} must be between ${range.min} and ${range.max}.`;
        }
      }
    });

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post(
          `${baseUrl}/user/body/measurement/${userId}`,
          formData,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Success!",
            text: "Your measurements have been submitted.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Submit Failed",
          text: error.response?.data?.message || "Failed to submit.",
          icon: "error",
        });
      }
      setErrors({});
    }
  };

  useEffect(() => {
    const fetchMeasurements = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/body/measurement/${userId}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (response.status === 200 && response.data.measurement) {
          setFormData((prev) => ({ ...prev, ...response.data.measurement }));
        }
      } catch (err) {
        console.error("Error fetching measurements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurements();
  }, [userId]);

  const measurementFields = [
  { key: "height", label: "Height (in cm)" },
  { key: "weight", label: "Weight (in kgs)" },
];

const [showNotification, setShowNotification] = useState(true);
const [showUploadDialog, setShowUploadDialog] = useState(false);
const [showLandingModal, setShowLandingModal] = useState(false);


  return (
    <div className="flex flex-col md:flex-row w-full h-full p-3">
      <div>
        <Sliderbar />
      </div>

      <main className="w-full h-full overflow-auto scrollbar-hide px-4 md:px-8">
        <CustomerHeader />

        <div className="flex flex-row items-center justify-between py-5">
          <h2 className="text-xl font-bold text-zinc-600 py-5">
            Body Measurements <span className="text-sm text-zinc-400">(In Inches)</span>
          </h2>
          
  {/* Tooltip and Icon */}

  <div className="relative flex items-center ml-auto">
  {/* Notification Tooltip */}
  {showNotification && (
    <div className="absolute -bottom-16 right-0 z-10 bg-[#F8444F] text-white text-sm rounded-xl p-3 w-80 shadow-lg">
      <p>
        Click on the icon to take a picture and get your measurements.
      </p>
    </div>
  )}

  {/* Icon Button to Trigger Modal */}
  <button
    onClick={() => {
      setShowLandingModal(true); // Open the LandingPage modal directly
      setShowUploadDialog(true); // Optional: control upload dialog
      setShowNotification(false); // Hide tooltip
    }}
    className="w-20 h-20 flex items-center justify-center bg-transparent text-crimson hover:text-black transition-colors duration-300"
  >
    <RiBodyScanFill className="w-10 h-10" />
  </button>

  {/* LandingPage Modal */}
  {/* {showLandingModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <button
          onClick={() => setShowLandingModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>
        <LandingPage />
    </div>
  )} */}
  {showLandingModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <button
      onClick={() => setShowLandingModal(false)}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
    >
      &times;
    </button>
    <LandingPage />
  </div>
)}

</div>
        </div>
      

        {loading ? (
          <p className="text-center text-lg">Loading measurements...</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">
            {/* Form Section */}
            <div className="lg:w-1/2">
              {errors.form && (
                <p className="text-red-500 text-sm mb-3">{errors.form}</p>
              )}
              <div className="space-y-8">
                
  {/* Section: Height & Weight */}
  <div>
    <h3 className="text-lg font-semibold text-zinc-700 mb-2">Height & Weight</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {measurementFields.map(({ key, label }) => (
    <InputField
      key={key}
      name={key}
      label={`${label} (${validationRanges[key].min}–${validationRanges[key].max})`}
      value={formData[key]}
      onChange={handleInputChange}
      placeholder={`Enter your ${label.toLowerCase()}`}
      error={errors[key]}
    />
  ))}

    </div>
  </div>

  {/* OR Divider */}
  <div className="flex items-center justify-center my-4">
    <div className="border-t border-gray-300 flex-grow"></div>
    <span className="px-4 text-gray-500 font-medium text-sm">OR</span>
    <div className="border-t border-gray-300 flex-grow"></div>
  </div>

  {/* Section: Body Measurements */}
  <div>
    <h3 className="text-lg font-semibold text-zinc-700 mb-2">Body Measurements</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {["chest", "shoulder", "waist", "inseam", "outseam"].map((field) => (
        <InputField
          key={field}
          name={field}
          label={
            field.charAt(0).toUpperCase() +
            field.slice(1) +
            ` (${validationRanges[field].min}–${validationRanges[field].max})`
          }
          value={formData[field]}
          onChange={handleInputChange}
          placeholder={`Enter your ${field}`}
          error={errors[field]}
        />
      ))}
    </div>
  </div>
</div>


              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-crimson text-white hover:text-crimson font-semibold py-2 px-6 h-10 border-2 rounded border-crimson hover:bg-black transition-all duration-300"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="lg:w-1/2 flex items-center justify-center">
              <img
                src={measurement}
                alt="Measurement Guide"
                className="w-full max-w-md rounded shadow-md"
              />
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

export default BodyMeasurements;

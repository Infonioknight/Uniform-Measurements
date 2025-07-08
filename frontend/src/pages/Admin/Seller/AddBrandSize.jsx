import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import { MdOutlineBrandingWatermark, MdOutlineCategory, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { MdOutlinePerson2 } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import Loader from "../../../components/Loader/Loader";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { GiClothes } from "react-icons/gi";
import Hero from "../../../components/Hero";
import SideMenu from "../../../components/SideMenu";


const AddBrandSize = (props) => {
  const params = useParams();
  const sellerId = params.sellerId;
  const navigate = useNavigate();
  const [wearType, setWearType] = useState("Upper Bodywear");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    brandName: "",
    brandSize: "",
    gender: "",
    category: "",
    chest: "",
    length: "",
    shoulder: "",
    waist: "",
    wear: "",
    inseam: "",
    outseam: "",
  });

  const updateRowData = () => {
    if(props?.backAllBrand){
      let row = props.rowData
      console.log(row)
      setFormData({
      brandName: row.brandName,
      brandSize: row.brandSize,
      gender: row.gender,
      category: row.category,
      chest: row.chest,
      length: row.length,
      shoulder: row.shoulder,
      waist: row.waist,
      wear: row.wear,
      inseam: row.inseam,
    outseam: row.outseam,
      })
      
    }
  }
  
  const validateField = (field, value) => {
    if (field === "brandName") {
      return value.trim() !== "";
    }
    else if (field === "gender") {
      return value.trim() !== "" && isNaN(value);
    }
    else if (field === "category") {
      return value.trim() !== "";
    }
    else if (wearType === "Upper Bodywear") {
      if (field === "chest" ||
        field === "length" ||
        field === "shoulder") {
        return !isNaN(value) && value.trim() !== "";
      }
    }
    else if (wearType === "Lower Bodywear") {
      if (field === "waist") {
        return !isNaN(value) && value.trim() !== "";
      }
    }
    return true;
  };
  const negValue = (field, value) => {
    if (wearType === "Upper Bodywear") {
      if (field === "chest" ||
        field === "length" ||
        field === "shoulder") {
        return parseFloat(value) < 0;
      }
    }
    else if (wearType === "Lower Bodywear") {
      if (field === "waist") {
        return parseFloat(value) < 0;
      }
    }
  }
  const validName = (field, value) => {
    if (field === "brandName") {
      return isNaN(parseInt(value));
    }
    return false;
  }


  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const isValid = validateField(field, formData[field]);
      const isNeg = negValue(field, formData[field])
      let validateName = true
      if (field === "brandName") {
        validateName = validName(field, formData[field]);
      }

      if (!isValid) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)
          } is required`;
        formValid = false;
      }
      else if (isNeg) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)
          } shouldn't be negative `
        formValid = false;
      }
      else if (!validateName) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is not valid  `
        formValid = false;
      }
    });

    if (!formValid) {
      setErrors(newErrors);
      return;
    }
    try {
      setLoading(true);
      formData.wear = wearType;
      const response = await axios.post(
        `${baseUrl}/seller/brandSize/${sellerId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        Swal.fire({
          title: "Brand Size Added successfully",
          text: "Thank You",
          icon: "success",
        });
        navigate(`/admin/seller/brand/${sellerId}`)
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/seller/fabric/category/${sellerId}`,
          {
           withCredentials: true,
          }
        );
        setCategories(response.data.Categories);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error?.response?.data?.error || error?.response?.data?.message,
          icon: 'error',
        });
        // Handle error
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    updateRowData();
  }, []);

  // Handle Update Data
  const updatebrandData = async () => {
    try {
      const response = await axios.put(
        `${baseUrl}/update/fabric/brand/${props.rowData._id}`,
        {
         withCredentials: true,
         body:formData,
        }
      );
      if (response.status === 200){
        Swal.fire({
          title : "Brand Size updated successfully",
          text: "Thank You",
          icon: "success",
        });
        props?.backAllBrandFc(!props?.backAllBrand);
      }else{
        Swal.fire({
          title : "Error updating brand size.",
          text: "Please try again.",
          icon: "error",
        })

      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      });
      // Handle error
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <div className="w-full h-4 bg-[#f9454f]"></div>
      <Navbar />
      <Hero page='"Add Category of your Stock"' subtitle='Please fill out the following information to add a new Category to database' />

      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12">
        <div className="col-span-1 md:col-span-4 lg:col-span-3 h-auto md:border-r md:border-solid md:border-black  lg:border-r lg:border-solid lg:border-black">
          <SideMenu sellerId={sellerId} />
        </div>
        <div className="col-span-1 md:col-span-8 lg:col-span-9 h-auto font-poppins">
          <div className="flex flex-row items-center gap-2 mt-8 justify-center mb-6">
            <MdOutlineCategory className="text-3xl" />
            <strong className="text-3xl">Add New Brand Size</strong>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto p-6 bg-white">
            <div className="flex flex-col gap-6 text-sm font-body-ui">

              {/* Brand Name */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <label
                  htmlFor="brandName"
                  className="w-full md:w-1/3 text-sm md:text-base font-medium text-gray-700"
                >
                  Brand Name
                </label>
                <div className="w-full md:w-2/3">
                  <input
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleChange}
                    className="w-full rounded-md py-2 px-3 border border-slategray focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brand Name"
                    type="text"
                  />
                  {errors.brandName && (
                    <p className="text-red-500 text-xs mt-1">{errors.brandName}</p>
                  )}
                </div>
              </div>

              {/* Brand Size */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <label
                  htmlFor="brandSize"
                  className="w-full md:w-1/3 text-sm md:text-base font-medium text-gray-700"
                >
                  Brand Size
                </label>
                <div className="w-full md:w-2/3">
                  <input
                    name="brandSize"
                    value={formData.brandSize}
                    onChange={handleChange}
                    className="w-full rounded-md py-2 px-3 border border-slategray focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brand Size"
                    type="text"
                  />
                  {errors.brandSize && (
                    <p className="text-red-500 text-xs mt-1">{errors.brandSize}</p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <label
                  htmlFor="category"
                  className="w-full md:w-1/3 text-sm md:text-base font-medium text-gray-700"
                >
                  Category
                </label>
                <div className="w-full md:w-2/3">
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        category: e.target.value,
                      }))
                    }
                    className="w-full rounded-md py-2 px-3 border border-slategray focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.FabricCategory}>
                        {category.FabricCategory}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Gender */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <label
                  htmlFor="gender"
                  className="w-full md:w-1/3 text-sm md:text-base font-medium text-gray-700"
                >
                  Gender
                </label>
                <div className="w-full md:w-2/3">
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        gender: e.target.value,
                      }))
                    }
                    className="w-full rounded-md py-2 px-3 border border-slategray focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>

              {/* Wear Type */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <label
                  htmlFor="wearType"
                  className="w-full md:w-1/3 text-sm md:text-base font-medium text-gray-700"
                >
                  Wear Type
                </label>
                <div className="w-full md:w-2/3">
                  <select
                    id="wearType"
                    value={wearType}
                    onChange={(e) => setWearType(e.target.value)}
                    className="w-full rounded-md py-2 px-3 border border-slategray focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Upper Bodywear">Upper Bodywear</option>
                    <option value="Lower Bodywear">Lower Bodywear</option>
                    <option value="Full Bodywear">Full Bodywear</option>
                  </select>
                </div>
              </div>

              {/* Conditional Inputs */}
              {wearType === "Upper Bodywear" || wearType === "Full Bodywear" ? (
                <>
                  {/* Chest Size */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <label
                      htmlFor="chest"
                      className="w-full md:w-1/3 text-sm md:text-base font-medium text-gray-700"
                    >
                      Chest Size (inch)
                    </label>
                    <div className="w-full md:w-2/3">
                      <input
                        name="chest"
                        value={formData.chest}
                        onChange={handleChange}
                        className="w-full rounded-md py-2 px-3 border border-slategray focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="In Inch"
                        type="number"
                      />
                      {errors.chest && (
                        <p className="text-red-500 text-xs mt-1">{errors.chest}</p>
                      )}
                    </div>
                  </div>

                  {/* Shoulder Size */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <label
                      htmlFor="shoulder"
                      className="w-full md:w-1/3 text-sm md:text-base font-medium text-gray-700"
                    >
                      Shoulder Size (inch)
                    </label>
                    <div className="w-full md:w-2/3">
                      <input
                        name="shoulder"
                        value={formData.shoulder}
                        onChange={handleChange}
                        className="w-full rounded-md py-2 px-3 border border-slategray focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="In Inch"
                        type="number"
                      />
                      {errors.shoulder && (
                        <p className="text-red-500 text-xs mt-1">{errors.shoulder}</p>
                      )}
                    </div>
                  </div>

                  {/* Front Length */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <label
                      htmlFor="length"
                      className="w-full md:w-1/3 text-sm md:text-base font-medium text-gray-700"
                    >
                      Front Length (inch)
                    </label>
                    <div className="w-full md:w-2/3">
                      <input
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                        className="w-full rounded-md py-2 px-3 border border-slategray focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="In Inch"
                        type="number"
                      />
                      {errors.length && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.length}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Waist Size */}
                  {wearType === "Full Bodywear" && (
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <label
                        htmlFor="waist"
                        className="w-full md:w-1/3 text-sm md:text-base font-medium text-gray-700"
                      >
                        Waist Size (inch)
                      </label>
                      <div className="w-full md:w-2/3">
                        <input
                          name="waist"
                          value={formData.waist}
                          onChange={handleChange}
                          className="w-full rounded-md py-2 px-3 border border-slategray focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="In Inch"
                          type="number"
                        />
                        {errors.waist && (
                          <p className="text-red-500 text-xs mt-1">{errors.waist}</p>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <label
                    htmlFor="waist"
                    className="w-full md:w-1/3 text-sm md:text-base font-medium text-gray-700"
                  >
                    Waist Size (inch)
                  </label>
                  <div className="w-full md:w-2/3">
                    <input
                      name="waist"
                      value={formData.waist}
                      onChange={handleChange}
                      className="w-full rounded-md py-2 px-3 border border-slategray focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="In Inch"
                      type="number"
                    />
                    {errors.waist && (
                      <p className="text-red-500 text-xs mt-1">{errors.waist}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <label
                    htmlFor="inseam"
                    className="w-full md:w-1/3 text-sm md:text-base font-medium text-gray-700"
                  >
                    inseam Size (inch)
                  </label>
                  <div className="w-full md:w-2/3">
                    <input
                      name="inseam"
                      value={formData.inseam}
                      onChange={handleChange}
                      className="w-full rounded-md py-2 px-3 border border-slategray focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="In Inch"
                      type="number"
                    />
                    {errors.inseam && (
                      <p className="text-red-500 text-xs mt-1">{errors.inseam}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <label
                    htmlFor="outseam"
                    className="w-full md:w-1/3 text-sm md:text-base font-medium text-gray-700"
                  >
                    outseam Size (inch)
                  </label>
                  <div className="w-full md:w-2/3">
                    <input
                      name="outseam"
                      value={formData.outseam}
                      onChange={handleChange}
                      className="w-full rounded-md py-2 px-3 border border-slategray focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="In Inch"
                      type="number"
                    />
                    {errors.outseam && (
                      <p className="text-red-500 text-xs mt-1">{errors.outseam}</p>
                    )}
                  </div>
                </div>
                </>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-row items-center justify-center gap-8 mt-8">
              {loading ? (
                <Loader />
              ) : (
                  props?.backAllBrand?
                    <button
                      onClick={updatebrandData}
                      className="w-[130px] lg:w-[160px] text-[12px] lg:text-base font-poppins text-white bg-crimson rounded py-3 px-3.5 flex items-center justify-center cursor-pointer"
                    >
                    Update Brand
                    </button>

                  :
                    <button
                      type="submit"
                      className="w-[130px] lg:w-[160px] text-[12px] lg:text-base font-poppins text-white bg-crimson rounded py-3 px-3.5 flex items-center justify-center cursor-pointer"
                    >
                    Submit
                    </button>
                
              )}
              {props?.backAllBrand?
                  <button
                  type="button"
                  onClick={() => props?.backAllBrandFc(!props?.backAllBrand)}
                  className="w-[80px] lg:w-auto text-[12px] lg:text-base font-poppins text-black bg-transparent rounded py-3 px-3.5 flex items-center justify-center border border-black cursor-pointer"
                >
                  Back
                </button>
              :
                <button
                type="button"
                onClick={() => navigate(`/admin/seller/brand/${sellerId}`)}
                className="w-[80px] lg:w-auto text-[12px] lg:text-base font-poppins text-black bg-transparent rounded py-3 px-3.5 flex items-center justify-center border border-black cursor-pointer"
              >
                Cancel
              </button>
              }
            </div>

          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddBrandSize;
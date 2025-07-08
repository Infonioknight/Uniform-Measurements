import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { LiaTshirtSolid } from "react-icons/lia";
import Footer from "../../../components/Footer";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setBrand } from "../../../slices/brand";
import { setCategory } from "../../../slices/category";
import { updateStock } from "../../../slices/stock";
import Hero from "../../../components/Hero";
import SideMenu from "../../../components/SideMenu";

const AddNewStock = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { brandItems } = useSelector((state) => state.brand);
  const { categoryItems } = useSelector((state) => state.category);

  const handleBack = () => {
    navigate("/admin/seller"); // Navigate to the /admin/seller URL
  };
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState([
    false,
    false,
    false,
    false,
  ]); // Loading state for each image
  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]); // Preview URL for each slot
  const [prevImageId, setPrevImageId] = useState(null);
  const [sizes, setSizes] = useState([{ size: "", stock: 0 }]);
  const [formData, setFormData] = useState({
    fabricName: "",
    Brand: "",
    sizes: {},
    Color: "",
    Description: "",
    Price: "",
    Category: "",
    Images: [], // Array to store multiple images
    gender: "",
    fit_Type: "",
    Discount: "",
    wear_type: "",
  });
  const [categories, setCategories] = useState([]);
  const [brandList, setBrandList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancel = (e) => {
    setFormData({
      fabricName: "",
      Brand: "",
      sizes: [],
      Color: "",
      Description: "",
      Price: "",
      Category: "",
      Image: "",
    });
  };

  // handle product price for being negative

  const [ isPrice , setIsPrice ] = useState(false);
  const handlePrice = (e) => {
    const prodPrice = e.target.value;
    if(prodPrice <= 0){
      e.target.className = "w-full px-4 py-2 border rounded-md focus:outline-crimson focus:ring focus:ring-crimson";
      setIsPrice(true);
    } else {
      setIsPrice(false);
      e.target.className = "w-full px-4 py-2 border rounded-md focus:outline-blue-200 focus:ring focus:ring-blue-200";
    }
  }

  // Handle single or multiple image uploads with a limit of 4 images
  const handleImageChange = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageData = new FormData();
    imageData.append("file", file);

    try {
      setImageLoading((prevLoading) => {
        const newLoading = [...prevLoading];
        newLoading[index] = true;
        return newLoading;
      });

      const { data } = await axios.post(`${baseUrl}/upload/image`, imageData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      // Update previews and form data with the new image at the specified index
      setImagePreviews((prev) => {
        const newPreviews = [...prev];
        newPreviews[index] = data.url;
        return newPreviews;
      });
      setFormData((prevData) => {
        const newImages = [...prevData.Images];
        newImages[index] = { url: data.url, publicId: data.imageId };
        return { ...prevData, Images: newImages };
      });
    } catch (error) {
      console.error("Error uploading image:", error.message);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message,
        icon: "error",
      });
    } finally {
      setImageLoading((prevLoading) => {
        const newLoading = [...prevLoading];
        newLoading[index] = false;
        return newLoading;
      });
    }
  };

  const removeImage = async (index) => {
    const imageToRemove = formData.Images[index];

    try {
      await axios.delete(`${baseUrl}/upload/image/${imageToRemove.publicId}`, {
        withCredentials: true,
      });
      console.log("Image deleted from Cloudinary");
    } catch (error) {
      console.error("Error deleting image:", error.message);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message,
        icon: "error",
      });
    }

    // Update previews and form data to remove the deleted image
    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      newPreviews[index] = null;
      return newPreviews;
    });
    setFormData((prevData) => {
      const newImages = [...prevData.Images];
      newImages[index] = null;
      return { ...prevData, Images: newImages };
    });
  };

  const params = useParams();
  const sellerId = params.id;
const handleSubmit = async (e) => {
  e.preventDefault();

  if (isPrice) {
    Swal.fire({
      title: "Error",
      text: "Please enter valid data in the form.",
      icon: "error",
    });
    return;
  }

  setLoading(true);

  try {
    const updatedFormData = { ...formData, Size: sizes };

    const response = await axios.post(
      `${baseUrl}/seller/fabric/stock/${sellerId}`,
      updatedFormData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const addedProduct = response.data.product;
    dispatch(updateStock(addedProduct));

    Swal.fire({
      title: "Product Added Successfully",
      text: "Thank You",
      icon: "success",
    });

    setFormData({
      fabricName: "",
      Brand: "",
      Size: [], 
      Color: "",
      Description: "",
      Price: "",
      Category: "",
      Images: [],
      gender: "",
      fit_Type: "",
      Discount: "",
      wear_type: "",
    });

    setSizes([{ size: "", stock: 0 }]); 
    setImagePreviews([null, null, null, null]); 
  } catch (error) {
    console.error("Error adding stock:", error);
    Swal.fire({
      title: "Error",
      text: error?.response?.data?.error || error?.response?.data?.message,
      icon: "error",
    });
    setErrors(error?.response?.data?.errors);
  }

  setLoading(false);
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lets first fetch the categories and brand list from the Local storage
        // if not found then fetch from the server
        if (
          !categoryItems ||
          !brandItems ||
          categoryItems.length === 0 ||
          brandItems.length === 0
        ) {
          // console.log("Fetching data from server");
          const response = await axios.get(
            `${baseUrl}/seller/fabric/category/${sellerId}`,
            {
              withCredentials: true,
            }
          );
          setCategories(response.data.Categories);
          dispatch(setCategory(response.data.Categories));

          setBrandList(response.data.brandList);
          //Save brand in the local storage
          dispatch(setBrand(response.data.brandList));
        } else {
          // console.log("Fetching data from Local storage");
          // If Local storage has data, use it
          // setCategories with the data at the local storage
          setCategories(categoryItems);
          // Set brandList with the data at the local storage
          setBrandList(brandItems);
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Lets get all the unique brand names
  const uniqueBrandNames = [
    ...new Set(brandList.map((brand) => brand.brandName.toLowerCase().trim())),
  ];

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = value;
    setSizes(updatedSizes);
  };

  const addSize = () => setSizes([...sizes, { size: "", stock: 0 }]);
  const removeSize = (index) => setSizes(sizes.filter((_, i) => i !== index));
  
  return (
    <>
      <div className="w-full h-4 bg-[#f9454f]"></div>
      <Navbar />
      <Hero
        page='"Add New Stock"'
        subtitle=" Please fill out the following information to add a new clothing item to our inventory."
      />
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12">
        <div className="col-span-1 md:col-span-4 lg:col-span-3 h-auto  border-r border-solid border-black">
          <SideMenu sellerId={sellerId} />
        </div>
        <div className="col-span-1 md:col-span-8 lg:col-span-9  h-auto font-poppins">
          <div className="flex flex-row items-center justify-center gap-2 mt-10  mb-10">
            <LiaTshirtSolid className="h-9 w-9 mr-2 hover:cursor-pointer" />
            <h1 className="font-medium text-[24px] max-md:text-base max-sm:text-sm font-poppins pr-2">
              Clothing Details
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-6 font-poppins bg-white rounded-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="clothName"
                  className="block font-bold text-lg text-gray-700 mb-2"
                >
                  Cloth Name
                </label>
                <input
                  type="text"
                  name="fabricName"
                  value={formData.fabricName}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-blue-300 focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="brandName"
                  className="block font-bold text-lg text-gray-700 mb-2"
                >
                  Brand Name
                </label>
                <select
                  value={formData.Brand}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      Brand: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-blue-300 focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="">Select a Brand</option>
                  {uniqueBrandNames.map((brandName, index) => (
                    <option key={index} value={brandName}>
                      {brandName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="colorName"
                  className="block font-bold text-lg text-gray-700 mb-2"
                >
                  Color Name
                </label>
                <input
                  type="text"
                  name="Color"
                  value={formData.Color}
                  onChange={handleChange}
                  placeholder="Color Name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-blue-300 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-bold text-lg text-gray-700 mb-2"
                >
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
              </div>
              <div>
                <label className="block font-bold text-lg text-gray-700 mb-2">
                  Sizes
                </label>
                {sizes.map((sizeObj, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Size
                      </label>
                      <select
                        name="Size"
                        value={sizeObj.size}
                        onChange={(e) =>
                          handleSizeChange(index, "size", e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded-md focus:outline-blue-300 focus:ring focus:ring-blue-200"
                        required
                      >
                        <option value="">Select a Size</option>
                        {brandList
                          .filter(
                            (item) =>
                              item.brandName.toLowerCase() ===
                              formData.Brand.toLowerCase()
                          )
                          .map((item) => (
                            <option key={item._id} value={item.brandSize}>
                              {item.brandSize}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Stock Quantity
                      </label>
                      <input
                        name="stock"
                        value={sizeObj.stock}
                        onChange={(e) =>
                          handleSizeChange(index, "stock", e.target.value)
                        }
                        placeholder="Stock"
                        type="number"
                        required={true}
                        className="w-full px-4 py-2 border rounded-md focus:outline-blue-300 focus:ring focus:ring-blue-200"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="px-2 text-black bg-red-500 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSize}
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                  Add Size
                </button>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block font-bold text-lg text-gray-700 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={formData.Category}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      Category: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-blue-300 focus:ring focus:ring-blue-200"
                  required
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.FabricCategory}>
                      {category.FabricCategory}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block font-bold text-lg text-gray-700 mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="Price"
                  value={formData.Price}
                  onChange={(e) => {handleChange(e); handlePrice(e)}}
                  placeholder="In Rupees"
                  className="w-full px-4 py-2 border rounded-md focus:outline-blue-200 focus:ring focus:ring-blue-200"
                  required
                />
                {isPrice?<i className="text-crimson">Please!! Enter a valid price.</i>:""}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-bold text-lg text-gray-700 mb-2"
                >
                  Fit Type
                </label>
                <select
                  value={formData.fit_Type}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      fit_Type: e.target.value,
                    }))
                  }
                  className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 rounded-md border w-full"
                >
                  <option value="">Select Fit Type</option>
                  <option value="Slim fit">Slim fit</option>
                  <option value="Regular fit">Regular fit</option>
                  <option value="Loose fit">Loose fit</option>
                  <option value="Oversized">Oversized</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block font-bold text-lg text-gray-700 mb-2"
                >
                  Wear Type
                </label>
                <select
                  value={formData.wear_type}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      wear_type: e.target.value,
                    }))
                  }
                  className="focus:outline-blue-300 hover:outline-blue-300 block px-3 py-2 rounded-md border w-full"
                >
                  <option value="">Select Wear Type</option>
                  <option value="Upper Bodywear">Upper Bodywear</option>
                  <option value="Lower Bodywear">Lower Bodywear</option>
                  <option value="Full Bodywear">Full Bodywear</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block font-bold text-lg text-gray-700 mb-2"
                >
                  Discount (%)
                </label>
                <input
                  type="number"
                  name="Discount"
                  value={formData.Discount}
                  onChange={handleChange}
                  placeholder="In Percentage"
                  className="w-full px-4 py-2 border rounded-md focus:outline-blue-300 focus:ring focus:ring-blue-200"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="relative">
                  <label
                    htmlFor={`image-${index}`}
                    className="block font-bold text-lg text-gray-700 mb-2"
                  >
                    Image {index + 1}
                  </label>
                  <input
                    type="file"
                    id={`image-${index}`}
                    name={`image-${index}`}
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById(`image-${index}`).click()
                    }
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    disabled={formData.Images[index]} // Disable if image is already uploaded
                  >
                    {formData.Images[index] ? "Image Added" : "Add Image"}
                  </button>

                  {imageLoading[index] && <Loader />}

                  {imagePreviews[index] && (
                    <div className="mt-4">
                      <img
                        src={imagePreviews[index]}
                        alt={`Preview ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="mt-2 text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block font-bold text-lg text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Description..."
                className="w-full px-4 py-2 border rounded-md focus:outline-blue-300 focus:ring focus:ring-blue-200"
                rows="8"
                required
              ></textarea>
            </div>
            {loading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : (
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  type="submit"
                  className="px-6 py-3 text-white bg-crimson rounded-md shadow-md hover:bg-red-700"
                >
                  Save Stock
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 text-black bg-white border rounded-md shadow-md hover:text-white hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddNewStock;

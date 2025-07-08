import { useState } from "react";
import CustomerHeader from "../../../components/customer/CustomerHeader";
import Sliderbar from "../../../components/customer/Slidebar";
import WorkerDetails from "./WorkerDetails";
import shopPhoto from "../../../assets/shop_img.jpg";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";

const RequestSeller = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [prevImageId, setPrevImageId] = useState(null);
  const [workerDetails, setWorkerDetails] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const [formData, setFormData] = useState({
    shop_name: "",
    road: "",
    state: "",
    city: "",
    pin_code: "",
    profile_image: "",
    details: [],
  });

  const handleWorkerDetailsChange = (newDetails) => {
    setWorkerDetails(newDetails);
    setFormData((prevData) => ({
      ...prevData,
      details: newDetails, // Add the updated details to formData
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
      if (['state', 'city','shop_name'].includes(name)) {
    const regex = /^[A-Za-z\s,]*$/;  // Allow only alphabetic characters, spaces, and commas
    if (value && !regex.test(value)) {
      return;  // Don't update the state if the input contains invalid characters
    }
    }
    if (name === 'pin_code') {
      const regex = /^[0-9]/
      if (value && !regex.test(value)) {
        return
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      ...formData, // includes profile_image and other form fields
      selectedItems,
      details: workerDetails,
    };

    setSuccessMessage("Seller Request sent successfully!");

    Swal.fire({
      title: "Form Data Submitted",
      text: "Successfully",
      icon: "success",
    });
    // Todo: Data post backend here
    try {
      const response = await axios.post(`${baseUrl}/seller-request`, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include cookies if needed
      });
      console.log("Server Response: ", response.data);
      if (response.status === 200) {
      Swal.fire({
        title: 'Success',
        text: 'Request sent successfully',
        icon: 'success',
      });
    } else {
      console.error('Error submitting form:', response.statusText);
    }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message,
        icon: 'error',
      });
    }
  };

  const handleImageChange = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    try {
      setImageLoading(true);
      // If there's a previous image, delete it from Cloudinary
      if (prevImageId) {
        try {
          const res = await axios.delete(
            `${baseUrl}/upload/image/${prevImageId}`,
            {
              withCredentials: true,
            }
          );
          // console.log("Previous image deleted.", res.data);
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error?.response?.data?.message,
            icon: "error",
          });
          console.error("Error deleting previous image:", error.message);
        }
      }
      const { data } = await axios.post(`${baseUrl}/upload/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setPrevImageId(data.imageId);
      setImagePreview(data.url);
      setFormData((prevData) => ({
        ...prevData,
        profile_image: {url: data.url, publicId: data.imageId},
      }));
      setImageLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error.message);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message,
        icon: "error",
      });
      setImageLoading(false);
    }
  };
  const handleDetailsFormToggle = () => {
    setShowDetails((prev) => !prev); // Toggle form visibility
  };
  const options = [
    "Man Wear",
    "Women Wear",
    "Kids Wear",
    "Shirt",
    "T-shirt",
    "Dress",
    "Jacket",
    "Top",
    "Pant",
    "Blazer",
  ];

  // Handle selecting items
  const handleSelectItem = (item) => {
    if (!selectedItems.includes(item) && selectedItems.length < 5) {
      setSelectedItems([...selectedItems, item]);
      setInputValue("");
      setIsOpen(false);
    }
  };

  // Handle removing selected item
  const handleRemoveItem = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
  };

  return (
    <div>
      <div className="flex w-dvw h-dvh p-3">
        {/*left slidebar */}
        <div>
          <Sliderbar />
        </div>

        {/* main content */}
        <main className="w-full h-full overflow-auto scrollbar-hide">
          <CustomerHeader />

          <div className="lg:flex">
            <h1 className="my-8"> Seller Request</h1>
            {/* Success Message */}
            {successMessage && (
              <p className="text-md text-green-500 text-center pl-9  my-12">
                {successMessage}
              </p>
            )}
          </div>
          {/* upload & select */}
          <>
            <form onSubmit={handelSubmit}>
              <div className="lg:flex w-full gap-9">
                <div className="flex-1 space-y-3">
                  {/* Profile Edit and Delete Options */}
                  <div className="flex flex-col sm:flex-row w-full h-auto mb-9">
                    <div className="sm:w-1/2 mx-auto">
                      <img
                        loading="lazy"
                        src={
                          formData.profile_image?.url || imagePreview || shopPhoto
                        }
                        className="h-44 w-44 rounded-md object-cover"
                        alt="Profile"
                      />
                      {/* Image Upload Input */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-3"
                        required
                      />
                    </div>
                    {imageLoading && <Loader />}
                  </div>

                  <input
                    type="text"
                    name="shop_name"
                    value={formData.shop_name}
                    placeholder="Shop Name"
                    className="input input-bordered w-full max-w-full p-3 border-[#D3D3D3] border-2 rounded-md outline-none"
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* select items */}
                <div className="flex-1 max-lg:pt-2">
                  <div className="w-full mx-auto">
                    <div className="mb-2">
                      <div className="relative flex">
                        <span className="absolute top-3 p-1"> ▼</span>
                        <input
                          onClick={toggleDropdown}
                          type="text"
                          name="wear_type"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="input input-bordered w-full max-w-full p-4 border-[#D3D3D3] border-2 rounded-md outline-none"
                          placeholder="Choose Wear Type And 🔍 Type to search"
                        />
                      </div>

                      {isOpen && (
                        <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded p-2">
                          {options
                            .filter((item) =>
                              item
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                            )
                            .map((item) => (
                              <div
                                key={item}
                                onClick={() => handleSelectItem(item)}
                                className={`cursor-pointer p-2 my-1 ${
                                  selectedItems.includes(item)
                                    ? "bg-slate-100"
                                    : "hover:bg-slate-50"
                                }`}
                              >
                                {item}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Selected Items:</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItems.map((item) => (
                          <div
                            key={item}
                            className="flex items-center border border-dashed rounded-full px-3 py-1"
                          >
                            <span>{item}</span>
                            <button
                              onClick={() => handleRemoveItem(item)}
                              className="ml-2  bg-none"
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                      {selectedItems.length >= 5 && (
                        <p className="text-rose-600 mt-2">
                          You can only select up to 5 items
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Address shop */}
              <section>
                <h3 className="py-3">Address of Shop : </h3>

                <div className="lg:flex gap-9 ">
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      name="road"
                      value={formData.road}
                      onChange={handleChange}
                      placeholder="LandMark / Road"
                      className="input input-bordered w-full max-w-full p-3 border-[#D3D3D3] border-2 rounded-md outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="input input-bordered w-full max-w-full p-3 border-[#D3D3D3] border-2 rounded-md outline-none"
                    />
                  </div>
                  <div className="flex-1 space-y-3 max-lg:pt-2">
                    <input
                      type="text"
                      placeholder="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="input input-bordered w-full max-w-full p-3 border-[#D3D3D3] border-2 rounded-md outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="PIN code"
                      name="pin_code"
                      value={formData.pin_code}
                      onChange={handleChange}
                      className="input input-bordered w-full max-w-full p-3 border-[#D3D3D3] border-2 rounded-md outline-none"
                      required
                    />
                  </div>
                </div>
              </section>
              {/* Worker name & email */}

              <section>
                <div className=" mt-4">
                  <button
                    type="button"
                    className=" bg-none text-lg font-semibold p-1"
                    onClick={handleDetailsFormToggle}
                  >
                    {showDetails
                      ? "Want to remove workers -"
                      : "Want to add workers +"}
                  </button>
                </div>
                {showDetails && (
                  <WorkerDetails
                    details={formData?.details}
                    onWorkerDetailsChange={handleWorkerDetailsChange}
                  ></WorkerDetails>
                )}
              </section>
              <button
                type="submit"
                className="flex items-center rounded bg-crimson hover:bg-red text-white cursor-pointer text-lg my-3 px-5 py-6 mb-8 mx-auto"
              >
                Send Request
              </button>
            </form>
          </>
        </main>
      </div>
    </div>
  );
};

export default RequestSeller;

import React, { useState, useEffect, useMemo } from "react";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { LiaTapeSolid } from "react-icons/lia";
import BrandIcon from "../../assets/brandIcon";
import { FiFilter } from "react-icons/fi";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, editCustomer } from "../../../slices/customer";
import { getBrandProduct, resetProductItems } from "../../../slices/stock";
import JumpButton from "../../../components/jump/JumpButton";


const CustomerPage = () => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchSize, setSearchSize] = useState("");
  const [searchBrand, setSearchBrand] = useState("");

  const clearSearch = () => {
    setSearchName("");
    setSearchSize("");
    setSearchBrand("");
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate to the /admin/seller URL
  };

  const params = useParams();
  const sellerId = params.sellerId;
  const customerId = params.customerId;

  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(false);
  
  //lets get the data stored in the local storage
  const {stockItems} = useSelector((state) => state.stock);
  const productItems = useSelector((state) => state.stock.productItems); // Get the product items from the store

  

  const validationSchema = Yup.object().shape({
    height: Yup.string().required("height is required"),
    weight: Yup.string().required("weight is required"),
    chestSize: Yup.string().required("chest size is required"),
    waistSize: Yup.string().required("waist size is required"),
    size: Yup.string().required("size is required"),
    brand: Yup.number().required("brand is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      setLoading(true);
      const response = await axios.put(
        `${baseUrl}/seller/customer/${customerId}`,
        customer,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(editCustomer(response.data.customer));
        Swal.fire({
          title: "Customer updated successfully",
          text: "Thank You",
          icon: "success",
        });
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

  const handleDelete = async () => {
    try {
      // Display confirmation dialog
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "This action will delete the customer from the database.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      // If user confirms deletion
      if (confirmation.isConfirmed) {
        const response = await axios.delete(
          `${baseUrl}/seller/customer/${customerId}`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          dispatch(deleteCustomer(customerId));
          Swal.fire({
            title: "Customer deleted successfully",
            text: "Thank You",
            icon: "success",
          });
          navigate(`/admin/seller/all-customers/${sellerId}`);
        } else {
          console.error("Error deleting customer:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      });
    }
  };

  const [checkedItems, setCheckedItems] = useState([]);
  const filteredProducts = useMemo(() => {
    return productList?.filter((item) =>
        checkedItems.length === 0 ? true : checkedItems.includes(item?.Category?.toLowerCase())
      )
      .filter((item) =>
        searchName
          ? item.FabricName.toLowerCase().includes(searchName.toLowerCase())
          : true
      )
      .filter((item) =>
        searchSize
          ? item?.Size?.toLowerCase()?.includes(searchSize?.toLowerCase())
          : true
      )
      .filter((item) =>
        searchBrand
          ? item.Brand.toLowerCase().includes(searchBrand.toLowerCase())
          : true
      );
  }, [productList, checkedItems, searchName, searchSize, searchBrand]);
  
  const handleCheckBoxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setCheckedItems([...checkedItems, name]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== name));
    }
  };

  const getProductList = async (brandSizesList) => {
    let result;
    try {
      if (true) {
        // console.log("fetching products from server");
        const response = await axios.post(
          `${baseUrl}/seller/fabric/filterd-products/${sellerId}`,
          brandSizesList,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          result = response.data.productList;
          // console.log('product result', result);
          setProductList(result)
        } else {
          console.error("Error fetching from server:", response.statusText);
          return; // Stop execution if the request fails
        }
      } else {
        // console.log("fetching browse products from local storage");
        // lets getProductListByBrandSize from the local storage
        //based on the sellers stock stored in the local storage
        dispatch(getBrandProduct(brandSizesList));
        setProductList([])
      }
  
      // Process and set the product list
      const updatedProducts = result?.map((product) => {
        return { ...product, Image: product?.Images[0]?.url };
      });
      setProductList(updatedProducts);
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      });
    }
  };
  

  const fetchMeasurements = async () => {
    try {
      //if(!customerItems || customerItems.length === 0){
      const response = await axios.get(
        `${baseUrl}/seller/customer/${customerId}/${sellerId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        // Throw an error for non-2xx status codes
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = response.data;
      const userData = responseData.customer;
      setCustomer(userData);
      const brandSizesList = responseData?.productList;
      if (brandSizesList.length !== 0) {
        getProductList(brandSizesList);
      }else{
        //lets clear the product items in the store so its not returned
        dispatch(resetProductItems());
        return;
      }
      setCategories(responseData.categories)
    } catch (error) {
      // Handle HTTP errors and other errors
      console.error("Error:", error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      });
    }
  };

  

  const handleProductClick = (productId,matchedSize) => {
    // Navigate to the product detail page
    navigate(`/admin/seller/product/${productId}/${matchedSize}`);
  };

  useEffect(() => {
    fetchMeasurements();
  }, []);

  
// set product list based on the productItems
  useEffect(() => {
    if (productItems && productItems.length > 0) {
      setProductList(
        productItems.map((product) => {
         
          return { ...product, Image: product?.Images[0]?.url };
        })
      );
    } else {
      setProductList([]);
    }
  }, [productItems]);
  
  
  return (
    <>
      <div className="container bg-white">
        <div className="w-full h-4 bg-[#f9454f]"></div>
        <Navbar />

        {/* Header Section */}
        <div className="w-full bg-[#f9454f] font-sans text-white pb-28 lg:pb-16">
          <div className="pt-10 pl-7">
            <GrLinkPrevious
              className="w-7 h-7 cursor-pointer"
              onClick={handleBack}
            />
          </div>
          <h2 className="font-normal text-lg flex justify-center pt-16 max-md:text-base max-sm:text-sm lg:pt-10">
            Welcome to the{" "}
            <span className="font-semibold">"Enter Measurements"</span> page.
          </h2>
          <h2 className="font-normal text-lg flex justify-center pt-2 max-md:text-base max-sm:text-sm lg:hidden">
            Please fill out the following information
          </h2>
          <h2 className="font-normal text-lg flex justify-center pt-2 max-md:text-base max-sm:text-sm lg:hidden">
            to provide your body measurements
          </h2>
          <h2 className="font-normal text-lg justify-center pt-2 max-md:text-base max-sm:text-sm hidden lg:flex">
            Please fill out the following information to provide your body
            measurements
          </h2>
        </div>

        {/* Search Bar */}
        

        <div className="lg:flex lg:h-screen">
          {/* Left Section */}
          <div className="w-full lg:w-3/12 p-4 lg:p-8">
            <div className="flex items-center custom-bottom-border pb-3">
              <FiFilter size={24} className="mr-2" />
              <h1 className="font-poppins text-[21px] font-normal">Filter</h1>
            </div>
            <div className="max-w-sm font-poppins my-4 pb-5 custom-bottom-border">
              <h2 className="font-semibold text-xl mb-2">Categories</h2>
              <div className="space-y-4 font-semibold">
                {categories?.map((category) => (
                  <div key={category._id}>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        name={category.FabricCategory}
                        className="form-checkbox h-4 w-4 text-green-500"
                        checked={checkedItems.includes(category.FabricCategory)}
                        onChange={handleCheckBoxChange}
                      />
                      <span className="ml-2">{category.FabricCategory}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vertical Line Separator */}
          <div className="hidden lg:block w-[1px] bg-black h-[85%] mt-11"></div>

          {/* Right Section */}
          <div className="w-full lg:w-9/12 p-4 lg:p-8">
            <div className="flex items-center mb-10 mt-4 lg:mt-14">
              <LiaTapeSolid className="h-9 w-9 mr-2 hover:cursor-pointer" />
              <h1 className="font-medium text-[24px] font-poppins">
                Measurement Details <span className="text-sm">(In Inches)</span>
              </h1>
            </div>
            {/* <div className="flex justify-center">
            <div className="w-full lg:w-4/6 font-poppins">
              <div className="flex flex-wrap justify-between">
                {[
                  { label: "Name:", value: customer.name },
                  { label: "Email:", value: customer.email },
                  { label: "Phone:", value: customer.phone },
                  { label: "Age:", value: customer.age }
                ].map((field, index) => (
                  <div className="w-full lg:w-1/2 mb-4 flex items-center" key={index}>
                    <label className="block font-bold w-1/3">{field.label}</label>
                    <span className="w-2/3 p-1">{field.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div> */}

            <div className="flex justify-center pt-3">
              <form
                onSubmit={handleSubmit}
                className="w-full lg:w-5/6 font-poppins"
              >
                <div className="flex flex-wrap justify-between">
                  {[
                    { name: "name", placeholder: "Name", value: customer.name },
                    {
                      name: "email",
                      placeholder: "Email",
                      value: customer.email,
                    },
                    {
                      name: "phone",
                      placeholder: "Phone",
                      value: customer.phone,
                    },
                    { name: "age", placeholder: "Age", value: customer.age },
                    {
                      name: "chest_inch",
                      placeholder: "Chest Size",
                      value: customer.chest_inch,
                    },
                    {
                      name: "shoulder_inch",
                      placeholder: "Shoulder Size",
                      value: customer.shoulder_inch,
                    },
                    {
                      name: "front_Length_inch",
                      placeholder: "Front Length Size",
                      value: customer.front_Length_inch,
                    },
                    {
                      name: "waist_inch",
                      placeholder: "Waist Size",
                      value: customer.waist_inch,
                    },
                  ].map((field, index) => (
                    <div
                      className="w-full lg:w-1/2 mb-4 flex items-center"
                      key={index}
                    >
                      <label
                        htmlFor={field.name}
                        className="block ml-5 font-bold w-2/3"
                      >
                        {field.placeholder}
                      </label>
                      <input
                        type="text"
                        name={field.name}
                        value={field.value}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-2/3 custom-border p-1 rounded"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-center pt-10">
                  {loading?(
                    <div className="mr-12">
                      <Loader/>
                    </div>
                  ):(
                    <button
                    type="submit"
                    className="cursor-pointer bg-[#f9454f] hover:bg-black text-white font-light py-2 px-4 rounded text-[16px] mr-4"
                  >
                    Update Customer
                  </button>
                  )}
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="cursor-pointer bg-white custom-border hover:bg-black hover:text-white font-light py-2 px-4 rounded text-[16px]"
                  >
                    Delete Customer
                  </button>
                </div>
              </form>
            </div>

            {/* Vertical Line */}
            <div className="border-t border-solid border-black mt-16"></div>
          </div>
        </div>

        {/* Product List */}
        <div className="flex justify-center pt-7">
          <div className="custom-border flex flex-col mt-2 md:flex-row md:mt-0 p-4 md:p-2 gap-2 md:gap-4">
            <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
              <IoMdSearch className="h-9 w-9 p-1 mr-2" />
              <input
                type="text"
                placeholder="Search by Name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="p-2 w-full md:w-40"
              />
            </div>
            <div className="hidden md:block custom-vert-line mr-2"></div>
            <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
              <LiaTapeSolid className="h-9 w-9 p-1 mr-2" />
              <input
                type="text"
                placeholder="Search by Size"
                value={searchSize}
                onChange={(e) => setSearchSize(e.target.value)}
                className="p-2 w-full md:w-40"
              />
            </div>
            <div className="hidden md:block custom-vert-line mr-2"></div>
            <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
              <BrandIcon className="h-9 w-9 p-1 mr-2" />
              <input
                type="text"
                placeholder="Search by Brand"
                value={searchBrand}
                onChange={(e) => setSearchBrand(e.target.value)}
                className="p-2 w-full md:w-40"
              />
            </div>
            <div className="flex justify-center items-center w-full md:w-auto">
              <button
                onClick={clearSearch}
                className="bg-[#f9454f] hover:bg-black text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-full md:w-auto cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2 mb-4 cursor-pointer">
          <h1 className="font-semibold text-[18px] text-center font-poppins pr-2">
            Browse New Attire
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start mx-4 md:mx-8 lg:mx-[10%] font-poppins">
          {filteredProducts?.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id,product.matchedSize)}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full cursor-pointer"
            >
              <img
                src={product?.Images == undefined?"": product?.Images[0]?.url}
                className="w-full h-52 object-cover"
                alt={product.FabricName}
              />
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-gray-900 font-bold text-xl mb-2">
                  {product.FabricName}
                </h3>
                <p className="text-gray-700 text-base mb-2">
                  {product.Description.length > 80?(
                    product.Description.slice(0,90) + " . . ."
                  ):(
                    product.Description
                  )}
                </p>
                <div className="mt-auto bg-white p-1 flex justify-between items-center">
                  <div>
                    <p className="text-gray-700 text-base font-semibold mb-2">
                    Size: {product?.Size?.map(sizeObj => {
                        if (sizeObj.size && sizeObj.stock > 0){
                          return sizeObj.size
                      }
                      }).join(", ")}
                    </p>
                    <span className="text-base font-semibold">
                      ₹{product.Price}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    Discount: {product.Discount}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <JumpButton />
      <Footer />
    </>
  );
};

export default CustomerPage;
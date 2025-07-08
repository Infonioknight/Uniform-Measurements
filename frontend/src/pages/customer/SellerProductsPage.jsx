import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { baseUrl } from "../../baseUrl/BaseUrl";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { LiaTapeSolid } from "react-icons/lia";
import BrandIcon from "../assets/brandIcon";
import Swal from "sweetalert2";
import Loader from "../../components/Loader/Loader";
import JumpButton from "../../components/jump/JumpButton";
import Sliderbar from "../../components/customer/Slidebar";
import CustomerHeader from "../../components/customer/CustomerHeader";


const SellerProductsPage = () => {
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
  const userId = params.userId

  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);


  const [checkedItems, setCheckedItems] = useState([]);
  const filteredProducts = useMemo(() => {
    return productList?.filter((item) =>
        checkedItems.length === 0 ? true : checkedItems.includes(item.Category.toLowerCase())
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

  const handleProductClick = (productId,matchedSize) => {
    // Navigate to the product detail page
    navigate(`/users/${userId}/seller/product/${productId}/${matchedSize}`);
  };

  
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/${userId}/products/${sellerId}`, {
          withCredentials: true,
        });
        const products = response.data.products
        console.log(products)
      // Process and set the product list
      const updatedProducts = products?.map((product) => {
        return { ...product, Image: product?.Images[0]?.url };
      });
      setProductList(updatedProducts);
      setCategories(response.data.categories)
        
      } catch (error) {
        console.error("Error fetching stock data:", error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Failed to load stock data.",
          icon: "error",
        });
      }
    };

    fetchStockData();
  }, []);
  
  return (
    <>
      <div className="flex w-dvw h-dvh p-3">
        {/*left slidebar */}
        <div>
          <Sliderbar/>
        </div>

        {/* main content */}
        <main className="w-full h-full mb-10 overflow-auto scrollbar-hide">
          <CustomerHeader />

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start mx-4 md:mx-8 lg:mx-[10%] font-poppins">
          {filteredProducts?.map((product) => (
            <div
              key={product._id}
              onClick={() => handleProductClick(product._id,product.matchedSize)}
              className="relative bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full cursor-pointer"
            >
              <img
                src={product.Image}
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
                      Size: {product.Size.map(sizeObj => {
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
        </main>
      </div>
      <JumpButton />
      
    </>
  );
};

export default SellerProductsPage;
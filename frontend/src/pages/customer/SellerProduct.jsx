import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import CustomerHeader from "../../components/customer/CustomerHeader";
import Sliderbar from "../../components/customer/Slidebar";
import { baseUrl } from "../../baseUrl/BaseUrl";
import FitPreferenceBox from "../../components/customer/FitPreferenceBox";
import SizeChartDialog from "../../components/customer/SizeChartDialog";

const SellerProduct = () => {
  const params = useParams();
  const productId = params.productId;
  const [matchedSize, setMatchedSize] = useState(params.matchedSize);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [sizechart, setSizechart] = useState([]);
  const [isFitPreferenceOpen, setIsFitPreferenceOpen] = useState(false); // Controls dialog visibility
  const [sizePredict, setSizePredict] = useState("");
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/seller/fabric/stock/${productId}`,
          { withCredentials: true }
        );
        setProduct(res?.data?.product || {});
        console.log(res?.data?.product)
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.error || error?.response?.data?.message,
          icon: "error",
        });
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const handleOpenFitPreference = () => {
    setIsFitPreferenceOpen(true); // Open the dialog
  };


  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sliderbar />
      </div>

      {/* Main Content */}
      <main className="w-full h-full p-6 overflow-auto bg-gray-50">
        <CustomerHeader />

        <div className="flex flex-col lg:flex-row gap-10 mt-8">
          {/* Image Section */}
          <div className="flex-1">
            {product.Images?.length > 0 ? (
              <div className="relative">
                <img
                  src={product.Images[currentImageIndex]?.url}
                  alt={product.FabricName || "Product"}
                  className="w-full h-auto object-cover rounded-xl shadow-lg"
                />
                {/* Thumbnails */}
                <div className="flex mt-4 gap-2 overflow-x-auto">
                  {product.Images.map((img, index) => (
                    <img
                      key={img.publicId}
                      src={img.url}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
                        index === currentImageIndex
                          ? "ring-2 ring-gray-800"
                          : ""
                      }`}
                      onClick={() => handleImageChange(index)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          {/* Details Section */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.FabricName || "Product Name"}
            </h1>
            <p className="text-gray-600 text-sm mb-4">
              Brand: <span className="font-medium">{product.Brand}</span>
            </p>
            <PriceDisplay
              originalPrice={product.Price}
              Discount={product.Discount}
            />
            <p className="mt-2 text-gray-600">Color: {product.Color}</p>
            <p className="mt-2 text-gray-600">Fit Type: {product.fitType}</p>
            <div className="flex justify-between mt-6 p-4 bg-snow rounded-lg shadow">
              <p className="text-gray-800 text-sm">
                Shoppers love our size recommendations. Try out!
              </p>
              <button
                onClick={handleOpenFitPreference}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Find My Fit
              </button>
            </div>
            {/* FitPreferenceBox Component */}
            <FitPreferenceBox
              setSizePredict={setSizePredict}
              isOpen={isFitPreferenceOpen}
              setIsOpen={setIsFitPreferenceOpen}
              wearType = {product.wearType}
              gender = {product.gender}
            />

            {sizePredict && (
              <div className="mt-6 p-4 border border-blue-500 rounded-md bg-blue-50">
                <p className="mt-2 text-gray-700">
                  The best size for you is
                  <span className="font-bold text-blue-800">
                    {" "}
                    {sizePredict}
                  </span>
                  .
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Based on the provided age, height, and weight.
                </p>
              </div>
            )}

            {matchedSize && (
              <div className="mt-6 p-4 border border-blue-500 rounded-md bg-blue-50">
                <h3 className="text-lg font-semibold text-blue-700">
                  Your Recommended Size
                </h3>
                <p className="mt-2 text-gray-700">
                  The best size for you is
                  <span className="font-bold text-blue-800">
                    {" "}
                    {matchedSize =='undefined'? "Please Provide Your Body Measurements":matchedSize.toUpperCase()}
                  </span>
                  .
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Based on the provided Body Measurments.
                </p>
              </div>
            )}

            <div className="mt-3">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-[#F8444F] text-white font-bold py-2 px-4 rounded-full"
              >
                SIZE GUIDE
              </button>
            </div>
            <SizeChartDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        SellerId={product.SellerId}
        Brand={product.Brand}
        Category={product.Category}
      />
            <SizeSelector sizes={product.Size || []} />

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.Description ||
                  "Detailed product information will be displayed here."}
              </p>
            </div>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

function PriceDisplay({ originalPrice, Discount }) {
  const discountedPrice = originalPrice
    ? (originalPrice - (originalPrice * Discount) / 100).toFixed(2)
    : null;

  return (
    <div className="mt-4">
      <div className="flex flex-col items-start gap-1">
        {/* Discounted Price */}
        <div className="text-3xl font-bold text-gray-800">
          ₹{discountedPrice}
        </div>
        {/* Original Price and Discount */}
        {originalPrice && Discount && (
          <div className="flex items-center gap-2">
            <span className="line-through text-black">₹{originalPrice}</span>
            <span className="text-sm font-medium text-green-600">
              {Discount}% off
            </span>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500">Inclusive of all taxes</p>
    </div>
  );
}

function SizeSelector({ sizes }) {
  return (
    <div className="mt-6">
      <h3 className="text-gray-800 text-lg font-semibold mb-2">Available Sizes:</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map(({ size, stock }) => (
          <button
            key={size}
            className={`px-4 py-2 border border-gray-300 rounded-lg ${
              stock > 0 ? "bg-white hover:bg-gray-200" : "bg-gray-300"
            } transition`}
            disabled={stock <= 0}
          >
            {size} {stock > 0 ? `(${stock} in stock)` : "(Out of stock)"}
          </button>
        ))}
      </div>
    </div>
  );
}


export default SellerProduct;

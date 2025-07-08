import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import SizeChartDialog from "../../../components/customer/SizeChartDialog";
import Navbar from "../../../components/Navbar";
import { GrLinkPrevious } from "react-icons/gr";
import FitPreferenceBox from "../../../components/customer/FitPreferenceBox";

const Product = () => {
  const params = useParams();
  const productId = params.productId;
  const [matchedSize, setMatchedSize] = useState(params.matchedSize);
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isFitPreferenceOpen, setIsFitPreferenceOpen] = useState(false);
  const [sizePredict, setSizePredict] = useState("");
  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenFitPreference = () => {
    setIsFitPreferenceOpen(true); // Open the dialog
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}/seller/fabric/stock/${productId}`,
          { withCredentials: true }
        );
        setProduct(res?.data?.product || {});
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

  return (
    <div className="bg-white min-h-screen mt-14 flex flex-col">
      <Navbar />
      <div className="w-full bg-[#f9454f] font-sans py-5 px-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 bg-inherit"
        >
          <GrLinkPrevious className="w-6 h-6" />
          <span className="text-lg font-semibold">Back</span>
        </button>
      </div>
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8 mt-6">
        {/* Image Section */}
        <div className="lg:w-1/2">
          {product.Images?.length > 0 ? (
            <div>
              <img
                src={product.Images[currentImageIndex]?.url}
                alt={product.FabricName || "Product"}
                className="w-full max-w-[500px] h-auto sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover rounded-xl shadow-lg"
              />
              <div className="flex mt-4 gap-2 overflow-x-auto">
                {product.Images.map((img, index) => (
                  <img
                    key={img.publicId}
                    src={img.url}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
                      index === currentImageIndex ? "ring-2 ring-[#f9454f]" : ""
                    }`}
                    onClick={() => handleImageChange(index)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No images available</p>
          )}
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4">
            {product.FabricName || "Product Name"}
          </h1>
          <p className="text-gray-600 text-sm mb-2">
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
          <FitPreferenceBox
            setSizePredict={setSizePredict}
            isOpen={isFitPreferenceOpen}
            setIsOpen={setIsFitPreferenceOpen}
            wearType={product.wearType}
            gender={product.gender}
          />

          {sizePredict && (
            <div className="mt-6 p-4 border border-blue-500 rounded-md bg-blue-50">
              <p className="text-gray-700">
                The best size for you is{" "}
                <span className="font-bold text-blue-800">{sizePredict}</span>.
              </p>
              <p className="text-sm text-gray-600">
                Based on the provided age, height, and weight.
              </p>
            </div>
          )}

          {matchedSize!='undefined' && (
            <div className="mt-6 p-4 border border-blue-500 rounded-md bg-blue-50">
              <h3 className="text-lg font-semibold text-blue-700">
                Your Recommended Size
              </h3>
              <p className="mt-2 text-gray-700">
                The best size for you is{" "}
                <span className="font-bold text-blue-800">
                  {matchedSize.toUpperCase()}
                </span>
                .
              </p>
              <p className="text-sm text-gray-600">
                Based on the provided Body Measurements.
              </p>
            </div>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 bg-[#F8444F] text-white font-bold py-2 px-4 rounded-full transition hover:bg-[#d93d47]"
          >
            SIZE GUIDE
          </button>
          <SizeChartDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            SellerId={product.SellerId}
            Brand={product.Brand}
            Category={product.Category}
          />
          <SizeSelector sizes={product.Size || []} />

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.Description ||
                "Detailed product information will be displayed here."}
            </p>
          </div>

          <button
            onClick={handleBack}
            className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

function PriceDisplay({ originalPrice, Discount }) {
  const discountedPrice = originalPrice
    ? (originalPrice - (originalPrice * Discount) / 100).toFixed(2)
    : null;

  return (
    <div className="mt-4">
      <div className="text-3xl font-bold text-gray-800">
        ₹{discountedPrice || "0.00"}
      </div>
      {originalPrice && Discount && (
        <div className="flex items-center gap-2">
          <span className="line-through text-black">₹{originalPrice}</span>
          <span className="text-sm font-medium text-green-600">
            {Discount}% off
          </span>
        </div>
      )}
      <p className="text-sm text-gray-500">Inclusive of all taxes</p>
    </div>
  );
}

function SizeSelector({ sizes }) {
  return (
    <div className="mt-6">
      <h3 className="text-gray-800 text-lg font-semibold mb-2">
        Available Sizes:
      </h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map(({ size, stock }) => (
          <button
            key={size}
            className={`px-4 py-2 border border-gray-300 rounded-lg ${
              stock > 0
                ? "bg-white hover:bg-gray-200 transition"
                : "bg-gray-300"
            }`}
            disabled={stock <= 0}
          >
            {size} {stock > 0 ? `(${stock} in stock)` : "(Out of stock)"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Product;

import React, { useState, useEffect } from "react";
import CustomerHeader from "../../components/customer/CustomerHeader";
import Sliderbar from "../../components/customer/Slidebar";
import CustomerSearch from "../../components/customer/CustomerSearch";
import axios from "axios";
import { baseUrl } from "../../baseUrl/BaseUrl";
import SellerDisplay from "../../components/customer/SellerDisplay";
import Pagination from "../../components/customer/Pagination";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function CustomerHome() {
  const [sellers, setSellers] = useState([]);
  const [filteredSellers, setFilteredSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 4;
  const totalPages = Math.ceil(filteredSellers.length / limit);
  const location = useLocation();

  // Get the search keyword from the URL
  const query = new URLSearchParams(location.search);
  const searchName = query.get("searchName");
  const searchPincode = query.get("searchPincode");
  const searchAddress = query.get("searchAddress");

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true); // Show loader while fetching data
        const response = await axios.get(`${baseUrl}/user/sellers`, {
          withCredentials: true,
        });
        setSellers(response.data.sellers);
        // console.log(response.data.sellers)
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchSellers();
  }, []);

  // Apply filters based on search criteria
  useEffect(() => {
    const filtered = sellers.filter((seller) => {
      const matchesName = searchName
        ? seller.name.toLowerCase().includes(searchName.toLowerCase())
        : true;
      const matchesPincode = searchPincode
        ? seller?.pincode?.includes(searchPincode)
        : true;
      const matchesAddress = searchAddress
        ? seller?.address?.toLowerCase().includes(searchAddress.toLowerCase())
        : true;
      return matchesName && matchesPincode && matchesAddress;
    });
    setFilteredSellers(filtered);
  }, [sellers, searchName, searchPincode, searchAddress]);

  // Calculate sellers to display on the current page
  const indexOfLastSeller = page * limit;
  const indexOfFirstSeller = indexOfLastSeller - limit;
  const currentDisplay = filteredSellers.slice(
    indexOfFirstSeller,
    indexOfLastSeller
  );

  return (
    <>
      <div className="flex w-dvw h-dvh p-3">
        {/*left slidebar */}
        <div>
          <Sliderbar />
        </div>

        {/* main content */}
        <main className="w-full h-full mb-10 overflow-auto scrollbar-hide">
          <CustomerHeader />

          <div className="flex flex-col lg:flex-row justify-between items-center">
            <p className="text-nowrap font-poppins text-[30px] flex items-center text-[#13504973] font-bold lg:pl-5 my-3 text-center pt-7">
              My Home
            </p>
            <CustomerSearch />
          </div>
          <div className="mt-8">
            <h2 className="font-semibold font-poppins xl:pl-5 xl:text-left text-center w-10/12 xl:w-full mx-auto">
              Suggested Seller based on Ratings
            </h2>
          </div>

          <div>
            {currentDisplay?.length === 0 && !loading && (
              <h2 className="mt-10 ml-5 text-[#135049]">No seller found</h2>
            )}

            {currentDisplay?.map((seller) => (
              // Use a unique key, assuming seller has a unique identifier like id or sellerId
              <SellerDisplay key={seller?._id} seller={seller} />

            ))}
          </div>


          
          {loading && <Loader />}
          {/* Pagination Component */}
          {totalPages > 1 && (
            <Pagination
              totalItems={filteredSellers.length}
              itemsPerPage={limit}
              currentPage={page}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </main>
      </div>
    </>
  );
}

export default CustomerHome;

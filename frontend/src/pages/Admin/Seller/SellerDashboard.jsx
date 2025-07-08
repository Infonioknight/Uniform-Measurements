import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import { Link , useParams} from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { MdOutlineCategory, MdOutlinePersonAddAlt ,MdOutlineBrandingWatermark, MdEdit} from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { LiaTapeSolid } from "react-icons/lia";
import BrandIcon from "../../assets/brandIcon";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../slices/category";
import { addStocks } from "../../../slices/stock";
import { FiFilter } from "react-icons/fi";
import { GiClothes } from "react-icons/gi";
import Swal from "sweetalert2";
import { Buffer } from "buffer";
import JumpButton from "../../../components/jump/JumpButton";
import Loader from "../../../components/Loader/Loader";




const SellerDashboard = () => {
  const params = useParams();
  const sellerId = params.id
  const dispatch = useDispatch();
  const { categoryItems} = useSelector((state) => state.category);
  const {stockItems} = useSelector((state) => state.stock);
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSize, setSearchSize] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  // New Filter
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortByBrand, setSortByBrand] = useState("");
  const [categories,setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);


  const showProImg = async (row) => {
    try {
  
      Swal.fire({
        html: `
          <img style="border-radius: 7px;width:100%;aspect-ratio: 4 / 3;" src="${row?.Images[0]?.url}">
          <div style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-between;align-items: flex-start;">
            <p>Brand Name: ${row?.Brand}</p>
            <p>Price: ₹${row?.Price}</p>
            <p>Stock Name: ${row?.FabricName}</p>
            <p>Size: ${row?.Size.map(sizeObj => sizeObj.size).join(",")}</p>
          </div>
        `
      });
      setDetailLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      });
      setDetailLoading(false);
    }
  };
  
const columns = [
  {
    name: "S.No",
    selector: (row, index) => index + 1, // Generate ID based on index
    maxWidth: "3px",
  },
  {
    name:"Stock Details",
    selector: (row) =>(
      <>
       <button onClick={()=>{showProImg(row)}} className="bg-[#f9454f] hover:bg-black text-white p-1 rounded transition duration-300 ease-in-out">Show Details</button>
      </> 
    ),
    Width:"10px",
  },
  {
    name: "Stock Name",
    selector: (row) => row.FabricName,
    sortable: true,
  },
  {
    name: "Brand",
    selector: (row) => row.Brand,
  },
  {
    name: "Color",
    selector: (row) => row.Color,
  },
  {
    name: "Size",
    selector: (row) => row.Size.map(sizeObj => sizeObj.size).join(', '),
    maxWidth:"20px",
  },
  {
    name: "Price",
    selector: (row) => row.Price,
    maxWidth: "30px",
    sortable: true,
  },
  {
    name: "Catogory",
    selector: (row) => row.Category,
    maxWidth: "3px",
  },{
    name : "Quantity",
    selector : (row) => row.Size.map(sizeObj => sizeObj.stock).join(', ')
  },
  {
    name: "Action",
    selector: (row) => (
      <>
        <Link to={`/admin/seller/${row.SellerId}/product/${row._id}`}
        className="w-[70px] cursor-pointer py-2 px-2.5 bg-[transparent] rounded flex items-center justify-center border-[0.8px] border-solid border-black"
        >
          <MdEdit/>
        </Link>
      </>
    ),
  },
];

  // Fetch data from backend
  useEffect(() => {
    // Fetch data from backend API here
    const fetchData = async () => {
      try {
        //Lets fetch category and stock from local storage first
        //if empty, we fetch from the backend
        if(!categoryItems || !stockItems || categoryItems.length === 0 || stockItems.length === 0){
          setLoading(true);
        const response = await axios.get(
          `${baseUrl}/seller/fabric/stocks/${sellerId}`,
          {
            withCredentials: true,
          }
        );

        setProducts(response.data.products);
        setCategories(response.data.categories)
        const products = response.data.products;
        dispatch(addStocks(products));
        dispatch(setCategory(response.data.categories));
        setLoading(false);
        }else{
          // console.log("Data already in local storage")
          // set the categories from the local storage
          setProducts(stockItems);
          setCategories(categoryItems);
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
        Swal.fire({
          title: 'Error',
          text: error?.response?.data?.error || error?.response?.data?.message,
          icon: 'error',
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

 

  // Filter function
  let filteredProducts = useMemo(() => {
    return products.filter(
      (item) =>
        item.FabricName &&
        item.FabricName.toLowerCase().includes(searchName.toLowerCase()) &&
        item.Size.some((sizeObj) => 
          sizeObj.size.toLowerCase().includes(searchSize.toLowerCase())) &&
        item.Brand &&
        item.Brand.toLowerCase().includes(searchBrand.toLowerCase()) &&
        item.Category &&
        item.Category.toLowerCase().includes(sortBy.toLowerCase())
    );
  }, [products, searchName, searchSize, searchBrand, sortBy]);

  const clearSearch = () => {
    setSearchName("");
    setSearchSize("");
    setSearchBrand("");
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const sortByPrice = (e) => {
    setPriceRange(e.target.value)
  };

  return (
    <div className="min-h-screen flex flex-col">
    <div className="w-full bg-[#f9454f] h-4"></div>
    <Navbar />
  
    {/* Main Content */}
    <div className="flex-grow w-full bg-[#f9454f] font-sans text-white text-center py-12 px-4">
      <h1 className="text-2xl font-semibold max-sm:text-xl min-[1200px]:font-bold">
        Welcome to Zimutail
      </h1>
      <h2 className="font-extralight text-lg pt-3 max-md:text-base max-sm:text-sm min-[1200px]:pt-0">
        Your Ultimate Clothing Store Management Dashboard!
      </h2>
  
      {/* Buttons Section */}
      <div className="flex flex-wrap justify-center pt-10 gap-4">
        <Link
          to={`/admin/seller/customer/${sellerId}`}
          className="flex flex-col items-center bg-white text-black hover:bg-black hover:text-white py-2 px-4 rounded text-lg transition duration-300 ease-in-out w-[200px]"
        >
          <MdOutlinePersonAddAlt className="w-10 h-10 mb-1 max-sm:w-7 max-sm:h-7" />
          Add New Customers
        </Link>
        <Link
          to={`/admin/seller/stock/${sellerId}`}
          className="flex flex-col items-center bg-white text-black hover:bg-black hover:text-white py-2 px-4 rounded text-lg transition duration-300 ease-in-out w-[200px]"
        >
          <GiClothes className="w-10 h-10 mb-1 max-sm:w-7 max-sm:h-7"/>
          Stock New Items 
        </Link>
        <Link
          to={`/admin/seller/all-customers/${sellerId}`}
          className="flex flex-col items-center bg-white text-black hover:bg-black hover:text-white py-2 px-4 rounded text-lg transition duration-300 ease-in-out w-[200px]"
        >
          <MdOutlinePersonOutline className="w-10 h-10 mb-1 max-sm:w-7 max-sm:h-7" />
          View All Customers
        </Link>
        <Link
          to={`/admin/seller/${sellerId}/category`}
          className="flex flex-col items-center bg-white text-black hover:bg-black hover:text-white py-2 px-4 rounded text-lg transition duration-300 ease-in-out w-[200px]"
        >
          <MdOutlineCategory className="w-10 h-10 mb-1 max-sm:w-7 max-sm:h-7" />
          Add New Category
        </Link>
        <Link
          to={`/admin/seller/brand/${sellerId}`}
          className="flex flex-col items-center bg-white text-black hover:bg-black hover:text-white py-2 px-4 rounded text-lg transition duration-300 ease-in-out w-[200px]"
        >
          <MdOutlineBrandingWatermark className="w-10 h-10 mb-1 max-sm:w-7 max-sm:h-7" />
          View All Brand
        </Link>
      </div>
    </div>
  
    {/* Search Bar */}
    <div className="flex justify-center pt-7 px-4">
      <div className="flex flex-wrap md:flex-nowrap justify-center items-center custom-border p-4 rounded shadow-md w-full max-w-5xl">
        <div className="flex items-center mb-3 md:mb-0">
          <IoMdSearch className="h-9 w-9 p-1 mr-2" />
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="p-2 w-40 mr-2 max-md:w-auto"
          />
        </div>
        <div className="hidden md:block w-px bg-gray-300 h-full mx-2"></div>
        <div className="flex items-center mb-3 md:mb-0">
          <LiaTapeSolid className="h-9 w-9 p-1 mr-2" />
          <input
            type="text"
            placeholder="Search by Size"
            value={searchSize}
            onChange={(e) => setSearchSize(e.target.value)}
            className="p-2 w-40 mr-2 max-md:w-auto"
          />
        </div>
        <div className="hidden md:block w-px bg-gray-300 h-full mx-2"></div>
        <div className="flex items-center mb-3 md:mb-0">
          <BrandIcon className="h-9 w-9 p-1 mr-2" />
          <input
            type="text"
            placeholder="Search by Brand"
            value={searchBrand}
            onChange={(e) => setSearchBrand(e.target.value)}
            className="p-2 w-40 mr-2 max-md:w-auto"
          />
        </div>
        <button
          onClick={clearSearch}
          className="bg-[#f9454f] hover:bg-black text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out cursor-pointer max-sm:mx-10"
        >
          Search
        </button>
      </div>
      
    </div>
    <div className="flex justify-center">
    {detailLoading && <Loader />}
    <div className="flex justify-center ">
      {loading && <Loader />}
        </div>
    </div>
    
  
    {/* Main Content with Filter and Data Table */}
    <div className="flex flex-col md:flex-row mt-16 px-2">
      {/* Filter Section */}
      <div className="lg:w-[20%] md:w-2/12 mb-8 md:mb-0">
        <div className="flex items-center custom-bottom-border pb-3">
          <FiFilter size={24} className="mr-2" />
          <h1 className="font-poppins text-[21px] font-normal">Filter</h1>
        </div>
  
        <div className="mt-8 space-y-6">
          {/* Sort by Type Dropdown */}
          <select
            value={sortBy}
            onChange={handleSortByChange}
            className="w-full bg-transparent p-2 custom-bottom-border font-semibold cursor-pointer"
          >
            <option value={""}>Select a Category</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category.FabricCategory}>
                      {category.FabricCategory}
                    </option>
                  ))}
          </select>
        </div>
      </div>
  
      {/* Vertical Line Separator */}
      <div className="hidden md:block w-px bg-gray-300 mx-4"></div>
     
  
      {/* Data Table Section */}
      <div className="w-full md:w-3/4 md:px-10 px-4 pb-3">
        {!loading && (
          <DataTable
          columns={columns}
          data={filteredProducts}
          pagination
          responsive
          highlightOnHover
        />
        )}
      
      </div>
    </div>
    <JumpButton />
    {/* Footer */}
    <div className="border-t border-solid border-black mt-16"></div>
    <Footer />
  </div>
  
  );
};

export default SellerDashboard;

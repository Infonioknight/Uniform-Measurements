import React, { useState, useEffect, useMemo } from "react";

import axios from "axios";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";

import { useNavigate , Link} from "react-router-dom";
import {
  MdDelete,
  MdOutlineBrandingWatermark,
  MdOutlineCategory,
  MdOutlineDeleteForever,
  MdOutlinePerson2,
  MdOutlinePersonAddAlt1,
  MdEdit
} from "react-icons/md";

import Footer from "../../../components/Footer";

import DataTable from "react-data-table-component";

import { GoArrowLeft } from "react-icons/go";
import { GiClothes } from "react-icons/gi";
import Swal from "sweetalert2";
import JumpButton from "../../../components/jump/JumpButton";
import SideMenu from "../../../components/SideMenu";
import AddBrandSize from "./AddBrandSize";


const ViewAllBrand = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin/seller"); // Navigate to the /admin/seller URL
  };

  const params = useParams();
  const sellerId = params.sellerId;
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/seller/fabric/brand/${sellerId}`,
        {
         withCredentials: true,
        }
      );
      setBrands(response.data.brandList);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      });
    }
  };

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) =>
      brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, brands]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleDelete = async (brand) => {
    try {
      // Display confirmation dialog
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "This action will delete the brand from the database.",
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
          `${baseUrl}/seller/fabric/brand/${brand._id}`,
          {
           withCredentials: true,
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Brand deleted successfully",
            text: "Thank You",
            icon: "success",
          });
          setBrands(
            brands.filter((item) => {
              return item._id != brand._id;
            })
          );
        } else {
          console.error("Error deleting Brand:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error deleting :", error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      });
    }
  };
  const [ isEditBrand , setIsEditBrand ] = useState(false);
  const [ edData , setEdData] = useState({})
  const upBrandData = (row) => {
    setIsEditBrand(!isEditBrand);
    setEdData(row);
    fetchData();
  }
  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1, // Generate ID based on index
      maxWidth: "25px",
    },
    {
      name: "Name",
      selector: (row) => row.brandName,
      sortable: true,
    },
    {
      name: "Size",
      selector: (row) => row.brandSize,
      sortable: true,
      maxWidth: "30px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Chest",
      selector: (row) => row.chest || "N/A",
      sortable: true,
      maxWidth: "80px",
    },
    {
      name: "Shoulder",
      selector: (row) => row.shoulder || 'N/A',
      sortable: true,
    },
    {
      name: "Waist",
      selector: (row) => row.waist || 'N/A',
      sortable: true,
    },
    {
      name: "Wear Type",
      selector: (row) => row.wear || 'N/A',
      sortable: true,
    }, {
      name : "Edit",
      selector : (row) => (
        <>
          <div 
            onClick={() => upBrandData(row)}
            className="size-8 cursor-pointer py-2 px-2.5 bg-[transparent] rounded flex items-center justify-center shadow-inner shadow-slate-300 hover:size-9 hover:shadow-slate-400"
          >
            <MdEdit />
          </div>
        </>
      )
    },
    {
      name: "Delete",
      selector: (row) => (
        <>
          <button
            className="size-8 rounded shadow-inner shadow-slate-300 hover:size-9 hover:shadow-slate-400"
            role="button"
            onClick={() => {
              handleDelete(row);
            }}
          >
            <MdOutlineDeleteForever className="w-7 h-7 text-red" />
          </button>
        </>
      ),
      
    },
  ];

  return (
    <>
      {isEditBrand?<AddBrandSize rowData = {edData} backAllBrandFc = {setIsEditBrand} backAllBrand = {isEditBrand} />:
        <div className="min-h-screen flex flex-col">
        <Navbar />
        {/* Header section */}
        <div className="flex-grow  bg-[#f9454f] text-left text-base text-black font-poppins">
          <div className="flex gap-2 text-white mt-14">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="cursor-pointer [border:none] bg-[transparent] "
            >
              <GoArrowLeft className="text-3xl text-white ml-5 md:block" />
            </button>
            <p className="md:block relative leading-[38px] font-bold">
              Store Management Dashboard!
            </p>
          </div>
          <p className=" justify-center  text-center md:text-xl text-white py-16 mx-2 space-y-1">
            <span className="block">
              <span className="font-poppins">Welcome to the "</span>
              <span className="font-semibold font-poppins">See All Brands</span>
              <span>{`" page. `}</span>
            </span>
            <span className="block">
              <span className="">
                Below is a table displaying all Brand information
              </span>
            </span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row mt-8 md:px-10 px-8 gap-2">
          {/* left side Button */}
          {/* <div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0 ">
            <div className="flex flex-wrap  items-center  justify-center ">
              <button
                onClick={() => {
                  navigate(`/admin/seller/customer/${sellerId}`);
                }}
                className="cursor-pointer text-sm md:text-base lg:text-lg font-light p-0 bg-[transparent]  shrink-0 rounded flex flex-row items-center justify-center px-0 py-2 md:py-3.5  md:px-3 gap-1 md:gap-2"
              >
                Add New Customers
                <MdOutlinePersonAddAlt1 className="w-3 md:w-5 h-3 md:h-5" />
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/seller/all-customers/${sellerId}`);
                }}
                className="cursor-pointer text-sm md:text-base lg:text-lg font-light p-0 bg-[transparent]  shrink-0 rounded flex flex-row items-center justify-center px-0 py-2 md:py-3.5  md:px-3 gap-1 md:gap-2"
              >
                View All Customers
                <MdOutlinePerson2 className="w-3 md:w-5 h-3 md:h-5" />
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/seller/stock/${sellerId}`);
                }}
                className="cursor-pointer text-sm md:text-base lg:text-lg font-light p-0 bg-[transparent]  shrink-0 rounded flex flex-row items-center justify-center px-0 py-2 md:py-3.5  md:px-3 gap-1 md:gap-2"
              >
                Stock New Items
                <GiClothes />
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/seller/${sellerId}/category`);
                }}
                className="cursor-pointer text-sm md:text-base lg:text-lg font-light p-0 bg-[transparent]  shrink-0 rounded flex flex-row items-center justify-center px-0 py-2 md:py-3.5  md:px-3 gap-1 md:gap-2"
              >
                Add New Category
                <MdOutlineCategory className="w-5 h-7" />
              </button>
              <button
                onClick={() => {
                  navigate(`/admin/seller/brand/${sellerId}`);
                }}
                className="border-[0.6px] border-solid border-black cursor-pointer text-sm md:text-base lg:text-lg font-light p-0 bg-[transparent]  shrink-0 rounded flex flex-row items-center justify-center px-0 py-2 md:py-3.5  md:px-3 gap-1 md:gap-2"
              >
                View All Brand
                <MdOutlineCategory className="w-5 h-7" />
              </button>
            </div>
          </div> */}
          <SideMenu sellerId={sellerId} className={"!m-0"}/>
          <div className="hidden md:block   box-border border-r-[1px] border-solid border-black" />
          {/* Product Data Table section */}
          <div className="w-full md:w-2/3 lg:w-3/4 md:px-10 px-4 pb-3">
            <div className=" flex-grow flex flex-col items-center">
              <div className="w-full ">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                  <div className="flex items-center mb-4 md:mb-0">
                    <MdOutlineBrandingWatermark className="w-6 h-6 mr-2" />
                    <span className="underline">Brand Info</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder="Search by Brand Name"
                      className="p-2 border rounded"
                    />
                    <button
                      onClick={handleClearSearch}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="flex justify-end mb-4">
                  <button
                    onClick={() =>
                      navigate(`/admin/seller/${sellerId}/brand/size`)
                    }
                    className="bg-[#f9454f] hover:bg-black text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                  >
                    Add New Brand
                  </button>
                </div>

                <div>
                  <DataTable
                    columns={columns}
                    data={filteredBrands}
                    pagination
                    responsive
                    highlightOnHover
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <JumpButton />
        <div className=" box-border w-full h-[1px] bg-black border-r-[1px] border-solid border-black" />
        <Footer />
      </div>
      }
      
    </>
  );
};

export default ViewAllBrand;

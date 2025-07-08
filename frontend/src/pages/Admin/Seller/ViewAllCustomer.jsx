import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCustomers } from "../../../slices/customer";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Hero from "../../../components/Hero";
import SideMenu from "../../../components/SideMenu";
import SearchBox from "../../../components/SearchBox";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { IoEnterOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import JumpButton from "../../../components/jump/JumpButton";


const columns = [
  {
    name: "ID",
    selector: (row, index) => index + 1, // Generate ID based on index
    maxWidth: "5px",
  },
  {
    name: "Enter",
    selector: (row) => (
      <>
        <Link
          to={`/admin/seller/${row.SellerId}/customer/dashboard/${row._id}`}
          className=""
          role="button"
          aria-pressed="true"
        >
          <IoEnterOutline className="w-7 h-7" />
        </Link>
      </>
    ),
    maxWidth: "130px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Age",
    selector: (row) => row.age,
    sortable: true,
  },
  {
    name: "Chest Size",
    selector: (row) => row.chest_inch,
    sortable: true,
  },
  {
    name: "Shoulder Size",
    selector: (row) => row.shoulder_inch,
    sortable: true,
  },
  {
    name: "Front Length",
    selector: (row) => row.front_Length_inch,
    sortable: true,
  },
  {
    name: "Waist Length",
    selector: (row) => row.waist_inch,
    sortable: true,
  },
];

const ViewAllCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get('searchTerm') || '';
 

  const handleBack = () => {
    navigate("/admin/seller"); // Navigate to the /admin/seller URL
  };

  const params = useParams();
  const dispatch = useDispatch();
  // Get the customerItems from the store
  const { customerItems } = useSelector((state) => state.customer);
  const sellerId = params.id;
  const [customers, setCustomers] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //lets first get the data from local storage
      if(!customerItems || customerItems.length === 0){
        // console.log("Fetching customer data from the server");
      const response = await axios.get(
        `${baseUrl}/seller/customers/${sellerId}`,
        {
         withCredentials: true,
        }
      );
      setCustomers(response.data.customers);
      //store the data in local storage for future use
      dispatch(addCustomers(response.data.customers));
    }else{
      // console.log("Fetching customer data from local storage");
      setCustomers(customerItems);
    } 
  }catch (error) {
      console.error("Error fetching customer data:", error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      });
    }
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      <div className="w-full h-4 bg-[#f9454f]"></div>
      <Navbar />
      <Hero  page='"See All Customers"' subtitle=' Below is a table displaying all customer information'/>
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12">
     <div className="col-span-1 md:col-span-4 lg:col-span-3 h-auto  border-r border-solid border-black">
    <SideMenu sellerId={sellerId}/>
    </div>
  <div className="col-span-1 md:col-span-8 lg:col-span-9  h-auto">
  <SearchBox title="Customers Info" sellerId={sellerId}  />
  <div className="ml-8">
    {filteredCustomers.length === 0 ? (<h2 className="italic mt-10">No Customer Found</h2>) : (<DataTable
              columns={columns}
              data={filteredCustomers}
              pagination
              responsive
              highlightOnHover
            />
)}
  
  </div>
  
            <div className="flex justify-center pt-10">
              <button
                type="submit"
                className="cursor-pointer bg-[#f9454f] hover:bg-black text-white font-light py-2 px-4 rounded text-[16px] mb-8"
              >
                Export List
              </button>
            </div>
  </div>
</div>
      <JumpButton />
      <Footer />
    </>
  );
};

export default ViewAllCustomer;

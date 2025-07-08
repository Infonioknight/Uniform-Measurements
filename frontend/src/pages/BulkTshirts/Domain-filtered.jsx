import MyTable from "../../components/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../baseUrl/BaseUrl";
import { Link } from "react-router-dom";
import { userAuthService } from "../../AuthService/authService";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from 'axios';

const columns = [
  {
    name: " SNo",
    selector: (row, index) => index + 1, // Generate ID based on index
    maxWidth: "5px",
  },
  {
    name: " Name",
    minWidth: "200px",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "email",
    minWidth: "200px",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Chest Size",
    minWidth: "200px",
    selector: (row) => row.chest_inch,
    sortable: true,
  },
  {
    name: "Shoulder Size",
    minWidth: "200px",
    selector: (row) => row.shoulder_inch,
    sortable: true,
  },
  {
    name: "Front Length",
    minWidth: "200px",
    selector: (row) => row.front_Length_inch,
    sortable: true,
  },
];

const DomainFilteredPage = () => {
  const params = useParams();
  const companyId = params.id;
  const [company, setCompany] = useState({});
  const [companyEmps, setCompanyEmps] = useState([]);
  const [fabricQuantity, setFabricQuantity] = useState({});
  const companyDetails = userAuthService().getUserData();

  const buttonStyle =
    "text-lg py-2 px-4 rounded bg-blue-500 text-white cursor-pointer";
  const inputStyle =
    "text-base py-2 px-4 rounded bg-blue-500 text-white border-none mr-2";

  useEffect(() => {
    async function getCompanyData() {
      try {
        const response = await axios.get(`${baseUrl}/company/${companyId}`);

        if (!response.data) {
          throw new Error('No data available');
        }

        const { companyData, companyEmps } = response.data;
        setCompanyEmps(companyEmps);
        setCompany(companyData[0]);
        // setPending(false); // You may uncomment this if needed
      } catch (error) {
        console.error('Error:', error.message);
        // Handle HTTP errors and other errors as needed
        // For example, you can show a message to the user
        // Swal.fire({
        //   title: 'Something went Bad',
        //   text: error.message,
        //   icon: 'error',
        // });
      }
    }

    getCompanyData();
  }, []);

  const handleGetTshirtQuantity = async () => {
    try {
      const response = await axios.get(`${baseUrl}/menTopFabric/getTshirtQuantity/${company.name}`);

      if (response.status === 200) {
        const result = response.data;
        setFabricQuantity(result["fabric size Quantity"]);
      } else {
        console.error("Error getting T-shirt quantity:", response.statusText);
        // Handle error condition as needed
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle network errors or other exceptions
    }
  };



  return (
    <div className="bg-white w-full min-h-screen font-poppins">
      <div className="w-full bg-[#f9454f] h-4"></div>
      <Navbar />
      <div className="w-full bg-[#f9454f] font-sans text-white text-center py-12 px-4">
        <h1 className="text-center mb-3 text-[36px] font-bold">
          {company.name}
        </h1>
        <h1 className="text-center mb-3 text-2xl font-light">
          {company.email}
        </h1>
      </div>

      <button
        className="bg-[#f9454f] text-white px-4 py-2 rounded-md ml-[5%] mt-[2%] font-semibold hover:bg-black hover:cursor-pointer text-[16px]"
        onClick={handleGetTshirtQuantity}
      >
        Get T-shirt Quantity
      </button>
      {Object.keys(fabricQuantity).length > 0 && (
        <div className="bg-rose-100 p-6 rounded-md shadow-md mt-2 mx-[5%]">
          <h2 className="text-2xl font-semibold mb-4">Fabric Quantity:</h2>
          <ul className="list-disc pl-4">
            {Object.entries(fabricQuantity).map(([size, quantity]) => (
              <li key={size} className="mb-2">
                <span className="font-semibold">{size}:</span> {quantity}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h1 className="text-center text-2xl font-bold my-9">
        Employee List
      </h1>
      <div className="mx-[5%] custom-border">
        <MyTable columns={columns} data={companyEmps} />
      </div>
      <div className="ml-[5%] mt-5">
        <Link
          to={"/bulk-tshirts/Company/login"}
          className="bg-[#f9454f] hover:bg-black text-white font-bold py-2 px-5 rounded-md no-underline"
          role="button"
          aria-pressed="true"
        >
          Back
        </Link>
        {/* Footer */}
        <div className="border-t border-solid border-black mt-16"></div>
        <Footer />
      </div>
    </div>
  );
};

export default DomainFilteredPage;

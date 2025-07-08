import MyTable from "../../components/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../baseUrl/BaseUrl";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from 'axios';
import JumpButton from "../../components/jump/JumpButton";

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
    minWidth: "150px",
    selector: (row) => row.chest_inch,
    sortable: true,
  },
  {
    name: "Shoulder Size",
    minWidth: "150px",
    selector: (row) => row.shoulder_inch,
    sortable: true,
  },
  {
    name: "Front Length",
    minWidth: "150px",
    selector: (row) => row.front_Length_inch,
    sortable: true,
  },
  {
    name: "Waist Length",
    minWidth: "150px",
    selector: (row) => row.waist_inch,
    sortable: true,
  },
];

const CompanyProfile = () => {
  const params = useParams();
  const companyId = params.id;
  const [company, setCompany] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [excelData, setexcelData] = useState(null);
  const [companyEmps, setCompanyEmps] = useState([]);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [fabricQuantity, setFabricQuantity] = useState({});
  const [defSizeChart, setdefSizeChart] = useState([]);  // Default size data variable.
  const [tShirtsizeFile, setTShirtsizeFile] = useState(null);// Handling T-shirt Size Excel.
  const [t_shirtUpSt,setT_shirtUpSt] = useState("");//T-shirt size excal upload status.
  const [tsTextColor,set_tsTextColor] = useState(""); // Upload msg color changing according to responce.
  
  const tshirtcolumns = [// T-shirt size table columns.
    {
      name: " Name",
      minWidth: "200px",
      selector: (row) => row.brand_Name,
      sortable: true,
    },
    {
      name: "Size",
      minWidth: "200px",
      selector: (row) => row.brand_Size,
      sortable: true,
    },
    {
      name: "Category",
      minWidth: "150px",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Chest size in Inch",
      minWidth: "150px",
      selector: (row) => row.chest_Size,
      sortable: true,
    },
    {
      name: "Shoulder Size in Inch",
      minWidth: "150px",
      selector: (row) => row.shoulder_Length,
      sortable: true,
    },
    {
      name: "Front Size in Inch",
      minWidth: "150px",
      selector: (row) => row.front_Size,
      sortable: true,
    }
  ];

  const buttonStyle =
    "text-lg py-3 px-6 rounded bg-[#f9454f] text-white cursor-pointer hover:bg-black";
  const inputStyle =
    "text-base py-2 px-4 rounded text-black custom-border mr-2";


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
    getTshirtSizeData() // Getting default data from server.
  }, []);

  const handleFileChange = (e) => {
    setexcelData(e.target.files[0]);
    setexcelData(e.target.files[0]);
    setErrors({ excelFile: "" });
  };

  const handleExcelUpload = async () => {
    // Validation for file
    if (excelData == null) {
      setErrors({ excelFile: "Please select a file" });
      return;
    }

    const formData = new FormData();
    formData.append("emailsFile", excelData);

    try {
      const response = await axios.post(
        `${baseUrl}/company/emails/upload/${company.name}`,
        formData
      );

      if (response.status === 201) {
        setSubmitStatus("Excel file uploaded successfully!");
        setSubmitStatus("Excel file uploaded successfully!");
        window.location.reload();
      } else {
        setSubmitStatus("Error uploading Excel file. Please try again.");
        setSubmitStatus("Error uploading Excel file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading Excel file:", error);
      setSubmitStatus("Error uploading Excel file. Please try again.");
      setSubmitStatus("Error uploading Excel file. Please try again.");
    }
  };

  const handleGenerateLink = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/company/generateLink/${company._id}`
      );

      if (response.status === 200) {
        const result = response.data;
        setGeneratedLink(result.link);
        setCopySuccess("");
      } else {
        console.error("Error generating link:", response.statusText);
        setGeneratedLink("");
        setCopySuccess("");
      }
    } catch (error) {
      console.error("Error generating link:", error);
      setGeneratedLink("");
      setCopySuccess("");
    }
  };

  const handleGetTshirtQuantity = async () => {

    try {
      const response = await axios.get(
        `${baseUrl}/menTopFabric/getTshirtQuantity/${company.name}`
      );
  
      if (response.status === 200) {
        const result = response.data;
        // console.log('T-shirt quantity:', result);
        setFabricQuantity(result["fabric size Quantity"]);
      } else {
        console.error("Error generating link:", response.statusText);
      }
    } catch (error) {
      console.error("Error generating link:", error);
      }
  };
  

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(generatedLink)
      .then(() => {
        setCopySuccess("Link copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 3000); // Clear the message after 3 seconds
      })
      .catch((err) => console.error("Error copying link:", err));
  };



  // Getiing T-shirt size chart from backend
  async function getTshirtSizeData() { 
    try {
      const res = await axios.get(`${baseUrl}/company/tshirts/${companyId}`);
      if (!res.data) {
        throw new Error('No data available');
      }
      setdefSizeChart(res.data.tshirtSizes)
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  // Handling T-shirt Size Excal Upload.
  const handelTSizeUpload = async () => { 
    try {
      const tShirtSizeData = new FormData();
      tShirtSizeData.append("tshirtFile", tShirtsizeFile);
      const res = await axios.post(`${baseUrl}/company/tshirts/upload/${companyId}`, tShirtSizeData);
     if(res.status === 201){
        getTshirtSizeData();
        set_tsTextColor("text-blue-600");
        setT_shirtUpSt("T-shirt size excal sheet successfully uploaded.");

      }
    } catch (error) {
      set_tsTextColor("text-[#f9454f]");
      setT_shirtUpSt("Error uploading Excel file.Try again!!");
      console.error("Error uploading Excel file:", error);
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
        <div className="flex gap-2 justify-center">
          <button className="px-3 py-2 rounded-sm">T-Shirt</button>
          <button className="px-3 py-2 rounded-sm">Men</button>
          <button className="px-3 py-2 rounded-sm">Women</button>
        </div>
      </div>

      <div className="mb-1 flex items-center ml-[3%] mt-[2%]">
        <input
          type="file"
          className="custom-border cursor-pointer mr-[1%] sm:w-72 w-56"
          onChange={handleFileChange}
        />
        <button className={buttonStyle} onClick={handleExcelUpload}>
          Upload
        </button>
      </div>
      <div className="text-red-600 ml-[3%]">{errors.excelFile}</div>
      <div className="text-blue-600 mb-6 ml-[3%]">{submitStatus}</div>
      <div className="flex justify-between ml-[3%]">
        <div>
          <p className="font-semibold text-lg">Download</p>
          <div>
            <a
              href={`${baseUrl}/download/employee-emails-template`}
              download="employee-details-template.xlsx"
              className="text-[#f9454f]  underline"
            >
              Employee Email Template
            </a>
          </div>
          <div>
            Note :- Download the template and fill it with your employee emails.
          </div>
        </div>
      </div>
      {/*T-shirt size excal upload section. */}
      <div className="mb-1 flex items-center ml-[3%] mt-[2%]">
        <input
          type="file"
          accept=".xls,.xlsx"
          className="custom-border cursor-pointer mr-[1%] sm:w-72 w-56"
          onChange={(e) => { setTShirtsizeFile(e.target.files[0]) }}
        />
        <button className={buttonStyle} onClick={() => { handelTSizeUpload() }}>
          Upload
        </button>

      </div>
      <div className={`${tsTextColor} mb-6 ml-[3%]`}>{t_shirtUpSt}</div>
      <div className="flex justify-between ml-[3%]">
        <div>
          <p className="font-semibold text-lg">Download</p>
          <div>
            <a
              href={`${baseUrl}/download/tshirts-details-template`}  //href for download T-shirt size template
              download="templetefile/tshirts-details-template.xlsx"
              className="text-[#f9454f]  underline"
            >
              T-shirt Size Chart
            </a>
          </div>
          <div>
            Note :- Download the template and fill it with your Company T-shirt Size.
          </div>
        </div>
      </div>
      <div className="flex justify-center top-20 mt-4 mb-10">
        <button onClick={handleGenerateLink} className={buttonStyle}>
          Generate Share Link
        </button>
      </div>
      {generatedLink && (
        <div className="text-center mb-4 mx-[3%] md:flex md:justify-center gap-2">
          <p className="text-lg font-bold mb-2 flex-col flex justify-center">Generated Link:</p>
          <input
            type="text"
            value={generatedLink}
            className="w-[50%] p-2 border rounded flex-col flex justify-center text-center mx-auto m-2"
            readOnly
          />
          <button onClick={handleCopyLink} className={buttonStyle}>
            Copy Link
          </button>
          {copySuccess && <p className="text-green-500 mt-2 flex flex-col ml-[1%]">{copySuccess}</p>}
        </div>
      )}
      {/* T-shirt size table */}
      <div className="mx-[3%] mt-[1%] custom-border">
        <MyTable columns={tshirtcolumns} data={defSizeChart} />
      </div>
      <button
        className="bg-[#f9454f] text-white px-4 py-2 rounded-md ml-[3%] mt-[2%] font-semibold hover:bg-black hover:cursor-pointer text-[16px]"
        onClick={handleGetTshirtQuantity}
      >
        Get T-shirt Quantity
      </button>
      {Object.keys(fabricQuantity).length > 0 && (
        <div className="bg-rose-100 p-6 rounded-md shadow-md mt-2 mx-[3%]">
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
      
      
      <div className="mx-[3%] mt-[1%] custom-border">
        <MyTable columns={columns} data={companyEmps} />
      </div>
      <div className="ml-[3%] mt-5">
        <Link
          to={"/bulk-tshirts/Company/login"}
          className="bg-[#f9454f] hover:bg-black text-white font-bold py-2 px-5 rounded-md no-underline"
          role="button"
          aria-pressed="true"
        >
          Back
        </Link>
        {/* Footer */}
        <JumpButton />
        <div className="border-t border-solid border-black mt-16"></div>
        <Footer />
      </div>
    </div>
  );
};

export default CompanyProfile;
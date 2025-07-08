import React, { useState } from "react";
import { baseUrl } from "../../baseUrl/BaseUrl";
import Navbar from "../../components/Navbar";
import axios from 'axios';
import Footer from "../../components/Footer";

const BulkExcelUpload = () => {
  const [tshirtFile, setTshirtFile] = useState(null);
  const [userFile, setUserFile] = useState(null);
  const [fabricQuantity, setFabricQuantity] = useState({});

  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e,setFile) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setUploadError(null); // Clear any previous error
    }
  };

  const handleUpload = async () => {
    if (!userFile || !tshirtFile) {
      setUploadError("Both files must be selected.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("userFile", userFile);
      formData.append("tshirtFile", tshirtFile);

      const response = await axios.post(`${baseUrl}/menTopFabric/fabricQuantity`, formData);
      
      if (response.status === 200) {
        const data = response.data;
        setFabricQuantity(data["fabric size Quantity"]);
        setUserFile(null);
        setTshirtFile(null);
      } else {
        setUploadError("Error uploading the file. Please try again.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadError("Error uploading the file. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-crimson h-4 w-full"></div>
      <Navbar />
      <div className="flex flex-col bg-[#ffffff]">
        <div className="flex flex-col items-center px-6 pt-8 md:pt-14 pb-4 w-full text-center bg-[#f9454f] max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col mt-1 w-full max-w-[1078px] max-md:mt-10 max-md:max-w-full">
            <div className="self-center text-5xl font-bold leading-10 max-md:max-w-full">
              Bulk Excel Sheet Upload of Employee Details
            </div>
            <div className="mt-2 text-xl leading-7 max-md:max-w-full">
              Experience the convenience of uploading an Excel sheet containing your employee details, including their names, size in inches (chest, shoulder, front). Within less than a minute, receive a precise breakdown of the required quantities for each T-shirt size you need. Simplify your ordering process with ease and efficiency!
            </div>
          </div>
        </div>
        <div className="self-center mt-6 w-full max-w-[1190px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-6/12 max-md:w-full">
              <div className="flex flex-col grow px-5 leading-[126%] max-md:mt-10 max-md:max-w-full">
                <div className="text-3xl font-bold text-zinc-950 max-md:max-w-full">
                  Upload Employee Data
                </div>
                <div className="flex gap-4 mt-8 max-md:flex-wrap">
                  <label
                    htmlFor="user-file-input"
                    className="justify-center self-start p-2 text-lg text-center bg-[#f9454f] text-red-500 hover:bg-black hover:text-white rounded-md border border-red-500 border-solid"
                  >
                    <span>Choose User File</span>
                    <input
                      type="file"
                      id="user-file-input"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setUserFile)}
                    />
                  </label>
                  <label
                    htmlFor="tshirt-file-input"
                    className="justify-center self-start p-2 text-lg text-center bg-[#f9454f] text-red-500 hover:bg-black hover:text-white rounded-md border border-red-500 border-solid"
                  >
                    <span>Choose Tshirt File</span>
                    <input
                      type="file"
                      id="tshirt-file-input"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, setTshirtFile)}
                    />
                  </label>
                  <button
                    onClick={handleUpload}
                    className="px-6 py-2.5 text-base font-semibold bg-[#f9454f] hover:bg-black hover:text-white rounded-md max-md:px-5 disabled:pointer-events-none disabled:bg-slate-300" disabled = {!userFile && !tshirtFile || !userFile && tshirtFile || userFile && !tshirtFile}
                  >
                    Upload
                  </button>
                </div>
                {userFile && <p className="text-black-500 pr-3 text-lg">{userFile.name} File selected</p>}
                {tshirtFile && <p className="text-black-500 pr-3 text-lg">{tshirtFile.name} File selected</p>}
                {uploadError && <p className="text-red">{uploadError}</p>}
                <div className="mt-3 text-lg text-neutral-700 max-md:max-w-full">
                  In xlsx Format
                </div>
                <div className="mt-5 text-2xl font-bold text-zinc-950 max-md:max-w-full">
                  Download
                </div>

                <a
                  href={`${baseUrl}/download/employee-details-template`}
                  download="employee-details-template.xlsx"
                  className="mt-2 text-lg text-[#f9454f] underline max-md:max-w-full"
                >
                  Employee Details Template
                </a>
                <a
                  href={`${baseUrl}/download/tshirts-details-template`}
                  download="tshirts-details-template.xlsx"
                  className="mt-2 text-lg text-[#f9454f] underline max-md:max-w-full"
                >
                  Tshirts Details Template
                </a>
                <div className="mt-3 text-lg max-md:max-w-full">
                  {Object.keys(fabricQuantity).length > 0 && (
                    <div className="p-6 rounded-md shadow-md mt-2">
                      <h2 className="text-2xl font-semibold mb-4">Fabric Quantity :</h2>
                        <ul className="list-disc pl-4">
                          {Object.entries(fabricQuantity || {}).map(([size, quantity]) => (
                            <li key={size} className="mb-2">
                              <span className="font-semibold">{size}:</span> {quantity}
                            </li>
                          ))}
                        </ul>

                    
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6eb28cee84d6596b0595a72bf899db05c84f7441e5cb000e2052998885597332?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6eb28cee84d6596b0595a72bf899db05c84f7441e5cb000e2052998885597332?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6eb28cee84d6596b0595a72bf899db05c84f7441e5cb000e2052998885597332?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6eb28cee84d6596b0595a72bf899db05c84f7441e5cb000e2052998885597332?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6eb28cee84d6596b0595a72bf899db05c84f7441e5cb000e2052998885597332?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6eb28cee84d6596b0595a72bf899db05c84f7441e5cb000e2052998885597332?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6eb28cee84d6596b0595a72bf899db05c84f7441e5cb000e2052998885597332?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=2000 2000w"
                className="mt-2 w-full aspect-[1.32] max-md:mt-10 max-md:max-w-full"
              />
            </div>
          </div>
        </div>
        <div className="box-border mt-2 w-full h-[1px] bg-black border-r-[1px] border-solid border-black" />
        <Footer />
      </div>
    </>
  );
};

export default BulkExcelUpload;

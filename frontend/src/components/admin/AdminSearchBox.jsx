import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaCriticalRole, FaTimes } from "react-icons/fa";
import { SiNamemc } from "react-icons/si";

const AdminSearchBox = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchName, setSearchName] = useState("");
  const [searchRole, setSearchRole] = useState("");

  // Handle form submission and navigate to search results page
  const submitHandler = (e) => {
    e.preventDefault();

    // Prepare query parameters
    const query = new URLSearchParams();
    if (searchName.trim()) query.set("searchName", searchName);
    if (searchRole.trim()) query.set("searchRole", searchRole);

    if (query.toString()) {
      navigate(`/admin/dashboard/${id}/?${query.toString()}`);
    } else {
      navigate(`/admin/dashboard/${id}`);
    }
  };

  return (
    <div className="flex justify-center pt-7 w-full">
      <form
        onSubmit={submitHandler}
        className="flex xl:flex-row flex-col w-11/12 md:w-10/12 justify-between items-center text-center border-solid border-[1px] border-[#868686] p-2 rounded shadow-md"
      >
        <div className="flex justify-between xl:flex-row flex-col items-center text-center 2xl:w-[86%] w-full">
          {/* Search by Name */}
          <div className="relative flex items-center m-2 w-full">
            <SiNamemc className="mr-3 text-3xl" size={30} />
            <input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
                submitHandler(e);
              }}
              className="p-2 focus:outline-blue-300 focus:ring focus:ring-blue-200 focus:rounded w-full text-[15px] border-2 border-solid border-[#868686]"
            />
            {searchName && (
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => {
                    setSearchName("")
                navigate(`/admin/dashboard/${id}`)}
                }
              >
                <FaTimes className="text-black hover:text-black" size={20} />
              </button>
            )}
          </div>

          {/* Search by Role */}
          <div className="relative flex items-center m-2 w-full">
            <FaCriticalRole className="mr-2 text-3xl xl:ml-2" size={32} />
            <input
              type="text"
              placeholder="Search by Role"
              value={searchRole}
              onChange={(e) => {
                setSearchRole(e.target.value);
                submitHandler(e);
              }}
              className="p-2 focus:outline-blue-300 focus:ring focus:ring-blue-200 focus:rounded w-full text-[15px] border-2 border-solid border-[#868686]"
            />
            {searchRole && (
              <button
                type="button"
                className="absolute right-2 top-2"
                onClick={() => {
                    setSearchRole("");
                    navigate(`/admin/dashboard/${id}`)}
                    }
              >
                <FaTimes className="text-black hover:text-black" size={20} />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSearchBox;

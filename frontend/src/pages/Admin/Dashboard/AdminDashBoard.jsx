
import React, { useState, useMemo, useEffect } from "react";
import AdminTable from "../../../components/admin/AdminTable";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from '../../../components/Loader/Loader';
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSlider from "../../../components/admin/AdminSlider";
import AdminSearchBox from "../../../components/admin/AdminSearchBox";
import { useLocation } from "react-router-dom";
import {MdEdit} from "react-icons/md";



const Dashboard = () => {
  const [filteredUsers,setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const location = useLocation();
  // Get the search keyword from the URL
  const query = new URLSearchParams(location.search);
  const searchName = query.get("searchName");
  const searchRole = query.get("searchRole");

  

  const handleClearFilter = () => {
    setSearchText("");
  };


  useEffect(() => {
    async function fetchUsers() {
        try {
          setLoading(true);
            const response = await axios.get(`${baseUrl}/admin/users/`, {
                withCredentials: true,
            });
            
            const userData = response?.data?.users;
            setUsers(userData);
            setLoading(false);
        } catch (error) {
            console.error("Error", error.message);
            Swal.fire({
                title: 'Error',
                text: error?.response?.data?.error || error?.response?.data?.message,
                icon: 'error',
            });
            setLoading(false);
        }
    }
    fetchUsers();
}, []);


  // Apply filters based on search criteria
  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesName = searchName
        ? user?.name?.toLowerCase().includes(searchName.toLowerCase()) || user?.google?.name?.toLowerCase().includes(searchName.toLowerCase())
        : true;
      const matchesRole = searchRole
        ? user?.role?.includes(searchRole)
        : true;
      return matchesName && matchesRole;
    });
    setFilteredUsers(filtered);
  }, [users, searchName, searchRole]);

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1, // Generate ID based on index
      maxWidth: "50px", 
    },
    {
      name: "Name",
      selector: (row) => row.name ? row.name : row.google?.name,
      sortable: true,
      
    },
    {
      name: "Email",
      selector: (row) => row.email ? row.email : row.google?.email,
      minWidth: "200px", 
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      maxWidth: "100px", // Reduce the width for the role column
    },
    {
      name: "Number",
      selector: (row) => row.number,
     
    },
    {
      name: "Action",
      selector: (row) => (
        <Link
          to={`/admin/user/profile/${row._id}`}
          className="w-[70px] cursor-pointer py-2 px-2.5 bg-[transparent] rounded flex items-center justify-center border-[0.8px] border-solid border-black"
        >
          <MdEdit />
        </Link>
      ),
      maxWidth: "100px", // Adjust the width for the action column if needed
    },
  ];
  

  return (
    <div className='flex w-dvw h-dvh p-3'>
    <div>
      <AdminSlider />
      </div>
      <main className="w-full h-full mb-10 overflow-auto scrollbar-hide">
          <AdminHeader />
          <div className="flex flex-col lg:flex-row justify-between items-center">

            <AdminSearchBox />
          </div>
                    <div className="my-10 block mx-auto">
            {filteredUsers?.length === 0 && !loading && (
              <h2 className="mt-10 ml-5">No user found</h2>
            )}
            <h1 className="text-7xl font-semibold text-center">Users / Sellers</h1>
            {loading && (
              <div className="flex justify-center items-center h-64">
                <Loader />
              </div>
            )}
          </div>

          
          {!loading && (
          <AdminTable
          columns={columns}
          data={filteredUsers}
          pagination
          responsive
          highlightOnHover
        />
        )}
        </main>
    </div>
  )
};

export default Dashboard;

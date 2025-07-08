import React, { useState, useEffect } from "react";
import AdminTable from "../../../components/admin/AdminTable";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader/Loader";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminSlider from "../../../components/admin/AdminSlider";
import AdminSearchBox from "../../../components/admin/AdminSearchBox";
import { useLocation } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import tempImg from "../../../assets/seller-profile.jpeg";

const AccountDeleteRequests = () => {
  // const [filteredUsers,setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);

  const location = useLocation();
  // Get the search keyword from the URL
  const query = new URLSearchParams(location.search);
  const searchName = query.get("searchName");
  const searchRole = query.get("searchRole");

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`${baseUrl}/users/${userId}`, {
            withCredentials: true,
          });

          if (response.status === 200) {
            Swal.fire({
              title: "Account Deleted Successfully",
              icon: "success",
            });

            window.location.reload();
          } else {
            throw new Error("Failed to delete account.");
          }
        } catch (error) {
          Swal.fire({
            title: "Deletion Failed",
            text:
              error.response?.data?.message ||
              "There was an error while deleting the account.",
            icon: "error",
          });
        }
      }
    });
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/deleted_users/`, {
          withCredentials: true,
        });
        console.log(response);

        const userData = response?.data?.data;
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error", error.message);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.error || error?.response?.data?.message,
          icon: "error",
        });
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Apply filters based on search criteria
  // useEffect(() => {
  //   const filtered = users.filter((user) => {
  //     const matchesName = searchName
  //       ? user?.name?.toLowerCase().includes(searchName.toLowerCase()) || user?.google?.name?.toLowerCase().includes(searchName.toLowerCase())
  //       : true;
  //     const matchesRole = searchRole
  //       ? user?.role?.includes(searchRole)
  //       : true;
  //     return matchesName && matchesRole;
  //   });
  //   setFilteredUsers(filtered);
  // }, [users, searchName, searchRole]);

  const showDetails = async (row, index) => {
    try {
      const { name, email, profile_image, number, isDeleted } =
        users[index];
      // console.log(name);
      // console.log(profile_image);
      Swal.fire({
        html: `
          <img style="border-radius: 7px;width:100%;aspect-ratio: 4 / 3;" src=${tempImg}>
          <div style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-between;align-items: flex-start;">
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
          </div>
          <div style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-between;align-items: flex-start;">
            <p>Number: ${number}</p>           
            <p>Want to delete: ${isDeleted}</p>  
          </div>
        `,
        showCancelButton: true,
        // confirmButtonText: "Approve",
        // cancelButtonText: "Reject",
      });

      setDetailLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: "error",
      });
      setDetailLoading(false);
    }
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      maxWidth: "50px",
    },
    {
      name: "Name",
      selector: (row) => (row.name ? row.name : row.google?.name),
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => (row.email ? row.email : row.google?.email),
      minWidth: "200px",
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      maxWidth: "100px", // Reduce the width for the role column
    },
    {
      name: "Deletion Reason",
      selector: (row) => row.deletionReasons[0],
    },
    {
      name: "Details",
      selector: (row, index) => (
        <>
          <button
            onClick={() => {
              showDetails(row, index);
            }}
            className="bg-[#f9454f] hover:bg-black text-white p-1 rounded transition duration-300 ease-in-out"
          >
            Show Details
          </button>
        </>
      ),
      Width: "10px",
    },
    {
      name: "Action",
      selector: (row) => (
        <button
          onClick={() => handleDelete(row._id)}
          className="w-[70px] cursor-pointer py-2 px-2.5 bg-[transparent] rounded flex items-center justify-center border-[0.8px] border-solid border-black"
        >
          <MdOutlineDeleteOutline />
        </button>
      ),
      maxWidth: "100px",
    },
  ];

  return (
    <div className="flex w-dvw h-dvh p-3">
      <div>
        <AdminSlider />
      </div>
      <main className="w-full h-full mb-10 overflow-auto scrollbar-hide">
        <AdminHeader />
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <AdminSearchBox />
        </div>
        <div className="my-10 block mx-auto">
          {users?.length === 0 && !loading && (
            <h2 className="mt-10 ml-5">No deletion requests found</h2>
          )}
          <h1 className="text-7xl font-semibold text-center">
            Account Delete Requests
          </h1>
          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          )}
        </div>

        {!loading && (
          <AdminTable
            columns={columns}
            data={users}
            pagination
            responsive
            highlightOnHover
          />
        )}
      </main>
    </div>
  );
};

export default AccountDeleteRequests;

import React, { useState, useMemo, useEffect } from 'react'
import AdminTable from '../../../../components/admin/AdminTable'
import { Link } from 'react-router-dom'
// import { baseUrl } from '../../../baseUrl/BaseUrl'
import axios from 'axios'
import Swal from 'sweetalert2'
import Loader from '../../../../components/Loader/Loader'
import AdminHeader from '../../../../components/admin/AdminHeader'
import AdminSlider from '../../../../components/admin/AdminSlider'
import AdminSearchBox from '../../../../components/admin/AdminSearchBox'
import { useLocation } from 'react-router-dom'
import { MdHowToReg } from 'react-icons/md'
import { FaUserTimes } from 'react-icons/fa'
import tempImg from '../../../../assets/seller-profile.jpeg'
import { baseUrl } from '../../../../baseUrl/BaseUrl'

const ManageRequests = () => {
  const [requestsData, setRequestsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)

  const location = useLocation()
  // Get the search keyword from the URL
  // const query = new URLSearchParams(location.search)
  // const searchName = query.get('searchName')
  // const searchRole = query.get('searchRole')

  useEffect(() => {
    async function fetchRequestData() {
      try {
        setLoading(true)
        const response = await axios.get(
          `${baseUrl}/admin/receiveSellerRequest/`,
          {
            withCredentials: true,
          }
        )
        // console.log(response)
        const requestData = response?.data?.requests
        // console.log(requestData)
        setRequestsData(requestData)
        setLoading(false)
      } catch (error) {
        console.error('Error', error.message)
        Swal.fire({
          title: 'Error',
          text: error?.response?.data?.error || error?.response?.data?.message,
          icon: 'error',
        })
        setLoading(false)
      }
    }
    fetchRequestData()
  }, [])

  // Apply filters based on search criteria
  // useEffect(() => {
  //   const filtered = users.filter((user) => {
  //     const matchesName = searchName
  //       ? user?.name?.toLowerCase().includes(searchName.toLowerCase()) ||
  //         user?.google?.name?.toLowerCase().includes(searchName.toLowerCase())
  //       : true
  //     const matchesRole = searchRole ? user?.role?.includes(searchRole) : true
  //     return matchesName && matchesRole
  //   })
  //   setFilteredUsers(filtered)
  // }, [users, searchName, searchRole])

  // const RequestsData = [
  //   {
  //     shopname: 'John Shop',
  //     road: 'john@example.com',
  //     state: 'Tamil Nadu',
  //     city: 'Chennai',
  //     pincode: '1234567890',
  //   },
  //   {
  //     shopname: 'Janes Shop',
  //     road: 'john@example.com',
  //     state: 'Karnataka',
  //     city: 'Bangalore',
  //     pincode: '1234567890',
  //   },
  //   {
  //     shopname: 'Prem Shop',
  //     road: 'john@example.com',
  //     state: 'Maharashtra',
  //     city: 'Mumbai',
  //     pincode: '1234567890',
  //   },
  // ]

  const showDetails = async (row, index) => {
    try {
      const { shop_name, email } = requestsData[index]
      const { profile_image, pin_code, status } = requestsData[index]
      // console.log(name)
      // console.log(profile_image)
      Swal.fire({
        html: `
          <img style="border-radius: 7px;width:100%;aspect-ratio: 4 / 3;" src=${profile_image}>
          <div style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-between;align-items: flex-start;">
            <p>Name: ${shop_name}</p>
            <p>Email: ${email}</p>
          </div>
          <div style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-between;align-items: flex-start;">
            <p>Pin Code: ${pin_code}</p>           
            <p>Status: ${status}</p>  
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Okay',
        cancelButtonText: 'Close',
      })

      setDetailLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      })
      setDetailLoading(false)
    }
  }

  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1, // Generate ID based on index
      maxWidth: '50px',
    },
    {
      name: 'Shop Name',
      selector: (row) => row.shop_name,
      sortable: true,
    },
    {
      name: 'Road',
      selector: (row) => row.road,
      minWidth: '200px',
    },
    {
      name: 'State',
      selector: (row) => row.state,
      sortable: true,
      maxWidth: '100px', // Reduce the width for the role column
    },
    {
      name: 'City',
      selector: (row) => row.city,
    },
    {
      name: 'Details',
      selector: (row, index) => (
        <>
          <button
            onClick={() => {
              showDetails(row, index)
            }}
            className='bg-[#f9454f] hover:bg-black text-white p-1 rounded transition duration-300 ease-in-out'
          >
            Show Details
          </button>
        </>
      ),
      Width: '10px',
    },
    {
      name: 'Approve',
      selector: (row) => (
        <Link
          to={`#`}
          className='w-[70px] cursor-pointer py-2 px-2.5 bg-[transparent] rounded flex items-center justify-center border-[0.8px] border-solid border-black'
        >
          <MdHowToReg />
        </Link>
      ),
      maxWidth: '100px', // Adjust the width for the action column if needed
    },
    {
      name: 'Delete',
      selector: (row) => (
        <Link
          to={`#`}
          className='w-[70px] cursor-pointer py-2 px-2.5 bg-[transparent] rounded flex items-center justify-center border-[0.8px] border-solid border-black'
        >
          <FaUserTimes />
        </Link>
      ),
      maxWidth: '100px', // Adjust the width for the action column if needed
    },
  ]

  return (
    <div className='flex w-dvw h-dvh p-3'>
      <div>
        <AdminSlider />
      </div>
      <main className='w-full h-full mb-10 overflow-auto scrollbar-hide'>
        <AdminHeader />
        <p className='h-20 w-full sm:justify-start justify-center font-poppins text-3xl flex items-center text-center text-[#13504973] font-bold sm:pl-3'>
          Manage Requests
        </p>
        {/* <div className='flex flex-col lg:flex-row justify-between items-center'>
          <AdminSearchBox />
        </div> */}
        <div className='my-5 block mx-auto'>
          {/* {filteredUsers?.length === 0 && !loading && (
            <h2 className='mt-10 ml-5'>No user found</h2>
          )} */}

          {loading && (
            <div className='flex justify-center items-center h-64'>
              <Loader />
            </div>
          )}
        </div>

        {
          <AdminTable
            columns={columns}
            data={requestsData}
            responsive
            highlightOnHover
          />
        }
      </main>
    </div>
  )
}

export default ManageRequests
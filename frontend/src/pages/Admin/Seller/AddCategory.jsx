import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import DataTable from "react-data-table-component";
import {
  MdOutlineCategory,
  MdDelete,
  MdOutlinePersonAddAlt1,
} from "react-icons/md";
import { MdOutlinePerson2 } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { GiClothes } from "react-icons/gi";
import Loader from "../../../components/Loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { setCategory, deleteCategory as delCat } from "../../../slices/category";
import Hero from "../../../components/Hero";
import SideMenu from "../../../components/SideMenu";
import JumpButton from "../../../components/jump/JumpButton";


const AddCategory = () => {
  const params = useParams();
  const sellerId = params.sellerId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryItems } = useSelector((state) => state.category);
  const [fabricCategory, setFabricCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const deleteCategory = async (id) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "This action will delete the category from the database.",
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
          `${baseUrl}/seller/fabric/category/${id}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          dispatch(delCat(id))
          Swal.fire({
            title: "Category Deleted successfully",
            text: "Thank You",
            icon: "success",
          });
          setCategories(
            categories.filter((c) => {
              return c._id != id;
            })
          );
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      }

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1, // Generate ID based on index
      maxWidth: "5px",
    },
    {
      name: "Category Name",
      selector: (row) => row.FabricCategory,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            onClick={() => {
              deleteCategory(row._id);
            }}
            className="w-[70px] cursor-pointer py-2 px-2.5 bg-[transparent] rounded flex items-center justify-center border-[0.8px] border-solid border-black"
          >
            <MdDelete />
          </button>
        </>
      ),
      maxWidth: "130px",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}/seller/fabric/category/${sellerId}`,
        { fabricCategory },
        {
         withCredentials: true,
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Category Added successfully",
          text: "Thank You",
          icon: "success",
        });
        setCategories([...categories, response.data.category]);
        // lets add the newlly added category to the local storage
        dispatch(setCategory([...categories, response.data.category]))
        // Clear the input field
        setFabricCategory("");
        setErrors("")
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: 'error',
      });
    }
    setLoading(false)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //lets fetch categories first from the local storage
        //then if it is empty we fetch from the server
        if (!categoryItems || categoryItems.length === 0) {
          const response = await axios.get(
            `${baseUrl}/seller/fabric/category/${sellerId}`,
            {
              withCredentials: true,
            }
          );
          setCategories(response.data.Categories);
          // console.log('cats', response.data.Categories)
          // Save the category in the local storage
          dispatch(setCategory(response.data.Categories))
        } else {
          //data already in the local storage so lets fetch it
          setCategories(categoryItems)
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error.message);
        Swal.fire({
          title: 'Error',
          text: error?.response?.data?.error || error?.response?.data?.message,
          icon: 'error',
        });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="w-full h-4 bg-[#f9454f]"></div>
      <Navbar />
      <Hero page='"Add Category of your Stock"' subtitle='Please fill out the following information to add a new Category to database' />

      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12">
        <div className="col-span-1 md:col-span-4 lg:col-span-3 h-auto md:border-r md:border-solid md:border-black  lg:border-r lg:border-solid lg:border-black">
          <SideMenu sellerId={sellerId} />
        </div>
        <div className="col-span-1 md:col-span-8 lg:col-span-9  h-auto font-poppins">
          <div className="flex flex-row items-center gap-2 mt-8 justify-center mb-4">
            <MdOutlineCategory className="text-3xl" />
            <strong className="text-center text-3xl">Category</strong>
          </div>
          <form className="w-full max-w-lg mx-auto mt-6 mb-4 p-4 bg-white" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-2">
              <label
                htmlFor="name"
                className="font-bold text-lg text-gray-700 md:w-1/3"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Stock category like shirt, pants, t-shirts, jeans"
                name="fabricCategory"
                value={fabricCategory}
                required
                onChange={(e) => {
                  setFabricCategory(e.target.value.toLowerCase());
                }}
              />
            </div>

            {errors && (
              <p className="text-red-500 text-sm mb-4">{errors}</p>
            )}

            {loading?(
              <div className="flex justify-center">
                <Loader />
              </div>
            ):(
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 text-white bg-crimson rounded-md shadow-md hover:bg-red-700 transition"
              >
                Save Category
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full md:w-auto px-6 py-3 text-black bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
            ) }
          </form>

          <p className="ml-10 text-center text-xl font-bold mt-10 underline">
            Category List
          </p>
          <div className="flex justify-center">
            <div className=" w-full max-w-md m-auto">
              <DataTable
                columns={columns}
                data={categories}
                pagination
                responsive
                highlightOnHover
              />
            </div>

          </div>
        </div>
      </div>
      <JumpButton />
      <Footer />
    </>
  );
};

export default AddCategory;

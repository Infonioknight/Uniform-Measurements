import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import Rating from "../../../components/Rating";
import Profile from "../../../components/Profile";
import { baseUrl } from "../../../baseUrl/BaseUrl";
import JumpButton from "../../../components/jump/JumpButton";
import Swal from "sweetalert2";

// Example product data array
const productData = [
  {
    name: "Product Name 1",
    description:
      "This is a detailed description of product 1. It includes all the necessary information customers need.",
    price: 100.0,
  },
  {
    name: "Product Name 2",
    description:
      "This is a detailed description of product 2. It includes all the necessary information customers need.",
    price: 200.0,
  },
  {
    name: "Product Name 3",
    description:
      "This is a detailed description of product 3. It includes all the necessary information customers need.",
    price: 300.0,
  },
  {
    name: "Product Name 4",
    description:
      "This is a detailed description of product 4. It includes all the necessary information customers need.",
    price: 400.0,
  },
  {
    name: "Product Name 5",
    description:
      "This is a detailed description of product 5. It includes all the necessary information customers need.",
    price: 500.0,
  },
  {
    name: "Product Name 6",
    description:
      "This is a detailed description of product 6. It includes all the necessary information customers need.",
    price: 600.0,
  },
  {
    name: "Product Name 7",
    description:
      "This is a detailed description of product 7. It includes all the necessary information customers need.",
    price: 700.0,
  },
  {
    name: "Product Name 8",
    description:
      "This is a detailed description of product 8. It includes all the necessary information customers need.",
    price: 800.0,
  },
  {
    name: "Product Name 9",
    description:
      "This is a detailed description of product 9. It includes all the necessary information customers need.",
    price: 900.0,
  },
];

// Define the number of rows to display per page
// const PAGE_SIZE = 7;

const SellerProfile = () => {
  const { sellerId: sellerId } = useParams();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/users/${sellerId}`, {
          withCredentials: true,
        });
        setUserData(response.data.User);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.error || error?.response?.data?.message,
          icon: "error",
        });
      }
    };

    fetchSellerData();
  }, [sellerId]);

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
       
      <div className="bg-[#f8444f]  h-64 w-full">
      <Navbar />
      <div className="font-sans 2xl:max-w-7xl m-auto ">
        <div className="  flex flex-col">
        
         
          <div className="flex-grow flex justify-center items-end ">
            <div className="mt-28 pb-6 self-center text-5xl font-bold leading-10 text-center text-white max-md:max-w-full ">
              Seller Profile
            </div>
          </div>
        </div>
         
        <div className="lg:flex justify-center ">
          <div className=" lg:w-1/2  max-sm:w-11/12 mx-auto justify-center">
           <div className="w-9/12 mx-auto max-lg:mt-6">
           <Profile userData={userData} />
           </div>
          </div>
          <div className="flex lg:w-1/2 lg:h-[600px] h-[170px]">
            <div className=" bg-white"></div>
            <div className=" lg:mt-28 max-md:mt-4 max-lg: mt-6 max-lg:pl-12">
              <p className="font-bold sm:text-5xl">
                Brief Introduction to Our Brand
              </p>
              <div className="mt-4 ">
                <p className="sm:leading-7 leading-6 text-base px-5 ">
                  {userData.profile}
                </p>
              </div>
              <Rating
                className={
                  "max-lg:hidden text-10xl font-semibold font-sans pt-24"
                }
                stars={userData.rating || 4}
              />
            </div>
          </div>
        </div>
        {/* Our Products */}
        <div>
          <p className=" font-bold sm:text-5xl py-2 ml-9 lg:ml-28 lg:pt-9">
            Our Products
          </p>
          <div className=" my-10 mx-9 lg:mx-24 xl:mx-36 rounded-md shadow border overflow-auto border-black md:border-solid ">
            <table className="w-full border-spacing-0 divide-y divide-gray-100 hidden md:block">
              <thead>
                <tr className="text-nowrap bg-[#f8444f] border rounded-sm border-solid border-black">
                  <th className="p-4 text-sm font-bold text-left tracking-wide">
                    Products Name
                  </th>
                  <th className="p-4 text-sm font-bold text-left tracking-wide">
                    Description
                  </th>
                  <th className="p-4 text-sm font-bold text-left tracking-wide">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="border-solid border-2 border-blue-700 rounded-lg">
                {productData.map((product, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "" : "bg-rose-50"}
                  >
                    <td className="p-3 text-sm font-normal w-1/4 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="p-3 text-sm font-normal w-1/2 whitespace-nowrap">
                      {product.description}
                    </td>
                    <td className="p-3 text-sm font-normal w-1/4 whitespace-nowrap">
                      {product.price.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="grid grid-col-1 gap-2 md:hidden">
              <div className="grid grid-col-1 gap-4 md:hidden">
                {productData.map((product, index) => (
                  <div
                    key={index}
                    className="bg-rose-50 space-y-3 p-4 rounded-xl shadow"
                  >
                    <div className="text-sm font-sans">{product.name}</div>
                    <div className="text-sm text-gray-700">
                      {product.description}
                    </div>
                    <div className="text-sm font-medium text-black">
                      {product.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Our Policies */}
        <div className="my-16 ">
          <p className="font-bold text-10xl py-2 ml-24">Our Policies</p>
          <div className="mx-12  my-8 h-4/5">
            <div className=" justify-between grid grid-cols-1  lg:grid-cols-3 h-full">
              <div className="text-start m-4 p-5 w border-solid border rounded-lg border-rose-300 hover:shadow hover:shadow-rose-400">
                <p className="font-semibold font-sans text-5xl p-2">
                  Shipping Policy
                </p>
                <p className="leading-7 p-2">
                  Lorem ipsum dolor sit amet consectetur. Id auctor pellentesque
                  congue amet gravida sapien tempor integer. Accumsan tristique
                  vitae neque massa sed faucibus arcu. Hendrerit faucibus.{" "}
                </p>
              </div>
              <div className="text-start m-4 p-5  border-solid border rounded-lg border-rose-300 hover:shadow hover:shadow-rose-400">
                <p className="font-semibold font-sans text-5xl p-2">
                  Return Policy
                </p>
                <p className="leading-7 p-2">
                  Lorem ipsum dolor sit amet consectetur. Id auctor pellentesque
                  congue amet gravida sapien tempor integer. Accumsan tristique
                  vitae neque massa sed faucibus arcu. Hendrerit faucibus.{" "}
                </p>
              </div>
              <div className="text-start m-4 p-5  border-solid border rounded-lg border-rose-300 hover:shadow hover:shadow-rose-400">
                <p className="font-semibold font-sans text-5xl p-2">
                  Warranty Information
                </p>
                <p className="leading-7 p-2">
                  Lorem ipsum dolor sit amet consectetur. Id auctor pellentesque
                  congue amet gravida sapien tempor integer. Accumsan tristique
                  vitae neque massa sed faucibus arcu. Hendrerit faucibus.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center m-auto">
            <div className="w-44 h-14 bg-[#f8444f] text-center m-auto mt-14 flex items-center justify-center">
              {/* ADD_URL_CONTAC_SELLER */}
              <Link to="/" className="no-underline">
                <p className="font-bold text-white">Contact Seller</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-rose-400"></div>
        <JumpButton />
        <Footer />
      </div>
      </div>
    </div>
  );
};

export default SellerProfile;
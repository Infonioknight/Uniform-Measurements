/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Rating from './Rating';
import { FaLocationDot } from "react-icons/fa6";
import axios from 'axios';
import { baseUrl } from '../../baseUrl/BaseUrl';
import CustomerImage from './CustomerImage';
import dummyShipImage from '../../assets/shop_img.jpg';
import { Link, useNavigate,useParams } from 'react-router-dom';


const SellerDisplay = ({ seller }) => {
    const [customerLength, setCustomerLength] = useState(0);
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();
    const { userId } = useParams();
    const sellerId = seller && seller?._id

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/seller/${seller?._id}`,
                    {
                        withCredentials: true
                    }
                );
                setCustomerLength(response?.data?.length);
                setCustomers(response?.data?.customers);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, [seller._id]);

    return (
        <>
            <div className="font-poppins flex flex-col md:flex-row w-10/12 my-7 mx-auto mt-12 border-neutral-400 min-h-40 border-2 border-solid rounded-lg overflow-hidden hover:shadow-md hover:shadow-slate-300">
                {/* Image Section */}
                <div className="w-full sm:w-9/12 md:w-4/12 h-40 md:h-auto flex-shrink-0 relative">
                    <img
                        className="w-full h-full object-cover absolute"
                        src={seller?.profile_image?.url || dummyShipImage}
                        alt="seller_image"
                    />
                </div>
                {/* Info Section */}
                <div className='w-full md:w-9/12 p-4'>
                    <div className='flex flex-col lg:flex-row justify-between'>
                        <div className='w-full lg:w-8/12'>
                            <p className='mb-2 text-lg font-semibold'>{seller.name}</p>
                            <Rating value={seller.rating} />
                            <p className='mb-2 flex items-center'><FaLocationDot className='text-red-500 mr-1' /> {seller.address || 'Bengaluru, India'}</p>
                            <div className="flex flex-wrap items-center mt-2">
                                {/* Only display up to 5 customer images */}
                                {customers?.slice(0, 5).map((customer) => (
                                    <CustomerImage key={customer._id} image={customer?.profile_image?.url} />
                                ))}
                                <p className='ml-2 text-sm'>{customerLength} Customers Visited</p>
                            </div>
                        </div>
                        <div className='flex flex-col lg:mt-3 space-y-2 w-full lg:w-5/12 mt-3 md:mt-0'>
                            <Link to={`/users/${userId}/seller/products/${sellerId}`} className="py-3 px-2 no-underline text-center lg:w-8/12 w-full lg:mx-auto  text-white cursor-pointer bg-crimson rounded-md shadow-md hover:bg-red-700">
                                Enter Shop
                            </Link>

                            <button className="py-3 lg:w-8/12 w-full lg:mx-auto text-crimson cursor-pointer border-crimson border-2 bg-transparent rounded-md shadow-md hover:bg-crimson hover:text-white">
                                Contact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SellerDisplay;

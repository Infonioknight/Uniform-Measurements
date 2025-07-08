import React, { useEffect } from 'react'
// import axios from "axios";
import Sliderbar from '../../components/customer/Slidebar';
import CustomerHeader from '../../components/customer/CustomerHeader';
import CustomerSearch from '../../components/customer/CustomerSearch';



function TailorRecommendation() {
    // const [tailors, setTailors] = useState([]);

    //   useEffect(() => {
    //     // Fetch tailor data from backend
    //     axios.get("/api/tailors") // Replace with your actual backend API
    //       .then((response) => {
    //         setTailors(response.data); // Assuming response.data contains the array of tailor objects
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching tailors:", error);
    //       });

    return (
        <>
            <div className='flex w-dvw h-dvh p-3'>
                {/*left slidebar */}
                <div>
                    <Sliderbar />
                </div>

                {/* main content */}
                <main className="w-full h-full overflow-auto scrollbar-hide">
                    <section>
                        <CustomerHeader />
                    </section>

                    <section className='flex flex-col lg:flex-row justify-between items-center'>
                        <p className="text-nowrap font-poppins text-[30px] flex items-center text-[#13504973] font-bold lg:pl-5 my-3 text-center pt-7">
                            Suggested Tailors
                        </p>
                        <CustomerSearch />
                    </section>

                    <section>
                        <div className="container flex flex-col max-w-full w-auto rounded-2xl max-md:ml-0 max-md:w-full">
                            <table className="container max-w-full  table-auto w-full border-collapse border border-gray-400 text-center">
                                <thead className="bg-[#f8434f] text-white container min-w-full">
                                    <tr className="container max-w-full justify-between flex items-center">
                                        <th className="border border-gray-400 px-4 py-2">S/No</th>
                                        <th className="border border-gray-400 px-4 py-2">Tailor name</th>
                                        <th className="border border-gray-400 px-4 py-2">Ratings</th>
                                        <th className="border border-gray-400 px-4 py-2">Address of tailor</th>
                                        <th className="border border-gray-400 px-4 py-2">Pincode</th>
                                        <th className="border border-gray-400 px-4 py-2">Phone Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Mapped Data from backend */}
                                    {/* {tailors && tailors.map((tailor, index) => (
                                        <tr key={tailor.id} className="odd:bg-gray-100 even:bg-white">
                                            <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                            <td className="border border-gray-400 px-4 py-2">{tailor.name}</td>
                                            <td className="border border-gray-400 px-4 py-2">{tailor.rating}/5</td>
                                            <td className="border border-gray-400 px-4 py-2">{tailor.address}</td>
                                            <td className="border border-gray-400 px-4 py-2">{tailor.pincode}</td>
                                            <td className="border border-gray-400 px-4 py-2">{tailor.phoneNumber}</td>
                                        </tr>
                                    ))} */}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main >
            </div>
        </>
    )
}

export default TailorRecommendation
import React, { useState } from 'react'
import CustomerHeader from '../../components/customer/CustomerHeader';
import Sliderbar from '../../components/customer/Slidebar';
import { FaSearch } from "react-icons/fa";
import tailorImage from '../assets/tailor.png';


function SavedTailors() {
    return (
        <>
            <div className='flex w-dvw h-dvh p-3'>
                {/*left slidebar */}
                <div>
                    <Sliderbar />
                </div>

                {/* main content */}
                <main className="w-full h-full overflow-auto scrollbar-hide">
                    <CustomerHeader />
                    <section className='w-full flex flex-col md:flex md:flex-row md:justify-between md:items-center mt-2'>
                        <div className=''>
                            <h1 className='text-gray-600'>Saved Tailer</h1>
                        </div>
                        <div className=' flex outline outline-1 justify-evenly md:flex  md:outline md:outline-1 md:justify-evenly rounded-sm items-center px-2 m-1'>
                            <FaSearch className='text-gray-700 md:w-4 md:h-4' />
                            <input className='outline-none md:p-2 md:outline-none' type='text' placeholder='Search Saved Tailer' />
                            <button className=' p-1 md:p-2 m-1 bg-[#F8444F] text-white rounded-sm'>Search</button>
                        </div>
                    </section>
                    <section className=' md:flex md:justify-center m-2'>
                        <img src={tailorImage} alt='tailor image' className='h-52 w-52 md:h-96 md:w-96' />
                    </section>
                    <section>
                        <h2 className='flex justify-center mb-6'>You  Haven't Save any Tailor</h2>
                    </section>
                </main >
            </div>
        </>
    )
}

export default SavedTailors
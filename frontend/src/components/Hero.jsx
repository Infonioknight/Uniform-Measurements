import React from 'react'
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";


const Hero = ({page, subtitle}) => {
    const navigate = useNavigate();

  return (
    <section className=' bg-crimson w-full h-auto lg:h-[250px] md:h-[270px] font-poppins'>
        <div className="flex gap-4 text-white mb-14">
          <button onClick={()=>{navigate(-1)}} className="cursor-pointer [border:none]  bg-[transparent] mt-12 ml-6">
            <GoArrowLeft className="w-5 h-5 text-white font-bold" />
          </button>
          <p className="mt-12 font-bold text-sm lg:text-base md:text-base">
            Store Management Dashboard!
          </p>
        </div>
        <div className="text-white text-center text-sm md:text-lg lg:text-xl mb-1">
        <p>Welcome to the <strong>{page} </strong>page.</p>
        <p className='p-2'>{subtitle}</p>
      </div>
    </section>
  )
}

export default Hero
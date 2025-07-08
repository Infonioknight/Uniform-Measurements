import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import JumpButton from '../../components/jump/JumpButton';

export default function About() {
  return (
    <div>
        <div className="relative bg-[#f8444f] flex flex-col">
        <br/>
        <Navbar />
        <div className="flex-grow flex justify-center items-end pb-10">
        <div className="self-center mt-20 text-5xl font-bold leading-10 text-center text-white max-md:mt-14 max-md:max-w-full">
        Our Tech Odyssey
           </div>
        </div>
      </div>
        {/* <Navbar/> */}
      <div className="flex flex-col items-center pb-8 bg-white">
        
      <div className="flex flex-col self-stretch w-full bg-red-500 max-md:px-5 max-md:max-w-full">
     
        <div className="self-center mt-24 mb-2.5 text-8xl font-bold text-center leading-[110.88px] text-neutral-300 text-opacity-20 max-md:mt-10 max-md:max-w-full max-md:text-4xl">
         
        </div>
      </div>
      <div className="sm:max-w-full md:max-w-2xl lg:max-w-4xl xl:max-w-6xl flex z-10 flex-col  mt-0 w-full bg-white shadow-lg  max-md:px-5">
        <div className="text-3xl font-bold leading-9 text-center text-zinc-950 max-md:max-w-full">
          Who We Are?
        </div>
        <div className=" p-3 mt-10 text-xl leading-10 text-neutral-700 max-md:mt-10 ">
          At Zimutail, we are dedicated to revolutionizing the Indian fashion
          retail industry with our innovative solutions. Our mission is to
          enhance the shopping experience by providing precise fit
          recommendations, predicting fashion trends, and offering personalized
          shopping journeys, thereby minimizing waste and ensuring customer
          satisfaction.
        </div>
      </div>
      <div className="justify-center px-5 mt-20 w-full max-w-[1139px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center px-10 pt-6 pb-20 w-full bg-white rounded-2xl border border-solid border-red-500 border-opacity-10 max-md:px-5 max-md:mt-9">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/207f4850facf25edae1bd77082989c9ccd029f568d6af5225e46a80d4b050ae6?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
                className="max-w-full aspect-square w-[100px]"
              />
              <div className="mt-8 text-2xl font-bold leading-8 text-zinc-950">
                Mission
              </div>
              <div className="self-stretch mt-4 text-xl leading-10 text-center text-neutral-700">
                Transforming retail with seamless, personalized shopping
                experiences for every customer.
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center px-6 pt-6 pb-16 w-full bg-white rounded-2xl border border-solid border-red-500 border-opacity-10 max-md:px-5 max-md:mt-9">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5841e9fdd5b9852fda4990617f2294e23a071b2bf59b0938338dbc2920cb7e2?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
                className="max-w-full aspect-square w-[100px]"
              />
              <div className="mt-11 text-2xl font-bold leading-8 text-zinc-950 max-md:mt-10">
                Vision
              </div>
              <div className="self-stretch mt-4 text-xl leading-8 text-center text-neutral-700">
                Addressing the challenges of size and fit in fashion retail,
                reducing return rates, and enhancing customer satisfaction
                through innovative, data-driven solutions.
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-center px-6 pt-6 pb-14 w-full bg-white rounded-2xl border border-solid border-red-500 border-opacity-10 max-md:px-5 max-md:mt-9">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e53034fdd7eba58b61fe588ab86784776a8b28c95f215e278f8042cba910c76e?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
                className="max-w-full aspect-square w-[100px]"
              />
              <div className="mt-8 text-2xl font-bold leading-8 text-zinc-950">
                Values
              </div>
              <div className="self-stretch mt-4 text-xl leading-8 text-center text-neutral-700">
                Lorem ipsum dolor sit amet consectetur. Sed rutrum lacus turpis
                placerat. Arcu est arcu cursus vitae. Sociis morbi massa enim
                ultrices nulla tempor scelerisque arcu arcu. Tellus pretium
                netus eu sed.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl px-12 py-16 mt-14  bg-white rounded-xl border border-solid border-red-500 border-opacity-10  max-md:px-5 max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[29%] max-md:ml-0 max-md:w-full">
            <div className="self-stretch my-auto text-3xl font-bold leading-10 text-center text-zinc-950 max-md:mt-10">
              We’re Different than the Rest
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[71%] max-md:ml-0 max-md:w-full">
            <div className="text-xl leading-10 text-neutral-700 max-md:mt-10 max-md:max-w-full">
              Lorem ipsum dolor sit amet consectetur. Sapien feugiat et netus id
              eu augue augue eu. Elementum lacus accumsan tellus sapien amet
              pretium tincidunt. Iaculis sapien scelerisque blandit mattis.
              Felis maecenas neque mattis bibendum consectetur donec. Dui
              feugiat aliquam amet donec pulvinar fames purus. Lectus nunc id
              consequat massa aliquet quis non.
            </div>
          </div>
        </div>
      </div>
      <div className="text-3xl font-bold leading-9 text-center text-zinc-950 max-md:max-w-full mt-20 max-md:mt-10">
        Our Journey
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-16 justify-between px-5 mt-14 w-full text-2xl font-bold leading-8 text-center text-white whitespace-nowrap max-w-[1019px]  max-md:mt-10 max-md:max-w-full">
        <div className="justify-center items-center px-16 py-7 rounded-2xl bg-[linear-gradient(90deg,#F8444F_0%,#FFB6C1_100%)] max-md:px-5">
          Year
        </div>
        <div className="justify-center items-center px-16 py-7 rounded-2xl bg-[linear-gradient(90deg,#F8444F_0%,#FFB6C1_100%)] max-md:px-5">
          Year
        </div>
        <div className="justify-center items-center px-16 py-7 rounded-2xl bg-[linear-gradient(90deg,#F8444F_0%,#FFB6C1_100%)] max-md:px-5">
          Year
        </div>
        <div className="justify-center items-center px-16 py-7 bg-red-500 bg-[linear-gradient(90deg,#F8444F_0%,#FFB6C1_100%)] rounded-2xl max-md:px-5">
          Today
        </div>
      </div>
      <div className="max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl justify-center px-14 py-10 mt-20 w-full text-xl font-medium leading-10 bg-white rounded-xl border border-solid border-red-500 border-opacity-10 text-neutral-700 max-md:px-5 max-md:mt-10 ">
        Lorem ipsum dolor sit amet consectetur. Sapien feugiat et netus id eu
        augue augue eu. Elementum lacus accumsan tellus sapien amet pretium
        tincidunt. Iaculis sapien scelerisque blandit mattis. Felis maecenas
        neque mattis bibendum consectetur donec. Dui feugiat aliquam amet donec
        pulvinar fames purus. Lectus nunc id consequat massa aliquet quis non.
      </div>
      <div className="text-3xl font-bold leading-9 text-center text-zinc-950 max-md:max-w-full mt-20 max-md:mt-10">
        Meet Our Team
      </div>
      <div className="mt-11 w-full max-w-[1019px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-5 text-red-500 leading-[126%] max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4209bb3475e43cf04b040fcdb6ddd7face3306f6da96b6f660a714e3d2f1eed3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4209bb3475e43cf04b040fcdb6ddd7face3306f6da96b6f660a714e3d2f1eed3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4209bb3475e43cf04b040fcdb6ddd7face3306f6da96b6f660a714e3d2f1eed3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4209bb3475e43cf04b040fcdb6ddd7face3306f6da96b6f660a714e3d2f1eed3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4209bb3475e43cf04b040fcdb6ddd7face3306f6da96b6f660a714e3d2f1eed3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4209bb3475e43cf04b040fcdb6ddd7face3306f6da96b6f660a714e3d2f1eed3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4209bb3475e43cf04b040fcdb6ddd7face3306f6da96b6f660a714e3d2f1eed3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4209bb3475e43cf04b040fcdb6ddd7face3306f6da96b6f660a714e3d2f1eed3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
                className="self-end max-w-full aspect-square w-[250px]"
              />
              <div className="text-2xl font-semibold max-md:max-w-full">
                Rahul Nathan
              </div>
              <div className="mt-2 text-2xl max-md:max-w-full">Founder</div>
              <div className="mt-2 text-xl leading-8 text-neutral-700 max-md:max-w-full">
                With 24+ years of industry experience in hospitality, IT,
                entrepreneurship, and entertainment, Rahul has led several
                innovative ventures and received numerous accolades.
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 mt-1.5 text-red-500 leading-[126%] max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/24e1c57b175d2ecd76367709248de80dc17fed0c073084632475fb2be80386e3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/24e1c57b175d2ecd76367709248de80dc17fed0c073084632475fb2be80386e3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/24e1c57b175d2ecd76367709248de80dc17fed0c073084632475fb2be80386e3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/24e1c57b175d2ecd76367709248de80dc17fed0c073084632475fb2be80386e3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/24e1c57b175d2ecd76367709248de80dc17fed0c073084632475fb2be80386e3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/24e1c57b175d2ecd76367709248de80dc17fed0c073084632475fb2be80386e3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/24e1c57b175d2ecd76367709248de80dc17fed0c073084632475fb2be80386e3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/24e1c57b175d2ecd76367709248de80dc17fed0c073084632475fb2be80386e3?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
                className="self-end max-w-full aspect-square w-[250px]"
              />
              <div className="text-2xl font-semibold max-md:max-w-full">
                Arun Nathan
              </div>
              <div className="mt-2 text-2xl max-md:max-w-full">Founder</div>
              <div className="mt-2 text-xl leading-8 text-neutral-700 max-md:max-w-full">
                <span className="">
                  Bringing 40+ years of experience in industrial manufacturing,
                  fashion sales, and entrepreneurship, Arun has held leadership
                  roles in multiple MNCs.
                </span>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-9 w-full max-w-[1019px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-5 text-red-500 leading-[126%] max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f048327c45a837ff169ae8f9fe8b9fd9221025949142d515e30698349fb9937a?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f048327c45a837ff169ae8f9fe8b9fd9221025949142d515e30698349fb9937a?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f048327c45a837ff169ae8f9fe8b9fd9221025949142d515e30698349fb9937a?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f048327c45a837ff169ae8f9fe8b9fd9221025949142d515e30698349fb9937a?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f048327c45a837ff169ae8f9fe8b9fd9221025949142d515e30698349fb9937a?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f048327c45a837ff169ae8f9fe8b9fd9221025949142d515e30698349fb9937a?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f048327c45a837ff169ae8f9fe8b9fd9221025949142d515e30698349fb9937a?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f048327c45a837ff169ae8f9fe8b9fd9221025949142d515e30698349fb9937a?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
                className="self-end max-w-full aspect-square w-[250px]"
              />
              <div className="text-2xl font-semibold max-md:max-w-full">
                Dr. Chiranjiv Roy
              </div>
              <div className="mt-2 text-2xl max-md:max-w-full">Advisor</div>
              <div className="mt-2 text-xl leading-8 text-neutral-700 max-md:max-w-full">
                With 20+ years of experience in data-driven digital product
                development, Dr. Roy has worked with Fortune 100 companies and
                holds a PhD in Applied Data Analytics.
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 text-red-500 leading-[126%] max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/2988408fc123dd3ce605cb3251f370256341c9f634de70d184afb1c09583da54?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2988408fc123dd3ce605cb3251f370256341c9f634de70d184afb1c09583da54?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2988408fc123dd3ce605cb3251f370256341c9f634de70d184afb1c09583da54?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2988408fc123dd3ce605cb3251f370256341c9f634de70d184afb1c09583da54?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2988408fc123dd3ce605cb3251f370256341c9f634de70d184afb1c09583da54?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2988408fc123dd3ce605cb3251f370256341c9f634de70d184afb1c09583da54?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2988408fc123dd3ce605cb3251f370256341c9f634de70d184afb1c09583da54?apiKey=2a2e623823b0415fbd05deed2eac8bf5&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2988408fc123dd3ce605cb3251f370256341c9f634de70d184afb1c09583da54?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
                className="self-end max-w-full aspect-square w-[250px]"
              />
              <div className="text-2xl font-semibold max-md:max-w-full">
                Vishal Nagpal{" "}
              </div>
              <div className="mt-2 text-2xl max-md:max-w-full">Advisor</div>
              <div className="mt-2 text-xl leading-8 text-neutral-700 max-md:max-w-full">
                An expert in data science-based solutions with 13+ years of
                leadership experience, Vishal has worked with top companies in
                various sectors and holds an MBA from NITIE Mumbai.
              </div>
            </div>
          </div>
        </div>
      </div>
   
    </div>
    <JumpButton />
    <Footer/>
    </div>
  )
}

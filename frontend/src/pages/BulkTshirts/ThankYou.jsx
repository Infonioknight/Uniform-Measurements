// import React from 'react'
// import Navbar from '../../components/Navbar'
// import Footer from '../../components/Footer'

// export default function ThankYou() {
//   return (
//     <>
//       <div className="relative bg-red min-h-[385px]">
//         <br/>
//         <Navbar/>
//         <div className="absolute  relative bottom-10 inset-0 flex justify-center items-center">
//           <div className="relative flex z-10 flex-col justify-center items-center p-20 mt-0 max-w-full text-lg leading-6 text-black rounded-md shadow-2xl backdrop-blur bg-white bg-opacity-70 w-[649px] max-md:px-5">
//             <div className="mt-2 text-4xl font-bold text-center text-red">
//               Thank You!
//             </div>
//             <div className="mt-8">Your form has been submitted successfully.</div>
//             <div className="mt-8 mb-1.5">We truly appreciate your input!</div>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col items-center bg-white pt-[200px]">
//         <div className="mt-11 text-lg font-bold leading-6 text-black max-md:mt-10">
//           Get Social With Us
//         </div>
//         <div className="flex gap-5 justify-center px-5 mt-8">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b2ee8a8e15ccda67dde493a87650b66f427de1eb79fac50a78c761325c6b19a?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
//             className="shrink-0 aspect-square w-[30px]"
//           />
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/935670a49bc16be845adef1ff3342579fdacfb6cf0d80956dfe7cad22059bcdb?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
//             className="shrink-0 aspect-square w-[30px]"
//           />
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d0ecce0895852937c58afe0c5e0a489871147c17d65dd66e119fea4dd261778?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
//             className="shrink-0 aspect-square w-[30px]"
//           />
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/e81fa6cff8e0c5dfb26438e32b859095a751993ca2472632ed3b58f47690ff35?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
//             className="shrink-0 aspect-square w-[30px]"
//           />
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a0fb04e7c8deb0534c96182bf92bd1764cb11946a7793c578c0dea659f598fb?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
//             className="shrink-0 aspect-square w-[30px]"
//           />
//         </div>
//         <div className="mt-8 text-lg leading-6 text-black max-md:max-w-full">
//           We appreciate your interest and look forward to assisting you further.{" "}
//         </div>
//         <div className="flex gap-5 justify-center mt-8 text-base text-black whitespace-nowrap">
//           <div className="flex gap-3.5 justify-center self-start pr-5 leading-[175%]">
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/ded985a5b86b0766522e66a975603499d8eb6048560901cca7f894dd71192ba8?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
//               className="shrink-0 my-auto w-5 aspect-square"
//             />
//             <div>555-555-1234</div>
//           </div>
//           <div className="flex gap-3.5 pr-5 leading-7">
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/958edc1d90f1fd0729f6a4c249548772893e20c1da2e1c7ecc2fdf37a048c9ce?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
//               className="shrink-0 my-auto w-5 aspect-square"
//             />
//             <div>Contact@simu.com</div>
//           </div>
//         </div>
//       </div>
//       <Footer/>
//     </>
//   )
// }
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import JumpButton from "../../components/jump/JumpButton";


export default function ThankYou() {
  return (
    <>
      <div className="relative bg-red  flex flex-col">
        <br/>
        <Navbar />
        <div className="flex-grow flex justify-center items-end pb-2">
          <div className="relative flex flex-col justify-center items-center p-20 max-w-full text-lg leading-6 text-black rounded-md shadow-2xl backdrop-blur bg-white bg-opacity-80 w-[649px] max-md:px-5 transform translate-y-1/2">
            <div className="text-5xl font-bold  text-center text-red leading-6">
              Thank You!
            </div>
            <div className="mt-5 font-bold">Your form has been submitted successfully.</div>
            <div className="mt-5 mb-1.5 font-bold">We truly appreciate your input!</div>
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col items-center pt-52">
        <div className="mt-11 text-lg font-bold leading-6 text-black max-md:mt-10">
          Get Social With Us
        </div>
        <div className="flex gap-5 justify-center px-5 mt-8">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b2ee8a8e15ccda67dde493a87650b66f427de1eb79fac50a78c761325c6b19a?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
            className="shrink-0 aspect-square w-[30px]"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/935670a49bc16be845adef1ff3342579fdacfb6cf0d80956dfe7cad22059bcdb?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
            className="shrink-0 aspect-square w-[30px]"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d0ecce0895852937c58afe0c5e0a489871147c17d65dd66e119fea4dd261778?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
            className="shrink-0 aspect-square w-[30px]"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e81fa6cff8e0c5dfb26438e32b859095a751993ca2472632ed3b58f47690ff35?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
            className="shrink-0 aspect-square w-[30px]"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a0fb04e7c8deb0534c96182bf92bd1764cb11946a7793c578c0dea659f598fb?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
            className="shrink-0 aspect-square w-[30px]"
          />
        </div>
        <div className="mt-8 text-lg leading-6 text-black max-md:max-w-full">
          We appreciate your interest and look forward to assisting you further.{" "}
        </div>
        <div className="flex gap-5 justify-center mt-8 text-base text-black whitespace-nowrap">
          <div className="flex gap-3.5 justify-center self-start pr-5 leading-[175%]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ded985a5b86b0766522e66a975603499d8eb6048560901cca7f894dd71192ba8?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
              className="shrink-0 my-auto w-5 aspect-square"
            />
            <div>555-555-1234</div>
          </div>
          <div className="flex gap-3.5 pr-5 leading-7">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/958edc1d90f1fd0729f6a4c249548772893e20c1da2e1c7ecc2fdf37a048c9ce?apiKey=2a2e623823b0415fbd05deed2eac8bf5&"
              className="shrink-0 my-auto w-5 aspect-square"
            />
            <div>Contact@simu.com</div>
          </div>
        </div>
      </div>
      <JumpButton />
      <Footer />
    </>
  );
}

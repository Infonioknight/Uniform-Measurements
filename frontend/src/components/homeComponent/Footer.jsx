import React from 'react'
import { SlLocationPin } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { FiLinkedin } from "react-icons/fi";
import { CiYoutube } from "react-icons/ci";
import { SlSocialFacebook } from "react-icons/sl";
import { BsTwitterX } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { FaArrowRight } from "react-icons/fa";
import sumoVerse from "../../pages/assets/sumoVerse.png"

const Footer = () => {
  return (
    <footer
      className={`self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-px box-border max-w-full text-left text-lg text-black font-text `}
    >
      <div className="flex-1 [background:linear-gradient(1.13deg,_#fa8e94,_#f9a4a9_35.35%,_#fdd3d5)] flex flex-col items-start justify-start pt-[25px] px-0 pb-0 box-border gap-[15.3px] max-w-full z-[2]">
        <div className="self-stretch h-[472px] relative [background:linear-gradient(1.13deg,_#fa8e94,_#f9a4a9_35.35%,_#fdd3d5)] hidden" />
        <div className="w-[1280px] mx-auto py-0 px-5 box-border max-w-full">
          <div className="w-[1100px] flex flex-row items-start justify-between max-w-full mq1050:flex-wrap">
            <div className="h-[48.7px] w-[236px] flex flex-col items-start justify-start py-0 pr-9 pl-0 box-border">
              <img
                className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover z-[1]"
                loading="lazy"
                alt=""
                src={sumoVerse}
              />
            </div>
            <div className="flex mr-3 flex-col items-start justify-center pt-3 px-0 pb-0 font-features-heading">
              <b className="relative leading-[23px] font-semibold inline-block min-w-[90px] z-[1]">
                Follow Us
              </b>
            </div>
            <div className="flex flex-col items-start justify-center pt-3 pb-0 pr-2.5 pl-0">
              <b className="relative leading-[23px] font-bold inline-block min-w-[100px] z-[1]">
                Quick links
              </b>
            </div>
            <div className="w-[179px] flex flex-col items-start justify-center pt-3 pb-0 pr-5 pl-0 box-border">
              <b className="relative leading-[23px] inline-block min-w-[111px] z-[1]">
                Get in touch
              </b>
            </div>
            <div className="flex flex-col items-start justify-center pt-3 px-0 pb-0">
              <b className="relative leading-[23px] font-bold inline-block min-w-[101px] z-[1]">
                Newsletter
              </b>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start py-0 pr-px pl-0 box-border gap-[12px] max-w-full z-[1]">
          <div className="self-stretch h-[383px] relative hidden" />
          <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[21px] box-border max-w-full">
            <div className="w-[1200px] flex flex-row items-start justify-between max-w-full mq1050:flex-wrap">
              <div className="flex flex-col items-start justify-start pt-[18px] px-0 pb-0">
                <div className="flex flex-row items-start justify-start gap-[14px]">
                  <SlLocationPin
                    className="h-5 w-5 relative object-contain z-[2]"
                  />
                  <div className="flex flex-col items-start justify-start gap-[5px]">
                    <div className="relative leading-[23px] z-[2]">
                      477 Tillman Circle
                    </div>
                    <div className="relative leading-[23px] inline-block min-w-[126px] z-[2]">
                      Rodrickchester
                    </div>
                    <div className="relative leading-[23px] inline-block min-w-[99px] z-[2]">
                      73597-1513
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start py-0 pr-[31px] pl-0">
                <div className="[backdrop-filter:blur(4px)] rounded-md flex flex-col items-start justify-start p-5 gap-[20px] z-[2]">
                  <SlSocialInstagram
                    className="w-[30px] h-[30px] relative overflow-hidden shrink-0"            
                  />
                  <FiLinkedin
                    className="w-[30px] h-[30px] relative overflow-hidden shrink-0"                    
                  />
                  <CiYoutube
                    className="w-[30px] h-[30px] relative overflow-hidden shrink-0"                    
                  />
                  <SlSocialFacebook
                    className="w-[30px] h-[30px] relative overflow-hidden shrink-0"                    
                  />
                  <BsTwitterX
                    className="w-[30px] h-[30px] relative overflow-hidden shrink-0"                
                  />
                </div>
              </div>
              <div className=" flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border max-w-full">
                <div className="self-stretch flex flex-row items-start justify-between gap-[20px] mq450:flex-wrap">
                  <div className="flex flex-col items-start justify-start gap-[20px] min-w-[112px] mq450:flex-1">
                    <div className="relative leading-[23px] inline-block min-w-[51px] z-[2]">
                      Home
                    </div>
                    <div className="relative leading-[23px] inline-block min-w-[78px] z-[2]">
                      About Us
                    </div>
                    <div className="relative leading-[23px] inline-block min-w-[73px] z-[2]">
                      Features
                    </div>
                    <div className="relative leading-[23px] inline-block min-w-[57px] z-[2]">
                      Pricing
                    </div>
                    <div className="relative leading-[23px] inline-block min-w-[112px] z-[2]">
                      How it Works
                    </div>
                    <div className="relative leading-[23px] inline-block min-w-[37px] z-[2]">
                      Blog
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex mt-[18px] flex-col items-start justify-start gap-[20px] text-base">
                    <div className="flex flex-row items-start justify-start gap-[18px]">
                      <BsTelephone
                        className="h-5 w-5 relative object-cover min-h-[20px] z-[2]"                        
                      />
                      <div className="relative leading-[126.07%] inline-block min-w-[124px] whitespace-nowrap z-[2]">
                        +91 0123456789
                      </div>
                    </div>
                    <div className="flex flex-row items-start justify-start gap-[18px]">
                      <TfiEmail
                        className="h-5 w-5 relative object-cover min-h-[20px] z-[2]"                        
                      />
                      <div className="relative leading-[126.07%] whitespace-nowrap z-[2]">
                        Email@gmail.com
                      </div>
                    </div>
              </div>
              <div className="w-[237px] flex flex-col items-start justify-start pt-[17px] px-0 pb-0 box-border">
                <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">
                  <div className="self-stretch relative leading-[126.07%] z-[2]">
                    Be the first to know about exciting new updates
                  </div>
                  <div className="self-stretch overflow-hidden flex flex-row items-start justify-start py-0 pr-[22px] pl-5 relative z-[2]">
                    <div className="h-full w-44 absolute !m-[0] top-[0px] bottom-[0px] left-[0px] rounded-tl-md rounded-tr-none rounded-br-none rounded-bl-md bg-white" />
                    <input
                      className="w-[calc(100%_-_54px)] [border:none] [outline:none] bg-[transparent] h-9 flex-1 flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border font-roboto font-extralight text-smi text-gray-100 min-w-[94px]"
                      placeholder="Enter your Email Address....."
                      type="text"
                    />
                    <div className="h-11 w-[39px] relative rounded-tl-none rounded-tr-md rounded-br-md rounded-bl-none bg-darkslategray" />
                    <FaArrowRight
                      className="h-3 w-3 absolute !m-[0] top-[calc(50%_-_6px)] right-[35px] overflow-hidden shrink-0 z-[1]"                      
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch box-border flex flex-col items-center justify-start pt-[29px] pb-[22px] pr-5 pl-[21px] gap-[13px] max-w-full z-[2] text-sm border-t-[0.5px] border-solid border-crimson">
            <div className="w-[1440px] h-[101.3px] relative box-border hidden max-w-full border-t-[0.5px] border-solid border-crimson" />
            <div className="flex flex-row items-start justify-start gap-[35px]">
              <div className="relative leading-[18px] inline-block min-w-[108px] z-[3]">
                Terms of Service
              </div>
              <div className="relative leading-[18px] inline-block min-w-[88px] z-[3]">
                Privacy Policy
              </div>
            </div>
            <div className="flex flex-row items-start justify-start py-0 px-[11px]">
              <div className="relative leading-[18px] z-[3]">
                © 2024 Simu. All rights reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
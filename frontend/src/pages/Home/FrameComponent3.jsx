import React from "react";
import Features from "../../components/future/Features";
export function FrameComponent3({
  featuresData
}) {
  return <div className="p-2 w-full mx-auto flex flex-col items-start justify-start py-0 pr-0 md:px-1 md:pl- box-border gap-y-8 max-w-full mq750:gap-[39px] mq450:gap-[19px]">
            {/* // className="p-2 w-full mx-auto flex flex-col items-start justify-start py-0 pr-0 md:px-1 md:pl- box-border gap-[78px] max-w-full mq750:gap-[39px] mq450:gap-[19px]"> */}
          <div className="px-24 flex flex-row items-start justify-start text-crimson font-extrabold text-[48px] py-0 max-sm:px-4 max-lg:px-8 max-md:px-8 ">
          {/* className="flex lg:ml-[100px] flex-row items-start justify-start text-crimson font-extrabold text-[48px] py-0 px-0.5"> */}
            Features
          </div>
          <div className="self-stretch container flex justify-between gap-4 flex-wrap mx-auto flex-row items-start md:gap-2 lg:gap-[20px] z-[3] text-center md:text-5xl text-white mq1050:flex-wrap">
        {/* //   className="self-stretch container flex flex-wrap mx-auto lg:mx-auto md:w-[800px] w-[350px] lg:w-[1207px] flex-row items-start  justify-center md:justify-between gap-[1px] lg:gap-[20px] z-[3] text-center md:text-5xl text-white mq1050:flex-wrap">  */}
            {featuresData.map(data => {
        return <Features para={data.para} heading={data.heading} image={data.image} />;
      })}
          </div>
        </div>;
}
  
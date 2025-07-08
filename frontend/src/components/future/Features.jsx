import React from 'react'


const Features = (props) => {
    const para = props.para;
    const heading = props.heading;
    const image = props.image;
  return (
    <div className=" w-[250px] lg:w-[302px] h-[497px] rounded-t-md rounded-b-none bg-lightcoral-200 overflow-hidden shrink-0 flex flex-row items-start justify-start py-9 lg:px-[23px] box-border mq750:pt-[23px] mq750:pb-[23px] mq750:box-border">
        <div className="flex-1 flex flex-col items-start justify-start gap-[32px] mq450:gap-[16px]">
        <div className="self-stretch flex flex-row items-start justify-start py-0 px-[78px] mq450:pl-5 mq450:pr-5 mq450:box-border">
            <div className="h-[100px] flex-1 relative">
            <div className="absolute top-[0px] left-[0px] rounded-102xl-5 bg-white w-full h-full" />
            <img
                className="absolute top-[15px] left-[15px] w-[70px] h-[70px] object-cover z-[1]"
                alt=""
                src={image}
            />
            </div>
        </div>
        <div className="self-stretch relative leading-[126.07%] font-semibold mq450:text-lgi mq450:leading-[24px]">
            {heading}
        </div>
        <div className="self-stretch flex flex-row items-start justify-start py-0 px-2.5 text-lg font-text">
            <div className="h-[231px] flex-1 relative tracking-[-0.03px] leading-[126.07%] inline-block">
            {para}
            </div>
        </div>
        </div>
    </div>    
  )
}

export default Features
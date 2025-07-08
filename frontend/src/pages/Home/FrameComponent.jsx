import React from "react";
export function FrameComponent({
  clock,
  returns,
  leaf
}) {
  return <section className={`self-stretch bg-snow flex flex-wrap flex-col items-end justify-start pt-[83px] px-[120px] pb-14 box-border gap-[73px] max-w-full z-[1] text-left text-5xl text-black font-features-heading mq750:gap-[36px] mq750:pt-[54px] mq750:px-[60px] mq750:pb-9 mq750:box-border mq450:gap-[18px] mq450:pl-5 mq450:pr-5 mq450:box-border `}>
          <div className="self-stretch flex flex-row items-start justify-start py-0 px-[5px] box-border max-w-full">
            <div className="w-[491px] flex flex-col items-start justify-start max-w-full">
              <div className="w-[355px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
                <b className="relative leading-[126.07%] font-semibold inline-block min-w-[127px] z-[2] mq450:text-lgi mq450:leading-[24px]">
                  Save Time
                </b>
              </div>
              <div className="self-stretch flex flex-row flex-wrap items-start justify-center gap-[30px] max-w-full mt-[-1.5px] text-sm font-text">
                <img className="h-14 w-[84px] relative object-contain z-[2]" loading="lazy" alt="clock" src={clock} />
                <div className="flex-1 flex flex-col items-start justify-start pt-[21.5px] px-0 pb-0 box-border min-w-[245px] max-w-full">
                  <div className="self-stretch relative leading-[151.1%] z-[2]">
                    Quickly find products that fit you perfectly without spending
                    hours trying on multiple sizes. Our tool narrows down your
                    choices to what will suit you best
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-center py-0 pr-0 pl-px box-border max-w-full">
          <div className="w-[491px] flex flex-col items-start justify-start max-w-full">
              <div className="w-[355px] flex flex-row items-start justify-center py-0 mx-8 box-border max-w-full">
                <b className="relative leading-[126.07%] font-semibold inline-block min-w-[127px] z-[2] mq450:text-lgi mq450:leading-[24px]">
                  Reduce Returns                
                </b>
              </div>
              <div className="self-stretch flex flex-row flex-wrap items-start justify-center gap-[30px] max-w-full mt-[-1.5px] text-sm font-text">
                <img className="h-14 w-[84px] relative object-contain z-[2]" loading="lazy" alt="returns" src={returns} />
                <div className="flex-1 flex flex-col items-start justify-start pt-[21.5px] px-0 pb-0 box-border min-w-[245px] max-w-full">
                  <div className="self-stretch relative leading-[151.1%] z-[2]">
                    By ensuring you get the right size the first time,
                    our tool helps reduce the number of returns, 
                    saving you and the retailer time and resources
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[491px] flex flex-col items-start justify-start max-w-full">
              <div className="w-[355px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
                <b className="relative leading-[126.07%] font-semibold inline-block min-w-[127px] z-[2] mq450:text-lgi mq450:leading-[24px]">
                  Sustainability
                </b>
              </div>
              <div className="self-stretch flex flex-row flex-wrap items-start justify-center gap-[15px] max-w-full mt-[-1.5px] text-sm font-text">
                <img className="h-14 w-[84px] relative object-contain z-[2]" loading="lazy" alt="leaf" src={leaf} />
                <div className="flex-1 flex flex-col items-start justify-start pt-[21.5px] px-0 pb-0 box-border min-w-[245px] max-w-full">
                  <div className="self-stretch relative leading-[151.1%] z-[2]">
                  Less returns mean less environmental impact. 
                  By minimizing the carbon footprint associated with shipping and repackaging, 
                  we contribute to a greener planet
                  </div>
                </div>
              </div>
          </div>
        </section>;
}
  
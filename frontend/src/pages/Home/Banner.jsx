import React from "react";
export function Banner({
  scale,
  bannerImage2,
  bannerImage1,
  bag,
  company
}) {
  return <><section className={`self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[18px] box-border max-w-full text-left text-5xs text-gray-400 font-inter `}>
            <div className="flex-1 flex flex-row items-start justify-start relative max-w-full">
              <div className=" w-full md:h-[278.6px] md:w-[535.2px] m-[0] absolute right-[0px] md:bottom-[160px] lg:bottom-[226.9px] flex flex-row items-start justify-start pt-[91.5px] px-[162px] pb-[91px] box-border">
                <img className="h-[70px] w-[100px] md:h-full md:w-[429px] lg:w-[629.5px] absolute m-[0] top-[120px] lg:top-[0px] right-[0px] md:right-[-94.3px] md:bottom-[0px] lg:bottom-[0px] max-h-full object-contain z-20" alt="scale" src={scale} />
                <div className="rounded-t-md rounded-br-none rounded-bl-md bg-gray-200 flex flex-row items-start justify-start md:pt-[5px] md:px-[15px] ml-14 mt-[85px] md:mt-0 md:ml-0 md:pb-1.5 px-[3px] py-[3px] z-30 md:z-30">
                  <div className="h-3.5 w-[67px] md:w-[110px] rounded-t-none rounded-br-none rounded-bl-md flex flex-row items-start justify-start py-0 md:px-[31px] box-border gap-[2px] md:gap-[10px] ">
                    <label htmlFor="brand" className="leading-[8px] z-30 md:text-sm text-[8px] min-w-[23px] shrink-0 [debug_commit:bf4bc93] ml-[0px] flex flex-col items-start justify-start md:pt-[3px] px-0 pb-0">                      
                        Brand                      
                    </label>
                    <input id="brand" placeholder="Name it.... " className=" placeholder:text-7xs placeholder:py[2px] md:text-sm text-[8px] h-[15px] w-[39px] rounded box-border flex flex-row items-start justify-start p-0.5 shrink-0 [debug_commit:bf4bc93] text-center z-30 text-slategray border-[0.5px] border-solid border-lightblue" />
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-crimson  flex flex-col md:flex-row items-start justify-start md:pt-24 lg:pt-44 md:pb-[30px] lg:pb-[167px] md:pr-[92px] md:pl-[14px] lg:pl-[120px] box-border relative md:gap-[146px] md:max-w-full text-51xl lg:flex-wrap mq750:gap-[73px] mq750:pl-[60px] mq750:pr-[46px] mq750:box-border mq450:gap-[36px] mq450:pt-[74px] mq450:px-5 mq450:pb-[71px] mq450:box-border mq1050:pt-[114px] mq1050:pb-[109px] mq1050:box-border">
                {
            /* text part */
          }
                <div className="flex-1 ml-4 self-stretch flex flex-col w-[50%] gap-[20px] md:gap-[39px]  items-start justify-start pt-[98px] px-0 pb-0 box-border md:min-w-[504px] md:max-w-full text-white font-features-heading ">
                    <p className=" w-[180px] lg:w-[678px] md:w-[478px]  md:leading-[126.07%] text-[19px] font-bold max-w-full z-[2] lg:text-[64px] md:text-[48px]">
                      Find Your Perfect Fit Every Time
                    </p>
                    <h2 className="m-0 relative md:text-11xl w-[240px] md:w-[578px] lg:w-[878px] text-[8px] md:leading-[38px] font-bold font-text text-gainsboro-200 z-[2] md:mq450:text-lg md:mq450:leading-[23px] md:mq1050:text-5xl md:mq1050:leading-[30px]">
                      Revolutionizing the way you shop, online and offline
                    </h2>
                    <button className=" text-[15px] mb-4 w-[90px] md:w-[180px] md:text-5xl leading-[126.07%] font-semibold font-features-heading text-crimson text-left md:min-w-[127px] cursor-pointer [border:none] py-1 px-1 md:py-5 md:px-6 bg-white rounded-md flex flex-row items-start justify-start whitespace-nowrap z-[1] hover:bg-gainsboro-100">
                      Try It Now
                    </button>                  
                </div>

                {
            /* image part */
          }
                <div className=" z-3 h-[333px] md:h-[592px] w-[50%] md:w-[390px] lg:w-[546.7px] absolute m-[0] right-[-19.7px] md:bottom-[-110px] lg:bottom-[47px] text-xs">
                  <div className="absolute z-10 top-[120px] md:top-[130px] left-[70px] md:left-[189px] rounded-xl md:rounded-27xl bg-lightblue w-[70px] h-[90px] md:w-[155px] md:h-[311px] lg:w-[215px] lg:h-[411px] md:z-[2]">
                    
                    <div className="absolute top-[0px] left-[0px] rounded-27xl bg-lightblue w-full h-full hidden" />
                    <img className="absolute h-[calc(100%-7px)] md:h-[calc(100%_-_11px)] top-[5px] bottom-[6px] left-[20px] md:left-[33px] max-h-full md:w-[100px] lg:w-[149.1px] object-contain z-4" alt="bannerImage2" src={bannerImage2} />
                  </div>

                  <div className="absolute top-[80px] md:top-[0px] left-[20px] md:left-[50px] lg:left-[0px] rounded-xl md:rounded-27xl bg-lightblue w-[70px] h-[90px] md:w-[155px] lg:w-[215px] md:h-[311px] lg:h-[411px] z-20">
                    <img className="absolute top-0 md:top-[0px] left-3 md:left-[0px] h-[calc(100%)] w-[40px] md:w-full md:h-full object-cover" alt="bannerImage1" src={bannerImage1} />
                    <div className="absolute top-[39px] md:top-[200px] left-[-30px] lg:top-[147px] md:left-[72px] rounded-t-md rounded-br-md rounded-bl-none bg-gray-300 w-[77px] md:w-[97px] h-[20px] md:h-[25px] z-[6]">    
                      <label htmlFor="length" className="absolute text-[8px] md:text-sm top-[8px] left-[8px] leading-[8px] font-medium flex items-center min-w-[41px] z-[1]">
                        Length
                      </label>
                      <select id="length" className=" text-[8px] font-medium shrink-0 absolute top-[4px] left-[36px] md:left-[51px] rounded box-border w-[38px] flex flex-row items-center justify-center py-px px-0.5 z-[1] md:text-3xs text-slategray border-[0.5px] border-solid border-lightblue">
                        <option>42</option>
                      </select>
                    </div>
                  </div>
                  <div className="absolute top-[150px] left-[90px] lg:top-[310px] w-[70px] h-[90px] md:top-[250px] md:left-[195px] lg:left-[235px] md:w-[211px] md:h-[200px] lg:w-[311.7px] lg:h-[282px] z-20">
                    <img className="absolute lg:top-[0px] lg:left-[0px] w-full h-full object-contain" alt="bag" src={bag} />
                    <img className="absolute top-[19px] md:top-[60px] w-[23px] h-[50px] lg:top-[90.4px] left-[27px] md:left-[90px] lg:left-[124.9px] md:w-[70px] md:h-[90px] lg:w-[110.7px] lg:h-[101.6px] object-contain z-[1]" loading="lazy" alt="company" src={company} />
                  </div>
                  <div className=" w-[115px] md:w-[307px] flex flex-row items-start justify-between md:min-w-[307px] md:gap-[20px] text-base lg:flex-1 ml-12 md:mx-20 mt-16 md:mt-0">
                    <button className="md:text-sm leading-[22px] font-inter text-[8px] text-black text-center md:min-w-[101px] cursor-pointer [border:none] py-[0.1px] px-[3px] md:pt-1 md:px-[7px] md:pb-[5px] bg-gray-500 md:w-[115px] rounded-t-md rounded-br-md rounded-bl-none flex flex-row items-start justify-start box-border whitespace-nowrap z-30 hover:bg-gainsboro-300">                    
                        Choose Brand
                    </button>
                    <div className=" md:w-[115px] flex flex-col items-start justify-start pt-[40px] md:pt-[147px] px-0 pb-0 box-border">
                      <div className="self-stretch md:h-[31px] rounded-t-md rounded-br-md rounded-bl-none bg-gray-500 flex flex-row items-start justify-start px-[3px] py-[2px] md:py-[5px] md:px-3 box-border gap-[2px] md:gap-[6px] z-20">
                        <label htmlFor="size" className="flex text-[8px] md:text-sm flex-col items-start justify-start md:pt-[6.5px] px-0 md:pb-0 leading-[8px] md:min-w-[32px] pb-[-2px] z-20">                          
                            Size                          
                        </label>
                        <select id="size" className=" text-[8px] font-bold shrink-0 h-[14px] md:h-[22px] md:w-[39px] rounded box-border flex flex-row items-start justify-start p-0.5 z-20 md:text-sm text-slategray border-[0.5px] border-solid border-lightblue">                          
                            <option>M</option>                          
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </section>

        <img className="w-[200px] h-[71px] relative object-contain hidden z-[6]" alt="" src="/imgonlinecomuareplacecolorxhqxaditys0gremovebgpreview-1@2x.png" /></>;
}

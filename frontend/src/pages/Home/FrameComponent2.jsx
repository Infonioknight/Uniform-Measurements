import React from "react";
export function FrameComponent2({
  background1,
  tailor,
  background2,
  suit,
  boy,
  man2,
  oldman,
  girl,
  man,
  background3
}) {
  return <><h1 className="flex z-10 ml-[1px] flex-row items-start justify-start text-crimson font-extrabold text-[48px] mt-[60px] md:px-[120px]">
          How It Works
        </h1>
        <div className=" mt-[-24px] z-0 w-full flex-1 flex-wrap md:gap-[160px] bg-lavenderblush flex flex-col items-end justify-start pt-[135.8px] md:px-[85px] pb-[42px] box-border gap-[62.4px] max-w-full text-5xl text-black lg:pl-[42px] lg:pr-[42px] lg:box-border mq750:gap-[31px] mq750:pl-[21px] mq750:pr-[21px] mq750:box-border mq450:gap-[16px] mq450:pt-[57px] mq450:pb-5 mq450:box-border mq1050:pt-[88px] mq1050:pb-[27px] mq1050:box-border">
            
          <div className=" mx-auto w-full md:w-[1207.2px] md:gap-[0px] flex flex-wrap flex-row items-start justify-start pt-0 px-0 pb-[187.6px] box-border relative gap-[63.1px] max-w-full mq750:gap-[32px] mq450:gap-[16px] mq450:pb-[122px] mq450:box-border mq1050:flex-wrap">
            <div className="h-[246.2px] flex-1 relative min-w-[385px] max-w-full mq750:min-w-full">
              <div className="absolute top-[0px] left-[0px] w-full flex flex-row items-start justify-start pt-[41.2px] pb-[52.2px] pr-[59px] pl-[156px] box-border max-w-full mq750:pl-[78px] mq750:pr-[29px] mq750:box-border mq450:pl-5 mq450:box-border">
                <img className="h-full w-full absolute m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full z-[1]" loading="lazy" alt="background1" src={background1} />
                <b className="relative leading-[126.07%] md:left-0 text-[19px] md:text-[24px] left-[-30px] font-semibold z-[5] mq450:text-lgi mq450:leading-[24px]">
                  Upload Measurements
                </b>
                <div className="flex-1 flex flex-col items-start justify-start pt-[50px] px-0 pb-0 box-border max-w-full ml-[-281px] text-sm font-text">
                  <div className="self-stretch flex flex-row items-start justify-start relative max-w-full">
                    <img className="h-[300px] w-[100px] md:h-[323px] md:w-[173px] absolute m-[0] top-[-140px] left-[-50px] md:top-[-206px] md:left-[-171px] object-cover z-[4]" alt="tailor" src={tailor} />
                    <div className="flex-1 relative leading-[151.1%] md:left-0 left-[70px] inline-block max-w-full z-[5]">
                      Easily upload your body measurements from the comfort of
                      your home. Use our user-friendly interface to input your
                      details or take advantage of our shipped measuring tape for
                      accuracy
                    </div>
                  </div>
                </div>
              </div>
              <button className="cursor-pointer [border:none] p-3.5 bg-crimson absolute top-[250px] left-[130px] md:top-[195.2px] md:left-[156px] rounded-md flex flex-row items-start justify-start whitespace-nowrap z-[5] hover:bg-salmon">
                <b className="relative text-lg leading-[23px] font-semibold font-features-heading text-white text-left inline-block min-w-[114px]">
                  Upload Now
                </b>
              </button>
            </div>
            <div className="h-[246.2px] w-full md:w-[551.6px] flex flex-col items-start justify-start pt-[178.6px] px-0 pb-0 box-border md:min-w-[551.6px] max-w-full mq750:min-w-full mq450:pt-[116px] mq450:box-border mq1050:flex-1">
              <div className="self-stretch flex flex-col items-start justify-start h-[250px] md:h-[234px] pt-[-89px] md:pt-[32.6px] px-[29px] pb-[17.6px] box-border relative gap-[20px] max-w-full shrink-0">
                <img className="w-full md:h-full absolute m-[0] top-[0px] h-[250px] right-[0px]  bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-contain z-[1]" alt="background2" src={background2} />
                <div className="w-[467px] md:mt-0 mt-2 md:text-[24px] text-[19px] flex flex-row items-start md:justify-center max-w-full">
                  <b className="relative leading-[126.07%] font-semibold z-[3] mq450:text-lgi mq450:leading-[24px]">
                    Get Recommendations
                  </b>
                </div>
                <img className="h-[300px] w-[160px] md:h-[385px] md:w-[248px] absolute m-[0] top-[-70px] right-[-10px] md:top-[-160px] md:right-[-80px] object-contain z-[2]" loading="lazy" alt="suit" src={suit} />
                <div className="md:w-[377px] w-[200px] p-4 -pt-7 md:pt-0 relative text-sm leading-[151.1%] font-text text-right inline-block max-w-full z-[3]">
                  Based on your measurements, our tool provides you with a curated
                  list of products that will fit you perfectly. Browse through
                  tailored options without the hassle of guessing sizes
                </div>
                <div className="self-stretch flex flex-row items-start justify-center py-0  md:pt-0 pr-0 md:pl-[82px] ">
                  <button className="cursor-pointer [border:none] p-3.5 bg-crimson rounded-md flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-salmon">
                    <div className="relative text-lg leading-[23px] font-semibold font-features-heading text-white text-left">
                      See My Matches
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="md:block w-[373.7px] m-[0] absolute md:bottom-[-350px] lg:bottom-[-358.4px] md:left-[-40px] lg:left-[149px] flex flex-row items-start justify-start max-w-full z-[2]">
              <div className="h-[340px] flex-1 relative max-w-full">
                <div className="absolute top-[130.7px] left-[274.1px] rounded-lg bg-lightcoral-100 w-[99.6px] h-[154.4px]">
                  <div className="absolute top-[0px] left-[0px] rounded-lg bg-lightcoral-100 w-full h-full hidden" />
                  <img className="absolute h-[calc(100%_-_9.8px)] top-[6.3px] bottom-[3.5px] left-[35.3px] max-h-full w-[52px] object-contain z-[1]" loading="lazy" alt="boy" src={boy} />
                </div>
                <img className="absolute top-[130.7px] left-[0px] w-[99.6px] h-[154.4px] object-contain" alt="man2" src={man2} />
                <div className="absolute top-[112.2px] left-[198.3px] rounded-lg bg-lightcoral-100 w-[123.8px] h-48 z-[2]">
                  <div className="absolute top-[0px] left-[0px] rounded-lg bg-lightcoral-100 w-full h-full hidden" />
                  <img className="absolute h-[calc(100%_-_18.5px)] top-[8.6px] bottom-[9.9px] left-[40.5px] max-h-full w-[81.2px] object-contain z-[1]" alt="oldman" src={oldman} />
                </div>
                <img className="absolute top-[112.2px] left-[51.5px] w-[123.8px] h-48 object-contain z-[1]" alt="girl" src={girl} />
                <div className="absolute h-full top-[0px] bottom-[0px] left-[105.8px] w-[160.8px] z-[3]">
                  <div className="absolute top-[81px] left-[16.8px] rounded-lg bg-lightcoral-100 w-36 h-[223.2px]" />
                  <img className="absolute w-[calc(100%_-_4.7px)] top-[0px] right-[4.7px] left-[0px] max-w-full overflow-hidden h-[340px] object-cover z-[1]" alt="man" src={man} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[991.2px] flex flex-row items-start justify-center max-w-full">
            <div className="h-[219px] w-[596.3px] relative max-w-full">
              <div className="absolute top-[0px] md:left-[240px] lg:left-[-120px] w-full flex flex-row items-start justify-start pt-3.5 pb-[67.3px] pr-[21px] pl-32 box-border md:w-[470px] lg:w-[610px] lg:max-w-full h-full mq750:pl-16 mq750:box-border mq450:pl-5 mq450:box-border">
                <img className="h-full w-full absolute m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full z-[1]" alt="background3" src={background3} />
                <div className="relative md:left-0 -left-12 leading-[126.07%] md:text-[24px] text-[19px] font-semibold z-[2] mq450:text-lgi mq450:leading-[24px]">
                  Enjoy Hassle-free Shopping
                </div>
                <div className="flex-1 flex flex-col items-start justify-start pt-[50px] px-0 pb-0 box-border max-w-full ml-[-341px] text-sm font-text">
                  <div className="self-stretch lg:w-[447px] w-[321px] relative leading-[151.1%] md:top-0 top-[-20px] z-[2]">{`With our accurate size recommendations, you can confidently purchase items knowing they'll fit. This leads to a smoother, more enjoyable shopping experience both online and in-store, ensuring customer satisfaction and reducing the likelihood of returns. `}</div>
                </div>
              </div>
              <button className="cursor-pointer [border:none] p-3.5 bg-crimson absolute top-[168px] left-[128px] rounded-md flex flex-row items-start justify-start whitespace-nowrap z-[2] hover:bg-salmon">
                <b className="relative text-lg leading-[23px] font-semibold font-features-heading text-white text-left">
                  Start Shopping
                </b>
              </button>
            </div>
          </div>
        </div></>;
}
  
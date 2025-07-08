import { Link, useNavigate } from 'react-router-dom'


import { userAuthService } from "../../AuthService/authService";
import scale from "../assets/scale.png"
import scalevertical from "../assets/scalevertical.png"
import bannerImage1 from "../assets/bannerImage1.png"
import bannerImage2 from "../assets/bannerImage2.png"
import company from "../assets/company.png"
import bag from "../assets/bag.png"
import bulk from "../assets/bulk.png"
import Features from "../../components/future/Features";
import accurate from "../assets/accurate.png"
import dataentry from "../assets/dataentry.png"
import tailor from "../assets/tailor.png"
import suit from "../assets/suit.png"
import background1 from "../assets/background1.png"
import background2 from "../assets/background2.png"
import background3 from "../assets/background3.png"
import man from "../assets/man.png"
import girl from "../assets/girl.png"
import man2 from "../assets/man2.png"
import oldman from "../assets/oldman.png"
import boy from "../assets/boy.png"
import leaf from "../assets/leaf.png"
import clock from "../assets/clock.png"
import returns from "../assets/returns.png"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar";
import JumpButton from '../../components/jump/JumpButton';

const HomePage = () => {
  const userService = userAuthService()
  const navigate = useNavigate()

  return (
    <>
      <div className='bg-crimson h-8 w-full'></div>
      <Navbar />
      <div className='w-full relative bg-white overflow-hidden flex flex-wrap flex-col items-start justify-start leading-[normal] tracking-[normal]'>
        <img
          className=' w-[200px] h-[700px] md:w-[570px] md:h-[930px] lg:w-[929.5px] lg:h-[1025.1px] absolute !m-[0] top-[-200px] md:top-[-130px] lg:top-[-29px] right-[1px] md:right-[-100px] lg:right-[-188.5px] object-contain z-[1]'
          alt=''
          src={scalevertical}
        />
        <div className='self-stretch h-[739px] relative bg-white hidden z-[1]' />
        {/* banner */}
        <section
          className={`self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[18px] box-border max-w-full text-left text-5xs text-gray-400 font-inter `}
        >
          <div className='flex-1 flex flex-row items-start justify-start relative max-w-full'>
            <div className=' w-full md:h-[278.6px] md:w-[535.2px] !m-[0] absolute right-[0px] md:bottom-[160px] lg:bottom-[226.9px] flex flex-row items-start justify-start pt-[91.5px] px-[162px] pb-[91px] box-border'>
              <img
                className='h-[70px] w-[100px] md:h-full md:w-[429px] lg:w-[629.5px] absolute !m-[0] top-[120px] lg:top-[0px] right-[0px] md:right-[-94.3px] md:bottom-[0px] lg:bottom-[0px] max-h-full object-contain z-40'
                alt=''
                src={scale}
              />
              <div className='rounded-t-md rounded-br-none rounded-bl-md bg-gray-200 flex flex-row items-start justify-start md:pt-[5px] md:px-[15px] ml-14 mt-[85px] md:mt-0 md:ml-0 md:pb-1.5 px-[3px] py-[3px] z-50 md:z-50'>
                <div className='h-3.5 w-[67px] md:w-[110px] rounded-t-none rounded-br-none rounded-bl-md flex flex-row items-start justify-start py-0 md:px-[31px] box-border gap-[2px] md:gap-[10px] '>
                  <label
                    htmlFor='brand'
                    className='leading-[8px] z-50 md:text-sm text-[8px] min-w-[23px] shrink-0 [debug_commit:bf4bc93] ml-[0px] flex flex-col items-start justify-start md:pt-[3px] px-0 pb-0'
                  >
                    Brand
                  </label>
                  <input
                    id='brand'
                    placeholder='Name it.... '
                    className=' placeholder:text-7xs placeholder:py[2px] md:text-sm text-[8px] h-[15px] w-[39px] rounded box-border flex flex-row items-start justify-start p-0.5 shrink-0 [debug_commit:bf4bc93] text-center z-50 text-slategray border-[0.5px] border-solid border-lightblue'
                  />
                </div>
              </div>
            </div>

            <div className='flex-1 bg-crimson  flex flex-col md:flex-row items-start justify-start md:pt-24 lg:pt-44 md:pb-[30px] lg:pb-[167px] md:pr-[92px] md:pl-[14px] lg:pl-[120px] box-border relative md:gap-[146px] md:max-w-full text-51xl lg:flex-wrap mq750:gap-[73px] mq750:pl-[60px] mq750:pr-[46px] mq750:box-border mq450:gap-[36px] mq450:pt-[74px] mq450:px-5 mq450:pb-[71px] mq450:box-border mq1050:pt-[114px] mq1050:pb-[109px] mq1050:box-border'>
              {/* text part */}
              <div className='flex-1 ml-4 self-stretch flex flex-col w-[50%] gap-[20px] md:gap-[39px]  items-start justify-start pt-[98px] px-0 pb-0 box-border md:min-w-[504px] md:max-w-full text-white font-features-heading '>
                <p className=' w-[180px] lg:w-[678px] md:w-[478px]  md:leading-[126.07%] text-[19px] font-bold max-w-full z-[2] lg:text-[64px] md:text-[48px]'>
                  Find Your Perfect Fit Every Time
                </p>
                <h2 className='m-0 relative md:text-11xl w-[240px] md:w-[578px] lg:w-[878px] text-[8px] md:leading-[38px] font-bold font-text text-gainsboro-200 z-[2] md:mq450:text-lg md:mq450:leading-[23px] md:mq1050:text-5xl md:mq1050:leading-[30px]'>
                  Revolutionizing the way you shop,online and offline
                </h2>
                <button className=' text-[15px] mb-4 w-[90px] md:w-[180px] md:text-5xl leading-[126.07%] font-semibold font-features-heading text-crimson text-left md:min-w-[127px] cursor-pointer [border:none] py-1 px-1 md:py-5 md:px-6 bg-white rounded-md flex flex-row items-start justify-start whitespace-nowrap z-[1] hover:bg-gainsboro-100'>
                  Try It Now
                </button>
              </div>

              {/* image part */}
              <div className=' z-3 h-[333px] md:h-[592px] w-[50%] md:w-[390px] lg:w-[546.7px] absolute !m-[0] right-[-19.7px] md:bottom-[-110px] lg:bottom-[47px] text-xs'>
                <div className='absolute z-10 top-[120px] md:top-[130px] left-[70px] md:left-[189px] rounded-xl md:rounded-27xl bg-lightblue w-[70px] h-[90px] md:w-[155px] md:h-[311px] lg:w-[215px] lg:h-[411px] md:z-[2]'>
                  <div className='absolute top-[0px] left-[0px] rounded-27xl bg-lightblue w-full h-full hidden' />
                  <img
                    className='absolute h-[calc(100%-7px)] md:h-[calc(100%_-_11px)] top-[5px] bottom-[6px] left-[20px] md:left-[33px] max-h-full md:w-[100px] lg:w-[149.1px] object-contain z-4'
                    alt=''
                    src={bannerImage2}
                  />
                </div>
                <div className='absolute top-[80px] md:top-[0px] left-[20px] md:left-[50px] lg:left-[0px] rounded-xl md:rounded-27xl bg-lightblue w-[70px] h-[90px] md:w-[155px] lg:w-[215px] md:h-[311px] lg:h-[411px] z-40'>
                  <img
                    className='absolute top-0 md:top-[0px] left-3 md:left-[0px] h-[calc(100%)] w-[40px] md:w-full md:h-full object-cover'
                    alt=''
                    src={bannerImage1}
                  />
                  <div className='absolute top-[39px] md:top-[200px] left-[-30px] lg:top-[147px] md:left-[72px] rounded-t-md rounded-br-md rounded-bl-none bg-gray-300 w-[77px] md:w-[97px] h-[20px] md:h-[25px] z-[6]'>
                    <label
                      htmlFor='length'
                      className='absolute text-[8px] md:text-sm top-[8px] left-[8px] leading-[8px] font-medium flex items-center min-w-[41px] z-[1]'
                    >
                      Length
                    </label>
                    <select
                      id='length'
                      className=' text-[8px] font-medium shrink-0 absolute top-[4px] left-[36px] md:left-[51px] rounded box-border w-[38px] flex flex-row items-center justify-center py-px px-0.5 z-[1] md:text-3xs text-slategray border-[0.5px] border-solid border-lightblue'
                    >
                      <option>42</option>
                    </select>
                  </div>
                </div>
                <div className='absolute top-[150px] left-[90px] lg:top-[310px] w-[70px] h-[90px] md:top-[250px] md:left-[195px] lg:left-[235px] md:w-[211px] md:h-[200px] lg:w-[311.7px] lg:h-[282px] z-20'>
                  <img
                    className='absolute lg:top-[0px] lg:left-[0px] w-full h-full object-contain'
                    alt=''
                    src={bag}
                  />
                  <img
                    className='absolute top-[19px] md:top-[60px] w-[23px] h-[50px] lg:top-[90.4px] left-[27px] md:left-[90px] lg:left-[124.9px] md:w-[70px] md:h-[90px] lg:w-[110.7px] lg:h-[101.6px] object-contain z-[1]'
                    loading='lazy'
                    alt=''
                    src={company}
                  />
                </div>
                <div className=' w-[115px] md:w-[307px] flex flex-row items-start justify-between md:min-w-[307px] md:gap-[20px] text-base lg:flex-1 ml-12 md:mx-20 mt-16 md:mt-0'>
                  <button className='md:text-sm leading-[22px] font-inter text-[8px] text-black text-center md:min-w-[101px] cursor-pointer [border:none] py-[0.1px] px-[3px] md:pt-1 md:px-[7px] md:pb-[5px] bg-gray-500 md:w-[115px] rounded-t-md rounded-br-md rounded-bl-none flex flex-row items-start justify-start box-border whitespace-nowrap z-50 hover:bg-gainsboro-300'>
                    Choose Brand
                  </button>
                  <div className=' md:w-[115px] flex flex-col items-start justify-start pt-[40px] md:pt-[147px] px-0 pb-0 box-border'>
                    <div className='self-stretch md:h-[31px] rounded-t-md rounded-br-md rounded-bl-none bg-gray-500 flex flex-row items-start justify-start px-[3px] py-[2px] md:py-[5px] md:px-3 box-border gap-[2px] md:gap-[6px] z-40'>
                      <label
                        htmlFor='size'
                        className='flex text-[8px] md:text-sm flex-col items-start justify-start md:pt-[6.5px] px-0 md:pb-0 leading-[8px] md:min-w-[32px] pb-[-2px] z-40'
                      >
                        Size
                      </label>
                      <select
                        id='size'
                        className=' text-[8px] font-bold shrink-0 h-[14px] md:h-[22px] md:w-[39px] rounded box-border flex flex-row items-start justify-start p-0.5 z-40 md:text-sm text-slategray border-[0.5px] border-solid border-lightblue'
                      >
                        <option>M</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <img
          className='w-[200px] h-[71px] relative object-contain hidden z-[6]'
          alt=''
          src='/imgonlinecomuareplacecolorxhqxaditys0gremovebgpreview-1@2x.png'
        />
        {/* <FrameComponent3 /> */}

        <div className='w-full mx-auto flex flex-col sm:items-start items-center sm:justify-start justify-center py-0 pr-1 md:px-1 box-border gap-[78px] max-w-full mq750:gap-[39px] mq450:gap-[19px]'>
          <div className='flex mx-auto lg:ml-[100px] md:ml-2 flex-row sm:items-start items-center sm:justify-start justify-center text-crimson font-extrabold text-[48px] py-0 px-0.5'>
            Features
          </div>
          <div className='self-stretch mx-auto md:w-[760px] w-[350px] lg:w-[1207px] flex flex-wrap flex-col sm:flex-row sm:items-start items-center justify-center md:justify-between gap-[1px] lg:gap-[20px] z-[3] text-center md:text-5xl text-white'>
            <Features
              para='Eliminate guesswork with our precise size recommendation algorithm.
                            By analyzing detailed body measurements,
                            we provide highly accurate size suggestions, 
                            reducing returns and enhancing customer satisfaction'
              heading='Accurate Size Recommendations'
              image={accurate}
            />
            <Features
              para='Store and manage size data for every team member,
                            simplifying bulk orders for uniforms, workwear, or team
                            apparel. Our system keeps detailed records, making it easy
                            to place large orders with confidence that each item will
                            fit perfectly'
              heading='Bulk Orders Made Easy'
              image={bulk}
            />
            <Features
              para='Enter and access size data from anywhere. 
                            Customers can input their measurements online, 
                            and retailers can use this data for both online and offline shopping, 
                            ensuring a seamless shopping experience'
              heading='Convenient Data Entry'
              image={dataentry}
            />
          </div>
        </div>

        {/* <FrameComponent2 /> */}
        <div className='flex mx-auto lg:ml-[100px] md:ml-3 flex-row sm:items-start items-center sm:justify-start justify-center text-crimson font-extrabold text-[48px] py-0 px-0'>
          <h1 className='z-10 text-crimson font-extrabold text-[48px] mt-[60px]'>
            How It Works
          </h1>
        </div>

        <div className=' mt-[-24px] z-0 w-full flex-1 flex-wrap md:gap-[160px] bg-lavenderblush flex flex-col items-end justify-start pt-[135.8px] md:px-[85px] pb-[42px] box-border gap-[62.4px] max-w-full text-5xl text-black lg:pl-[42px] lg:pr-[42px] lg:box-border mq750:gap-[31px] mq750:pl-[21px] mq750:pr-[21px] mq750:box-border mq450:gap-[16px] mq450:pt-[57px] mq450:pb-5 mq450:box-border mq1050:pt-[88px] mq1050:pb-[27px] mq1050:box-border'>
          <div className=' mx-auto w-full md:w-[1207.2px] md:gap-[0px] flex flex-wrap flex-row items-start justify-start pt-0 px-0 pb-[187.6px] box-border relative gap-[63.1px] max-w-full mq750:gap-[32px] mq450:gap-[16px] mq450:pb-[122px] mq450:box-border mq1050:flex-wrap'>
            <div className='h-[246.2px] flex-1 relative min-w-[385px] max-w-full mq750:min-w-full'>
              <div className='absolute top-[0px] left-[0px] w-full flex flex-row items-start justify-start pt-[41.2px] pb-[52.2px] pr-[59px] pl-[156px] box-border max-w-full mq750:pl-[78px] mq750:pr-[29px] mq750:box-border mq450:pl-5 mq450:box-border'>
                <img
                  className='h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full z-[1]'
                  loading='lazy'
                  alt=''
                  src={background1}
                />
                <b className='relative leading-[126.07%] md:left-0 text-[19px] md:text-[24px] left-[-30px] font-semibold z-[5] mq450:text-lgi mq450:leading-[24px]'>
                  Upload Measurements
                </b>
                <div className='flex-1 flex flex-col items-start justify-start pt-[50px] px-0 pb-0 box-border max-w-full ml-[-281px] text-sm font-text'>
                  <div className='self-stretch flex flex-row items-start justify-start relative max-w-full'>
                    <img
                      className='h-[300px] max-[420px]:top-[-40px] max-[420px]:left-[-40px] w-[100px] md:h-[323px] md:w-[173px] absolute !m-[0] top-[-140px] left-[-50px] md:top-[-206px] md:left-[-171px] object-cover z-[4]'
                      alt=''
                      src={tailor}
                    />
                    <div className='flex-1 relative leading-[151.1%] md:left-0 left-[70px] inline-block max-w-full z-[5]'>
                      Easily upload your body measurements from the comfort of
                      your home. Use our user-friendly interface to input your
                      details or take advantage of our shipped measuring tape
                      for accuracy
                    </div>
                  </div>
                </div>
              </div>
              <button className='cursor-pointer [border:none] p-3.5 bg-crimson absolute top-[250px] left-[130px] md:top-[195.2px] md:left-[156px] rounded-md flex flex-row items-start justify-start whitespace-nowrap z-[5] hover:bg-salmon'>
                <b className='relative text-lg leading-[23px] font-semibold font-features-heading text-white text-left inline-block min-w-[114px]'>
                  Upload Now
                </b>
              </button>
            </div>
            <div className='h-[246.2px] w-full md:w-[551.6px] flex flex-col items-start justify-start pt-[178.6px] px-0 pb-0 box-border md:min-w-[551.6px] max-w-full mq750:min-w-full mq450:pt-[116px] mq450:box-border mq1050:flex-1'>
              <div className='self-stretch flex flex-col items-start justify-start h-[250px] md:h-[234px] pt-[-89px] md:pt-[32.6px] px-[29px] pb-[17.6px] box-border relative gap-[20px] max-w-full shrink-0'>
                <img
                  className='w-full md:h-full absolute !m-[0] top-[0px] h-[250px] right-[0px]  bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-contain z-[1]'
                  alt=''
                  src={background2}
                />
                <div className='w-[467px] md:mt-0 mt-2 md:text-[24px] text-[19px] flex flex-row items-start md:justify-center max-w-full'>
                  <b className='relative leading-[126.07%] font-semibold z-[3] mq450:text-lgi mq450:leading-[24px]'>
                    Get Recommendations
                  </b>
                </div>
                <img
                  className='h-[300px] w-[160px] md:h-[385px] md:w-[248px] absolute !m-[0] top-[-70px] right-[-10px] md:top-[-160px] md:right-[-80px] object-contain z-[2]'
                  loading='lazy'
                  alt=''
                  src={suit}
                />
                <div className='md:w-[377px] w-[200px] -pt-7 md:pt-0 relative text-sm leading-[151.1%] font-text text-right inline-block max-w-full z-[3]'>
                  Based on your measurements, our tool provides you with a
                  curated list of products that will fit you perfectly. Browse
                  through tailored options without the hassle of guessing sizes
                </div>
                <div className='self-stretch flex flex-row items-start justify-center py-0  md:pt-0 pr-0 md:pl-[82px] '>
                  <button className='cursor-pointer [border:none] p-3.5 bg-crimson rounded-md flex flex-row items-start justify-start whitespace-nowrap z-[3] hover:bg-salmon'>
                    <div className='relative text-lg leading-[23px] font-semibold font-features-heading text-white text-left'>
                      See My Matches
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className='md:block w-[373.7px] !m-[0] absolute md:bottom-[-350px] lg:bottom-[-358.4px] md:left-[-40px] lg:left-[149px] flex flex-row items-start justify-start max-w-full z-[2]'>
              <div className='h-[340px] flex-1 relative max-w-full'>
                <div className='absolute top-[130.7px] left-[274.1px] rounded-lg bg-lightcoral-100 max-[420px]:hidden w-[99.6px] h-[154.4px]'>
                  <div className='absolute top-[0px] left-[0px] rounded-lg bg-lightcoral-100 w-full h-full hidden' />
                  <img
                    className='absolute h-[calc(100%_-_9.8px)] top-[6.3px] bottom-[3.5px] left-[35.3px] max-[420px]:hidden max-h-full w-[52px] object-contain z-[1]'
                    loading='lazy'
                    alt=''
                    src={boy}
                  />
                </div>
                <img
                  className='absolute top-[130.7px] left-[0px] w-[99.6px] h-[154.4px] max-[420px]:hidden object-contain'
                  alt=''
                  src={man2}
                />
                <div className='absolute top-[112.2px] left-[198.3px] rounded-lg bg-lightcoral-100 max-[420px]:hidden w-[123.8px] h-48 z-[2]'>
                  <div className='absolute top-[0px] left-[0px] rounded-lg bg-lightcoral-100 w-full h-full hidden' />
                  <img
                    className='absolute h-[calc(100%_-_18.5px)] top-[8.6px] bottom-[9.9px] left-[40.5px] max-h-full w-[81.2px] max-[420px]:hidden object-contain z-[1]'
                    alt=''
                    src={oldman}
                  />
                </div>
                <img
                  className='absolute top-[112.2px] left-[51.5px] w-[123.8px] h-48 max-[420px]:hidden object-contain z-[1]'
                  alt=''
                  src={girl}
                />
                <div className='absolute h-full top-[0px] bottom-[0px] left-[105.8px] max-[420px]:hidden w-[160.8px] z-[3]'>
                  <div className='absolute top-[81px] left-[16.8px] rounded-lg bg-lightcoral-100 w-36 h-[223.2px]' />
                  <img
                    className='absolute w-[calc(100%_-_4.7px)] top-[0px] right-[4.7px] left-[0px] max-w-full overflow-hidden max-[420px]:hidden h-[340px] object-cover z-[1]'
                    alt=''
                    src={man}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-[991.2px] flex flex-row items-start justify-center max-w-full'>
            <div className='h-[219px] w-[596.3px] relative max-w-full'>
              <div className='absolute top-[0px] md:left-[240px] lg:left-[-120px] w-full flex flex-row items-start justify-start pt-3.5 pb-[67.3px] pr-[21px] pl-32 box-border md:w-[470px] lg:w-[610px] lg:max-w-full h-full mq750:pl-16 mq750:box-border mq450:pl-5 mq450:box-border'>
                <img
                  className='h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full z-[1]'
                  alt=''
                  src={background3}
                />
                <div className='relative md:left-0 -left-12 leading-[126.07%] md:text-[24px] text-[19px] font-semibold z-[2] mq450:text-lgi mq450:leading-[24px]'>
                  Enjoy Hassle-free Shopping
                </div>
                <div className='flex-1 flex flex-col items-start justify-start pt-[50px] px-0 pb-0 box-border max-w-full ml-[-341px] text-sm font-text'>
                <div className='absolute sm:hidden h-full top-[-50px] bottom-[0px] left-[-28px] w-[160.8px] z-[3]'>
                  <img
                    className='absolute w-[calc(100%_-_4.7px)] top-[0px] right-[4.7px] left-[0px] max-w-full overflow-hidden h-[340px] object-cover z-[1]'
                    alt=''
                    src={man}
                  />
                </div>
                  <div className='self-stretch max-[420px]:pl-[120px] lg:w-[447px] w-[321px] relative leading-[151.1%] md:top-0 top-[-20px] z-[2]'>{`With our accurate size recommendations, you can confidently purchase items knowing they'll fit. This leads to a smoother, more enjoyable shopping experience both online and in-store, ensuring customer satisfaction and reducing the likelihood of returns. `}</div>
                </div>
              </div>
              <button className='cursor-pointer [border:none] p-3.5 bg-crimson absolute top-[210px] left-[128px] rounded-md flex flex-row items-start justify-start whitespace-nowrap z-[2] hover:bg-salmon'>
                <b className='relative text-lg leading-[23px] font-semibold font-features-heading text-white text-left'>
                  Start Shopping
                </b>
              </button>
            </div>
          </div>
        </div>

        {/* <FrameComponent /> */}
        <section
          className={`self-stretch bg-snow flex flex-wrap flex-col items-end justify-start pt-[83px] px-[120px] pb-14 box-border gap-[73px] max-w-full z-[1] text-left text-5xl text-black font-features-heading mq750:gap-[36px] mq750:pt-[54px] mq750:px-[60px] mq750:pb-9 mq750:box-border mq450:gap-[18px] mq450:pl-5 mq450:pr-5 mq450:box-border `}
        >
          <div className='self-stretch flex flex-row items-start justify-start py-0 px-[5px] box-border max-w-full'>
            <div className='w-[491px] flex flex-col items-start justify-start max-w-full'>
              <div className='w-[355px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full'>
                <b className='relative leading-[126.07%] font-semibold inline-block min-w-[127px] z-[2] mq450:text-lgi mq450:leading-[24px]'>
                  Save Time
                </b>
              </div>
              <div className='self-stretch flex flex-row flex-wrap items-start justify-center gap-[30px] max-w-full mt-[-1.5px] text-sm font-text'>
                <img
                  className='h-14 w-[84px] relative object-contain z-[2]'
                  loading='lazy'
                  alt=''
                  src={clock}
                />
                <div className='flex-1 flex flex-col items-start justify-start pt-[21.5px] px-0 pb-0 box-border min-w-[245px] max-w-full'>
                  <div className='self-stretch relative leading-[151.1%] z-[2]'>
                    Quickly find products that fit you perfectly without
                    spending hours trying on multiple sizes. Our tool narrows
                    down your choices to what will suit you best
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='self-stretch flex flex-row items-start justify-center py-0 pr-0 pl-px box-border max-w-full'>
            <div className='w-[491px] flex flex-col items-start justify-start max-w-full'>
              <div className='w-[355px] flex flex-row items-start justify-center py-0 mx-8 box-border max-w-full'>
                <b className='relative leading-[126.07%] font-semibold inline-block min-w-[127px] z-[2] mq450:text-lgi mq450:leading-[24px]'>
                  Reduce Returns
                </b>
              </div>
              <div className='self-stretch flex flex-row flex-wrap items-start justify-center gap-[30px] max-w-full mt-[-1.5px] text-sm font-text'>
                <img
                  className='h-14 w-[84px] relative object-contain z-[2]'
                  loading='lazy'
                  alt=''
                  src={returns}
                />
                <div className='flex-1 flex flex-col items-start justify-start pt-[21.5px] px-0 pb-0 box-border min-w-[245px] max-w-full'>
                  <div className='self-stretch relative leading-[151.1%] z-[2]'>
                    By ensuring you get the right size the first time, our tool
                    helps reduce the number of returns, saving you and the
                    retailer time and resources
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[491px] flex flex-col items-start justify-start max-w-full'>
            <div className='w-[355px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full'>
              <b className='relative leading-[126.07%] font-semibold inline-block min-w-[127px] z-[2] mq450:text-lgi mq450:leading-[24px]'>
                Sustainability
              </b>
            </div>
            <div className='self-stretch flex flex-row flex-wrap items-start justify-center gap-[15px] max-w-full mt-[-1.5px] text-sm font-text'>
              <img
                className='h-14 w-[84px] relative object-contain z-[2]'
                loading='lazy'
                alt=''
                src={leaf}
              />
              <div className='flex-1 flex flex-col items-start justify-start pt-[21.5px] px-0 pb-0 box-border min-w-[245px] max-w-full'>
                <div className='self-stretch relative leading-[151.1%] z-[2]'>
                  Less returns mean less environmental impact. By minimizing the
                  carbon footprint associated with shipping and repackaging, we
                  contribute to a greener planet
                </div>
              </div>
            </div>
          </div>
        </section>
        <JumpButton />
        {/* <Footer /> */}
        <Footer />
      </div>
    </>
  )
}

export default HomePage

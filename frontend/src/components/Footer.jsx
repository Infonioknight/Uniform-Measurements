import logo from '../assets/Zimutail-logo.jpg';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { ImYoutube } from 'react-icons/im';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoMdMail } from 'react-icons/io';

const Footer = () => {
	return (
		<div>
			<div className="border-solid border-black border-t gap-10 lg:gap-4 p-3 flex justify-between flex-wrap lg:justify-center md:p-12 text-base text-wireframe font-inter">
				<div className="container max-w-full min-w-full lg:grid grid-cols-3 lg:gap-12 gap-4 font-poppins">
					<div className=" h-auto">
						<img src={logo} alt="logo" className="h-28 w-28 mt-5 mr-3" />

						<p className="mt-2 font-Poppins ">
							Zimutail is all about making users order their desired clothes and reduce return rates.
							Users can also browse and try clothes of their choice.
						</p>
					</div>
					<div className="flex col-span-2  lg:gap-4 mt-4">
						{/*  Quick Links */}
						<div className="flex-1  mt-3  flex-col mr-3">
							<h3 className="mt-3 mb-4  text-crimson font-extrabold text-xl ">Quick Links</h3>
							<Link to="/about" className="text-black no-underline">
								<p className=" font-display font-medium max-[400px]:text-sm sm:text-lg">About Us</p>
							</Link>
							<Link to="/" className="text-black no-underline">
								<p className=" font-display font-normal text-base text-zinc-600 max-[440px]:text-sm sm:text-lg ">
									Store
								</p>
							</Link>
							<Link to="/login" className="text-black no-underline">
								<p className=" font-display font-normal text-base text-zinc-600 max-[440px]:text-sm sm:text-lg cursor-pointer">
									Login
								</p>
							</Link>
							<Link to="/signup" className="text-black no-underline">
								<p>Sign Up</p>
							</Link>
							<Link to="/report" className="text-black no-underline">
								<p>Report Bug</p>
							</Link>
						</div>
						{/* Contact */}
						<div className="flex-1 h-auto ">
							<h3 className="mt-5  text-crimson font-extrabold text-xl ">Get in touch with us</h3>
							<p className="  flex mb-2 mt-4 flex-row  ">
								<FaLocationDot className="text-red me-2 text-xl " />
								City, State, Pin code.
							</p>

							<p className="  flex mb-2 flex-row items-center">
								<FaPhone className="text-black me-2 text-xl" />
								+91 0123456789
							</p>
							<p className="  flex mb-2 flex-row items-center">
								<IoMdMail className="text-black me-2 text-xl" />
								Email@gmail.com
							</p>
						</div>
					</div>
				</div>
				{/* Social icons */}
				<div className="flex gap-4 lg:gap-8 mt-5 max-sm:pb-10 items-center max-sm:justify-start max-sm:w-[348px] overflow-hidden ">
					<h3 className="text-center text-crimson font-extrabold text-nowrap">Follow Us</h3>

					<Link
						// to="https://www.linkedin.com"
						// target="_blank"
						to="/"
						className="flex items-center font-bold no-underline group"
						rel="noopener noreferrer"
					>
						<AiOutlineLinkedin className="w-7 h-7 cursor-pointer no-underline list-none text-[#0A66C2]" />
						<p className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-1000 text-[#0A66C2]">
							LinkedIn
						</p>
					</Link>

					<Link
						// to="https://www.facebook.com"
						// target="_blank"
						to="/"
						className="flex items-center font-bold no-underline group"
						rel="noopener noreferrer"
					>
						<FaFacebook className="w-7 h-7 cursor-pointer no-underline list-none text-[#1877F2]" />
						<p className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-1000 text-[#1877F2]">
							Facebook
						</p>
					</Link>

					<Link
						// to="https://www.instagram.com"
						// target="_blank"
						to="/"
						className="flex items-center font-bold no-underline group"
						rel="noopener noreferrer"
					>
						<AiOutlineInstagram className="w-7 h-7 cursor-pointer no-underline list-none text-[#C13584]" />
						<p className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-1000 text-[#C13584]">
							Instagram
						</p>
					</Link>

					<Link
						// to="https://www.youtube.com"
						// target="_blank"
						to="/"
						className="flex items-center font-bold no-underline group"
						rel="noopener noreferrer"
					>
						<ImYoutube className="w-7 h-7 cursor-pointer no-underline list-none text-[#FF0000]" />
						<p className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-1000 text-[#FF0000]">
							Youtube
						</p>
					</Link>

					<Link
						// to="https://twitter.com"
						// target="_blank"
						to="/"
						className="flex items-center font-bold no-underline group"
						rel="noopener noreferrer"
					>
						<FaXTwitter className="w-5 h-5 cursor-pointer no-underline list-none text-gray-700" />
						<p className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-1000 text-gray-700">
							Twitter
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;

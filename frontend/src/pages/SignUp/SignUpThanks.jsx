import { Link, useNavigate } from 'react-router-dom';

import { baseUrl } from '../../baseUrl/BaseUrl';

import { useState } from 'react';
import Swal from 'sweetalert2';

import { userAuthService } from '../../AuthService/authService';
import logo from '../../assets/logo.png';
import Thanks from '../../assets/Thanks.png';
import axios from 'axios';

const SignUpThanks = () => {
	const [ loginForm, setloginForm ] = useState({});
	const [ formErrors, setFormErrors ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const userService = userAuthService();
	const navigate = useNavigate();

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setloginForm((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post(`${baseUrl}/users/login`, loginForm, {
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.status === 200) {
				Swal.fire({
					title: 'Login Successful',
					text: 'Redirecting to your dashboard',
					icon: 'success'
				});

				userService.setUserLogin(response.data.responseUser);
				setFormErrors('');
				navigate('/home');
			} else {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
		} catch (error) {
			console.error('Error:', error);

			if (error.response) {
				if (error.response.status === 401) {
					setFormErrors('Incorrect password or email');
				} else if (error.response.status === 404) {
					setFormErrors('This Email id is not registered');
				} else {
					setFormErrors('An unexpected error occurred. Please try again later.');
				}
			} else {
				setFormErrors('An unexpected error occurred. Please try again later.');
			}

			Swal.fire({
				title: 'Something went Bad',
				text: error.message,
				icon: 'error'
			});
		} finally {
			setLoading(false);
		}
	};

	// const auth = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

	return (
		<form
			className=" w-full relative h-screen text-left text-base overflow-x-hidden text-wireframe font-poppins"
			onSubmit={handleSubmit}
		>
			<div className="absolute top-0 left-0 w-full h-full">
				<div className="absolute top-[0px] left-[0px] rounded-[10px] bg-white shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] w-full h-full" />

				<img
					className="absolute top-[20.7px] left-[20.7px] w-[100px] h-[38px] md:w-[150px] md:h-[50px] lg:w-[159px] lg:h-[38.7px] object-cover"
					alt=""
					src={logo}
				/>
				<div className="absolute top-[162.1px] left-[9%] lg:left-[20%] md:left-[10%] text-[25px] md:text-[50px] lg:text-[80px]">
					<span className="font-light">{`Great! Everything is ready `}</span>
				</div>
				<img
					src={Thanks}
					className="absolute top-[250px] left-[145px] lg:top-[340.7px] lg:left-[750.7px] md:left-[320px] md:top-[350px] md:w-[170px] md:h-[170px] w-[100px] h-[100px]  lg:w-[150px] lg:h-[150.7px] object-cover"
				/>
				<Link
					to="/login"
					className="absolute top-[430px] md:left-[36%] no-underline px-4 py-[5px] text-[18px] md:top-[640px] lg:top-[600px] left-[26%] lg:left-[42%] rounded bg-crimson w-[200.8px] md:h-[50px] md:w-[220px] md:px-7 md:py-[10px] text-white h-[40px]"
				>
					Go to login page
				</Link>
			</div>
		</form>
	);
};

export default SignUpThanks;

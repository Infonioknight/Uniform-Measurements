import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Flag from 'react-world-flags';
import { getData } from 'country-list';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Swal from 'sweetalert2';
import CustomerHeader from '../../components/customer/CustomerHeader';
import Sliderbar from '../../components/customer/Slidebar';
import axios from 'axios';
import { baseUrl } from '../../baseUrl/BaseUrl';
import { userAuthService } from '../../AuthService/authService';
import { useNavigate } from 'react-router-dom';

// for select lanuage
const LanguageDropdown = () => {
	// Sample list of languages
	const languageOptions = [
		{ value: 'en', label: 'English' },
		{ value: 'hi', label: 'Hindi' },
		{ value: 'es', label: 'Spanish' },
		{ value: 'fr', label: 'French' },
		{ value: 'de', label: 'German' },
		{ value: 'zh', label: 'Chinese' }
		// Add more languages as needed
	];

	// Set the default value (English in this case)
	const defaultLanguage = { value: 'en', label: 'English' };

	const [ selectedLanguage, setSelectedLanguage ] = useState(defaultLanguage);
	// console.log(selectedLanguage.label);

	const handleLanguageChange = (selectedOption) => {
		setSelectedLanguage(selectedOption);
	};

	return (
		<div className="w-5/6">
			<Select
				value={selectedLanguage}
				onChange={handleLanguageChange}
				options={languageOptions}
				placeholder="Select Your Language..."
				isSearchable // Enables search functionality
			/>
		</div>
	);
};

const SelectCountry = () => {
	const countries = getData().map((country) => ({
		value: country.code, // Use country code
		label: country.name // Display country name
	}));

	const defaultCountry = countries.find((country) => country.value === 'IN'); // Default to 'IN'

	const [ selectedCountry, setSelectedCountry ] = useState(defaultCountry); // Set default country

	const handleCountryChange = (selectedOption) => {
		setSelectedCountry(selectedOption);
	};

	return (
		<div className="w-5/6">
			<div className="flex items-center">
				{selectedCountry && (
					<Flag
						code={selectedCountry.value} // Use country code for the flag
						className="w-11 h-11 mr-1"
						alt={selectedCountry.label} // Use country name for alt text
					/>
				)}
				<Select
					options={countries}
					onChange={handleCountryChange}
					placeholder="Search and select country..."
					isSearchable
					defaultValue={defaultCountry} // Set the default country
					className="w-full opacity-90 border-none outline-none"
				/>
			</div>
		</div>
	);
};

function AccountSettings() {
	const navigate = useNavigate();
	// change password section start
	const [ formData, setFormData ] = useState({
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: ''
	});

	const [ showPasswords, setShowPasswords ] = useState({
		oldPassword: false,
		newPassword: false,
		confirmNewPassword: false
	});

	const [ errors, setErrors ] = useState({
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: '',
		blankotp: ''
	});

	// show hide otp field
	const [ otpFieldVisible, setOtpFieldVisible ] = useState(false);
	const [ otp, setOtp ] = useState('');

	const isFormInvalid = Object.values(errors).some((error) => error !== '');

	// useEffect to handle real-time validation
	useEffect(
		() => {
			const { oldPassword, newPassword, confirmNewPassword } = formData;
			let validationErrors = {};

			// Validate old and new password comparison
			if (oldPassword && newPassword && oldPassword === newPassword) {
				validationErrors.newPassword = 'New password cannot be the same as the old password';
			}

			// Validate confirm password match
			if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
				validationErrors.confirmNewPassword = 'Confirm password does not match';
			}

			setErrors((prevErrors) => ({
				...prevErrors,
				...validationErrors
			}));
		},
		[ formData ]
	);

	function handleChange(event) {
		const { name, value } = event.target;

		setFormData((prevState) => ({
			...prevState,
			[name]: value
		}));

		// Clear the specific error when the user starts typing
		setErrors((prevState) => {
			let updatedErrors = { ...prevState };

			// Clear confirmNewPassword error if either newPassword or confirmNewPassword changes
			if (name === 'newPassword' || name === 'confirmNewPassword') {
				updatedErrors.confirmNewPassword = '';
			}

			// Clear oldPassword and newPassword errors if oldPassword changes
			if (name === 'oldPassword') {
				updatedErrors.oldPassword = '';
				updatedErrors.newPassword = ''; // Clear the newPassword error as well
			}

			// Clear newPassword error individually
			if (name === 'newPassword') {
				updatedErrors.newPassword = '';
			}

			// Cleaning blankotp error on his handler
			return updatedErrors;
		});
	}

	function toggleShowPassword(field) {
		setShowPasswords((prevState) => ({
			...prevState,
			[field]: !prevState[field]
		}));
	}

	async function handlePasswordChange(event) {
		event.preventDefault();

		const { oldPassword, newPassword, confirmNewPassword } = formData;

		let validationErrors = {};

		// Check if any field is empty
		if (!oldPassword) validationErrors.oldPassword = 'Old password is required';
		if (!newPassword) validationErrors.newPassword = 'New password is required';
		if (!confirmNewPassword) validationErrors.confirmNewPassword = 'Confirm New Password is required';
		if (confirmNewPassword !== newPassword)
			validationErrors.confirmNewPassword = 'Confirm New Password should match with New Password';

		// If there are any validation errors, prevent submission
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		// Proceed with the password change if no validation errors
		try {
			// Call the backend to verify old password and trigger OTP
			// const response = await fakeApiCall(oldPassword, newPassword);

			const response = await axios.post(
				`${baseUrl}/change-password`,
				{ oldPassword, newPassword },
				{
					withCredentials: true
				}
			);

			Swal.fire({
				title: 'Reset Password',
				text: `${response.data.message}`,
				icon: 'info',
				confirmButtonText: 'OK',
				timer: 3000
			});

			setFormData({
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: ''
			});
			setErrors({
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: ''
			});
			// Show OTP field
			// setOtpFieldVisible(true);
		} catch (err) {
			if (err.response.data.error === 'Incorrect password') {
          Swal.fire({
					title: 'Reset Password!',
					text: err.response.data.error|| 'Incorrect Password ',
					icon: 'info',
					confirmButtonText: 'OK',
					timer: 3000
          });
      setFormData({
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: ''
			});
			setErrors({
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: ''
			});
			} else {
				Swal.fire({
					title: 'Error!',
					text: err.message || 'An error occurred',
					icon: 'error',
					confirmButtonText: 'OK',
					timer: 3000
        });
      setFormData({
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: ''
			});
			setErrors({
				oldPassword: '',
				newPassword: '',
				confirmNewPassword: ''
			});
			}
		}
	}

	// async function handleOtpVerification() {
	// 	if (!otp.trim()) {
	// 		setErrors((prevErrors) => ({
	// 			...prevErrors,
	// 			blankotp: 'otp field is blank first fill the otp or click on cancel for cancel process'
	// 		}));
	// 		return;
	// 	}
	// 	try {
	// 		// Call backend API to verify OTP
	// 		const response = await verifyOtpApiCall(otp);

	// 		Swal.fire({
	// 			title: 'Success!',
	// 			text: 'Password changed successfully',
	// 			icon: 'success',
	// 			confirmButtonText: 'OK',
	// 			timer: 3000
	// 		}).then(() => {
	// 			// Clear the form data after successful submission
	// 			setFormData({
	// 				oldPassword: '',
	// 				newPassword: '',
	// 				confirmNewPassword: ''
	// 			});
	// 			setOtp(''); // Clear OTP
	// 			setOtpFieldVisible(false); // Hide OTP field
	// 			setErrors({
	// 				oldPassword: '',
	// 				newPassword: '',
	// 				confirmNewPassword: '',
	// 				blankotp: ''
	// 			});
	// 		});
	// 	} catch (err) {
	// 		setErrors((prevErrors) => ({
	// 			...prevErrors,
	// 			blankotp: err.message || 'Invalid OTP'
	// 		}));
	// 	}
	// }

	// async function fakeApiCall(oldPassword, newPassword) {
	// 	await new Promise((resolve) => setTimeout(resolve, 1000));
	// 	const dummyOldPassword = '123';
	// 	if (oldPassword !== dummyOldPassword) {
	// 		throw new Error('Old password is incorrect');
	// 	}
	// 	// Simulate OTP sent successfully
	// 	return { message: 'OTP sent successfully' };
	// }

	// async function verifyOtpApiCall(otp) {
	// 	await new Promise((resolve) => setTimeout(resolve, 1000));
	// 	const dummyOtp = '12345';
	// 	if (otp !== dummyOtp) {
	// 		throw new Error('Invalid OTP');
	// 	}
	// 	// Simulate successful password change
	// 	return { message: 'Password changed successfully' };
	// }

	// clear on cancel btn click
	function handleCancel() {
		setFormData({
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: ''
		});
		setErrors({
			oldPassword: '',
			newPassword: '',
			confirmNewPassword: ''
		});
		// setOtpFieldVisible(false);
	}

	// change password section end

	return (
		<div className="flex w-dvw h-dvh p-3">
			{/* Left Sidebar */}
			<div>
				<Sliderbar />
			</div>

			{/* Main Content */}
			<main className="w-full h-full overflow-auto scrollbar-hide">
				{/* Header Navigation */}
				<CustomerHeader />

				{/* Account Settings Title */}
				<div>
					<p className="sm:justify-start justify-center font-poppins text-5xl flex items-center text-[#13504973] font-bold py-2">
						Account Settings
					</p>

					<p className="w-full sm:justify-start justify-center font-poppins text-xl flex items-center text-[#13504973] font-bold pb-3">
						Make or Update the changes based on your preferences
					</p>
				</div>

				{/* Account Settings form */}
				<div className="flex flex-col lg:flex-row">
					{/* left side start */}
					<div className="w-full py-3">
						<form className="flex flex-col items-center gap-5">
							<div className="w-5/6">
								<div className="flex border-2 border-solid border-[#D3D3D3] rounded-md overflow-hidden">
									<input
										type={showPasswords.oldPassword ? 'text' : 'password'}
										name="oldPassword"
										id="oldPassword"
										placeholder="Enter old password"
										value={formData.oldPassword}
										onChange={handleChange}
										required
										className="p-3 outline-none w-full"
									/>
									<button
										type="button"
										onClick={() => toggleShowPassword('oldPassword')}
										className="w-11 cursor-pointer"
										aria-label={showPasswords.oldPassword ? 'Hide password' : 'Show password'}
									>
										{showPasswords.oldPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
									</button>
								</div>
								{errors.oldPassword && <p className="text-red">{errors.oldPassword}</p>}
							</div>

							<div className="w-5/6">
								<div className="flex border-2 border-solid border-[#D3D3D3] rounded-md overflow-hidden">
									<input
										type={showPasswords.newPassword ? 'text' : 'password'}
										name="newPassword"
										id="newPassword"
										placeholder="Enter new password"
										value={formData.newPassword}
										onChange={handleChange}
										required
										className="p-3 outline-none w-full"
									/>
									<button
										type="button"
										onClick={() => toggleShowPassword('newPassword')}
										className="w-11 cursor-pointer"
										aria-label={showPasswords.newPassword ? 'Hide password' : 'Show password'}
									>
										{showPasswords.newPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
									</button>
								</div>
								{errors.newPassword && <p className="text-red">{errors.newPassword}</p>}
							</div>

							<div className="w-5/6">
								<div className="flex border-2 border-solid border-[#D3D3D3] rounded-md overflow-hidden">
									<input
										type={showPasswords.confirmNewPassword ? 'text' : 'password'}
										name="confirmNewPassword"
										id="confirmNewPassword"
										placeholder="Confirm new password"
										value={formData.confirmNewPassword}
										onChange={handleChange}
										required
										className="p-3 outline-none w-full"
									/>
									<button
										type="button"
										onClick={() => toggleShowPassword('confirmNewPassword')}
										className="w-11 cursor-pointer"
										aria-label={
											showPasswords.confirmNewPassword ? 'Hide password' : 'Show password'
										}
									>
										{showPasswords.confirmNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
									</button>
								</div>
								{errors.confirmNewPassword && <p className="text-red">{errors.confirmNewPassword}</p>}
							</div>

							<div className="w-5/6 flex flex-col sm:flex-row justify-around gap-3">
								<button
									type="submit"
									onClick={handlePasswordChange}
									disabled={isFormInvalid || otpFieldVisible}
									className={`w-full sm:w-40 h-12 text-lg font-medium rounded-md border-2 border-[#F8444F] bg-[#F8444F] text-white ${isFormInvalid ||
									otpFieldVisible
										? 'opacity-75 cursor-not-allowed'
										: 'cursor-pointer'}`}
								>
									Change Password
								</button>
								<button
									type="button"
									onClick={handleCancel}
									className="w-full sm:w-40 h-12 text-lg font-medium rounded-md border-2 border-[#F8444F] bg-transparent text-[#F8444F] cursor-pointer"
								>
									Cancel
								</button>
							</div>

							{/* {otpFieldVisible && (
								<div className="w-5/6">
									<div className="flex rounded-sm overflow-hidden">
										<input
											type="text"
											name="otp"
											id="otp"
											placeholder="Enter OTP"
											value={otp}
											onChange={(e) => {
												setOtp(e.target.value);
												// Clear the blankotp error when user starts typing
												setErrors((prevErrors) => ({
													...prevErrors,
													blankotp: ''
												}));
											}}
											required
											className="p-3 w-5/6 outline-none border-2 border-solid border-[#D3D3D3]"
										/>
										<button
											type="button"
											onClick={handleOtpVerification}
											className={`bg-[#F8444F] text-white px-4 py-2 text-nowrap ${isFormInvalid
												? 'opacity-50 cursor-not-allowed'
												: 'cursor-pointer'}`}
											disabled={isFormInvalid}
										>
											Verify OTP
										</button>
									</div>
									{errors.blankotp && <p className="text-red">{errors.blankotp}</p>}
								</div>
							)} */}
						</form>
					</div>
					{/* left side end */}

					{/* right side */}
					{/* <div className='w-full flex flex-col items-center py-5 gap-5'>
            <h1 className='text-[#13504973]'>Change other settings</h1>
            <LanguageDropdown />
            <SelectCountry />
            <div className="w-5/6 flex flex-col sm:flex-row justify-around gap-3">
              <button
                type="submit"
                // onClick={handlePasswordChange}
                className="w-full sm:w-40 h-12 text-lg font-medium rounded-md border-2 border-[#F8444F] bg-[#F8444F] text-white cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                // onClick={handleCancel}
                className="w-full sm:w-40 h-12 text-lg font-medium rounded-md border-2 border-[#F8444F] bg-transparent text-[#F8444F] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div> */}
					{/* right side end */}
				</div>
			</main>
		</div>
	);
}

export default AccountSettings;

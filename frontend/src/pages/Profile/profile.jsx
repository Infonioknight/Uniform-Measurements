import React from 'react';
import { useState, useRef, useEffect } from 'react';
import './profile.css';
import domoImg from '../assets/imageUpload.svg';
import Loader from '../../components/Loader/Loader';
import { baseUrl } from '../../baseUrl/BaseUrl';
import { userAuthService } from '../../AuthService/authService';
import Swal from 'sweetalert2';
import axios from 'axios';

const Profile = () => {
	const [ isEditing, setIsEditing ] = useState(false);
	const imageUploadRef = useRef(null);
	const [ image, setImage ] = useState(null);

	const [ profileForm, setProfileForm ] = useState({});
	const [ formErrors, setFormErrors ] = useState({});
	let isFormValidate = false;
	const [ loading, setLoading ] = useState(false);
	const userService = userAuthService();
	const userId = userService.getUserData().userId;
	const userToken = userService.getUserToken();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setProfileForm((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	function isNameValid(sentence) {
		const words = sentence.split(' ');
		return words.some((word) => /\d/.test(word));
	}

	const validate = (profileForm) => {
		// Reset previous error messages
		const errors = {};

		if (!profileForm.full_name) {
			isFormValidate = false;
			errors.name = 'Name is required!';
		} else if (isNameValid(profileForm.full_name)) {
			isFormValidate = false;
			errors.name = '*Number not allowed';
		}

		if (!profileForm.gender) {
			errors.gender = 'Gender is required';
			isFormValidate = false;
		}

		if (!profileForm.age) {
			errors.age = 'Age is required';
			isFormValidate = false;
		} else if (profileForm.age <= 0 || profileForm.age > 120) {
			errors.age = 'Age is should be more than 0 and less than 120 years';
			isFormValidate = false;
		}

		if (!profileForm.occupation) {
			errors.occupation = 'occupation is required';
			isFormValidate = false;
		}

		if (!profileForm.address) {
			errors.address = 'Address is required';
			isFormValidate = false;
		}

		if (!profileForm.country) {
			errors.country = 'Country is required';
			isFormValidate = false;
		}

		return errors;
	};

	const handleEditButtonClick = async (event) => {
		setIsEditing(true);
		if (event.target.innerHTML === 'Save Profile') {
			event.preventDefault();
			isFormValidate = true;
			setFormErrors(validate(profileForm));

			if (isFormValidate) {
				setLoading(true);

				try {
					const formData = new FormData();
					formData.append('full_name', profileForm.full_name);
					formData.append('gender', profileForm.gender);
					formData.append('age', profileForm.age);
					formData.append('occupation', profileForm.occupation);
					formData.append('address', profileForm.address);
					formData.append('country', profileForm.country);
					formData.append('image', profileForm.image);
					formData.append('id', profileForm.id);

					const response = await axios.put(`${baseUrl}/users/profile`, formData, {
						headers: {
							'Content-Type': 'multipart/form-data',
							Authorization: `Bearer ${userToken}`
						}
					});

					if (response.status === 200) {
						Swal.fire({
							title: 'Update Successful',
							icon: 'success'
						});
					} else {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
				} catch (error) {
					console.error('Error:', error);
					Swal.fire({
						title: 'Update Failed',
						text: 'An error occurred while updating the profile. Please try again later.',
						icon: 'error'
					});
				}

				setLoading(false);
				setIsEditing(false);
			}
		}
	};

	const handleGenderChange = (gender) => {
		setProfileForm((prevState) => ({
			...prevState,
			gender: gender
		}));
	};

	const imageUploadClick = () => {
		imageUploadRef.current.click();
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const img = new Image();
				img.src = event.target.result;
				img.onload = () => {
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d');
					canvas.width = 150;
					canvas.height = 180;
					ctx.drawImage(img, 0, 0, 150, 180);
					// Convert the canvas to a data URL or Blob
					const resizedDataURL = canvas.toDataURL('image/jpeg');
					const resizedBlob = canvas.toBlob(
						(blob) => {
							setProfileForm((prevState) => ({
								...prevState,
								image: blob
							}));
						},
						'image/jpeg',
						0.6
					);
					resizedBlob;

					setImage(resizedDataURL);
				};
			};

			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		async function getUserData() {
			try {
				const response = await axios.get(`${baseUrl}/users/profile/${userId}`, {
					headers: {
						Authorization: `Bearer ${userToken}`
					}
				});

				if (response.status === 200) {
					const userData = response.data.userData;
					setProfileForm(userData);
				} else {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
			} catch (error) {
				console.error('Error:', error);
				Swal.fire({
					title: 'Something went Bad',
					text: error.message, // Displaying the error message from the caught error
					icon: 'error'
				});
			}
		}

		getUserData();
	}, []);

	return (
		<div className="container shadow-lg rounded bg-white m-auto my-2">
			<div className="card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
				<div className="border-r">
					<div className="flex flex-col items-center text-center p-3 py-5">
						{isEditing ? (
							<div onClick={imageUploadClick}>
								<input ref={imageUploadRef} type="file" onChange={handleImageChange} hidden />
								{image ? (
									<img src={image} alt="Resized Image" className="w-[150px] h-[180px] rounded-3xl" />
								) : (
									<img src={domoImg} alt="Resized Image" className="w-[150px] h-[180px]" />
								)}
							</div>
						) : (
							<img
								className="w-[150px] h-[180px] rounded-3xl"
								src={
									profileForm.image ? profileForm.image instanceof Blob ? (
										URL.createObjectURL(profileForm.image)
									) : (
										`data:image/png;base64,${profileForm.image}`
									) : (
										'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
									)
								}
								alt="Profile"
							/>
						)}
						<span className="font-weight-bold">{profileForm.full_name || ''}</span>
						<span className="text-black-50">{profileForm.email || ''}</span>
					</div>
				</div>
				<div>
					<div className="p-3 py-5">
						<h2 className="text-2xl mb-3 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
							Profile
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
							<div className="grid grid-cols-2">
								<label className="labels">Name</label>
								{isEditing ? (
									<div>
										<input
											type="text"
											className="form-control p-1"
											placeholder="Full name"
											name="full_name"
											value={profileForm.full_name || ''}
											onChange={handleChange}
											required
										/>
										<div className="error-message text-xs text-red-500">{formErrors.name}</div>
									</div>
								) : (
									<span>{profileForm.full_name || ''}</span>
								)}
							</div>
							<div className="grid grid-cols-2">
								<label className="labels">Mobile Number</label>
								<span>{profileForm.mobile_number}</span>
							</div>
							<div className="grid grid-cols-2">
								<label className="labels">Email ID</label>
								<span>{profileForm.email}</span>
							</div>
							<div className="grid grid-cols-2">
								<label className="labels">Gender</label>
								{isEditing ? (
									<div>
										<label className="mx-2 inline-flex items-center">
											<input
												type="radio"
												className="form-radio text-blue-500"
												name="gender"
												value="male"
												checked={profileForm.gender === 'male'}
												onChange={() => handleGenderChange('male')}
											/>
											<span className="ml-2">Male</span>
										</label>
										<label className="inline-flex items-center">
											<input
												type="radio"
												className="form-radio text-pink-500"
												name="gender"
												value="female"
												checked={profileForm.gender === 'female'}
												onChange={() => handleGenderChange('female')}
											/>
											<span className="ml-2">Female</span>
										</label>
										<label className="mx-2 inline-flex items-center">
											<input
												type="radio"
												className="form-radio text-green-500"
												name="gender"
												value="other"
												checked={profileForm.gender === 'other'}
												onChange={() => handleGenderChange('other')}
											/>
											<span className="ml-2">Other</span>
										</label>
										<div className="error-message text-xs text-red-500">{formErrors.gender}</div>
									</div>
								) : (
									<span>{profileForm.gender || ''}</span>
								)}
							</div>
							<div className="grid grid-cols-2">
								<label className="labels">Age</label>
								{isEditing ? (
									<div>
										<input
											type="number"
											className="form-control p-1"
											placeholder="Enter your Age"
											name="age"
											value={profileForm.age || ''}
											onChange={handleChange}
											required
										/>
										<div className="error-message text-xs text-red-500">{formErrors.age}</div>
									</div>
								) : (
									<span>{profileForm.age || ''}</span>
								)}
							</div>
							<div className="grid grid-cols-2">
								<label className="labels">Occupation</label>
								{isEditing ? (
									<div>
										<input
											type="text"
											className="form-control p-1"
											placeholder="Enter your Profession"
											name="occupation"
											value={profileForm.occupation || ''}
											onChange={handleChange}
											required
										/>
										<div className="error-message text-xs text-red-500">
											{formErrors.occupation}
										</div>
									</div>
								) : (
									<span>{profileForm.occupation || ''}</span>
								)}
							</div>
							<div className="grid grid-cols-2">
								<label className="labels">Address</label>
								{isEditing ? (
									<div>
										<input
											type="text"
											className="form-control p-1"
											placeholder="Enter your Address"
											name="address"
											value={profileForm.address || ''}
											onChange={handleChange}
											required
										/>
										<div className="error-message text-xs text-red-500">{formErrors.address}</div>
									</div>
								) : (
									<span>{profileForm.address || ''}</span>
								)}
							</div>
							<div className="grid grid-cols-2">
								<label className="labels">Country</label>
								{isEditing ? (
									<div>
										<input
											type="text"
											className="form-control p-1"
											placeholder="Enter your Country"
											name="country"
											value={profileForm.country || ''}
											onChange={handleChange}
											required
										/>
										<div className="error-message text-xs text-red-500">{formErrors.country}</div>
									</div>
								) : (
									<span>{profileForm.country || ''}</span>
								)}
							</div>
						</div>
						<div className="mt-5 text-center">
							{loading ? (
								<h5>
									Please Wait <b>. . .</b>
								</h5>
							) : (
								''
							)}
							<button
								className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
								type="button"
								onClick={(e) => handleEditButtonClick(e)}
							>
								{isEditing ? loading ? <Loader /> : 'Save Profile' : 'Edit Profile'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;

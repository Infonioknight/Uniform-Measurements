const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const multer = require('multer');
const {
	registerUser,
	logOut,
	getAllUsers,
	getUser,
	sendData,
	updateUser,
	loginUser,
	authenticateUserEmail,
	saveUserMenTopWear,
	verifyEmail,
	resendOtp,
	getAllSellers,
	changePassword,
	forgotPassword,
	verifyOtp,
	resetPassword,
	bugReportForm,
	markAccountForDeletion,
	recoverAccount,
	adminDeleteUser,
	deletedUsers,
	requestOtpToChangePassword
} = require('../controllers/userController.js');

const { protect, ensureSeller, ensureGuest, validateId, ensureAdmin } = require('../middleware/authMiddleware.js');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
userRouter.get('/logout', protect, logOut);
userRouter.post('/users', ensureGuest, registerUser);
// userRouter.get('/users', protect, getAllUsers);
userRouter.get(
	'/googlelogin',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
		prompt: 'select_account' // Force account selection even when one account is available
	})
);
userRouter.get(
	'/api/auth/google/callback',
	passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_DOMAIN}/login` }),
	sendData
);
userRouter.get('/user/sellers', protect, getAllSellers);
userRouter.post('/users/login', ensureGuest, loginUser);
userRouter.post('/user/authenticate/email', ensureGuest, authenticateUserEmail);
userRouter.post('/user/men-top-wear', saveUserMenTopWear);
userRouter.post('/verify', ensureGuest, verifyEmail);
userRouter.post('/report', bugReportForm);
userRouter.post('/resend-otp', ensureGuest, resendOtp);
userRouter.post('/forgotpassword', ensureGuest, forgotPassword);
userRouter.post('/recover_account', ensureGuest, recoverAccount);
userRouter.post('/verifyotp', ensureGuest, verifyOtp);
userRouter.post('/resetpassword', ensureGuest, resetPassword);
// userRouter.post('/changepassword', ensureGuest, changePassword);
userRouter.post('/request-otp-to-change-password', ensureGuest, requestOtpToChangePassword); // otp req for change password
userRouter.post('/change-password', protect, changePassword); // updated changed password
userRouter.get('/users/:id', validateId, protect, getUser);
userRouter.put('/users/:id', protect, validateId, upload.single('profile_image'), updateUser);
userRouter.put('/mark_delete/:id', protect, validateId, markAccountForDeletion);
userRouter.get('/deleted_users', protect, ensureAdmin, deletedUsers);

module.exports = userRouter;
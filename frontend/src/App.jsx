import HomePage from './pages/Home/HomePage'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Profile from './pages/Profile/profile'
import Dashboard from './pages/Admin/Dashboard/AdminDashBoard'
import { Route, Routes } from 'react-router-dom'
import AdminUserProfile from './pages/Admin/Profile/AdminUserProfile'
import AdminProfile from './pages/Admin/Profile/AdminProfile'

// Seller route
import AdminLogin from './pages/Admin/Login/AdminLogin'
import SellerRequireAuth from './AuthService/SellerAuthRoutes'
import AdminAuthRoutes from './AuthService/AdminAuthRoutes'
import RequireAuth from './AuthService/authRoutes'
import NewCompany from './pages/Admin/Company/AddNewCompany'
import TShirtManagementPage from './pages/BulkTshirts/HomePage'
import BulkExcelUpload from './pages/BulkTshirts/BulkExcelUpload'
import CompanyLogin from './pages/BulkTshirts/CompanyLogin'
import CompanySignup from './pages/BulkTshirts/CompanySignUp'
import CompanyProfile from './pages/BulkTshirts/CompanyProfile'
import DomainFilteredPage from './pages/BulkTshirts/Domain-filtered'
import SellerDashboard from './pages/Admin/Seller/SellerDashboard'
import AddCustomer from './pages/Admin/Seller/AddCustomer'
import SignUpotp from './pages/SignUp/SignUpotp'
import SignUpThanks from './pages/SignUp/SignUpThanks'
import AddNewStock from './pages/Admin/Seller/AddNewStock'
import ViewAllCustomer from './pages/Admin/Seller/ViewAllCustomer'
import CustomerPage from './pages/Admin/Seller/CustomerPage'
import Product from './pages/Admin/Seller/Product'
import AddCategory from './pages/Admin/Seller/AddCategory'
import SellerLogin from './pages/Admin/Seller/SellerLogin'
import SellerProfile from './pages/Admin/Seller/SellerProfilepage'
import SellerEditProfile from './pages/Admin/Seller/SellerEditProfile'

import CustomerRecoverAccount from './pages/customer/CustomerRecoverAccount'
import AddBrandSize from './pages/Admin/Seller/AddBrandSize'
import UpdateStock from './pages/Admin/Seller/UpdateStock'
import SellerRegistration from './pages/Admin/Seller/SellerRegistration'
import ViewAllBrand from './pages/Admin/Seller/ViewAllBrand'
import BodyMeasurement from './pages/BulkTshirts/BodyMeasurement'
import ThankYou from './pages/BulkTshirts/ThankYou'
import BulkEmailVerification from './pages/BulkTshirts/BulkEmailVerification'
import ContactUs from './pages/Home/ContactUs'
import About from './pages/Home/About'

// customer page

import CustomerHome from './pages/customer/CustomerHome'
import CustomerProfile from './pages/customer/CustomerProfile'
import BodyMeasurements from './pages/customer/BodyMeasurements'
import AccountSettings from './pages/customer/AccountSettings'
import Orders from './pages/customer/Orders'
import TailorRecommendation from './pages/customer/TailorRecommendation'
import SavedTailors from './pages/customer/SavedTailors'
import Support from './pages/customer/Support'
import CustomerForgotPassword from './pages/customer/CustomerForgotPassword'
import CustomerVerifyOtp from './pages/customer/CustomerVerifyOtp'
import CustomerResetPassword from './pages/customer/CustomerResetPassword'
import NotFound from './pages/NotFound'
import Logout from './pages/customer/Logout'
import ReportBug from './pages/ReportBug/ReportBug'
import RequestSeller from './pages/customer/SellerRequest/SellerRequest'
import CustomerDeleteAccount from './pages/customer/CustomerDeleteAccount'
import ManageRequests from './pages/Admin/Dashboard/ManageRequests/ManageRequests'

import AccountDeleteRequests from "./pages/Admin/Account Delete Requests/AccountDeleteRequests";
import SellerProductsPage from './pages/customer/SellerProductsPage'
import SellerProduct from './pages/customer/SellerProduct'
import CalibrationHome from './pages/Admin/Seller/CalibrationHome'
import CalibrationPage from './pages/Admin/Seller/CalibrationPage'
import CalibrationFeed from './pages/customer/CalibrationPage'
import SideInstructionsPage from './pages/customer/SideInstructionsPage'
import VerifyHeight from './pages/customer/VerifyHeight'
import Index from './pages/customer/Index'
// import RequestSeller from "./pages/customer/RequestSeller";
// customer end

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<NotFound />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/user/ThankYou" element={<ThankYou />} /> */}
        <Route path="/contactus" element={<ContactUs />} />
        {/* <Route path="/user/email/verification/:id" element={<BulkEmailVerification />} /> */}
        {/* <Route path="/user/ThankYou" element={<ThankYou />} /> */}
        {/* <Route path="/bulk-tshirts" element={<TShirtManagementPage />} />
        <Route path="/bulk-tshirts/excel-upload" element={<BulkExcelUpload />} />
        <Route path="/bulk-tshirts/Company/Shareable-Link/login" element={<CompanyLogin />} />
        <Route path="/bulk-tshirts/Company/Shareable-Link/signup" element={<CompanySignup />} /> */}
        {/* <Route path="/user/body-measurement" element={<BodyMeasurement />} /> */}


        {/* <Route path="/bulk-tshirts/Company/domain-filtered/login" element={<CompanyLogin />} />
        <Route path="/bulk-tshirts/Company/domain-filtered/signup" element={<CompanySignup />} />
        <Route path="/bulk-tshirts/company/Shareable-Link/:id" element={<CompanyProfile />} />
        <Route path="/bulk-tshirts/company/domain-filtered/:id" element={<DomainFilteredPage />} /> */}
        <Route path="/report" element={<ReportBug />} />

        {/* customer page that doesnt require authentication */}
        <Route path="/users/*">
          <Route path='customerforgotpassword' element={<CustomerForgotPassword />} />
          <Route path="customerverifyotp" element={<CustomerVerifyOtp />} />
          <Route path="customerresetpassword" element={<CustomerResetPassword />} />
          <Route path="recover-account/:userId" element={<CustomerRecoverAccount />} />
          {/* customer page without authentication ends */}
        </Route>


        {/*  pages that doesnt require authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/seller/login" element={<SellerLogin />} />
        <Route path="/admin/seller/signup" element={<SellerRegistration />} />
        <Route path="/signup/otp" element={<SignUpotp />} />
        <Route path="/signupthanks" element={<SignUpThanks />} />
        {/* page without authentication ends */}


        {/* admin page that requires admin authentication start */}
        <Route path="" element={<AdminAuthRoutes />}>
          <Route path="/admin/dashboard/:id" element={<Dashboard />} />
          <Route path='/admin/requests' element={<ManageRequests />} />
          <Route path="/admin/user/profile/:id" element={<AdminUserProfile />} />
          <Route path="/admin/profile/:id" element={<AdminProfile />} />
          <Route path="/admin/delete-requests/:id" element={<AccountDeleteRequests />} />
        </Route>
        {/* admin page that requires admin authentication ends */}



        {/* customer page that requires authentication start */}
        <Route path="" element={<RequireAuth />}>
          <Route path="/users/*">
            <Route path="home/:userId" element={<CustomerHome />} />
            <Route path="profile/:userId" element={<CustomerProfile />} />
            <Route path="bodymeasurements/:userId" element={<BodyMeasurements />} />
            <Route path="calibration/:userId" element={<CalibrationFeed />} />
            <Route path="verify_height/:userId" element={<VerifyHeight />} />
            <Route path="side-instructions/:userId" element={<SideInstructionsPage />} />
            <Route path="video-feed/:userId" element={<Index />} />
            <Route path="accountsettings/:userId" element={<AccountSettings />} />
            <Route path="orders/:userId" element={<Orders />} />
            <Route path="tailorrecommendation/:userId" element={<TailorRecommendation />} />
            <Route path="sellerRequest/:userId" element={<RequestSeller />} />
            <Route path="savedTailors/:userId" element={<SavedTailors />} />
            <Route path="support/:userId" element={<Support />} />
            <Route path=":userId/seller/products/:sellerId" element={<SellerProductsPage />} />
            <Route path=":userId/seller/product/:productId/:matchedSize?" element={<SellerProduct />} />

            {/* <Route path="logout/:userId" element={<Logout />} /> */}
          </Route>
          <Route path="/customerDeleteAccount/:userId" element={<CustomerDeleteAccount />} />
        </Route>

        {/* customer page end */}

        <Route path="" element={<SellerRequireAuth />} >
          <Route path="/admin/seller/customer/:id" element={<AddCustomer />} />
          <Route path="/admin/seller/home/:sellerId" element={<HomePage />} />
          <Route path="/admin/seller/:id" element={<SellerDashboard />} />
          <Route path="/admin/seller/profile/:sellerId" element={<SellerProfile />} />
          <Route path="/admin/seller/about/:sellerId" element={<About />} />
          <Route path="/admin/seller/contactus/:sellerId" element={<ContactUs />} />
          <Route path="/admin/seller/stock/:id" element={<AddNewStock />} />
          <Route path="/admin/seller/all-customers/:id" element={<ViewAllCustomer />} />
          <Route path="/admin/seller/:sellerId/customer/dashboard/:customerId" element={<CustomerPage />} />
          <Route path="/admin/seller/:sellerId/category" element={<AddCategory />} />
          <Route path="/admin/seller/product/:productId/:matchedSize?" element={<Product />} />
          <Route path="/admin/seller/:sellerId/brand/size" element={<AddBrandSize />} />
          <Route path="/admin/seller/:sellerId/product/:productId" element={<UpdateStock />} />
          <Route path="/admin/seller/brand/:sellerId" element={<ViewAllBrand />} />
          <Route path="/admin/seller/seller/profile/update/:sellerId" element={<SellerEditProfile />} />
          {/* <Route path="/admin/seller/sellerEditProfile/:id" element={<SellerEditProfile/>} /> */}
          <Route path='/admin/seller/calibration-home' element={<CalibrationHome/>}/>
          <Route path='/admin/seller/calibration' element={<CalibrationPage/>}/>
        </Route>
      </Routes>
      {/* <Footer/> */}
    </>
  );
}

export default App;
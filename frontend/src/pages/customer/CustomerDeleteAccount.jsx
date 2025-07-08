import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCategories } from "../../slices/category";
import { clearBrand } from "../../slices/brand";
import { clearCustomer } from "../../slices/customer";
import { clearStock } from "../../slices/stock";
import { deleteCredentials } from "../../slices/authSlice";
import axios from "axios";
import { baseUrl } from "../../baseUrl/BaseUrl";
import { useParams } from "react-router-dom";
import Loader from "../../components/customer/Loader";

const CustomerDeleteAccount = () => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [otherReason, setOtherReason] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailFieldVisible, setEmailFieldVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = useParams();

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (selectedReasons.includes(value)) {
      setSelectedReasons(selectedReasons.filter((reason) => reason !== value));
    } else {
      setSelectedReasons([...selectedReasons, value]);
    }

    setEmailFieldVisible(true);
  };

  const handleOtherReasonChange = (e) => {
    setOtherReason(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let reasons = selectedReasons;
    if (selectedReasons.includes("Other")) {
      reasons = [...selectedReasons.filter((r) => r !== "Other"), otherReason];
    }
    console.log("Account deletion reason:", reasons);

    // Add here account deletion logic
    try {
      setLoading(true);
      await axios.put(
        `${baseUrl}/mark_delete/${userId}`,
        { reasons, password },
        {
          withCredentials: true,
        }
      );
      dispatch(deleteCredentials());
      dispatch(clearCategories());
      dispatch(clearBrand());
      dispatch(clearCustomer());
      dispatch(clearStock());
      localStorage.removeItem("loginInitiatedFrom");
      setLoading(false);

      // Show the success message and wait for user to click 'OK'
      await Swal.fire({
        title: "Success",
        text: "Account marked for deletion. You can recover within 30 days.",
        icon: "success",
      });

      // Navigate after the alert is closed
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting account:", error);
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.error || error?.response?.data?.message,
        icon: "error",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" container w-full md:w-3/5 p-4 mt-14  mx-auto text-center space-y-5 font-inter">
        {loading && <Loader />}
        <h2>Before you delete, We may be able to help</h2>
        <h4>
          We are sorry to see you go. We'd like to know why you're deleting your
          account, as we may be able to help with common issues. You may also
          continue without selecting a reason.
        </h4>
      </div>
      <div className=" flex justify-center items-center">
        <div className=" bg-slate-200 p-6 m-2 mb-10 rounded shadow-lg w-96">
          <h2 className="text-xl font-bold mb-6">
            Why are you deleting your account?
          </h2>
          <form>
            <div className="space-y-4">
              <label className="block">
                <input
                  type="checkbox"
                  name="reason"
                  value="Privacy concerns"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Privacy concerns
              </label>

              <label className="block">
                <input
                  type="checkbox"
                  name="reason"
                  value="I do not feel safe on Zimutail"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                I do not feel safe on Zimutail
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  name="reason"
                  value="Too many emails/notifications"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Too many emails/notifications
              </label>

              <label className="block">
                <input
                  type="checkbox"
                  name="reason"
                  value="Not useful anymore"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Not useful anymore
              </label>

              <label className="block">
                <input
                  type="checkbox"
                  name="reason"
                  value="Found an alternative"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Found an alternative
              </label>

              <label className="block">
                <input
                  type="checkbox"
                  name="reason"
                  value="Other"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Other
              </label>

              {/* Show input field if 'Other' is selected */}
              {selectedReasons.includes("Other") && (
                <textarea
                  type="text"
                  value={otherReason}
                  onChange={handleOtherReasonChange}
                  required
                  placeholder="Please specify your reason"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              )}
            </div>

            {/* password input field */}
            {isEmailFieldVisible && (
              <div className="mt-4 relative">
                <label className="block">
                  Your Password:
                  <div className="relative mt-2">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </label>
              </div>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className={` py-3 px-5 mt-4 font-poppins text-[15px] font-medium border-2 border-[#F8444F] rounded-md bg-transparent text-[#F8444F] hover:bg-[#F8444F] hover:text-white cursor-pointer${
                  !password ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!password}
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CustomerDeleteAccount;

import axios from "axios";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../baseUrl/BaseUrl";

const ReportBug = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    // console.log(userInfo.email);

    const handelSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const report = form.report.value;

        const reportSubmit = { name, email, report };

        Swal.fire({
            title: "Your Report Is Under Review !",
            text: "Thank You",
            icon: "success",
        });

        form.reset();
        navigate("/");

        // Todo: create backend route after uncommand 

        try {
          const response = await axios.post(`${baseUrl}/report`, reportSubmit, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.status === 200) {
            Swal.fire({
              title: 'Your Report data successfully save',
              text: 'Thank You',
              icon: 'success',
            });
            Navigate('/');
          } else {
            console.error('Error submitting form:', response.statusText);
          }
        } catch (error) {
          console.error('Error submitting form:', error);
        }
    };
    return (
        <div>
            <Navbar></Navbar>
            <div className=" justify-center items-center">
                <>
                    <form
                        onSubmit={handelSubmit}
                        className="w-4/5 md:w-2/5 mx-auto mt-20 mb-6 p-5 shadow-md shadow-slate-600"
                    >
                        <div className="text-center my-2">
                            <h1>Report Form</h1>
                            <p className="py-4">
                                Help Us Improve by Reporting Any Issues You Encounter
                            </p>
                        </div>
                        {/* name input field */}
                        <div className="relative mx-auto w-full">
                            <input
                                className="peer w-full border border-crimson rounded-md  bg-transparent px-4 py-3  focus:outline-none"
                                type="text"
                                name="name"
                                placeholder=""
                                required
                            />
                            <label className="absolute -top-2 left-2 rounded-md bg-black px-2 text-base text-sky-100 duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-black peer-focus:text-sm peer-focus:text-white">
                                Name
                            </label>
                        </div>
                        <br />
                        {/* email input field */}
                        <div className="relative mx-auto w-full">
                            <input
                                className="peer w-full border border-crimson rounded-md  bg-transparent px-4 py-3  focus:outline-none"
                                type="email"
                                name="email"
                                value={userInfo?.email}
                                placeholder=""
                                required
                            />
                            <label className="absolute -top-2 left-2 rounded-md bg-black px-2 text-base text-sky-100 duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-400 peer-focus:-top-2 peer-focus:bg-black peer-focus:text-sm peer-focus:text-white">
                                email
                            </label>
                        </div>
                        <br />
                        <div className="space-y-2 text-sm text-zinc-700 ">
                            <label className="block font-medium" htmlFor="_message">
                                Report :
                            </label>
                            <textarea
                                className="min-h-[80px] w-full rounded border border-crimson  px-3 py-2 leading-tight focus:outline-none"
                                id="_message"
                                placeholder="what's in your mind"
                                name="report"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="flex items-center rounded bg-crimson hover:bg-red text-white cursor-pointer text-lg my-3 px-5 py-3 mx-auto"
                        >
                            Submit
                        </button>
                    </form>
                </>
            </div>
            <Footer />
        </div>
    );
};

export default ReportBug;

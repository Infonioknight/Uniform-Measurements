import { useState } from 'react'
import CustomerHeader from '../../components/customer/CustomerHeader';
import Sliderbar from '../../components/customer/Slidebar';
import Loader from '../../components/Loader/Loader';
import SupportImg from "../../assets/SupportImg.gif";
import Swal from 'sweetalert2';


function Support() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handlSupportFormSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    Swal.fire({
					title: 'Issue Raised',
					text:  'Issue sent successfully',
					icon: 'info',
					confirmButtonText: 'OK',
					timer: 3000
    });
    setLoading(false)
    setName('');
    setEmail('');
    setDescription('');
  }
  return (
    <>
      <div className='flex w-dvw h-dvh p-3'>
        {/*left slidebar */}
        <div>
          <Sliderbar />
        </div>

        {/* main content */}
        <main className="w-full h-full font-poppins overflow-auto scrollbar-hide">
          <CustomerHeader />
          <h1 className='mt-5 ml-3 text-neutral-400 font-poppins font-extrabold'>Support</h1>
          <div className='flex justify-center   h-80 max-h-80'>
            <img src={SupportImg} />
          </div>
          <div className='mt-3'>
            <form onSubmit={handlSupportFormSubmit} className="max-w-4xl mx-auto p-6 font-poppins bg-white rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className='mb-5'>
                  <label htmlFor="name" className="block font-bold text-lg text-gray-700 mb-2 ">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="enter full name"
                    className="w-full px-4 py-2 border-2 h-10 border-solid   rounded-md focus:outline-blue-300 focus:ring focus:ring-blue-200"
                    required
                  />
                </div>

                <div className='mb-5'>
                  <label htmlFor="email" className="block font-bold text-lg text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter email"
                    required
                    className="w-full px-4 py-2 border-2 h-10 border-solid rounded-md focus:outline-blue-300 focus:ring focus:ring-blue-200"
                  />
                </div>


              </div>
              <div>
                <label htmlFor="description" className="block font-bold text-lg text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description..."
                  required
                  className="w-full px-4 py-2  border-2  border-solid rounded-md focus:outline-blue-300 focus:ring focus:ring-blue-200"
                  rows="8"

                ></textarea>
              </div>
              {loading ? (
                <div className="flex justify-center">
                  <Loader />
                </div>
              ) : (
                <div className="flex justify-center mt-6 gap-9">
                  <button
                    type="submit"
                    className=" px-6 py-3 text-white cursor-pointer hover:bg-black bg-crimson rounded-md shadow-md hover:bg-red-700"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 text-black cursor-pointer bg-white border rounded-md shadow-md hover:text-white hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </main >
      </div>
    </>
  )
}

export default Support
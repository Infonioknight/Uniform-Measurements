import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import axios from "axios";

export default function CalibrationHome() {
  const backendURL = "http://127.0.0.1:5000";
  const [shoulderWidth, setShoulderWidth] = useState("");

  useEffect(() => {
    const existingValue = localStorage.getItem("shoulder_width");
    if (existingValue) {
    //   window.location.href = `${backendURL}/previous_calibration`;
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("shoulder_width", shoulderWidth);

    try {
        const response = await axios.post(`${backendURL}/submit_measurements`, {shoulder_width:shoulderWidth}, {
            headers: {
                'Content-Type': 'application/json',
              },
        });
  
        if (response.data.success) {
        //   window.location.href = `${backendURL}/calibration_feed`;
        console.log(response.data)
        } else {
          alert("Error: " + response.data.error);
        }
      } catch (error) {
        console.error("Error submitting measurement:", error);
      }
  };

  return (
    <div className="min-h-screen flex flex-col">
    <div className="w-full bg-[#f9454f] h-4"></div>
    <Navbar />
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome to the Calibration Measurement Form</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-left font-medium text-gray-700">
            Shoulder Width (in inches):
            <input
              type="text"
              value={shoulderWidth}
              onChange={(e) => setShoulderWidth(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-green-300"
            />
          </label>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

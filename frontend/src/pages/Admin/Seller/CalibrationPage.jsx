import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function CalibrationPage() {
  const backendURL = "http://127.0.0.1:5000";
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));
  const [isCalibrated, setIsCalibrated] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
        alert("Could not access the webcam. Please allow access.");
      });
  }, []);

  const captureAndSendFrame = async () => {
    if (isCalibrated || !videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const formData = new FormData();
      formData.append("frame", blob, "frame.jpg");
      
      try {
        const response = await axios.post(`${backendURL}/calibration_page`, formData);
        if (response.data.success) {
          document.body.style.backgroundColor = response.data.background_color;
          if (response.data.background_color === "#00ff00") {
            setIsCalibrated(true);
          }
        }
      } catch (err) {
        console.error("Error sending frame: ", err);
      }
    }, "image/jpeg");
  };

  useEffect(() => {
    const interval = setInterval(captureAndSendFrame, 1000);
    return () => clearInterval(interval);
  }, [isCalibrated]);

  const handleRecalibrate = async () => {
    document.body.style.backgroundColor = "#f58484";
    setIsCalibrated(false);
    await axios.post(`${backendURL}/re_calibrate`);
  };

  const handleContinue = async () => {
    try {
      const response = await axios.post(`${backendURL}/get_circle_coords`);
      sessionStorage.setItem("circleCoords", JSON.stringify(response.data.coordinates));
      window.location.href = `${backendURL}/video_feed`;
    } catch (err) {
      console.error("Error fetching circle coordinates: ", err);
      alert("Failed to fetch circle coordinates. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-2xl font-bold mb-4">Uniform Measurement - Calibration Page</h1>
      <p className="text-gray-700 max-w-lg mb-6">
        This page helps calibrate body measurements for accuracy. Ensure your <strong>shoulders</strong>, <strong>hips</strong>,
        <strong>elbows</strong>, <strong>hands</strong>, and <strong>feet</strong> are visible in the camera frame.
      </p>
      <div className="bg-red-200 p-4 rounded-lg shadow-md">
        <video ref={videoRef} autoPlay className="rounded-lg shadow-md w-full h-full max-w-md" />
      </div>
      {isCalibrated && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Physical calibration complete!</h2>
          <div className="mt-4 flex gap-4">
            <button onClick={handleRecalibrate} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">Re-calibrate</button>
            <button onClick={handleContinue} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

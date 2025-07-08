import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const backendURL = 'http://127.0.0.1:5000';

const CalibrationPage = () => {

  const { userId } = useParams();
    const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));
  const [isCalibrationComplete, setIsCalibrationComplete] = useState(false);
  const [lastValidFrame, setLastValidFrame] = useState(null);
  const [showStatus, setShowStatus] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#f58484');
  const intervalRef = useRef(null);

  useEffect(() => {
    startCameraAndCalibration();
    return () => {
      stopCamera();
      clearInterval(intervalRef.current);
    };
  }, []);

  const startCameraAndCalibration = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setShowStatus(false);
        }

        intervalRef.current = setInterval(captureAndSendFrame, 100);
      })
      .catch(err => {
        console.error('Error accessing webcam: ', err);
        alert('Could not access the webcam. Please allow access.');
      });
  };

  const stopCamera = () => {
    const tracks = videoRef.current?.srcObject?.getTracks();
    tracks?.forEach(track => track.stop());
    videoRef.current?.pause();
  };

  const captureAndSendFrame = () => {
    if (isCalibrationComplete || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(blob => {
        if (!blob) return;

        const formData = new FormData();
        formData.append('frame', blob, 'frame.jpg');

        fetch(`${backendURL}/calibration_page`, {
          method: 'POST',
          body: formData,
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setBackgroundColor(data.background_color);
              if (data.background_color === '#00ff00') {
                setLastValidFrame(blob);
                completeCalibration();
              }
            } else {
              console.error('Frame processing error:', data.error);
            }
          })
          .catch(err => {
            console.error('Error sending frame:', err);
          });
      }, 'image/jpeg');
    }
  };

  const completeCalibration = () => {
    setIsCalibrationComplete(true);
    clearInterval(intervalRef.current);
    stopCamera();
    setShowStatus(true);
  };

  const handleRetry = () => {
    setBackgroundColor('#f58484');
    stopCamera();

    fetch(`${backendURL}/retry`, { method: 'POST' })
      .then(res => res.json())
      .then(() => {
        setIsCalibrationComplete(false);
        setTimeout(startCameraAndCalibration, 1500);
      })
      .catch(err => {
        console.error('Error calling /retry:', err);
      });
  };

  const handleContinue = () => {
    if (!lastValidFrame) {
      alert('No valid frame. Please recalibrate.');
      return;
    }

    const formData = new FormData();
    formData.append('frame', lastValidFrame, 'final_frame.jpg');

    fetch(`${backendURL}/final_validation`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Forward to /verify_height route served by Flask
         navigate(`/users/verify_height/${userId}`);

        } else {
          alert('Validation failed. Restarting calibration...');
          handleRetry();
        }
      })
      .catch(err => {
        console.error('Final validation error:', err);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8" style={{ backgroundColor }}>
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Uniform Measurement - Front View + Calibration
        </h1>
        <p className="text-gray-700 mb-6">
          This page is for storing the front-view image and calibrating to ensure accuracy. <br />
          Please ensure <strong>shoulders</strong>, <strong>hips</strong>, <strong>elbows</strong>, <strong>hands</strong>, and <strong>feet</strong> are visible.<br />
          Also, <strong>hold the card on your chest using the short edge.</strong>
        </p>

        <div className="inline-block bg-red-100 p-4 rounded-xl shadow-md mb-6">
          <video ref={videoRef} width="640" height="480" autoPlay muted className="rounded-md" />
        </div>

        {showStatus && (
          <div className="flex justify-center items-center gap-6 mt-4">
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-pink-200 text-gray-800 font-semibold rounded-md hover:bg-pink-300 transition"
            >
              Re-calibrate
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-2 bg-pink-200 text-gray-800 font-semibold rounded-md hover:bg-pink-300 transition"
            >
              Submit Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalibrationPage;

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const backendURL = 'http://127.0.0.1:5000';

const SideViewMeasurementPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement('canvas'));
  const [isMeasurementComplete, setIsMeasurementComplete] = useState(false);
  const [lastValidFrame, setLastValidFrame] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#f58484');
  const [showStatus, setShowStatus] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    startCameraAndMeasurement();
    return () => {
      stopCamera();
      clearInterval(intervalRef.current);
    };
  }, []);

  const startCameraAndMeasurement = () => {
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
        console.error('Webcam error:', err);
        alert('Please allow webcam access.');
      });
  };

  const stopCamera = () => {
    const tracks = videoRef.current?.srcObject?.getTracks();
    tracks?.forEach(track => track.stop());
    videoRef.current?.pause();
  };

  const captureAndSendFrame = () => {
    if (isMeasurementComplete || !videoRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(blob => {
        if (!blob) return;

        const formData = new FormData();
        formData.append('frame', blob, 'frame.jpg');

        fetch(`${backendURL}/measurement_page`, {
          method: 'POST',
          body: formData,
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setBackgroundColor(data.background_color);
              if (data.background_color === '#00ff00') {
                setLastValidFrame(blob);
                completeMeasurement();
              }
            } else {
              console.error('Backend error:', data.error);
            }
          })
          .catch(err => console.error('Fetch error:', err));
      }, 'image/jpeg');
    }
  };

  const completeMeasurement = () => {
    setIsMeasurementComplete(true);
    clearInterval(intervalRef.current);
    stopCamera();
    setShowStatus(true);
  };

  const handleRetry = () => {
    setBackgroundColor('#f58484');
    stopCamera();

    fetch(`${backendURL}/retry`, { method: 'POST' })
      .then(() => {
        setIsMeasurementComplete(false);
        setTimeout(startCameraAndMeasurement, 1500);
      })
      .catch(err => console.error('Retry error:', err));
  };

  const handleContinue = () => {
    if (!lastValidFrame) {
      alert('No valid frame. Please retry.');
      return;
    }

    const formData = new FormData();
    formData.append('frame', lastValidFrame, 'final_frame.jpg');

    fetch(`${backendURL}/process_side_view`, {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          navigate(`/users/entry_submission/${userId}`);
        } else {
          alert('Validation failed. Restarting...');
          handleRetry();
        }
      })
      .catch(err => {
        console.error('Side view error:', err);
        alert('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8" style={{ backgroundColor }}>
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Uniform Measurement - Side View</h1>
        <p className="text-gray-700 mb-6">
          This page is for storing the side-view image.<br />
          Please ensure your <strong>entire side profile from head to toe</strong> is visible in the video feed.
        </p>

        <div className="inline-block bg-pink-200 p-4 rounded-xl shadow-lg mb-6">
          <video ref={videoRef} width="640" height="480" autoPlay muted className="rounded-md" />
        </div>

        {showStatus && (
          <div className="flex justify-center items-center gap-6 mt-4">
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-pink-100 text-gray-800 font-semibold rounded-md hover:bg-pink-300 transition"
            >
              Re-take
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-2 bg-pink-100 text-gray-800 font-semibold rounded-md hover:bg-pink-300 transition"
            >
              Submit Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideViewMeasurementPage;

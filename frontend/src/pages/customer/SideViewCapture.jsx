import React, { useEffect, useRef, useState } from "react";

const SideViewCapture = () => {
  const videoRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);

  // Setup webcam
  useEffect(() => {
    const getCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };
    getCamera();
  }, []);

  const handleRetake = () => {
    setIsCaptured(false);
  };

  const handleSubmit = () => {
    alert("Submitting image...");
    // Add logic to capture and send the image
  };

  return (
    <div id="body" className="container">
      <h1>Uniform Measurement - Side View</h1>
      <p className="instructions">
        This page is for storing the side-view image -<br /><br />
        Please position the camera stand accordingly, ensure{" "}
        <strong>YOUR ENTIRE SIDE PROFILE (HEAD TO TOE) IS VISIBLE IN THE VIDEO FEED</strong>
      </p>

      <div className="video-container">
        <video ref={videoRef} width="640" height="480" autoPlay />
      </div>

      {isCaptured && (
        <div id="measurement-status">
          <h2>Side View Obtained!</h2>
          <button className="action-button" onClick={handleRetake}>Re-take</button>
          <button className="action-button" onClick={handleSubmit}>Submit Image</button>
        </div>
      )}

      {!isCaptured && (
        <div className="flex justify-center mt-4">
          <button className="action-button" onClick={() => setIsCaptured(true)}>Simulate Capture</button>
        </div>
      )}
    </div>
  );
};

export default SideViewCapture;

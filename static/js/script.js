const video = document.getElementById('video');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
let frameCaptureInterval;
let isMeasurementComplete = false;
let lastValidFrame = null;
const backendURL = 'http://127.0.0.1:5000';
// const backendURL = 'https://uniform-1060926045936.asia-southeast1.run.app'

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error('Error accessing webcam: ', err);
        alert('Could not access the webcam. Please allow access.');
    });

video.addEventListener('canplay', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    console.log("Video is ready and canvas dimensions set.");
});

function captureAndSendFrame() {
    if (isMeasurementComplete) return;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(blob => {
            if (!blob) {
                console.error("Failed to create Blob from canvas.");
                return;
            }

            const formData = new FormData();
            formData.append('frame', blob, 'frame.jpg');

            fetch(`${backendURL}/measurement_page`, {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        document.getElementById('body').style.backgroundColor = data.background_color;

                        if (data.background_color === '#00ff00') {
                            lastValidFrame = blob;
                            completeMeasurement();
                        }
                    } else {
                        console.error("Frame processing error: ", data.error);
                    }
                })
                .catch(err => {
                    console.error('Error sending frame: ', err);
                });
        }, 'image/jpeg');
    } else {
        console.log("Video frame not ready yet.");
    }
}

function completeMeasurement() {
    isMeasurementComplete = true;
    clearInterval(frameCaptureInterval);
    video.pause();
    video.srcObject.getTracks().forEach(track => track.stop());
    document.getElementById('measurement-status').style.display = 'block';
}

function startCameraAndMeasurement() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.play();
            document.getElementById('measurement-status').style.display = 'none';
            frameCaptureInterval = setInterval(captureAndSendFrame, 100);
        })
        .catch(err => {
            console.error('Error accessing webcam: ', err);
            alert('Could not access the webcam. Please allow access.');
        });
}

document.getElementById('retry').addEventListener('click', () => {
    document.getElementById('body').style.backgroundColor = '#f58484';

    video.pause();
    video.srcObject.getTracks().forEach(track => track.stop());

    fetch(`${backendURL}/retry`, { method: 'POST' })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            console.log('Successfully touched /retry route');

            isMeasurementComplete = false;
            setTimeout(startCameraAndMeasurement, 1500);
        })
        .catch(err => {
            console.error('Error accessing /retry route: ', err);
        });
});

document.getElementById('continue').addEventListener('click', () => {
    if (!lastValidFrame) {
        alert("No valid frame available. Please recalibrate.");
        return;
    }

    const formData = new FormData();
    formData.append('frame', lastValidFrame, 'final_frame.jpg');

    fetch(`${backendURL}/process_side_view`, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = `${backendURL}/entry_submission`;
            } else {
                alert("Validation failed. Restarting measurement...");

                isMeasurementComplete = false;
                video.pause();
                if (video.srcObject) {
                    video.srcObject.getTracks().forEach(track => track.stop());
                }

                fetch(`${backendURL}/retry`, { method: 'POST' })
                    .then(() => {
                        setTimeout(startCameraAndMeasurement, 1500);
                    })
                    .catch(err => {
                        console.error('Error accessing /retry route: ', err);
                    });
            }
        })
        .catch(err => {
            console.error('Error during side view processing: ', err);
            alert('Error occurred. Please try again.');
        });
});

// Start frame capture on load
frameCaptureInterval = setInterval(captureAndSendFrame, 100);

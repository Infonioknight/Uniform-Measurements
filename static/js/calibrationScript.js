const video = document.getElementById('video');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
let frameCaptureInterval;  
let isCalibrationComplete = false;  
const backendURL = 'https://uniform-1060926045936.asia-southeast1.run.app'

navigator.mediaDevices.getUserMedia({
    video: true
}).then(stream => {
    video.srcObject = stream;
}).catch(err => {
    console.error('Error accessing webcam: ', err);
    alert('Could not access the webcam. Please allow access.');
});

video.addEventListener('canplay', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    console.log("Video is ready and canvas dimensions set.");
});

function captureAndSendFrame() {
    if (isCalibrationComplete) {
        return;  
    }

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(function(blob) {
            if (blob) {
                const formData = new FormData();
                formData.append('frame', blob, 'frame.jpg'); 

                fetch(`${backendURL}/calibration_page`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log("Frame processed successfully.");
                        document.getElementById('body').style.backgroundColor = data.background_color;

                        if (data.background_color === '#00ff00') {
                            completeCalibration(); 
                        }
                    } else {
                        console.error("Frame processing error: ", data.error);
                    }
                })
                .catch(err => {
                    console.error('Error sending frame: ', err);
                });
            } else {
                console.error("Failed to create Blob from canvas.");
            }
        }, 'image/jpeg');
    } else {
        console.log("Video frame not ready yet.");
    }
}

function completeCalibration() {
    isCalibrationComplete = true; 
    clearInterval(frameCaptureInterval);  
    video.pause();
    video.srcObject.getTracks().forEach(track => track.stop()); 
    document.getElementById('calibration-status').style.display = 'block'; 
}

document.getElementById('recalibrate').addEventListener('click', () => {
    document.getElementById('body').style.backgroundColor = '#f58484'; 

    video.pause();  
    video.srcObject.getTracks().forEach(track => track.stop()); 

    fetch(`${backendURL}/re_calibrate`, { method: 'POST' })  
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Successfully touched /re_calibrate route');

            isCalibrationComplete = false; 

            setTimeout(() => {
                navigator.mediaDevices.getUserMedia({
                    video: true
                }).then(stream => {
                    video.srcObject = stream;
                    video.play(); 
                    document.getElementById('calibration-status').style.display = 'none'; 

                    frameCaptureInterval = setInterval(captureAndSendFrame, 100); 
                }).catch(err => {
                    console.error('Error accessing webcam: ', err);
                    alert('Could not access the webcam. Please allow access.');
                });
            }, 1500); 
        })
        .catch(err => {
            console.error('Error accessing /re_calibrate route: ', err);
        });
});

function fetchCircleCoordinates() {
    return fetch(`${backendURL}/get_circle_coords`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const circleCoords = data.coordinates;
        sessionStorage.setItem('circleCoords', JSON.stringify(circleCoords));
    });
}

document.getElementById('continue').addEventListener('click', () => {
    fetchCircleCoordinates()
        .then(() => {
            window.location.href = `${backendURL}/video_feed`;
        })
        .catch(err => {
            console.error('Error fetching circle coordinates: ', err);
            alert('Failed to fetch circle coordinates. Please try again.');
        });
});

frameCaptureInterval = setInterval(captureAndSendFrame, 100);

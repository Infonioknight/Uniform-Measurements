const video = document.getElementById('video');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const circleCanvas = document.createElement('canvas');
const circleContext = circleCanvas.getContext('2d');

circleCanvas.width = 640;
circleCanvas.height = 480;

// Function to draw circles based on given coordinates
function drawCircles(circleCoords) {
    circleContext.clearRect(0, 0, circleCanvas.width, circleCanvas.height);
    circleContext.globalAlpha = 0.5;
    circleContext.fillStyle = 'rgba(255, 255, 255, 1)';

    const circleRadius = 20;

    // Loop through each coordinate and draw a circle
    for (const coord of Object.values(circleCoords)) {
        const [x, y] = coord; // Destructure the array to get x and y coordinates
        circleContext.beginPath();
        circleContext.arc(x, y, circleRadius, 0, 2 * Math.PI);
        circleContext.fill();
    }

    circleContext.globalAlpha = 1.0;
}

// Function to get circle coordinates from session storage
function getCircleCoordinates() {
    const coords = sessionStorage.getItem('circleCoords');
    return coords ? JSON.parse(coords) : []; // Return an empty array if no coordinates found
}

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

    video.parentNode.insertBefore(canvas, video);
    video.style.display = 'none';

    // Get circle coordinates from session storage and draw them
    const circleCoords = getCircleCoordinates();
    drawCircles(circleCoords);
});

function captureAndSendFrame() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        context.drawImage(circleCanvas, 0, 0);

        canvas.toBlob(function(blob) {
            if (blob) {
                const formData = new FormData();
                formData.append('frame', blob, 'frame.jpg');

                fetch(`/process_frame`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log("Frame processed successfully.");
                        document.getElementById('body').style.backgroundColor = data.background_color;

                        // Check if the background color is green and redirect with a delay
                        if (data.background_color === '#00ff00') {
                            setTimeout(() => {
                                window.location.href = '/entry_submission'; // Redirect to entry submission route
                            }, 2000); // Delay of 2 seconds (2000 milliseconds)
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

setInterval(captureAndSendFrame, 100);

const video = document.getElementById('video');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
// const backendURL = 'https://uniform-1060926045936.asia-southeast1.run.app'; 

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
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(function(blob) {
            if (blob) {
                const formData = new FormData();
                formData.append('frame', blob, 'frame.jpg'); 

                // fetch(`${backendURL}/process_frame`, {
                fetch(`/calibration_page`, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log("Frame processed successfully.");
                        document.getElementById('body').style.backgroundColor = data.background_color;
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
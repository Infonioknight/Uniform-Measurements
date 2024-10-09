const backendURL = 'https://uniform-1060926045936.asia-southeast1.run.app'

function continueWithExisting() {
    const shoulderWidth = localStorage.getItem('shoulder_width');

    if (shoulderWidth) {
        fetch(`${backendURL}/submit_measurements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `shoulder_width=${shoulderWidth}`,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = `${backendURL}/calibration_feed`;
            } else {
                alert('Error: ' + data.error);
            }
        });
    }
}

function recalibrate() {
    localStorage.removeItem('shoulder_width'); 
    window.location.href = `${backendURL}/`; 
}
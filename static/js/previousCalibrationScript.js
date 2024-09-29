function continueWithExisting() {
    // Retrieve the existing value from localStorage
    const shoulderWidth = localStorage.getItem('shoulder_width');

    if (shoulderWidth) {
        // Post the value to the backend at /existing_value route
        fetch('/existing_value', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `shoulder_width=${shoulderWidth}`,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect to video feed on successful submission
                window.location.href = '/calibration_feed';
            } else {
                alert('Error: ' + data.error);
            }
        });
    }
}

function recalibrate() {
    localStorage.removeItem('shoulder_width'); // Remove existing value
    window.location.href = '/'; // Redirect to landing page
}
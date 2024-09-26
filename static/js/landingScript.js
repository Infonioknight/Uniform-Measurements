document.addEventListener('DOMContentLoaded', function() {
    const existingValue = localStorage.getItem('shoulder_width');
    if (existingValue) {
        // Redirect to the previous calibration page if a value exists
        window.location.href = '/previous_calibration';
    }

    const form = document.getElementById('measurement-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const shoulderWidthInput = document.getElementById('shoulder_width').value;

        // Store in localStorage
        localStorage.setItem('shoulder_width', shoulderWidthInput);

        // Submit to backend
        fetch('/submit_measurements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `shoulder_width=${shoulderWidthInput}`,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect to the video feed on successful submission
                window.location.href = '/video_feed';
            } else {
                alert('Error: ' + data.error);
            }
        });
    });
});

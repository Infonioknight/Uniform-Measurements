document.addEventListener('DOMContentLoaded', function() {
    const existingValue = localStorage.getItem('shoulder_width');
    if (existingValue) {
        window.location.href = '/previous_calibration';
    }

    const form = document.getElementById('measurement-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const shoulderWidthInput = document.getElementById('shoulder_width').value;

        localStorage.setItem('shoulder_width', shoulderWidthInput);

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
                window.location.href = '/calibration_feed';
            } else {
                alert('Error: ' + data.error);
            }
        });
    });
});

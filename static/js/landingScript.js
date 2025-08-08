const backendURL = 'https://uniform-884275368968.asia-southeast1.run.app';
// const backendURL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', function() {
    const okButton = document.getElementById('ok-button');
    okButton.addEventListener('click', function() {
        window.location.href = `${backendURL}/calibration_feed`;
    });
});

